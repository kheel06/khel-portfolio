"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Mail,
} from "lucide-react";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { gsap } from "@/lib/gsap";
import VisitorStats from "@/components/hero/visitor-stats";
import SpotifyNowPlaying from "@/components/hero/spotify-now-playing";

/* ============================================================================
   STATUS DOT
   ============================================================================ */

function StatusDot({
  pulse = false,
}: {
  pulse?: boolean;
}) {
  return (
    <span
      className="
        relative
        inline-flex
        h-2
        w-2
        shrink-0
      "
      aria-hidden="true"
    >
      {pulse && (
        <span
          className="
            absolute
            inset-0
            rounded-full
            bg-emerald-400/30
            animate-ping
          "
        />
      )}

      <span
        className="
          relative
          block
          h-2
          w-2
          rounded-full
          bg-emerald-400
          shadow-[0_0_10px_rgba(52,211,153,0.75)]
        "
      />
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
   MOUSE ICON
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
      rel={
        external
          ? "noopener noreferrer"
          : undefined
      }
      className="
        group

        flex
        h-10
        w-10
        shrink-0

        items-center
        justify-center

        rounded-xl

        border
        border-slate-200/80

        bg-white/70

        text-slate-500

        shadow-[0_8px_20px_rgba(15,23,42,0.04)]

        backdrop-blur-xl

        transition-all
        duration-200

        hover:-translate-y-0.5
        hover:border-cyan-400/50
        hover:bg-cyan-50
        hover:text-cyan-700

        dark:border-white/[0.09]
        dark:bg-[#07111e]/80
        dark:text-white/50
        dark:shadow-[0_8px_24px_rgba(0,0,0,0.22)]

        dark:hover:border-cyan-300/50
        dark:hover:bg-cyan-400/[0.06]
        dark:hover:text-cyan-100
      "
    >
      {children}
    </a>
  );
}

/* ============================================================================
   DESKTOP SOCIAL RAIL
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
          via-cyan-400/45
          to-transparent
        "
      />

      <div
        data-hero-social-list
        className="
          flex
          flex-col
          items-center
          gap-3
        "
      >
        <SocialButton
          href="https://github.com/kheel06"
          label="GitHub"
        >
          <GithubIcon className="h-[17px] w-[17px]" />
        </SocialButton>

        <SocialButton
          href="https://www.linkedin.com/"
          label="LinkedIn"
        >
          <LinkedinIcon className="h-[17px] w-[17px]" />
        </SocialButton>

        <SocialButton
          href="mailto:hello@khel.dev"
          label="Email"
          external={false}
        >
          <Mail className="h-[17px] w-[17px]" />
        </SocialButton>

        <SocialButton
          href="https://www.facebook.com/"
          label="Facebook"
        >
          <FacebookIcon className="h-[17px] w-[17px]" />
        </SocialButton>
      </div>

      <div className="mt-7 text-center">
        <p
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.18em]

            text-cyan-700/55

            dark:text-cyan-100/40
          "
        >
          Follow
        </p>

        <p
          className="
            mt-0.5

            text-[8px]
            font-semibold
            uppercase
            tracking-[0.18em]

            text-cyan-700/55

            dark:text-cyan-100/40
          "
        >
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
          from-cyan-400/35
          via-cyan-400/25
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

          shadow-[0_0_9px_rgba(34,211,238,0.45)]
        "
      />
    </aside>
  );
}

/* ============================================================================
   MOBILE SOCIAL LINKS
   ============================================================================ */

function MobileSocialLinks() {
  return (
    <div
      data-hero-mobile-social
      className="
        mt-7

        flex
        w-full

        items-center
        justify-center

        gap-2.5

        lg:hidden
      "
    >
      <SocialButton
        href="https://github.com/kheel06"
        label="GitHub"
      >
        <GithubIcon className="h-[16px] w-[16px]" />
      </SocialButton>

      <SocialButton
        href="https://www.linkedin.com/"
        label="LinkedIn"
      >
        <LinkedinIcon className="h-[16px] w-[16px]" />
      </SocialButton>

      <SocialButton
        href="mailto:hello@khel.dev"
        label="Email"
        external={false}
      >
        <Mail className="h-[16px] w-[16px]" />
      </SocialButton>

      <SocialButton
        href="https://www.facebook.com/"
        label="Facebook"
      >
        <FacebookIcon className="h-[16px] w-[16px]" />
      </SocialButton>
    </div>
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


function ActivityRail() {
  return (
    <aside
      data-hero-activity
      aria-label="Portfolio activity"
      className="
        relative
        z-20
        mx-auto
        mt-10
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
      {/* ================================================================
          SPOTIFY
          The Spotify component owns the complete card UI.
      ================================================================= */}
      <SpotifyNowPlaying />

      {/* ================================================================
          CONNECTOR
      ================================================================= */}
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

      {/* ================================================================
          VISITOR STATISTICS
      ================================================================= */}
      <VisitorStats />
    </aside>
  );
}

/* ============================================================================
   SCROLL INDICATOR
   ============================================================================ */

function ScrollIndicator() {
  return (
    <div
      data-hero-scroll
      className="
        relative

        mt-9

        flex
        w-full
        shrink-0

        items-center
        justify-center

        xl:absolute
        xl:bottom-5
        xl:left-1/2

        xl:mt-0
        xl:w-auto
        xl:-translate-x-1/2
      "
    >
      <Link
        href="#projects"
        aria-label="Scroll to projects"
        className="
          group

          flex

          flex-col

          items-center

          justify-center

          gap-1.5

          text-center
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
            duration-200

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

            transition-colors
            duration-200

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
      </Link>
    </div>
  );
}

/* ============================================================================
   HERO
   ============================================================================ */

export function Hero() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const shouldReduceMotion =
    useReducedMotionPreference();

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    if (!section) {
      return;
    }

    /*
     * GSAP IS ONLY USED FOR THE INITIAL
     * ENTRANCE ANIMATION.
     *
     * There are intentionally NO infinite
     * animations here.
     */

    const ctx =
      gsap.context(
        () => {
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

          const mobileSocial =
            section.querySelector<HTMLElement>(
              "[data-hero-mobile-social]"
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

          /* ================================================================
             REDUCED MOTION
          ================================================================ */

          if (
            shouldReduceMotion
          ) {
            gsap.set(
              [
                social,
                ...Array.from(
                  socialItems
                ),
                mobileSocial,
                eyebrow,
                identity,
                headline,
                lineOne,
                gradientWord,
                lineTwo,
                accent,
                copy,
                actions,
                ...Array.from(
                  actionButtons
                ),
                spotify,
                stats,
                scroll,
              ].filter(Boolean),
              {
                clearProps:
                  "all",
              }
            );

            return;
          }

          /* ================================================================
             INITIAL STATES
          ================================================================ */

          if (social) {
            gsap.set(
              social,
              {
                autoAlpha: 0,
                x: -14,
              }
            );
          }

          if (
            socialItems.length
          ) {
            gsap.set(
              socialItems,
              {
                autoAlpha: 0,
                y: 7,
              }
            );
          }

          gsap.set(
            [
              mobileSocial,
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
              autoAlpha: 0,
              y: 16,
            }
          );

          if (
            gradientWord
          ) {
            gsap.set(
              gradientWord,
              {
                autoAlpha: 0,
                scale: 0.96,
                transformOrigin:
                  "50% 50%",
              }
            );
          }

          /* ================================================================
             ENTRANCE TIMELINE
          ================================================================ */

          const timeline =
            gsap.timeline({
              defaults: {
                ease:
                  "power3.out",
              },
            });

          /* SOCIAL */

          if (social) {
            timeline.to(
              social,
              {
                autoAlpha: 1,
                x: 0,
                duration:
                  0.45,
              },
              0
            );
          }

          if (
            socialItems.length
          ) {
            timeline.to(
              socialItems,
              {
                autoAlpha: 1,
                y: 0,
                duration:
                  0.25,
                stagger:
                  0.045,
              },
              0.08
            );
          }

          /* STATUS */

          if (eyebrow) {
            timeline.to(
              eyebrow,
              {
                autoAlpha: 1,
                y: 0,
                duration:
                  0.38,
              },
              0.08
            );
          }

          /* IDENTITY */

          if (identity) {
            timeline.to(
              identity,
              {
                autoAlpha: 1,
                y: 0,
                duration:
                  0.38,
              },
              0.18
            );
          }

          /* HEADLINE */

          if (lineOne) {
            timeline.to(
              lineOne,
              {
                autoAlpha: 1,
                y: 0,
                duration:
                  0.5,
              },
              0.28
            );
          }

          if (
            gradientWord
          ) {
            timeline.to(
              gradientWord,
              {
                autoAlpha: 1,
                scale: 1,
                duration:
                  0.48,
                ease:
                  "back.out(1.08)",
              },
              0.36
            );
          }

          if (lineTwo) {
            timeline.to(
              lineTwo,
              {
                autoAlpha: 1,
                y: 0,
                duration:
                  0.48,
              },
              0.42
            );
          }

          /* ACCENT */

          if (accent) {
            timeline.to(
              accent,
              {
                autoAlpha: 1,
                y: 0,
                duration:
                  0.28,
              },
              0.6
            );
          }

          /* COPY */

          if (copy) {
            timeline.to(
              copy,
              {
                autoAlpha: 1,
                y: 0,
                duration:
                  0.4,
              },
              0.64
            );
          }

          /* ACTIONS */

          if (actions) {
            timeline.to(
              actions,
              {
                autoAlpha: 1,
                y: 0,
                duration:
                  0.32,
              },
              0.74
            );
          }

          if (
            actionButtons.length
          ) {
            timeline.fromTo(
              actionButtons,
              {
                autoAlpha: 0,
                y: 7,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration:
                  0.24,
                stagger:
                  0.05,
              },
              0.78
            );
          }

          /* MOBILE SOCIAL */

          if (
            mobileSocial
          ) {
            timeline.to(
              mobileSocial,
              {
                autoAlpha: 1,
                y: 0,
                duration:
                  0.3,
              },
              0.9
            );
          }

          /* SPOTIFY */

          if (spotify) {
            timeline.fromTo(
              spotify,
              {
                autoAlpha: 0,
                y: 14,
                scale: 0.985,
              },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration:
                  0.45,
              },
              0.58
            );
          }

          /* VISITOR */

          if (stats) {
            timeline.fromTo(
              stats,
              {
                autoAlpha: 0,
                y: 12,
                scale: 0.985,
              },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration:
                  0.38,
              },
              0.7
            );
          }

          /* SCROLL */

          if (scroll) {
            timeline.to(
              scroll,
              {
                autoAlpha: 1,
                y: 0,
                duration:
                  0.32,
              },
              0.98
            );
          }
        },
        section
      );

    return () => {
      ctx.revert();
    };
  }, [
    shouldReduceMotion,
  ]);

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
          STATIC BACKGROUND
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
        {/* CYAN ATMOSPHERE */}

        <div
          className="
            absolute

            -left-40
            top-[2%]

            h-[30rem]
            w-[30rem]

            rounded-full

            bg-cyan-400/[0.04]

            blur-[140px]

            dark:bg-cyan-500/[0.075]

            sm:h-[38rem]
            sm:w-[38rem]
          "
        />

        {/* VIOLET ATMOSPHERE */}

        <div
          className="
            absolute

            -right-52
            top-[8%]

            h-[30rem]
            w-[30rem]

            rounded-full

            bg-violet-400/[0.025]

            blur-[150px]

            dark:bg-violet-500/[0.065]
          "
        />

        {/* GRID - STATIC */}

        <div
          className="
            absolute
            inset-0

            opacity-[0.115]

            dark:opacity-[0.095]
          "
          style={{
            backgroundImage:
              "linear-gradient(rgba(100,116,139,0.065) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,0.065) 1px, transparent 1px)",

            backgroundSize:
              "48px 48px",
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

            bg-cyan-400/[0.01]

            blur-[120px]

            dark:bg-blue-500/[0.018]
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
            border-cyan-500/[0.07]

            dark:border-cyan-400/[0.15]
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
            border-violet-500/[0.07]

            dark:border-violet-500/[0.15]
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
          DESKTOP SOCIAL
      ====================================================================== */}

      <SocialRail />

      {/* ======================================================================
          MAIN CONTENT
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

          justify-start

          px-5

          pb-10
          pt-32

          sm:px-8
          sm:pb-12
          sm:pt-36

          md:pt-36

          lg:px-12

          xl:justify-center

          xl:px-16
          xl:pb-24
          xl:pt-28
        "
      >
        {/* ====================================================================
            MAIN HERO CONTENT
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

              max-w-full

              items-center
              gap-2.5

              rounded-full

              border
              border-cyan-400/20

              bg-cyan-400/[0.035]

              px-4
              py-2

              text-[8px]

              font-semibold

              uppercase

              tracking-[0.18em]

              text-cyan-700

              backdrop-blur-xl

              sm:text-[9px]

              dark:border-cyan-300/20
              dark:bg-cyan-400/[0.045]
              dark:text-cyan-100/80
            "
          >
            <StatusDot />

            <span className="truncate">
              Available for select opportunities
            </span>
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

          {/* ==================================================================
              HEADLINE
          ================================================================== */}

          <h1
            id="hero-title"
            data-hero-headline
            className="
              mt-7

              w-full

              text-[clamp(2.35rem,8vw,5.35rem)]

              font-semibold

              leading-[0.9]

              tracking-[-0.075em]

              text-slate-950

              dark:text-white

              sm:text-[clamp(2.8rem,6vw,5.35rem)]
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
            I design and develop modern web
            applications focused on performance,
            usability, maintainability, and solving
            real-world problems.
          </p>

          {/* ==================================================================
              ACTIONS
          ================================================================== */}

          <div
            data-hero-actions
            className="
              mt-8

              grid

              w-full

              grid-cols-1

              gap-3

              sm:flex
              sm:w-auto
              sm:flex-wrap
              sm:items-center
              sm:justify-center
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
                duration-200

                hover:-translate-y-0.5
                hover:!bg-cyan-600

                hover:shadow-[0_16px_40px_rgba(34,211,238,0.18)]

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

              <ArrowUpRight
                className="
                  h-4
                  w-4
                  !text-inherit

                  transition-transform
                  duration-200

                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
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
                duration-200

                hover:-translate-y-0.5
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

              <Download
                className="
                  h-4
                  w-4

                  text-cyan-600

                  transition-transform
                  duration-200

                  group-hover:translate-y-0.5

                  dark:text-cyan-200/80
                "
              />
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
                duration-200

                hover:-translate-y-0.5
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

              <Mail
                className="
                  h-4
                  w-4

                  text-cyan-600/80

                  dark:text-cyan-200/70
                "
              />
            </Link>
          </div>

          {/* MOBILE SOCIAL LINKS */}

          <MobileSocialLinks />
        </main>

        {/* ====================================================================
            ACTIVITY RAIL

            MOBILE:
            normal document flow

            DESKTOP:
            absolute right-side rail
        ==================================================================== */}

        <ActivityRail />

        {/* ====================================================================
            SCROLL INDICATOR

            IMPORTANT FIX:
            `w-full` ensures justify-center actually centers the
            indicator on mobile.
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
      typeof window !==
        "undefined" &&
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
  );

  useEffect(() => {
    const mediaQuery =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );

    const updatePreference =
      () => {
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