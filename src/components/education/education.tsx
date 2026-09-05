"use client";

import { useEffect, useRef } from "react";
import type { ComponentType } from "react";
import {
  CheckCircle2,
  GraduationCap,
  School,
  BookOpen,
} from "lucide-react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

type EducationIcon = ComponentType<{ className?: string }>;

type EducationItemData = {
  period: string;
  type: string;
  title: string;
  institution: string;
  description: string;
  status: string;
  current: boolean;
  icon: EducationIcon;
};

const education: EducationItemData[] = [
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
  const progressTipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    const progressLine = progressLineRef.current;
    const progressTip = progressTipRef.current;

    if (!section || !timeline || !progressLine) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const header = section.querySelector<HTMLElement>(
        "[data-education-header]",
      );

      const items = gsap.utils.toArray<HTMLElement>(
        "[data-education-item]",
        section,
      );

      const markerData = items.map((item) => {
        const marker = item.querySelector<HTMLElement>(
          "[data-education-marker]",
        );
        const core = marker?.querySelector<HTMLElement>(
          "[data-marker-core]",
        );
        const glow = marker?.querySelector<HTMLElement>(
          "[data-marker-glow]",
        );
        const pulse = marker?.querySelector<HTMLElement>(
          "[data-current-pulse]",
        );

        return { item, marker, core, glow, pulse };
      });

      /* ------------------------------------------------------------
       * ACCESSIBLE / REDUCED-MOTION STATE
       * ------------------------------------------------------------ */
      if (prefersReducedMotion) {
        if (header) gsap.set(header, { opacity: 1, y: 0, clearProps: "filter" });

        gsap.set(progressLine, {
          scaleY: 1,
          transformOrigin: "top center",
        });

        if (progressTip) gsap.set(progressTip, { opacity: 0 });

        items.forEach((item) => {
          const card = item.querySelector<HTMLElement>("[data-education-card]");
          if (!card) return;

          gsap.set(card, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            clearProps: "filter,transform",
          });

          gsap.set(
            item.querySelectorAll<HTMLElement>("[data-education-reveal]"),
            { opacity: 1, y: 0, x: 0, clearProps: "transform,filter" },
          );
        });

        markerData.forEach(({ marker, core, glow, pulse }) => {
          if (!marker) return;
          marker.dataset.reached = "true";
          gsap.set(marker, { opacity: 1, scale: 1 });
          if (core) gsap.set(core, { scale: 1 });
          if (glow) gsap.set(glow, { opacity: 0.95, scale: 1 });
          if (pulse) gsap.set(pulse, { opacity: 0 });
        });

        return;
      }

      /* ------------------------------------------------------------
       * INITIAL STATES
       * ------------------------------------------------------------ */
      if (header) {
        gsap.set(header, {
          opacity: 0,
          y: 36,
          filter: "blur(8px)",
        });
      }

      gsap.set(progressLine, {
        scaleY: 0,
        transformOrigin: "top center",
      });

      if (progressTip) {
        gsap.set(progressTip, {
          opacity: 0,
          scale: 0.7,
          transformOrigin: "center",
        });
      }

      markerData.forEach(({ marker, core, glow }) => {
        if (!marker) return;

        marker.dataset.reached = "false";
        gsap.set(marker, {
          opacity: 1,
          scale: 0.96,
          transformOrigin: "center",
        });

        if (core) {
          gsap.set(core, {
            scale: 0.86,
            transformOrigin: "center",
          });
        }

        if (glow) {
          gsap.set(glow, {
            opacity: 0,
            scale: 0.65,
            transformOrigin: "center",
          });
        }
      });

      items.forEach((item) => {
        const card = item.querySelector<HTMLElement>("[data-education-card]");
        const parts = item.querySelectorAll<HTMLElement>("[data-education-reveal]");
        const connector = item.querySelector<HTMLElement>(
          "[data-education-connector]",
        );
        const connectorLine = item.querySelector<HTMLElement>(
          "[data-connector-line]",
        );
        const connectorArrow = item.querySelector<HTMLElement>(
          "[data-connector-arrow]",
        );
        const isLeft = item.dataset.side === "left";

        if (!card) return;

        gsap.set(card, {
          opacity: 0,
          x: isLeft ? -54 : 54,
          y: 26,
          scale: 0.975,
          transformOrigin: isLeft ? "right center" : "left center",
        });

        gsap.set(parts, {
          opacity: 0,
          y: 14,
        });

        if (connector) {
          gsap.set(connector, {
            opacity: 0,
            scaleX: 0,
            transformOrigin: isLeft ? "right center" : "left center",
          });
        }

        if (connectorLine) {
          gsap.set(connectorLine, {
            opacity: 0,
          });
        }

        if (connectorArrow) {
          gsap.set(connectorArrow, {
            opacity: 0,
            scale: 0.6,
          });
        }
      });

      /* ------------------------------------------------------------
       * HEADER REVEAL
       * ------------------------------------------------------------ */
      if (header) {
        gsap.to(header, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 86%",
            once: true,
          },
        });
      }

      /* ------------------------------------------------------------
       * PROGRESS LINE
       * ------------------------------------------------------------ */
      const setMarkerInactive = (marker: HTMLElement, core: HTMLElement | null, glow: HTMLElement | null) => {
        marker.dataset.reached = "false";

        gsap.to(marker, {
          scale: 0.96,
          duration: 0.28,
          ease: "power2.out",
          overwrite: true,
        });

        if (core) {
          gsap.to(core, {
            scale: 0.86,
            duration: 0.25,
            ease: "power2.out",
            overwrite: true,
          });
        }

        if (glow) {
          gsap.to(glow, {
            opacity: 0,
            scale: 0.65,
            duration: 0.28,
            ease: "power2.out",
            overwrite: true,
          });
        }
      };

      const setMarkerActive = (
        marker: HTMLElement,
        core: HTMLElement | null,
        glow: HTMLElement | null,
        immediate = false,
      ) => {
        marker.dataset.reached = "true";

        if (immediate) {
          gsap.set(marker, { scale: 1.06 });
          if (core) gsap.set(core, { scale: 1 });
          if (glow) gsap.set(glow, { opacity: 1, scale: 1 });
          return;
        }

        gsap.fromTo(
          marker,
          { scale: 0.92 },
          {
            scale: 1.06,
            duration: 0.38,
            ease: "back.out(2.2)",
            overwrite: true,
          },
        );

        if (core) {
          gsap.fromTo(
            core,
            { scale: 0.72 },
            {
              scale: 1,
              duration: 0.34,
              ease: "back.out(2.5)",
              overwrite: true,
            },
          );
        }

        if (glow) {
          gsap.fromTo(
            glow,
            { opacity: 0, scale: 0.55 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.45,
              ease: "power2.out",
              overwrite: true,
            },
          );
        }
      };

      const updateTimelineMarkers = (progress: number) => {
        const timelineHeight = timeline.offsetHeight;
        if (!timelineHeight) return;

        const progressPosition = timelineHeight * progress;

        markerData.forEach(({ item, marker, core, glow }) => {
          if (!marker) return;

          const markerPosition = item.offsetTop + item.offsetHeight / 2;
          const reached = progressPosition >= markerPosition - 10;
          const isReached = marker.dataset.reached === "true";

          if (reached && !isReached) {
            setMarkerActive(marker, core ?? null, glow ?? null);
          } else if (!reached && isReached) {
            setMarkerInactive(marker, core ?? null, glow ?? null);
          }
        });
      };

      gsap.to(progressLine, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timeline,
          start: "top 76%",
          end: "bottom 62%",
          scrub: 0.65,
          invalidateOnRefresh: true,
          onEnter: () => {
            if (!progressTip) return;
            gsap.to(progressTip, {
              opacity: 1,
              scale: 1,
              duration: 0.35,
              ease: "back.out(2)",
              overwrite: true,
            });
          },
          onUpdate: (self) => {
            updateTimelineMarkers(self.progress);
          },
          onRefresh: (self) => {
            updateTimelineMarkers(self.progress);
          },
        },
      });

      /* ------------------------------------------------------------
       * CARD / CONNECTOR REVEALS
       * ------------------------------------------------------------ */
      items.forEach((item, index) => {
        const card = item.querySelector<HTMLElement>("[data-education-card]");
        const parts = gsap.utils.toArray<HTMLElement>(
          "[data-education-reveal]",
          item,
        );
        const connector = item.querySelector<HTMLElement>(
          "[data-education-connector]",
        );
        const connectorLine = item.querySelector<HTMLElement>(
          "[data-connector-line]",
        );
        const connectorArrow = item.querySelector<HTMLElement>(
          "[data-connector-arrow]",
        );

        if (!card) return;

        const isLeft = item.dataset.side === "left";

        const tl = gsap.timeline({
          paused: true,
          defaults: { overwrite: "auto" },
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
            end: "top 46%",
            toggleActions: "play none none reverse",
            once: true,
          },
        });

        tl.to(card, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.72,
          ease: "power3.out",
        })
          .to(
            parts,
            {
              opacity: 1,
              y: 0,
              duration: 0.42,
              stagger: 0.055,
              ease: "power2.out",
            },
            "-=0.46",
          );

        if (connector) {
          tl.to(
            connector,
            {
              opacity: 1,
              scaleX: 1,
              duration: 0.35,
              ease: "power2.out",
            },
            "-=0.52",
          );
        }

        if (connectorLine) {
          tl.to(
            connectorLine,
            {
              opacity: 1,
              duration: 0.22,
              ease: "power1.out",
            },
            "-=0.22",
          );
        }

        if (connectorArrow) {
          tl.fromTo(
            connectorArrow,
            {
              opacity: 0,
              scale: 0.55,
              rotation: isLeft ? 45 : 45,
            },
            {
              opacity: 1,
              scale: 1,
              duration: 0.26,
              ease: "back.out(2.4)",
            },
            "-=0.16",
          );
        }

        tl.call(() => {
          const data = markerData[index];
          if (data?.marker && data.marker.dataset.reached === "true") {
            gsap.to(data.marker, {
              scale: 1.08,
              duration: 0.22,
              yoyo: true,
              repeat: 1,
              ease: "power2.out",
            });
          }
        });
      });

      /* ------------------------------------------------------------
       * CURRENT EDUCATION PULSE
       * ------------------------------------------------------------ */
      markerData.forEach(({ item, pulse }) => {
        if (!pulse || item.dataset.current !== "true") return;

        gsap.set(pulse, {
          scale: 0.8,
          opacity: 0.8,
          transformOrigin: "center",
        });

        gsap.to(pulse, {
          scale: 1.7,
          opacity: 0,
          duration: 1.9,
          repeat: -1,
          ease: "power2.out",
          delay: 0.35,
        });
      });

      /* ------------------------------------------------------------
       * REFRESH AFTER LAYOUT / FONT MEASUREMENT
       * ------------------------------------------------------------ */
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
    }, section);

    return () => ctx.revert();
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
      {/* BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
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
          "
        />
        <div
          className="
            absolute
            bottom-[10%]
            left-[-180px]
            h-[400px]
            w-[400px]
            rounded-full
            bg-cyan-500/[0.025]
            blur-[120px]
          "
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
        {/* HEADER */}
        <div
          data-education-header
          className="mx-auto mb-20 max-w-3xl text-center lg:mb-24"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-cyan-500 dark:bg-cyan-400" />
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
            <span className="h-px w-8 bg-cyan-500 dark:bg-cyan-400" />
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
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-slate-600
              sm:text-base
              dark:text-slate-400
            "
          >
            A timeline of the academic experiences that built the foundation
            for my work in software development and information technology.
          </p>
        </div>

        {/* TIMELINE */}
        <div ref={timelineRef} className="relative mx-auto max-w-5xl">
          {/* TIMELINE LINE */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-0
              left-[28px]
              top-0
              z-0
              w-px
              md:left-1/2
              md:-translate-x-1/2
            "
          >
            <div
              className="
                absolute
                inset-0
                bg-slate-200
                dark:bg-white/[0.08]
              "
            />

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
                shadow-[0_0_12px_rgba(34,211,238,0.25)]
              "
            />

            <div
              ref={progressTipRef}
              aria-hidden="true"
              className="
                absolute
                bottom-0
                left-1/2
                h-2
                w-2
                -translate-x-1/2
                translate-y-1/2
                rounded-full
                bg-cyan-300
                shadow-[0_0_16px_rgba(34,211,238,0.95)]
                dark:bg-cyan-200
              "
            />
          </div>

          {/* ITEMS */}
          <div className="relative z-10 space-y-14 md:space-y-20">
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

/* =================================================================
   EDUCATION ITEM
================================================================= */

function EducationItem({
  item,
  isLeft,
}: {
  item: EducationItemData;
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
      {/* LEFT CARD */}
      <div
        className={`
          hidden
          md:block
          ${isLeft ? "md:col-start-1 md:pr-10 lg:pr-14" : "md:col-start-1"}
        `}
      >
        {isLeft ? <EducationCard item={item} /> : <div aria-hidden="true" />}
      </div>

      {/* CONNECTOR */}
      <EducationConnector isLeft={isLeft} />

      {/* CENTER MARKER */}
      <div
        className="
          relative
          z-30
          hidden
          h-full
          md:col-start-2
          md:block
        "
      >
        <EducationMarker item={item} />
      </div>

      {/* RIGHT CARD */}
      <div
        className={`
          hidden
          md:block
          ${!isLeft ? "md:col-start-3 md:pl-10 lg:pl-14" : "md:col-start-3"}
        `}
      >
        {!isLeft ? <EducationCard item={item} /> : <div aria-hidden="true" />}
      </div>

      {/* MOBILE */}
      <div className="relative z-20 pl-[60px] md:hidden">
        <EducationMarker item={item} />
        <EducationCard item={item} />
      </div>
    </article>
  );
}

/* =================================================================
   EDUCATION CONNECTOR
================================================================= */

function EducationConnector({
  isLeft,
}: {
  isLeft: boolean;
}) {
  return (
    <div
      data-education-connector
      aria-hidden="true"
      className={`
        pointer-events-none
        absolute
        top-1/2
        z-20
        hidden
        h-4
        -translate-y-1/2
        md:block
        ${
          isLeft
            ? "right-[calc(50%+12px)] w-6"
            : "left-[calc(50%+12px)] w-6"
        }
      `}
    >
      <span
        data-connector-line
        className="
          absolute
          top-1/2
          h-px
          w-full
          -translate-y-1/2
          bg-cyan-400/70
          shadow-[0_0_8px_rgba(34,211,238,0.45)]
        "
      />

      <span
        data-connector-arrow
        className={`
          absolute
          top-1/2
          h-2
          w-2
          -translate-y-1/2
          rotate-45
          border-cyan-400
          bg-white
          dark:bg-[#070B14]
          ${isLeft ? "left-0 border-b border-l" : "right-0 border-r border-t"}
        `}
      />
    </div>
  );
}

/* =================================================================
   EDUCATION MARKER
================================================================= */

function EducationMarker({
  item,
}: {
  item: EducationItemData;
}) {
  return (
    <div
      data-education-marker
      data-reached="false"
      className="
        absolute
        z-50
        left-1/2
        top-1/2
        flex
        h-7
        w-7
        -translate-x-1/2
        -translate-y-1/2
        items-center
        justify-center
        rounded-full
        border
        border-slate-300
        bg-white
        shadow-[0_0_0_5px_rgba(255,255,255,0.9)]
        transition-[border-color,background-color,box-shadow]
        duration-300
        data-[reached=true]:border-cyan-300
        data-[reached=true]:bg-white
        data-[reached=true]:shadow-[0_0_0_5px_rgba(255,255,255,0.96),0_0_24px_rgba(34,211,238,0.45)]
        dark:border-white/[0.16]
        dark:bg-[#0B1120]
        dark:shadow-[0_0_0_5px_rgba(7,11,20,0.95)]
        dark:data-[reached=true]:border-cyan-300
        dark:data-[reached=true]:bg-[#0B1120]
        dark:data-[reached=true]:shadow-[0_0_0_5px_rgba(7,11,20,0.96),0_0_24px_rgba(34,211,238,0.55)]
      "
    >
      {/* Active glow */}
      <span
        data-marker-glow
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-[-6px]
          rounded-full
          border
          border-cyan-400/60
          opacity-0
          shadow-[0_0_22px_rgba(34,211,238,0.55)]
        "
      />

      {/* Current item pulse */}
      {item.current && (
        <span
          data-current-pulse
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-[-1px]
            rounded-full
            border
            border-cyan-400/50
          "
        />
      )}

      {/* Core */}
      <span
        data-marker-core
        className="
          relative
          z-10
          h-2.5
          w-2.5
          rounded-full
          bg-slate-400
          transition-[background-color,box-shadow]
          duration-300
          data-[reached=true]:bg-cyan-400
          data-[reached=true]:shadow-[0_0_12px_rgba(34,211,238,1)]
          dark:bg-slate-500
          dark:data-[reached=true]:bg-cyan-300
          dark:data-[reached=true]:shadow-[0_0_14px_rgba(34,211,238,1)]
        "
      />
    </div>
  );
}

/* =================================================================
   EDUCATION CARD
================================================================= */

function EducationCard({
  item,
}: {
  item: EducationItemData;
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
        transition-all
        duration-300
        hover:-translate-y-1
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
      {/* TOP ACCENT */}
      <div
        aria-hidden="true"
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

      {/* HEADER */}
      <div className="flex items-start justify-between gap-4" data-education-reveal>
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

      {/* TITLE */}
      <h3
        data-education-reveal
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

      {/* INSTITUTION */}
      <p
        data-education-reveal
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

      {/* DESCRIPTION */}
      <p
        data-education-reveal
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

      {/* FOOTER */}
      <div
        data-education-reveal
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
                className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400"
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
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-600" />
              <span
                className="text-[9px] font-medium text-slate-400 dark:text-slate-500"
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
          {item.period}
        </span>
      </div>
    </div>
  );
}
