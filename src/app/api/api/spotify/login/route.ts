import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
) {
  const clientId =
    process.env.SPOTIFY_CLIENT_ID;

  const redirectUri =
    process.env.SPOTIFY_REDIRECT_URI;

  if (!clientId || !redirectUri) {
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

  const state =
    crypto.randomUUID();

  const cookieStore =
    await cookies();

  cookieStore.set(
    "spotify_oauth_state",
    state,
    {
      httpOnly: true,
      sameSite: "lax",
      secure:
        process.env.NODE_ENV ===
        "production",
      maxAge: 60 * 10,
      path: "/",
    },
  );

  const params =
    new URLSearchParams({
      client_id: clientId,
      response_type: "code",
      redirect_uri:
        redirectUri,
      scope:
        "user-read-recently-played",
      state,
    });

  return NextResponse.redirect(
    `https://accounts.spotify.com/authorize?${params.toString()}`,
  );
}