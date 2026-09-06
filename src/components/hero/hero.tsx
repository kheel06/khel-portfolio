"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Eye,
  Mail,
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
        absolute
        left-[max(18px,calc((100vw-1280px)/2))]
        top-1/2
        z-30

        hidden
        -translate-y-1/2

        lg:flex
        lg:flex-col
        lg:items-center
      "
    >
      <span
        aria-hidden="true"
        className="
          mb-3
          h-9
          w-px
          bg-gradient-to-b
          from-transparent
          via-cyan-400/55
          to-cyan-400/10
        "
      />

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

      <div className="mt-7 text-center">
        <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-cyan-700/60 dark:text-cyan-100/45">
          Follow
        </p>

        <p className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-cyan-700/60 dark:text-cyan-100/45">
          &amp; Connect
        </p>
      </div>

      <span
        aria-hidden="true"
        className="
          mt-4
          h-9
          w-px
          bg-gradient-to-b
          from-cyan-400/40
          via-cyan-400/35
          to-transparent
        "
      />

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
   SPOTIFY ICON
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

/* ============================================================================
   SPOTIFY CARD
   ============================================================================ */

function SpotifyCard() {
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

        bg-white/90

        shadow-[0_24px_70px_rgba(15,23,42,0.08)]

        backdrop-blur-2xl

        dark:border-cyan-400/20
        dark:bg-[#07111e]/92
        dark:shadow-[0_24px_70px_rgba(0,0,0,0.38)]
      "
    >
      {/* GLOW */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-36
          w-36
          rounded-full
          bg-cyan-400/[0.08]
          blur-[65px]

          dark:bg-cyan-400/[0.10]
        "
      />

      {/* HEADER */}

      <div
        className="
          relative
          flex
          items-center
          justify-between

          border-b
          border-slate-200/80

          px-4
          py-3.5

          dark:border-white/[0.07]
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center

              rounded-lg

              border
              border-emerald-400/20

              bg-emerald-400/[0.08]

              text-emerald-500

              dark:text-emerald-400
            "
          >
            <SpotifyIcon className="h-4 w-4" />
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-700 dark:text-white/65">
              Now Playing
            </p>

            <p className="mt-0.5 text-[8px] text-slate-400 dark:text-white/30">
              Spotify
            </p>
          </div>
        </div>

        <div
          data-spotify-equalizer
          className="flex h-5 items-end gap-[3px]"
          aria-hidden="true"
        >
          <span className="h-2 w-[2px] rounded-full bg-emerald-400" />
          <span className="h-4 w-[2px] rounded-full bg-cyan-400" />
          <span className="h-3 w-[2px] rounded-full bg-emerald-400" />
          <span className="h-5 w-[2px] rounded-full bg-cyan-400" />
        </div>
      </div>

      {/* SPOTIFY EMBED */}

      <div className="relative p-3">
        <div
          className="
            overflow-hidden
            rounded-xl

            border
            border-slate-200/70

            bg-slate-50

            dark:border-white/[0.06]
            dark:bg-black/20
          "
        >
          <iframe
            data-testid="embed-iframe"
            title="Spotify player"
            src="https://open.spotify.com/embed/track/4iVj0UxqLlgrFWNdOnCwFS?utm_source=generator"
            width="100%"
            height="152"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="block w-full"
          />
        </div>

        {/* FOOTER */}

        <div className="mt-3 flex items-center justify-between">
          <span
            className="
              flex
              items-center
              gap-2

              text-[8px]
              font-semibold
              uppercase
              tracking-[0.13em]

              text-slate-400

              dark:text-white/35
            "
          >
            <StatusDot />
            Live activity
          </span>

          <a
            href="https://open.spotify.com/track/4iVj0UxqLlgrFWNdOnCwFS"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              items-center
              gap-1.5

              text-[8px]
              font-semibold
              uppercase
              tracking-[0.12em]

              text-slate-400

              transition-colors
              hover:text-emerald-500

              dark:text-white/45
              dark:hover:text-emerald-300
            "
          >
            Open in Spotify
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </article>
  );
}

/* ============================================================================
   VISITOR STATS
   ============================================================================ */

function VisitorStats() {
  const [data, setData] = useState<VisitorData>({
    totalVisitors: 0,
    liveViewers: 0,
  });

  useEffect(() => {
    let cancelled = false;

    async function updatePresence(action: "enter" | "heartbeat") {
      try {
        const response = await fetch("/api/api/visitors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action,
          }),
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Visitor endpoint unavailable");
        }

        const result = (await response.json()) as VisitorData;

        if (!cancelled) {
          setData({
            totalVisitors: Number(result.totalVisitors) || 0,
            liveViewers: Number(result.liveViewers) || 0,
          });
        }
      } catch {
        // Keep UI stable if analytics is unavailable.
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
        rounded-[1.2rem]

        border
        border-cyan-500/20

        bg-white/90

        px-4
        py-4

        shadow-[0_18px_55px_rgba(15,23,42,0.08)]

        backdrop-blur-xl

        dark:border-cyan-400/20
        dark:bg-[#07111e]/92
        dark:shadow-[0_18px_55px_rgba(0,0,0,0.30)]
      "
    >
      <div
        className="
          grid
          grid-cols-2

          divide-x
          divide-slate-200

          dark:divide-white/[0.08]
        "
      >
        {/* VIEWING NOW */}

        <div className="pr-4">
          <div className="flex items-center gap-2">
            <StatusDot />

            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.14em]

                text-slate-400

                dark:text-white/35
              "
            >
              Viewing now
            </span>
          </div>

          <div className="mt-2 flex items-end gap-2">
            <span
              className="
                text-2xl
                font-semibold
                tracking-tight

                text-slate-950

                dark:text-white
              "
            >
              {data.liveViewers || "—"}
            </span>

            <Eye
              className="
                mb-1
                h-3.5
                w-3.5

                text-cyan-500/70

                dark:text-cyan-300/60
              "
            />
          </div>
        </div>

        {/* TOTAL VISITORS */}

        <div className="pl-4">
          <div className="flex items-center gap-2">
            <Users
              className="
                h-3
                w-3

                text-cyan-500/70

                dark:text-cyan-300/60
              "
            />

            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.14em]

                text-slate-400

                dark:text-white/35
              "
            >
              Total visitors
            </span>
          </div>

          <div
            className="
              mt-2

              text-2xl
              font-semibold
              tracking-tight

              text-slate-950

              dark:text-white
            "
          >
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
   ACTIVITY RAIL
   ============================================================================ */

function ActivityRail() {
  return (
    <aside
      aria-label="Portfolio activity"
      className="
        relative
        z-20

        mx-auto
        mt-12
        w-full
        max-w-[360px]

        xl:absolute
        xl:right-8
        xl:top-1/2
        xl:mt-0
        xl:w-[315px]
        xl:-translate-y-1/2
      "
    >
      <SpotifyCard />

      {/* CONNECTOR */}

      <div
        aria-hidden="true"
        className="
          mx-auto
          h-4
          w-px

          bg-gradient-to-b
          from-cyan-400/50
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
        absolute
        bottom-5
        left-1/2
        z-30

        flex
        -translate-x-1/2
        flex-col
        items-center
        gap-1.5

        whitespace-nowrap
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

          hover:text-cyan-500

          dark:text-white/30
          dark:hover:text-cyan-300
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

          dark:text-white/35
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

  const shouldReduceMotion = useReducedMotionPreference();

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    /*
     * IMPORTANT:
     * Never reference the GSAP context variable from inside
     * its own callback. This prevents:
     *
     * Cannot access 'ctx' before initialization
     */

    const ctx = gsap.context(() => {
      /* ======================================================================
         SELECTORS
         ====================================================================== */

      const social = section.querySelector<HTMLElement>(
        "[data-hero-social]"
      );

      const socialItems = section.querySelectorAll<HTMLElement>(
        "[data-hero-social-list] a"
      );

      const eyebrow = section.querySelector<HTMLElement>(
        "[data-hero-eyebrow]"
      );

      const identity = section.querySelector<HTMLElement>(
        "[data-hero-identity]"
      );

      const headline = section.querySelector<HTMLElement>(
        "[data-hero-headline]"
      );

      const lineOne = section.querySelector<HTMLElement>(
        "[data-hero-line-one]"
      );

      const gradientWord = section.querySelector<HTMLElement>(
        "[data-hero-gradient]"
      );

      const lineTwo = section.querySelector<HTMLElement>(
        "[data-hero-line-two]"
      );

      const accent = section.querySelector<HTMLElement>(
        "[data-hero-accent]"
      );

      const copy = section.querySelector<HTMLElement>(
        "[data-hero-copy]"
      );

      const actions = section.querySelector<HTMLElement>(
        "[data-hero-actions]"
      );

      const actionButtons = section.querySelectorAll<HTMLElement>(
        "[data-hero-action]"
      );

      const spotify = section.querySelector<HTMLElement>(
        "[data-hero-spotify]"
      );

      const stats = section.querySelector<HTMLElement>(
        "[data-hero-stats]"
      );

      const scroll = section.querySelector<HTMLElement>(
        "[data-hero-scroll]"
      );

      const mouse = section.querySelector<HTMLElement>(
        "[data-hero-mouse]"
      );

      const arrow = section.querySelector<HTMLElement>(
        "[data-hero-arrow]"
      );

      const grid = section.querySelector<HTMLElement>(
        "[data-hero-grid]"
      );

      const glow = section.querySelector<HTMLElement>(
        "[data-hero-glow]"
      );

      const equalizerBars = section.querySelectorAll<HTMLElement>(
        "[data-spotify-equalizer] span"
      );

      /* ======================================================================
         REDUCED MOTION
         ====================================================================== */

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

      /* ======================================================================
         INITIAL STATE
         ====================================================================== */

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
          y: 20,
        }
      );

      if (gradientWord) {
        gsap.set(gradientWord, {
          opacity: 0,
          scale: 0.9,
          transformOrigin: "50% 50%",
        });
      }

      if (social) {
        gsap.set(social, {
          opacity: 0,
          x: -20,
        });
      }

      if (socialItems.length) {
        gsap.set(socialItems, {
          opacity: 0,
          y: 10,
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

      /* ======================================================================
         ENTRANCE
         ====================================================================== */

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

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
            duration: 0.35,
            stagger: 0.06,
          },
          0.16
        );
      }

      if (eyebrow) {
        timeline.to(
          eyebrow,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
          },
          0.1
        );
      }

      if (identity) {
        timeline.to(
          identity,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
          },
          0.22
        );
      }

      if (lineOne) {
        timeline.to(
          lineOne,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          0.35
        );
      }

      if (gradientWord) {
        timeline.to(
          gradientWord,
          {
            opacity: 1,
            scale: 1,
            duration: 0.58,
            ease: "back.out(1.2)",
          },
          0.45
        );
      }

      if (lineTwo) {
        timeline.to(
          lineTwo,
          {
            opacity: 1,
            y: 0,
            duration: 0.58,
          },
          0.52
        );
      }

      if (accent) {
        timeline.to(
          accent,
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
          },
          0.76
        );
      }

      if (copy) {
        timeline.to(
          copy,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
          },
          0.8
        );
      }

      if (actions) {
        timeline.to(
          actions,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
          },
          0.92
        );
      }

      if (actionButtons.length) {
        timeline.fromTo(
          actionButtons,
          {
            opacity: 0,
            y: 8,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.06,
          },
          0.98
        );
      }

      if (spotify) {
        timeline.to(
          spotify,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
          },
          0.65
        );
      }

      if (stats) {
        timeline.to(
          stats,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
          },
          0.8
        );
      }

      if (scroll) {
        timeline.to(
          scroll,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
          },
          1.15
        );
      }

      /* ======================================================================
         BACKGROUND GRID
         ====================================================================== */

      if (grid) {
        gsap.to(grid, {
          backgroundPosition: "48px 48px",
          duration: 24,
          repeat: -1,
          ease: "none",
        });
      }

      /* ======================================================================
         BACKGROUND GLOW
         ====================================================================== */

      if (glow) {
        gsap.to(glow, {
          x: 35,
          y: -15,
          scale: 1.04,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      /* ======================================================================
         SPOTIFY FLOAT
         ====================================================================== */

      if (spotify) {
        gsap.to(spotify, {
          y: -4,
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1,
        });
      }

      /* ======================================================================
         STATS FLOAT
         ====================================================================== */

      if (stats) {
        gsap.to(stats, {
          y: -2.5,
          duration: 5.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.5,
        });
      }

      /* ======================================================================
         EQUALIZER
         ====================================================================== */

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

      /* ======================================================================
         MOUSE
         ====================================================================== */

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

      /* ======================================================================
         ARROW
         ====================================================================== */

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

      /* ======================================================================
         HEADLINE MICRO FLOAT
         ====================================================================== */

      if (headline) {
        gsap.to(headline, {
          y: -1.5,
          duration: 5.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 2,
        });
      }
    }, section);

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
        {/* CYAN GLOW */}

        <div
          data-hero-glow
          className="
            absolute
            -left-40
            top-[2%]

            h-[30rem]
            w-[30rem]

            rounded-full

            bg-cyan-400/[0.045]

            blur-[140px]

            dark:bg-cyan-500/[0.08]

            sm:h-[38rem]
            sm:w-[38rem]
          "
        />

        {/* VIOLET GLOW */}

        <div
          className="
            absolute
            -right-52
            top-[8%]

            h-[30rem]
            w-[30rem]

            rounded-full

            bg-violet-400/[0.03]

            blur-[150px]

            dark:bg-violet-500/[0.07]
          "
        />

        {/* GRID */}

        <div
          data-hero-grid
          className="
            absolute
            inset-0

            opacity-[0.13]

            dark:opacity-[0.11]
          "
          style={{
            backgroundImage:
              "linear-gradient(rgba(100,116,139,0.065) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,0.065) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* CENTER ATMOSPHERE */}

        <div
          className="
            absolute
            left-1/2
            top-[44%]

            h-[26rem]
            w-[48rem]

            -translate-x-1/2

            rounded-full

            bg-cyan-400/[0.012]

            blur-[120px]

            dark:bg-blue-500/[0.02]
          "
        />

        {/* BOTTOM CYAN CURVE */}

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
            border-cyan-500/[0.08]

            dark:border-cyan-400/[0.17]
          "
        />

        {/* BOTTOM VIOLET CURVE */}

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
            border-violet-500/[0.08]

            dark:border-violet-500/[0.17]
          "
        />

        {/* TOP FADE */}

        <div
          className="
            absolute
            inset-x-0
            top-0
            h-40

            bg-gradient-to-b
            from-[#f7f9fc]
            via-[#f7f9fc]/80
            to-transparent

            dark:from-[#030712]
            dark:via-[#030712]/80
          "
        />

        {/* BOTTOM FADE */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-48

            bg-gradient-to-t
            from-[#f7f9fc]
            via-[#f7f9fc]/85
            to-transparent

            dark:from-[#030712]
            dark:via-[#030712]/85
          "
        />
      </div>

      {/* ======================================================================
          SOCIAL RAIL
          ====================================================================== */}

      <SocialRail />

      {/* ======================================================================
          CONTENT WRAPPER
          ====================================================================== */}

      <div
        className="
          relative
          mx-auto
          flex
          min-h-[100svh]
          w-full
          max-w-[1500px]

          flex-col
          justify-center

          px-5
          pb-24
          pt-28

          sm:px-8
          sm:pt-32

          lg:px-12

          xl:px-16
        "
      >
        {/* ====================================================================
            CENTER CONTENT
            ==================================================================== */}

        <main
          className="
            relative
            z-10

            mx-auto

            flex
            w-full
            max-w-[820px]
            flex-col
            items-center
            justify-center
            text-center

            xl:-translate-x-1
          "
        >
          {/* STATUS */}

          <div
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

              text-[clamp(2.3rem,5.05vw,5.35rem)]

              font-semibold

              leading-[0.9]

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

          {/* DESCRIPTION */}

          <p
            data-hero-copy
            className="
              mt-6

              max-w-[650px]

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
        </main>

        {/* ====================================================================
            ACTIVITY RAIL

            Desktop:
              Positioned to the right and vertically centered.

            Mobile / Tablet:
              Falls naturally below the hero content.
        ==================================================================== */}

        <ActivityRail />

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
      setPrefersReducedMotion(mediaQuery.matches);
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