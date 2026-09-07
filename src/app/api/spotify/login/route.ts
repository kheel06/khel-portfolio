import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  // -----------------------------------------
  // 1. Get Spotify environment variables
  // -----------------------------------------
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      {
        error: "Spotify environment variables are missing.",
      },
      {
        status: 500,
      },
    );
  }

  // -----------------------------------------
  // 2. Generate a secure OAuth state
  // -----------------------------------------
  const state = crypto.randomUUID();

  // -----------------------------------------
  // 3. Store state in an HTTP-only cookie
  // -----------------------------------------
  const cookieStore = await cookies();

  cookieStore.set("spotify_oauth_state", state, {
    httpOnly: true,

    // Allows the cookie to be sent when Spotify
    // redirects the browser back to your callback.
    sameSite: "lax",

    // Local development uses HTTP.
    // Production uses HTTPS.
    secure: process.env.NODE_ENV === "production",

    // State is only valid for 10 minutes.
    maxAge: 60 * 10,

    // Make the cookie available to the whole app.
    path: "/",
  });

  // -----------------------------------------
  // 4. Spotify permissions
  // -----------------------------------------
  const scope = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-read-recently-played",
  ].join(" ");

  // -----------------------------------------
  // 5. Build Spotify authorization URL
  // -----------------------------------------
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope,
    state,

    // Forces Spotify to show the authorization screen.
    // This is useful while setting up/testing OAuth.
    show_dialog: "true",
  });

  const spotifyAuthorizationUrl =
    `https://accounts.spotify.com/authorize?${params.toString()}`;

  // -----------------------------------------
  // 6. Redirect user to Spotify
  // -----------------------------------------
  return NextResponse.redirect(
    spotifyAuthorizationUrl,
  );
}