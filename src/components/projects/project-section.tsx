"use client";

import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import {
  projects,
  type Project,
  type ProjectCategory,
} from "@/data/projects";

import { ProjectCard } from "./project-card";
import { ProjectDialog } from "./project-dialog";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* =========================================================
   FILTERS
========================================================= */

const filters: Array<"All" | ProjectCategory> = [
  "All",
  "Web",
  "Full Stack",
  "Administrative",
];

/* =========================================================
   PROJECT SECTION
========================================================= */

export function ProjectSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter(
      (project) => project.category === activeFilter,
    );
  }, [activeFilter]);

  /* =========================================================
     MASTER SECTION ANIMATION

     Handles:
     - Header reveal
     - Heading reveal
     - Filter entrance
     - Background atmosphere
     - Bottom technical marker
  ========================================================= */

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const header =
        section.querySelector<HTMLElement>(
          "[data-projects-header]",
        );

      const headerLabel =
        section.querySelector<HTMLElement>(
          "[data-projects-label]",
        );

      const heading =
        section.querySelector<HTMLElement>(
          "[data-projects-title]",
        );

      const description =
        section.querySelector<HTMLElement>(
          "[data-projects-description]",
        );

      const filtersEl =
        section.querySelector<HTMLElement>(
          "[data-projects-filters]",
        );

      const atmosphere =
        gsap.utils.toArray<HTMLElement>(
          "[data-projects-atmosphere]",
          section,
        );

      const bottomMarker =
        section.querySelector<HTMLElement>(
          "[data-projects-bottom-marker]",
        );

      if (
        !header ||
        !heading ||
        !description ||
        !filtersEl
      ) {
        return;
      }

      /* -------------------------------------------------------
         REDUCED MOTION
      ------------------------------------------------------- */

      if (shouldReduceMotion) {
        gsap.set(
          [
            header,
            headerLabel,
            heading,
            description,
            filtersEl,
            bottomMarker,
            ...atmosphere,
          ].filter(Boolean),
          {
            clearProps: "all",
          },
        );

        return;
      }

      /* -------------------------------------------------------
         INITIAL STATES
      ------------------------------------------------------- */

      gsap.set(header, {
        opacity: 0,
        y: 38,
        filter: "blur(8px)",
      });

      if (headerLabel) {
        gsap.set(headerLabel, {
          opacity: 0,
          x: -18,
        });
      }

      gsap.set(heading, {
        opacity: 0,
        y: 24,
        clipPath: "inset(0 0 100% 0)",
      });

      gsap.set(description, {
        opacity: 0,
        y: 18,
      });

      gsap.set(filtersEl, {
        opacity: 0,
        x: 24,
      });

      if (bottomMarker) {
        gsap.set(bottomMarker, {
          opacity: 0,
          y: 18,
        });
      }

      if (atmosphere.length) {
        gsap.set(atmosphere, {
          opacity: 0,
          scale: 0.82,
        });
      }

      /* -------------------------------------------------------
         HEADER REVEAL
      ------------------------------------------------------- */

      const headerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: "top 82%",
          once: true,
        },
      });

      headerTimeline
        .to(
          header,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
          },
          0,
        )
        .to(
          headerLabel,
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            ease: "power3.out",
          },
          0.12,
        )
        .to(
          heading,
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.8,
            ease: "power4.out",
          },
          0.18,
        )
        .to(
          description,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
          },
          0.38,
        )
        .to(
          filtersEl,
          {
            opacity: 1,
            x: 0,
            duration: 0.55,
            ease: "power3.out",
          },
          0.3,
        );

      /* -------------------------------------------------------
         ATMOSPHERE
      ------------------------------------------------------- */

      if (atmosphere.length) {
        const atmosphereTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 15%",
            scrub: 1.4,
          },
        });

        atmosphereTimeline.to(
          atmosphere,
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "none",
            stagger: 0.08,
          },
          0,
        );

        atmosphere.forEach((element, index) => {
          gsap.to(element, {
            xPercent: index % 2 === 0 ? 4 : -4,
            yPercent: index % 2 === 0 ? -3 : 3,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.8,
            },
          });
        });
      }

      /* -------------------------------------------------------
         BOTTOM MARKER
      ------------------------------------------------------- */

      if (bottomMarker) {
        gsap.fromTo(
          bottomMarker,
          {
            opacity: 0,
            y: 18,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bottomMarker,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      /* -------------------------------------------------------
         REFRESH AFTER LAYOUT
      ------------------------------------------------------- */

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, [shouldReduceMotion]);

  /* =========================================================
     CARD GRID ANIMATION

     IMPORTANT:
     Event listeners are cleaned up separately.

     DO NOT use:
       ctx.add(...)

     inside the gsap.context callback because ctx is not
     initialized until gsap.context() returns.
  ========================================================= */

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section || shouldReduceMotion) {
      return;
    }

    /*
     * Store DOM event cleanup functions here.
     *
     * This is the important fix for:
     *
     * Cannot access 'ctx' before initialization
     */
    const eventCleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const grid =
        section.querySelector<HTMLElement>(
          "[data-projects-grid]",
        );

      const cards =
        gsap.utils.toArray<HTMLElement>(
          "[data-projects-card]",
          section,
        );

      if (!grid || cards.length === 0) {
        return;
      }

      cards.forEach((card, index) => {
        const image =
          card.querySelector<HTMLElement>(
            ".project-card-image",
          );

        const glow =
          card.querySelector<HTMLElement>(
            ".project-card-glow",
          );

        const isRight = index % 2 === 1;

        /* -----------------------------------------------------
           INITIAL CARD STATE
        ----------------------------------------------------- */

        gsap.set(card, {
          opacity: 0,
          y: 42,
          x: isRight ? 24 : -24,
          scale: 0.97,
          rotate: isRight ? 0.7 : -0.7,
          transformOrigin: "center center",
          clipPath:
            "inset(0 0 12% 0 round 1rem)",
          force3D: true,
        });

        if (image) {
          gsap.set(image, {
            scale: 1.08,
            yPercent: 2,
            force3D: true,
          });
        }

        if (glow) {
          gsap.set(glow, {
            opacity: 0,
            scale: 0.85,
          });
        }

        /* -----------------------------------------------------
           CARD REVEAL
        ----------------------------------------------------- */

        const reveal = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            end: "top 52%",
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        });

        reveal.to(
          card,
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            rotate: 0,
            clipPath:
              "inset(0 0 0% 0 round 1rem)",
            duration: 1,
            ease: "power3.out",
          },
          0,
        );

        if (image) {
          reveal.to(
            image,
            {
              scale: 1,
              yPercent: 0,
              duration: 1,
              ease: "power2.out",
            },
            0.04,
          );
        }

        if (glow) {
          reveal.to(
            glow,
            {
              opacity: 1,
              scale: 1,
              duration: 0.55,
              ease: "power2.out",
            },
            0.25,
          );
        }

        /* -----------------------------------------------------
           IMAGE PARALLAX
        ----------------------------------------------------- */

        if (image) {
          gsap.fromTo(
            image,
            {
              yPercent: -3,
            },
            {
              yPercent: 3,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
                invalidateOnRefresh: true,
              },
            },
          );
        }

        /* -----------------------------------------------------
           VIEWPORT FOCUS
        ----------------------------------------------------- */

        gsap.fromTo(
          card,
          {
            filter: "brightness(0.94)",
          },
          {
            filter: "brightness(1)",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 72%",
              end: "center 48%",
              scrub: 1,
            },
          },
        );

        /* -----------------------------------------------------
           HOVER ENTER
        ----------------------------------------------------- */

        const handleEnter = () => {
          gsap.to(card, {
            y: -5,
            duration: 0.35,
            ease: "power3.out",
            overwrite: "auto",
          });

          if (image) {
            gsap.to(image, {
              scale: 1.035,
              duration: 0.6,
              ease: "power3.out",
              overwrite: "auto",
            });
          }

          if (glow) {
            gsap.to(glow, {
              opacity: 1,
              scale: 1.05,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        };

        /* -----------------------------------------------------
           HOVER LEAVE
        ----------------------------------------------------- */

        const handleLeave = () => {
          gsap.to(card, {
            y: 0,
            duration: 0.4,
            ease: "power3.out",
            overwrite: "auto",
          });

          if (image) {
            gsap.to(image, {
              scale: 1,
              duration: 0.7,
              ease: "power3.out",
              overwrite: "auto",
            });
          }

          if (glow) {
            gsap.to(glow, {
              opacity: 0.65,
              scale: 1,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        };

        /* -----------------------------------------------------
           EVENT LISTENERS
        ----------------------------------------------------- */

        card.addEventListener(
          "mouseenter",
          handleEnter,
        );

        card.addEventListener(
          "mouseleave",
          handleLeave,
        );

        /*
         * IMPORTANT:
         *
         * Do NOT do:
         *
         * ctx.add(() => {...})
         *
         * here.
         *
         * ctx doesn't exist until after gsap.context()
         * has returned.
         */
        eventCleanups.push(() => {
          card.removeEventListener(
            "mouseenter",
            handleEnter,
          );

          card.removeEventListener(
            "mouseleave",
            handleLeave,
          );
        });
      });

      /* -------------------------------------------------------
         REFRESH AFTER CARD LAYOUT
      ------------------------------------------------------- */

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
    }, section);

    /* ---------------------------------------------------------
       COMPLETE CLEANUP

       1. Remove DOM listeners.
       2. Revert GSAP context.
    --------------------------------------------------------- */

    return () => {
      eventCleanups.forEach((cleanup) => {
        cleanup();
      });

      eventCleanups.length = 0;

      ctx.revert();
    };
  }, [activeFilter, shouldReduceMotion]);

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      <section
        ref={sectionRef}
        id="projects"
        className="
          relative
          overflow-hidden
          border-b
          border-slate-900/[0.08]
          bg-[var(--background)]
          py-28
          text-[var(--foreground)]
          transition-colors
          duration-300
          dark:border-white/[0.06]
          sm:py-36
        "
      >
        {/* =====================================================
            ATMOSPHERIC BACKGROUND
        ====================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
          "
        >
          <div
            data-projects-atmosphere
            className="
              absolute
              left-[15%]
              top-[12%]
              h-72
              w-72
              rounded-full
              bg-cyan-500/[0.025]
              blur-3xl
              dark:bg-cyan-500/[0.035]
            "
          />

          <div
            data-projects-atmosphere
            className="
              absolute
              right-[8%]
              top-[42%]
              h-96
              w-96
              rounded-full
              bg-blue-600/[0.018]
              blur-3xl
              dark:bg-blue-600/[0.025]
            "
          />

          <div
            data-projects-atmosphere
            className="
              absolute
              bottom-[10%]
              left-[25%]
              h-64
              w-64
              rounded-full
              bg-purple-500/[0.014]
              blur-3xl
              dark:bg-purple-500/[0.018]
            "
          />

          {/* LIGHT MODE GRID */}

          <div
            className="
              absolute
              inset-0
              opacity-[0.025]
              dark:hidden
            "
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(15,23,42,0.45) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(15,23,42,0.45) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "64px 64px",
              maskImage:
                "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
            }}
          />

          {/* DARK MODE GRID */}

          <div
            className="
              absolute
              inset-0
              hidden
              opacity-[0.025]
              dark:block
            "
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(255,255,255,0.5) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(255,255,255,0.5) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "64px 64px",
              maskImage:
                "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
            }}
          />
        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="container-khel relative z-10">
          {/* ===================================================
              HEADER
          ==================================================== */}

          <div
            data-projects-header
            className="
              flex
              flex-col
              justify-between
              gap-10
              lg:flex-row
              lg:items-end
            "
          >
            <div>
              <div
                data-projects-label
                className="flex items-center gap-3"
              >
                <span
                  aria-hidden="true"
                  className="
                    h-px
                    w-8
                    bg-cyan-500/70
                    dark:bg-cyan-400/70
                  "
                />

                <p
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-cyan-600
                    dark:text-cyan-400
                  "
                >
                  05 — Selected Work
                </p>
              </div>

              <h2
                data-projects-title
                className="
                  mt-5
                  max-w-3xl
                  text-4xl
                  font-bold
                  leading-[1.05]
                  tracking-[-0.035em]
                  text-slate-950
                  sm:text-5xl
                  lg:text-6xl
                  dark:text-white
                "
              >
                PROJECTS BUILT
                <br />
                FOR REAL WORKFLOWS.
              </h2>

              <p
                data-projects-description
                className="
                  mt-7
                  max-w-xl
                  text-sm
                  leading-7
                  text-slate-600
                  sm:text-base
                  dark:text-slate-400
                "
              >
                A selection of projects focused on solving
                practical problems through thoughtful design
                and reliable engineering.
              </p>
            </div>

            {/* FILTERS */}

            <motion.div
              data-projects-filters
              className="relative flex flex-wrap gap-2"
            >
              {filters.map((filter) => {
                const active = activeFilter === filter;

                return (
                  <motion.button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { y: -2 }
                    }
                    whileTap={
                      shouldReduceMotion
                        ? undefined
                        : { scale: 0.97 }
                    }
                    className="
                      relative
                      overflow-hidden
                      rounded-lg
                      border
                      border-slate-900/[0.08]
                      bg-white/60
                      px-3.5
                      py-2
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-slate-500
                      transition-all
                      duration-300
                      hover:border-slate-900/[0.14]
                      hover:bg-white
                      hover:text-slate-900
                      dark:border-white/[0.07]
                      dark:bg-white/[0.01]
                      dark:text-slate-500
                      dark:hover:border-white/[0.12]
                      dark:hover:bg-white/[0.025]
                      dark:hover:text-white
                    "
                  >
                    {active && (
                      <motion.span
                        layoutId="project-filter"
                        className="
                          absolute
                          inset-0
                          rounded-lg
                          bg-cyan-500/[0.07]
                          dark:bg-cyan-400/[0.08]
                        "
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : {
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                              }
                        }
                      />
                    )}

                    {active && (
                      <motion.span
                        layoutId="project-filter-edge"
                        className="
                          absolute
                          bottom-0
                          left-2
                          right-2
                          h-px
                          bg-cyan-500/70
                          dark:bg-cyan-400/70
                        "
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : {
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                              }
                        }
                      />
                    )}

                    <span
                      className={`
                        relative
                        z-10
                        ${
                          active
                            ? "text-cyan-700 dark:text-cyan-300"
                            : ""
                        }
                      `}
                    >
                      {filter}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* ===================================================
              PROJECT GRID
          ==================================================== */}

          <div
            data-projects-grid
            className="
              mt-12
              grid
              gap-5
              lg:grid-cols-2
            "
          >
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                data-projects-card
                className="will-change-transform"
              >
                <ProjectCard
                  project={project}
                  index={index}
                  onOpen={setSelectedProject}
                />
              </div>
            ))}
          </div>

          {/* ===================================================
              EMPTY STATE
          ==================================================== */}

          <AnimatePresence mode="wait">
            {filteredProjects.length === 0 && (
              <motion.div
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 12,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: -8,
                      }
                }
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  mt-10
                  rounded-2xl
                  border
                  border-dashed
                  border-slate-900/[0.12]
                  bg-white/40
                  py-20
                  text-center
                  dark:border-white/[0.1]
                  dark:bg-white/[0.01]
                "
              >
                <p
                  className="
                    text-sm
                    text-slate-500
                    dark:text-slate-500
                  "
                >
                  No projects in this category yet.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ===================================================
              BOTTOM TECHNICAL MARKER
          ==================================================== */}

          <div
            data-projects-bottom-marker
            className="
              mt-14
              flex
              items-center
              justify-between
              border-t
              border-slate-900/[0.08]
              pt-5
              dark:border-white/[0.06]
            "
          >
            <div className="flex items-center gap-3">
              <motion.span
                aria-hidden="true"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity: [0.45, 1, 0.45],
                      }
                }
                transition={
                  shouldReduceMotion
                    ? undefined
                    : {
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-cyan-500
                  dark:bg-cyan-400
                "
              />

              <span
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-slate-500
                  dark:text-slate-600
                "
              >
                Selected Work
              </span>
            </div>

            <span
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-slate-400
                dark:text-slate-700
              "
            >
              {filteredProjects.length
                .toString()
                .padStart(2, "0")}{" "}
              Projects
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================
          PROJECT DIALOG
      ========================================================= */}

      <ProjectDialog
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}