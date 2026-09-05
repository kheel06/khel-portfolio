"use client";

import { useEffect, useRef } from "react";
import {
  CheckCircle2,
  GraduationCap,
  School,
  BookOpen,
} from "lucide-react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

const education = [
  {
    period: "2022 — 2026",
    type: "HIGHER EDUCATION",
    title: "Bachelor of Science in Information Technology",
    institution: "Bestlink College of the Philippines",
    description:
      "Graduated May 7, 2026, with an academic foundation in software development, databases, information management, systems analysis, and problem-solving.",
    status: "Completed",
    current: true,
    icon: GraduationCap,
  },
  {
    period: "2020 — 2022",
    type: "EDUCATION",
    title: "Senior High School",
    institution: "San Jose Del Monte National Trade School",
    description:
      "Completed senior high school education with a foundation for further technical and academic development.",
    status: "Academic Background",
    current: false,
    icon: School,
  },
  {
    period: "2016 — 2020",
    type: "EDUCATION",
    title: "Junior High School",
    institution: "San Jose Del Monte National Trade School",
    description: "Completed junior high school education.",
    status: "Academic Background",
    current: false,
    icon: BookOpen,
  },
  {
    period: "2010 — 2016",
    type: "EDUCATION",
    title: "Elementary Education",
    institution: "Pias Elementary School",
    description: "Completed elementary education.",
    status: "Academic Background",
    current: false,
    icon: BookOpen,
  },
];

