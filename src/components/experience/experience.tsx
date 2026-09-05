"use client";

import { useRef } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Code2,
  Database,
  GitBranch,
} from "lucide-react";

import { useScrollTimeline } from "@/components/animations/use-scroll-timeline";

type ExperienceEntry = {
  period: string;
  date: string;
  type: string;
  title: string;
  description: string;
  technologies: string[];
  icon: LucideIcon;
  current: boolean;
};

const experiences: ExperienceEntry[] = [
  {
    period: "Current",
    date: "2022 — Present",
    type: "Software development",
    title: "Building Modern Web Applications",
    description:
      "Designing and developing responsive web applications using modern frameworks, typed development, reusable interfaces, and practical backend services.",
    technologies: ["Next.js", "React", "TypeScript", "Firebase"],
    icon: Code2,
    current: true,
  },
  {
    period: "Project based",
    date: "Recent projects",
    type: "Full stack development",
    title: "Administrative & Business Systems",
    description:
      "Developing software that improves real-world workflows through dashboards, structured data, management interfaces, authentication, and application automation.",
    technologies: ["Web applications", "Databases", "APIs", "UI/UX"],
    icon: Database,
    current: false,
  },
  {
    period: "Continuous",
    date: "Ongoing",
    type: "Engineering development",
    title: "Learning Through Real Projects",
    description:
      "Continuously improving software engineering practices through hands-on projects, debugging, architecture, performance optimization, and experimentation with modern technologies.",
    technologies: ["Git", "Architecture", "Debugging", "Performance"],
    icon: GitBranch,
    current: false,
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useScrollTimeline(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-labelledby="experience-heading"
      className="
        relative
        isolate
        overflow-hidden
        border-b
        border-slate-200/70
        bg-slate-50
        py-28
        dark:border-white/[0.06]
        dark:bg-[#070b14]
        sm:py-32
      "
    >
      <TimelineBackground />

      <div className="container-khel relative z-10">
        {/* ======================================================
            HEADER
        ====================================================== */}

        <header
          data-timeline-heading
          className="
            mx-auto
            mb-16
            max-w-3xl
            text-center
            sm:mb-24
          "
        >
          <SectionEyebrow label="03 — Experience" />

          <h2
            id="experience-heading"
            className="
              mt-5
              text-4xl
              font-semibold
              tracking-[-0.05em]
              text-slate-950
              sm:text-5xl
              dark:text-white
            "
          >
            Engineering through{" "}
            <span className="text-slate-400 dark:text-slate-500">
              real work.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-sm
              leading-7
              text-slate-600
              sm:text-base
              dark:text-slate-400
            "
          >
            A progression shaped by practical projects, continuous
            development, and software designed to solve real problems.
          </p>
        </header>

        {/* ======================================================
            DESKTOP TIMELINE
        ====================================================== */}

        <ExperienceDesktopTimeline />

        {/* ======================================================
            MOBILE TIMELINE
        ====================================================== */}

        <ExperienceMobileTimeline />

        {/* ======================================================
            PHILOSOPHY
        ====================================================== */}

        <div
          className="
            mx-auto
            mt-16
            max-w-2xl
            border-t
            border-slate-200
            pt-7
            text-center
            dark:border-white/[0.08]
          "
        >
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.24em]
              text-slate-400
              dark:text-slate-500
            "
          >
            Engineering philosophy
          </p>

          <p
            className="
              mt-3
              text-sm
              leading-6
              text-slate-600
              dark:text-slate-400
            "
          >
            Reliable systems. Maintainable code. Thoughtful interfaces.
          </p>
        </div>
      </div>
    </section>
  );
}

/* =================================================================
   SECTION EYEBROW
================================================================= */

function SectionEyebrow({
  label,
}: {
  label: string;
}) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span
        className="
          h-px
          w-8
          bg-blue-500/70
          dark:bg-blue-400/70
        "
      />

      <span
        className="
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.3em]
          text-blue-700
          dark:text-blue-400
        "
      >
        {label}
      </span>

      <span
        className="
          h-px
          w-8
          bg-blue-500/70
          dark:bg-blue-400/70
        "
      />
    </div>
  );
}

