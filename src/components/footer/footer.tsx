"use client";

import type { ReactNode } from "react";
import { ArrowUp, Mail } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const navigation = [
  { label: "Profile", href: "#profile" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Technology", href: "#technology" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const easing = [0.22, 1, 0.36, 1] as const;

export function Footer() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer
      className="
        relative
        overflow-hidden
        border-t
        border-slate-900/[0.08]
        bg-slate-50
        transition-colors
        duration-300
        dark:border-white/[0.06]
        dark:bg-[#050811]
      "
    >
      {/* ============================================================
          SUBTLE FOOTER ATMOSPHERE
      ============================================================ */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* Cyan atmosphere */}

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: [0.025, 0.05, 0.025],
                  scale: [1, 1.04, 1],
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
            left-[20%]
            top-0
            h-56
            w-56
            -translate-y-1/2
            rounded-full
            bg-cyan-500
            blur-3xl
            dark:bg-cyan-500
          "
        />

        {/* Blue atmosphere */}

        <div
          className="
            absolute
            bottom-0
            right-[8%]
            h-48
            w-48
            rounded-full
            bg-blue-500/[0.025]
            blur-3xl
            dark:bg-blue-600/[0.02]
          "
        />

        {/* Light-mode technical grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            dark:opacity-0
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(15, 23, 42, 0.35) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(15, 23, 42, 0.35) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "64px 64px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 80%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black, transparent 80%)",
          }}
        />

        {/* Dark-mode technical grid */}

        <div
          className="
            absolute
            inset-0
            opacity-0
            dark:opacity-[0.015]
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
              "linear-gradient(to bottom, black, transparent 80%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black, transparent 80%)",
          }}
        />
      </div>

      <div className="container-khel relative py-12">
        {/* ============================================================
            MAIN FOOTER
        ============================================================ */}

        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          {/* ==========================================================
              BRAND
          =========================================================== */}

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 15,
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
              duration: 0.6,
              ease: easing,
            }}
          >
            <motion.a
              href="#"
              aria-label="Back to top"
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -2,
                    }
              }
              className="
                group
                inline-flex
                items-center
                gap-3
              "
            >
              {/* K emblem */}

              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 1.04,
                      }
                }
                transition={{
                  duration: 0.3,
                  ease: easing,
                }}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-cyan-500/20
                  bg-cyan-500/[0.08]
                  transition-colors
                  duration-300
                  group-hover:border-cyan-500/35
                  group-hover:bg-cyan-500/[0.12]
                  dark:border-cyan-400/20
                  dark:bg-cyan-400/10
                  dark:group-hover:border-cyan-400/35
                  dark:group-hover:bg-cyan-400/[0.14]
                "
              >
                <span
                  className="
                    text-sm
                    font-bold
                    text-cyan-600
                    dark:text-cyan-300
                  "
                >
                  K
                </span>
              </motion.div>

              <span
                className="
                  text-sm
                  font-semibold
                  tracking-[0.2em]
                  text-slate-950
                  dark:text-white
                "
              >
                KHEL
              </span>
            </motion.a>

            <p
              className="
                mt-4
                max-w-sm
                text-sm
                leading-6
                text-slate-500
                dark:text-slate-500
              "
            >
              Software engineer building reliable, modern digital
              products with thoughtful engineering.
            </p>
          </motion.div>

          {/* ==========================================================
              NAVIGATION
          =========================================================== */}

          <motion.nav
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 15,
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
              duration: 0.6,
              delay: 0.08,
              ease: easing,
            }}
            aria-label="Footer navigation"
            className="
              flex
              max-w-xl
              flex-wrap
              gap-x-6
              gap-y-3
              text-sm
              text-slate-500
              dark:text-slate-500
            "
          >
            {navigation.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -1,
                      }
                }
                className="
                  group
                  relative
                  transition-colors
                  duration-200
                  hover:text-slate-950
                  dark:hover:text-white
                "
              >
                {item.label}

                {/* Hover underline */}

                <span
                  className="
                    absolute
                    -bottom-1
                    left-0
                    h-px
                    w-full
                    origin-left
                    scale-x-0
                    bg-cyan-500/70
                    transition-transform
                    duration-300
                    group-hover:scale-x-100
                    dark:bg-cyan-400/60
                  "
                />
              </motion.a>
            ))}
          </motion.nav>
        </div>

        {/* ============================================================
            DIVIDER
        ============================================================ */}

        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  scaleX: 0,
                }
          }
          whileInView={{
            scaleX: 1,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: easing,
          }}
          className="
            my-8
            h-px
            origin-left
            bg-slate-900/[0.08]
            dark:bg-white/[0.06]
          "
        />

        {/* ============================================================
            BOTTOM ROW
        ============================================================ */}

        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                }
          }
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease: easing,
          }}
          className="
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* Copyright */}

          <p
            className="
              text-xs
              text-slate-500
              dark:text-slate-600
            "
          >
            © {new Date().getFullYear()} KHEL. All rights reserved.
          </p>

          {/* Social / actions */}

          <div className="flex items-center gap-3">
            {/* GitHub */}

            <SocialButton
              href="https://github.com/kheel06"
              label="GitHub"
              external
              reducedMotion={shouldReduceMotion}
            >
              <GitHubIcon size={16} />
            </SocialButton>

            {/* LinkedIn */}

            <SocialButton
              href="https://www.linkedin.com/"
              label="LinkedIn"
              external
              reducedMotion={shouldReduceMotion}
            >
              <LinkedInIcon size={16} />
            </SocialButton>

            {/* Email */}

            <SocialButton
              href="mailto:your@email.com"
              label="Email"
              reducedMotion={shouldReduceMotion}
            >
              <Mail size={16} />
            </SocialButton>

            {/* Back to top */}

            <motion.a
              href="#"
              aria-label="Back to top"
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -3,
                    }
              }
              whileTap={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 0.94,
                    }
              }
              className="
                ml-2
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                border
                border-cyan-500/20
                bg-cyan-500/[0.06]
                text-cyan-600
                transition-colors
                duration-300
                hover:border-cyan-500/40
                hover:bg-cyan-500/10
                dark:border-cyan-400/20
                dark:bg-cyan-400/[0.06]
                dark:text-cyan-300
                dark:hover:border-cyan-400/40
                dark:hover:bg-cyan-400/10
              "
            >
              <ArrowUp size={16} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

