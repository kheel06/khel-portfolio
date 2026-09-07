"use client";

import { useCallback, useEffect, useState } from "react";

type SpotifyTrack = {
  isPlaying: boolean;
  progressMs: number;
  durationMs: number;
  title: string;
  artist: string;
  album: string;
  image: string;
  spotifyUrl?: string;
};

type RecentlyPlayedTrack = {
  title: string;
  artist: string;
  album: string;
  image: string;
  spotifyUrl?: string;
  playedAt?: string;
};

type NowPlayingResponse = {
  success: boolean;
  isPlaying: boolean;
  track: SpotifyTrack | null;
};

type RecentlyPlayedResponse = {
  configured: boolean;
  track: RecentlyPlayedTrack | null;
};

type ActivityMode = "now-playing" | "recently-played" | "empty";

function SpotifyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M12 1.8a10.2 10.2 0 1 0 0 20.4 10.2 10.2 0 0 0 0-20.4Zm4.68 14.7a.7.7 0 0 1-.96.23c-2.63-1.61-5.94-1.97-9.84-1.08a.7.7 0 1 1-.31-1.37c4.27-.98 7.93-.56 10.88 1.24.33.2.43.64.23.98Zm1.3-2.9a.87.87 0 0 1-1.2.29c-3-1.84-7.57-2.37-11.12-1.3a.87.87 0 1 1-.5-1.67c4.06-1.23 9.13-.64 12.53 1.45.41.25.54.79.29 1.23Zm.11-3.02c-3.6-2.14-9.55-2.34-13-.? 0 0-.01 0-.01-.01"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-3.5 w-3.5"
    >
      <path d="M14 5h5v5" />
      <path d="M19 5 11 13" />
      <path d="M19 13v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" />
    </svg>
  );
}

function Equalizer() {
  return (
    <div
      className="flex h-6 items-end gap-[3px]"
      aria-hidden="true"
    >
      <span className="h-2 w-[2px] rounded-full bg-[#1ed760] animate-[spotifyBar_0.9s_ease-in-out_infinite]" />
      <span className="h-4 w-[2px] rounded-full bg-[#1ed760] animate-[spotifyBar_1.1s_ease-in-out_infinite_0.1s]" />
      <span className="h-6 w-[2px] rounded-full bg-[#1ed760] animate-[spotifyBar_0.75s_ease-in-out_infinite_0.2s]" />
      <span className="h-3 w-[2px] rounded-full bg-[#1ed760] animate-[spotifyBar_1s_ease-in-out_infinite_0.3s]" />
    </div>
  );
}

