"use client";

import { ArrowUpRight, CalendarDays } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const experiences = [
  {
    period: "CURRENT",
    type: "SOFTWARE DEVELOPMENT",
    title: "Building Modern Web Applications",
    description:
      "Designing and developing responsive web applications using modern JavaScript frameworks, typed development, reusable interfaces, and practical backend services.",
    technologies: ["Next.js", "React", "TypeScript", "Firebase"],
  },
  {
    period: "PROJECT BASED",
    type: "FULL STACK DEVELOPMENT",
    title: "Administrative & Business Systems",
    description:
      "Developing software that improves real-world workflows through dashboards, structured data, management interfaces, and application automation.",
    technologies: ["Web Applications", "Databases", "APIs", "UI/UX"],
  },
  {
    period: "CONTINUOUS",
    type: "ENGINEERING DEVELOPMENT",
    title: "Learning Through Real Projects",
    description:
      "Continuously improving software engineering skills through hands-on projects, debugging, system design, performance optimization, and experimentation with modern technologies.",
    technologies: ["Git", "Architecture", "Debugging", "Performance"],
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Experience() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="experience"
      className="
        relative
        overflow-hidden
        border-b border-slate-900/[0.08]
        bg-[var(--background)]
        py-24
        text-[var(--foreground)]
        transition-colors
        duration-300
        dark:border-white/[0.06]
        sm:py-32
        lg:py-36
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
          -right-48
          top-[20%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-purple-500/[0.025]
          blur-3xl
          dark:bg-purple-500/[0.025]
        "
        initial={
          reducedMotion
            ? false
            : {
                opacity: 0,
                x: 80,
              }
        }
        whileInView={
          reducedMotion
            ? undefined
            : {
                opacity: 1,
                x: 0,
              }
        }
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 1.4,
          ease,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-48
          bottom-[10%]
          h-[400px]
          w-[400px]
          rounded-full
          bg-cyan-400/[0.018]
          blur-3xl
          dark:bg-cyan-400/[0.02]
        "
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
            SECTION HEADER
        =================================================== */}

        <motion.header
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 35,
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
            duration: 0.8,
            ease,
          }}
          className="max-w-4xl"
        >
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
                duration: 0.6,
                ease,
              }}
              className="h-px bg-cyan-500/70 dark:bg-cyan-400/70"
            />

            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-600 dark:text-cyan-400">
              03 — Experience
            </p>
          </div>

          {/* Heading */}

          <h2
            className="
              mt-6
              max-w-3xl
              text-4xl
              font-bold
              leading-[0.98]
              tracking-[-0.045em]
              text-slate-950
              sm:text-5xl
              lg:text-6xl
              dark:text-white
            "
          >
            EXPERIENCE BUILDING
            <br />
            <span className="text-slate-600 dark:text-white/70">
              REAL-WORLD SOFTWARE.
            </span>
          </h2>

          {/* Description */}

          <p
            className="
              mt-7
              max-w-2xl
              text-sm
              leading-7
              text-slate-600
              sm:text-base
              dark:text-slate-400
            "
          >
            A collection of development experience shaped by practical
            projects, problem solving, and continuous improvement.
          </p>
        </motion.header>

        {/* ===================================================
            EXPERIENCE TIMELINE
        =================================================== */}

        <div className="relative mt-16 sm:mt-20">
          {/* Timeline background */}

          <div
            aria-hidden="true"
            className="
              absolute
              bottom-0
              left-[7px]
              top-0
              hidden
              w-px
              bg-slate-900/[0.10]
              sm:block
              dark:bg-white/[0.07]
            "
          />

          {/* Animated cyan progress */}

          <motion.div
            aria-hidden="true"
            initial={
              reducedMotion
                ? false
                : {
                    scaleY: 0,
                  }
            }
            whileInView={
              reducedMotion
                ? undefined
                : {
                    scaleY: 1,
                  }
            }
            viewport={{
              once: true,
              amount: 0.05,
            }}
            transition={{
              duration: 1.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              transformOrigin: "top",
            }}
            className="
              absolute
              bottom-0
              left-[7px]
              top-0
              hidden
              w-px
              bg-gradient-to-b
              from-cyan-500/80
              via-cyan-500/30
              to-transparent
              sm:block
              dark:from-cyan-400/80
              dark:via-cyan-400/30
            "
          />

          {/* Experience items */}

          <div className="space-y-5 sm:space-y-8">
            {experiences.map((experience, index) => (
              <ExperienceItem
                key={experience.title}
                experience={experience}
                index={index}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </div>

        {/* ===================================================
            FOOTER NOTE
        =================================================== */}

        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 15,
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
            amount: 0.5,
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease,
          }}
          className="
            mt-10
            flex
            items-center
            gap-3
            pl-0
            sm:pl-[190px]
          "
        >
          <span
            className="
              h-px
              w-8
              bg-slate-900/[0.10]
              dark:bg-white/[0.08]
            "
          />

          <p
            className="
              font-mono
              text-[9px]
              uppercase
              tracking-[0.16em]
              text-slate-500
              dark:text-slate-600
            "
          >
            Always building. Always improving.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   EXPERIENCE ITEM
========================================================= */

function ExperienceItem({
  experience,
  index,
  reducedMotion,
}: {
  experience: (typeof experiences)[number];
  index: number;
  reducedMotion: boolean | null;
}) {
  return (
    <motion.article
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              y: 45,
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
        amount: 0.22,
        margin: "0px 0px -8% 0px",
      }}
      transition={{
        duration: 0.75,
        delay: index * 0.08,
        ease,
      }}
      className="
        group
        relative
        grid
        sm:grid-cols-[170px_minmax(0,1fr)]
        sm:gap-8
        lg:grid-cols-[190px_minmax(0,1fr)]
        lg:gap-10
      "
    >
      {/* ===================================================
          TIMELINE NODE
      =================================================== */}

      <motion.div
        aria-hidden="true"
        initial={
          reducedMotion
            ? false
            : {
                scale: 0,
                opacity: 0,
              }
        }
        whileInView={
          reducedMotion
            ? undefined
            : {
                scale: 1,
                opacity: 1,
              }
        }
        viewport={{
          once: true,
          amount: 0.4,
        }}
        transition={{
          duration: 0.45,
          delay: index * 0.08 + 0.1,
          ease,
        }}
        className="
          absolute
          -left-[1px]
          top-8
          hidden
          h-[9px]
          w-[9px]
          -translate-x-1/2
          rounded-full
          bg-cyan-500
          shadow-[0_0_0_4px_#f8fafc,0_0_18px_rgba(6,182,212,0.35)]
          sm:block
          dark:bg-cyan-400
          dark:shadow-[0_0_0_4px_#070b14,0_0_18px_rgba(34,211,238,0.45)]
        "
      />

      {/* ===================================================
          META INFORMATION
      =================================================== */}

      <div className="mb-4 pl-0 sm:mb-0 sm:pl-7">
        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  x: -15,
                }
          }
          whileInView={
            reducedMotion
              ? undefined
              : {
                  opacity: 1,
                  x: 0,
                }
          }
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            ease,
          }}
          className="flex items-center gap-2"
        >
          <CalendarDays
            size={13}
            strokeWidth={1.8}
            className="text-slate-500 dark:text-slate-600"
          />

          <span
            className="
              font-mono
              text-[9px]
              font-medium
              uppercase
              tracking-[0.18em]
              text-slate-500
              dark:text-slate-500
            "
          >
            {experience.period}
          </span>
        </motion.div>

        <p
          className="
            mt-3
            max-w-[140px]
            text-[9px]
            font-semibold
            uppercase
            leading-4
            tracking-[0.14em]
            text-cyan-600/80
            dark:text-cyan-400/80
          "
        >
          {experience.type}
        </p>

        <span
          className="
            mt-7
            hidden
            font-mono
            text-[9px]
            text-slate-400
            sm:block
            dark:text-slate-700
          "
        >
          0{index + 1}
        </span>
      </div>

      {/* ===================================================
          EXPERIENCE CARD
      =================================================== */}

      <motion.div
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
          relative
          overflow-hidden
          rounded-2xl
          border
          border-slate-900/[0.08]
          bg-white/70
          p-6
          shadow-[0_12px_40px_rgba(15,23,42,0.04)]
          transition-all
          duration-300
          hover:border-cyan-500/25
          hover:bg-white
          hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]
          sm:p-7
          lg:p-8
          dark:border-white/[0.07]
          dark:bg-white/[0.018]
          dark:shadow-none
          dark:hover:border-cyan-400/20
          dark:hover:bg-white/[0.028]
          dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.18)]
        "
      >
        {/* =================================================
            HOVER GLOW
        ================================================= */}

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
            bg-cyan-400/[0.035]
            blur-3xl
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
            dark:bg-cyan-400/[0.04]
          "
        />

        {/* =================================================
            TOP ACCENT
        ================================================= */}

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
            duration: 0.7,
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

        <div className="relative">
          {/* =================================================
              TOP ROW
          ================================================= */}

          <div className="flex items-start justify-between gap-6">
            <div>
              <p
                className="
                  mb-2
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.18em]
                  text-slate-400
                  dark:text-slate-600
                "
              >
                Experience / 0{index + 1}
              </p>

              <h3
                className="
                  text-lg
                  font-semibold
                  tracking-[-0.02em]
                  text-slate-950
                  transition-colors
                  duration-300
                  group-hover:text-cyan-700
                  sm:text-xl
                  dark:text-white
                  dark:group-hover:text-cyan-50
                "
              >
                {experience.title}
              </h3>
            </div>

            {/* Arrow */}

            <motion.span
              aria-hidden="true"
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      rotate: 8,
                      scale: 1.08,
                    }
              }
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-slate-900/[0.08]
                text-slate-500
                transition-all
                duration-300
                group-hover:border-cyan-500/25
                group-hover:bg-cyan-500/[0.05]
                group-hover:text-cyan-600
                dark:border-white/[0.06]
                dark:text-slate-600
                dark:group-hover:border-cyan-400/20
                dark:group-hover:bg-cyan-400/[0.05]
                dark:group-hover:text-cyan-400
              "
            >
              <ArrowUpRight size={15} strokeWidth={1.8} />
            </motion.span>
          </div>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <motion.p
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 12,
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
              duration: 0.55,
              delay: 0.2,
              ease,
            }}
            className="
              mt-5
              max-w-2xl
              text-[13px]
              leading-6
              text-slate-600
              sm:text-sm
              sm:leading-7
              dark:text-slate-400
            "
          >
            {experience.description}
          </motion.p>

          {/* =================================================
              DIVIDER
          ================================================= */}

          <div
            className="
              my-6
              h-px
              w-full
              bg-slate-900/[0.07]
              dark:bg-white/[0.05]
            "
          />

          {/* =================================================
              TECHNOLOGIES
          ================================================= */}

          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((technology, techIndex) => (
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
                  amount: 0.4,
                }}
                transition={{
                  duration: 0.35,
                  delay: 0.25 + techIndex * 0.05,
                  ease,
                }}
                className="
                  rounded-md
                  border
                  border-slate-900/[0.08]
                  bg-slate-50
                  px-2.5
                  py-1.5
                  font-mono
                  text-[9px]
                  text-slate-500
                  transition-all
                  duration-300
                  group-hover:border-slate-900/[0.12]
                  group-hover:text-slate-700
                  dark:border-white/[0.07]
                  dark:bg-black/20
                  dark:text-slate-500
                  dark:group-hover:border-white/[0.10]
                  dark:group-hover:text-slate-400
                "
              >
                {technology}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}