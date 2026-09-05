import nodemailer from "nodemailer";

/* ============================================================================
   TYPES
============================================================================ */

type ContactRequest = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

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

/* ============================================================================
   POST /api/contact
============================================================================ */

export async function POST(request: Request) {
  try {
    /* ------------------------------------------------------------------------
       CHECK ENVIRONMENT VARIABLES
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
    ]
      .filter(([, value]) => !value)
      .map(([name]) => name);

    if (missingVariables.length > 0) {
      console.error(
        "Missing contact email environment variables:",
        missingVariables,
      );

      return Response.json(
        {
          success: false,
          error: "Email service is not configured.",
        },
        {
          status: 500,
        },
      );
    }

    /* ------------------------------------------------------------------------
       READ REQUEST
    ------------------------------------------------------------------------ */

    const body = (await request.json()) as Partial<ContactRequest>;

    const name = body.name?.trim();
    const email = body.email?.trim();
    const subject = body.subject?.trim();
    const message = body.message?.trim();

    /* ------------------------------------------------------------------------
       VALIDATE REQUEST
    ------------------------------------------------------------------------ */

    if (!name || !email || !subject || !message) {
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

    if (name.length < 2 || name.length > 100) {
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

    if (email.length < 5 || email.length > 254) {
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

    if (subject.length < 2 || subject.length > 150) {
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

    if (message.length < 10 || message.length > 5000) {
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
       CREATE BREVO SMTP TRANSPORTER
    ------------------------------------------------------------------------ */

    const transporter = nodemailer.createTransport({
      host: BREVO_SMTP_HOST,
      port: Number(BREVO_SMTP_PORT),
      secure: Number(BREVO_SMTP_PORT) === 465,

      auth: {
        user: BREVO_SMTP_USER,
        pass: BREVO_SMTP_PASSWORD,
      },

      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    /* ------------------------------------------------------------------------
       VERIFY SMTP CONNECTION
    ------------------------------------------------------------------------ */

try {
  await transporter.verify();

  console.log("Brevo SMTP connection verified.");
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
      error: "Unable to connect to the email service.",
    },
    {
      status: 502,
    },
  );
}

    /* ------------------------------------------------------------------------
       EMAIL CONTENT
    ------------------------------------------------------------------------ */

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(
      /\n/g,
      "<br />",
    );

    /* ------------------------------------------------------------------------
       SEND EMAIL
    ------------------------------------------------------------------------ */

    const info = await transporter.sendMail({
      from: `"Khel Portfolio" <${CONTACT_FROM_EMAIL}>`,

      to: CONTACT_EMAIL,

      replyTo: email,

      subject: `Portfolio Contact — ${subject}`,

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
                  border: 1px solid #e2e8f0;
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
                    margin: 0 0 24px;
                    font-size: 24px;
                    line-height: 1.3;
                    color: #0f172a;
                  "
                >
                  New message from your portfolio
                </h1>

                <div
                  style="
                    border-top: 1px solid #e2e8f0;
                    padding-top: 20px;
                  "
                >
                  <p>
                    <strong>Name:</strong>
                    ${safeName}
                  </p>

                  <p>
                    <strong>Email:</strong>
                    ${safeEmail}
                  </p>

                  <p>
                    <strong>Subject:</strong>
                    ${safeSubject}
                  </p>

                  <div
                    style="
                      margin-top: 24px;
                      padding: 20px;
                      background: #f8fafc;
                      border-radius: 12px;
                      line-height: 1.7;
                    "
                  >
                    <strong>Message</strong>

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
        message: "Message sent successfully.",
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
        error: "Unable to send your message.",
      },
      {
        status: 500,
      },
    );
  }
}