export function Education() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const progressLineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    const progressLine = progressLineRef.current;

    if (!section || !timeline || !progressLine) return;

    const cleanupListeners: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const header = section.querySelector("[data-education-header]");
      const items = gsap.utils.toArray<HTMLElement>(
        "[data-education-item]",
        section,
      );

      /*
       * -----------------------------------------
       * INITIAL STATES
       * -----------------------------------------
       */

      if (!reducedMotion) {
        if (header) {
          gsap.set(header, {
            opacity: 0,
            y: 30,
          });
        }

        gsap.set(progressLine, {
          scaleY: 0,
          transformOrigin: "top center",
        });

        items.forEach((item) => {
          const card = item.querySelector<HTMLElement>(
            "[data-education-card]",
          );

          const marker = item.querySelector<HTMLElement>(
            "[data-education-marker]",
          );

          const period = item.querySelector<HTMLElement>(
            "[data-education-period]",
          );

          if (card) {
            gsap.set(card, {
              opacity: 0,
              y: 35,
            });
          }

          if (marker) {
            gsap.set(marker, {
              opacity: 0,
              scale: 0.4,
            });
          }

          if (period) {
            gsap.set(period, {
              opacity: 0,
              y: 8,
            });
          }
        });
      }

      /*
       * -----------------------------------------
       * HEADER ENTRANCE
       * -----------------------------------------
       */

      if (!reducedMotion && header) {
        gsap.to(header, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 82%",
            once: true,
          },
        });
      }

      /*
       * -----------------------------------------
       * CENTER TIMELINE LINE
       * -----------------------------------------
       */

      if (!reducedMotion) {
        gsap.to(progressLine, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timeline,
            start: "top 72%",
            end: "bottom 68%",
            scrub: 1.1,
          },
        });
      } else {
        gsap.set(progressLine, {
          scaleY: 1,
        });
      }

      /*
       * -----------------------------------------
       * EDUCATION ITEMS
       * -----------------------------------------
       */

      items.forEach((item) => {
        const card = item.querySelector<HTMLElement>(
          "[data-education-card]",
        );

        const marker = item.querySelector<HTMLElement>(
          "[data-education-marker]",
        );

        const period = item.querySelector<HTMLElement>(
          "[data-education-period]",
        );

        if (!card || !marker) return;

        if (reducedMotion) {
          gsap.set(card, {
            opacity: 1,
            y: 0,
          });

          gsap.set(marker, {
            opacity: 1,
            scale: 1,
          });

          if (period) {
            gsap.set(period, {
              opacity: 1,
              y: 0,
            });
          }

          return;
        }

        const isLeft = item.dataset.side === "left";

        /*
         * Card reveal
         */

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: isLeft ? -35 : 35,
            y: 15,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 78%",
              once: true,
            },
          },
        );

        /*
         * Marker reveal
         */

        gsap.fromTo(
          marker,
          {
            opacity: 0,
            scale: 0.3,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "top 78%",
              once: true,
            },
          },
        );

        /*
         * Period reveal
         */

        if (period) {
          gsap.fromTo(
            period,
            {
              opacity: 0,
              y: 8,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 78%",
                once: true,
              },
            },
          );
        }

        /*
         * Current education marker pulse
         */

        if (item.dataset.current === "true") {
          const pulse = marker.querySelector<HTMLElement>(
            "[data-current-pulse]",
          );

          if (pulse) {
            gsap.to(pulse, {
              scale: 1.8,
              opacity: 0,
              duration: 1.8,
              repeat: -1,
              ease: "power2.out",
            });
          }
        }

        /*
         * -----------------------------------------
         * CARD HOVER
         * -----------------------------------------
         */

        const handleEnter = () => {
          gsap.to(card, {
            y: -5,
            duration: 0.25,
            ease: "power2.out",
          });

          gsap.to(marker, {
            scale: 1.12,
            duration: 0.25,
            ease: "power2.out",
          });
        };

        const handleLeave = () => {
          gsap.to(card, {
            y: 0,
            duration: 0.25,
            ease: "power2.out",
          });

          gsap.to(marker, {
            scale: 1,
            duration: 0.25,
            ease: "power2.out",
          });
        };

        card.addEventListener("mouseenter", handleEnter);
        card.addEventListener("mouseleave", handleLeave);

        cleanupListeners.push(() => {
          card.removeEventListener("mouseenter", handleEnter);
          card.removeEventListener("mouseleave", handleLeave);
        });
      });
    }, section);

    /*
     * -----------------------------------------
     * CLEANUP
     * -----------------------------------------
     */

    return () => {
      cleanupListeners.forEach((cleanup) => cleanup());

      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerElement = trigger.trigger;

        if (
          triggerElement instanceof HTMLElement &&
          section.contains(triggerElement)
        ) {
          trigger.kill();
        }
      });

      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="
        relative
        overflow-hidden
        border-t
        border-slate-200/70
        bg-white
        py-24
        dark:border-white/[0.06]
        dark:bg-[#070B14]
        sm:py-28
        lg:py-32
      "
    >
      {/* -----------------------------------------
          BACKGROUND
      ----------------------------------------- */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-[20%]
            h-[500px]
            w-[500px]
            -translate-x-1/2
            rounded-full
            bg-blue-500/[0.035]
            blur-[120px]
            dark:bg-blue-500/[0.035]
          "
        />

        <div
          className="
            absolute
            right-[-180px]
            top-[45%]
            h-[400px]
            w-[400px]
            rounded-full
            bg-purple-500/[0.025]
            blur-[120px]
            dark:bg-purple-500/[0.025]
          "
        />

        <div
          className="
            absolute
            left-[-180px]
            bottom-[10%]
            h-[400px]
            w-[400px]
            rounded-full
            bg-cyan-500/[0.025]
            blur-[120px]
            dark:bg-cyan-500/[0.025]
          "
        />
      </div>

      {/* -----------------------------------------
          CONTENT
      ----------------------------------------- */}

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
        {/* -----------------------------------------
            HEADER
        ----------------------------------------- */}

        <div
          data-education-header
          className="mb-20 max-w-2xl lg:mb-24"
        >
          <div className="mb-5 flex items-center gap-3">
            <span
              className="
                h-px
                w-8
                bg-cyan-500
                dark:bg-cyan-400
              "
            />

            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-cyan-600
                dark:text-cyan-400
              "
            >
              02 — EDUCATION
            </span>
          </div>

          <h2
            className="
              text-3xl
              font-semibold
              tracking-[-0.04em]
              text-slate-950
              sm:text-4xl
              lg:text-5xl
              dark:text-white
            "
          >
            Academic foundation.
          </h2>

          <p
            className="
              mt-5
              max-w-xl
              text-sm
              leading-7
              text-slate-600
              sm:text-base
              dark:text-slate-400
            "
          >
            A timeline of the academic experiences that built the
            foundation for my work in software development and
            information technology.
          </p>
        </div>

        {/* -----------------------------------------
            TIMELINE
        ----------------------------------------- */}

        <div
          ref={timelineRef}
          className="
            relative
            mx-auto
            max-w-5xl
          "
        >
          {/* -----------------------------------------
              CENTER LINE
              ----------------------------------------- */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-0
              left-[28px]
              top-0
              w-px
              md:left-1/2
              md:-translate-x-1/2
            "
          >
            {/* Base line */}

            <div
              className="
                absolute
                inset-0
                bg-slate-200
                dark:bg-white/[0.07]
              "
            />

            {/* Animated progress */}

            <div
              ref={progressLineRef}
              className="
                absolute
                inset-x-0
                top-0
                h-full
                origin-top
                bg-gradient-to-b
                from-cyan-400
                via-blue-500
                to-purple-500
              "
            />
          </div>

          {/* -----------------------------------------
              ITEMS
          ----------------------------------------- */}

          <div className="space-y-14 md:space-y-20">
            {education.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <EducationItem
                  key={`${item.title}-${item.period}`}
                  item={item}
                  isLeft={isLeft}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==================================================
   EDUCATION ITEM
   ================================================== */

function EducationItem({
  item,
  isLeft,
}: {
  item: (typeof education)[number];
  isLeft: boolean;
}) {
  return (
    <article
      data-education-item
      data-side={isLeft ? "left" : "right"}
      data-current={item.current}
      className="
        relative
        min-h-[230px]
        md:grid
        md:grid-cols-[1fr_72px_1fr]
        md:items-center
      "
    >
      {/* -----------------------------------------
          LEFT DESKTOP CARD
      ----------------------------------------- */}

      <div
        className={`
          hidden
          md:block
          ${
            isLeft
              ? "md:col-start-1 md:pr-10 lg:pr-14"
              : "md:col-start-1"
          }
        `}
      >
        {isLeft ? (
          <EducationCard item={item} />
        ) : (
          <div aria-hidden="true" />
        )}
      </div>

      {/* -----------------------------------------
          CENTER MARKER
      ----------------------------------------- */}

      <div
        className="
          relative
          hidden
          h-full
          md:col-start-2
          md:block
        "
      >
        <div
          data-education-marker
          className="
            absolute
            left-1/2
            top-1/2
            z-20
            flex
            h-6
            w-6
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-slate-300
            bg-white
            shadow-[0_0_0_5px_rgba(255,255,255,0.8)]
            dark:border-white/[0.14]
            dark:bg-[#0B1120]
            dark:shadow-[0_0_0_5px_rgba(7,11,20,0.9)]
          "
        >
          {/* Pulse */}

          {item.current && (
            <span
              data-current-pulse
              aria-hidden="true"
              className="
                absolute
                inset-0
                rounded-full
                border
                border-cyan-400/50
              "
            />
          )}

          {/* Core */}

          <span
            className={`
              relative
              h-2
              w-2
              rounded-full
              ${
                item.current
                  ? "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                  : "bg-slate-400 dark:bg-slate-500"
              }
            `}
          />
        </div>
      </div>

      {/* -----------------------------------------
          RIGHT DESKTOP CARD
      ----------------------------------------- */}

      <div
        className={`
          hidden
          md:block
          ${
            !isLeft
              ? "md:col-start-3 md:pl-10 lg:pl-14"
              : "md:col-start-3"
          }
        `}
      >
        {!isLeft ? (
          <EducationCard item={item} />
        ) : (
          <div aria-hidden="true" />
        )}
      </div>

      {/* -----------------------------------------
          MOBILE
      ----------------------------------------- */}

      <div className="relative pl-[60px] md:hidden">
        {/* Mobile marker */}

        <div
          data-education-marker
          className="
            absolute
            left-[16px]
            top-1/2
            z-20
            flex
            h-6
            w-6
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-slate-300
            bg-white
            shadow-[0_0_0_5px_rgba(255,255,255,0.85)]
            dark:border-white/[0.14]
            dark:bg-[#0B1120]
            dark:shadow-[0_0_0_5px_rgba(7,11,20,0.9)]
          "
        >
          {item.current && (
            <span
              data-current-pulse
              aria-hidden="true"
              className="
                absolute
                inset-0
                rounded-full
                border
                border-cyan-400/50
              "
            />
          )}

          <span
            className={`
              relative
              h-2
              w-2
              rounded-full
              ${
                item.current
                  ? "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                  : "bg-slate-400 dark:bg-slate-500"
              }
            `}
          />
        </div>

        <EducationCard item={item} />
      </div>
    </article>
  );
}

/* ==================================================
   EDUCATION CARD
   ================================================== */

function EducationCard({
  item,
}: {
  item: (typeof education)[number];
}) {
  const Icon = item.icon;

  return (
    <div
      data-education-card
      tabIndex={0}
      className="
        group
        relative
        w-full
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-white/90
        p-5
        shadow-sm
        outline-none
        transition-[border-color,box-shadow,background-color]
        duration-300
        hover:border-cyan-400/40
        hover:shadow-[0_18px_50px_rgba(15,23,42,0.08)]
        focus-visible:border-cyan-400/60
        focus-visible:ring-2
        focus-visible:ring-cyan-400/30
        sm:p-6
        dark:border-white/[0.08]
        dark:bg-[#0B1120]/80
        dark:hover:border-cyan-400/30
        dark:hover:shadow-[0_18px_50px_rgba(0,0,0,0.25)]
        dark:focus-visible:border-cyan-400/50
      "
    >
      {/* -----------------------------------------
          TOP ACCENT
      ----------------------------------------- */}

      <div
        className="
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-cyan-400/70
          to-transparent
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      {/* -----------------------------------------
          HEADER
      ----------------------------------------- */}

      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-cyan-500/20
              bg-cyan-500/[0.06]
              px-2.5
              py-1
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-cyan-600
              dark:border-cyan-400/20
              dark:bg-cyan-400/[0.06]
              dark:text-cyan-400
            "
          >
            {item.type}
          </span>

          <span
            data-education-period
            className="
              whitespace-nowrap
              text-[9px]
              font-medium
              tracking-[0.12em]
              text-slate-400
              dark:text-slate-500
            "
          >
            {item.period}
          </span>
        </div>

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
            border-slate-200
            bg-slate-50
            text-slate-400
            transition-colors
            duration-300
            group-hover:border-cyan-400/20
            group-hover:text-cyan-500
            dark:border-white/[0.06]
            dark:bg-white/[0.025]
            dark:text-slate-500
            dark:group-hover:border-cyan-400/20
            dark:group-hover:text-cyan-400
          "
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>

      {/* -----------------------------------------
          TITLE
      ----------------------------------------- */}

      <h3
        className="
          mt-5
          text-lg
          font-semibold
          leading-snug
          tracking-[-0.025em]
          text-slate-950
          transition-colors
          duration-300
          group-hover:text-cyan-600
          sm:text-xl
          dark:text-white
          dark:group-hover:text-cyan-300
        "
      >
        {item.title}
      </h3>

      {/* -----------------------------------------
          INSTITUTION
      ----------------------------------------- */}

      <p
        className="
          mt-1.5
          text-xs
          font-medium
          text-slate-600
          dark:text-slate-400
        "
      >
        {item.institution}
      </p>

      {/* -----------------------------------------
          DESCRIPTION
      ----------------------------------------- */}

      <p
        className="
          mt-5
          text-xs
          leading-6
          text-slate-500
          sm:text-[13px]
          dark:text-slate-400
        "
      >
        {item.description}
      </p>

      {/* -----------------------------------------
          FOOTER
      ----------------------------------------- */}

      <div
        className="
          mt-5
          flex
          items-center
          justify-between
          border-t
          border-slate-200
          pt-4
          dark:border-white/[0.06]
        "
      >
        <div className="flex items-center gap-2">
          {item.current ? (
            <>
              <CheckCircle2
                className="
                  h-3.5
                  w-3.5
                  text-emerald-500
                  dark:text-emerald-400
                "
              />

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-emerald-600
                  dark:text-emerald-400
                "
              >
                {item.status}
              </span>
            </>
          ) : (
            <>
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-slate-400
                  dark:bg-slate-600
                "
              />

              <span
                className="
                  text-[9px]
                  font-medium
                  text-slate-400
                  dark:text-slate-500
                "
              >
                {item.status}
              </span>
            </>
          )}
        </div>

        <span
          className="
            text-[9px]
            font-medium
            tracking-[0.12em]
            text-slate-400
            transition-colors
            duration-300
            group-hover:text-cyan-500
            dark:text-slate-600
            dark:group-hover:text-cyan-400
          "
        >
          {item.period} ↗
        </span>
      </div>
    </div>
  );
}