"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";

/* ============================================================
   TYPES
============================================================ */

interface ProjectImageGalleryProps {
  images: string[];
  imageOffset?: number;
  totalImages?: number;
  onImageSelect?: (index: number) => void;
}

interface CaseStudyImageProps {
  src: string;
  index: number;
  totalImages: number;
  onSelect: () => void;
  priority?: boolean;
}

interface ImageLightboxProps {
  images: string[];
  activeIndex: number | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

/* ============================================================
   PROJECT IMAGE GALLERY
============================================================ */

/**
 * Displays ALL project screenshots.
 *
 * Important:
 * `images` must contain every screenshot you want displayed.
 *
 * Example:
 *
 * images={[
 *   "/images/soliera/01.jpg",
 *   "/images/soliera/02.jpg",
 *   "/images/soliera/03.jpg",
 *   ...
 *   "/images/soliera/34.jpg",
 * ]}
 */
export function ProjectImageGallery({
  images,
  imageOffset = 0,
  totalImages,
  onImageSelect,
}: ProjectImageGalleryProps) {
  /*
   * Remove empty paths and duplicate entries.
   *
   * This prevents broken/duplicate entries from making the
   * gallery counter confusing.
   */
  const cleanImages = Array.from(
    new Set(
      images.filter(
        (image): image is string =>
          typeof image === "string" && image.trim().length > 0,
      ),
    ),
  );

  if (cleanImages.length === 0) {
    return (
      <div
        className="
          technical-grid
          flex
          min-h-[240px]
          items-center
          justify-center
          rounded-2xl
          border
          border-white/[0.08]
          bg-white/[0.025]
        "
      >
        <span
          className="
            font-mono
            text-[9px]
            uppercase
            tracking-[0.18em]
            text-slate-500
          "
        >
          No project screenshots available
        </span>
      </div>
    );
  }

  /*
   * Use the supplied total only when it is greater than the
   * actual number of images.
   *
   * Normally this will simply be cleanImages.length.
   */
  const displayTotal =
    typeof totalImages === "number" && totalImages > 0
      ? totalImages
      : cleanImages.length;

  return (
    <section className="w-full">
      {/* ========================================================
          GALLERY HEADER
      ========================================================= */}

      <div
        className="
          mb-4
          flex
          items-end
          justify-between
          gap-4
        "
      >
        <div>
          <p
            className="
              mb-1
              font-mono
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-cyan-400
            "
          >
            Project Gallery
          </p>

          <p
            className="
              text-[9px]
              leading-5
              text-slate-500
            "
          >
            Complete interface and system screenshots
          </p>
        </div>

        <span
          className="
            shrink-0
            rounded-full
            border
            border-white/[0.08]
            bg-white/[0.025]
            px-2.5
            py-1
            font-mono
            text-[8px]
            font-semibold
            tracking-[0.1em]
            text-cyan-400
          "
        >
          {cleanImages.length} Screens
        </span>
      </div>

      {/* ========================================================
          ALL IMAGES
      ========================================================= */}

      <div className="space-y-5">
        {cleanImages.map((src, index) => {
          const absoluteIndex = imageOffset + index;

          return (
            <CaseStudyImage
              key={`${src}-${index}`}
              src={src}
              index={absoluteIndex}
              totalImages={displayTotal}
              priority={index < 2}
              onSelect={() => {
                onImageSelect?.(absoluteIndex);
              }}
            />
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================
   SINGLE CASE STUDY IMAGE
============================================================ */

export function CaseStudyImage({
  src,
  index,
  totalImages,
  onSelect,
  priority = false,
}: CaseStudyImageProps) {
  const [failed, setFailed] = useState(false);

  const imageNumber = String(index + 1).padStart(2, "0");

  const imageCounter =
    `${imageNumber} / ` +
    `${String(totalImages).padStart(2, "0")}`;

  /*
   * If an image fails, show a clear placeholder instead of
   * silently removing the image from the gallery.
   */
  if (failed) {
    return (
      <div
        className="
          technical-grid
          relative
          flex
          min-h-[220px]
          w-full
          items-end
          overflow-hidden
          rounded-2xl
          border
          border-white/[0.08]
          bg-white/[0.025]
          p-4
        "
        role="img"
        aria-label={`Project image ${imageCounter} could not be loaded`}
      >
        <div>
          <p
            className="
              mb-1
              font-mono
              text-[8px]
              uppercase
              tracking-[0.16em]
              text-cyan-400
            "
          >
            Screenshot {imageCounter}
          </p>

          <span
            className="
              font-mono
              text-[9px]
              uppercase
              tracking-[0.14em]
              text-slate-500
            "
          >
            Image unavailable
          </span>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      className="
        group
        relative
        block
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.08]
        bg-[#0b1220]
        text-left
        shadow-none
        transition-all
        duration-300
        hover:border-cyan-400/35
        hover:shadow-[0_18px_45px_rgba(0,0,0,0.25)]
        focus:outline-none
        focus-visible:border-cyan-400/50
        focus-visible:ring-2
        focus-visible:ring-cyan-400/20
      "
      aria-label={`Expand project image ${imageCounter}`}
    >
      {/* ======================================================
          IMAGE
      ====================================================== */}

      <div className="relative w-full">
        <Image
          src={src}
          alt={`Project screenshot ${imageCounter}`}
          width={1920}
          height={1080}
          sizes="
            (max-width: 640px) 100vw,
            (max-width: 1024px) 90vw,
            900px
          "
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          onError={() => setFailed(true)}
          className="
            block
            h-auto
            w-full
            object-contain
            transition-transform
            duration-500
            ease-out
            group-hover:scale-[1.01]
          "
        />

        {/* IMAGE OVERLAY */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/40
            via-transparent
            to-transparent
            opacity-60
            transition-opacity
            duration-300
            group-hover:opacity-80
          "
        />

        {/* ====================================================
            IMAGE NUMBER
        ==================================================== */}

        <span
          className="
            pointer-events-none
            absolute
            bottom-3
            left-3
            rounded-md
            border
            border-white/15
            bg-slate-950/80
            px-2
            py-1
            font-mono
            text-[9px]
            font-semibold
            tracking-[0.12em]
            text-white/90
            backdrop-blur-md
          "
        >
          {imageCounter}
        </span>

        {/* ====================================================
            EXPAND BUTTON
        ==================================================== */}

        <span
          className="
            pointer-events-none
            absolute
            right-3
            top-3
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            border
            border-white/15
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
          <Maximize2
            size={14}
            aria-hidden="true"
          />
        </span>
      </div>
    </button>
  );
}

/* ============================================================
   IMAGE LIGHTBOX
============================================================ */

export function ImageLightbox({
  images,
  activeIndex,
  onClose,
  onPrevious,
  onNext,
}: ImageLightboxProps) {
  const [failedSource, setFailedSource] = useState<string | null>(
    null,
  );

  const src =
    activeIndex === null
      ? undefined
      : images[activeIndex];

  /*
   * Keyboard controls
   *
   * Esc   = close
   */
  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    /*
     * Prevent the page behind the lightbox from scrolling.
     */
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      document.body.style.overflow =
        previousOverflow;
    };
  }, [activeIndex, onClose]);

  /*
   * Nothing selected.
   */
  if (
    activeIndex === null ||
    !src
  ) {
    return null;
  }

  const hasFailed = failedSource === src;

  const imageCounter =
    `${String(activeIndex + 1).padStart(2, "0")} / ` +
    `${String(images.length).padStart(2, "0")}`;

  return (
    <div
      className="
        fixed
        inset-0
        z-[200]
        flex
        items-center
        justify-center
        bg-black/95
        p-3
        backdrop-blur-xl
        sm:p-5
      "
      role="dialog"
      aria-modal="true"
      aria-label={`Expanded project image ${imageCounter}`}
    >
      {/* ======================================================
          BACKDROP
      ====================================================== */}

      <button
        type="button"
        aria-label="Close expanded image"
        className="
          absolute
          inset-0
          cursor-default
        "
        onClick={onClose}
      />

      {/* ======================================================
          LIGHTBOX CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          flex
          h-full
          w-full
          max-w-[1500px]
          flex-col
        "
      >
        {/* ====================================================
            TOP BAR
        ==================================================== */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            gap-4
            pb-3
          "
        >
          <div>
            <p
              className="
                font-mono
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-cyan-400
              "
            >
              Project Screenshot
            </p>

            <p
              className="
                mt-1
                font-mono
                text-[9px]
                tracking-[0.14em]
                text-white/50
              "
            >
              {imageCounter}
            </p>
          </div>

          {/* CLOSE */}

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-white/15
              bg-white/[0.06]
              text-white
              transition-colors
              hover:bg-white/[0.13]
            "
            aria-label="Close expanded image"
          >
            <X size={17} />
          </button>
        </div>

        {/* ====================================================
            IMAGE CONTAINER
        ==================================================== */}

        <div
          className="
            relative
            flex
            min-h-0
            flex-1
            items-center
            justify-center
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-black/30
          "
        >
          {images.length > 1 && (
            <button
              type="button"
              onClick={onPrevious}
              aria-label="Previous image"
              className="
                absolute
                left-3
                top-1/2
                z-20
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/15
                bg-black/60
                text-white
                backdrop-blur-md
                transition-all
                hover:scale-105
                hover:bg-black/80
              "
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* IMAGE */}

          {hasFailed ? (
            <div
              className="
                technical-grid
                flex
                h-full
                w-full
                items-center
                justify-center
              "
            >
              <div className="text-center">
                <p
                  className="
                    mb-2
                    font-mono
                    text-[10px]
                    uppercase
                    tracking-[0.16em]
                    text-cyan-400
                  "
                >
                  {imageCounter}
                </p>

                <span
                  className="
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.14em]
                    text-white/50
                  "
                >
                  Image unavailable
                </span>
              </div>
            </div>
          ) : (
            <Image
              src={src}
              alt={`Expanded project screenshot ${imageCounter}`}
              width={2560}
              height={1440}
              sizes="100vw"
              priority
              loading="eager"
              onError={() => setFailedSource(src)}
              className="
                max-h-full
                max-w-full
                object-contain
              "
            />
          )}

          {images.length > 1 && (
            <button
              type="button"
              onClick={onNext}
              aria-label="Next image"
              className="
                absolute
                right-3
                top-1/2
                z-20
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/15
                bg-black/60
                text-white
                backdrop-blur-md
                transition-all
                hover:scale-105
                hover:bg-black/80
              "
            >
              <ChevronRight size={20} />
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
