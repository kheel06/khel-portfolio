"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Award,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  certifications,
  type Certification,
} from "@/data/certifications";

import { CertificationDialog } from "./certification-dialog";

const easing = [0.22, 1, 0.36, 1] as const;

/* ============================================================================
   ANIMATION VARIANTS
============================================================================ */

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
    y: 22,
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

const cardContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const cardItem = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: easing,
    },
  },
};

/* ============================================================================
   CERTIFICATION SECTION
============================================================================ */

export function CertificationSection() {
  const shouldReduceMotion = useReducedMotion();

  const [selectedCertification, setSelectedCertification] =
    useState<Certification | null>(null);

  return (
    <>
      <section
        id="certifications"
        className="
          relative
          overflow-hidden
          border-b
          border-slate-900/[0.08]
          bg-slate-50
          py-28
          text-slate-950
          transition-colors
          duration-300
          sm:py-32
          dark:border-white/[0.06]
          dark:bg-[#070b14]
          dark:text-white
        "
      >
        {/* ==================================================================
            ATMOSPHERIC BACKGROUND
        ================================================================== */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          {/* --------------------------------------------------------------
              LIGHT MODE CYAN ATMOSPHERE
          -------------------------------------------------------------- */}

          <div
            className="
              absolute
              right-[12%]
              top-[20%]
              h-72
              w-72
              rounded-full
              bg-cyan-500/[0.045]
              blur-3xl
              dark:bg-cyan-500/[0.025]
            "
          />

          {/* --------------------------------------------------------------
              LIGHT MODE BLUE ATMOSPHERE
          -------------------------------------------------------------- */}

          <div
            className="
              absolute
              bottom-[10%]
              left-[5%]
              h-64
              w-64
              rounded-full
              bg-blue-600/[0.035]
              blur-3xl
              dark:bg-blue-600/[0.02]
            "
          />

          {/* --------------------------------------------------------------
              TECHNICAL GRID — LIGHT
          -------------------------------------------------------------- */}

          <div
            className="
              absolute
              inset-0
              opacity-[0.035]
              dark:hidden
            "
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(15, 23, 42, 0.28) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(15, 23, 42, 0.28) 1px,
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

          {/* --------------------------------------------------------------
              TECHNICAL GRID — DARK
          -------------------------------------------------------------- */}

          <div
            className="
              absolute
              inset-0
              hidden
              opacity-[0.018]
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

          {/* --------------------------------------------------------------
              TOP LIGHT VIGNETTE
          -------------------------------------------------------------- */}

          <div
            className="
              absolute
              inset-x-0
              top-0
              h-40
              bg-gradient-to-b
              from-white
              to-transparent
              dark:from-[#070b14]
              dark:to-transparent
            "
          />

          {/* --------------------------------------------------------------
              BOTTOM LIGHT VIGNETTE
          -------------------------------------------------------------- */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-40
              bg-gradient-to-t
              from-slate-50
              to-transparent
              dark:from-[#070b14]
              dark:to-transparent
            "
          />
        </div>

        {/* ==================================================================
            CONTENT
        ================================================================== */}

        <div className="container-khel relative z-10">
          {/* =================================================================
              SECTION HEADING
          ================================================================= */}

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
              amount: 0.3,
            }}
            className="max-w-3xl"
          >
            {/* --------------------------------------------------------------
                LABEL
            -------------------------------------------------------------- */}

            <motion.div
              variants={
                shouldReduceMotion
                  ? undefined
                  : headerItem
              }
              className="flex items-center gap-3"
            >
              <motion.span
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        width: 0,
                      }
                }
                whileInView={
                  shouldReduceMotion
                    ? undefined
                    : {
                        width: 32,
                      }
                }
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  ease: easing,
                }}
                className="
                  h-px
                  bg-cyan-600/70
                  dark:bg-cyan-400/70
                "
              />

              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-cyan-700
                  dark:text-cyan-400
                "
              >
                06 — Certifications
              </p>
            </motion.div>

            {/* --------------------------------------------------------------
                HEADING
            -------------------------------------------------------------- */}

            <motion.h2
              variants={
                shouldReduceMotion
                  ? undefined
                  : headerItem
              }
              className="
                mt-5
                text-4xl
                font-bold
                tracking-[-0.035em]
                text-slate-950
                sm:text-5xl
                dark:text-white
              "
            >
              VERIFIED KNOWLEDGE.
            </motion.h2>

            {/* --------------------------------------------------------------
                DESCRIPTION
            -------------------------------------------------------------- */}

            <motion.p
              variants={
                shouldReduceMotion
                  ? undefined
                  : headerItem
              }
              className="
                mt-6
                max-w-2xl
                text-sm
                leading-7
                text-slate-600
                sm:text-base
                dark:text-slate-400
              "
            >
              Certifications and continuous learning that
              support my practical software engineering work.
            </motion.p>
          </motion.div>

          {/* =================================================================
              CERTIFICATION GRID
          ================================================================= */}

          <motion.div
            variants={
              shouldReduceMotion
                ? undefined
                : cardContainer
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
            className="
              mt-14
              grid
              gap-5
              md:grid-cols-2
            "
          >
            {certifications.map((certification) => (
              <CertificationCard
                key={certification.id}
                certification={certification}
                onOpen={setSelectedCertification}
                reducedMotion={shouldReduceMotion}
              />
            ))}
          </motion.div>

          {/* =================================================================
              BOTTOM TECHNICAL MARKER
          ================================================================= */}

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 14,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
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
            <div className="flex items-center gap-3">
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-cyan-600
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
                  dark:text-slate-500
                "
              >
                Continuous Learning
              </span>
            </div>

            <span
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-slate-500
                dark:text-slate-500
              "
            >
              {certifications.length
                .toString()
                .padStart(2, "0")}{" "}
              Credentials
            </span>
          </motion.div>
        </div>
      </section>

      {/* ======================================================================
          CERTIFICATION DIALOG
      ====================================================================== */}

      <CertificationDialog
        certification={selectedCertification}
        onClose={() => setSelectedCertification(null)}
      />
    </>
  );
}

