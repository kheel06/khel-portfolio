"use client";

import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import type { Project } from "@/data/projects";

interface ProjectDialogProps {
  project: Project | null;
  onClose: () => void;
}

const easing = [0.22, 1, 0.36, 1] as const;

export function ProjectDialog({
  project,
  onClose,
}: ProjectDialogProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100]">
          {/* =====================================================
              BACKDROP
          ===================================================== */}

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.25,
              ease: easing,
            }}
            onClick={onClose}
          />

          {/* =====================================================
              MODAL CONTAINER
          ===================================================== */}

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
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      scale: 0.96,
                      y: 15,
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      scale: 0.97,
                      y: 10,
                    }
              }
              transition={{
                duration: shouldReduceMotion ? 0 : 0.3,
                ease: easing,
              }}
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
            >
              {/* =================================================
                  MODAL HEADER
              ================================================= */}

              <div
                className="
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

                {/* Close button */}

                <motion.button
                  type="button"
                  onClick={onClose}
                  aria-label="Close case study"
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: 1.05,
                          rotate: 3,
                        }
                  }
                  whileTap={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: 0.95,
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
              </div>

              {/* =================================================
                  SCROLL CONTENT
              ================================================= */}

              <div
                className="
                  overflow-y-auto
                  overscroll-contain
                  scroll-smooth
                "
              >
                {/* =================================================
                    PROJECT HERO
                ================================================= */}

                <div
                  className="
                    relative
                    aspect-[16/7]
                    min-h-[220px]
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
                        shouldReduceMotion
                          ? false
                          : {
                              scale: 1.04,
                            }
                      }
                      animate={{
                        scale: 1,
                      }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.8,
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

                  {/* =================================================
                      HERO GRADIENT
                  ================================================= */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-white
                      via-transparent
                      to-transparent
                      dark:from-[#080d17]
                    "
                  />

                  {/* =================================================
                      HERO CONTENT
                  ================================================= */}

                  <div
                    className="
                      absolute
                      bottom-6
                      left-6
                      right-6
                      sm:bottom-8
                      sm:left-8
                    "
                  >
                    <motion.h2
                      id="project-dialog-title"
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
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.5,
                        delay: shouldReduceMotion ? 0 : 0.1,
                        ease: easing,
                      }}
                      className="
                        text-3xl
                        font-bold
                        tracking-tight
                        text-slate-950
                        dark:text-white
                        sm:text-5xl
                      "
                    >
                      {project.title}
                    </motion.h2>

                    {/* Technologies */}

                    <motion.div
                      initial={
                        shouldReduceMotion
                          ? false
                          : {
                              opacity: 0,
                              y: 10,
                            }
                      }
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.45,
                        delay: shouldReduceMotion ? 0 : 0.18,
                        ease: easing,
                      }}
                      className="mt-4 flex flex-wrap gap-2"
                    >
                      {project.technologies.map(
                        (technology) => (
                          <span
                            key={technology}
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
                          </span>
                        ),
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* =================================================
                    MAIN CONTENT
                ================================================= */}

                <div
                  className="
                    p-6
                    sm:p-8
                    lg:p-10
                  "
                >
                  {/* =================================================
                      OVERVIEW
                  ================================================= */}

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

                  {/* =================================================
                      PROBLEM / SOLUTION
                  ================================================= */}

                  <div
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
                  </div>

                  {/* =================================================
                      ARCHITECTURE
                  ================================================= */}

                  <CaseStudyBlock
                    title="Architecture"
                    className="mt-12"
                  >
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
                            whileHover={
                              shouldReduceMotion
                                ? undefined
                                : {
                                    y: -2,
                                  }
                            }
                            transition={{
                              duration: 0.2,
                              ease: "easeOut",
                            }}
                            className="
                              flex
                              items-center
                              gap-3
                              rounded-xl
                              border
                              border-slate-900/[0.07]
                              bg-slate-900/[0.02]
                              p-4
                              transition-colors
                              duration-300
                              hover:border-cyan-500/20
                              dark:border-white/[0.06]
                              dark:bg-white/[0.02]
                              dark:hover:border-cyan-400/20
                            "
                          >
                            <span
                              className="
                                font-mono
                                text-[9px]
                                text-cyan-600
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

                  {/* =================================================
                      KEY FEATURES
                  ================================================= */}

                  <CaseStudyBlock
                    title="Key Features"
                    className="mt-12"
                  >
                    <div
                      className="
                        grid
                        gap-3
                        sm:grid-cols-2
                      "
                    >
                      {project.features.map((feature) => (
                        <div
                          key={feature}
                          className="
                            flex
                            items-center
                            gap-3
                            text-sm
                            text-slate-600
                            dark:text-slate-400
                          "
                        >
                          <CheckCircle2
                            size={16}
                            className="
                              shrink-0
                              text-cyan-600
                              dark:text-cyan-400
                            "
                          />

                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CaseStudyBlock>

                  {/* =================================================
                      CHALLENGES
                  ================================================= */}

                  <CaseStudyBlock
                    title="Challenges"
                    className="mt-12"
                  >
                    <div className="space-y-3">
                      {project.challenges.map(
                        (challenge) => (
                          <div
                            key={challenge}
                            className="
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
                                mt-2
                                h-1
                                w-1
                                shrink-0
                                rounded-full
                                bg-cyan-600
                                dark:bg-cyan-400
                              "
                            />

                            <span>{challenge}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </CaseStudyBlock>

                  {/* =================================================
                      RESULTS
                  ================================================= */}

                  <CaseStudyBlock
                    title="Results"
                    className="mt-12"
                  >
                    <div
                      className="
                        grid
                        gap-3
                        sm:grid-cols-2
                      "
                    >
                      {project.results.map((result) => (
                        <motion.div
                          key={result}
                          whileHover={
                            shouldReduceMotion
                              ? undefined
                              : {
                                  y: -2,
                                }
                          }
                          transition={{
                            duration: 0.2,
                            ease: "easeOut",
                          }}
                          className="
                            rounded-xl
                            border
                            border-cyan-500/10
                            bg-cyan-500/[0.025]
                            p-4
                            text-sm
                            text-slate-600
                            transition-colors
                            duration-300
                            hover:border-cyan-500/20
                            dark:border-cyan-400/10
                            dark:bg-cyan-400/[0.025]
                            dark:text-slate-400
                            dark:hover:border-cyan-400/20
                          "
                        >
                          {result}
                        </motion.div>
                      ))}
                    </div>
                  </CaseStudyBlock>

                  {/* =================================================
                      PROJECT LINKS
                  ================================================= */}

                  {(project.github || project.live) && (
                    <div
                      className="
                        mt-12
                        flex
                        flex-col
                        gap-3
                        border-t
                        border-slate-900/[0.08]
                        pt-8
                        dark:border-white/[0.07]
                        sm:flex-row
                      "
                    >
                      {/* GitHub */}

                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
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
                                  scale: 0.98,
                                }
                          }
                          className="
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

                          <ExternalLink size={13} />
                        </motion.a>
                      )}

                      {/* Live Project */}

                      {project.live && (
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
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
                                  scale: 0.98,
                                }
                          }
                          className="
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

                          <ArrowUpRight size={16} />
                        </motion.a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
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
        <span
          className="
            h-px
            w-5
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