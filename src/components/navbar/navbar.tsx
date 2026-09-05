"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "@teispace/next-themes";

/* =========================================================
   NAVIGATION
========================================================= */

const navigation = [
  { label: "Profile", href: "#profile" },
  { label: "Experience", href: "#experience" },
  { label: "Technology", href: "#technology" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

/* =========================================================
   THEME TOGGLE
========================================================= */

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /*
   * Prevent hydration mismatch.
   */
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="
          flex h-9 w-9 items-center justify-center
          rounded-lg
          border border-slate-900/[0.08]
          bg-slate-900/[0.025]
          text-slate-500
          dark:border-white/[0.08]
          dark:bg-white/[0.025]
          dark:text-slate-400
        "
      >
        <Sun size={15} />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      title={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      className="
        group relative
        flex h-9 w-9
        items-center justify-center
        overflow-hidden
        rounded-lg
        border
        border-slate-900/[0.08]
        bg-slate-900/[0.025]
        text-slate-500
        transition-all duration-300

        hover:-translate-y-0.5
        hover:border-cyan-500/30
        hover:bg-cyan-500/[0.06]
        hover:text-cyan-600

        dark:border-white/[0.08]
        dark:bg-white/[0.025]
        dark:text-slate-400
        dark:hover:border-cyan-400/30
        dark:hover:bg-cyan-400/[0.06]
        dark:hover:text-cyan-300
      "
    >
      <AnimatePresence
        mode="wait"
        initial={false}
      >
        {isDark ? (
          <motion.span
            key="moon"
            initial={{
              opacity: 0,
              rotate: -90,
              scale: 0.7,
            }}
            animate={{
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              rotate: 90,
              scale: 0.7,
            }}
            transition={{
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10"
          >
            <Moon size={15} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{
              opacity: 0,
              rotate: 90,
              scale: 0.7,
            }}
            animate={{
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              rotate: -90,
              scale: 0.7,
            }}
            transition={{
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10"
          >
            <Sun size={15} />
          </motion.span>
        )}
      </AnimatePresence>

      {/* Hover glow */}
      <span
        className="
          pointer-events-none
          absolute inset-0
          rounded-lg
          bg-cyan-400/[0.08]
          opacity-0
          blur-md
          transition-opacity duration-300
          group-hover:opacity-100
        "
      />
    </button>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const closeMenu = () => {
    setOpen(false);
  };

  /* =======================================================
     SCROLL + ACTIVE SECTION
  ======================================================= */

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 30);

        const sections = navigation
          .map((item) => {
            const element = document.querySelector(
              item.href
            );

            if (!element) {
              return null;
            }

            const rect =
              element.getBoundingClientRect();

            return {
              id: item.href,
              top: rect.top,
            };
          })
          .filter(Boolean) as {
          id: string;
          top: number;
        }[];

        /*
         * Determine which section has crossed
         * the navbar threshold.
         */
        const visibleSection = sections
          .filter((section) => section.top <= 180)
          .sort((a, b) => b.top - a.top)[0];

        if (visibleSection) {
          setActiveSection(visibleSection.id);
        } else {
          setActiveSection("");
        }

        ticking = false;
      });

      ticking = true;
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* =======================================================
     MOBILE BODY LOCK
  ======================================================= */

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* =======================================================
     CLOSE MOBILE MENU ON DESKTOP
  ======================================================= */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* ===================================================
          NAVBAR BACKDROP
      ==================================================== */}

      <div
        className={`
          transition-all duration-500

          ${
            scrolled
              ? `
                bg-white/80
                shadow-[0_10px_40px_rgba(15,23,42,0.08)]
                backdrop-blur-2xl

                dark:bg-[#070b14]/85
                dark:shadow-[0_10px_40px_rgba(0,0,0,0.25)]
              `
              : `
                bg-white/45
                backdrop-blur-md

                dark:bg-[#070b14]/35
              `
          }
        `}
      >
        <nav
          className={`
            container-khel
            relative
            flex h-[72px]
            items-center
            justify-between
            border-b
            transition-all duration-500

            ${
              scrolled
                ? `
                  border-slate-900/[0.08]
                  dark:border-white/[0.07]
                `
                : `
                  border-slate-900/[0.045]
                  dark:border-white/[0.035]
                `
            }
          `}
        >
          {/* =================================================
              LOGO
          ================================================== */}

          <a
            href="#hero"
            aria-label="KHEL home"
            onClick={closeMenu}
            className="
              group
              flex shrink-0
              items-center
              gap-3
            "
          >
            {/* Emblem */}

            <div
              className="
                relative
                flex h-9 w-9
                items-center justify-center
              "
            >
              {/* Hover glow */}

              <div
                className="
                  absolute inset-0
                  rounded-lg
                  bg-cyan-400/[0.06]
                  opacity-0
                  blur-xl
                  transition-opacity duration-300
                  group-hover:opacity-100
                "
              />

              <img
                src="/brand/khel-emblem.png"
                alt=""
                aria-hidden="true"
                className="
                  relative
                  h-9 w-9
                  object-contain
                  transition-transform duration-300
                  group-hover:scale-105
                "
              />
            </div>

            {/* Wordmark */}

            <div className="hidden sm:block">
              <span
                className="
                  block
                  text-[14px]
                  font-semibold
                  tracking-[0.20em]
                  text-slate-900

                  dark:text-white
                "
              >
                KHEL
              </span>

              <span
                className="
                  mt-0.5
                  block
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.22em]
                  text-slate-500

                  dark:text-slate-500
                "
              >
                Software Engineer
              </span>
            </div>
          </a>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================== */}

          <div
            className="
              absolute
              left-1/2
              hidden
              -translate-x-1/2
              items-center
              gap-7
              md:flex
            "
          >
            {navigation.map((item) => {
              const isActive =
                activeSection === item.href;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="
                    group
                    relative
                    py-2
                    font-mono
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.14em]
                  "
                >
                  <span
                    className={`
                      transition-colors duration-200

                      ${
                        isActive
                          ? `
                            text-slate-950
                            dark:text-white
                          `
                          : `
                            text-slate-500
                            group-hover:text-slate-900

                            dark:text-slate-500
                            dark:group-hover:text-slate-200
                          `
                      }
                    `}
                  >
                    {item.label}
                  </span>

                  {/* Active indicator */}

                  <span
                    className={`
                      absolute
                      -bottom-1
                      left-1/2
                      h-px
                      -translate-x-1/2
                      bg-cyan-500
                      transition-all duration-300

                      dark:bg-cyan-400

                      ${
                        isActive
                          ? "w-5 opacity-100"
                          : `
                            w-0
                            opacity-0
                            group-hover:w-3
                            group-hover:opacity-70
                          `
                      }
                    `}
                  />
                </a>
              );
            })}
          </div>

          {/* =================================================
              DESKTOP ACTIONS
          ================================================== */}

          <div
            className="
              hidden
              items-center
              gap-3
              md:flex
            "
          >
            <ThemeToggle />

            <a
              href="#contact"
              className="
                group
                flex items-center gap-2
                rounded-lg
                border
                border-cyan-500/20
                bg-cyan-500/[0.045]
                px-4 py-2.5
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.13em]
                text-cyan-700
                transition-all duration-300

                hover:-translate-y-0.5
                hover:border-cyan-500/40
                hover:bg-cyan-500/[0.08]
                hover:text-cyan-800

                dark:border-cyan-400/20
                dark:bg-cyan-400/[0.045]
                dark:text-cyan-200
                dark:hover:border-cyan-400/45
                dark:hover:bg-cyan-400/[0.08]
                dark:hover:text-cyan-100
              "
            >
              <span>Let's Talk</span>

              <ArrowUpRight
                size={13}
                className="
                  transition-transform duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </a>
          </div>

          {/* =================================================
              MOBILE ACTIONS
          ================================================== */}

          <div
            className="
              flex
              items-center
              gap-2
              md:hidden
            "
          >
            <ThemeToggle />

            <button
              type="button"
              aria-label={
                open
                  ? "Close menu"
                  : "Open menu"
              }
              aria-expanded={open}
              onClick={() =>
                setOpen((value) => !value)
              }
              className="
                relative z-50
                flex h-10 w-10
                items-center justify-center
                rounded-lg
                border
                border-slate-900/[0.08]
                bg-slate-900/[0.025]
                text-slate-600
                transition-all duration-300

                hover:border-cyan-500/30
                hover:bg-cyan-500/[0.05]
                hover:text-slate-950

                dark:border-white/[0.08]
                dark:bg-white/[0.025]
                dark:text-slate-300
                dark:hover:border-cyan-400/30
                dark:hover:bg-cyan-400/[0.05]
                dark:hover:text-white
              "
            >
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                {open ? (
                  <motion.span
                    key="close"
                    initial={{
                      opacity: 0,
                      rotate: -90,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: 90,
                      scale: 0.8,
                    }}
                    transition={{
                      duration: 0.15,
                    }}
                  >
                    <X size={19} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{
                      opacity: 0,
                      rotate: 90,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: -90,
                      scale: 0.8,
                    }}
                    transition={{
                      duration: 0.15,
                    }}
                  >
                    <Menu size={19} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* =================================================
              MOBILE MENU
          ================================================== */}

          <AnimatePresence>
            {open && (
              <>
                {/* Backdrop */}

                <motion.button
                  type="button"
                  aria-label="Close navigation"
                  onClick={closeMenu}
                  className="
                    fixed
                    inset-0
                    top-[72px]
                    cursor-default
                    bg-slate-950/20
                    backdrop-blur-sm

                    dark:bg-black/40

                    md:hidden
                  "
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                />

                {/* Menu panel */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: -12,
                    scale: 0.98,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -12,
                    scale: 0.98,
                  }}
                  transition={{
                    duration: 0.22,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    absolute
                    left-0
                    right-0
                    top-[calc(100%+1px)]

                    border-x
                    border-b

                    border-slate-900/[0.08]
                    bg-white/95

                    p-3

                    shadow-[0_20px_60px_rgba(15,23,42,0.12)]
                    backdrop-blur-2xl

                    dark:border-white/[0.07]
                    dark:bg-[#080d18]/95
                    dark:shadow-2xl

                    md:hidden
                  "
                >
                  {/* =========================================
                      MOBILE BRAND HEADER
                  ========================================== */}

                  <div
                    className="
                      mb-2
                      flex items-center gap-3
                      border-b
                      border-slate-900/[0.06]
                      px-3 pb-3

                      dark:border-white/[0.05]
                    "
                  >
                    <img
                      src="/brand/khel-emblem.png"
                      alt=""
                      aria-hidden="true"
                      className="
                        h-7 w-7
                        object-contain
                      "
                    />

                    <div>
                      <div
                        className="
                          text-xs
                          font-semibold
                          tracking-[0.18em]
                          text-slate-950

                          dark:text-white
                        "
                      >
                        KHEL
                      </div>

                      <div
                        className="
                          font-mono
                          text-[7px]
                          uppercase
                          tracking-[0.18em]
                          text-slate-500

                          dark:text-slate-600
                        "
                      >
                        Software Engineer
                      </div>
                    </div>
                  </div>

                  {/* =========================================
                      MOBILE LINKS
                  ========================================== */}

                  <div className="space-y-1">
                    {navigation.map(
                      (item, index) => {
                        const isActive =
                          activeSection ===
                          item.href;

                        return (
                          <motion.a
                            key={item.href}
                            href={item.href}
                            onClick={closeMenu}
                            initial={{
                              opacity: 0,
                              x: -8,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            transition={{
                              delay:
                                index * 0.035,
                              duration: 0.2,
                            }}
                            className={`
                              group
                              flex
                              items-center
                              justify-between
                              rounded-lg
                              px-4 py-3
                              transition-all duration-200

                              ${
                                isActive
                                  ? `
                                    bg-cyan-500/[0.07]
                                    text-cyan-700

                                    dark:bg-cyan-400/[0.06]
                                    dark:text-cyan-300
                                  `
                                  : `
                                    text-slate-500
                                    hover:bg-slate-900/[0.035]
                                    hover:text-slate-950

                                    dark:text-slate-400
                                    dark:hover:bg-white/[0.035]
                                    dark:hover:text-white
                                  `
                              }
                            `}
                          >
                            <span
                              className="
                                font-mono
                                text-[10px]
                                uppercase
                                tracking-[0.14em]
                              "
                            >
                              {item.label}
                            </span>

                            <span
                              className={`
                                h-1 w-1
                                rounded-full
                                transition-all

                                ${
                                  isActive
                                    ? `
                                      bg-cyan-500
                                      shadow-[0_0_10px_rgba(6,182,212,0.8)]

                                      dark:bg-cyan-400
                                    `
                                    : `
                                      bg-slate-300
                                      group-hover:bg-slate-500

                                      dark:bg-slate-700
                                      dark:group-hover:bg-slate-400
                                    `
                                }
                              `}
                            />
                          </motion.a>
                        );
                      }
                    )}
                  </div>

                  {/* =========================================
                      MOBILE CTA
                  ========================================== */}

                  <motion.a
                    href="#contact"
                    onClick={closeMenu}
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.18,
                      duration: 0.2,
                    }}
                    className="
                      mt-3
                      flex
                      items-center
                      justify-between
                      rounded-lg
                      bg-slate-950
                      px-4 py-3
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-white
                      transition-all duration-300

                      hover:bg-slate-800

                      dark:bg-white
                      dark:text-slate-950
                      dark:hover:bg-slate-100
                    "
                  >
                    <span>Let's Talk</span>

                    <ArrowUpRight
                      size={15}
                    />
                  </motion.a>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
}