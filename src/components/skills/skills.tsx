"use client";

import {
  Braces,
  Database,
  GitBranch,
  Layers,
  Server,
  Wrench,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const skillGroups = [
  {
    title: "FRONTEND",
    icon: Layers,
    description: "Interfaces and user experiences",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
    ],
  },
  {
    title: "BACKEND",
    icon: Server,
    description: "Application logic and services",
    technologies: ["Node.js", "REST APIs", "Firebase", "Firestore"],
  },
  {
    title: "DATABASE",
    icon: Database,
    description: "Data storage and management",
    technologies: ["Firestore", "MySQL", "PostgreSQL", "SQL"],
  },
  {
    title: "LANGUAGES",
    icon: Braces,
    description: "Core development languages",
    technologies: ["TypeScript", "JavaScript", "Python", "PHP", "SQL"],
  },
  {
    title: "TOOLS",
    icon: Wrench,
    description: "Development workflow",
    technologies: ["Git", "GitHub", "VS Code", "Vercel", "npm"],
  },
  {
    title: "ENGINEERING",
    icon: GitBranch,
    description: "Practices and principles",
    technologies: [
      "Component Architecture",
      "Responsive Design",
      "Performance",
      "Debugging",
      "Deployment",
    ],
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Skills() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="technology"
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
          BACKGROUND ATMOSPHERE
      ===================================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[35%]
          h-[500px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-cyan-500/[0.018]
          blur-3xl
          dark:bg-cyan-400/[0.018]
        "
        initial={
          reducedMotion
            ? false
            : {
                opacity: 0,
                scale: 0.85,
              }
        }
        whileInView={
          reducedMotion
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
          ease,
        }}
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="container-khel relative">
        {/* ===================================================
            HEADER
        =================================================== */}

        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 30,
                }
          }
          whileInView={
            reducedMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.75,
            ease,
          }}
          className="
            flex
            flex-col
            justify-between
            gap-8
            md:flex-row
            md:items-end
          "
        >
          <div>
            {/* Section label */}

            <div className="flex items-center gap-3">
              <motion.span
                aria-hidden="true"
                initial={
                  reducedMotion
                    ? false
                    : {
                        width: 0,
                        opacity: 0,
                      }
                }
                whileInView={
                  reducedMotion
                    ? undefined
                    : {
                        width: 24,
                        opacity: 1,
                      }
                }
                viewport={{
                  once: true,
                  amount: 0.5,
                }}
                transition={{
                  duration: 0.55,
                  ease,
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
                04 — Technology
              </p>
            </div>

            {/* Heading */}

            <h2
              className="
                mt-5
                text-4xl
                font-bold
                leading-[1.05]
                tracking-[-0.035em]
                text-slate-950
                sm:text-5xl
                dark:text-white
              "
            >
              TOOLS I USE
              <br />
              TO BUILD PRODUCTS.
            </h2>
          </div>

          {/* Description */}

          <p
            className="
              max-w-md
              text-sm
              leading-7
              text-slate-600
              dark:text-slate-400
            "
          >
            A practical technology stack selected around maintainability,
            developer experience, performance, and the needs of each project.
          </p>
        </motion.div>

        {/* ===================================================
            TECHNOLOGY GRID
        =================================================== */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: reducedMotion ? 0 : 0.08,
                delayChildren: reducedMotion ? 0 : 0.1,
              },
            },
          }}
          className="
            mt-16
            grid
            gap-px
            overflow-hidden
            rounded-2xl
            border
            border-slate-900/[0.08]
            bg-slate-900/[0.08]
            shadow-[0_20px_60px_rgba(15,23,42,0.04)]
            sm:grid-cols-2
            lg:grid-cols-3
            dark:border-white/[0.07]
            dark:bg-white/[0.07]
            dark:shadow-none
          "
        >
          {skillGroups.map((group, index) => (
            <SkillCard
              key={group.title}
              group={group}
              index={index}
              reducedMotion={reducedMotion}
            />
          ))}
        </motion.div>

        {/* ===================================================
            BOTTOM TECHNICAL INDICATOR
        =================================================== */}

        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                }
          }
          whileInView={
            reducedMotion
              ? undefined
              : {
                  opacity: 1,
                }
          }
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease,
          }}
          className="mt-6 flex items-center justify-between"
        >
          <span
            className="
              font-mono
              text-[9px]
              uppercase
              tracking-[0.18em]
              text-slate-400
              dark:text-slate-700
            "
          >
            Technology Stack
          </span>

          <span
            className="
              font-mono
              text-[9px]
              uppercase
              tracking-[0.18em]
              text-slate-400
              dark:text-slate-700
            "
          >
            {skillGroups.length.toString().padStart(2, "0")} Categories
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   SKILL CARD
========================================================= */

