"use client";

import { useLayoutEffect, useRef } from "react";
import {
  Braces,
  Database,
  GitBranch,
  Layers,
  Server,
  Wrench,
} from "lucide-react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

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
    technologies: [
      "Node.js",
      "REST APIs",
      "Firebase",
      "Firestore",
    ],
  },
  {
    title: "DATABASE",
    icon: Database,
    description: "Data storage and management",
    technologies: [
      "Firestore",
      "MySQL",
      "PostgreSQL",
      "SQL",
    ],
  },
  {
    title: "LANGUAGES",
    icon: Braces,
    description: "Core development languages",
    technologies: [
      "TypeScript",
      "JavaScript",
      "Python",
      "PHP",
      "SQL",
    ],
  },
  {
    title: "TOOLS",
    icon: Wrench,
    description: "Development workflow",
    technologies: [
      "Git",
      "GitHub",
      "VS Code",
      "Vercel",
      "npm",
    ],
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

export function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const cleanup: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const isTouchDevice =
        window.matchMedia("(hover: none)").matches ||
        "ontouchstart" in window;

      /* ==========================================================
         ELEMENTS
      ========================================================== */

      const eyebrow = section.querySelector<HTMLElement>(
        "[data-skills-eyebrow]",
      );

      const eyebrowLine = section.querySelector<HTMLElement>(
        "[data-skills-eyebrow-line]",
      );

      const heading = section.querySelector<HTMLElement>(
        "[data-skills-heading]",
      );

      const description = section.querySelector<HTMLElement>(
        "[data-skills-description]",
      );

      const grid = section.querySelector<HTMLElement>(
        "[data-skills-grid]",
      );

      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-skill-card]",
        section,
      );

      const icons = gsap.utils.toArray<HTMLElement>(
        "[data-skill-icon]",
        section,
      );

      const indices = gsap.utils.toArray<HTMLElement>(
        "[data-skill-index]",
        section,
      );

      const titles = gsap.utils.toArray<HTMLElement>(
        "[data-skill-title]",
        section,
      );

      const descriptions = gsap.utils.toArray<HTMLElement>(
        "[data-skill-description]",
        section,
      );

      const techItems = gsap.utils.toArray<HTMLElement>(
        "[data-skill-tech]",
        section,
      );

      const accents = gsap.utils.toArray<HTMLElement>(
        "[data-skill-accent]",
        section,
      );

      const glows = gsap.utils.toArray<HTMLElement>(
        "[data-skill-glow]",
        section,
      );

      const indicator = section.querySelector<HTMLElement>(
        "[data-skills-indicator]",
      );

      const ambient = section.querySelector<HTMLElement>(
        "[data-skills-ambient]",
      );

      /* ==========================================================
         REDUCED MOTION
      ========================================================== */

      if (prefersReducedMotion) {
        gsap.set(
          [
            eyebrow,
            eyebrowLine,
            heading,
            description,
            grid,
            indicator,
            ...cards,
            ...icons,
            ...indices,
            ...titles,
            ...descriptions,
            ...techItems,
          ].filter(Boolean),
          {
            autoAlpha: 1,
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            clearProps: "transform",
          },
        );

        gsap.set(accents, {
          scaleX: 1,
        });

        return;
      }

      /* ==========================================================
         MOBILE DETECTION
      ========================================================== */

      const mobileQuery = window.matchMedia(
        "(max-width: 639px)",
      );

      const getResponsiveValues = () => {
        if (mobileQuery.matches) {
          return {
            headingY: 14,
            copyY: 10,
            cardY: 18,
            cardScale: 0.99,
            cardDuration: 0.52,
            cardStagger: 0.07,
            techStagger: 0.015,
          };
        }

        if (window.innerWidth < 1024) {
          return {
            headingY: 18,
            copyY: 12,
            cardY: 20,
            cardScale: 0.99,
            cardDuration: 0.58,
            cardStagger: 0.075,
            techStagger: 0.018,
          };
        }

        return {
          headingY: 22,
          copyY: 15,
          cardY: 24,
          cardScale: 0.985,
          cardDuration: 0.62,
          cardStagger: 0.08,
          techStagger: 0.02,
        };
      };

      const responsive = getResponsiveValues();

      /* ==========================================================
         INITIAL STATES
      ========================================================== */

      gsap.set(eyebrow, {
        autoAlpha: 0,
        y: 8,
      });

      gsap.set(eyebrowLine, {
        autoAlpha: 0,
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(heading, {
        autoAlpha: 0,
        y: responsive.headingY,
      });

      gsap.set(description, {
        autoAlpha: 0,
        y: responsive.copyY,
      });

      gsap.set(grid, {
        autoAlpha: 0,
        y: 14,
      });

      gsap.set(cards, {
        autoAlpha: 0,
        y: responsive.cardY,
        scale: responsive.cardScale,
      });

      gsap.set(icons, {
        autoAlpha: 0,
        scale: 0.9,
        rotation: -3,
      });

      gsap.set(indices, {
        autoAlpha: 0,
        y: 4,
      });

      gsap.set(titles, {
        autoAlpha: 0,
        y: 5,
      });

      gsap.set(descriptions, {
        autoAlpha: 0,
        y: 5,
      });

      gsap.set(techItems, {
        autoAlpha: 0,
        y: 4,
      });

      gsap.set(accents, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(glows, {
        opacity: 0,
        scale: 0.94,
      });

      gsap.set(indicator, {
        autoAlpha: 0,
        y: 6,
      });

      /* ==========================================================
         MAIN ENTRANCE
      ========================================================== */

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
        scrollTrigger: {
          trigger: section,
          start: mobileQuery.matches
            ? "top 88%"
            : "top 80%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      intro
        /* eyebrow */
        .to(eyebrow, {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
        })

        /* eyebrow line */
        .to(
          eyebrowLine,
          {
            autoAlpha: 1,
            scaleX: 1,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.22",
        )

        /* heading */
        .to(
          heading,
          {
            autoAlpha: 1,
            y: 0,
            duration: mobileQuery.matches ? 0.55 : 0.7,
          },
          "-=0.22",
        )

        /* description */
        .to(
          description,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.48,
          },
          "-=0.3",
        )

        /* grid */
        .to(
          grid,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
          },
          "-=0.15",
        )

        /* cards */
        .to(
          cards,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: responsive.cardDuration,
            stagger: responsive.cardStagger,
            ease: "power3.out",
          },
          "-=0.1",
        )

        /* icons */
        .to(
          icons,
          {
            autoAlpha: 1,
            scale: 1,
            rotation: 0,
            duration: 0.35,
            stagger: 0.055,
            ease: "back.out(1.35)",
          },
          "-=0.45",
        )

        /* indexes */
        .to(
          indices,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.28,
            stagger: 0.035,
          },
          "-=0.28",
        )

        /* titles */
        .to(
          titles,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.32,
            stagger: 0.03,
          },
          "-=0.18",
        )

        /* descriptions */
        .to(
          descriptions,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.025,
          },
          "-=0.18",
        )

        /* technology chips */
        .to(
          techItems,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.26,
            stagger: responsive.techStagger,
            ease: "power2.out",
          },
          "-=0.16",
        )

        /* accents */
        .to(
          accents,
          {
            scaleX: 1,
            duration: 0.4,
            stagger: 0.045,
          },
          "-=0.12",
        )

        /* bottom indicator */
        .to(
          indicator,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.32,
          },
          "-=0.12",
        );

      /* ==========================================================
         DESKTOP CARD HOVER
      ========================================================== */

      if (!isTouchDevice) {
        cards.forEach((card) => {
          const icon =
            card.querySelector<HTMLElement>(
              "[data-skill-icon]",
            );

          const accent =
            card.querySelector<HTMLElement>(
              "[data-skill-accent]",
            );

          const glow =
            card.querySelector<HTMLElement>(
              "[data-skill-glow]",
            );

          const title =
            card.querySelector<HTMLElement>(
              "[data-skill-title]",
            );

          const chips = gsap.utils.toArray<HTMLElement>(
            "[data-skill-tech]",
            card,
          );

          const enter = () => {
            gsap.to(card, {
              y: -4,
              duration: 0.28,
              ease: "power2.out",
              overwrite: "auto",
            });

            if (icon) {
              gsap.to(icon, {
                scale: 1.05,
                rotate: 1.5,
                duration: 0.24,
                ease: "power2.out",
                overwrite: "auto",
              });
            }

            if (accent) {
              gsap.to(accent, {
                scaleX: 1,
                duration: 0.35,
                ease: "power3.out",
                overwrite: "auto",
              });
            }

            if (glow) {
              gsap.to(glow, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto",
              });
            }

            if (title) {
              gsap.to(title, {
                x: 2,
                duration: 0.2,
                ease: "power2.out",
                overwrite: "auto",
              });
            }

            if (chips.length) {
              gsap.to(chips, {
                y: -1,
                duration: 0.18,
                stagger: 0.015,
                ease: "power2.out",
                overwrite: "auto",
              });
            }
          };

          const leave = () => {
            gsap.to(card, {
              y: 0,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            });

            if (icon) {
              gsap.to(icon, {
                scale: 1,
                rotate: 0,
                duration: 0.3,
                ease: "power2.out",
                overwrite: "auto",
              });
            }

            if (accent) {
              gsap.to(accent, {
                scaleX: 0,
                duration: 0.3,
                ease: "power2.inOut",
                overwrite: "auto",
              });
            }

            if (glow) {
              gsap.to(glow, {
                opacity: 0,
                scale: 0.94,
                duration: 0.35,
                ease: "power2.out",
                overwrite: "auto",
              });
            }

            if (title) {
              gsap.to(title, {
                x: 0,
                duration: 0.25,
                ease: "power2.out",
                overwrite: "auto",
              });
            }

            if (chips.length) {
              gsap.to(chips, {
                y: 0,
                duration: 0.22,
                stagger: 0.012,
                ease: "power2.out",
                overwrite: "auto",
              });
            }
          };

          card.addEventListener(
            "mouseenter",
            enter,
          );

          card.addEventListener(
            "mouseleave",
            leave,
          );

          cleanup.push(() => {
            card.removeEventListener(
              "mouseenter",
              enter,
            );

            card.removeEventListener(
              "mouseleave",
              leave,
            );
          });
        });

        /* ========================================================
           TECHNOLOGY CHIP HOVER
        ======================================================== */

        techItems.forEach((chip) => {
          const enter = () => {
            gsap.to(chip, {
              y: -2,
              duration: 0.18,
              ease: "power2.out",
              overwrite: "auto",
            });
          };

          const leave = () => {
            gsap.to(chip, {
              y: 0,
              duration: 0.2,
              ease: "power2.out",
              overwrite: "auto",
            });
          };

          chip.addEventListener(
            "mouseenter",
            enter,
          );

          chip.addEventListener(
            "mouseleave",
            leave,
          );

          cleanup.push(() => {
            chip.removeEventListener(
              "mouseenter",
              enter,
            );

            chip.removeEventListener(
              "mouseleave",
              leave,
            );
          });
        });
      }

      /* ==========================================================
         AMBIENT MOTION
      ========================================================== */

      if (
        ambient &&
        window.matchMedia(
          "(prefers-reduced-motion: no-preference)",
        ).matches
      ) {
        gsap.to(ambient, {
          x: mobileQuery.matches ? 8 : 16,
          y: mobileQuery.matches ? -6 : -12,
          duration: mobileQuery.matches ? 12 : 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      /* ==========================================================
         REFRESH
      ========================================================== */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      cleanup.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="technology"
      className="
        relative
        overflow-hidden
        border-b
        border-slate-900/[0.08]
        bg-[var(--background)]
        py-20
        text-[var(--foreground)]
        transition-colors
        duration-300
        dark:border-white/[0.06]
        sm:py-28
        lg:py-36
      "
    >
      {/* =====================================================
          AMBIENT GLOW
      ====================================================== */}

      <div
        data-skills-ambient
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[30%]
          h-[340px]
          w-[460px]
          -translate-x-1/2
          rounded-full
          bg-cyan-500/[0.014]
          blur-3xl
          will-change-transform
          dark:bg-cyan-400/[0.018]
          sm:h-[500px]
          sm:w-[700px]
        "
      />

      {/* =====================================================
          TECHNICAL GRID
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          technical-grid
          pointer-events-none
          absolute
          inset-0
          opacity-[0.08]
          dark:opacity-[0.18]
          sm:opacity-[0.12]
          sm:dark:opacity-[0.22]
        "
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="container-khel relative">
        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          className="
            flex
            flex-col
            justify-between
            gap-7
            md:flex-row
            md:items-end
            md:gap-8
          "
        >
          <div className="min-w-0">
            {/* SECTION LABEL */}

            <div className="flex items-center gap-3">
              <span
                data-skills-eyebrow-line
                aria-hidden="true"
                className="
                  h-px
                  w-5
                  origin-left
                  scale-x-0
                  bg-cyan-500/70
                  dark:bg-cyan-400/70
                  sm:w-6
                "
              />

              <p
                data-skills-eyebrow
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.24em]
                  text-cyan-600
                  dark:text-cyan-400
                  sm:text-[11px]
                  sm:tracking-[0.25em]
                "
              >
                04 — Technology
              </p>
            </div>

            {/* =================================================
                RESPONSIVE HEADING
            ================================================== */}

            <h2
              data-skills-heading
              className="
                mt-4
                max-w-[320px]
                text-[2.35rem]
                font-bold
                leading-[0.98]
                tracking-[-0.045em]
                text-[var(--foreground)]
                sm:mt-5
                sm:max-w-none
                sm:text-5xl
                lg:text-[3.5rem]
                lg:leading-[0.98]
              "
            >
              TOOLS I USE
              <br />
              TO BUILD PRODUCTS.
            </h2>
          </div>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <p
            data-skills-description
            className="
              max-w-md
              text-[13px]
              leading-6
              text-[var(--muted)]
              sm:text-sm
              sm:leading-7
            "
          >
            A practical technology stack selected around
            maintainability, developer experience, performance,
            and the needs of each project.
          </p>
        </div>

        {/* ===================================================
            TECHNOLOGY GRID
        =================================================== */}

        <div
          data-skills-grid
          className="
            mt-12
            grid
            grid-cols-1
            gap-px
            overflow-hidden
            rounded-xl
            border
            border-slate-900/[0.08]
            bg-slate-900/[0.08]
            shadow-[0_15px_50px_rgba(15,23,42,0.035)]
            sm:mt-16
            sm:grid-cols-2
            sm:rounded-2xl
            lg:grid-cols-3
            dark:border-white/[0.07]
            dark:bg-white/[0.07]
            dark:shadow-none
          "
        >
          {skillGroups.map((group, index) => {
            const Icon = group.icon;

            return (
              <article
                key={group.title}
                data-skill-card
                className="
                  group
                  relative
                  min-w-0
                  overflow-hidden
                  bg-white
                  p-5
                  opacity-0
                  will-change-transform
                  transition-colors
                  duration-300
                  hover:bg-slate-50
                  sm:p-7
                  dark:bg-[#070b14]
                  dark:hover:bg-[#0b1220]
                "
              >
                {/* =================================================
                    TOP ACCENT
                ================================================== */}

                <div
                  data-skill-accent
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    top-0
                    h-px
                    origin-left
                    scale-x-0
                    bg-gradient-to-r
                    from-cyan-500/70
                    via-cyan-500/20
                    to-transparent
                    dark:from-cyan-400/60
                  "
                />

                {/* =================================================
                    GLOW
                ================================================== */}

                <div
                  data-skill-glow
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    h-32
                    w-32
                    rounded-full
                    bg-cyan-500/[0.03]
                    opacity-0
                    blur-3xl
                    dark:bg-cyan-400/[0.04]
                  "
                />

                <div className="relative">
                  {/* =================================================
                      ICON + INDEX
                  ================================================== */}

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <div
                      data-skill-icon
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
                        bg-slate-50
                        will-change-transform
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
                        size={17}
                        strokeWidth={1.8}
                        className="
                          text-cyan-600
                          dark:text-cyan-400
                        "
                      />
                    </div>

                    <span
                      data-skill-index
                      className="
                        font-mono
                        text-[8px]
                        tracking-[0.15em]
                        text-slate-400
                        dark:text-slate-700
                        sm:text-[9px]
                      "
                    >
                      0{index + 1}
                    </span>
                  </div>

                  {/* =================================================
                      TITLE
                  ================================================== */}

                  <h3
                    data-skill-title
                    className="
                      mt-6
                      text-[11px]
                      font-semibold
                      tracking-[0.15em]
                      text-[var(--foreground)]
                      transition-colors
                      duration-300
                      group-hover:text-cyan-700
                      sm:mt-7
                      sm:text-xs
                      dark:group-hover:text-cyan-100
                    "
                  >
                    {group.title}
                  </h3>

                  {/* =================================================
                      DESCRIPTION
                  ================================================== */}

                  <p
                    data-skill-description
                    className="
                      mt-2
                      text-[11px]
                      leading-5
                      text-[var(--muted)]
                      sm:text-xs
                    "
                  >
                    {group.description}
                  </p>

                  {/* =================================================
                      TECHNOLOGIES
                  ================================================== */}

                  <div
                    className="
                      mt-5
                      flex
                      flex-wrap
                      gap-1.5
                      sm:mt-6
                      sm:gap-2
                    "
                  >
                    {group.technologies.map(
                      (technology) => (
                        <span
                          key={technology}
                          data-skill-tech
                          className="
                            inline-flex
                            max-w-full
                            items-center
                            rounded-md
                            border
                            border-slate-900/[0.08]
                            bg-slate-50
                            px-2
                            py-1.5
                            font-mono
                            text-[9px]
                            leading-none
                            text-slate-600
                            will-change-transform
                            transition-[border-color,color,background-color]
                            duration-200
                            group-hover:border-cyan-500/15
                            group-hover:text-slate-700
                            sm:px-2.5
                            sm:text-[10px]
                            dark:border-white/[0.06]
                            dark:bg-white/[0.025]
                            dark:text-slate-400
                            dark:group-hover:border-cyan-400/10
                            dark:group-hover:text-slate-300
                          "
                        >
                          {technology}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ===================================================
            BOTTOM INDICATOR
        =================================================== */}

        <div
          data-skills-indicator
          className="
            mt-5
            flex
            items-center
            justify-between
            gap-4
            sm:mt-6
          "
        >
          <span
            className="
              font-mono
              text-[8px]
              uppercase
              tracking-[0.16em]
              text-slate-400
              dark:text-slate-700
              sm:text-[9px]
              sm:tracking-[0.18em]
            "
          >
            Technology Stack
          </span>

          <span
            className="
              font-mono
              text-[8px]
              uppercase
              tracking-[0.16em]
              text-slate-400
              dark:text-slate-700
              sm:text-[9px]
              sm:tracking-[0.18em]
            "
          >
            {skillGroups.length
              .toString()
              .padStart(2, "0")}{" "}
            Categories
          </span>
        </div>
      </div>
    </section>
  );
}
