"use client";

import * as React from "react";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Maximize2,
  X,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import type { Project } from "@/data/projects";

import { ImageLightbox } from "./project-image-gallery";

interface ProjectDialogProps {
  project: Project | null;
  onClose: () => void;
}

/* ============================================================
   ANIMATION
============================================================ */

const easing = [0.22, 1, 0.36, 1] as const;

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.08,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: easing,
    },
  },
};

/* ============================================================
   PROJECT DIALOG
============================================================ */

export function ProjectDialog({
  project,
  onClose,
}: ProjectDialogProps) {
  const shouldReduceMotion = useReducedMotion();
  const instant = shouldReduceMotion;

  const [galleryState, setGalleryState] = React.useState({
    projectId: "",
    imageIndex: 0,
  });

  const [lightboxState, setLightboxState] = React.useState<{
    projectId: string;
    imageIndex: number;
  } | null>(null);

  const projectId = project?.id ?? "";
  const imageIndex =
    galleryState.projectId === projectId
      ? galleryState.imageIndex
      : 0;

  const setImageIndex = (
    updateIndex: (current: number) => number,
  ) => {
    setGalleryState((current) => ({
      projectId,
      imageIndex: updateIndex(
        current.projectId === projectId
          ? current.imageIndex
          : 0,
      ),
    }));
  };

  const gallery = React.useMemo(() => {
    if (!project) {
      return [];
    }

    const images = project.caseStudyImages?.length
      ? project.caseStudyImages
      : project.image
        ? [project.image]
        : [];

    return images.filter(Boolean);
  }, [project]);

  if (!project) {
    return null;
  }

  const totalImages = gallery.length;

  const lightboxIndex =
    lightboxState?.projectId === projectId
      ? lightboxState.imageIndex
      : null;

  const openLightbox = (index: number) => {
    setLightboxState({
      projectId,
      imageIndex: index,
    });
  };

  const closeLightbox = () => {
    setLightboxState(null);
  };

  const showPreviousLightboxImage = () => {
    setLightboxState((current) => {
      if (
        !current ||
        current.projectId !== projectId ||
        totalImages <= 1
      ) {
        return current;
      }

      return {
        projectId,
        imageIndex:
          current.imageIndex <= 0
            ? totalImages - 1
            : current.imageIndex - 1,
      };
    });
  };

  const showNextLightboxImage = () => {
    setLightboxState((current) => {
      if (
        !current ||
        current.projectId !== projectId ||
        totalImages <= 1
      ) {
        return current;
      }

      return {
        projectId,
        imageIndex:
          current.imageIndex >= totalImages - 1
            ? 0
            : current.imageIndex + 1,
      };
    });
  };

  const previousImage = () => {
    if (totalImages <= 1) return;

    setImageIndex((current) =>
      current <= 0 ? totalImages - 1 : current - 1,
    );
  };

  const nextImage = () => {
    if (totalImages <= 1) return;

    setImageIndex((current) =>
      current >= totalImages - 1 ? 0 : current + 1,
    );
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {project && (
        <motion.div
          key={project.title}
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            p-2
            sm:p-4
          "
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* =====================================================
              BACKDROP
          ====================================================== */}

          <motion.button
            type="button"
            aria-label="Close project case study"
            onClick={onClose}
            className="
              absolute
              inset-0
              h-full
              w-full
              cursor-default
              bg-black/75
              backdrop-blur-md
            "
            variants={{
              hidden: {
                opacity: 0,
              },

              visible: {
                opacity: 1,
                transition: {
                  duration: instant ? 0 : 0.28,
                  ease: easing,
                },
              },

              exit: {
                opacity: 0,
                transition: {
                  duration: instant ? 0 : 0.2,
                  ease: easing,
                },
              },
            }}
          />

          {/* =====================================================
              MODAL FRAME
          ====================================================== */}

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            className="
              relative
              z-10
              flex
              max-h-[94vh]
              w-full
              max-w-[760px]
              flex-col
              overflow-hidden
              rounded-2xl
              border
              border-slate-900/[0.10]
              bg-white
              text-slate-950
              shadow-[0_30px_100px_rgba(15,23,42,0.22)]
              dark:border-white/[0.08]
              dark:bg-[#070b13]
              dark:text-white
              dark:shadow-[0_30px_100px_rgba(0,0,0,0.7)]
            "
            variants={{
              hidden: instant
                ? {}
                : {
                    opacity: 0,
                    y: 22,
                    scale: 0.965,
                  },

              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: instant ? 0 : 0.42,
                  ease: easing,
                },
              },

              exit: instant
                ? {}
                : {
                    opacity: 0,
                    y: 14,
                    scale: 0.98,
                    transition: {
                      duration: 0.25,
                      ease: easing,
                    },
                  },
            }}
          >
            {/* =================================================
                HEADER
            ================================================= */}

            <motion.header
              initial={
                instant
                  ? false
                  : {
                      opacity: 0,
                      y: -8,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: instant ? 0 : 0.35,
                delay: instant ? 0 : 0.1,
                ease: easing,
              }}
              className="
                relative
                z-30
                flex
                shrink-0
                items-start
                justify-between
                gap-4
                border-b
                border-slate-900/[0.08]
                bg-slate-50
                dark:border-white/[0.07]
                dark:bg-[#080d17]
                px-4
                py-3.5
                sm:px-5
                sm:py-4
              "
            >
              {/* HEADER TEXT */}

              <div className="min-w-0 flex-1">
                <p
                  className="
                    mb-1
                    font-mono
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-cyan-600
                    dark:text-cyan-400
                  "
                >
                  • Project Case Study
                </p>

                <h2
                  id="project-dialog-title"
                  className="
                    max-w-[650px]
                    text-[14px]
                    font-semibold
                    leading-[1.35]
                    tracking-[-0.02em]
                    text-slate-950
                    sm:text-[15px]
                    dark:text-white
                  "
                >
                  {project.caseStudyTitle ?? project.title}
                </h2>
              </div>

              {/* CLOSE BUTTON */}

              <motion.button
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                whileHover={
                  instant
                    ? undefined
                    : {
                        scale: 1.06,
                        rotate: 4,
                      }
                }
                whileTap={
                  instant
                    ? undefined
                    : {
                        scale: 0.94,
                      }
                }
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-slate-900/[0.10]
                  bg-slate-950/[0.025]
                  text-slate-500
                  transition-all
                  duration-300
                  hover:border-slate-900/[0.18]
                  hover:bg-slate-950/[0.06]
                  hover:text-slate-950
                  dark:border-white/[0.08]
                  dark:bg-white/[0.025]
                  dark:hover:border-white/[0.15]
                  dark:hover:bg-white/[0.06]
                  dark:hover:text-white
                "
              >
                <X size={14} />
              </motion.button>
            </motion.header>

            {/* =================================================
                SCROLL AREA
            ================================================= */}

            <div
              className="
                min-h-0
                overflow-y-auto
                overscroll-contain
                scroll-smooth
                [scrollbar-color:rgba(255,255,255,0.12)_transparent]
                [scrollbar-width:thin]
              "
            >
              {/* =================================================
                  PROJECT SCREENSHOT
              ================================================= */}

              <section
                className="
                  relative
                  mx-3
                  mt-3
                  overflow-hidden
                  rounded-xl
                  border
                  border-slate-900/[0.10]
                  bg-slate-100
                  dark:border-white/[0.08]
                  dark:bg-[#0b1220]
                  sm:mx-4
                  sm:mt-4
                "
              >
                <div
                  className="
                    relative
                    aspect-[16/8]
                    min-h-[190px]
                    w-full
                    sm:min-h-[230px]
                  "
                >
                  {gallery.length > 0 ? (
                    <motion.button
                      type="button"
                      onClick={() => openLightbox(imageIndex)}
                      aria-label={`Enlarge ${project.title} screenshot ${
                        imageIndex + 1
                      } of ${totalImages}`}
                      className="
                        group
                        absolute
                        inset-0
                        block
                        w-full
                        overflow-hidden
                        text-left
                        focus:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-inset
                        focus-visible:ring-cyan-400/70
                      "
                    >
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={gallery[imageIndex]}
                          src={gallery[imageIndex]}
                          alt={`${project.title} screenshot ${
                            imageIndex + 1
                          }`}
                          initial={{
                            opacity: 0,
                            scale: instant ? 1 : 1.025,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            scale: instant ? 1 : 0.99,
                          }}
                          transition={{
                            duration: instant ? 0 : 0.3,
                            ease: easing,
                          }}
                          className="
                            absolute
                            inset-0
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-[1.015]
                          "
                        />
                      </AnimatePresence>

                      <span
                        aria-hidden="true"
                        className="
                          pointer-events-none
                          absolute
                          right-3
                          top-3
                          z-10
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-slate-900/15
                          bg-slate-950/75
                          text-white
                          opacity-0
                          backdrop-blur-md
                          transition-all
                          duration-300
                          group-hover:opacity-100
                          group-hover:scale-100
                          scale-90
                        "
                      >
                        <Maximize2 size={14} />
                      </span>
                    </motion.button>
                  ) : (
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
                      <span
                        className="
                          font-mono
                          text-[8px]
                          uppercase
                          tracking-[0.2em]
                          text-slate-500
                          dark:text-slate-600
                        "
                      >
                        Project Preview
                      </span>
                    </div>
                  )}

                  {/* IMAGE GRADIENT */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      z-10
                      bg-gradient-to-t
                      from-black/45
                      via-transparent
                      to-black/10
                    "
                  />

                  {/* =================================================
                      PREVIOUS BUTTON
                  ================================================= */}

                  {totalImages > 1 && (
                    <motion.button
                      type="button"
                      aria-label="Previous screenshot"
                      onClick={previousImage}
                      whileHover={
                        instant
                          ? undefined
                          : {
                              scale: 1.08,
                            }
                      }
                      whileTap={
                        instant
                          ? undefined
                          : {
                              scale: 0.92,
                            }
                      }
                      className="
                        absolute
                        left-2
                        top-1/2
                        z-20
                        flex
                        h-7
                        w-7
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-slate-900/[0.12]
                        bg-black/50
                        text-white
                        backdrop-blur-md
                        transition-colors
                        hover:bg-black/75
                        dark:border-white/[0.08]
                      "
                    >
                      <ArrowLeft size={13} />
                    </motion.button>
                  )}

                  {/* =================================================
                      NEXT BUTTON
                  ================================================= */}

                  {totalImages > 1 && (
                    <motion.button
                      type="button"
                      aria-label="Next screenshot"
                      onClick={nextImage}
                      whileHover={
                        instant
                          ? undefined
                          : {
                              scale: 1.08,
                            }
                      }
                      whileTap={
                        instant
                          ? undefined
                          : {
                              scale: 0.92,
                            }
                      }
                      className="
                        absolute
                        right-2
                        top-1/2
                        z-20
                        flex
                        h-7
                        w-7
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-slate-900/[0.12]
                        bg-black/50
                        text-white
                        backdrop-blur-md
                        transition-colors
                        hover:bg-black/75
                        dark:border-white/[0.08]
                      "
                    >
                      <ArrowRight size={13} />
                    </motion.button>
                  )}

                  {/* =================================================
                      IMAGE COUNTER
                  ================================================= */}

                  <div
                    className="
                        absolute
                        bottom-3
                        left-1/2
                        z-20
                        pointer-events-none
                      -translate-x-1/2
                      rounded-full
                      border
                      border-slate-900/[0.12]
                      bg-black/70
                      px-2.5
                      py-1
                      font-mono
                      text-[8px]
                      font-semibold
                      tracking-[0.08em]
                      text-white
                      backdrop-blur-md
                    "
                  >
                    {String(
                      totalImages > 0 ? imageIndex + 1 : 0,
                    ).padStart(2, "0")}{" "}
                    /{" "}
                    {String(totalImages).padStart(2, "0")}
                  </div>
                </div>
              </section>

              {/* =================================================
                  GALLERY LABEL
              ================================================= */}

              <p
                className="
                  px-4
                  pt-2
                  text-center
                  font-mono
                  text-[7px]
                  uppercase
                  tracking-[0.18em]
                  text-slate-500
                  dark:text-slate-600
                "
              >
                {totalImages > 1
                  ? "Click the preview to enlarge or use the arrows to explore the system"
                  : "Click the preview to enlarge"}
              </p>

              {/* =================================================
                  MAIN CONTENT
              ================================================= */}

              <motion.div
                variants={
                  shouldReduceMotion
                    ? undefined
                    : staggerContainer
                }
                initial="hidden"
                animate="visible"
                className="
                  grid
                  gap-7
                  px-4
                  pb-7
                  pt-5
                  sm:grid-cols-[minmax(0,1fr)_205px]
                  sm:px-5
                "
              >
                {/* =================================================
                    LEFT COLUMN
                ================================================= */}

                <div className="min-w-0">
                  {/* SYSTEM OVERVIEW */}

                  <AnimatedBlock reduceMotion={!!instant}>
                    <CaseStudyBlock title="System Overview">
                      <p
                        className="
                          text-[10px]
                          leading-[1.8]
                          text-slate-600
                          sm:text-[11px]
                          dark:text-slate-400
                        "
                      >
                        {project.description}
                      </p>
                    </CaseStudyBlock>
                  </AnimatedBlock>

                  {/* MAIN MODULES */}

                  <AnimatedBlock
                    reduceMotion={!!instant}
                    className="mt-7"
                  >
                    <CaseStudyBlock title="Main Modules">
                      <div className="grid gap-2 sm:grid-cols-2">
                        {project.features
                          .slice(0, 6)
                          .map((feature) => (
                            <motion.div
                              key={feature}
                              whileHover={
                                instant
                                  ? undefined
                                  : {
                                      y: -2,
                                    }
                              }
                              className="
                                group
                                flex
                                min-h-[38px]
                                items-center
                                gap-2
                                rounded-lg
                                border
                                border-slate-900/[0.08]
                                bg-slate-950/[0.02]
                                px-3
                                py-2
                                transition-all
                                duration-300
                                hover:border-cyan-400/15
                                hover:bg-cyan-400/[0.02]
                                dark:border-white/[0.06]
                                dark:bg-white/[0.015]
                              "
                            >
                              <span
                                className="
                                  h-1
                                  w-1
                                  shrink-0
                                  rounded-full
                                  bg-cyan-400
                                  transition-transform
                                  duration-300
                                  group-hover:scale-150
                                "
                              />

                              <span
                                className="
                                  text-[8px]
                                  leading-4
                                  text-slate-600
                                  sm:text-[9px]
                                  dark:text-slate-400
                                "
                              >
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                      </div>
                    </CaseStudyBlock>
                  </AnimatedBlock>

                  {/* PROBLEM / SOLUTION */}

                  <AnimatedBlock
                    reduceMotion={!!instant}
                    className="mt-7"
                  >
                    <div className="grid gap-7 sm:grid-cols-2">
                      <CaseStudyBlock title="The Problem">
                        <p
                          className="
                            text-[9px]
                            leading-[1.8]
                            text-slate-600
                            sm:text-[10px]
                            dark:text-slate-400
                          "
                        >
                          {project.problem}
                        </p>
                      </CaseStudyBlock>

                      <CaseStudyBlock title="The Solution">
                        <p
                          className="
                            text-[9px]
                            leading-[1.8]
                            text-slate-600
                            sm:text-[10px]
                            dark:text-slate-400
                          "
                        >
                          {project.solution}
                        </p>
                      </CaseStudyBlock>
                    </div>
                  </AnimatedBlock>

                  {/* ARCHITECTURE */}

                  <AnimatedBlock
                    reduceMotion={!!instant}
                    className="mt-7"
                  >
                    <CaseStudyBlock title="Architecture">
                      <div className="grid gap-1.5 sm:grid-cols-2">
                        {project.architecture.map(
                          (item, index) => (
                            <motion.div
                              key={item}
                              initial={
                                instant
                                  ? false
                                  : {
                                      opacity: 0,
                                      y: 8,
                                    }
                              }
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              transition={{
                                duration: instant ? 0 : 0.35,
                                delay: instant
                                  ? 0
                                  : 0.035 * index,
                                ease: easing,
                              }}
                              whileHover={
                                instant
                                  ? undefined
                                  : {
                                      y: -2,
                                    }
                              }
                              className="
                                group
                                flex
                                items-center
                                gap-2.5
                                rounded-lg
                                border
                                border-slate-900/[0.08]
                                bg-slate-950/[0.02]
                                px-3
                                py-2
                                transition-all
                                duration-300
                                hover:border-cyan-400/15
                                hover:bg-cyan-400/[0.02]
                                dark:border-white/[0.05]
                                dark:bg-white/[0.012]
                              "
                            >
                              <span
                                className="
                                  font-mono
                                  text-[7px]
                                  text-cyan-400
                                "
                              >
                                {String(index + 1).padStart(
                                  2,
                                  "0",
                                )}
                              </span>

                              <span
                                className="
                                  text-[8px]
                                  leading-4
                                  text-slate-600
                                  sm:text-[9px]
                                  dark:text-slate-400
                                "
                              >
                                {item}
                              </span>
                            </motion.div>
                          ),
                        )}
                      </div>
                    </CaseStudyBlock>
                  </AnimatedBlock>

                  {/* CHALLENGES */}

                  <AnimatedBlock
                    reduceMotion={!!instant}
                    className="mt-7"
                  >
                    <CaseStudyBlock title="Challenges">
                      <div className="space-y-2">
                        {project.challenges.map(
                          (challenge, index) => (
                            <motion.div
                              key={challenge}
                              initial={
                                instant
                                  ? false
                                  : {
                                      opacity: 0,
                                      x: -8,
                                    }
                              }
                              animate={{
                                opacity: 1,
                                x: 0,
                              }}
                              transition={{
                                duration: instant ? 0 : 0.35,
                                delay: instant
                                  ? 0
                                  : 0.035 * index,
                                ease: easing,
                              }}
                              className="
                                flex
                                gap-2.5
                                text-[9px]
                                leading-[1.8]
                                text-slate-600
                                sm:text-[10px]
                                dark:text-slate-400
                              "
                            >
                              <span
                                className="
                                  mt-[6px]
                                  h-1
                                  w-1
                                  shrink-0
                                  rounded-full
                                  bg-cyan-400
                                "
                              />

                              <span>{challenge}</span>
                            </motion.div>
                          ),
                        )}
                      </div>
                    </CaseStudyBlock>
                  </AnimatedBlock>

                  {/* RESULTS MOBILE */}

                  <div className="mt-7 sm:hidden">
                    <CaseStudyBlock title="Results">
                      <div className="space-y-2">
                        {project.results.map((result) => (
                          <div
                            key={result}
                            className="
                              rounded-lg
                              border
                              border-cyan-400/[0.08]
                              bg-cyan-400/[0.02]
                              px-3
                              py-2.5
                              text-[9px]
                              leading-5
                              text-slate-600
                              dark:text-slate-400
                            "
                          >
                            {result}
                          </div>
                        ))}
                      </div>
                    </CaseStudyBlock>
                  </div>
                </div>

                {/* =================================================
                    RIGHT SIDEBAR
                ================================================= */}

                <aside className="min-w-0">
                  {/* TECHNOLOGIES */}

                  <AnimatedBlock reduceMotion={!!instant}>
                    <CaseStudyBlock title="Technologies Used">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map(
                          (technology) => (
                            <motion.span
                              key={technology}
                              whileHover={
                                instant
                                  ? undefined
                                  : {
                                      y: -2,
                                    }
                              }
                              className="
                                rounded-md
                                border
                                border-white/[0.08]
                                bg-white/[0.025]
                                px-2
                                py-1.5
                                font-mono
                                text-[7px]
                                text-slate-400
                                transition-all
                                duration-300
                                hover:border-cyan-400/20
                                hover:bg-cyan-400/[0.025]
                                hover:text-cyan-300
                              "
                            >
                              {technology}
                            </motion.span>
                          ),
                        )}
                      </div>
                    </CaseStudyBlock>
                  </AnimatedBlock>

                  {/* PROJECT GALLERY INFO */}

                  <AnimatedBlock
                    reduceMotion={!!instant}
                    className="mt-6"
                  >
                    <div
                      className="
                        rounded-xl
                        border
                        border-white/[0.06]
                        bg-white/[0.015]
                        p-3
                      "
                    >
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span
                          className="
                            font-mono
                            text-[7px]
                            font-semibold
                            uppercase
                            tracking-[0.16em]
                            text-slate-400
                          "
                        >
                          Project Gallery
                        </span>

                        <span
                          className="
                            font-mono
                            text-[7px]
                            font-semibold
                            text-cyan-400
                          "
                        >
                          {totalImages} Screens
                        </span>
                      </div>

                      <p
                        className="
                          text-[7px]
                          leading-[1.7]
                          text-slate-600
                        "
                      >
                        Explore the complete interface and
                        workflow through the project
                        screenshots.
                      </p>
                    </div>
                  </AnimatedBlock>

                  {/* RESULTS DESKTOP */}

                  <AnimatedBlock
                    reduceMotion={!!instant}
                    className="mt-6 hidden sm:block"
                  >
                    <CaseStudyBlock title="Results">
                      <div className="space-y-2">
                        {project.results.map((result) => (
                          <motion.div
                            key={result}
                            whileHover={
                              instant
                                ? undefined
                                : {
                                    y: -2,
                                  }
                            }
                            className="
                              rounded-lg
                              border
                              border-cyan-400/[0.08]
                              bg-cyan-400/[0.02]
                              px-3
                              py-2.5
                              text-[8px]
                              leading-[1.7]
                              text-slate-500
                              transition-all
                              duration-300
                              hover:border-cyan-400/15
                              hover:bg-cyan-400/[0.035]
                            "
                          >
                            {result}
                          </motion.div>
                        ))}
                      </div>
                    </CaseStudyBlock>
                  </AnimatedBlock>

                  {/* LINKS */}

                  {(project.github || project.live) && (
                    <AnimatedBlock
                      reduceMotion={!!instant}
                      className="mt-6"
                    >
                      <CaseStudyBlock title="Links">
                        <div className="flex flex-col gap-2">
                          {/* GITHUB */}

                          {project.github && (
                            <motion.a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={
                                instant
                                  ? undefined
                                  : {
                                      y: -2,
                                    }
                              }
                              whileTap={
                                instant
                                  ? undefined
                                  : {
                                      scale: 0.98,
                                    }
                              }
                              className="
                                group
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                rounded-lg
                                border
                                border-white/[0.08]
                                bg-white/[0.025]
                                px-3
                                py-2.5
                                text-[8px]
                                font-semibold
                                text-slate-300
                                transition-all
                                duration-300
                                hover:border-white/[0.15]
                                hover:bg-white/[0.05]
                                hover:text-white
                              "
                            >
                              <GitHubIcon size={12} />

                              <span>GitHub</span>

                              <ExternalLink
                                size={9}
                                className="
                                  transition-transform
                                  duration-300
                                  group-hover:translate-x-0.5
                                  group-hover:-translate-y-0.5
                                "
                              />
                            </motion.a>
                          )}

                          {/* LIVE PROJECT */}

                          {project.live && (
                            <motion.a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={
                                instant
                                  ? undefined
                                  : {
                                      y: -2,
                                    }
                              }
                              whileTap={
                                instant
                                  ? undefined
                                  : {
                                      scale: 0.98,
                                    }
                              }
                              className="
                                group
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                rounded-lg
                                bg-white
                                px-3
                                py-2.5
                                text-[8px]
                                font-semibold
                                text-slate-950
                                transition-all
                                duration-300
                                hover:bg-slate-200
                              "
                            >
                              <span>Live Project</span>

                              <ArrowUpRight
                                size={11}
                                className="
                                  transition-transform
                                  duration-300
                                  group-hover:translate-x-0.5
                                  group-hover:-translate-y-0.5
                                "
                              />
                            </motion.a>
                          )}
                        </div>
                      </CaseStudyBlock>
                    </AnimatedBlock>
                  )}
                </aside>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>

      <ImageLightbox
        images={gallery}
        activeIndex={lightboxIndex}
        onClose={closeLightbox}
        onPrevious={showPreviousLightboxImage}
        onNext={showNextLightboxImage}
      />
    </>
  );
}

/* ============================================================
   ANIMATED CONTENT BLOCK
============================================================ */

function AnimatedBlock({
  children,
  className = "",
  reduceMotion,
}: {
  children: React.ReactNode;
  className?: string;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 18,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        ease: easing,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   CASE STUDY BLOCK
============================================================ */

function CaseStudyBlock({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="mb-3 flex items-center gap-2.5">
        <motion.span
          initial={{
            width: 0,
          }}
          animate={{
            width: 16,
          }}
          transition={{
            duration: 0.4,
            ease: easing,
          }}
          className="
            h-px
            bg-cyan-400/50
          "
        />

        <h3
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-cyan-400
          "
        >
          {title}
        </h3>
      </div>

      {children}
    </section>
  );
}

/* ============================================================
   GITHUB BRAND ICON
============================================================ */

function GitHubIcon({
  size = 16,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-1.02-.014-1.85-2.782.604-3.369-1.185-3.369-1.185-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.071 1.532 1.031 1.532 1.031.892 1.529 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.338-2.221-.253-4.555-1.111-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.202 2.394.1 2.647.64.698 1.028 1.591 1.028 2.682 0 3.841-2.338 4.687-4.566 4.935.359.309.678.917.678 1.849 0 1.335-.012 2.411-.012 2.738 0 .268.18.58.688.481A10.002 10.002 0 0 0 22 12C22 6.477 17.523 2 12 2Z" />
    </svg>
  );
}
