"use client";

import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import type { Project } from "@/data/projects";

interface ProjectDialogProps {
  project: Project | null;
  onClose: () => void;
}

const easing = [0.22, 1, 0.36, 1] as const;

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.08,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: easing,
    },
  },
};

export function ProjectDialog({
  project,
  onClose,
}: ProjectDialogProps) {
  const shouldReduceMotion = useReducedMotion();

  const instant = shouldReduceMotion;

  return (
    <AnimatePresence mode="wait">
      {project && (
        <motion.div
          key={project.title}
          className="fixed inset-0 z-[100]"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* =====================================================
              BACKDROP
          ====================================================== */}

          <motion.button
            type="button"
            aria-label="Close project case study"
            className="
              absolute
              inset-0
              h-full
              w-full
              cursor-default
              bg-slate-950/55
              backdrop-blur-sm
              dark:bg-black/75
            "
            variants={{
              hidden: {
                opacity: 0,
              },
              visible: {
                opacity: 1,
                transition: {
                  duration: instant ? 0 : 0.3,
                  ease: easing,
                },
              },
              exit: {
                opacity: 0,
                transition: {
                  duration: instant ? 0 : 0.2,
                  ease: easing,
                },
              },
            }}
            onClick={onClose}
          />

          {/* =====================================================
              MODAL FRAME
          ====================================================== */}

          <div
            className="
              relative
              flex
              h-full
              items-center
              justify-center
              p-3
              sm:p-6
            "
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              className="
                relative
                flex
                max-h-[94vh]
                w-full
                max-w-5xl
                flex-col
                overflow-hidden
                rounded-3xl
                border
                border-slate-900/[0.10]
                bg-white
                text-slate-950
                shadow-2xl
                dark:border-white/[0.1]
                dark:bg-[#080d17]
                dark:text-white
              "
              variants={{
                hidden: instant
                  ? {}
                  : {
                      opacity: 0,
                      y: 24,
                      scale: 0.965,
                    },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: instant ? 0 : 0.42,
                    ease: easing,
                  },
                },
                exit: instant
                  ? {}
                  : {
                      opacity: 0,
                      y: 14,
                      scale: 0.975,
                      transition: {
                        duration: 0.25,
                        ease: easing,
                      },
                    },
              }}
            >
              {/* =================================================
                  HEADER
              ================================================= */}

              <motion.div
                initial={instant ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: instant ? 0 : 0.35,
                  delay: instant ? 0 : 0.12,
                  ease: easing,
                }}
                className="
                  relative
                  z-30
                  flex
                  shrink-0
                  items-center
                  justify-between
                  border-b
                  border-slate-900/[0.08]
                  px-5
                  py-4
                  dark:border-white/[0.07]
                  sm:px-7
                "
              >
                <div>
                  <p
                    className="
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.2em]
                      text-cyan-600
                      dark:text-cyan-400
                    "
                  >
                    Project Case Study
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-slate-500
                      dark:text-slate-600
                    "
                  >
                    {project.category}
                  </p>
                </div>

                <motion.button
                  type="button"
                  onClick={onClose}
                  aria-label="Close case study"
                  whileHover={
                    instant
                      ? undefined
                      : {
                          scale: 1.06,
                          rotate: 4,
                        }
                  }
                  whileTap={
                    instant
                      ? undefined
                      : {
                          scale: 0.94,
                        }
                  }
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-slate-900/[0.08]
                    bg-slate-900/[0.025]
                    text-slate-500
                    transition-all
                    duration-300
                    hover:border-slate-900/[0.15]
                    hover:bg-slate-900/[0.05]
                    hover:text-slate-950
                    dark:border-white/[0.08]
                    dark:bg-white/[0.03]
                    dark:text-slate-400
                    dark:hover:border-white/[0.15]
                    dark:hover:bg-white/[0.05]
                    dark:hover:text-white
                  "
                >
                  <X size={17} />
                </motion.button>
              </motion.div>

              {/* =================================================
                  SCROLL AREA
              ================================================= */}

              <div
                className="
                  overflow-y-auto
                  overscroll-contain
                  scroll-smooth
                "
              >
                {/* =================================================
                    HERO
                ================================================= */}

                <div
                  className="
                    relative
                    aspect-[16/7]
                    min-h-[250px]
                    overflow-hidden
                    bg-slate-100
                    dark:bg-[#0b1220]
                  "
                >
                  {project.image ? (
                    <motion.img
                      src={project.image}
                      alt={`${project.title} preview`}
                      initial={
                        instant
                          ? false
                          : {
                              scale: 1.08,
                            }
                      }
                      animate={{
                        scale: 1,
                      }}
                      transition={{
                        duration: instant ? 0 : 0.95,
                        delay: instant ? 0 : 0.05,
                        ease: easing,
                      }}
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />
                  ) : (
                    <div
                      className="
                        technical-grid
                        flex
                        h-full
                        items-center
                        justify-center
                        bg-slate-100
                        dark:bg-[#0b1220]
                      "
                    >
                      <span
                        className="
                          font-mono
                          text-xs
                          uppercase
                          tracking-[0.2em]
                          text-slate-500
                          dark:text-slate-600
                        "
                      >
                        Project Preview
                      </span>
                    </div>
                  )}

                  {/* IMAGE DEPTH */}

                  <motion.div
                    initial={instant ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: instant ? 0 : 0.7,
                      delay: instant ? 0 : 0.2,
                    }}
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-white
                      via-white/5
                      to-transparent
                      dark:from-[#080d17]
                      dark:via-[#080d17]/10
                    "
                  />

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-x-0
                      bottom-0
                      h-32
                      bg-gradient-to-t
                      from-black/10
                      to-transparent
                      dark:from-black/20
                    "
                  />

                  {/* =================================================
                      HERO CONTENT
                  ================================================= */}

                  <motion.div
                    variants={
                      shouldReduceMotion
                        ? undefined
                        : staggerContainer
                    }
                    initial="hidden"
                    animate="visible"
                    className="
                      absolute
                      bottom-6
                      left-6
                      right-6
                      sm:bottom-8
                      sm:left-8
                    "
                  >
                    <motion.div
                      variants={
                        shouldReduceMotion ? undefined : fadeUp
                      }
                    >
                      <h2
                        id="project-dialog-title"
                        className="
                          text-3xl
                          font-bold
                          tracking-[-0.04em]
                          text-slate-950
                          dark:text-white
                          sm:text-5xl
                        "
                      >
                        {project.title}
                      </h2>
                    </motion.div>

                    <motion.div
                      variants={
                        shouldReduceMotion ? undefined : fadeUp
                      }
                      className="
                        mt-4
                        flex
                        flex-wrap
                        gap-2
                      "
                    >
                      {project.technologies.map(
                        (technology) => (
                          <motion.span
                            key={technology}
                            whileHover={
                              instant
                                ? undefined
                                : {
                                    y: -2,
                                  }
                            }
                            className="
                              rounded-md
                              border
                              border-slate-900/[0.10]
                              bg-white/75
                              px-2.5
                              py-1.5
                              font-mono
                              text-[9px]
                              text-slate-600
                              backdrop-blur-md
                              dark:border-white/[0.1]
                              dark:bg-[#070b14]/70
                              dark:text-slate-300
                            "
                          >
                            {technology}
                          </motion.span>
                        ),
                      )}
                    </motion.div>
                  </motion.div>
                </div>

                {/* =================================================
                    MAIN CONTENT
                ================================================= */}

                <motion.div
                  variants={
                    shouldReduceMotion
                      ? undefined
                      : staggerContainer
                  }
                  initial="hidden"
                  animate="visible"
                  className="
                    p-6
                    sm:p-8
                    lg:p-10
                  "
                >
                  {/* =================================================
                      OVERVIEW
                  ================================================= */}

                  <AnimatedBlock reduceMotion={!!instant}>
                    <CaseStudyBlock title="Overview">
                      <p
                        className="
                          text-sm
                          leading-7
                          text-slate-600
                          sm:text-base
                          dark:text-slate-400
                        "
                      >
                        {project.description}
                      </p>
                    </CaseStudyBlock>
                  </AnimatedBlock>

                  {/* =================================================
                      PROBLEM / SOLUTION
                  ================================================= */}

                  <AnimatedBlock
                    reduceMotion={!!instant}
                    className="
                      mt-12
                      grid
                      gap-10
                      md:grid-cols-2
                    "
                  >
                    <CaseStudyBlock title="The Problem">
                      <p
                        className="
                          text-sm
                          leading-7
                          text-slate-600
                          dark:text-slate-500
                        "
                      >
                        {project.problem}
                      </p>
                    </CaseStudyBlock>

                    <CaseStudyBlock title="The Solution">
                      <p
                        className="
                          text-sm
                          leading-7
                          text-slate-600
                          dark:text-slate-500
                        "
                      >
                        {project.solution}
                      </p>
                    </CaseStudyBlock>
                  </AnimatedBlock>

                  {/* =================================================
                      ARCHITECTURE
                  ================================================= */}

                  <AnimatedBlock
                    reduceMotion={!!instant}
                    className="mt-12"
                  >
                    <CaseStudyBlock title="Architecture">
                      <div
                        className="
                          grid
                          gap-2
                          sm:grid-cols-2
                        "
                      >
                        {project.architecture.map(
                          (item, index) => (
                            <motion.div
                              key={item}
                              initial={
                                instant
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
                              transition={{
                                duration: instant
                                  ? 0
                                  : 0.4,
                                delay: instant
                                  ? 0
                                  : 0.04 * index,
                                ease: easing,
                              }}
                              whileHover={
                                instant
                                  ? undefined
                                  : {
                                      y: -3,
                                    }
                              }
                              className="
                                group
                                flex
                                items-center
                                gap-3
                                rounded-xl
                                border
                                border-slate-900/[0.07]
                                bg-slate-900/[0.02]
                                p-4
                                transition-all
                                duration-300
                                hover:border-cyan-500/20
                                hover:bg-cyan-500/[0.025]
                                dark:border-white/[0.06]
                                dark:bg-white/[0.02]
                                dark:hover:border-cyan-400/20
                                dark:hover:bg-cyan-400/[0.025]
                              "
                            >
                              <span
                                className="
                                  font-mono
                                  text-[9px]
                                  text-cyan-600
                                  transition-transform
                                  duration-300
                                  group-hover:translate-x-0.5
                                  dark:text-cyan-400
                                "
                              >
                                {String(index + 1).padStart(
                                  2,
                                  "0",
                                )}
                              </span>

                              <span
                                className="
                                  text-xs
                                  text-slate-600
                                  dark:text-slate-400
                                "
                              >
                                {item}
                              </span>
                            </motion.div>
                          ),
                        )}
                      </div>
                    </CaseStudyBlock>
                  </AnimatedBlock>

                  {/* =================================================
                      KEY FEATURES
                  ================================================= */}

                  <AnimatedBlock
                    reduceMotion={!!instant}
                    className="mt-12"
                  >
                    <CaseStudyBlock title="Key Features">
                      <div
                        className="
                          grid
                          gap-3
                          sm:grid-cols-2
                        "
                      >
                        {project.features.map(
                          (feature, index) => (
                            <motion.div
                              key={feature}
                              initial={
                                instant
                                  ? false
                                  : {
                                      opacity: 0,
                                      x: -10,
                                    }
                              }
                              animate={{
                                opacity: 1,
                                x: 0,
                              }}
                              transition={{
                                duration: instant
                                  ? 0
                                  : 0.4,
                                delay: instant
                                  ? 0
                                  : 0.035 * index,
                                ease: easing,
                              }}
                              className="
                                group
                                flex
                                items-center
                                gap-3
                                text-sm
                                text-slate-600
                                dark:text-slate-400
                              "
                            >
                              <span
                                className="
                                  flex
                                  h-7
                                  w-7
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-full
                                  bg-cyan-500/[0.06]
                                  transition-transform
                                  duration-300
                                  group-hover:scale-105
                                  dark:bg-cyan-400/[0.06]
                                "
                              >
                                <CheckCircle2
                                  size={15}
                                  className="
                                    text-cyan-600
                                    dark:text-cyan-400
                                  "
                                />
                              </span>

                              <span>{feature}</span>
                            </motion.div>
                          ),
                        )}
                      </div>
                    </CaseStudyBlock>
                  </AnimatedBlock>

                  {/* =================================================
                      CHALLENGES
                  ================================================= */}

                  <AnimatedBlock
                    reduceMotion={!!instant}
                    className="mt-12"
                  >
                    <CaseStudyBlock title="Challenges">
                      <div className="space-y-3">
                        {project.challenges.map(
                          (challenge, index) => (
                            <motion.div
                              key={challenge}
                              initial={
                                instant
                                  ? false
                                  : {
                                      opacity: 0,
                                      x: -12,
                                    }
                              }
                              animate={{
                                opacity: 1,
                                x: 0,
                              }}
                              transition={{
                                duration: instant
                                  ? 0
                                  : 0.4,
                                delay: instant
                                  ? 0
                                  : 0.045 * index,
                                ease: easing,
                              }}
                              className="
                                group
                                flex
                                gap-3
                                text-sm
                                leading-6
                                text-slate-600
                                dark:text-slate-500
                              "
                            >
                              <span
                                className="
                                  mt-[10px]
                                  h-1
                                  w-1
                                  shrink-0
                                  rounded-full
                                  bg-cyan-600
                                  transition-transform
                                  duration-300
                                  group-hover:scale-150
                                  dark:bg-cyan-400
                                "
                              />

                              <span>{challenge}</span>
                            </motion.div>
                          ),
                        )}
                      </div>
                    </CaseStudyBlock>
                  </AnimatedBlock>

                  {/* =================================================
                      RESULTS
                  ================================================= */}

                  <AnimatedBlock
                    reduceMotion={!!instant}
                    className="mt-12"
                  >
                    <CaseStudyBlock title="Results">
                      <div
                        className="
                          grid
                          gap-3
                          sm:grid-cols-2
                        "
                      >
                        {project.results.map(
                          (result, index) => (
                            <motion.div
                              key={result}
                              initial={
                                instant
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
                              transition={{
                                duration: instant
                                  ? 0
                                  : 0.42,
                                delay: instant
                                  ? 0
                                  : 0.05 * index,
                                ease: easing,
                              }}
                              whileHover={
                                instant
                                  ? undefined
                                  : {
                                      y: -3,
                                    }
                              }
                              className="
                                rounded-xl
                                border
                                border-cyan-500/10
                                bg-cyan-500/[0.025]
                                p-4
                                text-sm
                                leading-6
                                text-slate-600
                                transition-all
                                duration-300
                                hover:border-cyan-500/20
                                hover:bg-cyan-500/[0.04]
                                dark:border-cyan-400/10
                                dark:bg-cyan-400/[0.025]
                                dark:text-slate-400
                                dark:hover:border-cyan-400/20
                                dark:hover:bg-cyan-400/[0.04]
                              "
                            >
                              {result}
                            </motion.div>
                          ),
                        )}
                      </div>
                    </CaseStudyBlock>
                  </AnimatedBlock>

                  {/* =================================================
                      LINKS
                  ================================================= */}

                  {(project.github || project.live) && (
                    <AnimatedBlock
                      reduceMotion={!!instant}
                      className="
                        mt-12
                        border-t
                        border-slate-900/[0.08]
                        pt-8
                        dark:border-white/[0.07]
                      "
                    >
                      <div
                        className="
                          flex
                          flex-col
                          gap-3
                          sm:flex-row
                        "
                      >
                        {project.github && (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={
                              instant
                                ? undefined
                                : {
                                    y: -3,
                                  }
                            }
                            whileTap={
                              instant
                                ? undefined
                                : {
                                    scale: 0.98,
                                  }
                            }
                            className="
                              group
                              inline-flex
                              items-center
                              justify-center
                              gap-2
                              rounded-xl
                              border
                              border-slate-900/[0.1]
                              bg-slate-900/[0.025]
                              px-5
                              py-3
                              text-sm
                              font-semibold
                              text-slate-900
                              transition-all
                              duration-300
                              hover:border-slate-900/[0.2]
                              hover:bg-slate-900/[0.05]
                              dark:border-white/[0.1]
                              dark:bg-white/[0.03]
                              dark:text-white
                              dark:hover:border-white/[0.2]
                              dark:hover:bg-white/[0.05]
                            "
                          >
                            <GitHubIcon size={16} />

                            <span>GitHub</span>

                            <ExternalLink
                              size={13}
                              className="
                                transition-transform
                                duration-300
                                group-hover:translate-x-0.5
                                group-hover:-translate-y-0.5
                              "
                            />
                          </motion.a>
                        )}

                        {project.live && (
                          <motion.a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={
                              instant
                                ? undefined
                                : {
                                    y: -3,
                                  }
                            }
                            whileTap={
                              instant
                                ? undefined
                                : {
                                    scale: 0.98,
                                  }
                            }
                            className="
                              group
                              inline-flex
                              items-center
                              justify-center
                              gap-2
                              rounded-xl
                              bg-slate-950
                              px-5
                              py-3
                              text-sm
                              font-semibold
                              text-white
                              transition-all
                              duration-300
                              hover:bg-slate-800
                              dark:bg-white
                              dark:text-slate-950
                              dark:hover:bg-slate-100
                            "
                          >
                            <span>Live Project</span>

                            <ArrowUpRight
                              size={16}
                              className="
                                transition-transform
                                duration-300
                                group-hover:translate-x-0.5
                                group-hover:-translate-y-0.5
                              "
                            />
                          </motion.a>
                        )}
                      </div>
                    </AnimatedBlock>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* =========================================================
   ANIMATED CONTENT BLOCK
========================================================= */

function AnimatedBlock({
  children,
  className = "",
  reduceMotion,
}: {
  children: React.ReactNode;
  className?: string;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 20,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        ease: easing,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   CASE STUDY BLOCK
========================================================= */

function CaseStudyBlock({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="mb-5 flex items-center gap-3">
        <motion.span
          initial={{
            width: 0,
          }}
          animate={{
            width: 20,
          }}
          transition={{
            duration: 0.45,
            ease: easing,
          }}
          className="
            h-px
            bg-cyan-500/50
            dark:bg-cyan-400/50
          "
        />

        <h3
          className="
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-cyan-600
            dark:text-cyan-400
          "
        >
          {title}
        </h3>
      </div>

      {children}
    </section>
  );
}

/* =========================================================
   GITHUB BRAND ICON
========================================================= */

function GitHubIcon({
  size = 16,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-1.02-.014-1.85-2.782.604-3.369-1.185-3.369-1.185-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.071 1.532 1.031 1.532 1.031.892 1.529 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.338-2.221-.253-4.555-1.111-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.202 2.394.1 2.647.64.698 1.028 1.591 1.028 2.682 0 3.841-2.338 4.687-4.566 4.935.359.309.678.917.678 1.849 0 1.335-.012 2.411-.012 2.738 0 .268.18.58.688.481A10.002 10.002 0 0 0 22 12C22 6.477 17.523 2 12 2Z" />
    </svg>
  );
}