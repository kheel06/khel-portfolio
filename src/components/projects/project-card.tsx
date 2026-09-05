"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

const cardMotion = { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const };

function ProjectPreview({ project, index, className = "" }: Pick<ProjectCardProps, "project" | "index"> & { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-slate-100 dark:bg-[#0b1220] ${className}`}>
      {project.image ? (
        <img src={project.image} alt={`${project.title} project preview`} loading={index < 2 ? "eager" : "lazy"} className="project-card-image h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]" />
      ) : <ProjectPlaceholder title={project.title} />}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent opacity-75 transition-opacity duration-500 group-hover:opacity-95 dark:from-[#070b14] dark:via-transparent" />
      <div aria-hidden="true" className="project-card-glow absolute inset-0 bg-cyan-400/[0.035] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}

function TechnologyChips({ project, limit = 5 }: { project: Project; limit?: number }) {
  return <div className="flex flex-wrap gap-2">{project.technologies.slice(0, limit).map((technology) => <span key={technology} className="rounded-md border border-slate-900/[0.10] bg-slate-950/[0.025] px-2.5 py-1.5 font-mono text-[9px] text-slate-500 dark:border-white/[0.08] dark:bg-white/[0.025] dark:text-slate-400">{technology}</span>)}</div>;
}

function CardNumber({ index }: { index: number }) {
  return <span className="font-mono text-sm font-semibold text-cyan-600 dark:text-cyan-400">{String(index + 1).padStart(2, "0")}</span>;
}

export function FeaturedProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.article transition={cardMotion} whileHover={reducedMotion ? undefined : { y: -4, transition: cardMotion }} className="group overflow-hidden rounded-2xl border border-slate-900/[0.10] bg-white shadow-[0_16px_60px_rgba(15,23,42,0.06)] transition-colors hover:border-cyan-500/30 dark:border-white/[0.09] dark:bg-white/[0.018] dark:shadow-none dark:hover:border-cyan-400/25">
      <button type="button" onClick={() => onOpen(project)} aria-label={`View ${project.title} case study`} className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 focus-visible:ring-inset">
        <div className="grid min-h-[480px] lg:grid-cols-[0.96fr_1.04fr]">
          <div className="order-2 flex flex-col justify-center p-7 sm:p-10 lg:order-1 lg:p-12">
            <p className="mb-7 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-400">Featured project</p>
            <CardNumber index={index} />
            <h3 className="mt-4 max-w-xl text-3xl font-semibold leading-[1.08] tracking-tight text-slate-950 transition-colors group-hover:text-cyan-700 sm:text-4xl dark:text-white dark:group-hover:text-cyan-100">{project.title}</h3>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">{project.shortDescription}</p>
            <div className="mt-7"><TechnologyChips project={project} limit={5} /></div>
            <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-md border border-cyan-600/50 px-4 py-3 text-[10px] font-semibold text-slate-800 transition-colors group-hover:border-cyan-500 group-hover:bg-cyan-500/[0.07] group-hover:text-cyan-700 dark:border-cyan-400/50 dark:text-white dark:group-hover:border-cyan-300 dark:group-hover:bg-cyan-400/[0.08] dark:group-hover:text-cyan-200">View Case Study <ArrowUpRight size={14} /></span>
          </div>
          <ProjectPreview project={project} index={index} className="order-1 min-h-[260px] lg:order-2 lg:min-h-full" />
        </div>
      </button>
    </motion.article>
  );
}

export function SelectedProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.article transition={cardMotion} whileHover={reducedMotion ? undefined : { y: -4, transition: cardMotion }} className="group h-full overflow-hidden rounded-2xl border border-slate-900/[0.10] bg-white shadow-[0_14px_50px_rgba(15,23,42,0.05)] transition-colors hover:border-cyan-500/30 dark:border-white/[0.09] dark:bg-white/[0.018] dark:shadow-none dark:hover:border-cyan-400/25">
      <button type="button" onClick={() => onOpen(project)} aria-label={`View ${project.title} case study`} className="block h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 focus-visible:ring-inset">
        <ProjectPreview project={project} index={index} className="aspect-[16/9]" />
        <div className="p-6 sm:p-7">
          <CardNumber index={index} />
          <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950 transition-colors group-hover:text-cyan-700 dark:text-white dark:group-hover:text-cyan-100">{project.title}</h3>
          <p className="mt-3 min-h-12 text-sm leading-6 text-slate-600 dark:text-slate-400">{project.shortDescription}</p>
          <div className="mt-6"><TechnologyChips project={project} limit={5} /></div>
          <span className="mt-7 inline-flex items-center gap-2 text-[10px] font-semibold text-cyan-700 transition-colors group-hover:text-cyan-600 dark:text-cyan-400 dark:group-hover:text-cyan-300">View Case Study <ArrowUpRight size={13} /></span>
        </div>
      </button>
    </motion.article>
  );
}

export function ProjectListRow({ project, index, onOpen }: ProjectCardProps) {
  return (
    <button type="button" onClick={() => onOpen(project)} aria-label={`View ${project.title} case study`} className="group grid w-full grid-cols-[2.4rem_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 border-b border-slate-900/[0.08] px-4 py-5 text-left transition-colors hover:bg-cyan-500/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 focus-visible:ring-inset sm:grid-cols-[3.5rem_minmax(10rem,1.1fr)_minmax(14rem,2fr)_minmax(7rem,0.8fr)_3rem] sm:gap-x-5 sm:px-7 dark:border-white/[0.07] dark:hover:bg-cyan-400/[0.035]">
      <CardNumber index={index} />
      <h3 className="min-w-0 text-sm font-semibold text-slate-900 transition-colors group-hover:text-cyan-700 dark:text-slate-100 dark:group-hover:text-cyan-300">{project.title}</h3>
      <p className="col-start-2 line-clamp-2 text-xs leading-5 text-slate-500 sm:col-start-auto dark:text-slate-400">{project.shortDescription}</p>
      <span className="hidden text-xs text-slate-500 sm:block dark:text-slate-400">{project.category}</span>
      <span className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-900/[0.10] text-slate-500 transition-colors group-hover:border-cyan-500/40 group-hover:text-cyan-700 dark:border-white/[0.10] dark:text-slate-400 dark:group-hover:border-cyan-400/40 dark:group-hover:text-cyan-300"><ArrowUpRight size={15} /></span>
    </button>
  );
}

export const ProjectCard = SelectedProjectCard;

function ProjectPlaceholder({ title }: { title: string }) {
  return <div className="technical-grid flex h-full w-full items-center justify-center bg-slate-100 px-6 text-center dark:bg-[#0b1220]"><p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{title}</p></div>;
}
