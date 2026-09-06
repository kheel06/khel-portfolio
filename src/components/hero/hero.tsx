"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  ExternalLink,
  Eye,
  Mail,
  Music2,
  Users,
} from "lucide-react";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { gsap } from "@/lib/gsap";

/* ============================================================================
   TYPES
   ============================================================================ */

type SpotifyTrack = {
  title: string;
  artist: string;
  album: string;
  image: string | null;
  spotifyUrl: string;
  playedAt: string;
};

type VisitorData = {
  totalVisitors: number;
  liveViewers: number;
};

/* ============================================================================
   STATUS DOT
   ============================================================================ */

function StatusDot() {
  return (
    <span
      className="relative inline-flex h-2 w-2 shrink-0"
      aria-hidden="true"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/40" />

      <span className="relative block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
    </span>
  );
}

/* ============================================================================
   BRAND ICONS
   ============================================================================ */

function GithubIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.09 3.3 9.4 7.87 10.93.58.1.79-.25.79-.56v-2.02c-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.04 1.78 2.72 1.27 3.39.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.42.36.79 1.06.79 2.14v3.18c0 .31.21.67.8.55A11.53 11.53 0 0 0 23.5 12C23.5 5.66 18.35.5 12 .5Z"
      />
    </svg>
  );
}

function LinkedinIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M6.94 8.5H3.32V21h3.62V8.5ZM5.13 3A2.11 2.11 0 1 0 5.1 7.22 2.11 2.11 0 0 0 5.13 3ZM20.68 13.85c0-3.76-2-5.51-4.67-5.51-2.15 0-3.11 1.18-3.65 2.01v-1.85H8.75V21h3.61v-6.19c0-1.63.31-3.21 2.33-3.21 1.99 0 2.02 1.87 2.02 3.31V21h3.61v-7.15Z" />
    </svg>
  );
}

function FacebookIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.72 21v-8h2.67l.4-3h-3.07V8.07c0-.87.24-1.46 1.49-1.46h1.59V3.93a21.1 21.1 0 0 0-2.32-.12c-2.3 0-3.87 1.4-3.87 3.97V10H8v3h2.61v8h3.11Z" />
    </svg>
  );
}

/* ============================================================================
   MOUSE SCROLL ICON
   ============================================================================ */

function MouseScrollIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 36"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="1.5"
        width="17"
        height="29"
        rx="8.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <rect
        x="10.5"
        y="7"
        width="3"
        height="6"
        rx="1.5"
        fill="currentColor"
      />
    </svg>
  );
}

/* ============================================================================
   SOCIAL BUTTON
   ============================================================================ */

