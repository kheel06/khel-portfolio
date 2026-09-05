"use client";

import {
  Code2,
  Database,
  Layers3,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";

const capabilities = [
  {
    icon: Code2,
    title: "FRONTEND",
    description:
      "Modern interfaces focused on responsive layouts, usability, accessibility, and performance.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    icon: Layers3,
    title: "APPLICATIONS",
    description:
      "Structured applications designed around maintainable components, reusable logic, and clean architecture.",
    technologies: ["Next.js", "APIs", "Firebase", "Git"],
  },
  {
    icon: Database,
    title: "DATA",
    description:
      "Practical data solutions with an emphasis on reliable storage, validation, and predictable application behavior.",
    technologies: ["Firestore", "MySQL", "PostgreSQL"],
  },
  {
    icon: ShieldCheck,
    title: "ENGINEERING",
    description:
      "Engineering decisions centered around maintainability, security, performance, and deployment.",
    technologies: [
      "Architecture",
      "Security",
      "Performance",
      "Deployment",
    ],
  },
];

/* =========================================================
   MOTION
========================================================= */

const introContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const introItem: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const cardsContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.12,
    },
  },
};

const cardItem: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   ABOUT / PROFILE
========================================================= */

export function About() {
  const reducedMotion = useReducedMotion();

  const containerVariants: Variants = reducedMotion
    ? {
        hidden: {},
        visible: {},
      }
    : introContainer;

  const itemVariants: Variants = reducedMotion
    ? {
        hidden: {},
        visible: {},
      }
    : introItem;

  const cardsVariants: Variants = reducedMotion
    ? {
        hidden: {},
        visible: {},
      }
    : cardsContainer;

  const cardVariants: Variants = reducedMotion
    ? {
        hidden: {},
        visible: {},
      }
    : cardItem;

  return (
    <section
      id="profile"
      className="
        relative
        isolate
        overflow-hidden
        border-b
        border-[var(--border)]
        bg-[var(--background)]
        py-28
        sm:py-36
      "
    >
      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ====================================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-32
          top-[20%]
          h-96
          w-96
          rounded-full
          bg-cyan-400/[0.025]
          blur-[100px]
          dark:bg-cyan-400/[0.035]
        "
        initial={
          reducedMotion
            ? { opacity: 1 }
            : { opacity: 0 }
        }
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-[5%]
          h-80
          w-80
          rounded-full
          bg-purple-500/[0.018]
          blur-[100px]
          dark:bg-purple-500/[0.025]
        "
        initial={
          reducedMotion
            ? { opacity: 1 }
            : { opacity: 0 }
        }
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          once: true,
          amount: 0.1,
        }}
        transition={{
          duration: 1.4,
          delay: 0.15,
          ease: "easeOut",
        }}
      />

      {/* Technical grid */}
      <div
        aria-hidden="true"
        className="
          technical-grid
          pointer-events-none
          absolute
          inset-0
          opacity-[0.12]
          dark:opacity-[0.22]
        "
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="container-khel relative z-10">
        <div
          className="
            grid
            gap-16
            lg:grid-cols-[0.75fr_1.25fr]
            lg:gap-24
          "
        >
          {/* =================================================
              SECTION INTRO
          ================================================== */}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.35,
            }}
            className="relative"
          >
            {/* Section number */}
            <motion.p
              variants={itemVariants}
              className="
                font-mono
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-cyan-500
                dark:text-cyan-400
              "
            >
              01 — Profile
            </motion.p>

            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="
                mt-5
                max-w-md
                text-4xl
                font-bold
                leading-[1.05]
                tracking-[-0.035em]
                text-[var(--foreground)]
                sm:text-5xl
              "
            >
              I BUILD ACROSS THE ENTIRE STACK.
            </motion.h2>

            {/* =================================================
                ANIMATED DIVIDER
            ================================================== */}

            <motion.div
              initial={
                reducedMotion
                  ? {
                      width: 64,
                      opacity: 1,
                    }
                  : {
                      width: 0,
                      opacity: 0,
                    }
              }
              whileInView={{
                width: 64,
                opacity: 1,
              }}
              viewport={{
                once: true,
                amount: 0.5,
              }}
              transition={{
                duration: 0.8,
                delay: 0.25,
                ease: "easeOut",
              }}
              className="
                mt-8
                h-px
                bg-cyan-500/50
                dark:bg-cyan-400/40
              "
            />

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="
                mt-8
                max-w-md
                text-sm
                leading-7
                text-[var(--muted)]
                sm:text-base
              "
            >
              I enjoy turning ideas and real-world requirements into
              dependable software. My approach combines thoughtful interface
              design with practical engineering and scalable application
              structure.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="
                mt-5
                max-w-md
                text-sm
                leading-7
                text-[var(--muted)]
                opacity-80
              "
            >
              From the first interface component to data and deployment, I
              focus on building products that are understandable, useful, and
              built to evolve.
            </motion.p>

            {/* Small engineering marker */}
            <motion.div
              variants={itemVariants}
              className="
                mt-8
                hidden
                items-center
                gap-2
                font-mono
                text-[9px]
                uppercase
                tracking-[0.16em]
                text-[var(--muted)]
                opacity-60
                sm:flex
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-cyan-500
                  shadow-[0_0_10px_rgba(6,182,212,0.55)]
                  dark:bg-cyan-400
                "
              />

              <span>Engineering with intent</span>
            </motion.div>
          </motion.div>

          {/* =================================================
              CAPABILITY CARDS
          ================================================== */}

          <motion.div
            variants={cardsVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.18,
            }}
            className="grid gap-3 sm:grid-cols-2"
          >
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;

              return (
                <motion.article
                  key={capability.title}
                  variants={cardVariants}
                  whileHover={
                    reducedMotion
                      ? undefined
                      : {
                          y: -6,
                          transition: {
                            duration: 0.25,
                            ease: "easeOut",
                          },
                        }
                  }
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    p-6
                    shadow-sm
                    transition-all
                    duration-300
                    hover:border-cyan-500/20
                    hover:bg-cyan-500/[0.025]
                    hover:shadow-[0_18px_50px_rgba(6,182,212,0.06)]
                    dark:hover:border-cyan-400/20
                    dark:hover:bg-cyan-400/[0.025]
                  "
                >
                  {/* Card accent line */}
                  <motion.div
                    aria-hidden="true"
                    className="
                      absolute
                      left-0
                      top-0
                      h-px
                      w-0
                      bg-gradient-to-r
                      from-cyan-400
                      to-transparent
                      opacity-0
                      transition-all
                      duration-500
                      group-hover:w-full
                      group-hover:opacity-100
                    "
                  />

                  {/* Subtle card glow */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      -right-16
                      -top-16
                      h-32
                      w-32
                      rounded-full
                      bg-cyan-400/[0.035]
                      opacity-0
                      blur-3xl
                      transition-opacity
                      duration-500
                      group-hover:opacity-100
                    "
                  />

                  {/* =================================================
                      CARD HEADER
                  ================================================== */}

                  <div className="relative flex items-start justify-between">
                    <motion.div
                      whileHover={
                        reducedMotion
                          ? undefined
                          : {
                              scale: 1.08,
                              rotate: 2,
                              transition: {
                                duration: 0.25,
                                ease: "easeOut",
                              },
                            }
                      }
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-[var(--border)]
                        bg-[var(--surface-light)]
                        transition-colors
                        duration-300
                        group-hover:border-cyan-500/20
                        group-hover:bg-cyan-500/[0.05]
                        dark:group-hover:border-cyan-400/20
                        dark:group-hover:bg-cyan-400/[0.05]
                      "
                    >
                      <Icon
                        size={19}
                        strokeWidth={1.8}
                        className="
                          text-cyan-500
                          transition-transform
                          duration-300
                          dark:text-cyan-400
                        "
                      />
                    </motion.div>

                    <span
                      className="
                        font-mono
                        text-[10px]
                        text-[var(--muted)]
                        opacity-40
                      "
                    >
                      0{index + 1}
                    </span>
                  </div>

                  {/* =================================================
                      CARD CONTENT
                  ================================================== */}

                  <h3
                    className="
                      relative
                      mt-7
                      text-sm
                      font-semibold
                      tracking-[0.12em]
                      text-[var(--foreground)]
                    "
                  >
                    {capability.title}
                  </h3>

                  <p
                    className="
                      relative
                      mt-3
                      text-sm
                      leading-6
                      text-[var(--muted)]
                    "
                  >
                    {capability.description}
                  </p>

                  {/* =================================================
                      TECHNOLOGY TAGS
                  ================================================== */}

                  <div className="relative mt-6 flex flex-wrap gap-2">
                    {capability.technologies.map(
                      (technology, technologyIndex) => (
                        <motion.span
                          key={technology}
                          initial={
                            reducedMotion
                              ? {
                                  opacity: 1,
                                  y: 0,
                                }
                              : {
                                  opacity: 0,
                                  y: 5,
                                }
                          }
                          whileInView={{
                            opacity: 1,
                            y: 0,
                          }}
                          viewport={{
                            once: true,
                            amount: 0.2,
                          }}
                          transition={{
                            duration: 0.35,
                            delay: reducedMotion
                              ? 0
                              : 0.35 + technologyIndex * 0.04,
                            ease: "easeOut",
                          }}
                          className="
                            rounded-md
                            border
                            border-[var(--border)]
                            bg-[var(--surface-light)]
                            px-2.5
                            py-1.5
                            font-mono
                            text-[9px]
                            text-[var(--muted)]
                            transition-all
                            duration-300
                            group-hover:border-cyan-500/[0.14]
                            group-hover:text-[var(--foreground)]
                            dark:group-hover:border-cyan-400/[0.14]
                          "
                        >
                          {technology}
                        </motion.span>
                      ),
                    )}
                  </div>

                  {/* =================================================
                      CARD FOOTER
                  ================================================== */}

                  <div
                    className="
                      mt-7
                      flex
                      items-center
                      justify-between
                      border-t
                      border-[var(--border)]
                      pt-4
                    "
                  >
                    <span
                      className="
                        font-mono
                        text-[8px]
                        uppercase
                        tracking-[0.16em]
                        text-[var(--muted)]
                        opacity-50
                      "
                    >
                      Capability
                    </span>

                    <ArrowUpRight
                      size={13}
                      className="
                        text-[var(--muted)]
                        opacity-40
                        transition-all
                        duration-300
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                        group-hover:text-cyan-500
                        group-hover:opacity-100
                        dark:group-hover:text-cyan-400
                      "
                    />
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