/* =================================================================
   DESKTOP TIMELINE
================================================================= */

function ExperienceDesktopTimeline() {
  return (
    <div
      data-timeline-desktop
      className="
        relative
        mx-auto
        hidden
        max-w-6xl
        md:block
      "
    >
      {/* MAIN VERTICAL TIMELINE */}

      <TimelineLine />

      <div
        className="
          relative
          space-y-10
          lg:space-y-14
        "
      >
        {experiences.map((entry, index) => {
          const side: "left" | "right" =
            index % 2 === 0 ? "left" : "right";

          return (
            <article
              key={entry.title}
              data-timeline-item
              data-side={side}
              className="
                relative
                grid
                min-h-[272px]
                grid-cols-[minmax(0,1fr)_88px_minmax(0,1fr)]
                items-center
              "
            >
              {/* ==================================================
                  LEFT CARD
              ================================================== */}

              <div
                className="
                  relative
                  z-10
                  col-start-1
                "
              >
                {side === "left" && (
                  <ExperienceCard
                    entry={entry}
                    index={index}
                    side="left"
                  />
                )}
              </div>

              {/* ==================================================
                  CENTER COLUMN

                  This is where the connector belongs.

                  LEFT:
                  CARD ─────●

                  RIGHT:
                  ●───── CARD

                  The connector never enters the card.
              ================================================== */}

              <div
                className="
                  relative
                  z-30
                  col-start-2
                  flex
                  h-full
                  items-center
                  justify-center
                "
              >
                <DesktopConnector side={side} />

                <TimelineNode entry={entry} />
              </div>

              {/* ==================================================
                  RIGHT CARD
              ================================================== */}

              <div
                className="
                  relative
                  z-10
                  col-start-3
                "
              >
                {side === "right" && (
                  <ExperienceCard
                    entry={entry}
                    index={index}
                    side="right"
                  />
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

/* =================================================================
   MOBILE TIMELINE
================================================================= */

function ExperienceMobileTimeline() {
  return (
    <div
      data-timeline-mobile
      className="
        relative
        mx-auto
        max-w-xl
        md:hidden
      "
    >
      <TimelineLine mobile />

      <div className="relative space-y-10">
        {experiences.map((entry, index) => (
          <article
            key={entry.title}
            data-timeline-item
            data-side="right"
            className="
              relative
              min-h-[190px]
              pl-16
            "
          >
            {/* ==================================================
                MOBILE NODE + CONNECTOR
            ================================================== */}

            <div
              className="
                absolute
                left-0
                top-6
                z-20
                flex
                items-center
              "
            >
              <TimelineNode
                entry={entry}
                compact
              />

              {/* Simple horizontal connector */}

              <span
                data-timeline-connector
                aria-hidden="true"
                className="
                  h-px
                  w-6
                  bg-blue-400/50
                  dark:bg-blue-400/60
                "
              />
            </div>

            {/* ==================================================
                MOBILE CARD
            ================================================== */}

            <ExperienceCard
              entry={entry}
              index={index}
              side="mobile"
            />
          </article>
        ))}
      </div>
    </div>
  );
}

/* =================================================================
   VERTICAL TIMELINE LINE
================================================================= */

function TimelineLine({
  mobile = false,
}: {
  mobile?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={[
        `
          pointer-events-none
          absolute
          bottom-0
          top-0
          z-0
          overflow-hidden
          bg-slate-200
          dark:bg-white/[0.08]
        `,
        mobile
          ? "left-5 w-px"
          : "left-1/2 w-px -translate-x-1/2",
      ].join(" ")}
    >
      <div
        data-timeline-progress
        className="
          h-full
          w-full
          origin-top
          bg-gradient-to-b
          from-blue-500
          via-violet-500
          to-cyan-400
          shadow-[0_0_16px_rgba(59,130,246,0.55)]
        "
      />
    </div>
  );
}

/* =================================================================
   DESKTOP HORIZONTAL CONNECTOR

   IMPORTANT:
   This lives inside the 88px center column.

   Center column:

   ┌────────────────────────────────────┐
   │                                    │
   │  ──────────── ●                    │  LEFT
   │                    ● ────────────  │  RIGHT
   │                                    │
   └────────────────────────────────────┘

   Each connector is only 22px long.
   Therefore it cannot overlap the cards.
================================================================= */

function DesktopConnector({
  side,
}: {
  side: "left" | "right";
}) {
  if (side === "left") {
    return (
      <span
        data-timeline-connector
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-0
          top-1/2
          z-0
          h-px
          w-[22px]
          -translate-y-1/2
          bg-blue-400/60
          dark:bg-blue-400/70
        "
      />
    );
  }

  return (
    <span
      data-timeline-connector
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        right-0
        top-1/2
        z-0
        h-px
        w-[22px]
        -translate-y-1/2
        bg-blue-400/60
        dark:bg-blue-400/70
      "
    />
  );
}

/* =================================================================
   TIMELINE NODE
================================================================= */

function TimelineNode({
  entry,
  compact = false,
}: {
  entry: ExperienceEntry;
  compact?: boolean;
}) {
  const Icon = entry.icon;

  return (
    <div
      data-timeline-node
      data-active="false"
      className={[
        `
          timeline-node
          relative
          z-20
          flex
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          border-slate-200
          bg-white
          shadow-[0_0_0_5px_rgba(248,250,252,0.95)]
          dark:border-white/[0.13]
          dark:bg-[#070b14]
          dark:shadow-[0_0_0_5px_rgba(7,11,20,0.95)]
        `,
        compact
          ? "h-10 w-10"
          : "h-11 w-11",
      ].join(" ")}
    >
      {/* ========================================================
          HALO
      ======================================================== */}

      <span
        data-timeline-halo
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -inset-2
          rounded-full
          border
          border-blue-400/60
          opacity-0
          shadow-[0_0_28px_rgba(59,130,246,0.56)]
        "
      />

      {/* ========================================================
          ICON
      ======================================================== */}

      <span
        data-timeline-icon
        className={[
          `
            relative
            z-10
            flex
            items-center
            justify-center
            rounded-full
            bg-slate-100
            text-slate-500
            transition-colors
            duration-300
            dark:bg-white/[0.07]
            dark:text-slate-400
          `,
          compact
            ? "h-6 w-6"
            : "h-7 w-7",
        ].join(" ")}
      >
        <Icon
          size={compact ? 13 : 14}
          strokeWidth={2}
        />
      </span>
    </div>
  );
}

/* =================================================================
   EXPERIENCE CARD
================================================================= */

function ExperienceCard({
  entry,
  index,
  side,
}: {
  entry: ExperienceEntry;
  index: number;
  side: "left" | "right" | "mobile";
}) {
  const Icon = entry.icon;

  return (
    <article
      data-timeline-card
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-slate-200/80
        bg-white
        p-5
        shadow-[0_14px_42px_rgba(15,23,42,0.055)]
        transition-[border-color,box-shadow,background-color]
        duration-300
        hover:border-blue-400/45
        hover:shadow-[0_18px_52px_rgba(37,99,235,0.12)]
        dark:border-white/[0.08]
        dark:bg-white/[0.025]
        dark:shadow-none
        dark:hover:border-blue-400/30
        dark:hover:bg-white/[0.04]
        sm:p-6
      "
    >
      {/* ========================================================
          TOP ACCENT
      ======================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-blue-400/80
          to-transparent
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      {/* ========================================================
          CARD GLOW
      ======================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-32
          w-32
          rounded-full
          bg-blue-400/[0.09]
          opacity-0
          blur-3xl
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      <div className="relative">
        {/* ====================================================
            HEADER
        ==================================================== */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <div>
            <p
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-blue-700
                dark:text-blue-400
              "
            >
              {entry.type}
            </p>

            <div
              className="
                mt-2
                flex
                items-center
                gap-1.5
                text-[10px]
                font-medium
                tracking-[0.14em]
                text-slate-400
                dark:text-slate-500
              "
            >
              <CalendarDays size={12} />

              {entry.date}
            </div>
          </div>

          {/* CARD ICON */}

          <span
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              text-slate-400
              transition-colors
              duration-300
              group-hover:border-blue-400/30
              group-hover:text-blue-600
              dark:border-white/[0.07]
              dark:bg-white/[0.035]
              dark:text-slate-500
              dark:group-hover:text-blue-300
            "
          >
            <Icon size={17} />
          </span>
        </div>

        {/* ====================================================
            TITLE
        ==================================================== */}

        <h3
          className="
            mt-5
            text-lg
            font-semibold
            leading-snug
            tracking-[-0.03em]
            text-slate-950
            transition-colors
            duration-300
            group-hover:text-blue-700
            dark:text-white
            dark:group-hover:text-blue-300
            sm:text-xl
          "
        >
          {entry.title}
        </h3>

        {/* ====================================================
            DESCRIPTION
        ==================================================== */}

        <p
          className="
            mt-4
            text-sm
            leading-6
            text-slate-600
            dark:text-slate-400
          "
        >
          {entry.description}
        </p>

        {/* ====================================================
            FOOTER
        ==================================================== */}

        <div
          className="
            mt-5
            border-t
            border-slate-100
            pt-4
            dark:border-white/[0.07]
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-slate-400
                dark:text-slate-500
              "
            >
              {entry.period}
            </span>

            <span
              className="
                flex
                items-center
                gap-1
                text-[10px]
                font-medium
                text-slate-400
                transition-colors
                duration-300
                group-hover:text-blue-600
                dark:text-slate-600
                dark:group-hover:text-blue-400
              "
            >
              {String(index + 1).padStart(2, "0")}

              <ArrowUpRight size={13} />
            </span>
          </div>

          {/* ==================================================
              TECHNOLOGIES
          ================================================== */}

          <div
            className="
              mt-3
              flex
              flex-wrap
              gap-2
            "
          >
            {entry.technologies.map((technology) => (
              <span
                key={technology}
                className="
                  rounded-md
                  border
                  border-slate-200
                  bg-slate-50
                  px-2.5
                  py-1.5
                  text-[10px]
                  font-medium
                  text-slate-600
                  transition-colors
                  duration-300
                  group-hover:border-blue-400/20
                  dark:border-white/[0.07]
                  dark:bg-white/[0.035]
                  dark:text-slate-400
                "
              >
                {technology}
              </span>
            ))}
          </div>

          {/* ==================================================
              CURRENT STATUS
          ================================================== */}

          {entry.current && (
            <span
              className="
                mt-4
                flex
                items-center
                gap-1.5
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.13em]
                text-emerald-600
                dark:text-emerald-400
              "
            >
              <CheckCircle2 size={13} />

              Currently active
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

/* =================================================================
   TIMELINE BACKGROUND
================================================================= */

function TimelineBackground() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
      "
    >
      {/* MAIN BLUE GLOW */}

      <div
        className="
          absolute
          left-1/2
          top-[26%]
          h-[540px]
          w-[540px]
          -translate-x-1/2
          rounded-full
          bg-blue-500/[0.045]
          blur-[135px]
          dark:bg-blue-500/[0.03]
        "
      />

      {/* VIOLET GLOW */}

      <div
        className="
          absolute
          -left-40
          bottom-[8%]
          h-96
          w-96
          rounded-full
          bg-violet-500/[0.035]
          blur-[120px]
          dark:bg-violet-500/[0.025]
        "
      />

      {/* GRID */}

      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(to_right,rgba(15,23,42,0.022)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.022)_1px,transparent_1px)]
          bg-[size:52px_52px]
          dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.018)_1px,transparent_1px)]
        "
      />
    </div>
  );
}