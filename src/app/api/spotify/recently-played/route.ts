import {
  getRecentlyPlayed,
} from "@/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const track =
      await getRecentlyPlayed();

    return Response.json(
      {
        configured: true,
        track,
      },
      {
        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  } catch (error) {
    console.error(
      "Spotify API error:",
      error,
    );

    return Response.json(
      {
        configured: false,
        track: null,
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  }
}