function SpotifyLogoCircle() {
  return (
    <div
      className="
        flex h-10 w-10 shrink-0 items-center justify-center
        rounded-xl
        border border-[#1ed760]/30
        bg-[#1ed760]/10
        text-[#1ed760]
      "
    >
      <SpotifyIcon />
    </div>
  );
}

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function getProgressPercentage(
  progressMs: number,
  durationMs: number,
) {
  if (!durationMs || durationMs <= 0) return 0;

  return Math.min(
    100,
    Math.max(0, (progressMs / durationMs) * 100),
  );
}

export default function SpotifyNowPlaying() {
  const [mode, setMode] =
    useState<ActivityMode>("empty");

  const [nowPlaying, setNowPlaying] =
    useState<SpotifyTrack | null>(null);

  const [recentlyPlayed, setRecentlyPlayed] =
    useState<RecentlyPlayedTrack | null>(null);

  const [loading, setLoading] = useState(true);

  const fetchSpotifyActivity = useCallback(
    async () => {
      try {
        /*
         * First check if Spotify is currently playing.
         */
        const nowResponse = await fetch(
          "/api/spotify/now-playing",
          {
            method: "GET",
            cache: "no-store",
          },
        );

        if (nowResponse.ok) {
          const nowData =
            (await nowResponse.json()) as NowPlayingResponse;

          if (
            nowData.success &&
            nowData.track
          ) {
            setNowPlaying(nowData.track);
            setRecentlyPlayed(null);
            setMode("now-playing");
            setLoading(false);

            return;
          }
        }

        /*
         * Nothing is currently playing.
         *
         * Fall back to the latest Spotify track.
         */
        const recentResponse = await fetch(
          "/api/spotify/recently-played",
          {
            method: "GET",
            cache: "no-store",
          },
        );

        if (recentResponse.ok) {
          const recentData =
            (await recentResponse.json()) as RecentlyPlayedResponse;

          if (recentData.track) {
            setRecentlyPlayed(
              recentData.track,
            );
            setNowPlaying(null);
            setMode("recently-played");
            setLoading(false);

            return;
          }
        }

        setNowPlaying(null);
        setRecentlyPlayed(null);
        setMode("empty");
      } catch (error) {
        console.error(
          "Failed to load Spotify activity:",
          error,
        );

        setNowPlaying(null);
        setRecentlyPlayed(null);
        setMode("empty");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchSpotifyActivity();

    /*
     * Refresh every 10 seconds.
     */
    const interval = window.setInterval(
      fetchSpotifyActivity,
      10000,
    );

    return () => {
      window.clearInterval(interval);
    };
  }, [fetchSpotifyActivity]);

  /*
   * Loading state
   */
  if (loading) {
    return (
      <div
        className="
          w-full
          overflow-hidden
          rounded-[24px]
          border
          border-slate-200
          bg-white
          shadow-[0_20px_60px_rgba(15,23,42,0.08)]
          dark:border-white/10
          dark:bg-slate-950/70
          dark:shadow-none
        "
      >
        <SpotifyHeader
          mode="NOW PLAYING"
          isPlaying={false}
        />

        <div
          className="
            mx-3 mb-3
            flex min-h-[158px]
            items-center
            gap-4
            rounded-[16px]
            border
            border-slate-200
            bg-slate-50
            p-4
            dark:border-white/10
            dark:bg-white/[0.03]
          "
        >
          <div
            className="
              h-[72px]
              w-[72px]
              shrink-0
              animate-pulse
              rounded-[12px]
              bg-slate-200
              dark:bg-white/10
            "
          />

          <div className="min-w-0 flex-1 space-y-3">
            <div
              className="
                h-3
                w-24
                animate-pulse
                rounded-full
                bg-slate-200
                dark:bg-white/10
              "
            />

            <div
              className="
                h-5
                w-40
                animate-pulse
                rounded-full
                bg-slate-200
                dark:bg-white/10
              "
            />

            <div
              className="
                h-3
                w-28
                animate-pulse
                rounded-full
                bg-slate-200
                dark:bg-white/10
              "
            />
          </div>
        </div>

        <SpotifyFooter />
      </div>
    );
  }

  /*
   * Currently playing
   */
  if (
    mode === "now-playing" &&
    nowPlaying
  ) {
    return (
      <div
        className="
          w-full
          overflow-hidden
          rounded-[24px]
          border
          border-slate-200
          bg-white
          shadow-[0_20px_60px_rgba(15,23,42,0.08)]
          dark:border-white/10
          dark:bg-slate-950/70
          dark:shadow-none
        "
      >
        <SpotifyHeader
          mode="NOW PLAYING"
          isPlaying={nowPlaying.isPlaying}
        />

        <div
          className="
            mx-3 mb-3
            overflow-hidden
            rounded-[16px]
            border
            border-slate-200
            bg-slate-50
            dark:border-white/10
            dark:bg-white/[0.035]
          "
        >
          <div className="flex items-center gap-4 p-4">
            <AlbumArtwork
              src={nowPlaying.image}
              alt={nowPlaying.title}
            />

            <div className="min-w-0 flex-1">
              <p
                className="
                  mb-1
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#1db954]
                "
              >
                Spotify
              </p>

              <h3
                className="
                  truncate
                  text-[15px]
                  font-semibold
                  leading-tight
                  text-slate-950
                  dark:text-white
                "
                title={nowPlaying.title}
              >
                {nowPlaying.title}
              </h3>

              <p
                className="
                  mt-1
                  truncate
                  text-[11px]
                  font-medium
                  text-slate-500
                  dark:text-white/55
                "
                title={nowPlaying.artist}
              >
                {nowPlaying.artist}
              </p>

              <p
                className="
                  mt-0.5
                  truncate
                  text-[9px]
                  text-slate-400
                  dark:text-white/35
                "
                title={nowPlaying.album}
              >
                {nowPlaying.album}
              </p>
            </div>

            <Equalizer />
          </div>

          <div className="px-4 pb-4">
            <div
              className="
                mb-2
                h-[3px]
                overflow-hidden
                rounded-full
                bg-slate-200
                dark:bg-white/10
              "
            >
              <div
                className="
                  h-full
                  rounded-full
                  bg-[#1ed760]
                  transition-all
                  duration-700
                "
                style={{
                  width: `${getProgressPercentage(
                    nowPlaying.progressMs,
                    nowPlaying.durationMs,
                  )}%`,
                }}
              />
            </div>

            <div
              className="
                flex
                items-center
                justify-between
                text-[8px]
                font-medium
                text-slate-400
                dark:text-white/35
              "
            >
              <span>
                {formatTime(
                  nowPlaying.progressMs,
                )}
              </span>

              <span>
                {formatTime(
                  nowPlaying.durationMs,
                )}
              </span>
            </div>
          </div>
        </div>

        <SpotifyFooter
          spotifyUrl={
            nowPlaying.spotifyUrl
          }
        />
      </div>
    );
  }

  /*
   * Recently played fallback
   */
  if (
    mode === "recently-played" &&
    recentlyPlayed
  ) {
    return (
      <div
        className="
          w-full
          overflow-hidden
          rounded-[24px]
          border
          border-slate-200
          bg-white
          shadow-[0_20px_60px_rgba(15,23,42,0.08)]
          dark:border-white/10
          dark:bg-slate-950/70
          dark:shadow-none
        "
      >
        <SpotifyHeader
          mode="RECENTLY PLAYED"
          isPlaying={false}
        />

        <div
          className="
            mx-3 mb-3
            overflow-hidden
            rounded-[16px]
            border
            border-slate-200
            bg-slate-50
            dark:border-white/10
            dark:bg-white/[0.035]
          "
        >
          <div className="flex items-center gap-4 p-4">
            <AlbumArtwork
              src={recentlyPlayed.image}
              alt={recentlyPlayed.title}
            />

            <div className="min-w-0 flex-1">
              <p
                className="
                  mb-1
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#1db954]
                "
              >
                Last played
              </p>

              <h3
                className="
                  truncate
                  text-[15px]
                  font-semibold
                  leading-tight
                  text-slate-950
                  dark:text-white
                "
                title={recentlyPlayed.title}
              >
                {recentlyPlayed.title}
              </h3>

              <p
                className="
                  mt-1
                  truncate
                  text-[11px]
                  font-medium
                  text-slate-500
                  dark:text-white/55
                "
                title={recentlyPlayed.artist}
              >
                {recentlyPlayed.artist}
              </p>

              <p
                className="
                  mt-0.5
                  truncate
                  text-[9px]
                  text-slate-400
                  dark:text-white/35
                "
                title={recentlyPlayed.album}
              >
                {recentlyPlayed.album}
              </p>
            </div>

            <div
              className="
                hidden
                shrink-0
                items-center
                gap-1.5
                sm:flex
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#1ed760]
                "
              />

              <span
                className="
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-slate-400
                  dark:text-white/35
                "
              >
                Offline
              </span>
            </div>
          </div>
        </div>

        <SpotifyFooter
          spotifyUrl={
            recentlyPlayed.spotifyUrl
          }
          recentlyPlayed
        />
      </div>
    );
  }

  /*
   * Empty state
   */
  return (
    <div
      className="
        w-full
        overflow-hidden
        rounded-[24px]
        border
        border-slate-200
        bg-white
        shadow-[0_20px_60px_rgba(15,23,42,0.08)]
        dark:border-white/10
        dark:bg-slate-950/70
        dark:shadow-none
      "
    >
      <SpotifyHeader
        mode="NOW PLAYING"
        isPlaying={false}
      />

      <div
        className="
          mx-3 mb-3
          flex
          min-h-[158px]
          items-center
          justify-center
          rounded-[16px]
          border
          border-slate-200
          bg-slate-50
          px-5
          text-center
          dark:border-white/10
          dark:bg-white/[0.035]
        "
      >
        <div>
          <SpotifyLogoCircle />

          <p
            className="
              mt-3
              text-[12px]
              font-semibold
              text-slate-900
              dark:text-white
            "
          >
            Spotify
          </p>

          <p
            className="
              mt-1
              text-[10px]
              text-slate-500
              dark:text-white/45
            "
          >
            Not currently playing
          </p>
        </div>
      </div>

      <SpotifyFooter />
    </div>
  );
}

function SpotifyHeader({
  mode,
  isPlaying,
}: {
  mode: string;
  isPlaying: boolean;
}) {
  return (
    <div
      className="
        flex
        min-h-[66px]
        items-center
        justify-between
        border-b
        border-slate-200
        px-4
        dark:border-white/10
      "
    >
      <div className="flex items-center gap-3">
        <SpotifyLogoCircle />

        <div>
          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-slate-700
              dark:text-white/75
            "
          >
            {mode}
          </p>

          <p
            className="
              mt-1
              text-[8px]
              font-medium
              text-slate-400
              dark:text-white/35
            "
          >
            Spotify
          </p>
        </div>
      </div>

      {isPlaying ? (
        <Equalizer />
      ) : (
        <div
          className="
            flex
            h-6
            items-end
            gap-[3px]
            opacity-70
          "
          aria-hidden="true"
        >
          <span className="h-2 w-[2px] rounded-full bg-[#1ed760]" />
          <span className="h-4 w-[2px] rounded-full bg-[#1ed760]" />
          <span className="h-6 w-[2px] rounded-full bg-[#1ed760]" />
          <span className="h-3 w-[2px] rounded-full bg-[#1ed760]" />
        </div>
      )}
    </div>
  );
}

function AlbumArtwork({
  src,
  alt,
}: {
  src?: string;
  alt: string;
}) {
  return (
    <div
      className="
        relative
        h-[72px]
        w-[72px]
        shrink-0
        overflow-hidden
        rounded-[10px]
        bg-slate-200
        shadow-sm
        dark:bg-white/10
      "
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="
            h-full
            w-full
            object-cover
          "
          loading="eager"
        />
      ) : (
        <div
          className="
            flex
            h-full
            w-full
            items-center
            justify-center
            text-[#1ed760]
          "
        >
          <SpotifyIcon />
        </div>
      )}
    </div>
  );
}

function SpotifyFooter({
  spotifyUrl,
  recentlyPlayed = false,
}: {
  spotifyUrl?: string;
  recentlyPlayed?: boolean;
}) {
  const handleOpenSpotify = () => {
    if (!spotifyUrl) return;

    window.open(
      spotifyUrl,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div
      className="
        flex
        min-h-[48px]
        items-center
        justify-between
        gap-3
        border-t
        border-slate-200
        px-4
        dark:border-white/10
      "
    >
      <div className="flex items-center gap-2">
        <span
          className="
            h-2
            w-2
            rounded-full
            bg-[#1ed760]
            shadow-[0_0_10px_rgba(30,215,96,0.55)]
          "
        />

        <span
          className="
            text-[8px]
            font-bold
            uppercase
            tracking-[0.18em]
            text-slate-500
            dark:text-white/40
          "
        >
          {recentlyPlayed
            ? "Recent activity"
            : "Live activity"}
        </span>
      </div>

      {spotifyUrl && (
        <button
          type="button"
          onClick={handleOpenSpotify}
          className="
            group
            flex
            items-center
            gap-2
            text-[8px]
            font-bold
            uppercase
            tracking-[0.14em]
            text-slate-700
            transition-colors
            hover:text-[#1db954]
            dark:text-white/60
            dark:hover:text-[#1ed760]
          "
        >
          <span>Open in Spotify</span>

          <span
            className="
              transition-transform
              duration-200
              group-hover:translate-x-0.5
            "
          >
            <ExternalLinkIcon />
          </span>
        </button>
      )}
    </div>
  );
}