import { NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const track =
      await getNowPlaying();

    return NextResponse.json(
      {
        success: true,
        isPlaying:
          track?.isPlaying ?? false,
        track,
      },
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      },
    );
  } catch (error) {
    console.error(
      "Now Playing API error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        isPlaying: false,
        track: null,
        error:
          error instanceof Error
            ? error.message
            : "Unable to get Spotify playback.",
      },
      {
        status: 500,
      },
    );
  }
}