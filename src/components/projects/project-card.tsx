"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
  featured?: boolean;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function ProjectCard({
  project,
  index,
  onOpen,
  featured = false,
}: ProjectCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      transition={{
        duration: 0.25,
        ease,
      }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -5,
              transition: {
                duration: 0.25,
                ease: "easeOut",
              },
            }
      }
      className={`
        group
        h-full
        overflow-hidden
        rounded-2xl
        border
        border-slate-900/[0.08]
        bg-white
        shadow-[0_12px_40px_rgba(15,23,42,0.04)]
        transition-all
        duration-300

        hover:border-cyan-500/25
        hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]

        dark:border-white/[0.07]
        dark:bg-white/[0.02]
        dark:shadow-none

        dark:hover:border-cyan-400/20
        dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.18)]

        ${
          featured
            ? "ring-1 ring-cyan-500/10 dark:ring-cyan-400/10"
            : ""
        }
      `}
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="
          block
          h-full
          w-full
          text-left
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-cyan-500/50
          focus-visible:ring-inset
        "
        aria-label={`View ${project.title} case study`}
      >
        {/* =====================================================
            IMAGE
        ====================================================== */}

        <div
          className={`
            relative
            overflow-hidden
            bg-slate-100
            dark:bg-[#0b1220]

            ${
              featured
                ? "aspect-[16/8.5]"
                : "aspect-[16/9]"
            }
          `}
        >
          {project.image ? (
            <motion.img
              src={project.image}
              alt={`${project.title} project preview`}
              loading={index === 0 ? "eager" : "lazy"}
              className="
                project-card-image
                h-full
                w-full
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-[1.04]
              "
            />
          ) : (
            <ProjectPlaceholder title={project.title} />
          )}

          {/* ===================================================
              IMAGE OVERLAY
          ==================================================== */}

          <div
            aria-hidden="true"
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-slate-950/75
              via-slate-950/10
              to-transparent
              opacity-70
              transition-opacity
              duration-500
              group-hover:opacity-90

              dark:from-[#070b14]
              dark:via-transparent
              dark:to-transparent
              dark:opacity-80
            "
          />

          {/* ===================================================
              GSAP CYAN ATMOSPHERE
          ==================================================== */}

          <div
            aria-hidden="true"
            className="
              project-card-glow
              absolute
              inset-0
              bg-cyan-400/[0.025]
              opacity-0
              transition-opacity
              duration-500
              group-hover:opacity-100
            "
          />

          {/* ===================================================
              TOP LABELS
          ==================================================== */}

          <div
            className="
              absolute
              left-4
              top-4
              flex
              max-w-[calc(100%-2rem)]
              flex-wrap
              items-center
              gap-2
              sm:left-5
              sm:top-5
            "
          >
            {featured && (
              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-md
                  border
                  border-cyan-300/20
                  bg-slate-950/80
                  px-2.5
                  py-1.5
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-cyan-200
                  shadow-sm
                  backdrop-blur-md
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-cyan-300
                  "
                />

                Featured
              </span>
            )}

            <span
              className="
                rounded-md
                border
                border-white/20
                bg-slate-950/70
                px-2.5
                py-1.5
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.15em]
                text-cyan-300
                shadow-sm
                backdrop-blur-md

                dark:border-white/[0.1]
                dark:bg-[#070b14]/80
              "
            >
              {project.category}
            </span>
          </div>

          {/* ===================================================
              PROJECT NUMBER
          ==================================================== */}

          <div
            className="
              absolute
              bottom-4
              right-4
              font-mono
              text-[9px]
              text-white/60
              transition-colors
              duration-300
              group-hover:text-cyan-300

              sm:bottom-5
              sm:right-5

              dark:text-white/30
            "
          >
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <div
          className={`
            flex
            h-full
            flex-col
            p-5
            sm:p-7

            ${featured ? "sm:p-8" : ""}
          `}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3
                className={`
                  ${
                    featured
                      ? "text-2xl sm:text-3xl"
                      : "text-xl"
                  }

                  font-semibold
                  leading-tight
                  tracking-tight
                  text-slate-950
                  transition-colors
                  duration-300

                  group-hover:text-cyan-700

                  dark:text-white
                  dark:group-hover:text-cyan-100
                `}
              >
                {project.title}
              </h3>

              <p
                className={`
                  ${
                    featured
                      ? "mt-4 text-[15px] sm:text-base"
                      : "mt-3 text-sm"
                  }

                  max-w-2xl
                  leading-6
                  text-slate-600

                  dark:text-slate-500
                `}
              >
                {project.shortDescription}
              </p>
            </div>

            {/* =================================================
                ARROW
            ================================================== */}

            <motion.div
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      scale: 1.06,
                      rotate: 3,
                    }
              }
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-slate-900/[0.08]
                bg-slate-50
                text-slate-500
                transition-all
                duration-300

                group-hover:border-cyan-500/30
                group-hover:bg-cyan-500/[0.06]
                group-hover:text-cyan-600

                dark:border-white/[0.07]
                dark:bg-transparent
                dark:text-slate-500

                dark:group-hover:border-cyan-400/30
                dark:group-hover:bg-cyan-400/[0.06]
                dark:group-hover:text-cyan-400
              "
            >
              <ArrowUpRight
                size={16}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </motion.div>
          </div>

          {/* =====================================================
              TECHNOLOGIES
          ====================================================== */}

          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies
              .slice(0, featured ? 6 : 5)
              .map((technology) => (
                <span
                  key={technology}
                  className="
                    rounded-md
                    border
                    border-slate-900/[0.08]
                    bg-slate-50
                    px-2.5
                    py-1.5
                    font-mono
                    text-[9px]
                    text-slate-500
                    transition-all
                    duration-300

                    group-hover:border-cyan-500/10
                    group-hover:text-slate-600

                    dark:border-white/[0.06]
                    dark:bg-white/[0.02]
                    dark:text-slate-500

                    dark:group-hover:border-cyan-400/10
                    dark:group-hover:text-slate-300
                  "
                >
                  {technology}
                </span>
              ))}
          </div>

          {/* =====================================================
              CASE STUDY
          ====================================================== */}

          <div
            className="
              mt-7
              flex
              items-center
              gap-2
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.15em]
              text-slate-500
              transition-colors
              duration-300

              group-hover:text-cyan-600

              dark:text-slate-600
              dark:group-hover:text-cyan-400
            "
          >
            <span>View Case Study</span>

            <ArrowUpRight
              size={13}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </div>
        </div>
      </button>
    </motion.article>
  );
}

