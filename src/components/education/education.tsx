"use client";

import {
  CheckCircle2,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const education = [
  {
    period: "2022 — 2026",
    level: "Higher Education",
    degree: "Bachelor of Science in Information Technology",
    school: "Bestlink College of the Philippines",
    description:
      "Graduated May 7, 2026, with an academic foundation in software development, databases, information management, systems analysis, and problem-solving.",
    status: "Completed",
    current: true,
  },
  {
    period: "2020 — 2022",
    level: "Education",
    degree: "Senior High School",
    school: "San Jose Del Monte National Trade School",
    description:
      "Completed senior high school education with a foundation for further technical and academic development.",
    status: "Academic Background",
    current: false,
  },
  {
    period: "2016 — 2020",
    level: "Education",
    degree: "Junior High School",
    school: "San Jose Del Monte National Trade School",
    description: "Completed junior high school education.",
    status: "Academic Background",
    current: false,
  },
  {
    period: "2010 — 2016",
    level: "Education",
    degree: "Elementary Education",
    school: "Pias Elementary School",
    description: "Completed elementary education.",
    status: "Academic Background",
    current: false,
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

/* =========================================================
   EDUCATION
========================================================= */

export function Education() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="education"
      className="
        relative isolate overflow-hidden
        border-b border-black/[0.07] dark:border-white/[0.06]
        bg-[var(--background)]
        py-28 sm:py-32
      "
    >
      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ====================================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-56 top-[10%]
          h-[520px] w-[520px]
          rounded-full
          bg-blue-500/[0.045]
          blur-[110px]
          dark:bg-blue-500/[0.025]
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
          amount: 0.1,
        }}
        transition={{
          duration: 1.4,
          ease,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-48 bottom-[5%]
          h-[420px] w-[420px]
          rounded-full
          bg-cyan-400/[0.025]
          blur-[100px]
          dark:bg-cyan-400/[0.018]
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
          delay: 0.1,
          ease,
        }}
      />

      {/* Technical grid */}
      <div
        aria-hidden="true"
        className="
          technical-grid
          pointer-events-none absolute inset-0
          opacity-[0.18]
          dark:opacity-[0.28]
        "
      />

      <div className="container-khel relative z-10">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 28,
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
          className="max-w-3xl"
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
                duration: 0.55,
                ease,
              }}
              className="h-px bg-cyan-500 dark:bg-cyan-400"
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
              02 — Education
            </p>
          </div>

          {/* Heading */}
          <motion.h2
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 18,
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
              duration: 0.7,
              delay: 0.08,
              ease,
            }}
            className="
              mt-5
              text-4xl
              font-bold
              leading-[1.02]
              tracking-[-0.04em]
              text-[var(--foreground)]
              sm:text-5xl
            "
          >
            A STRONG TECHNICAL
            <br />
            <span className="text-slate-400 dark:text-slate-500">
              FOUNDATION.
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 16,
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
              duration: 0.65,
              delay: 0.16,
              ease,
            }}
            className="
              mt-6
              max-w-2xl
              text-sm
              leading-7
              text-slate-600
              dark:text-slate-400
              sm:text-base
            "
          >
            My academic background in Information Technology strengthened
            my foundation in software development, databases, information
            management, systems analysis, and problem-solving.
          </motion.p>
        </motion.div>

        {/* =====================================================
            TIMELINE
        ====================================================== */}

        <div className="relative mt-16 sm:mt-20">
          {/* Static timeline */}
          <div
            aria-hidden="true"
            className="
              absolute
              bottom-0
              left-[18px]
              top-0
              hidden
              w-px
              bg-black/[0.08]
              dark:bg-white/[0.07]
              md:block
            "
          />

          {/* Animated timeline */}
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
              left-[18px]
              top-0
              hidden
              w-px
              bg-gradient-to-b
              from-cyan-500/80
              via-blue-500/30
              to-transparent
              dark:from-cyan-400/70
              dark:via-blue-500/30
              md:block
            "
          />

          {/* Education items */}
          <div className="space-y-6 sm:space-y-7">
            {education.map((item, index) => (
              <EducationItem
                key={item.degree}
                item={item}
                index={index}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   EDUCATION ITEM
========================================================= */

function EducationItem({
  item,
  index,
  reducedMotion,
}: {
  item: (typeof education)[number];
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
              x: -24,
              y: 16,
            }
      }
      whileInView={
        reducedMotion
          ? undefined
          : {
              opacity: 1,
              x: 0,
              y: 0,
            }
      }
      viewport={{
        once: true,
        amount: 0.2,
        margin: "0px 0px -10% 0px",
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease,
      }}
      className="relative md:pl-14"
    >
      {/* =====================================================
          TIMELINE MARKER
      ====================================================== */}

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
          amount: 0.5,
        }}
        transition={{
          duration: 0.45,
          delay: 0.12 + index * 0.08,
          ease,
        }}
        className="
          absolute
          left-0
          top-7
          hidden
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          border
          border-black/[0.08]
          bg-[var(--background)]
          shadow-sm
          dark:border-white/[0.08]
          md:flex
        "
      >
        <span
          className={`
            h-2.5
            w-2.5
            rounded-full
            ${
              item.current
                ? "bg-cyan-500 shadow-[0_0_14px_rgba(6,182,212,0.65)] dark:bg-cyan-400 dark:shadow-[0_0_14px_rgba(6,182,212,0.7)]"
                : "bg-slate-400 dark:bg-slate-600"
            }
          `}
        />
      </motion.div>

      {/* =====================================================
          CARD
      ====================================================== */}

      <motion.div
        whileHover={
          reducedMotion
            ? undefined
            : {
                y: -4,
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
          border-black/[0.08]
          bg-black/[0.015]
          p-6
          shadow-[0_8px_35px_rgba(15,23,42,0.035)]
          transition-all
          duration-300
          hover:border-cyan-500/20
          hover:bg-cyan-500/[0.018]
          dark:border-white/[0.08]
          dark:bg-white/[0.025]
          dark:shadow-none
          dark:hover:border-cyan-400/20
          dark:hover:bg-white/[0.032]
          sm:p-7
        "
      >
        {/* =====================================================
            ACTIVE CARD ATMOSPHERE
        ====================================================== */}

        {item.current && (
          <motion.div
            aria-hidden="true"
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
              amount: 0.3,
            }}
            transition={{
              duration: 1,
              delay: 0.35,
            }}
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-48
              w-48
              rounded-full
              bg-cyan-400/[0.07]
              blur-3xl
              dark:bg-cyan-400/[0.045]
            "
          />
        )}

        {/* =====================================================
            LEFT ACCENT
        ====================================================== */}

        <div
          aria-hidden="true"
          className={`
            absolute
            left-0
            top-0
            h-full
            w-px
            bg-gradient-to-b
            from-cyan-500/80
            via-blue-500/30
            to-transparent
            transition-opacity
            duration-300
            dark:from-cyan-400/70
            dark:via-blue-500/20
            ${
              item.current
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            }
          `}
        />

        <div className="relative">
          {/* ===================================================
              MAIN CONTENT
          ==================================================== */}

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              {/* Level + period */}
              <div className="flex flex-wrap items-center gap-3">
                <motion.span
                  initial={
                    reducedMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 6,
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
                    duration: 0.4,
                    delay: 0.2,
                    ease,
                  }}
                  className="
                    rounded-full
                    border
                    border-cyan-500/15
                    bg-cyan-500/[0.06]
                    px-3
                    py-1
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-cyan-600
                    dark:border-cyan-400/10
                    dark:bg-cyan-400/[0.06]
                    dark:text-cyan-300
                  "
                >
                  {item.level}
                </motion.span>

                <span
                  className="
                    text-xs
                    font-medium
                    text-slate-500
                    dark:text-slate-600
                  "
                >
                  {item.period}
                </span>
              </div>

              {/* Degree */}
              <motion.h3
                initial={
                  reducedMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 10,
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
                  duration: 0.55,
                  delay: 0.14,
                  ease,
                }}
                className="
                  mt-5
                  text-xl
                  font-semibold
                  tracking-tight
                  text-[var(--foreground)]
                  sm:text-2xl
                "
              >
                {item.degree}
              </motion.h3>

              {/* School */}
              <p
                className="
                  mt-2
                  text-sm
                  font-medium
                  text-slate-700
                  dark:text-slate-300
                "
              >
                {item.school}
              </p>

              {/* Description */}
              <motion.p
                initial={
                  reducedMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 10,
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
                  duration: 0.5,
                  delay: 0.25,
                  ease,
                }}
                className="
                  mt-5
                  max-w-2xl
                  text-sm
                  leading-7
                  text-slate-600
                  dark:text-slate-400
                "
              >
                {item.description}
              </motion.p>
            </div>

            {/* =================================================
                STATUS
            ================================================== */}

            <motion.div
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      x: 10,
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
                amount: 0.4,
              }}
              transition={{
                duration: 0.45,
                delay: 0.28,
                ease,
              }}
              className="
                flex
                shrink-0
                items-center
                gap-2
                text-xs
                lg:pt-1
              "
            >
              {item.current ? (
                <>
                  <CheckCircle2
                    size={16}
                    className="text-emerald-500 dark:text-emerald-400"
                  />

                  <span className="text-emerald-600 dark:text-emerald-400">
                    {item.status}
                  </span>
                </>
              ) : (
                <>
                  <GraduationCap
                    size={16}
                    className="text-slate-400 dark:text-slate-600"
                  />

                  <span className="text-slate-500 dark:text-slate-500">
                    {item.status}
                  </span>
                </>
              )}
            </motion.div>
          </div>

          {/* =====================================================
              BOTTOM METADATA
          ====================================================== */}

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
              amount: 0.3,
            }}
            transition={{
              duration: 0.45,
              delay: 0.3,
            }}
            className="
              mt-7
              flex
              items-center
              justify-between
              border-t
              border-black/[0.06]
              pt-5
              dark:border-white/[0.06]
            "
          >
            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-slate-500
                dark:text-slate-600
              "
            >
              Academic Background
            </span>

            <span
              className="
                hidden
                items-center
                gap-1.5
                text-[10px]
                font-medium
                uppercase
                tracking-[0.15em]
                text-slate-400
                transition-colors
                duration-300
                group-hover:text-cyan-600
                dark:text-slate-700
                dark:group-hover:text-cyan-400
                sm:flex
              "
            >
              {item.period}

              <ArrowUpRight
                size={11}
                className="
                  opacity-0
                  -translate-x-1
                  translate-y-1
                  transition-all
                  duration-300
                  group-hover:translate-x-0
                  group-hover:translate-y-0
                  group-hover:opacity-100
                "
              />
            </span>
          </motion.div>
        </div>
      </motion.div>
    </motion.article>
  );
}