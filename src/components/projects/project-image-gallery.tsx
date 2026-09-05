"use client";

import { useState } from "react";

import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";

interface ProjectImageGalleryProps {
  images: string[];
  imageOffset: number;
  totalImages: number;
  onImageSelect: (index: number) => void;
}

interface CaseStudyImageProps {
  src: string;
  index: number;
  totalImages: number;
  onSelect: () => void;
  priority?: boolean;
  sizes: string;
  className?: string;
}

interface ImageLightboxProps {
  images: string[];
  activeIndex: number | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

type GalleryLayout = "full" | "feature" | "trio" | "pair";

const galleryLayouts: Array<{
  kind: GalleryLayout;
  count: number;
}> = [
  { kind: "full", count: 1 },
  { kind: "feature", count: 2 },
  { kind: "trio", count: 3 },
  { kind: "pair", count: 2 },
];

/**
 * Presents consecutive project captures in a repeating editorial rhythm.
 * Each image keeps its natural aspect ratio; the layout only controls its
 * place in the story rather than forcing it into a crop.
 */
export function ProjectImageGallery({
  images,
  imageOffset,
  totalImages,
  onImageSelect,
}: ProjectImageGalleryProps) {
  const rows = buildGalleryRows(images);

  if (rows.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 sm:space-y-5">
      {rows.map((row, rowIndex) => (
        <div
          key={`${row.kind}-${rowIndex}-${row.images[0]}`}
          className={getRowClassName(row.kind, row.images.length)}
        >
          {row.images.map((src, imageIndex) => {
            const absoluteIndex = imageOffset + row.startIndex + imageIndex;

            return (
              <CaseStudyImage
                key={src}
                src={src}
                index={absoluteIndex}
                totalImages={totalImages}
                onSelect={() => onImageSelect(absoluteIndex)}
                sizes={getImageSizes(row.kind, row.images.length, imageIndex)}
                className={getImageClassName(
                  row.kind,
                  row.images.length,
                  imageIndex,
                )}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function CaseStudyImage({
  src,
  index,
  totalImages,
  onSelect,
  priority = false,
  sizes,
  className = "",
}: CaseStudyImageProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const hasFailed = failedSource === src;

  const imageNumber = String(index + 1).padStart(2, "0");
  const imageCounter = `${imageNumber} / ${String(totalImages).padStart(2, "0")}`;

  if (hasFailed) {
    return (
      <div
        className={`technical-grid relative flex min-h-40 items-end overflow-hidden rounded-2xl border border-slate-900/[0.08] bg-slate-100 p-4 dark:border-white/[0.08] dark:bg-white/[0.025] ${className}`}
        role="img"
        aria-label={`Project image ${imageCounter} could not be loaded`}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-slate-500 dark:text-slate-500">
          Image unavailable · {imageCounter}
        </span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative block min-w-0 overflow-hidden rounded-2xl border border-slate-900/[0.08] bg-slate-100 text-left shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition-[border-color,box-shadow] duration-300 hover:border-cyan-500/35 hover:shadow-[0_18px_42px_rgba(15,23,42,0.10)] dark:border-white/[0.08] dark:bg-white/[0.025] dark:shadow-none dark:hover:border-cyan-400/35 ${className}`}
      aria-label={`Expand project image ${imageCounter}`}
    >
      <Image
        src={src}
        alt=""
        width={1920}
        height={900}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        onError={() => setFailedSource(src)}
        className="block h-auto w-full transition-[transform,filter] duration-500 ease-out motion-reduce:transition-none group-hover:scale-[1.015] group-hover:brightness-[1.025]"
      />

      <span className="pointer-events-none absolute bottom-3 left-3 rounded-md border border-white/15 bg-slate-950/75 px-2 py-1 font-mono text-[9px] tracking-[0.12em] text-white/80 backdrop-blur-md">
        {imageCounter}
      </span>

      <span className="pointer-events-none absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-white/85 opacity-0 shadow-sm backdrop-blur-md transition-opacity duration-300 motion-reduce:transition-none group-hover:opacity-100">
        <Maximize2 size={14} aria-hidden="true" />
      </span>
    </button>
  );
}

export function ImageLightbox({
  images,
  activeIndex,
  onClose,
  onPrevious,
  onNext,
}: ImageLightboxProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const src = activeIndex === null ? undefined : images[activeIndex];

  if (activeIndex === null || !src) {
    return null;
  }

  const hasFailed = failedSource === src;
  const imageCounter = `${String(activeIndex + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-3 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Expanded project image ${imageCounter}`}
    >
      <button
        type="button"
        aria-label="Close expanded image"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />

      <div className="relative z-10 flex h-full w-full max-w-7xl flex-col">
        <div className="mb-3 flex shrink-0 items-center justify-between gap-4 text-white sm:mb-4">
          <p className="font-mono text-[10px] tracking-[0.18em] text-white/65">
            {imageCounter}
          </p>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white transition-colors hover:bg-white/[0.13]"
            aria-label="Close expanded image"
          >
            <X size={17} />
          </button>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/30">
          {hasFailed ? (
            <div className="technical-grid flex h-full w-full items-center justify-center p-6 text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
                Image unavailable · {imageCounter}
              </span>
            </div>
          ) : (
            <Image
              src={src}
              alt={`Expanded project image ${imageCounter}`}
              width={1920}
              height={900}
              sizes="100vw"
              loading="eager"
              fetchPriority="high"
              onError={() => setFailedSource(src)}
              className="max-h-full w-auto max-w-full object-contain"
            />
          )}
        </div>

        <div className="mt-3 flex shrink-0 items-center justify-between gap-3 sm:mt-4">
          <button
            type="button"
            onClick={onPrevious}
            className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-xs font-medium text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <span className="hidden font-mono text-[9px] uppercase tracking-[0.17em] text-white/45 sm:inline">
            Arrow keys to navigate · Esc to close
          </span>

          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-xs font-medium text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function buildGalleryRows(images: string[]) {
  const rows: Array<{
    kind: GalleryLayout;
    startIndex: number;
    images: string[];
  }> = [];

  let cursor = 0;
  let layoutIndex = 0;

  while (cursor < images.length) {
    const layout = galleryLayouts[layoutIndex % galleryLayouts.length];
    const rowImages = images.slice(cursor, cursor + layout.count);

    rows.push({
      kind: layout.kind,
      startIndex: cursor,
      images: rowImages,
    });

    cursor += rowImages.length;
    layoutIndex += 1;
  }

  return rows;
}

function getRowClassName(kind: GalleryLayout, count: number) {
  if (count === 1 || kind === "full") {
    return "grid grid-cols-1";
  }

  if (kind === "feature" && count === 2) {
    return "grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-5";
  }

  if (kind === "trio" && count === 3) {
    return "grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5";
  }

  return "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5";
}

function getImageClassName(
  kind: GalleryLayout,
  count: number,
  imageIndex: number,
) {
  if (kind === "feature" && count === 2) {
    return imageIndex === 0 ? "md:col-span-3" : "md:col-span-2";
  }

  return "";
}

function getImageSizes(
  kind: GalleryLayout,
  count: number,
  imageIndex: number,
) {
  if (count === 1 || kind === "full") {
    return "(max-width: 640px) 100vw, (max-width: 1200px) 88vw, 980px";
  }

  if (kind === "feature" && count === 2) {
    return imageIndex === 0
      ? "(max-width: 768px) 100vw, 58vw"
      : "(max-width: 768px) 100vw, 38vw";
  }

  return count === 3
    ? "(max-width: 640px) 100vw, 30vw"
    : "(max-width: 640px) 100vw, 46vw";
}
