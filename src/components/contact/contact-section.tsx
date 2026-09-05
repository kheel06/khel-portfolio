"use client";

import {
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
} from "motion/react";

import { ContactForm } from "./contact-form";

const easing = [0.22, 1, 0.36, 1] as const;

/* ============================================================================
   ANIMATION VARIANTS
============================================================================ */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
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

const detailVariants = {
  hidden: {
    opacity: 0,
    x: -16,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: easing,
    },
  },
};

const formVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: easing,
    },
  },
};

/* ============================================================================
   CONTACT SECTION
============================================================================ */

export function ContactSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="contact"
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
      {/* ======================================================================
          ATMOSPHERIC BACKGROUND
      ====================================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* ------------------------------------------------------------------
            MAIN CYAN ATMOSPHERE
        ------------------------------------------------------------------ */}

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: [0.025, 0.055, 0.025],
                  scale: [1, 1.05, 1],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="
            absolute
            left-[8%]
            top-[18%]
            h-96
            w-96
            rounded-full
            bg-cyan-500
            blur-3xl

            dark:opacity-[0.035]
          "
        />

        {/* ------------------------------------------------------------------
            SECONDARY BLUE ATMOSPHERE
        ------------------------------------------------------------------ */}

        <div
          className="
            absolute
            bottom-[10%]
            right-[5%]
            h-80
            w-80
            rounded-full
            bg-blue-600/[0.025]

            dark:bg-blue-600/[0.02]

            blur-3xl
          "
        />

        {/* ------------------------------------------------------------------
            TECHNICAL GRID — LIGHT MODE
        ------------------------------------------------------------------ */}

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

        {/* ------------------------------------------------------------------
            TECHNICAL GRID — DARK MODE
        ------------------------------------------------------------------ */}

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

        {/* ------------------------------------------------------------------
            TOP VIGNETTE
        ------------------------------------------------------------------ */}

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

        {/* ------------------------------------------------------------------
            BOTTOM VIGNETTE
        ------------------------------------------------------------------ */}

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

      {/* ======================================================================
          CONTENT
      ====================================================================== */}

      <div className="container-khel relative z-10">
        <motion.div
          variants={
            shouldReduceMotion
              ? undefined
              : containerVariants
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
            amount: 0.2,
          }}
          className="
            grid
            gap-14
            lg:grid-cols-[0.85fr_1.15fr]
            lg:items-start
          "
        >
          {/* ==================================================================
              LEFT — CONTACT INFORMATION
          ================================================================== */}

          <div>
            {/* ----------------------------------------------------------------
                SECTION LABEL
            ---------------------------------------------------------------- */}

            <motion.div
              variants={
                shouldReduceMotion
                  ? undefined
                  : itemVariants
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
                07 — Contact
              </p>
            </motion.div>

            {/* ----------------------------------------------------------------
                HEADING
            ---------------------------------------------------------------- */}

            <motion.h2
              variants={
                shouldReduceMotion
                  ? undefined
                  : itemVariants
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
              LET&apos;S BUILD
              <br />
              SOMETHING.
            </motion.h2>

            {/* ----------------------------------------------------------------
                DESCRIPTION
            ---------------------------------------------------------------- */}

            <motion.p
              variants={
                shouldReduceMotion
                  ? undefined
                  : itemVariants
              }
              className="
                mt-6
                max-w-lg
                text-sm
                leading-7
                text-slate-600

                sm:text-base

                dark:text-slate-400
              "
            >
              Have a project, opportunity, or technical problem
              you&apos;d like to discuss? Send me a message and
              I&apos;ll get back to you.
            </motion.p>

            {/* ================================================================
                CONTACT DETAILS
            ================================================================ */}

            <motion.div
              variants={
                shouldReduceMotion
                  ? undefined
                  : containerVariants
              }
              className="mt-10 space-y-4"
            >
              <ContactDetail
                icon={<Mail size={17} />}
                label="Email"
                value="your@email.com"
                reducedMotion={shouldReduceMotion}
              />

              <ContactDetail
                icon={<MapPin size={17} />}
                label="Location"
                value="Philippines"
                reducedMotion={shouldReduceMotion}
              />

              <ContactDetail
                icon={<MessageCircle size={17} />}
                label="Availability"
                value="Open to opportunities"
                valueClassName="
                  text-emerald-600
                  dark:text-emerald-400
                "
                reducedMotion={shouldReduceMotion}
              />
            </motion.div>
          </div>

          {/* ==================================================================
              RIGHT — CONTACT FORM
          ================================================================== */}

          <motion.div
            variants={
              shouldReduceMotion
                ? undefined
                : formVariants
            }
            className="relative"
          >
            {/* ----------------------------------------------------------------
                OUTER GLOW
            ---------------------------------------------------------------- */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -inset-4
                rounded-3xl
                bg-cyan-500/[0.018]
                blur-2xl

                dark:bg-cyan-400/[0.025]
              "
            />

            {/* ----------------------------------------------------------------
                FORM CONTAINER
            ---------------------------------------------------------------- */}

            <div
              className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-900/[0.08]
                bg-white
                p-5
                shadow-[0_20px_70px_rgba(15,23,42,0.06)]
                transition-colors
                duration-300

                sm:p-7

                dark:border-white/[0.08]
                dark:bg-white/[0.025]
                dark:shadow-none
              "
            >
              {/* --------------------------------------------------------------
                  TOP ACCENT
              -------------------------------------------------------------- */}

              <motion.div
                initial={{
                  scaleX: 0,
                }}
                whileInView={{
                  scaleX: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.4,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                  ease: easing,
                }}
                className="
                  absolute
                  inset-x-0
                  top-0
                  h-px
                  origin-left
                  bg-gradient-to-r
                  from-transparent
                  via-cyan-600/70
                  to-transparent

                  dark:via-cyan-400/70
                "
              />

              <ContactForm />
            </div>
          </motion.div>
        </motion.div>

        {/* ====================================================================
            BOTTOM MARKER
        ==================================================================== */}

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
            mt-16
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

                dark:text-slate-600
              "
            >
              Available for New Opportunities
            </span>
          </div>

          <span
            className="
              hidden
              text-[10px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-slate-500

              sm:block

              dark:text-slate-700
            "
          >
            Let&apos;s Connect
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================================
   CONTACT DETAIL
============================================================================ */

interface ContactDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClassName?: string;
  reducedMotion: boolean | null;
}

function ContactDetail({
  icon,
  label,
  value,
  valueClassName = `
    text-slate-700
    dark:text-slate-300
  `,
  reducedMotion,
}: ContactDetailProps) {
  return (
    <motion.div
      variants={
        reducedMotion
          ? undefined
          : detailVariants
      }
      whileHover={
        reducedMotion
          ? undefined
          : {
              x: 4,
            }
      }
      transition={{
        duration: 0.3,
        ease: easing,
      }}
      className="group flex items-center gap-4"
    >
      {/* ======================================================================
          ICON
      ====================================================================== */}

      <motion.div
        whileHover={
          reducedMotion
            ? undefined
            : {
                scale: 1.05,
              }
        }
        transition={{
          duration: 0.3,
          ease: easing,
        }}
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          border
          border-slate-900/[0.08]
          bg-white
          shadow-[0_8px_24px_rgba(15,23,42,0.04)]
          transition-all
          duration-300

          group-hover:border-cyan-500/20
          group-hover:bg-cyan-50

          dark:border-white/[0.08]
          dark:bg-white/[0.025]
          dark:shadow-none
          dark:group-hover:border-cyan-400/20
          dark:group-hover:bg-cyan-400/[0.05]
        "
      >
        <span
          className="
            text-cyan-600

            dark:text-cyan-300
          "
        >
          {icon}
        </span>
      </motion.div>

      {/* ======================================================================
          TEXT
      ====================================================================== */}

      <div>
        <p
          className="
            text-xs
            uppercase
            tracking-wider
            text-slate-500

            dark:text-slate-600
          "
        >
          {label}
        </p>

        <p
          className={`
            mt-1
            text-sm
            ${valueClassName}
          `}
        >
          {value}
        </p>
      </div>
    </motion.div>
  );
}