function SkillCard({
  group,
  index,
  reducedMotion,
}: {
  group: (typeof skillGroups)[number];
  index: number;
  reducedMotion: boolean | null;
}) {
  const Icon = group.icon;

  return (
    <motion.article
      variants={{
        hidden: reducedMotion
          ? {}
          : {
              opacity: 0,
              y: 35,
            },

        visible: reducedMotion
          ? {}
          : {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.65,
                ease,
              },
            },
      }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -3,
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
        bg-white
        p-7
        transition-all
        duration-300
        hover:bg-slate-50
        hover:shadow-[0_15px_40px_rgba(15,23,42,0.05)]
        dark:bg-[#070b14]
        dark:hover:bg-[#0b1220]
        dark:hover:shadow-none
      "
    >
      {/* ===================================================
          TOP CYAN REVEAL
      =================================================== */}

      <motion.div
        aria-hidden="true"
        initial={
          reducedMotion
            ? false
            : {
                scaleX: 0,
              }
        }
        whileInView={
          reducedMotion
            ? undefined
            : {
                scaleX: 1,
              }
        }
        viewport={{
          once: true,
          amount: 0.4,
        }}
        transition={{
          duration: 0.65,
          delay: 0.15,
          ease,
        }}
        style={{
          transformOrigin: "left",
        }}
        className="
          absolute
          left-0
          right-0
          top-0
          h-px
          bg-gradient-to-r
          from-cyan-500/60
          via-cyan-500/10
          to-transparent
          dark:from-cyan-400/50
        "
      />

      {/* ===================================================
          HOVER GLOW
      =================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-40
          w-40
          rounded-full
          bg-cyan-500/[0.025]
          blur-3xl
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
          dark:bg-cyan-400/[0.035]
        "
      />

      <div className="relative">
        {/* =================================================
            ICON + INDEX
        ================================================= */}

        <div className="flex items-center justify-between">
          <motion.div
            whileHover={
              reducedMotion
                ? undefined
                : {
                    scale: 1.08,
                    rotate: 2,
                  }
            }
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-900/[0.08]
              bg-slate-50
              transition-colors
              duration-300
              group-hover:border-cyan-500/20
              group-hover:bg-cyan-50
              dark:border-white/[0.07]
              dark:bg-white/[0.025]
              dark:group-hover:border-cyan-400/20
              dark:group-hover:bg-cyan-400/[0.05]
            "
          >
            <Icon
              size={18}
              strokeWidth={1.8}
              className="
                text-cyan-600
                dark:text-cyan-400
              "
            />
          </motion.div>

          <span
            className="
              font-mono
              text-[9px]
              tracking-[0.15em]
              text-slate-400
              dark:text-slate-700
            "
          >
            0{index + 1}
          </span>
        </div>

        {/* =================================================
            TITLE
        ================================================= */}

        <h3
          className="
            mt-7
            text-xs
            font-semibold
            tracking-[0.16em]
            text-slate-950
            transition-colors
            duration-300
            group-hover:text-cyan-700
            dark:text-white
            dark:group-hover:text-cyan-50
          "
        >
          {group.title}
        </h3>

        {/* Description */}

        <p
          className="
            mt-2
            text-xs
            text-slate-600
            dark:text-slate-600
          "
        >
          {group.description}
        </p>

        {/* =================================================
            TECHNOLOGIES
        ================================================= */}

        <div className="mt-6 flex flex-wrap gap-2">
          {group.technologies.map((technology, technologyIndex) => (
            <motion.span
              key={technology}
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 8,
                    }
              }
              whileInView={
                reducedMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              viewport={{
                once: true,
                amount: 0.35,
              }}
              transition={{
                duration: 0.35,
                delay: 0.2 + technologyIndex * 0.045,
                ease,
              }}
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      y: -1,
                    }
              }
              className="
                rounded-md
                border
                border-slate-900/[0.08]
                bg-slate-50
                px-2.5
                py-1.5
                text-[10px]
                text-slate-600
                transition-all
                duration-300
                group-hover:border-cyan-500/15
                group-hover:text-slate-700
                dark:border-white/[0.06]
                dark:bg-white/[0.025]
                dark:text-slate-400
                dark:group-hover:border-cyan-400/10
                dark:group-hover:text-slate-300
              "
            >
              {technology}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}