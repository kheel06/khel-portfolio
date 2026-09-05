import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import nodemailer from "nodemailer";

/* ============================================================================
   TYPES
============================================================================ */

type ContactRequest = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
  turnstileToken?: string;
};

/* ============================================================================
   RATE LIMITER
============================================================================ */

const redis =
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "10 m"),
      analytics: true,
      prefix: "khel-contact",
    })
  : null;

/* ============================================================================
   HELPERS
============================================================================ */

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getClientIp(request: Request) {
  const forwardedFor =
    request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor
      .split(",")[0]
      .trim();
  }

  return (
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function containsSuspiciousContent(
  message: string,
  subject: string,
) {
  const combined = `${subject} ${message}`;

  const urlMatches =
    combined.match(/https?:\/\//gi) ?? [];

  if (urlMatches.length > 3) {
    return true;
  }

  if (/<script[\s>]/i.test(combined)) {
    return true;
  }

  if (/javascript:/i.test(combined)) {
    return true;
  }

  return false;
}

/* ============================================================================
   TURNSTILE VALIDATION
============================================================================ */

async function verifyTurnstile(
  token: string,
  request: Request,
) {
  const secret =
    process.env.TURNSTILE_SECRET;

  if (!secret) {
    console.error(
      "TURNSTILE_SECRET is missing.",
    );

    return {
      success: false,
    };
  }

  const remoteIp = getClientIp(request);

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret,
          response: token,
          remoteip:
            remoteIp !== "unknown"
              ? remoteIp
              : undefined,
        }),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error(
        "Turnstile API returned:",
        response.status,
      );

      return {
        success: false,
      };
    }

    const result = await response.json();

    if (!result.success) {
      console.error(
        "Turnstile validation failed:",
        result["error-codes"] ?? [],
      );

      return {
        success: false,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      "Turnstile verification error:",
      error,
    );

    return {
      success: false,
    };
  }
}

/* ============================================================================
   POST /api/contact
============================================================================ */