/* =========================================================
   PROJECT PLACEHOLDER
========================================================= */

function ProjectPlaceholder({
  title,
}: {
  title: string;
}) {
  return (
    <div
      className="
        technical-grid
        relative
        flex
        h-full
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-slate-100

        dark:bg-[#0b1220]
      "
    >
      {/* Technical background */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          opacity-[0.08]

          dark:opacity-[0.07]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(15,23,42,0.35) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(15,23,42,0.35) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "42px 42px",
        }}
      />

      <div
        aria-hidden="true"
        className="
          absolute
          left-1/2
          top-1/2
          h-48
          w-48
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-cyan-400/[0.05]
          blur-3xl
        "
      />

      <div className="relative z-10 px-6 text-center">
        <div
          className="
            mx-auto
            mb-4
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            border
            border-cyan-500/20
            bg-cyan-500/[0.05]

            dark:border-cyan-400/20
            dark:bg-cyan-400/[0.04]
          "
        >
          <span
            className="
              font-mono
              text-sm
              font-medium
              text-cyan-600

              dark:text-cyan-400
            "
          >
            K
          </span>
        </div>

        <p
          className="
            font-mono
            text-[9px]
            uppercase
            tracking-[0.2em]
            text-slate-500

            dark:text-slate-600
          "
        >
          {title}
        </p>

        <p
          className="
            mt-2
            text-[9px]
            uppercase
            tracking-[0.12em]
            text-slate-400

            dark:text-slate-700
          "
        >
          Project Preview
        </p>
      </div>
    </div>
  );
}