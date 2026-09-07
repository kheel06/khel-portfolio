"use client";

import { useEffect, useState } from "react";

type SpotifyTrack = {
  isPlaying: boolean;
  progressMs: number;
  durationMs: number;
  title: string;
  artist: string;
  album: string;
  image: string | null;
  spotifyUrl: string;
};

type SpotifyResponse = {
  success: boolean;
  isPlaying: boolean;
  track: SpotifyTrack | null;
  error?: string;
};

function formatTime(ms: number) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

export default function SpotifyNowPlaying() {
  const [data, setData] =
    useState<SpotifyResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function fetchNowPlaying() {
    try {
      const response = await fetch(
        "/api/spotify/now-playing",
        {
          cache: "no-store",
        },
      );

      const result =
        (await response.json()) as SpotifyResponse;

      setData(result);
    } catch (error) {
      console.error(
        "Failed to fetch Spotify playback:",
        error,
      );

      setData({
        success: false,
        isPlaying: false,
        track: null,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNowPlaying();

    const interval =
      setInterval(fetchNowPlaying, 10000);

    return () => clearInterval(interval);
  }, []);

  const track = data?.track;

  /*
   * Loading state
   */
  if (loading) {
    return (
      <div className="w-full">
        <div className="animate-pulse">
          <div className="h-5 w-28 rounded bg-white/10" />
          <div className="mt-3 h-16 rounded-xl bg-white/5" />
        </div>
      </div>
    );
  }

  /*
   * Nothing currently playing
   */
  if (!track) {
    return (
      <div className="w-full">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
            <span className="text-sm">
              ♪
            </span>
          </div>

          <div>
            <p className="text-sm font-medium text-white">
              Spotify
            </p>

            <p className="text-xs text-white/50">
              Not currently playing
            </p>
          </div>
        </div>
      </div>
    );
  }

  const progress =
    track.durationMs > 0
      ? Math.min(
          100,
          Math.max(
            0,
            (track.progressMs /
              track.durationMs) *
              100,
          ),
        )
      : 0;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            {track.isPlaying && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            )}

            <span
              className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                track.isPlaying
                  ? "bg-emerald-400"
                  : "bg-white/30"
              }`}
            />
          </span>

          <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/50">
            {track.isPlaying
              ? "Now Playing"
              : "Paused"}
          </span>
        </div>

        <span className="text-xs text-white/30">
          Spotify
        </span>
      </div>

      {/* Track */}
      <a
        href={track.spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 rounded-xl transition-opacity hover:opacity-80"
      >
        {/* Album artwork */}
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white/5">
          {track.image ? (
            <img
              src={track.image}
              alt={`${track.title} album artwork`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-xl">
                ♪
              </span>
            </div>
          )}
        </div>

        {/* Information */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">
            {track.title}
          </p>

          <p className="mt-0.5 truncate text-xs text-white/50">
            {track.artist}
          </p>

          <p className="mt-1 truncate text-[11px] text-white/30">
            {track.album}
          </p>
        </div>

        {/* Spotify icon */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors group-hover:border-white/20 group-hover:text-white">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-current"
            aria-hidden="true"
          >
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm4.58 14.42a.75.75 0 0 1-1.03.25c-2.83-1.73-6.4-2.12-10.61-1.16a.75.75 0 1 1-.33-1.46c4.6-1.05 8.53-.6 11.72 1.35a.75.75 0 0 1 .25 1.02Zm1.38-3.07a.94.94 0 0 1-1.29.31c-3.24-1.99-8.18-2.57-12.01-1.41a.94.94 0 1 1-.54-1.8c4.38-1.33 9.85-.68 13.58 1.61a.94.94 0 0 1 .26 1.29Zm.12-3.2C14.2 7.92 7.68 7.72 4.08 8.81a1.13 1.13 0 1 1-.66-2.16c4.14-1.26 10.96-1.01 15.11 1.45a1.13 1.13 0 0 1-.45 2.05Z" />
          </svg>
        </div>
      </a>

      {/* Progress */}
      <div className="mt-3">
        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-white/60 transition-all duration-1000"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="mt-1 flex justify-between text-[10px] text-white/30">
          <span>
            {formatTime(track.progressMs)}
          </span>

          <span>
            {formatTime(track.durationMs)}
          </span>
        </div>
      </div>
    </div>
  );
}