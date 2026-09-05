"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function ProjectCard({
  project,
  index,
  onOpen,
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
      className="
        group
        overflow-hidden
        rounded-2xl
        border border-slate-900/[0.08]
        bg-white
        shadow-[0_12px_40px_rgba(15,23,42,0.04)]
        transition-all duration-300
        hover:border-cyan-500/25
        hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]
        dark:border-white/[0.07]
        dark:bg-white/[0.02]
        dark:shadow-none
        dark:hover:border-cyan-400/20
        dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.18)]
      "
    >
      {/* -------------------------------------------------
          IMAGE
      ------------------------------------------------- */}

      <button
        type="button"
        onClick={() => onOpen(project)}
        className="
          block
          w-full
          text-left
          focus-visible:outline-none
        "
        aria-label={`View ${project.title} case study`}
      >
        <div
          className="
            relative
            aspect-[16/9]
            overflow-hidden
            bg-slate-100
            dark:bg-[#0b1220]
          "
        >
          {project.image ? (
            <motion.img
              src={project.image}
              alt={`${project.title} project preview`}
              loading="lazy"
              className="
                h-full
                w-full
                object-cover
                transition-transform duration-700
                group-hover:scale-[1.04]
              "
            />
          ) : (
            <ProjectPlaceholder title={project.title} />
          )}

          {/* -------------------------------------------------
              IMAGE OVERLAY
          ------------------------------------------------- */}

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
              transition-opacity duration-500
              group-hover:opacity-85
              dark:from-[#070b14]
              dark:via-transparent
              dark:to-transparent
              dark:opacity-80
            "
          />

          {/* Cyan hover atmosphere */}

          <div
            aria-hidden="true"
            className="
              absolute
              inset-0
              bg-cyan-400/[0.025]
              opacity-0
              transition-opacity duration-500
              group-hover:opacity-100
            "
          />

          {/* -------------------------------------------------
              CATEGORY
          ------------------------------------------------- */}

          <div className="absolute left-5 top-5">
            <span
              className="
                rounded-md
                border border-white/20
                bg-slate-950/70
                px-3
                py-1.5
                text-[9px]
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

          {/* -------------------------------------------------
              PROJECT NUMBER
          ------------------------------------------------- */}

          <div
            className="
              absolute
              bottom-5
              right-5
              font-mono
              text-[10px]
              text-white/60
              transition-colors duration-300
              group-hover:text-cyan-300
              dark:text-white/30
            "
          >
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* -------------------------------------------------
            CONTENT
        ------------------------------------------------- */}

        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-5">
            <div className="min-w-0">
              <h3
                className="
                  text-xl
                  font-semibold
                  tracking-tight
                  text-slate-950
                  transition-colors duration-300
                  group-hover:text-cyan-700
                  dark:text-white
                  dark:group-hover:text-cyan-100
                "
              >
                {project.title}
              </h3>

              <p
                className="
                  mt-3
                  max-w-xl
                  text-sm
                  leading-6
                  text-slate-600
                  dark:text-slate-500
                "
              >
                {project.shortDescription}
              </p>
            </div>

            {/* -------------------------------------------------
                ARROW
            ------------------------------------------------- */}

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
                border border-slate-900/[0.08]
                bg-slate-50
                text-slate-500
                transition-all duration-300
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
                  transition-transform duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </motion.div>
          </div>

          {/* -------------------------------------------------
              TECHNOLOGIES
          ------------------------------------------------- */}

          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.slice(0, 5).map((technology) => (
              <span
                key={technology}
                className="
                  rounded-md
                  border border-slate-900/[0.08]
                  bg-slate-50
                  px-2.5
                  py-1.5
                  font-mono
                  text-[9px]
                  text-slate-500
                  transition-all duration-300
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

          {/* -------------------------------------------------
              CASE STUDY LINK
          ------------------------------------------------- */}

          <div
            className="
              mt-6
              flex
              items-center
              gap-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.15em]
              text-slate-500
              transition-colors duration-300
              group-hover:text-cyan-600
              dark:text-slate-600
              dark:group-hover:text-cyan-400
            "
          >
            <span>View Case Study</span>

            <ArrowUpRight
              size={13}
              className="
                transition-transform duration-300
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

function ProjectPlaceholder({ title }: { title: string }) {
  return (
    <div
      className="
        technical-grid
        flex
        h-full
        w-full
        items-center
        justify-center
        bg-slate-100
        dark:bg-[#0b1220]
      "
    >
      <div className="text-center">
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
            border border-cyan-500/20
            bg-cyan-500/[0.05]
            dark:border-cyan-400/20
            dark:bg-cyan-400/[0.04]
          "
        >
          <span className="font-mono text-sm text-cyan-600 dark:text-cyan-400">
            K
          </span>
        </div>

        <p
          className="
            font-mono
            text-[10px]
            uppercase
            tracking-[0.2em]
            text-slate-500
            dark:text-slate-600
          "
        >
          {title}
        </p>
      </div>
    </div>
  );
}
