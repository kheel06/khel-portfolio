"use client";

import { useLayoutEffect, useRef } from "react";

import {
  ArrowUpRight,
  Code2,
  Database,
  Layers3,
  ShieldCheck,
} from "lucide-react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

const capabilities = [
  {
    icon: Code2,
    title: "FRONTEND",
    description:
      "Modern interfaces focused on responsive layouts, usability, accessibility, and performance.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
  {
    icon: Layers3,
    title: "APPLICATIONS",
    description:
      "Structured applications designed around maintainable components, reusable logic, and clean architecture.",
    technologies: [
      "Next.js",
      "APIs",
      "Firebase",
      "Git",
    ],
  },
  {
    icon: Database,
    title: "DATA",
    description:
      "Practical data solutions with an emphasis on reliable storage, validation, and predictable application behavior.",
    technologies: [
      "Firestore",
      "MySQL",
      "PostgreSQL",
    ],
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

export function About() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      /*
       * ==========================================================
       * ELEMENT REFERENCES
       * ==========================================================
       */

      const eyebrow = section.querySelector<HTMLElement>(
        "[data-about-eyebrow]",
      );

      const heading = section.querySelector<HTMLElement>(
        "[data-about-heading]",
      );

      const divider = section.querySelector<HTMLElement>(
        "[data-about-divider]",
      );

      const copy = gsap.utils.toArray<HTMLElement>(
        "[data-about-copy]",
        section,
      );

      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-about-card]",
        section,
      );

      const icons = gsap.utils.toArray<HTMLElement>(
        "[data-about-icon]",
        section,
      );

      const techGroups = gsap.utils.toArray<HTMLElement>(
        "[data-about-technologies]",
        section,
      );

      const techItems = gsap.utils.toArray<HTMLElement>(
        "[data-about-tech]",
        section,
      );

      const footers = gsap.utils.toArray<HTMLElement>(
        "[data-about-footer]",
        section,
      );

      const engineeringMarker =
        section.querySelector<HTMLElement>(
          "[data-about-engineering-marker]",
        );

      const cardAccents = gsap.utils.toArray<HTMLElement>(
        "[data-about-card-accent]",
        section,
      );

      const cardGlows = gsap.utils.toArray<HTMLElement>(
        "[data-about-card-glow]",
        section,
      );

      const ambientGlows = gsap.utils.toArray<HTMLElement>(
        "[data-about-ambient-glow]",
        section,
      );

      /*
       * ==========================================================
       * REDUCED MOTION
       * ==========================================================
       */

      if (prefersReducedMotion) {
        gsap.set(
          [
            eyebrow,
            heading,
            divider,
            engineeringMarker,
            ...copy,
            ...cards,
            ...icons,
            ...techItems,
            ...footers,
          ].filter(Boolean),
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            clearProps: "transform",
          },
        );

        gsap.set(cardAccents, {
          scaleX: 1,
        });

        gsap.set(cardGlows, {
          opacity: 0,
        });

        return;
      }

      /*
       * ==========================================================
       * INITIAL STATES
       *
       * Small movement = smoother.
       * Large movement = "sliding" feeling.
       * ==========================================================
       */

      gsap.set(eyebrow, {
        autoAlpha: 0,
        y: 10,
      });

      gsap.set(heading, {
        autoAlpha: 0,
        y: 18,
      });

      gsap.set(divider, {
        autoAlpha: 0,
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(copy, {
        autoAlpha: 0,
        y: 14,
      });

      gsap.set(engineeringMarker, {
        autoAlpha: 0,
        y: 8,
      });

      gsap.set(cards, {
        autoAlpha: 0,
        y: 22,
        scale: 0.985,
      });

      gsap.set(icons, {
        autoAlpha: 0,
        scale: 0.9,
        rotation: -3,
      });

      gsap.set(techItems, {
        autoAlpha: 0,
        y: 5,
      });

      gsap.set(footers, {
        autoAlpha: 0,
        y: 5,
      });

      gsap.set(cardAccents, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(cardGlows, {
        opacity: 0,
        scale: 0.9,
      });

      /*
       * ==========================================================
       * MASTER INTRO TIMELINE
       * ==========================================================
       */

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      intro
        /*
         * EYEBROW
         */
        .to(eyebrow, {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
        })

        /*
         * HEADING
         */
        .to(
          heading,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.2",
        )

        /*
         * DIVIDER
         */
        .to(
          divider,
          {
            autoAlpha: 1,
            scaleX: 1,
            duration: 0.55,
            ease: "power2.out",
          },
          "-=0.3",
        )

        /*
         * BODY COPY
         */
        .to(
          copy,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
          },
          "-=0.2",
        )

        /*
         * ENGINEERING MARKER
         */
        .to(
          engineeringMarker,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
          },
          "-=0.2",
        )

        /*
         * CARDS
         */
        .to(
          cards,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.11,
            ease: "power3.out",
          },
          "-=0.15",
        )

        /*
         * ICONS
         */
        .to(
          icons,
          {
            autoAlpha: 1,
            scale: 1,
            rotation: 0,
            duration: 0.45,
            stagger: 0.09,
            ease: "back.out(1.4)",
          },
          "-=0.5",
        )

        /*
         * TECHNOLOGY TAGS
         */
        .to(
          techItems,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.025,
            ease: "power2.out",
          },
          "-=0.25",
        )

        /*
         * FOOTERS
         */
        .to(
          footers,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.06,
            ease: "power2.out",
          },
          "-=0.2",
        );

      /*
       * ==========================================================
       * CARD INTERACTIONS
       * ==========================================================
       */

      cards.forEach((card) => {
        const icon = card.querySelector<HTMLElement>(
          "[data-about-icon]",
        );

        const accent = card.querySelector<HTMLElement>(
          "[data-about-card-accent]",
        );

        const glow = card.querySelector<HTMLElement>(
          "[data-about-card-glow]",
        );

        const tech = gsap.utils.toArray<HTMLElement>(
          "[data-about-tech]",
          card,
        );

        const footer = card.querySelector<HTMLElement>(
          "[data-about-footer]",
        );

        const enter = () => {
          /*
           * Card lift
           */
          gsap.to(card, {
            y: -5,
            duration: 0.32,
            ease: "power2.out",
            overwrite: "auto",
          });

          /*
           * Icon response
           */
          if (icon) {
            gsap.to(icon, {
              scale: 1.06,
              rotate: 1.5,
              duration: 0.28,
              ease: "power2.out",
              overwrite: "auto",
            });
          }

          /*
           * Top cyan accent
           */
          if (accent) {
            gsap.to(accent, {
              scaleX: 1,
              duration: 0.4,
              ease: "power3.out",
              overwrite: "auto",
            });
          }

          /*
           * Subtle glow
           */
          if (glow) {
            gsap.to(glow, {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          }

          /*
           * Technology tags
           */
          if (tech.length) {
            gsap.to(tech, {
              y: -1,
              duration: 0.22,
              stagger: 0.025,
              ease: "power2.out",
              overwrite: "auto",
            });
          }

          /*
           * Footer
           */
          if (footer) {
            gsap.to(footer, {
              opacity: 0.92,
              duration: 0.22,
              overwrite: "auto",
            });
          }
        };

        const leave = () => {
          /*
           * Card
           */
          gsap.to(card, {
            y: 0,
            duration: 0.38,
            ease: "power2.out",
            overwrite: "auto",
          });

          /*
           * Icon
           */
          if (icon) {
            gsap.to(icon, {
              scale: 1,
              rotate: 0,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            });
          }

          /*
           * Accent
           */
          if (accent) {
            gsap.to(accent, {
              scaleX: 0,
              duration: 0.35,
              ease: "power2.inOut",
              overwrite: "auto",
            });
          }

          /*
           * Glow
           */
          if (glow) {
            gsap.to(glow, {
              opacity: 0,
              scale: 0.92,
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
          }

          /*
           * Technology tags
           */
          if (tech.length) {
            gsap.to(tech, {
              y: 0,
              duration: 0.25,
              stagger: 0.018,
              ease: "power2.out",
              overwrite: "auto",
            });
          }

          /*
           * Footer
           */
          if (footer) {
            gsap.to(footer, {
              opacity: 1,
              duration: 0.22,
              overwrite: "auto",
            });
          }
        };

        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);
      });

      /*
       * ==========================================================
       * TECHNOLOGY CHIP MICRO INTERACTION
       * ==========================================================
       */

      techGroups.forEach((group) => {
        const chips = gsap.utils.toArray<HTMLElement>(
          "[data-about-tech]",
          group,
        );

        chips.forEach((chip) => {
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

          chip.addEventListener("mouseenter", enter);
          chip.addEventListener("mouseleave", leave);
        });
      });

      /*
       * ==========================================================
       * AMBIENT BACKGROUND MOTION
       *
       * Extremely slow so it does not compete with content.
       * ==========================================================
       */

      ambientGlows.forEach((glow, index) => {
        gsap.to(glow, {
          x: index % 2 === 0 ? 18 : -16,
          y: index % 2 === 0 ? -14 : 16,
          duration: 10 + index * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      /*
       * ==========================================================
       * SCROLLTRIGGER REFRESH
       * ==========================================================
       */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
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
          AMBIENT BACKGROUND
      ====================================================== */}

      <div
        data-about-ambient-glow
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
          will-change-transform
          dark:bg-cyan-400/[0.035]
        "
      />

      <div
        data-about-ambient-glow
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
          will-change-transform
          dark:bg-purple-500/[0.025]
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
              INTRO
          ================================================== */}

          <div className="relative">
            {/* Section label */}

            <p
              data-about-eyebrow
              className="
                font-mono
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-cyan-500
                opacity-0
                dark:text-cyan-400
              "
            >
              01 — Profile
            </p>

            {/* Heading */}

            <h2
              data-about-heading
              className="
                mt-5
                max-w-md
                text-4xl
                font-bold
                leading-[1.05]
                tracking-[-0.035em]
                text-[var(--foreground)]
                opacity-0
                sm:text-5xl
              "
            >
              I BUILD ACROSS THE ENTIRE STACK.
            </h2>

            {/* Animated divider */}

            <div
              data-about-divider
              className="
                mt-8
                h-px
                w-16
                origin-left
                scale-x-0
                bg-cyan-500/50
                opacity-0
                dark:bg-cyan-400/40
              "
            />

            {/* First paragraph */}

            <p
              data-about-copy
              className="
                mt-8
                max-w-md
                text-sm
                leading-7
                text-[var(--muted)]
                opacity-0
                sm:text-base
              "
            >
              I enjoy turning ideas and real-world requirements into
              dependable software. My approach combines thoughtful
              interface design with practical engineering and scalable
              application structure.
            </p>

            {/* Second paragraph */}

            <p
              data-about-copy
              className="
                mt-5
                max-w-md
                text-sm
                leading-7
                text-[var(--muted)]
                opacity-0
                sm:text-base
              "
            >
              From the first interface component to data and deployment, I
              focus on building products that are understandable, useful,
              and built to evolve.
            </p>

            {/* Engineering marker */}

            <div
              data-about-engineering-marker
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
                opacity-0
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

              <span>
                Engineering with intent
              </span>
            </div>
          </div>

          {/* =================================================
              CAPABILITY CARDS
          ================================================== */}

          <div
            className="
              grid
              gap-3
              sm:grid-cols-2
            "
          >
            {capabilities.map(
              (capability, index) => {
                const Icon = capability.icon;

                return (
                  <article
                    key={capability.title}
                    data-about-card
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-2xl
                      border
                      border-[var(--border)]
                      bg-[var(--surface)]
                      p-6
                      opacity-0
                      shadow-sm
                      will-change-transform
                      transition-[border-color,background-color]
                      duration-300
                      hover:border-cyan-500/20
                      hover:bg-cyan-500/[0.025]
                      dark:hover:border-cyan-400/20
                      dark:hover:bg-cyan-400/[0.025]
                    "
                  >
                    {/* =================================================
                        TOP ACCENT
                    ================================================== */}

                    <div
                      data-about-card-accent
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        left-0
                        top-0
                        h-px
                        w-full
                        origin-left
                        scale-x-0
                        bg-gradient-to-r
                        from-cyan-400
                        to-transparent
                      "
                    />

                    {/* =================================================
                        SUBTLE GLOW
                    ================================================== */}

                    <div
                      data-about-card-glow
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        -right-16
                        -top-16
                        h-32
                        w-32
                        rounded-full
                        bg-cyan-400/[0.045]
                        opacity-0
                        blur-3xl
                        will-change-transform
                      "
                    />

                    <div className="relative">
                      {/* =================================================
                          CARD HEADER
                      ================================================== */}

                      <div
                        className="
                          flex
                          items-start
                          justify-between
                        "
                      >
                        <div
                          data-about-icon
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
                            will-change-transform
                            dark:bg-[var(--surface-light)]
                          "
                        >
                          <Icon
                            size={19}
                            strokeWidth={1.8}
                            className="
                              text-cyan-500
                              dark:text-cyan-400
                            "
                          />
                        </div>

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
                          TITLE
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

                      {/* =================================================
                          DESCRIPTION
                      ================================================== */}

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
                          TECHNOLOGIES
                      ================================================== */}

                      <div
                        data-about-technologies
                        className="
                          relative
                          mt-6
                          flex
                          flex-wrap
                          gap-2
                        "
                      >
                        {capability.technologies.map(
                          (technology) => (
                            <span
                              key={technology}
                              data-about-tech
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
                                will-change-transform
                                transition-[border-color,color]
                                duration-200
                                group-hover:border-cyan-500/[0.14]
                                group-hover:text-[var(--foreground)]
                                dark:group-hover:border-cyan-400/[0.14]
                              "
                            >
                              {technology}
                            </span>
                          ),
                        )}
                      </div>

                      {/* =================================================
                          FOOTER
                      ================================================== */}

                      <div
                        data-about-footer
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
                    </div>
                  </article>
                );
              },
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
