"use client";

import { useEffect, useRef } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Code2,
  Database,
  GitBranch,
} from "lucide-react";
import { gsap } from "@/lib/gsap";

const experiences = [
  {
    period: "CURRENT",
    date: "2022 — PRESENT",
    type: "SOFTWARE DEVELOPMENT",
    title: "Building Modern Web Applications",
    description:
      "Designing and developing responsive web applications using modern frameworks, typed development, reusable interfaces, and practical backend services.",
    technologies: ["Next.js", "React", "TypeScript", "Firebase"],
    icon: Code2,
    current: true,
  },
  {
    period: "PROJECT BASED",
    date: "RECENT PROJECTS",
    type: "FULL STACK DEVELOPMENT",
    title: "Administrative & Business Systems",
    description:
      "Developing software that improves real-world workflows through dashboards, structured data, management interfaces, authentication, and application automation.",
    technologies: ["Web Applications", "Databases", "APIs", "UI/UX"],
    icon: Database,
    current: false,
  },
  {
    period: "CONTINUOUS",
    date: "ONGOING",
    type: "ENGINEERING DEVELOPMENT",
    title: "Learning Through Real Projects",
    description:
      "Continuously improving software engineering practices through hands-on projects, debugging, architecture, performance optimization, and experimentation with modern technologies.",
    technologies: ["Git", "Architecture", "Debugging", "Performance"],
    icon: GitBranch,
    current: false,
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const timeline = timelineRef.current;
    const line = lineRef.current;
    const footer = footerRef.current;

    if (!section || !header || !timeline || !line || !footer) {
      return;
    }

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(
        "[data-experience-item]",
      );

      const nodes = gsap.utils.toArray<HTMLElement>(
        "[data-experience-node]",
      );

      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-experience-card]",
      );

      const meta = gsap.utils.toArray<HTMLElement>(
        "[data-experience-meta]",
      );

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      /* -------------------------------------------------------------- */
      /* Reduced motion                                                  */
      /* -------------------------------------------------------------- */

      if (reduceMotion) {
        gsap.set(
          [
            header,
            ...items,
            ...nodes,
            ...cards,
            ...meta,
            footer,
          ],
          {
            clearProps: "all",
          },
        );

        gsap.set(line, {
          scaleY: 1,
        });

        return;
      }

      /* -------------------------------------------------------------- */
      /* Initial states                                                  */
      /* -------------------------------------------------------------- */

      gsap.set(header, {
        opacity: 0,
        y: 28,
      });

      gsap.set(items, {
        opacity: 0,
        y: 35,
      });

      gsap.set(nodes, {
        opacity: 0,
        scale: 0.65,
      });

      gsap.set(cards, {
        opacity: 0,
        y: 24,
      });

      gsap.set(meta, {
        opacity: 0,
        y: 12,
      });

      gsap.set(footer, {
        opacity: 0,
        y: 24,
      });

      gsap.set(line, {
        scaleY: 0,
        transformOrigin: "top center",
      });

      /* -------------------------------------------------------------- */
      /* Header                                                          */
      /* -------------------------------------------------------------- */

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

      /* -------------------------------------------------------------- */
      /* Timeline line                                                   */
      /* -------------------------------------------------------------- */

      gsap.to(line, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timeline,
          start: "top 68%",
          end: "bottom 70%",
          scrub: 1.2,
        },
      });

      /* -------------------------------------------------------------- */
      /* Experience items                                                */
      /* -------------------------------------------------------------- */

      items.forEach((item, index) => {
        const node = nodes[index];
        const card = cards[index];
        const itemMeta = meta[index];

        if (!node || !card || !itemMeta) {
          return;
        }

        const side = item.dataset.side;

        const direction = side === "left" ? -45 : 45;

        gsap.set(item, {
          x: direction,
        });

        const reveal = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
            once: true,
          },
        });

        reveal.to(
          item,
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          0,
        );

        reveal.to(
          node,
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.5)",
          },
          0.08,
        );

        reveal.to(
          itemMeta,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          0.1,
        );

        reveal.to(
          card,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
          },
          0.12,
        );
      });

      /* -------------------------------------------------------------- */
      /* Current node                                                    */
      /* -------------------------------------------------------------- */

      const currentNode = timeline.querySelector(
        "[data-current-node]",
      ) as HTMLElement | null;

      if (currentNode) {
        gsap.to(currentNode, {
          boxShadow:
            "0 0 0 6px rgba(37, 99, 235, 0.07), 0 0 24px rgba(37, 99, 235, 0.18)",
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      /* -------------------------------------------------------------- */
      /* Card hover                                                      */
      /* -------------------------------------------------------------- */

      cards.forEach((card) => {
        const glow = card.querySelector(
          "[data-card-glow]",
        ) as HTMLElement | null;

        const handleEnter = () => {
          gsap.to(card, {
            y: -4,
            duration: 0.25,
            ease: "power2.out",
          });

          if (glow) {
            gsap.to(glow, {
              opacity: 1,
              duration: 0.25,
            });
          }
        };

        const handleLeave = () => {
          gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });

          if (glow) {
            gsap.to(glow, {
              opacity: 0,
              duration: 0.3,
            });
          }
        };

        card.addEventListener("mouseenter", handleEnter);
        card.addEventListener("mouseleave", handleLeave);

        return () => {
          card.removeEventListener("mouseenter", handleEnter);
          card.removeEventListener("mouseleave", handleLeave);
        };
      });

      /* -------------------------------------------------------------- */
      /* Footer                                                          */
      /* -------------------------------------------------------------- */

      gsap.to(footer, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 88%",
          once: true,
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden border-t border-slate-200/70 bg-white py-28 dark:border-white/[0.06] dark:bg-[#070b14]"
    >
      {/* ---------------------------------------------------------------- */}
      {/* Background                                                       */}
      {/* ---------------------------------------------------------------- */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-[35%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/[0.035] blur-[130px] dark:bg-blue-500/[0.025]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.025)_1px,transparent_1px)] bg-[size:48px_48px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.018)_1px,transparent_1px)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* ---------------------------------------------------------------- */}
        {/* Header                                                           */}
        {/* ---------------------------------------------------------------- */}

        <div
          ref={headerRef}
          className="mx-auto mb-24 max-w-3xl text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-blue-600/50 dark:bg-blue-400/50" />

            <span className="text-[10px] font-semibold tracking-[0.3em] text-blue-600 dark:text-blue-400">
              03 — EXPERIENCE
            </span>

            <span className="h-px w-8 bg-blue-600/50 dark:bg-blue-400/50" />
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl dark:text-white">
            Engineering through{" "}
            <span className="text-slate-400 dark:text-slate-500">
              real work.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-400">
            A progression shaped by practical projects, continuous
            development, and building software designed to solve
            real problems.
          </p>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Desktop Timeline                                                  */}
        {/* ---------------------------------------------------------------- */}

        <div
          ref={timelineRef}
          className="relative mx-auto hidden max-w-5xl lg:block"
        >
          {/* Central line */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 top-0 z-0 w-px -translate-x-1/2 overflow-hidden bg-slate-200 dark:bg-white/[0.07]"
          >
            <div
              ref={lineRef}
              className="h-full w-full origin-top bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500"
            />
          </div>

          <div className="relative z-10 space-y-16">
            {experiences.map((experience, index) => {
              const Icon = experience.icon;
              const isLeft = index % 2 === 0;

              return (
                <article
                  key={experience.title}
                  data-experience-item
                  data-side={isLeft ? "left" : "right"}
                  className="grid min-h-[300px] grid-cols-[1fr_72px_1fr] items-start"
                >
                  {/* ------------------------------------------------------ */}
                  {/* Left column                                             */}
                  {/* ------------------------------------------------------ */}

                  <div className="pr-10">
                    {isLeft ? (
                      <ExperienceMeta
                        experience={experience}
                        align="right"
                      />
                    ) : (
                      <ExperienceCard
                        experience={experience}
                        index={index}
                      />
                    )}
                  </div>

                  {/* ------------------------------------------------------ */}
                  {/* Center node                                             */}
                  {/* ------------------------------------------------------ */}

                  <div className="relative flex justify-center">
                    <div
                      data-experience-node
                      data-current-node={
                        experience.current ? true : undefined
                      }
                      className={`relative z-20 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-white dark:bg-[#070b14] ${
                        experience.current
                          ? "border-blue-500/50"
                          : "border-slate-200 dark:border-white/[0.12]"
                      }`}
                    >
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full ${
                          experience.current
                            ? "bg-blue-600 text-white dark:bg-blue-500"
                            : "bg-slate-100 text-slate-500 dark:bg-white/[0.06] dark:text-slate-400"
                        }`}
                      >
                        <Icon
                          size={13}
                          strokeWidth={2}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ------------------------------------------------------ */}
                  {/* Right column                                            */}
                  {/* ------------------------------------------------------ */}

                  <div className="pl-10">
                    {isLeft ? (
                      <ExperienceCard
                        experience={experience}
                        index={index}
                      />
                    ) : (
                      <ExperienceMeta
                        experience={experience}
                        align="left"
                      />
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Mobile Timeline                                                  */}
        {/* ---------------------------------------------------------------- */}

        <div className="relative lg:hidden">
          {/* Mobile line */}
          <div
            aria-hidden="true"
            className="absolute bottom-5 left-[15px] top-5 w-px bg-slate-200 dark:bg-white/[0.07]"
          />

          <div className="relative space-y-12">
            {experiences.map((experience, index) => {
              return (
                <article
                  key={experience.title}
                  data-experience-item
                  data-side="right"
                  className="relative flex gap-5"
                >
                  {/* Node */}
                  <div className="relative z-10 shrink-0">
                    <div
                      data-experience-node
                      className={`flex h-8 w-8 items-center justify-center rounded-full border bg-white dark:bg-[#070b14] ${
                        experience.current
                          ? "border-blue-500/50"
                          : "border-slate-200 dark:border-white/[0.12]"
                      }`}
                    >
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          experience.current
                            ? "bg-blue-500"
                            : "bg-slate-400 dark:bg-slate-600"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <ExperienceMobileCard
                      experience={experience}
                      index={index}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Footer                                                           */}
        {/* ---------------------------------------------------------------- */}

        <div
          ref={footerRef}
          className="mx-auto mt-20 max-w-2xl border-t border-slate-200 pt-8 text-center dark:border-white/[0.08]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
            Engineering philosophy
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Reliable systems. Maintainable code. Thoughtful interfaces.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* EXPERIENCE META                                                            */
/* ========================================================================== */

function ExperienceMeta({
  experience,
  align,
}: {
  experience: (typeof experiences)[number];
  align: "left" | "right";
}) {
  return (
    <div
      data-experience-meta
      className={`pt-2 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {/* Date */}
      <div
        className={`mb-3 flex items-center gap-2 ${
          align === "right"
            ? "justify-end"
            : "justify-start"
        }`}
      >
        <CalendarDays
          size={13}
          className="text-slate-400 dark:text-slate-600"
        />

        <span className="text-[10px] font-medium tracking-[0.18em] text-slate-400 dark:text-slate-500">
          {experience.date}
        </span>
      </div>

      {/* Period */}
      <div
        className={`mb-4 flex items-center gap-2 ${
          align === "right"
            ? "justify-end"
            : "justify-start"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            experience.current
              ? "bg-blue-500"
              : "bg-slate-300 dark:bg-slate-600"
          }`}
        />

        <span className="text-[10px] font-semibold tracking-[0.2em] text-blue-600 dark:text-blue-400">
          {experience.period}
        </span>
      </div>

      {/* Type */}
      <h3 className="text-xs font-semibold tracking-[0.08em] text-slate-900 dark:text-slate-200">
        {experience.type}
      </h3>

      {/* Small supporting line */}
      <div
        className={`mt-4 flex items-center gap-2 ${
          align === "right"
            ? "justify-end"
            : "justify-start"
        }`}
      >
        <span className="h-px w-6 bg-slate-200 dark:bg-white/[0.08]" />

        <span className="text-[9px] uppercase tracking-[0.18em] text-slate-400 dark:text-slate-600">
          Engineering
        </span>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* EXPERIENCE CARD                                                            */
/* ========================================================================== */

function ExperienceCard({
  experience,
  index,
}: {
  experience: (typeof experiences)[number];
  index: number;
}) {
  return (
    <div
      data-experience-card
      tabIndex={0}
      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 outline-none shadow-[0_10px_35px_rgba(15,23,42,0.04)] transition-colors duration-300 focus-visible:border-blue-500/40 dark:border-white/[0.08] dark:bg-white/[0.025] dark:shadow-none"
    >
      {/* Hover glow */}
      <div
        data-card-glow
        className="pointer-events-none absolute inset-0 opacity-0"
      >
        <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-blue-500/[0.07] blur-3xl" />

        <div className="absolute bottom-0 left-0 h-24 w-32 rounded-full bg-purple-500/[0.035] blur-3xl" />
      </div>

      <div className="relative">
        {/* Card header */}
        <div className="mb-5 flex items-center justify-between">
          <span className="text-[9px] font-semibold tracking-[0.22em] text-slate-400 dark:text-slate-600">
            EXPERIENCE /{" "}
            {String(index + 1).padStart(2, "0")}
          </span>

          <ArrowUpRight
            size={15}
            className="text-slate-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-500 dark:text-slate-600"
          />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">
          {experience.title}
        </h3>

        {/* Description */}
        <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {experience.description}
        </p>

        {/* Divider */}
        <div className="my-6 h-px bg-slate-100 dark:bg-white/[0.06]" />

        {/* Stack */}
        <div>
          <span className="text-[9px] font-semibold tracking-[0.2em] text-slate-400 dark:text-slate-600">
            STACK
          </span>

          <div className="mt-3 flex flex-wrap gap-2">
            {experience.technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10px] font-medium text-slate-600 dark:border-white/[0.07] dark:bg-white/[0.035] dark:text-slate-400"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>

        {/* Current state */}
        {experience.current && (
          <div className="mt-5 flex items-center gap-2 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 size={13} />

            <span>Currently active</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ========================================================================== */
/* MOBILE CARD                                                                */
/* ========================================================================== */

function ExperienceMobileCard({
  experience,
  index,
}: {
  experience: (typeof experiences)[number];
  index: number;
}) {
  return (
    <div
      data-experience-card
      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] dark:border-white/[0.08] dark:bg-white/[0.025] dark:shadow-none"
    >
      {/* Top metadata */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="text-[9px] font-semibold tracking-[0.18em] text-slate-400 dark:text-slate-600">
          {String(index + 1).padStart(2, "0")} /{" "}
          {experience.period}
        </span>

        {experience.current && (
          <span className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-blue-600 dark:text-blue-400">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Current
          </span>
        )}
      </div>

      {/* Type */}
      <p className="text-[10px] font-semibold tracking-[0.16em] text-blue-600 dark:text-blue-400">
        {experience.type}
      </p>

      {/* Title */}
      <h3 className="mt-2 text-lg font-semibold tracking-[-0.025em] text-slate-950 dark:text-white">
        {experience.title}
      </h3>

      {/* Description */}
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {experience.description}
      </p>

      {/* Technologies */}
      <div className="mt-5 flex flex-wrap gap-2">
        {experience.technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[9px] font-medium text-slate-500 dark:border-white/[0.07] dark:bg-white/[0.035] dark:text-slate-500"
          >
            {technology}
          </span>
        ))}
      </div>
    </div>
  );
}