/* ============================================================================
   CERTIFICATION CARD
============================================================================ */

interface CertificationCardProps {
  certification: Certification;
  onOpen: (certification: Certification) => void;
  reducedMotion: boolean | null;
}

function CertificationCard({
  certification,
  onOpen,
  reducedMotion,
}: CertificationCardProps) {
  return (
    <motion.button
      type="button"
      variants={
        reducedMotion
          ? undefined
          : cardItem
      }
      onClick={() => onOpen(certification)}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -4,
            }
      }
      whileTap={
        reducedMotion
          ? undefined
          : {
              scale: 0.995,
            }
      }
      className="
        group
        relative
        text-left
        focus-visible:outline-none
      "
    >
      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-slate-900/[0.08]
          bg-white
          p-6
          shadow-[0_12px_40px_rgba(15,23,42,0.05)]
          transition-all
          duration-300

          group-hover:border-cyan-500/25
          group-hover:shadow-[0_20px_60px_rgba(15,23,42,0.09)]

          dark:border-white/[0.08]
          dark:bg-white/[0.025]
          dark:shadow-none
          dark:group-hover:border-cyan-400/25
        "
      >
        {/* ================================================================
            SUBTLE HOVER GLOW
        ================================================================ */}

        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-40
            w-40
            rounded-full
            bg-cyan-500/[0.045]
            blur-3xl
            dark:bg-cyan-400/[0.04]
          "
          initial={{
            opacity: 0,
          }}
          whileHover={
            reducedMotion
              ? undefined
              : {
                  opacity: 1,
                }
          }
          transition={{
            duration: 0.4,
          }}
        />

        {/* ================================================================
            TOP ROW
        ================================================================ */}

        <div
          className="
            relative
            z-10
            flex
            items-start
            justify-between
            gap-4
          "
        >
          {/* Award icon */}

          <motion.div
            whileHover={
              reducedMotion
                ? undefined
                : {
                    scale: 1.06,
                    rotate: -3,
                  }
            }
            transition={{
              duration: 0.35,
              ease: easing,
            }}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-cyan-500/20
              bg-cyan-500/[0.08]
              dark:border-cyan-400/20
              dark:bg-cyan-400/10
            "
          >
            <Award
              size={20}
              strokeWidth={1.8}
              className="
                text-cyan-600
                dark:text-cyan-300
              "
            />
          </motion.div>

          {/* Arrow */}

          <motion.div
            whileHover={
              reducedMotion
                ? undefined
                : {
                    x: 3,
                    y: -3,
                  }
            }
            transition={{
              duration: 0.3,
              ease: easing,
            }}
          >
            <ArrowUpRight
              size={18}
              className="
                text-slate-400
                transition-colors
                duration-300
                group-hover:text-cyan-600

                dark:text-slate-500
                dark:group-hover:text-cyan-300
              "
            />
          </motion.div>
        </div>

        {/* ================================================================
            CONTENT
        ================================================================ */}

        <div className="relative z-10 mt-8">
          <p
            className="
              text-[11px]
              font-medium
              uppercase
              tracking-[0.18em]
              text-slate-500
              dark:text-slate-500
            "
          >
            {certification.issuer}
          </p>

          <h3
            className="
              mt-2
              text-xl
              font-semibold
              leading-snug
              text-slate-950
              dark:text-white
            "
          >
            {certification.title}
          </h3>

          <p
            className="
              mt-2
              text-sm
              text-slate-500
              dark:text-slate-500
            "
          >
            {certification.date}
          </p>

          <p
            className="
              mt-5
              line-clamp-2
              text-sm
              leading-6
              text-slate-600
              dark:text-slate-400
            "
          >
            {certification.description}
          </p>
        </div>

        {/* ================================================================
            SKILLS
        ================================================================ */}

        <div className="relative z-10 mt-6 flex flex-wrap gap-2">
          {certification.skills.map((skill, index) => (
            <motion.span
              key={skill}
              initial={
                reducedMotion
                  ? false
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
              }}
              transition={{
                duration: 0.35,
                delay: 0.2 + index * 0.035,
                ease: easing,
              }}
              className="
                rounded-full
                border
                border-slate-900/[0.08]
                bg-slate-50
                px-3
                py-1
                text-[11px]
                text-slate-500
                transition-colors
                duration-300

                group-hover:border-slate-900/[0.12]
                group-hover:text-slate-700

                dark:border-white/[0.07]
                dark:bg-white/[0.025]
                dark:text-slate-400
                dark:group-hover:border-white/[0.1]
                dark:group-hover:text-slate-300
              "
            >
              {skill}
            </motion.span>
          ))}
        </div>

        {/* ================================================================
            BOTTOM ACCENT
        ================================================================ */}

        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            h-px
            origin-left
            bg-cyan-600
            dark:bg-cyan-400
          "
          initial={{
            scaleX: 0,
          }}
          whileHover={
            reducedMotion
              ? undefined
              : {
                  scaleX: 1,
                }
          }
          transition={{
            duration: 0.5,
            ease: easing,
          }}
        />
      </div>
    </motion.button>
  );
}