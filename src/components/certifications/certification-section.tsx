"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowUpRight,
  Award,
} from "lucide-react";

import {
  gsap,
  ScrollTrigger,
} from "@/lib/gsap";

import {
  certifications,
  type Certification,
} from "@/data/certifications";

import { CertificationDialog } from "./certification-dialog";

export function CertificationSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [selectedCertification, setSelectedCertification] =
    useState<Certification | null>(null);

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
        "[data-cert-eyebrow]",
      );

      const eyebrowLine = section.querySelector<HTMLElement>(
        "[data-cert-eyebrow-line]",
      );

      const heading = section.querySelector<HTMLElement>(
        "[data-cert-heading]",
      );

      const description = section.querySelector<HTMLElement>(
        "[data-cert-description]",
      );

      const grid = section.querySelector<HTMLElement>(
        "[data-cert-grid]",
      );

      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-cert-card]",
        section,
      );

      const icons = gsap.utils.toArray<HTMLElement>(
        "[data-cert-icon]",
        section,
      );

      const arrows = gsap.utils.toArray<HTMLElement>(
        "[data-cert-arrow]",
        section,
      );

      const issuers = gsap.utils.toArray<HTMLElement>(
        "[data-cert-issuer]",
        section,
      );

      const titles = gsap.utils.toArray<HTMLElement>(
        "[data-cert-title]",
        section,
      );

      const dates = gsap.utils.toArray<HTMLElement>(
        "[data-cert-date]",
        section,
      );

      const cardDescriptions = gsap.utils.toArray<HTMLElement>(
        "[data-cert-description]",
        section,
      );

      const skillGroups = gsap.utils.toArray<HTMLElement>(
        "[data-cert-skills]",
        section,
      );

      const skills = gsap.utils.toArray<HTMLElement>(
        "[data-cert-skill]",
        section,
      );

      const cardAccents = gsap.utils.toArray<HTMLElement>(
        "[data-cert-accent]",
        section,
      );

      const cardGlows = gsap.utils.toArray<HTMLElement>(
        "[data-cert-glow]",
        section,
      );

      const bottomMarker = section.querySelector<HTMLElement>(
        "[data-cert-bottom-marker]",
      );

      const bottomLine = section.querySelector<HTMLElement>(
        "[data-cert-bottom-line]",
      );

      const ambientGlows = gsap.utils.toArray<HTMLElement>(
        "[data-cert-ambient]",
        section,
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
            bottomMarker,
            bottomLine,
            ...cards,
            ...icons,
            ...arrows,
            ...issuers,
            ...titles,
            ...dates,
            ...cardDescriptions,
            ...skills,
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

        gsap.set(cardAccents, {
          scaleX: 1,
        });

        gsap.set(cardGlows, {
          opacity: 0,
        });

        return;
      }

      /* ==========================================================
         RESPONSIVE VALUES
      ========================================================== */

      const mobile = window.matchMedia(
        "(max-width: 639px)",
      ).matches;

      const tablet = window.matchMedia(
        "(min-width: 640px) and (max-width: 1023px)",
      ).matches;

      const values = mobile
        ? {
            headingY: 14,
            copyY: 10,
            cardY: 18,
            cardScale: 0.99,
            cardDuration: 0.52,
            cardStagger: 0.075,
            skillStagger: 0.012,
            trigger: "top 88%",
          }
        : tablet
          ? {
              headingY: 18,
              copyY: 12,
              cardY: 22,
              cardScale: 0.99,
              cardDuration: 0.58,
              cardStagger: 0.085,
              skillStagger: 0.015,
              trigger: "top 82%",
            }
          : {
              headingY: 22,
              copyY: 15,
              cardY: 26,
              cardScale: 0.985,
              cardDuration: 0.64,
              cardStagger: 0.1,
              skillStagger: 0.018,
              trigger: "top 80%",
            };

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
        y: values.headingY,
      });

      gsap.set(description, {
        autoAlpha: 0,
        y: values.copyY,
      });

      gsap.set(grid, {
        autoAlpha: 0,
        y: 14,
      });

      gsap.set(cards, {
        autoAlpha: 0,
        y: values.cardY,
        scale: values.cardScale,
      });

      gsap.set(icons, {
        autoAlpha: 0,
        scale: 0.88,
        rotation: -4,
      });

      gsap.set(arrows, {
        autoAlpha: 0,
        x: 4,
        y: -4,
      });

      gsap.set(issuers, {
        autoAlpha: 0,
        y: 5,
      });

      gsap.set(titles, {
        autoAlpha: 0,
        y: 7,
      });

      gsap.set(dates, {
        autoAlpha: 0,
        y: 5,
      });

      gsap.set(cardDescriptions, {
        autoAlpha: 0,
        y: 6,
      });

      gsap.set(skills, {
        autoAlpha: 0,
        y: 5,
      });

      gsap.set(cardAccents, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(cardGlows, {
        opacity: 0,
        scale: 0.92,
      });

      gsap.set(bottomMarker, {
        autoAlpha: 0,
        y: 6,
      });

      gsap.set(bottomLine, {
        autoAlpha: 0,
        scaleX: 0,
        transformOrigin: "left center",
      });

      /* ==========================================================
         MAIN ENTRANCE TIMELINE
      ========================================================== */

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },

        scrollTrigger: {
          trigger: section,
          start: values.trigger,
          once: true,
          invalidateOnRefresh: true,
        },
      });

      intro

        /* ========================================================
           EYEBROW
        ======================================================== */

        .to(eyebrow, {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
        })

        .to(
          eyebrowLine,
          {
            autoAlpha: 1,
            scaleX: 1,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.2",
        )

        /* ========================================================
           HEADING
        ======================================================== */

        .to(
          heading,
          {
            autoAlpha: 1,
            y: 0,
            duration: mobile ? 0.55 : 0.7,
          },
          "-=0.2",
        )

        /* ========================================================
           DESCRIPTION
        ======================================================== */

        .to(
          description,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
          },
          "-=0.3",
        )

        /* ========================================================
           GRID
        ======================================================== */

        .to(
          grid,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
          },
          "-=0.12",
        )

        /* ========================================================
           CERTIFICATION CARDS
        ======================================================== */

        .to(
          cards,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: values.cardDuration,
            stagger: values.cardStagger,
            ease: "power3.out",
          },
          "-=0.08",
        )

        /* ========================================================
           AWARD ICONS
        ======================================================== */

        .to(
          icons,
          {
            autoAlpha: 1,
            scale: 1,
            rotation: 0,
            duration: 0.38,
            stagger: 0.07,
            ease: "back.out(1.35)",
          },
          "-=0.42",
        )

        /* ========================================================
           ISSUERS
        ======================================================== */

        .to(
          issuers,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.035,
          },
          "-=0.25",
        )

        /* ========================================================
           TITLES
        ======================================================== */

        .to(
          titles,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.34,
            stagger: 0.04,
          },
          "-=0.2",
        )

        /* ========================================================
           DATES
        ======================================================== */

        .to(
          dates,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.035,
          },
          "-=0.2",
        )

        /* ========================================================
           DESCRIPTIONS
        ======================================================== */

        .to(
          cardDescriptions,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.32,
            stagger: 0.03,
          },
          "-=0.18",
        )

        /* ========================================================
           SKILLS
        ======================================================== */

        .to(
          skills,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.28,
            stagger: values.skillStagger,
            ease: "power2.out",
          },
          "-=0.16",
        )

        /* ========================================================
           ARROWS
        ======================================================== */

        .to(
          arrows,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: 0.3,
            stagger: 0.04,
            ease: "power2.out",
          },
          "-=0.2",
        )

        /* ========================================================
           CARD TOP ACCENTS
        ======================================================== */

        .to(
          cardAccents,
          {
            scaleX: 1,
            duration: 0.4,
            stagger: 0.055,
            ease: "power3.out",
          },
          "-=0.12",
        )

        /* ========================================================
           BOTTOM MARKER
        ======================================================== */

        .to(
          bottomMarker,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
          },
          "-=0.15",
        )

        .to(
          bottomLine,
          {
            autoAlpha: 1,
            scaleX: 1,
            duration: 0.4,
            ease: "power3.out",
          },
          "-=0.18",
        );

      /* ==========================================================
         CARD HOVER
      ========================================================== */

      if (!isTouchDevice) {
        cards.forEach((card) => {
          const icon =
            card.querySelector<HTMLElement>(
              "[data-cert-icon]",
            );

          const arrow =
            card.querySelector<HTMLElement>(
              "[data-cert-arrow]",
            );

          const accent =
            card.querySelector<HTMLElement>(
              "[data-cert-accent]",
            );

          const glow =
            card.querySelector<HTMLElement>(
              "[data-cert-glow]",
            );

          const title =
            card.querySelector<HTMLElement>(
              "[data-cert-title]",
            );

          const skillsInCard =
            gsap.utils.toArray<HTMLElement>(
              "[data-cert-skill]",
              card,
            );

          const enter = () => {
            gsap.to(card, {
              y: -5,
              duration: 0.3,
              ease: "power2.out",
              overwrite: "auto",
            });

            if (icon) {
              gsap.to(icon, {
                scale: 1.06,
                rotation: -2,
                duration: 0.25,
                ease: "power2.out",
                overwrite: "auto",
              });
            }

            if (arrow) {
              gsap.to(arrow, {
                x: 3,
                y: -3,
                duration: 0.25,
                ease: "power2.out",
                overwrite: "auto",
              });
            }

            if (accent) {
              gsap.to(accent, {
                scaleX: 1,
                duration: 0.38,
                ease: "power3.out",
                overwrite: "auto",
              });
            }

            if (glow) {
              gsap.to(glow, {
                opacity: 1,
                scale: 1,
                duration: 0.45,
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

            if (skillsInCard.length) {
              gsap.to(skillsInCard, {
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
              duration: 0.38,
              ease: "power2.out",
              overwrite: "auto",
            });

            if (icon) {
              gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out",
                overwrite: "auto",
              });
            }

            if (arrow) {
              gsap.to(arrow, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
                overwrite: "auto",
              });
            }

            if (accent) {
              gsap.to(accent, {
                scaleX: 0,
                duration: 0.32,
                ease: "power2.inOut",
                overwrite: "auto",
              });
            }

            if (glow) {
              gsap.to(glow, {
                opacity: 0,
                scale: 0.92,
                duration: 0.38,
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

            if (skillsInCard.length) {
              gsap.to(skillsInCard, {
                y: 0,
                duration: 0.2,
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
           SKILL HOVER
        ======================================================== */

        skills.forEach((skill) => {
          const enter = () => {
            gsap.to(skill, {
              y: -2,
              duration: 0.18,
              ease: "power2.out",
              overwrite: "auto",
            });
          };

          const leave = () => {
            gsap.to(skill, {
              y: 0,
              duration: 0.2,
              ease: "power2.out",
              overwrite: "auto",
            });
          };

          skill.addEventListener(
            "mouseenter",
            enter,
          );

          skill.addEventListener(
            "mouseleave",
            leave,
          );

          cleanup.push(() => {
            skill.removeEventListener(
              "mouseenter",
              enter,
            );

            skill.removeEventListener(
              "mouseleave",
              leave,
            );
          });
        });
      }

      /* ==========================================================
         AMBIENT BACKGROUND
      ========================================================== */

      if (!isTouchDevice) {
        ambientGlows.forEach((glow, index) => {
          gsap.to(glow, {
            x: index % 2 === 0 ? 12 : -10,
            y: index % 2 === 0 ? -10 : 8,
            duration: 11 + index * 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }

      /* ==========================================================
         SCROLLTRIGGER REFRESH
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
    <>
      {/* ========================================================
          CERTIFICATION SECTION
      ======================================================== */}

      <section
        ref={sectionRef}
        id="certifications"
        className="
          relative
          overflow-hidden
          border-b
          border-slate-900/[0.08]
          bg-slate-50
          py-20
          text-slate-950
          transition-colors
          duration-300
          sm:py-28
          lg:py-32
          dark:border-white/[0.06]
          dark:bg-[#070b14]
          dark:text-white
        "
      >
        {/* ======================================================
            ATMOSPHERIC BACKGROUND
        ====================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
          "
        >
          {/* CYAN GLOW */}

          <div
            data-cert-ambient
            className="
              absolute
              right-[8%]
              top-[18%]
              h-56
              w-56
              rounded-full
              bg-cyan-500/[0.04]
              blur-3xl
              will-change-transform
              dark:bg-cyan-500/[0.025]
              sm:right-[12%]
              sm:h-72
              sm:w-72
            "
          />

          {/* BLUE GLOW */}

          <div
            data-cert-ambient
            className="
              absolute
              bottom-[8%]
              left-[3%]
              h-52
              w-52
              rounded-full
              bg-blue-600/[0.03]
              blur-3xl
              will-change-transform
              dark:bg-blue-600/[0.02]
              sm:h-64
              sm:w-64
            "
          />

          {/* ==================================================
              LIGHT GRID
          ================================================== */}

          <div
            className="
              absolute
              inset-0
              opacity-[0.03]
              dark:hidden
            "
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(15, 23, 42, 0.3) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(15, 23, 42, 0.3) 1px,
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

          {/* ==================================================
              DARK GRID
          ================================================== */}

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

          {/* ==================================================
              TOP VIGNETTE
          ================================================== */}

          <div
            className="
              absolute
              inset-x-0
              top-0
              h-24
              bg-gradient-to-b
              from-white
              to-transparent
              dark:from-[#070b14]
              dark:to-transparent
              sm:h-40
            "
          />

          {/* ==================================================
              BOTTOM VIGNETTE
          ================================================== */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-24
              bg-gradient-to-t
              from-slate-50
              to-transparent
              dark:from-[#070b14]
              dark:to-transparent
              sm:h-40
            "
          />
        </div>

        {/* ======================================================
            CONTENT
        ====================================================== */}

        <div className="container-khel relative z-10">
          {/* ====================================================
              SECTION HEADING
          ==================================================== */}

          <div
            className="
              max-w-3xl
            "
          >
            {/* LABEL */}

            <div className="flex items-center gap-3">
              <span
                data-cert-eyebrow-line
                aria-hidden="true"
                className="
                  h-px
                  w-5
                  origin-left
                  scale-x-0
                  bg-cyan-600/70
                  dark:bg-cyan-400/70
                  sm:w-8
                "
              />

              <p
                data-cert-eyebrow
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-cyan-700
                  sm:text-[11px]
                  sm:tracking-[0.25em]
                  dark:text-cyan-400
                "
              >
                06 — Certifications
              </p>
            </div>

            {/* HEADING */}

            <h2
              data-cert-heading
              className="
                mt-4
                text-[2.25rem]
                font-bold
                leading-[1]
                tracking-[-0.045em]
                text-slate-950
                sm:mt-5
                sm:text-5xl
                dark:text-white
              "
            >
              VERIFIED KNOWLEDGE.
            </h2>

            {/* DESCRIPTION */}

            <p
              data-cert-description
              className="
                mt-5
                max-w-2xl
                text-[13px]
                leading-6
                text-slate-600
                sm:mt-6
                sm:text-base
                sm:leading-7
                dark:text-slate-400
              "
            >
              Certifications and continuous learning that
              support my practical software engineering work.
            </p>
          </div>

          {/* ====================================================
              CERTIFICATION GRID
          ==================================================== */}

          <div
            data-cert-grid
            className="
              mt-10
              grid
              gap-4
              opacity-0
              sm:mt-14
              sm:gap-5
              md:grid-cols-2
            "
          >
            {certifications.map(
              (certification) => (
                <CertificationCard
                  key={certification.id}
                  certification={certification}
                  onOpen={setSelectedCertification}
                />
              ),
            )}
          </div>

          {/* ====================================================
              BOTTOM TECHNICAL MARKER
          ==================================================== */}

          <div
            className="
              mt-10
              border-t
              border-slate-900/[0.08]
              pt-5
              dark:border-white/[0.06]
              sm:mt-14
              sm:pt-6
            "
          >
            <div
              data-cert-bottom-marker
              className="
                flex
                items-center
                justify-between
                gap-4
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    shrink-0
                    rounded-full
                    bg-cyan-600
                    shadow-[0_0_10px_rgba(8,145,178,0.4)]
                    dark:bg-cyan-400
                  "
                />

                <span
                  className="
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.16em]
                    text-slate-500
                    sm:text-[10px]
                    sm:tracking-[0.2em]
                    dark:text-slate-500
                  "
                >
                  Continuous Learning
                </span>
              </div>

              <span
                className="
                  text-right
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.16em]
                  text-slate-500
                  sm:text-[10px]
                  sm:tracking-[0.2em]
                "
              >
                {certifications.length
                  .toString()
                  .padStart(2, "0")}{" "}
                Credentials
              </span>
            </div>

            <div
              data-cert-bottom-line
              aria-hidden="true"
              className="
                mt-4
                h-px
                max-w-24
                bg-cyan-500/50
                dark:bg-cyan-400/40
              "
            />
          </div>
        </div>
      </section>

      {/* ========================================================
          CERTIFICATION DIALOG
      ======================================================== */}

      <CertificationDialog
        certification={selectedCertification}
        onClose={() =>
          setSelectedCertification(null)
        }
      />
    </>
  );
}

/* =================================================================
   CERTIFICATION CARD
================================================================= */

interface CertificationCardProps {
  certification: Certification;
  onOpen: (
    certification: Certification,
  ) => void;
}

function CertificationCard({
  certification,
  onOpen,
}: CertificationCardProps) {
  return (
    <button
      type="button"
      data-cert-card
      onClick={() => onOpen(certification)}
      className="
        group
        relative
        block
        w-full
        min-w-0
        text-left
        opacity-0
        outline-none
        focus-visible:ring-2
        focus-visible:ring-cyan-500/40
        focus-visible:ring-offset-2
        focus-visible:ring-offset-slate-50
        dark:focus-visible:ring-cyan-400/40
        dark:focus-visible:ring-offset-[#070b14]
      "
    >
      <div
        className="
          relative
          h-full
          overflow-hidden
          rounded-xl
          border
          border-slate-900/[0.08]
          bg-white
          p-5
          shadow-[0_10px_36px_rgba(15,23,42,0.045)]
          transition-[border-color,background-color,box-shadow]
          duration-300
          group-hover:border-cyan-500/25
          group-hover:bg-slate-50
          group-hover:shadow-[0_18px_50px_rgba(15,23,42,0.075)]
          dark:border-white/[0.08]
          dark:bg-white/[0.025]
          dark:shadow-none
          dark:group-hover:border-cyan-400/25
          dark:group-hover:bg-white/[0.035]
          sm:rounded-2xl
          sm:p-6
        "
      >
        {/* ======================================================
            TOP ACCENT
        ====================================================== */}

        <div
          data-cert-accent
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
            via-cyan-500/25
            to-transparent
            dark:from-cyan-400/60
          "
        />

        {/* ======================================================
            HOVER GLOW
        ====================================================== */}

        <div
          data-cert-glow
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-16
            -top-16
            h-32
            w-32
            rounded-full
            bg-cyan-500/[0.04]
            opacity-0
            blur-3xl
            will-change-transform
            dark:bg-cyan-400/[0.045]
          "
        />

        <div className="relative z-10">
          {/* ====================================================
              TOP ROW
          ==================================================== */}

          <div
            className="
              flex
              items-start
              justify-between
              gap-4
            "
          >
            {/* ICON */}

            <div
              data-cert-icon
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-cyan-500/20
                bg-cyan-500/[0.07]
                will-change-transform
                dark:border-cyan-400/20
                dark:bg-cyan-400/[0.08]
                sm:h-11
                sm:w-11
              "
            >
              <Award
                size={18}
                strokeWidth={1.8}
                className="
                  text-cyan-600
                  dark:text-cyan-300
                  sm:h-5
                  sm:w-5
                "
              />
            </div>

            {/* ARROW */}

            <div
              data-cert-arrow
              className="
                flex
                shrink-0
                will-change-transform
              "
            >
              <ArrowUpRight
                size={17}
                className="
                  text-slate-400
                  transition-colors
                  duration-300
                  group-hover:text-cyan-600
                  dark:text-slate-500
                  dark:group-hover:text-cyan-300
                "
              />
            </div>
          </div>

          {/* ====================================================
              CONTENT
          ==================================================== */}

          <div className="mt-7">
            {/* ISSUER */}

            <p
              data-cert-issuer
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.17em]
                text-slate-500
                sm:text-[11px]
                dark:text-slate-500
              "
            >
              {certification.issuer}
            </p>

            {/* TITLE */}

            <h3
              data-cert-title
              className="
                mt-2
                text-[1.05rem]
                font-semibold
                leading-snug
                tracking-[-0.02em]
                text-slate-950
                sm:text-xl
                dark:text-white
              "
            >
              {certification.title}
            </h3>

            {/* DATE */}

            <p
              data-cert-date
              className="
                mt-2
                text-[11px]
                text-slate-500
                sm:text-xs
                dark:text-slate-500
              "
            >
              {certification.date}
            </p>

            {/* DESCRIPTION */}

            <p
              data-cert-description
              className="
                mt-4
                line-clamp-3
                text-[13px]
                leading-6
                text-slate-600
                sm:text-sm
                sm:leading-6
                dark:text-slate-400
              "
            >
              {certification.description}
            </p>
          </div>

          {/* ====================================================
              SKILLS
          ==================================================== */}

          <div
            data-cert-skills
            className="
              mt-5
              flex
              flex-wrap
              gap-1.5
              sm:mt-6
              sm:gap-2
            "
          >
            {certification.skills.map(
              (skill) => (
                <span
                  key={skill}
                  data-cert-skill
                  className="
                    inline-flex
                    max-w-full
                    items-center
                    rounded-full
                    border
                    border-slate-900/[0.08]
                    bg-slate-50
                    px-2.5
                    py-1
                    text-[9px]
                    leading-none
                    text-slate-500
                    will-change-transform
                    transition-[border-color,color,background-color]
                    duration-200
                    group-hover:border-slate-900/[0.12]
                    group-hover:text-slate-700
                    dark:border-white/[0.07]
                    dark:bg-white/[0.025]
                    dark:text-slate-400
                    dark:group-hover:border-white/[0.1]
                    dark:group-hover:text-slate-300
                    sm:px-3
                    sm:py-1.5
                    sm:text-[10px]
                  "
                >
                  {skill}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