function SocialButton({
  href,
  label,
  external = true,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="
        group
        flex h-11 w-11 items-center justify-center
        rounded-xl

        border border-slate-200/90
        bg-white/75
        text-slate-500

        shadow-[0_8px_22px_rgba(15,23,42,0.05)]
        backdrop-blur-xl

        transition-all duration-300

        hover:-translate-y-1
        hover:border-cyan-400/60
        hover:bg-cyan-50
        hover:text-cyan-700
        hover:shadow-[0_0_24px_rgba(34,211,238,0.14)]

        dark:border-white/[0.10]
        dark:bg-[#06101d]/80
        dark:text-white/50
        dark:shadow-[0_8px_25px_rgba(0,0,0,0.25)]

        dark:hover:border-cyan-300/60
        dark:hover:bg-cyan-400/[0.08]
        dark:hover:text-cyan-100
      "
    >
      {children}
    </a>
  );
}

/* ============================================================================
   SOCIAL RAIL
   ============================================================================ */

function SocialRail() {
  return (
    <aside
      data-hero-social
      aria-label="Social links"
      className="
        pointer-events-auto
        absolute
        top-1/2
        z-40
        hidden
        -translate-y-1/2

        lg:flex
        lg:flex-col
        lg:items-center

        left-[max(24px,calc((100vw-1280px)/2))]
      "
    >
      {/* TOP LINE */}

      <span
        aria-hidden="true"
        className="
          mb-3
          h-10
          w-px
          bg-gradient-to-b
          from-transparent
          via-cyan-400/55
          to-cyan-400/15
        "
      />

      {/* SOCIAL ICONS */}

      <div
        data-hero-social-list
        className="flex flex-col items-center gap-3"
      >
        <SocialButton
          href="https://github.com/kheel06"
          label="GitHub"
        >
          <GithubIcon className="h-[17px] w-[17px] transition-transform duration-300 group-hover:scale-110" />
        </SocialButton>

        <SocialButton
          href="https://www.linkedin.com/"
          label="LinkedIn"
        >
          <LinkedinIcon className="h-[17px] w-[17px] transition-transform duration-300 group-hover:scale-110" />
        </SocialButton>

        <SocialButton
          href="mailto:hello@khel.dev"
          label="Email"
          external={false}
        >
          <Mail className="h-[17px] w-[17px] transition-transform duration-300 group-hover:scale-110" />
        </SocialButton>

        <SocialButton
          href="https://www.facebook.com/"
          label="Facebook"
        >
          <FacebookIcon className="h-[17px] w-[17px] transition-transform duration-300 group-hover:scale-110" />
        </SocialButton>
      </div>

      {/* LABEL */}

      <div className="mt-7 text-center">
        <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-cyan-700/60 dark:text-cyan-100/45">
          Follow
        </p>

        <p className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-cyan-700/60 dark:text-cyan-100/45">
          &amp; Connect
        </p>
      </div>

      {/* BOTTOM LINE */}

      <span
        aria-hidden="true"
        className="
          mt-4
          h-10
          w-px
          bg-gradient-to-b
          from-cyan-400/40
          via-cyan-400/45
          to-transparent
        "
      />

      {/* DOT */}

      <span
        aria-hidden="true"
        className="
          mt-2
          h-1.5
          w-1.5
          rounded-full
          border
          border-cyan-500
          shadow-[0_0_10px_rgba(34,211,238,0.55)]
        "
      />
    </aside>
  );
}

/* ============================================================================
   SPOTIFY CARD
   ============================================================================ */

function SpotifyCard() {
  const [track, setTrack] =
    useState<SpotifyTrack | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadSpotify() {
      try {
        const response = await fetch(
          "/api/api/spotify/recently-played",
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Spotify endpoint unavailable"
          );
        }

        const result =
          (await response.json()) as {
            track?: SpotifyTrack | null;
          };

        if (!cancelled) {
          setTrack(result.track ?? null);
        }
      } catch {
        if (!cancelled) {
          setTrack(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadSpotify();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <article
      data-hero-spotify
      className="
        relative
        w-full
        overflow-hidden
        rounded-[1.45rem]

        border
        border-cyan-500/20

        bg-white/90

        shadow-[0_25px_70px_rgba(15,23,42,0.08)]

        backdrop-blur-2xl

        dark:border-cyan-400/25
        dark:bg-[#07111e]/90
        dark:shadow-[0_25px_70px_rgba(0,0,0,0.35)]
      "
    >
      {/* glow */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-44
          w-44
          rounded-full
          bg-cyan-400/[0.08]
          blur-[70px]
        "
      />

      {/* header */}

      <div
        className="
          relative
          flex
          items-center
          justify-between

          border-b
          border-slate-200/80

          px-5
          py-4

          dark:border-white/[0.08]
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center

              rounded-xl

              border
              border-emerald-400/20

              bg-emerald-400/[0.08]

              text-emerald-500

              dark:text-emerald-400
            "
          >
            <Music2 className="h-4 w-4" />
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.20em] text-slate-700 dark:text-white/65">
              Now Playing
            </p>

            <p className="mt-1 text-[8px] text-slate-400 dark:text-white/30">
              Spotify activity
            </p>
          </div>
        </div>

        {/* EQUALIZER */}

        <div
          data-spotify-equalizer
          className="flex items-end gap-[3px]"
          aria-hidden="true"
        >
          <span className="h-2 w-[2px] rounded-full bg-cyan-400" />
          <span className="h-4 w-[2px] rounded-full bg-cyan-400" />
          <span className="h-3 w-[2px] rounded-full bg-cyan-400" />
          <span className="h-5 w-[2px] rounded-full bg-cyan-400" />
        </div>
      </div>

      {/* body */}

      <div className="relative p-5">
        {/* loading */}

        {loading && (
          <div
            className="flex items-center gap-4"
            aria-label="Loading Spotify activity"
          >
            <div className="h-16 w-16 animate-pulse rounded-xl bg-slate-200 dark:bg-white/[0.06]" />

            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-white/[0.07]" />

              <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100 dark:bg-white/[0.05]" />
            </div>
          </div>
        )}

        {/* track */}

        {!loading && track && (
          <>
            <div className="flex items-center gap-4">
              <div
                className="
                  h-16
                  w-16
                  shrink-0
                  overflow-hidden
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-100

                  dark:border-white/[0.08]
                  dark:bg-white/[0.04]
                "
              >
                {track.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={track.image}
                    alt={track.album}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Music2 className="h-6 w-6 text-emerald-500/60 dark:text-emerald-400/60" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                  {track.title}
                </p>

                <p className="mt-1 truncate text-xs text-slate-500 dark:text-white/40">
                  {track.artist}
                </p>
              </div>

              <a
                href={track.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open track on Spotify"
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center

                  rounded-lg
                  border
                  border-slate-200
                  text-slate-400

                  transition-all
                  duration-300

                  hover:border-emerald-400/30
                  hover:bg-emerald-400/[0.08]
                  hover:text-emerald-500

                  dark:border-white/[0.08]
                  dark:text-white/40
                  dark:hover:text-emerald-300
                "
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* progress */}

            <div className="mt-6">
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/[0.07]">
                <div
                  className="
                    h-full
                    w-[68%]
                    rounded-full
                    bg-gradient-to-r
                    from-cyan-400
                    via-blue-500
                    to-violet-500
                    shadow-[0_0_16px_rgba(34,211,238,0.35)]
                  "
                />
              </div>

              <div className="mt-2 flex justify-between text-[8px] text-slate-400 dark:text-white/30">
                <span>2:17</span>
                <span>3:20</span>
              </div>
            </div>

            {/* controls */}

            <div className="mt-5 flex items-center justify-center gap-8">
              <button
                type="button"
                aria-label="Previous track"
                className="text-xl text-slate-400 transition hover:text-slate-900 dark:text-white/40 dark:hover:text-white"
              >
                ‹
              </button>

              <button
                type="button"
                aria-label="Pause"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-cyan-400/35

                  bg-cyan-400/[0.05]

                  text-sm
                  font-bold

                  text-slate-800

                  dark:text-white
                "
              >
                II
              </button>

              <button
                type="button"
                aria-label="Next track"
                className="text-xl text-slate-400 transition hover:text-slate-900 dark:text-white/40 dark:hover:text-white"
              >
                ›
              </button>
            </div>

            {/* footer */}

            <div className="mt-6 flex items-center justify-between">
              <span className="flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.13em] text-slate-400 dark:text-white/35">
                <StatusDot />
                Live activity
              </span>

              <a
                href={track.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-slate-400 transition hover:text-emerald-500 dark:text-white/45 dark:hover:text-emerald-300"
              >
                Open in Spotify
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </>
        )}

        {/* empty */}

        {!loading && !track && (
          <div className="py-2">
            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-16
                  w-16
                  shrink-0
                  items-center
                  justify-center

                  rounded-xl

                  border
                  border-slate-200

                  bg-slate-100

                  dark:border-white/[0.08]
                  dark:bg-white/[0.03]
                "
              >
                <Music2 className="h-6 w-6 text-slate-400 dark:text-white/25" />
              </div>

              <div className="min-w-0">
                <p className="text-base font-semibold text-slate-700 dark:text-white/75">
                  Spotify is quiet
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400 dark:text-white/35">
                  Recent listening activity appears here.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

/* ============================================================================
   VISITOR STATS
   ============================================================================ */

function VisitorStats() {
  const [data, setData] =
    useState<VisitorData>({
      totalVisitors: 0,
      liveViewers: 0,
    });

  useEffect(() => {
    let cancelled = false;

    async function updatePresence(
      action: "enter" | "heartbeat"
    ) {
      try {
        const response = await fetch(
          "/api/api/visitors",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              action,
            }),
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Visitor endpoint unavailable"
          );
        }

        const result =
          (await response.json()) as VisitorData;

        if (!cancelled) {
          setData({
            totalVisitors:
              Number(result.totalVisitors) || 0,
            liveViewers:
              Number(result.liveViewers) || 0,
          });
        }
      } catch {
        // Keep the hero working if analytics is unavailable.
      }
    }

    void updatePresence("enter");

    const interval = window.setInterval(() => {
      void updatePresence("heartbeat");
    }, 30_000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <article
      data-hero-stats
      className="
        relative
        w-full
        overflow-hidden
        rounded-[1.25rem]

        border
        border-cyan-500/20

        bg-white/90

        px-5
        py-4

        shadow-[0_18px_55px_rgba(15,23,42,0.08)]

        backdrop-blur-xl

        dark:border-cyan-400/25
        dark:bg-[#07111e]/90
        dark:shadow-[0_18px_55px_rgba(0,0,0,0.30)]
      "
    >
      <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-white/[0.08]">
        <div className="pr-5">
          <div className="flex items-center gap-2">
            <StatusDot />

            <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-white/35">
              Viewing now
            </span>
          </div>

          <div className="mt-2 flex items-end gap-2">
            <span className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {data.liveViewers || "—"}
            </span>

            <Eye className="mb-1 h-3.5 w-3.5 text-cyan-500/70 dark:text-cyan-300/60" />
          </div>
        </div>

        <div className="pl-5">
          <div className="flex items-center gap-2">
            <Users className="h-3 w-3 text-cyan-500/70 dark:text-cyan-300/60" />

            <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-white/35">
              Total visitors
            </span>
          </div>

          <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            {data.totalVisitors
              ? data.totalVisitors.toLocaleString()
              : "—"}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ============================================================================
   RIGHT ACTIVITY RAIL
   ============================================================================ */

function ActivityRail() {
  return (
    <aside
      aria-label="Portfolio activity"
      className="
        hidden

        xl:absolute
        xl:right-8
        xl:top-[26%]
        xl:z-30
        xl:block

        xl:w-[335px]
      "
    >
      <SpotifyCard />

      {/* connector */}

      <div
        aria-hidden="true"
        className="
          mx-auto
          h-5
          w-px
          bg-gradient-to-b
          from-cyan-400/45
          via-cyan-400/25
          to-transparent
        "
      />

      <VisitorStats />
    </aside>
  );
}

/* ============================================================================
   SCROLL INDICATOR
   ============================================================================ */

function ScrollIndicator() {
  return (
    <a
      data-hero-scroll
      href="#projects"
      aria-label="Scroll to projects"
      className="
        group
        absolute
        bottom-5
        left-1/2
        z-40

        flex
        -translate-x-1/2
        flex-col
        items-center
        gap-1.5
      "
    >
      <span
        className="
          text-[8px]
          font-semibold
          uppercase
          tracking-[0.22em]

          text-slate-400

          transition-colors
          group-hover:text-cyan-500

          dark:text-white/30
          dark:group-hover:text-cyan-300
        "
      >
        Scroll to explore
      </span>

      <MouseScrollIcon
        data-hero-mouse
        className="
          h-8
          w-5

          text-slate-400/65

          transition-all
          duration-300

          group-hover:-translate-y-0.5
          group-hover:text-cyan-500

          dark:text-white/35
          dark:group-hover:text-cyan-300
        "
      />

      <ArrowDown
        data-hero-arrow
        className="
          h-3
          w-3

          text-cyan-500/70

          dark:text-cyan-300/60
        "
      />
    </a>
  );
}

/* ============================================================================
   HERO
   ============================================================================ */

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const shouldReduceMotion =
    useReducedMotionPreference();

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    /*
     * IMPORTANT:
     *
     * We intentionally do NOT reference the gsap context variable from
     * inside its own callback. That was the cause of:
     *
     * Cannot access 'ctx' before initialization
     */

    const ctx = gsap.context(() => {
      /* ================================================================
         ELEMENTS
         ================================================================ */

      const social =
        section.querySelector<HTMLElement>(
          "[data-hero-social]"
        );

      const socialItems =
        section.querySelectorAll<HTMLElement>(
          "[data-hero-social-list] a"
        );

      const eyebrow =
        section.querySelector<HTMLElement>(
          "[data-hero-eyebrow]"
        );

      const identity =
        section.querySelector<HTMLElement>(
          "[data-hero-identity]"
        );

      const headline =
        section.querySelector<HTMLElement>(
          "[data-hero-headline]"
        );

      const lineOne =
        section.querySelector<HTMLElement>(
          "[data-hero-line-one]"
        );

      const gradientWord =
        section.querySelector<HTMLElement>(
          "[data-hero-gradient]"
        );

      const lineTwo =
        section.querySelector<HTMLElement>(
          "[data-hero-line-two]"
        );

      const accent =
        section.querySelector<HTMLElement>(
          "[data-hero-accent]"
        );

      const copy =
        section.querySelector<HTMLElement>(
          "[data-hero-copy]"
        );

      const actions =
        section.querySelector<HTMLElement>(
          "[data-hero-actions]"
        );

      const actionButtons =
        section.querySelectorAll<HTMLElement>(
          "[data-hero-action]"
        );

      const spotify =
        section.querySelector<HTMLElement>(
          "[data-hero-spotify]"
        );

      const stats =
        section.querySelector<HTMLElement>(
          "[data-hero-stats]"
        );

      const scroll =
        section.querySelector<HTMLElement>(
          "[data-hero-scroll]"
        );

      const mouse =
        section.querySelector<HTMLElement>(
          "[data-hero-mouse]"
        );

      const arrow =
        section.querySelector<HTMLElement>(
          "[data-hero-arrow]"
        );

      const grid =
        section.querySelector<HTMLElement>(
          "[data-hero-grid]"
        );

      const glow =
        section.querySelector<HTMLElement>(
          "[data-hero-glow]"
        );

      const equalizerBars =
        section.querySelectorAll<HTMLElement>(
          "[data-spotify-equalizer] span"
        );

      /* ================================================================
         REDUCED MOTION
         ================================================================ */

      if (shouldReduceMotion) {
        gsap.set(
          [
            social,
            ...Array.from(socialItems),
            eyebrow,
            identity,
            headline,
            lineOne,
            gradientWord,
            lineTwo,
            accent,
            copy,
            actions,
            ...Array.from(actionButtons),
            spotify,
            stats,
            scroll,
            mouse,
            arrow,
          ].filter(Boolean),
          {
            clearProps: "all",
          }
        );

        return;
      }

      /* ================================================================
         INITIAL STATES
         ================================================================ */

      gsap.set(
        [
          eyebrow,
          identity,
          lineOne,
          lineTwo,
          accent,
          copy,
          actions,
          spotify,
          stats,
          scroll,
        ].filter(Boolean),
        {
          opacity: 0,
          y: 22,
        }
      );

      if (gradientWord) {
        gsap.set(gradientWord, {
          opacity: 0,
          scale: 0.92,
          transformOrigin: "50% 50%",
        });
      }

      if (social) {
        gsap.set(social, {
          opacity: 0,
          x: -22,
        });
      }

      if (socialItems.length) {
        gsap.set(socialItems, {
          opacity: 0,
          y: 12,
        });
      }

      if (mouse) {
        gsap.set(mouse, {
          opacity: 0,
        });
      }

      if (arrow) {
        gsap.set(arrow, {
          opacity: 0,
        });
      }

      /* ================================================================
         ENTRANCE TIMELINE
         ================================================================ */

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      /* SOCIAL */

      if (social) {
        timeline.to(
          social,
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
          },
          0.05
        );
      }

      if (socialItems.length) {
        timeline.to(
          socialItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.38,
            stagger: 0.07,
          },
          0.18
        );
      }

      /* STATUS */

      if (eyebrow) {
        timeline.to(
          eyebrow,
          {
            opacity: 1,
            y: 0,
            duration: 0.42,
          },
          0.12
        );
      }

      /* NAME */

      if (identity) {
        timeline.to(
          identity,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
          },
          0.27
        );
      }

      /* FIRST HEADLINE LINE */

      if (lineOne) {
        timeline.to(
          lineOne,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
          },
          0.4
        );
      }

      /* RELIABLE */

      if (gradientWord) {
        timeline.to(
          gradientWord,
          {
            opacity: 1,
            scale: 1,
            duration: 0.62,
            ease: "back.out(1.25)",
          },
          0.52
        );
      }

      /* SECOND HEADLINE LINE */

      if (lineTwo) {
        timeline.to(
          lineTwo,
          {
            opacity: 1,
            y: 0,
            duration: 0.62,
          },
          0.58
        );
      }

      /* ACCENT */

      if (accent) {
        timeline.to(
          accent,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
          },
          0.85
        );
      }

      /* DESCRIPTION */

      if (copy) {
        timeline.to(
          copy,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          0.9
        );
      }

      /* BUTTONS */

      if (actions) {
        timeline.to(
          actions,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
          },
          1.02
        );
      }

      if (actionButtons.length) {
        timeline.fromTo(
          actionButtons,
          {
            opacity: 0,
            y: 9,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.07,
          },
          1.08
        );
      }

      /* RIGHT CARDS */

      if (spotify) {
        timeline.to(
          spotify,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          0.7
        );
      }

      if (stats) {
        timeline.to(
          stats,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
          },
          0.92
        );
      }

      /* SCROLL */

      if (scroll) {
        timeline.to(
          scroll,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
          },
          1.25
        );
      }

      /* ================================================================
         BACKGROUND GRID
         ================================================================ */

      if (grid) {
        gsap.to(grid, {
          backgroundPosition: "48px 48px",
          duration: 24,
          repeat: -1,
          ease: "none",
        });
      }

      /* ================================================================
         BACKGROUND GLOW
         ================================================================ */

      if (glow) {
        gsap.to(glow, {
          x: 38,
          y: -16,
          scale: 1.04,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      /* ================================================================
         SPOTIFY FLOAT
         ================================================================ */

      if (spotify) {
        gsap.to(spotify, {
          y: -5,
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.1,
        });
      }

      /* ================================================================
         VISITOR CARD FLOAT
         ================================================================ */

      if (stats) {
        gsap.to(stats, {
          y: -3,
          duration: 5.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.5,
        });
      }

      /* ================================================================
         SPOTIFY EQUALIZER
         ================================================================ */

      equalizerBars.forEach((bar, index) => {
        gsap.to(bar, {
          scaleY: index % 2 === 0 ? 0.65 : 1,
          transformOrigin: "bottom",
          duration: 0.45 + index * 0.08,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.08,
        });
      });

      /* ================================================================
         MOUSE
         ================================================================ */

      if (mouse) {
        gsap.to(mouse, {
          y: 4,
          opacity: 0.72,
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.5,
        });
      }

      /* ================================================================
         ARROW
         ================================================================ */

      if (arrow) {
        gsap.to(arrow, {
          y: 4,
          opacity: 0.5,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.7,
        });
      }

      /* ================================================================
         HEADLINE MICRO FLOAT
         ================================================================ */

      if (headline) {
        gsap.to(headline, {
          y: -2,
          duration: 5.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 2,
        });
      }
    }, section);

    /* ================================================================
       IMPORTANT CLEANUP
       ================================================================ */

    return () => {
      ctx.revert();
    };
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="
        relative
        isolate
        min-h-[100svh]
        overflow-hidden

        bg-[#f7f9fc]
        text-slate-950

        dark:bg-[#030712]
        dark:text-white
      "
      aria-labelledby="hero-title"
    >
      {/* ======================================================================
          BACKGROUND
          ====================================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        {/* Cyan glow */}

        <div
          data-hero-glow
          className="
            absolute
            -left-40
            top-[4%]

            h-[30rem]
            w-[30rem]

            rounded-full

            bg-cyan-400/[0.055]

            blur-[140px]

            dark:bg-cyan-500/[0.09]

            sm:h-[38rem]
            sm:w-[38rem]
          "
        />

        {/* Violet glow */}

        <div
          className="
            absolute
            -right-48
            top-[10%]

            h-[32rem]
            w-[32rem]

            rounded-full

            bg-violet-400/[0.035]

            blur-[150px]

            dark:bg-violet-500/[0.08]
          "
        />

        {/* Grid */}

        <div
          data-hero-grid
          className="
            absolute
            inset-0
            opacity-[0.16]

            dark:opacity-[0.14]
          "
          style={{
            backgroundImage:
              "linear-gradient(rgba(100,116,139,0.065) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,0.065) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Center atmosphere */}

        <div
          className="
            absolute
            left-1/2
            top-[43%]

            h-[28rem]
            w-[50rem]

            -translate-x-1/2

            rounded-full

            bg-cyan-400/[0.015]

            blur-[120px]

            dark:bg-blue-500/[0.025]
          "
        />

        {/* Bottom cyan curve */}

        <div
          className="
            absolute
            -bottom-52
            -left-[15%]

            h-72
            w-[85%]

            rotate-[7deg]

            rounded-[50%]

            border-t
            border-cyan-500/10

            dark:border-cyan-400/20
          "
        />

        {/* Bottom violet curve */}

        <div
          className="
            absolute
            -bottom-60
            -right-[15%]

            h-72
            w-[78%]

            -rotate-[7deg]

            rounded-[50%]

            border-t
            border-violet-500/10

            dark:border-violet-500/20
          "
        />

        {/* Top fade */}

        <div
          className="
            absolute
            inset-x-0
            top-0
            h-48

            bg-gradient-to-b
            from-[#f7f9fc]
            via-[#f7f9fc]/85
            to-transparent

            dark:from-[#030712]
            dark:via-[#030712]/85
          "
        />

        {/* Bottom fade */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-56

            bg-gradient-to-t
            from-[#f7f9fc]
            via-[#f7f9fc]/90
            to-transparent

            dark:from-[#030712]
            dark:via-[#030712]/90
          "
        />
      </div>

      {/* ======================================================================
          SOCIAL RAIL
          ====================================================================== */}

      <SocialRail />

      {/* ======================================================================
          MAIN CONTAINER
          ====================================================================== */}

      <div
        className="
          relative
          mx-auto
          min-h-[100svh]
          w-full
          max-w-[1500px]

          px-5
          pb-20
          pt-24

          sm:px-8
          sm:pt-28

          lg:px-12

          xl:px-16
        "
      >
        {/* ====================================================================
            CENTER HERO
            ==================================================================== */}

        <div
          className="
            absolute
            inset-x-0
            top-1/2

            z-10

            flex
            -translate-y-1/2
            justify-center

            px-5

            sm:px-8
            lg:px-10
          "
        >
          <div
            className="
              flex
              w-full
              max-w-[850px]
              flex-col
              items-center
              text-center
            "
          >
            {/* STATUS */}

            <div
              data-hero-reveal
              data-hero-eyebrow
              className="
                inline-flex
                items-center
                gap-2.5

                rounded-full

                border
                border-cyan-400/20

                bg-cyan-400/[0.04]

                px-4
                py-2

                text-[9px]
                font-semibold
                uppercase
                tracking-[0.20em]

                text-cyan-700

                backdrop-blur-xl

                dark:border-cyan-300/20
                dark:bg-cyan-400/[0.05]
                dark:text-cyan-100/80
              "
            >
              <StatusDot />

              Available for select opportunities
            </div>

            {/* IDENTITY */}

            <div
              data-hero-identity
              className="mt-5"
            >
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.5em]

                  text-slate-500

                  dark:text-white/45
                "
              >
                KHEL
              </p>

              <p
                className="
                  mt-2

                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.42em]

                  text-cyan-700/70

                  dark:text-cyan-200/65
                "
              >
                Software Engineer
              </p>
            </div>

            {/* HEADLINE */}

            <h1
              id="hero-title"
              data-hero-headline
              className="
                mt-7
                w-full

                text-[clamp(2.35rem,5.2vw,5.65rem)]

                font-semibold

                leading-[0.89]

                tracking-[-0.075em]

                text-slate-950

                dark:text-white
              "
            >
              <span
                data-hero-line-one
                className="inline-block"
              >
                I BUILD{" "}
                <span
                  data-hero-gradient
                  className="
                    inline-block

                    bg-gradient-to-r
                    from-cyan-500
                    via-sky-500
                    to-violet-500
                    bg-clip-text
                    text-transparent

                    dark:from-cyan-200
                    dark:via-sky-400
                    dark:to-violet-400
                  "
                >
                  RELIABLE
                </span>
              </span>

              <br />

              <span
                data-hero-line-two
                className="inline-block"
              >
                DIGITAL PRODUCTS.
              </span>
            </h1>

            {/* ACCENT */}

            <div
              data-hero-accent
              aria-hidden="true"
              className="
                mt-7

                h-px
                w-14

                bg-gradient-to-r
                from-transparent
                via-cyan-500
                to-transparent
              "
            />

            {/* COPY */}

            <p
              data-hero-copy
              className="
                mt-6

                max-w-xl

                text-sm
                leading-7

                text-slate-500

                dark:text-slate-300/65

                sm:text-base
                sm:leading-8
              "
            >
              I design and develop modern web applications
              focused on performance, usability,
              maintainability, and solving real-world
              problems.
            </p>

            {/* ACTIONS */}

            <div
              data-hero-actions
              className="
                mt-8

                flex
                flex-col
                items-center
                justify-center

                gap-3

                sm:flex-row
              "
            >
              {/* VIEW MY WORK */}

              <Link
                data-hero-action
                href="#projects"
                className="
                  group

                  inline-flex
                  min-h-12
                  min-w-[155px]

                  items-center
                  justify-center
                  gap-2

                  rounded-xl

                  !bg-slate-950
                  !text-white

                  px-5

                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.14em]

                  shadow-[0_16px_40px_rgba(15,23,42,0.16)]

                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:!bg-cyan-600
                  hover:shadow-[0_18px_45px_rgba(34,211,238,0.2)]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-cyan-400

                  dark:!bg-white
                  dark:!text-slate-950
                  dark:hover:!bg-cyan-200
                "
              >
                <span className="!text-inherit">
                  View my work
                </span>

                <ArrowUpRight className="h-4 w-4 !text-inherit transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>

              {/* DOWNLOAD CV */}

              <a
                data-hero-action
                href="/cv.pdf"
                download
                className="
                  group

                  inline-flex
                  min-h-12
                  min-w-[155px]

                  items-center
                  justify-center
                  gap-2

                  rounded-xl

                  border
                  border-slate-300

                  bg-white/70

                  px-5

                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.14em]

                  !text-slate-800

                  backdrop-blur-xl

                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-cyan-400/60
                  hover:bg-cyan-50
                  hover:!text-cyan-700

                  dark:border-cyan-300/30
                  dark:bg-cyan-400/[0.03]
                  dark:!text-white/80
                  dark:hover:border-cyan-300/60
                  dark:hover:bg-cyan-400/[0.07]
                  dark:hover:!text-cyan-100
                "
              >
                Download CV

                <Download className="h-4 w-4 text-cyan-600 transition-transform duration-300 group-hover:translate-y-0.5 dark:text-cyan-200/80" />
              </a>

              {/* LET'S TALK */}

              <Link
                data-hero-action
                href="#contact"
                className="
                  group

                  inline-flex
                  min-h-12
                  min-w-[145px]

                  items-center
                  justify-center
                  gap-2

                  rounded-xl

                  border
                  border-slate-300

                  bg-white/50

                  px-5

                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.14em]

                  !text-slate-700

                  backdrop-blur-xl

                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-violet-400/40
                  hover:bg-violet-50
                  hover:!text-violet-700

                  dark:border-white/[0.12]
                  dark:bg-white/[0.025]
                  dark:!text-white/80
                  dark:hover:border-violet-300/35
                  dark:hover:bg-violet-400/[0.06]
                  dark:hover:!text-violet-100
                "
              >
                Let&apos;s talk

                <Mail className="h-4 w-4 text-cyan-600/80 dark:text-cyan-200/70" />
              </Link>
            </div>
          </div>
        </div>

        {/* ====================================================================
            DESKTOP ACTIVITY RAIL
            ==================================================================== */}

        <ActivityRail />

        {/* ====================================================================
            MOBILE / TABLET ACTIVITY
            ==================================================================== */}

        <div
          className="
            relative
            z-20

            mt-[105svh]

            flex
            justify-center

            xl:hidden
          "
        >
          <div
            className="
              flex
              w-full
              max-w-[380px]
              flex-col
            "
          >
            <SpotifyCard />

            <div
              aria-hidden="true"
              className="
                mx-auto
                h-5
                w-px
                bg-gradient-to-b
                from-cyan-400/45
                to-cyan-400/10
              "
            />

            <VisitorStats />
          </div>
        </div>

        {/* ====================================================================
            SCROLL INDICATOR
            ==================================================================== */}

        <ScrollIndicator />
      </div>
    </section>
  );
}

/* ============================================================================
   REDUCED MOTION HOOK
   ============================================================================ */

function useReducedMotionPreference() {
  const [
    prefersReducedMotion,
    setPrefersReducedMotion,
  ] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updatePreference = () => {
      setPrefersReducedMotion(
        mediaQuery.matches
      );
    };

    updatePreference();

    mediaQuery.addEventListener(
      "change",
      updatePreference
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updatePreference
      );
    };
  }, []);

  return prefersReducedMotion;
}