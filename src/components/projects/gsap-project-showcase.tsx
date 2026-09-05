"use client";

import {
  useLayoutEffect,
  useRef,
} from "react";

import {
  gsap,
  ScrollTrigger,
} from "@/lib/gsap";

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
  const sectionRef =
    useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const cards =
        gsap.utils.toArray<HTMLElement>(
          ".gsap-project"
        );

      cards.forEach((card) => {
        const image =
          card.querySelector(
            ".gsap-project-image"
          );

        const content =
          card.querySelector(
            ".gsap-project-content"
          );

        const number =
          card.querySelector(
            ".gsap-project-number"
          );

        const timeline =
          gsap.timeline({
            scrollTrigger: {
              trigger: card,

              start: "top 75%",
              end: "bottom 25%",

              scrub: 1,
            },
          });

        if (image) {
          timeline.fromTo(
            image,
            {
              scale: 1.08,
            },
            {
              scale: 1,
              ease: "none",
            },
            0
          );
        }

        if (content) {
          timeline.fromTo(
            content,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
            },
            0.1
          );
        }

        if (number) {
          timeline.fromTo(
            number,
            {
              opacity: 0,
              x: -20,
            },
            {
              opacity: 1,
              x: 0,
              ease: "power2.out",
            },
            0.15
          );
        }
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          space-y-32
          px-6
          lg:px-8
        "
      >
        {projects.map(
          (project, index) => (
            <article
              key={project.title}
              className="
                gsap-project
                relative
                grid
                min-h-[70vh]
                items-center
                gap-10

                lg:grid-cols-2
              "
            >
              {/* IMAGE */}

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-2xl

                  border
                  border-white/[0.08]

                  bg-slate-900
                "
              >
                <div
                  className="
                    aspect-[16/10]
                    overflow-hidden
                  "
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="
                      gsap-project-image

                      h-full
                      w-full

                      object-cover
                    "
                  />
                </div>
              </div>

              {/* CONTENT */}

              <div
                className="
                  gsap-project-content
                  relative
                "
              >
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
                  0
                  {index + 1}
                </div>

                <h3
                  className="
                    text-3xl
                    font-semibold
                    tracking-tight

                    text-white

                    sm:text-4xl
                  "
                >
                  {project.title}
                </h3>

                <p
                  className="
                    mt-5

                    max-w-xl

                    text-base
                    leading-7

                    text-slate-400
                  "
                >
                  {
                    project.description
                  }
                </p>

                <div
                  className="
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
                          rounded-full

                          border
                          border-cyan-400/10

                          bg-cyan-400/[0.04]

                          px-3
                          py-1.5

                          text-xs

                          text-slate-400
                        "
                      >
                        {technology}
                      </span>
                    )
                  )}
                </div>
              </div>
            </article>
          )
        )}
      </div>
    </section>
  );
}