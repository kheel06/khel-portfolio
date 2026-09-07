"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

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

type RecentlyPlayedTrack = {
  title: string;
  artist: string;
  album: string;
  image: string | null;
  spotifyUrl: string;
  playedAt?: string;
};

type NowPlayingResponse = {
  success: boolean;
  isPlaying: boolean;
  track: SpotifyTrack | null;
  error?: string;
};

type RecentlyPlayedResponse = {
  configured: boolean;
  track: RecentlyPlayedTrack | null;
};

type ActivityMode =
  | "loading"
  | "now-playing"
  | "recently-played"
  | "empty";

/* ============================================================================
   ICONS
============================================================================ */

function SpotifyIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M7.8 10.2C10.7 9.5 14.2 9.8 16.7 11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <path
        d="M8.2 13.1C10.6 12.5 13.4 12.8 15.5 13.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M8.8 15.8C10.8 15.4 12.8 15.7 14.4 16.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
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
      className="h-3 w-3"
      aria-hidden="true"
    >
      <path d="M14 5h5v5" />
      <path d="M19 5l-8 8" />
      <path d="M19 13v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" />
    </svg>
  );
}

/* ============================================================================
   EQUALIZER
============================================================================ */

function Equalizer({
  active = true,
}: {
  active?: boolean;
}) {
  return (
    <div
      className={`
        flex
        h-6
        items-end
        gap-[3px]
        transition-opacity
        duration-300
        ${active ? "opacity-100" : "opacity-45"}
      `}
      aria-hidden="true"
    >
      <span
        className="
          h-2
          w-[2px]
          rounded-full
          bg-[#1ed760]
        "
      />

      <span
        className="
          h-4
          w-[2px]
          rounded-full
          bg-[#1ed760]
        "
      />

      <span
        className="
          h-6
          w-[2px]
          rounded-full
          bg-[#1ed760]
        "
      />

      <span
        className="
          h-3
          w-[2px]
          rounded-full
          bg-[#1ed760]
        "
      />
    </div>
  );
}

/* ============================================================================
   HELPERS
============================================================================ */

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);

  const minutes = Math.floor(
    totalSeconds / 60,
  );

  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function getProgress(
  progressMs: number,
  durationMs: number,
) {
  if (
    !durationMs ||
    durationMs <= 0
  ) {
    return 0;
  }

  return Math.min(
    100,
    Math.max(
      0,
      (progressMs / durationMs) * 100,
    ),
  );
}

/* ============================================================================
   ALBUM ART
============================================================================ */

function AlbumArtwork({
  src,
  title,
}: {
  src: string | null | undefined;
  title: string;
}) {
  return (
    <div
      className="
        relative
        h-[72px]
        w-[72px]
        shrink-0
        overflow-hidden
        rounded-[11px]
        bg-slate-200
        ring-1
        ring-black/[0.04]
        dark:bg-white/[0.06]
        dark:ring-white/[0.06]
      "
    >
      {src ? (
        <img
          src={src}
          alt={`${title} album artwork`}
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
          <SpotifyIcon className="h-7 w-7" />
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   HEADER
============================================================================ */

function SpotifyHeader({
  mode,
  isPlaying,
}: {
  mode: "NOW PLAYING" | "RECENTLY PLAYED";
  isPlaying: boolean;
}) {
  return (
    <header
      className="
        flex
        min-h-[66px]
        items-center
        justify-between
        border-b
        border-slate-200/80
        px-4
        dark:border-white/[0.07]
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-emerald-400/25
            bg-emerald-400/[0.08]
            text-[#1db954]
            dark:border-emerald-400/20
            dark:bg-emerald-400/[0.07]
            dark:text-[#1ed760]
          "
        >
          <SpotifyIcon className="h-[17px] w-[17px]" />
        </div>

        <div className="min-w-0">
          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-slate-800
              dark:text-white/75
            "
          >
            {mode}
          </p>

          <p
            className="
              mt-0.5
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

      <Equalizer active={isPlaying} />
    </header>
  );
}

/* ============================================================================
   FOOTER
============================================================================ */

function SpotifyFooter({
  spotifyUrl,
  recentlyPlayed = false,
}: {
  spotifyUrl?: string;
  recentlyPlayed?: boolean;
}) {
  return (
    <footer
      className="
        flex
        min-h-[48px]
        items-center
        justify-between
        gap-3
        border-t
        border-slate-200/80
        px-4
        dark:border-white/[0.07]
      "
    >
      <div className="flex items-center gap-2">
        <span
          className="
            h-2
            w-2
            shrink-0
            rounded-full
            bg-[#1ed760]
            shadow-[0_0_10px_rgba(30,215,96,0.5)]
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
          {recentlyPlayed
            ? "Recent activity"
            : "Live activity"}
        </span>
      </div>

      {spotifyUrl && (
        <a
          href={spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            group
            flex
            shrink-0
            items-center
            gap-1.5
            text-[8px]
            font-bold
            uppercase
            tracking-[0.12em]
            text-slate-500
            transition-colors
            duration-200
            hover:text-[#1db954]
            dark:text-white/45
            dark:hover:text-[#1ed760]
          "
        >
          <span className="hidden sm:inline">
            Open in Spotify
          </span>

          <span className="sm:hidden">
            Spotify
          </span>

          <span
            className="
              transition-transform
              duration-200
              group-hover:translate-x-0.5
            "
          >
            <ExternalLinkIcon />
          </span>
        </a>
      )}
    </footer>
  );
}

/* ============================================================================
   LOADING
============================================================================ */

function SpotifyLoading() {
  return (
    <article
      data-hero-spotify
      className="
        relative
        w-full
        overflow-hidden
        rounded-[1.35rem]
        border
        border-cyan-500/20
        bg-white/95
        shadow-[0_24px_70px_rgba(15,23,42,0.08)]
        backdrop-blur-2xl
        dark:border-cyan-400/20
        dark:bg-[#07111e]/94
        dark:shadow-[0_24px_70px_rgba(0,0,0,0.35)]
      "
    >
      <SpotifyHeader
        mode="NOW PLAYING"
        isPlaying={false}
      />

      <div
        className="
          m-3
          flex
          min-h-[145px]
          items-center
          gap-4
          rounded-xl
          border
          border-slate-200/80
          bg-slate-50
          p-4
          dark:border-white/[0.06]
          dark:bg-white/[0.025]
        "
      >
        <div
          className="
            h-[72px]
            w-[72px]
            shrink-0
            animate-pulse
            rounded-[11px]
            bg-slate-200
            dark:bg-white/[0.08]
          "
        />

        <div className="min-w-0 flex-1 space-y-3">
          <div
            className="
              h-2.5
              w-20
              animate-pulse
              rounded-full
              bg-slate-200
              dark:bg-white/[0.08]
            "
          />

          <div
            className="
              h-4
              w-36
              animate-pulse
              rounded-full
              bg-slate-200
              dark:bg-white/[0.08]
            "
          />

          <div
            className="
              h-2.5
              w-24
              animate-pulse
              rounded-full
              bg-slate-200
              dark:bg-white/[0.08]
            "
          />
        </div>
      </div>

      <div
        className="
          h-[48px]
          border-t
          border-slate-200/80
          dark:border-white/[0.07]
        "
      />
    </article>
  );
}

/* ============================================================================
   EMPTY
============================================================================ */

function SpotifyEmpty() {
  return (
    <article
      data-hero-spotify
      className="
        relative
        w-full
        overflow-hidden
        rounded-[1.35rem]
        border
        border-cyan-500/20
        bg-white/95
        shadow-[0_24px_70px_rgba(15,23,42,0.08)]
        backdrop-blur-2xl
        dark:border-cyan-400/20
        dark:bg-[#07111e]/94
        dark:shadow-[0_24px_70px_rgba(0,0,0,0.35)]
      "
    >
      <SpotifyHeader
        mode="NOW PLAYING"
        isPlaying={false}
      />

      <div
        className="
          m-3
          flex
          min-h-[145px]
          items-center
          justify-center
          rounded-xl
          border
          border-slate-200/80
          bg-slate-50
          px-5
          text-center
          dark:border-white/[0.06]
          dark:bg-white/[0.025]
        "
      >
        <div>
          <div
            className="
              mx-auto
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-emerald-400/25
              bg-emerald-400/[0.08]
              text-[#1db954]
            "
          >
            <SpotifyIcon className="h-5 w-5" />
          </div>

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
              dark:text-white/40
            "
          >
            Nothing played recently
          </p>
        </div>
      </div>

      <SpotifyFooter />
    </article>
  );
}

/* ============================================================================
   MAIN COMPONENT
============================================================================ */

export default function SpotifyNowPlaying() {
  const [mode, setMode] =
    useState<ActivityMode>("loading");

  const [nowPlaying, setNowPlaying] =
    useState<SpotifyTrack | null>(null);

  const [recentlyPlayed, setRecentlyPlayed] =
    useState<RecentlyPlayedTrack | null>(null);

  const fetchSpotifyActivity =
    useCallback(async () => {
      try {
        /*
         * STEP 1
         * Check currently playing.
         */
        const nowResponse = await fetch(
          "/api/spotify/now-playing",
          {
            method: "GET",
            cache: "no-store",
          },
        );

        if (nowResponse.ok) {
          const data =
            (await nowResponse.json()) as NowPlayingResponse;

          if (data.track) {
            setNowPlaying(data.track);
            setRecentlyPlayed(null);
            setMode("now-playing");

            return;
          }
        }

        /*
         * STEP 2
         * Nothing playing.
         *
         * Use recently played instead.
         */
        const recentResponse = await fetch(
          "/api/spotify/recently-played",
          {
            method: "GET",
            cache: "no-store",
          },
        );

        if (recentResponse.ok) {
          const data =
            (await recentResponse.json()) as RecentlyPlayedResponse;

          if (data.track) {
            setNowPlaying(null);
            setRecentlyPlayed(data.track);
            setMode("recently-played");

            return;
          }
        }

        setNowPlaying(null);
        setRecentlyPlayed(null);
        setMode("empty");
      } catch (error) {
        console.error(
          "Spotify activity error:",
          error,
        );

        setNowPlaying(null);
        setRecentlyPlayed(null);
        setMode("empty");
      }
    }, []);

  useEffect(() => {
    void fetchSpotifyActivity();

    const interval =
      window.setInterval(
        () => {
          void fetchSpotifyActivity();
        },
        10000,
      );

    return () => {
      window.clearInterval(interval);
    };
  }, [fetchSpotifyActivity]);

  /*
   * LOADING
   */
  if (mode === "loading") {
    return <SpotifyLoading />;
  }

  /*
   * CURRENTLY PLAYING
   */
  if (
    mode === "now-playing" &&
    nowPlaying
  ) {
    const progress = getProgress(
      nowPlaying.progressMs,
      nowPlaying.durationMs,
    );

    return (
      <article
        data-hero-spotify
        className="
          relative
          w-full
          overflow-hidden
          rounded-[1.35rem]
          border
          border-cyan-500/20
          bg-white/95
          shadow-[0_24px_70px_rgba(15,23,42,0.08)]
          backdrop-blur-2xl
          dark:border-cyan-400/20
          dark:bg-[#07111e]/94
          dark:shadow-[0_24px_70px_rgba(0,0,0,0.35)]
        "
      >
        <SpotifyHeader
          mode="NOW PLAYING"
          isPlaying={
            nowPlaying.isPlaying
          }
        />

        <div
          className="
            m-3
            overflow-hidden
            rounded-xl
            border
            border-slate-200/80
            bg-slate-50
            dark:border-white/[0.06]
            dark:bg-white/[0.025]
          "
        >
          <a
            href={nowPlaying.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              flex
              items-center
              gap-3
              p-3
              transition-colors
              duration-200
              hover:bg-slate-100/70
              dark:hover:bg-white/[0.025]
            "
          >
            <AlbumArtwork
              src={nowPlaying.image}
              title={nowPlaying.title}
            />

            <div className="min-w-0 flex-1">
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#1db954]
                "
              >
                {nowPlaying.isPlaying
                  ? "Listening now"
                  : "Paused"}
              </p>

              <h3
                className="
                  mt-1
                  truncate
                  text-[14px]
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
                  dark:text-white/30
                "
                title={nowPlaying.album}
              >
                {nowPlaying.album}
              </p>
            </div>

            <div
              className="
                shrink-0
                text-slate-400
                transition-colors
                group-hover:text-[#1db954]
                dark:text-white/30
              "
            >
              <ExternalLinkIcon />
            </div>
          </a>

          <div className="px-3 pb-3">
            <div
              className="
                h-[3px]
                overflow-hidden
                rounded-full
                bg-slate-200
                dark:bg-white/[0.08]
              "
            >
              <div
                className="
                  h-full
                  rounded-full
                  bg-[#1ed760]
                  transition-[width]
                  duration-700
                "
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div
              className="
                mt-1.5
                flex
                justify-between
                text-[8px]
                font-medium
                text-slate-400
                dark:text-white/30
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
      </article>
    );
  }

  /*
   * RECENTLY PLAYED
   */
  if (
    mode === "recently-played" &&
    recentlyPlayed
  ) {
    return (
      <article
        data-hero-spotify
        className="
          relative
          w-full
          overflow-hidden
          rounded-[1.35rem]
          border
          border-cyan-500/20
          bg-white/95
          shadow-[0_24px_70px_rgba(15,23,42,0.08)]
          backdrop-blur-2xl
          dark:border-cyan-400/20
          dark:bg-[#07111e]/94
          dark:shadow-[0_24px_70px_rgba(0,0,0,0.35)]
        "
      >
        <SpotifyHeader
          mode="RECENTLY PLAYED"
          isPlaying={false}
        />

        <div
          className="
            m-3
            overflow-hidden
            rounded-xl
            border
            border-slate-200/80
            bg-slate-50
            dark:border-white/[0.06]
            dark:bg-white/[0.025]
          "
        >
          <a
            href={recentlyPlayed.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              flex
              items-center
              gap-3
              p-3
              transition-colors
              duration-200
              hover:bg-slate-100/70
              dark:hover:bg-white/[0.025]
            "
          >
            <AlbumArtwork
              src={recentlyPlayed.image}
              title={recentlyPlayed.title}
            />

            <div className="min-w-0 flex-1">
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#1db954]
                "
              >
                Last played
              </p>

              <h3
                className="
                  mt-1
                  truncate
                  text-[14px]
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
                  dark:text-white/30
                "
                title={recentlyPlayed.album}
              >
                {recentlyPlayed.album}
              </p>
            </div>

            <div
              className="
                flex
                shrink-0
                items-center
                gap-1.5
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
                  hidden
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-slate-400
                  sm:inline
                  dark:text-white/30
                "
              >
                Recent
              </span>
            </div>
          </a>
        </div>

        <SpotifyFooter
          spotifyUrl={
            recentlyPlayed.spotifyUrl
          }
          recentlyPlayed
        />
      </article>
    );
  }

  /*
   * EMPTY
   */
  return <SpotifyEmpty />;
}