import { getRedis } from "@/lib/redis";

const SPOTIFY_REFRESH_TOKEN_KEY =
  "khel:spotify:refresh-token";

const SPOTIFY_TOKEN_URL =
  "https://accounts.spotify.com/api/token";

const SPOTIFY_RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

export type RecentlyPlayedTrack = {
  title: string;
  artist: string;
  album: string;
  image: string | null;
  spotifyUrl: string;
  playedAt: string;
};

/* ============================================================================
   REFRESH TOKEN
   ============================================================================ */

async function getRefreshToken() {
  const redis = getRedis();

  if (redis) {
    const stored =
      await redis.get<string>(
        SPOTIFY_REFRESH_TOKEN_KEY,
      );

    if (stored) {
      return stored.trim();
    }
  }

  const envToken =
    process.env.SPOTIFY_REFRESH_TOKEN?.trim();

  return envToken || null;
}

/* ============================================================================
   SAVE REFRESH TOKEN
   ============================================================================ */

export async function saveSpotifyRefreshToken(
  refreshToken: string,
) {
  const token = refreshToken.trim();

  if (!token) {
    return false;
  }

  const redis = getRedis();

  if (redis) {
    await redis.set(
      SPOTIFY_REFRESH_TOKEN_KEY,
      token,
    );

    return true;
  }

  return false;
}

/* ============================================================================
   CONFIG
   ============================================================================ */

function getSpotifyConfig() {
  const clientId =
    process.env.SPOTIFY_CLIENT_ID?.trim();

  const clientSecret =
    process.env.SPOTIFY_CLIENT_SECRET?.trim();

  if (!clientId) {
    throw new Error(
      "Missing SPOTIFY_CLIENT_ID.",
    );
  }

  if (!clientSecret) {
    throw new Error(
      "Missing SPOTIFY_CLIENT_SECRET.",
    );
  }

  return {
    clientId,
    clientSecret,
  };
}

/* ============================================================================
   REFRESH ACCESS TOKEN
   ============================================================================ */

async function refreshSpotifyAccessToken() {
  const {
    clientId,
    clientSecret,
  } = getSpotifyConfig();

  const refreshToken =
    await getRefreshToken();

  if (!refreshToken) {
    throw new Error(
      "Missing SPOTIFY_REFRESH_TOKEN. Connect your Spotify account first.",
    );
  }

  const credentials =
    Buffer.from(
      `${clientId}:${clientSecret}`,
    ).toString("base64");

  const response =
    await fetch(
      SPOTIFY_TOKEN_URL,
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
              "refresh_token",

            refresh_token:
              refreshToken,
          }),

        cache: "no-store",
      },
    );

  const data =
    await response.json();

  if (!response.ok) {
    console.error(
      "Spotify token refresh failed:",
      {
        status: response.status,
        error: data?.error,
        description:
          data?.error_description,
      },
    );

    if (
      data?.error ===
      "invalid_grant"
    ) {
      throw new Error(
        "Spotify refresh token is invalid or expired. Reconnect Spotify.",
      );
    }

    throw new Error(
      data?.error_description ??
        "Spotify token refresh failed.",
    );
  }

  /*
   * Spotify may return a new refresh token.
   * When it does, persist the new one.
   */
  if (
    typeof data.refresh_token ===
      "string" &&
    data.refresh_token.trim()
  ) {
    await saveSpotifyRefreshToken(
      data.refresh_token,
    );
  }

  if (
    typeof data.access_token !==
    "string"
  ) {
    throw new Error(
      "Spotify did not return an access token.",
    );
  }

  return data.access_token;
}

/* ============================================================================
   RECENTLY PLAYED
   ============================================================================ */

export async function getRecentlyPlayed() {
  const accessToken =
    await refreshSpotifyAccessToken();

  const response =
    await fetch(
      SPOTIFY_RECENTLY_PLAYED_URL,
      {
        method: "GET",

        headers: {
          Authorization:
            `Bearer ${accessToken}`,
        },

        cache: "no-store",
      },
    );

  const data =
    await response.json();

  if (!response.ok) {
    console.error(
      "Spotify recently played failed:",
      {
        status: response.status,
        error: data?.error,
      },
    );

    throw new Error(
      data?.error?.message ??
        "Spotify recently played request failed.",
    );
  }

  const item =
    data?.items?.[0];

  if (!item?.track) {
    return null;
  }

  const track =
    item.track;

  return {
    title:
      track.name ??
      "Unknown track",

    artist:
      track.artists
        ?.map(
          (artist: {
            name: string;
          }) => artist.name,
        )
        .join(", ") ??
      "Unknown artist",

    album:
      track.album?.name ??
      "Unknown album",

    image:
      track.album?.images?.[0]
        ?.url ??
      null,

    spotifyUrl:
      track.external_urls
        ?.spotify ??
      "https://open.spotify.com/",

    playedAt:
      item.played_at ??
      new Date().toISOString(),
  } satisfies RecentlyPlayedTrack;
}