export async function POST(request: Request) {
  try {
    /* ------------------------------------------------------------------------
       REQUEST SIZE PROTECTION
    ------------------------------------------------------------------------ */

    const contentLength = request.headers.get(
      "content-length",
    );

    if (
      contentLength &&
      Number(contentLength) > 20_000
    ) {
      return Response.json(
        {
          success: false,
          error: "Request is too large.",
        },
        {
          status: 413,
        },
      );
    }

    /* ------------------------------------------------------------------------
       ENVIRONMENT
    ------------------------------------------------------------------------ */

    const {
      BREVO_SMTP_HOST,
      BREVO_SMTP_PORT,
      BREVO_SMTP_USER,
      BREVO_SMTP_PASSWORD,
      CONTACT_EMAIL,
      CONTACT_FROM_EMAIL,
    } = process.env;

    const missingVariables = [
      ["BREVO_SMTP_HOST", BREVO_SMTP_HOST],
      ["BREVO_SMTP_PORT", BREVO_SMTP_PORT],
      ["BREVO_SMTP_USER", BREVO_SMTP_USER],
      ["BREVO_SMTP_PASSWORD", BREVO_SMTP_PASSWORD],
      ["CONTACT_EMAIL", CONTACT_EMAIL],
      ["CONTACT_FROM_EMAIL", CONTACT_FROM_EMAIL],
      [
        "TURNSTILE_SECRET",
        process.env.TURNSTILE_SECRET,
      ],
      [
        "UPSTASH_REDIS_REST_URL",
        process.env.UPSTASH_REDIS_REST_URL,
      ],
      [
        "UPSTASH_REDIS_REST_TOKEN",
        process.env.UPSTASH_REDIS_REST_TOKEN,
      ],
    ]
      .filter(([, value]) => !value)
      .map(([name]) => name);

    if (missingVariables.length > 0) {
      console.error(
        "Missing contact environment variables:",
        missingVariables,
      );

      return Response.json(
        {
          success: false,
          error: "Contact service is not configured.",
        },
        {
          status: 500,
        },
      );
    }

    /* ------------------------------------------------------------------------
       RATE LIMIT
    ------------------------------------------------------------------------ */

    const ip = getClientIp(request);

    if (ratelimit) {
      const rateLimitResult =
        await ratelimit.limit(ip);

      if (!rateLimitResult.success) {
        return Response.json(
          {
            success: false,
            error:
              "Too many messages. Please wait a few minutes and try again.",
          },
          {
            status: 429,
            headers: {
              "Retry-After": "600",
            },
          },
        );
      }
    }

    /* ------------------------------------------------------------------------
       READ REQUEST
    ------------------------------------------------------------------------ */

    let body: Partial<ContactRequest>;

    try {
      body = await request.json();
    } catch {
      return Response.json(
        {
          success: false,
          error: "Invalid request.",
        },
        {
          status: 400,
        },
      );
    }

    const name = body.name?.trim();
    const email = body.email?.trim();
    const subject = body.subject?.trim();
    const message = body.message?.trim();
    const website = body.website?.trim();
    const turnstileToken =
      body.turnstileToken?.trim();

    /* ------------------------------------------------------------------------
       HONEYPOT
    ------------------------------------------------------------------------ */

    if (website) {
      /*
       * Silently reject automated submissions.
       */
      return Response.json(
        {
          success: false,
          error: "Invalid submission.",
        },
        {
          status: 400,
        },
      );
    }

    /* ------------------------------------------------------------------------
       TURNSTILE
    ------------------------------------------------------------------------ */

    if (!turnstileToken) {
      return Response.json(
        {
          success: false,
          error:
            "Security verification is required.",
        },
        {
          status: 400,
        },
      );
    }

    const turnstile =
      await verifyTurnstile(
        turnstileToken,
        request,
      );

    if (!turnstile.success) {
      return Response.json(
        {
          success: false,
          error:
            "Security verification failed. Please try again.",
        },
        {
          status: 403,
        },
      );
    }

    /* ------------------------------------------------------------------------
       REQUIRED FIELDS
    ------------------------------------------------------------------------ */

    if (
      !name ||
      !email ||
      !subject ||
      !message
    ) {
      return Response.json(
        {
          success: false,
          error: "All fields are required.",
        },
        {
          status: 400,
        },
      );
    }

    /* ------------------------------------------------------------------------
       LENGTH VALIDATION
    ------------------------------------------------------------------------ */

    if (
      name.length < 2 ||
      name.length > 100
    ) {
      return Response.json(
        {
          success: false,
          error: "Invalid name.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      email.length < 5 ||
      email.length > 254
    ) {
      return Response.json(
        {
          success: false,
          error: "Invalid email address.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      subject.length < 2 ||
      subject.length > 150
    ) {
      return Response.json(
        {
          success: false,
          error: "Invalid subject.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      message.length < 10 ||
      message.length > 5000
    ) {
      return Response.json(
        {
          success: false,
          error: "Invalid message.",
        },
        {
          status: 400,
        },
      );
    }

    /* ------------------------------------------------------------------------
       EMAIL FORMAT
    ------------------------------------------------------------------------ */

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return Response.json(
        {
          success: false,
          error: "Invalid email address.",
        },
        {
          status: 400,
        },
      );
    }

    /* ------------------------------------------------------------------------
       SPAM HEURISTICS
    ------------------------------------------------------------------------ */

    if (
      containsSuspiciousContent(
        message,
        subject,
      )
    ) {
      return Response.json(
        {
          success: false,
          error: "Invalid message.",
        },
        {
          status: 400,
        },
      );
    }

    /* ------------------------------------------------------------------------
       CREATE SMTP TRANSPORTER
    ------------------------------------------------------------------------ */

    const port = Number(
      BREVO_SMTP_PORT,
    );

    if (
      !Number.isFinite(port) ||
      ![465, 587, 2525].includes(port)
    ) {
      console.error(
        "Invalid Brevo SMTP port:",
        BREVO_SMTP_PORT,
      );

      return Response.json(
        {
          success: false,
          error: "Email service configuration error.",
        },
        {
          status: 500,
        },
      );
    }

    const transporter =
      nodemailer.createTransport({
        host: BREVO_SMTP_HOST,
        port,
        secure: port === 465,

        auth: {
          user: BREVO_SMTP_USER,
          pass: BREVO_SMTP_PASSWORD,
        },

        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 15_000,
      });

    /* ------------------------------------------------------------------------
       VERIFY SMTP
    ------------------------------------------------------------------------ */

    try {
      await transporter.verify();

      console.log(
        "Brevo SMTP connection verified.",
      );
    } catch (smtpError) {
      console.error(
        "========================================",
      );

      console.error(
        "BREVO SMTP VERIFICATION FAILED",
      );

      console.error(
        "========================================",
      );

      console.error(smtpError);

      return Response.json(
        {
          success: false,
          error:
            "Unable to connect to the email service.",
        },
        {
          status: 502,
        },
      );
    }

    /* ------------------------------------------------------------------------
       ESCAPE HTML
    ------------------------------------------------------------------------ */

    const safeName =
      escapeHtml(name);

    const safeEmail =
      escapeHtml(email);

    const safeSubject =
      escapeHtml(subject);

    const safeMessage =
      escapeHtml(message).replace(
        /\n/g,
        "<br />",
      );

    /* ------------------------------------------------------------------------
       SEND EMAIL
    ------------------------------------------------------------------------ */

    const info =
      await transporter.sendMail({
        from: `"Khel Portfolio" <${CONTACT_FROM_EMAIL}>`,

        to: CONTACT_EMAIL,

        /*
         * This lets you click Reply and answer
         * the person who contacted you.
         */
        replyTo: email,

        subject:
          `Portfolio Contact — ${subject}`,

        text: `
New message from your portfolio.

Name:
${name}

Email:
${email}

Subject:
${subject}

Message:
${message}
        `.trim(),

        html: `
          <!DOCTYPE html>

          <html>
            <body
              style="
                margin: 0;
                padding: 0;
                background: #f8fafc;
                font-family:
                  Arial,
                  Helvetica,
                  sans-serif;
                color: #0f172a;
              "
            >
              <div
                style="
                  max-width: 680px;
                  margin: 40px auto;
                  padding: 24px;
                "
              >
                <div
                  style="
                    background: #ffffff;
                    border:
                      1px solid #e2e8f0;
                    border-radius: 16px;
                    padding: 32px;
                  "
                >
                  <div
                    style="
                      margin-bottom: 24px;
                      font-size: 12px;
                      font-weight: 700;
                      letter-spacing: 0.12em;
                      color: #0891b2;
                    "
                  >
                    PORTFOLIO CONTACT
                  </div>

                  <h1
                    style="
                      margin:
                        0 0 24px;
                      font-size: 24px;
                      line-height: 1.3;
                      color: #0f172a;
                    "
                  >
                    New message from
                    your portfolio
                  </h1>

                  <div
                    style="
                      border-top:
                        1px solid #e2e8f0;
                      padding-top: 20px;
                    "
                  >
                    <p>
                      <strong>
                        Name:
                      </strong>
                      ${safeName}
                    </p>

                    <p>
                      <strong>
                        Email:
                      </strong>
                      ${safeEmail}
                    </p>

                    <p>
                      <strong>
                        Subject:
                      </strong>
                      ${safeSubject}
                    </p>

                    <div
                      style="
                        margin-top: 24px;
                        padding: 20px;
                        background:
                          #f8fafc;
                        border-radius:
                          12px;
                        line-height:
                          1.7;
                      "
                    >
                      <strong>
                        Message
                      </strong>

                      <p>
                        ${safeMessage}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
      });

    console.log(
      "Portfolio email sent successfully:",
      info.messageId,
    );

    /* ------------------------------------------------------------------------
       SUCCESS
    ------------------------------------------------------------------------ */

    return Response.json(
      {
        success: true,
        message:
          "Message sent successfully.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "Contact email API error:",
      error,
    );

    return Response.json(
      {
        success: false,
        error:
          "Unable to send your message.",
      },
      {
        status: 500,
      },
    );
  }
}