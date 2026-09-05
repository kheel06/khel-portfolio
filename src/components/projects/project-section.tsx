"use client";

import { useMemo, useState } from "react";
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
   MOTION
========================================================= */

const easing = [0.22, 1, 0.36, 1] as const;

const headerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const headerItem = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easing,
    },
  },
};

const projectContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const projectItem = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: easing,
    },
  },
  exit: {
    opacity: 0,
    y: 18,
    scale: 0.98,
    transition: {
      duration: 0.25,
      ease: easing,
    },
  },
};

/* =========================================================
   PROJECT SECTION
========================================================= */

export function ProjectSection() {
  const shouldReduceMotion = useReducedMotion();

  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  /* -------------------------------------------------------
     FILTER PROJECTS
  ------------------------------------------------------- */

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter(
      (project) => project.category === activeFilter,
    );
  }, [activeFilter]);

  return (
    <>
      {/* =====================================================
          PROJECT SECTION
      ===================================================== */}

      <section
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
        {/* ===================================================
            ATMOSPHERIC BACKGROUND
        =================================================== */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          {/* Cyan atmosphere */}

          <motion.div
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
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.8,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    scale: 1,
                  }
            }
            viewport={{
              once: true,
              amount: 0.1,
            }}
            transition={{
              duration: 1.5,
              ease: easing,
            }}
          />

          {/* Blue atmosphere */}

          <motion.div
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
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.85,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    scale: 1,
                  }
            }
            viewport={{
              once: true,
              amount: 0.1,
            }}
            transition={{
              duration: 1.6,
              delay: 0.1,
              ease: easing,
            }}
          />

          {/* =================================================
              LIGHT MODE GRID
          ================================================= */}

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

          {/* =================================================
              DARK MODE GRID
          ================================================= */}

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
        ===================================================== */}

        <div className="container-khel relative">
          {/* ===================================================
              HEADER
          =================================================== */}

          <motion.div
            variants={
              shouldReduceMotion
                ? undefined
                : headerContainer
            }
            initial={
              shouldReduceMotion
                ? false
                : "hidden"
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : "visible"
            }
            viewport={{
              once: true,
              amount: 0.25,
            }}
            className="
              flex
              flex-col
              justify-between
              gap-10
              lg:flex-row
              lg:items-end
            "
          >
            {/* =================================================
                HEADER LEFT
            ================================================= */}

            <div>
              {/* Section label */}

              <motion.div
                variants={
                  shouldReduceMotion
                    ? undefined
                    : headerItem
                }
              >
                <div className="flex items-center gap-3">
                  <motion.span
                    aria-hidden="true"
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            width: 0,
                            opacity: 0,
                          }
                    }
                    whileInView={
                      shouldReduceMotion
                        ? undefined
                        : {
                            width: 32,
                            opacity: 1,
                          }
                    }
                    viewport={{
                      once: true,
                      amount: 0.5,
                    }}
                    transition={{
                      duration: 0.55,
                      ease: easing,
                    }}
                    className="
                      h-px
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
              </motion.div>

              {/* =================================================
                  MAIN HEADING
              ================================================= */}

              <motion.h2
                variants={
                  shouldReduceMotion
                    ? undefined
                    : headerItem
                }
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
              </motion.h2>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <motion.p
                variants={
                  shouldReduceMotion
                    ? undefined
                    : headerItem
                }
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
              </motion.p>
            </div>

            {/* =================================================
                FILTERS
            ================================================= */}

            <motion.div
              variants={
                shouldReduceMotion
                  ? undefined
                  : headerItem
              }
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
                        : {
                            y: -2,
                          }
                    }
                    whileTap={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: 0.97,
                          }
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
                    {/* Active background */}

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
                            ? {
                                duration: 0,
                              }
                            : {
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                              }
                        }
                      />
                    )}

                    {/* Active bottom line */}

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
                            ? {
                                duration: 0,
                              }
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
          </motion.div>

          {/* ===================================================
              PROJECT GRID
          =================================================== */}

          <motion.div
            layout
            variants={
              shouldReduceMotion
                ? undefined
                : projectContainer
            }
            initial={
              shouldReduceMotion
                ? false
                : "hidden"
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : "visible"
            }
            viewport={{
              once: true,
              amount: 0.08,
            }}
            transition={{
              layout: shouldReduceMotion
                ? {
                    duration: 0,
                  }
                : {
                    duration: 0.55,
                    ease: easing,
                  },
            }}
            className="
              mt-14
              grid
              gap-5
              lg:grid-cols-2
            "
          >
            <AnimatePresence
              mode="popLayout"
              initial={false}
            >
              {filteredProjects.map(
                (project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    variants={
                      shouldReduceMotion
                        ? undefined
                        : projectItem
                    }
                    initial={
                      shouldReduceMotion
                        ? false
                        : "hidden"
                    }
                    animate="visible"
                    exit={
                      shouldReduceMotion
                        ? undefined
                        : "exit"
                    }
                    transition={{
                      layout:
                        shouldReduceMotion
                          ? {
                              duration: 0,
                            }
                          : {
                              duration: 0.5,
                              ease: easing,
                            },
                    }}
                  >
                    <ProjectCard
                      project={project}
                      index={index}
                      onOpen={setSelectedProject}
                    />
                  </motion.div>
                ),
              )}
            </AnimatePresence>
          </motion.div>

          {/* ===================================================
              EMPTY STATE
          =================================================== */}

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
                  ease: easing,
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
          =================================================== */}

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 15,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: easing,
            }}
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
            {/* Left marker */}

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

            {/* Project count */}

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
          </motion.div>
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