/* ================================================================
   SOCIAL BUTTON
================================================================ */

interface SocialButtonProps {
  href: string;
  label: string;
  children: ReactNode;
  external?: boolean;
  reducedMotion: boolean | null;
}

function SocialButton({
  href,
  label,
  children,
  external = false,
  reducedMotion,
}: SocialButtonProps) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={label}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -2,
            }
      }
      whileTap={
        reducedMotion
          ? undefined
          : {
              scale: 0.94,
            }
      }
      className="
        group
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-lg
        border
        border-slate-900/[0.08]
        text-slate-500
        transition-all
        duration-300
        hover:border-slate-900/[0.16]
        hover:text-slate-950
        dark:border-white/[0.07]
        dark:text-slate-500
        dark:hover:border-white/[0.15]
        dark:hover:text-white
      "
    >
      {children}
    </motion.a>
  );
}

/* ================================================================
   GITHUB BRAND ICON
================================================================ */

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-1.02-.014-1.85-2.782.604-3.369-1.185-3.369-1.185-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.071 1.532 1.031 1.532 1.031.892 1.529 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.338-2.221-.253-4.555-1.111-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.202 2.394.1 2.647.64.698 1.028 1.591 1.028 2.682 0 3.841-2.338 4.687-4.566 4.935.359.309.678.917.678 1.849 0 1.335-.012 2.411-.012 2.738 0 .268.18.58.688.481A10.002 10.002 0 0 0 22 12C22 6.477 17.523 2 12 2Z" />
    </svg>
  );
}

/* ================================================================
   LINKEDIN BRAND ICON
================================================================ */

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.606 0 4.271 2.373 4.271 5.467v6.274ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM3.555 20.452h3.558V9H3.555v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}