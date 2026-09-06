import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { saveSpotifyRefreshToken } from "@/lib/spotify";

export const dynamic = "force-dynamic";

function escapeHtml(
  value: string,
) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function GET(
  request: Request,
) {
  const url =
    new URL(request.url);

  const code =
    url.searchParams.get("code");

  const state =
    url.searchParams.get("state");

  const error =
    url.searchParams.get("error");

  const cookieStore =
    await cookies();

  const savedState =
    cookieStore.get(
      "spotify_oauth_state",
    )?.value;

  cookieStore.delete(
    "spotify_oauth_state",
  );

  if (error) {
    return new NextResponse(
      `
        <html>
          <body style="background:#070b14;color:white;font-family:Arial;padding:40px">
            <h1>Spotify authorization failed</h1>
            <p>${escapeHtml(error)}</p>
          </body>
        </html>
      `,
      {
        status: 400,
        headers: {
          "Content-Type":
            "text/html; charset=utf-8",
        },
      },
    );
  }

  if (
    !state ||
    !savedState ||
    state !== savedState
  ) {
    return new NextResponse(
      `
        <html>
          <body style="background:#070b14;color:white;font-family:Arial;padding:40px">
            <h1>Invalid Spotify state</h1>
            <p>Please restart Spotify authorization.</p>
          </body>
        </html>
      `,
      {
        status: 400,
        headers: {
          "Content-Type":
            "text/html; charset=utf-8",
        },
      },
    );
  }

  if (!code) {
    return new NextResponse(
      `
        <html>
          <body style="background:#070b14;color:white;font-family:Arial;padding:40px">
            <h1>Missing Spotify authorization code</h1>
          </body>
        </html>
      `,
      {
        status: 400,
        headers: {
          "Content-Type":
            "text/html; charset=utf-8",
        },
      },
    );
  }

  const clientId =
    process.env.SPOTIFY_CLIENT_ID;

  const clientSecret =
    process.env.SPOTIFY_CLIENT_SECRET;

  const redirectUri =
    process.env.SPOTIFY_REDIRECT_URI;

  if (
    !clientId ||
    !clientSecret ||
    !redirectUri
  ) {
    return NextResponse.json(
      {
        error:
          "Spotify environment variables are missing.",
      },
      {
        status: 500,
      },
    );
  }

  const credentials =
    Buffer.from(
      `${clientId}:${clientSecret}`,
    ).toString("base64");

  const tokenResponse =
    await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          Authorization:
            `Basic ${credentials}`,
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body:
          new URLSearchParams({
            grant_type:
              "authorization_code",
            code,
            redirect_uri:
              redirectUri,
          }),
        cache: "no-store",
      },
    );

  const tokenData =
    await tokenResponse.json();

  if (
    !tokenResponse.ok ||
    !tokenData.refresh_token
  ) {
    return new NextResponse(
      `
        <html>
          <body style="background:#070b14;color:white;font-family:Arial;padding:40px">
            <h1>Spotify token exchange failed</h1>
            <pre>${escapeHtml(
              JSON.stringify(
                tokenData,
                null,
                2,
              ),
            )}</pre>
          </body>
        </html>
      `,
      {
        status: 500,
        headers: {
          "Content-Type":
            "text/html; charset=utf-8",
        },
      },
    );
  }

  const refreshToken =
    tokenData.refresh_token;

  const stored =
    await saveSpotifyRefreshToken(
      refreshToken,
    );

  if (stored) {
    return new NextResponse(
      `
        <html>
          <body style="
            background:#070b14;
            color:#e2e8f0;
            font-family:Arial;
            padding:50px;
            max-width:800px;
            margin:auto;
          ">
            <h1 style="color:#22d3ee">
              Spotify Connected ✓
            </h1>

            <p>
              Your Spotify refresh token has been
              securely stored in Upstash Redis.
            </p>

            <p>
              You can now return to your portfolio.
            </p>

            <a
              href="/"
              style="
                display:inline-block;
                margin-top:20px;
                padding:12px 20px;
                border:1px solid #22d3ee;
                border-radius:10px;
                color:white;
                text-decoration:none;
              "
            >
              Return to Portfolio
            </a>
          </body>
        </html>
      `,
      {
        headers: {
          "Content-Type":
            "text/html; charset=utf-8",
        },
      },
    );
  }

  return new NextResponse(
    `
      <html>
        <body style="
          background:#070b14;
          color:#e2e8f0;
          font-family:Arial;
          padding:50px;
          max-width:900px;
          margin:auto;
        ">
          <h1 style="color:#22d3ee">
            Spotify Connected ✓
          </h1>

          <p>
            Upstash Redis is not configured.
            Add this value to your
            <strong>.env.local</strong>:
          </p>

          <textarea
            style="
              width:100%;
              height:120px;
              background:#0b1220;
              color:#22d3ee;
              border:1px solid #334155;
              border-radius:10px;
              padding:15px;
              font-family:monospace;
            "
          >SPOTIFY_REFRESH_TOKEN=${escapeHtml(
            refreshToken,
          )}</textarea>

          <p>
            Keep this token private.
          </p>
        </body>
      </html>
    `,
    {
      headers: {
        "Content-Type":
          "text/html; charset=utf-8",
      },
    },
  );
}