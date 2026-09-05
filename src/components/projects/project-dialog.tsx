"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import type { Project } from "@/data/projects";

import {
  CaseStudyImage,
  ImageLightbox,
  ProjectImageGallery,
} from "./project-image-gallery";

interface ProjectDialogProps {
  project: Project | null;
  onClose: () => void;
}

const easing = [0.22, 1, 0.36, 1] as const;

export function ProjectDialog({
  project,
  onClose,
}: ProjectDialogProps) {
  const shouldReduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [lightbox, setLightbox] = useState<{
    projectId: string;
    index: number;
  } | null>(null);

  const visualImages = project
    ? project.caseStudyImages?.length
      ? project.caseStudyImages
      : project.image
        ? [project.image]
        : []
    : [];

  const heroImage = visualImages[0];
  const openingImageCount = Math.min(
    3,
    Math.max(0, visualImages.length - 2),
  );
  const openingImages = visualImages.slice(
    1,
    1 + openingImageCount,
  );
  const narrativeStartIndex = 1 + openingImages.length;
  const narrativeImages = visualImages.slice(
    narrativeStartIndex,
    Math.max(narrativeStartIndex, visualImages.length - 1),
  );
  const finalImage =
    visualImages.length > 1
      ? visualImages[visualImages.length - 1]
      : undefined;

  const lightboxIndex =
    lightbox && lightbox.projectId === project?.id
      ? lightbox.index
      : null;

  useEffect(() => {
    if (!project) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
    };
  }, [project]);

  useEffect(() => {
    if (!project) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (lightboxIndex !== null) {
          event.preventDefault();
          setLightbox(null);
          return;
        }

        onClose();
        return;
      }

      if (lightboxIndex === null || visualImages.length < 2) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setLightbox((current) => {
          if (!current || current.projectId !== project.id) {
            return current;
          }

          return {
            ...current,
            index:
              (current.index - 1 + visualImages.length) %
              visualImages.length,
          };
        });
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setLightbox((current) => {
          if (!current || current.projectId !== project.id) {
            return current;
          }

          return {
            ...current,
            index: (current.index + 1) % visualImages.length,
          };
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, onClose, project, visualImages.length]);

  const showPreviousImage = () => {
    setLightbox((current) => {
      if (!current || current.projectId !== project?.id) {
        return current;
      }

      return {
        ...current,
        index:
          (current.index - 1 + visualImages.length) %
          visualImages.length,
      };
    });
  };

  const showNextImage = () => {
    setLightbox((current) => {
      if (!current || current.projectId !== project?.id) {
        return current;
      }

      return {
        ...current,
        index: (current.index + 1) % visualImages.length,
      };
    });
  };

  const selectImage = (index: number) => {
    if (!project) {
      return;
    }

    setLightbox({ projectId: project.id, index });
  };

  return (
    <AnimatePresence mode="wait">
      {project && (
        <motion.div
          key={project.id}
          className="fixed inset-0 z-[100]"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.22,
            ease: easing,
          }}
        >
          <button
            type="button"
            aria-label="Close project case study"
            className="absolute inset-0 h-full w-full cursor-default bg-slate-950/55 backdrop-blur-sm dark:bg-black/75"
            onClick={onClose}
          />

          <div className="relative flex h-full items-center justify-center p-3 sm:p-6">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-slate-900/[0.10] bg-white text-slate-950 shadow-2xl dark:border-white/[0.1] dark:bg-[#080d17] dark:text-white"
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 24, scale: 0.975 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? undefined
                  : { opacity: 0, y: 14, scale: 0.98 }
              }
              transition={{
                duration: shouldReduceMotion ? 0 : 0.38,
                ease: easing,
              }}
            >
              <header className="relative z-20 flex shrink-0 items-center justify-between border-b border-slate-900/[0.08] px-5 py-4 dark:border-white/[0.07] sm:px-7">
                <p className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                  01 / Case Study
                </p>

                <motion.button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close case study"
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { scale: 1.06, rotate: 4 }
                  }
                  whileTap={
                    shouldReduceMotion ? undefined : { scale: 0.94 }
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-900/[0.08] bg-slate-900/[0.025] text-slate-500 transition-colors duration-300 hover:border-slate-900/[0.15] hover:bg-slate-900/[0.05] hover:text-slate-950 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-400 dark:hover:border-white/[0.15] dark:hover:bg-white/[0.05] dark:hover:text-white"
                >
                  <X size={17} />
                </motion.button>
              </header>

              <main className="min-h-0 overflow-y-auto overscroll-contain scroll-smooth">
                <section className="border-b border-slate-900/[0.08] px-6 pb-6 pt-7 dark:border-white/[0.07] sm:px-8 sm:pb-8 sm:pt-10 lg:px-10">
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-400">
                    {project.category}
                  </p>

                  <h2
                    id="project-dialog-title"
                    className="mt-3 max-w-4xl text-3xl font-bold leading-[0.98] tracking-[-0.05em] text-slate-950 dark:text-white sm:text-5xl"
                  >
                    {project.title}
                  </h2>

                  <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
                    {project.shortDescription}
                  </p>

                  {project.technologies.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-md border border-slate-900/[0.10] bg-slate-900/[0.025] px-2.5 py-1.5 font-mono text-[9px] text-slate-600 dark:border-white/[0.1] dark:bg-white/[0.03] dark:text-slate-300"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  )}
                </section>

                <section className="border-b border-slate-900/[0.08] p-3 dark:border-white/[0.07] sm:p-5 lg:p-6">
                  {heroImage ? (
                    <CaseStudyImage
                      src={heroImage}
                      index={0}
                      totalImages={visualImages.length}
                      onSelect={() => selectImage(0)}
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1200px) 88vw, 1100px"
                      className="rounded-2xl"
                    />
                  ) : (
                    <div className="technical-grid flex min-h-56 items-center justify-center rounded-2xl border border-dashed border-slate-900/[0.12] bg-slate-100 p-6 text-center dark:border-white/[0.1] dark:bg-white/[0.025]">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-500">
                        Visual unavailable
                      </span>
                    </div>
                  )}
                </section>

                <div className="p-6 sm:p-8 lg:p-10">
                  <CaseStudyBlock title="Overview">
                    <p className="max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                      {project.description}
                    </p>

                    <dl className="mt-7 grid gap-4 border-t border-slate-900/[0.08] pt-5 sm:grid-cols-3 dark:border-white/[0.07]">
                      <CaseStudyDetail label="Project type">
                        {project.category}
                      </CaseStudyDetail>

                      <CaseStudyDetail label="Case study images">
                        {String(visualImages.length).padStart(2, "0")}
                      </CaseStudyDetail>

                      {project.technologies.length > 0 && (
                        <CaseStudyDetail label="Stack">
                          {project.technologies.join(" · ")}
                        </CaseStudyDetail>
                      )}
                    </dl>
                  </CaseStudyBlock>

                  {openingImages.length > 0 && (
                    <CaseStudyBlock
                      title="Selected views"
                      className="mt-12"
                    >
                      <p className="mb-6 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-500">
                        A small opening sequence from the captured product experience.
                      </p>

                      <ProjectImageGallery
                        images={openingImages}
                        imageOffset={1}
                        totalImages={visualImages.length}
                        onImageSelect={selectImage}
                      />
                    </CaseStudyBlock>
                  )}

                  <div className="mt-12 grid gap-10 md:grid-cols-2">
                    <CaseStudyBlock title="The Challenge">
                      <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                        {project.problem}
                      </p>
                    </CaseStudyBlock>

                    <CaseStudyBlock title="The Approach">
                      <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                        {project.solution}
                      </p>
                    </CaseStudyBlock>
                  </div>

                  {narrativeImages.length > 0 && (
                    <CaseStudyBlock
                      title="Interface sequence"
                      className="mt-12"
                    >
                      <p className="mb-6 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-500">
                        The remaining captures retain their original order and are arranged as an editorial visual sequence.
                      </p>

                      <ProjectImageGallery
                        images={narrativeImages}
                        imageOffset={narrativeStartIndex}
                        totalImages={visualImages.length}
                        onImageSelect={selectImage}
                      />
                    </CaseStudyBlock>
                  )}

                  {project.architecture.length > 0 && (
                    <CaseStudyBlock
                      title="System / Architecture"
                      className="mt-12"
                    >
                      <div className="grid gap-2 sm:grid-cols-2">
                        {project.architecture.map((item, index) => (
                          <NumberedItem
                            key={item}
                            index={index}
                            text={item}
                          />
                        ))}
                      </div>
                    </CaseStudyBlock>
                  )}

                  {project.features.length > 0 && (
                    <CaseStudyBlock
                      title="Key Features"
                      className="mt-12"
                    >
                      <div className="grid gap-3 sm:grid-cols-2">
                        {project.features.map((feature, index) => (
                          <div
                            key={feature}
                            className="flex items-center gap-3 rounded-xl border border-cyan-500/10 bg-cyan-500/[0.025] p-4 text-sm text-slate-600 dark:border-cyan-400/10 dark:bg-cyan-400/[0.025] dark:text-slate-400"
                          >
                            <span className="font-mono text-[9px] text-cyan-600 dark:text-cyan-400">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CaseStudyBlock>
                  )}

                  {project.challenges.length > 0 && (
                    <CaseStudyBlock
                      title="Challenges"
                      className="mt-12"
                    >
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {project.challenges.map((challenge) => (
                          <li
                            key={challenge}
                            className="flex gap-3 text-sm leading-6 text-slate-600 dark:text-slate-400"
                          >
                            <CheckCircle2
                              size={16}
                              className="mt-1 shrink-0 text-cyan-600 dark:text-cyan-400"
                              aria-hidden="true"
                            />
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </CaseStudyBlock>
                  )}

                  <CaseStudyBlock title="Outcome" className="mt-12">
                    {project.results.length > 0 && (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {project.results.map((result) => (
                          <p
                            key={result}
                            className="rounded-xl border border-slate-900/[0.07] bg-slate-900/[0.02] p-4 text-sm leading-6 text-slate-600 dark:border-white/[0.06] dark:bg-white/[0.02] dark:text-slate-400"
                          >
                            {result}
                          </p>
                        ))}
                      </div>
                    )}

                    {finalImage && (
                      <div className="mt-7">
                        <CaseStudyImage
                          src={finalImage}
                          index={visualImages.length - 1}
                          totalImages={visualImages.length}
                          onSelect={() =>
                            selectImage(visualImages.length - 1)
                          }
                          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 88vw, 980px"
                        />
                      </div>
                    )}
                  </CaseStudyBlock>

                  {(project.github || project.live) && (
                    <div className="mt-12 flex flex-col gap-3 border-t border-slate-900/[0.08] pt-8 sm:flex-row dark:border-white/[0.07]">
                      {project.live && (
                        <CaseStudyLink href={project.live} emphasized>
                          Live Project
                        </CaseStudyLink>
                      )}

                      {project.github && (
                        <CaseStudyLink href={project.github}>
                          GitHub
                        </CaseStudyLink>
                      )}
                    </div>
                  )}
                </div>
              </main>

              <ImageLightbox
                images={visualImages}
                activeIndex={lightboxIndex}
                onClose={() => setLightbox(null)}
                onPrevious={showPreviousImage}
                onNext={showNextImage}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CaseStudyBlock({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-5 bg-cyan-500/50 dark:bg-cyan-400/50" />
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
          {title}
        </h3>
      </div>
      {children}
    </section>
  );
}

function CaseStudyDetail({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-500">
        {label}
      </dt>
      <dd className="mt-2 text-xs leading-5 text-slate-700 dark:text-slate-300">
        {children}
      </dd>
    </div>
  );
}

function NumberedItem({
  index,
  text,
}: {
  index: number;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-900/[0.07] bg-slate-900/[0.02] p-4 dark:border-white/[0.06] dark:bg-white/[0.02]">
      <span className="font-mono text-[9px] text-cyan-600 dark:text-cyan-400">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="text-xs text-slate-600 dark:text-slate-400">
        {text}
      </span>
    </div>
  );
}

function CaseStudyLink({
  href,
  children,
  emphasized = false,
}: {
  href: string;
  children: ReactNode;
  emphasized?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors ${
        emphasized
          ? "bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
          : "border border-slate-900/[0.1] bg-slate-900/[0.025] text-slate-900 hover:border-slate-900/[0.2] hover:bg-slate-900/[0.05] dark:border-white/[0.1] dark:bg-white/[0.03] dark:text-white dark:hover:border-white/[0.2] dark:hover:bg-white/[0.05]"
      }`}
    >
      <span>{children}</span>
      {emphasized ? (
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      ) : (
        <ExternalLink
          size={14}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </a>
  );
}
