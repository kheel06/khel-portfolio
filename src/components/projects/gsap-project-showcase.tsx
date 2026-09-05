

import { useLayoutEffect, useRef } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

type Project = {
  title: string;
  description: string;
  image: string;
  technologies: string[];
};

type GSAPProjectShowcaseProps = {
  projects: Project[];
};

export function GSAPProjectShowcase({
  projects,
}: GSAPProjectShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section || projects.length === 0) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const cards = gsap.utils.toArray<HTMLElement>(
        ".gsap-project",
        section,
      );

      if (!cards.length) return;

      /*
       * ==========================================================
       * ACCESSIBILITY
       * ==========================================================
       */

      if (prefersReducedMotion) {
        gsap.set(
          section.querySelectorAll(
            [
              ".gsap-project",
              ".gsap-project-image-wrap",
              ".gsap-project-image",
              ".gsap-project-content",
              ".gsap-project-number",
              ".gsap-project-title",
              ".gsap-project-description",
              ".gsap-project-tech",
              ".gsap-project-tech-item",
            ].join(", "),
          ),
          {
            clearProps: "all",
          },
        );

        return;
      }

      /*
       * ==========================================================
       * PROJECT ANIMATION SYSTEM
       *
       * The animation has three layers:
       *
       * 1. ENTER:
       *    Card + image + typography reveal as the project
       *    approaches the viewport.
       *
       * 2. DEPTH:
       *    Image has a slow opposing parallax while the whole
       *    project travels through the viewport.
       *
       * 3. INTERACTION:
       *    Hover adds a restrained lift/zoom without changing
       *    layout dimensions.
       * ==========================================================
       */

      cards.forEach((card, index) => {
        const imageWrap = card.querySelector<HTMLElement>(
          ".gsap-project-image-wrap",
        );

        const image = card.querySelector<HTMLElement>(
          ".gsap-project-image",
        );

        const content = card.querySelector<HTMLElement>(
          ".gsap-project-content",
        );

        const number = card.querySelector<HTMLElement>(
          ".gsap-project-number",
        );

        const title = card.querySelector<HTMLElement>(
          ".gsap-project-title",
        );

        const description = card.querySelector<HTMLElement>(
          ".gsap-project-description",
        );

        const tech = card.querySelector<HTMLElement>(
          ".gsap-project-tech",
        );

        const techItems = gsap.utils.toArray<HTMLElement>(
          ".gsap-project-tech-item",
          card,
        );

        const isEven = index % 2 === 0;
        const direction = isEven ? -1 : 1;

        /*
         * ----------------------------------------------------------
         * INITIAL STATES
         * ----------------------------------------------------------
         */

        gsap.set(card, {
          opacity: 0,
          y: 54,
          scale: 0.975,
          rotateX: 1.5,
          transformOrigin: "50% 50%",
          transformPerspective: 1200,
          force3D: true,
        });

        if (imageWrap) {
          gsap.set(imageWrap, {
            clipPath: isEven
              ? "inset(0 100% 0 0 round 1rem)"
              : "inset(0 0 0 100% round 1rem)",
            x: direction * 28,
            y: 20,
            rotate: direction * -0.45,
            force3D: true,
          });
        }

        if (image) {
          gsap.set(image, {
            scale: 1.14,
            xPercent: direction * -2,
            yPercent: 1,
            force3D: true,
          });
        }

        gsap.set(content, {
          opacity: 0,
          x: direction * -34,
          y: 24,
          force3D: true,
        });

        gsap.set(number, {
          opacity: 0,
          x: direction * -16,
          y: 10,
        });

        gsap.set(title, {
          opacity: 0,
          y: 20,
          clipPath: "inset(0 0 100% 0)",
        });

        gsap.set(description, {
          opacity: 0,
          y: 18,
        });

        gsap.set(tech, {
          opacity: 0,
          y: 14,
        });

        gsap.set(techItems, {
          opacity: 0,
          y: 10,
          scale: 0.96,
        });

        /*
         * ----------------------------------------------------------
         * MAIN SCROLL REVEAL
         * ----------------------------------------------------------
         */

        const reveal = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            end: "top 46%",
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
        });

        if (imageWrap) {
          reveal.to(
            imageWrap,
            {
              clipPath: "inset(0% 0% 0% 0% round 1rem)",
              x: 0,
              y: 0,
              rotate: 0,
              duration: 0.95,
              ease: "power3.inOut",
            },
            0,
          );
        }

        if (image) {
          reveal.to(
            image,
            {
              scale: 1,
              xPercent: 0,
              yPercent: 0,
              duration: 1.05,
              ease: "power2.out",
            },
            0,
          );
        }

        reveal
          .to(
            card,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              duration: 0.75,
              ease: "power3.out",
            },
            0,
          )
          .to(
            content,
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.68,
              ease: "power3.out",
            },
            0.12,
          )
          .to(
            number,
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.36,
              ease: "power3.out",
            },
            0.23,
          )
          .to(
            title,
            {
              opacity: 1,
              y: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: 0.58,
              ease: "power4.out",
            },
            0.29,
          )
          .to(
            description,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
            },
            0.4,
          )
          .to(
            tech,
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              ease: "power3.out",
            },
            0.48,
          )
          .to(
            techItems,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.38,
              stagger: 0.055,
              ease: "back.out(1.22)",
            },
            0.5,
          );

        /*
         * ----------------------------------------------------------
         * IMAGE PARALLAX
         * ----------------------------------------------------------
         */

        if (image) {
          gsap.fromTo(
            image,
            {
              yPercent: -3,
            },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.35,
                invalidateOnRefresh: true,
              },
            },
          );
        }

        /*
         * ----------------------------------------------------------
         * VIEWPORT FOCUS
         *
         * The project gently reaches full opacity/scale as it
         * approaches the visual center. This is deliberately tiny.
         * ----------------------------------------------------------
         */

        gsap.fromTo(
          card,
          {
            opacity: 0.86,
          },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 78%",
              end: "center 48%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );

        /*
         * ----------------------------------------------------------
         * HOVER ENHANCEMENT
         * ----------------------------------------------------------
         */

        const handleEnter = () => {
          if (imageWrap) {
            gsap.to(imageWrap, {
              y: -5,
              duration: 0.35,
              ease: "power3.out",
              overwrite: "auto",
            });
          }

          if (image) {
            gsap.to(image, {
              scale: 1.035,
              duration: 0.65,
              ease: "power3.out",
              overwrite: "auto",
            });
          }

          gsap.to(techItems, {
            y: -2,
            duration: 0.25,
            stagger: 0.025,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const handleLeave = () => {
          if (imageWrap) {
            gsap.to(imageWrap, {
              y: 0,
              duration: 0.42,
              ease: "power3.out",
              overwrite: "auto",
            });
          }

          if (image) {
            gsap.to(image, {
              scale: 1,
              duration: 0.7,
              ease: "power3.out",
              overwrite: "auto",
            });
          }

          gsap.to(techItems, {
            y: 0,
            duration: 0.3,
            stagger: 0.02,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        card.addEventListener("mouseenter", handleEnter);
        card.addEventListener("mouseleave", handleLeave);

        ctx.add(() => {
          card.removeEventListener("mouseenter", handleEnter);
          card.removeEventListener("mouseleave", handleLeave);
        });
      });

      /*
       * ----------------------------------------------------------
       * LAYOUT REFRESH
       * ----------------------------------------------------------
       */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => ctx.revert();
  }, [projects.length]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      aria-label="Selected projects"
    >
      <div
        className="
          mx-auto
          max-w-7xl
          space-y-28
          px-6
          sm:space-y-36
          lg:space-y-44
          lg:px-8
        "
      >
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <article
              key={`${project.title}-${index}`}
              className="
                gsap-project
                relative
                grid
                min-h-[70vh]
                items-center
                gap-10
                lg:grid-cols-2
                lg:gap-16
              "
            >
              {/* =====================================================
                  IMAGE
              ====================================================== */}

              <div
                className={`
                  gsap-project-image-wrap
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-slate-900
                  shadow-[0_24px_80px_rgba(2,8,23,0.16)]
                  will-change-transform
                  ${
                    isEven
                      ? "lg:order-1"
                      : "lg:order-2"
                  }
                `}
              >
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-10
                    rounded-2xl
                    ring-1
                    ring-inset
                    ring-white/[0.08]
                  "
                />

                <div
                  className="
                    aspect-[16/10]
                    overflow-hidden
                  "
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                    className="
                      gsap-project-image
                      h-full
                      w-full
                      object-cover
                      will-change-transform
                    "
                  />
                </div>

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0
                    h-24
                    bg-gradient-to-t
                    from-black/20
                    to-transparent
                    opacity-70
                  "
                />
              </div>

              {/* =====================================================
                  CONTENT
              ====================================================== */}

              <div
                className={`
                  gsap-project-content
                  relative
                  will-change-transform
                  ${
                    isEven
                      ? "lg:order-2"
                      : "lg:order-1"
                  }
                `}
              >
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -left-6
                    top-2
                    h-16
                    w-16
                    rounded-full
                    bg-cyan-400/[0.06]
                    blur-2xl
                  "
                />

                <div className="relative z-10">
                  <div
                    className="
                      gsap-project-number
                      mb-5
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-cyan-400
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <h3
                    className="
                      gsap-project-title
                      text-3xl
                      font-semibold
                      tracking-[-0.035em]
                      text-white
                      sm:text-4xl
                    "
                  >
                    {project.title}
                  </h3>

                  <p
                    className="
                      gsap-project-description
                      mt-5
                      max-w-xl
                      text-base
                      leading-7
                      text-slate-400
                    "
                  >
                    {project.description}
                  </p>

                  <div
                    className="
                      gsap-project-tech
                      mt-7
                      flex
                      flex-wrap
                      gap-2
                    "
                  >
                    {project.technologies.map(
                      (technology) => (
                        <span
                          key={technology}
                          className="
                            gsap-project-tech-item
                            rounded-full
                            border
                            border-cyan-400/10
                            bg-cyan-400/[0.04]
                            px-3
                            py-1.5
                            text-xs
                            text-slate-400
                            transition-colors
                            duration-300
                            hover:border-cyan-400/25
                            hover:text-cyan-300
                          "
                        >
                          {technology}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
