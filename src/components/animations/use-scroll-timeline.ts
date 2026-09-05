"use client";

import { useLayoutEffect } from "react";
import type { RefObject } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

type TimelineRef = RefObject<HTMLElement | null>;

type TimelineParts = {
  card: HTMLElement | null;
  connector: HTMLElement | null;
  halo: HTMLElement | null;
  icon: HTMLElement | null;
  node: HTMLElement | null;
};

const selector = {
  card: "[data-timeline-card]",
  connector: "[data-timeline-connector]",
  halo: "[data-timeline-halo]",
  heading: "[data-timeline-heading]",
  icon: "[data-timeline-icon]",
  item: "[data-timeline-item]",
  line: "[data-timeline-progress]",
  node: "[data-timeline-node]",
} as const;

function getParts(item: HTMLElement): TimelineParts {
  const node = item.querySelector<HTMLElement>(selector.node);

  return {
    card: item.querySelector<HTMLElement>(selector.card),
    connector: item.querySelector<HTMLElement>(selector.connector),
    halo: node?.querySelector<HTMLElement>(selector.halo) ?? null,
    icon: node?.querySelector<HTMLElement>(selector.icon) ?? null,
    node,
  };
}

function setNodeState(
  parts: TimelineParts,
  active: boolean,
  immediate = false,
) {
  const { halo, icon, node } = parts;

  if (!node) return;

  node.classList.toggle("is-timeline-active", active);
  node.dataset.active = String(active);

  if (immediate) {
    gsap.set(node, {
      scale: active ? 1.08 : 1,
    });
  } else {
    gsap.to(node, {
      scale: active ? 1.08 : 1,
      duration: 0.3,
      ease: "back.out(1.65)",
      overwrite: "auto",
    });
  }

  if (icon) {
    if (immediate) {
      gsap.set(icon, {
        scale: active ? 1.06 : 1,
      });
    } else {
      gsap.to(icon, {
        scale: active ? 1.06 : 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  }

  if (halo) {
    if (immediate) {
      gsap.set(halo, {
        opacity: active ? 1 : 0,
        scale: active ? 1 : 0.76,
      });
    } else {
      gsap.to(halo, {
        opacity: active ? 1 : 0,
        scale: active ? 1 : 0.76,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  }
}

function setupTimeline(
  timeline: HTMLElement,
  reducedMotion: boolean,
) {
  const line = timeline.querySelector<HTMLElement>(selector.line);

  const items = gsap.utils.toArray<HTMLElement>(
    selector.item,
    timeline,
  );

  if (!line || items.length === 0) {
    return;
  }

  const itemParts = items.map((item) => ({
    item,
    parts: getParts(item),
  }));

  /*
   * REDUCED MOTION
   */
  if (reducedMotion) {
    gsap.set(line, {
      scaleY: 1,
      transformOrigin: "top center",
    });

    itemParts.forEach(({ parts }) => {
      setNodeState(parts, true, true);
    });

    return;
  }

  /*
   * INITIAL LINE STATE
   */
  gsap.set(line, {
    scaleY: 0,
    transformOrigin: "top center",
  });

  /*
   * INITIAL ITEM STATES
   */
  itemParts.forEach(({ item, parts }) => {
    const direction =
      item.dataset.side === "left" ? -44 : 44;

    if (parts.card) {
      gsap.set(parts.card, {
        autoAlpha: 0,
        x: direction,
        y: 18,
        willChange: "transform, opacity",
      });
    }

    if (parts.connector) {
      gsap.set(parts.connector, {
        autoAlpha: 0,
        scaleX: 0,
        transformOrigin:
          item.dataset.side === "left"
            ? "left center"
            : "right center",
      });
    }

    if (parts.node) {
      gsap.set(parts.node, {
        scale: 0.82,
        willChange: "transform",
      });
    }

    if (parts.halo) {
      gsap.set(parts.halo, {
        opacity: 0,
        scale: 0.76,
      });
    }

    /*
     * CARD REVEAL
     */
    const reveal = gsap.timeline({
      defaults: {
        overwrite: "auto",
      },
      scrollTrigger: {
        trigger: item,
        start: "top 82%",
        toggleActions: "play none none none",
      },
    });

    if (parts.card) {
      reveal.to(parts.card, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration: 0.72,
        ease: "power3.out",
        clearProps: "willChange",
      });
    }

    if (parts.connector) {
      reveal.to(
        parts.connector,
        {
          autoAlpha: 1,
          scaleX: 1,
          duration: 0.42,
          ease: "power2.out",
        },
        0.16,
      );
    }

    if (parts.node) {
      reveal.to(
        parts.node,
        {
          scale: 1,
          duration: 0.48,
          ease: "back.out(1.8)",
          clearProps: "willChange",
        },
        0.08,
      );
    }
  });

  /*
   * UPDATE ACTIVE NODES
   */
  const syncProgress = (
    progress: number,
    immediate = false,
  ) => {
    /*
     * Clamp progress.
     *
     * This prevents invalid values during ScrollTrigger
     * refresh/recalculation.
     */
    const safeProgress = gsap.utils.clamp(0, 1, progress);

    const timelineHeight = timeline.offsetHeight;

    if (!timelineHeight) return;

    const progressPosition =
      timelineHeight * safeProgress;

    const timelineTop =
      timeline.getBoundingClientRect().top;

    itemParts.forEach(({ item, parts }) => {
      let nodePosition: number;

      if (parts.node) {
        const nodeRect =
          parts.node.getBoundingClientRect();

        nodePosition =
          nodeRect.top -
          timelineTop +
          nodeRect.height / 2;
      } else {
        nodePosition =
          item.offsetTop +
          item.offsetHeight / 2;
      }

      const active =
        progressPosition >= nodePosition - 8;

      if (
        parts.node?.dataset.active !==
        String(active)
      ) {
        setNodeState(
          parts,
          active,
          immediate,
        );
      }
    });
  };

  /*
   * MAIN TIMELINE SCROLLTRIGGER
   *
   * Keep the ScrollTrigger configuration simple.
   * In particular, don't use `once` here because this
   * trigger needs to continuously scrub with the page.
   */
  gsap.to(line, {
    scaleY: 1,
    ease: "none",
    scrollTrigger: {
      trigger: timeline,
      start: "top 72%",
      end: "bottom 62%",
      scrub: 0.85,
      invalidateOnRefresh: true,

      onUpdate: (self) => {
        syncProgress(self.progress);
      },

      onRefresh: (self) => {
        syncProgress(self.progress, true);
      },
    },
  });
}

/**
 * Adds scroll animations to education / experience timelines.
 *
 * Desktop and mobile timelines are isolated with matchMedia
 * so hidden markup doesn't create competing ScrollTriggers.
 */
export function useScrollTimeline(
  sectionRef: TimelineRef,
) {
  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    /*
     * Everything created inside this context is automatically
     * cleaned up when the component unmounts.
     */
    const context = gsap.context(() => {
      /*
       * SECTION HEADING
       */
      const heading =
        section.querySelector<HTMLElement>(
          selector.heading,
        );

      if (reducedMotion) {
        if (heading) {
          gsap.set(heading, {
            clearProps: "all",
          });
        }
      } else if (heading) {
        gsap.fromTo(
          heading,
          {
            autoAlpha: 0,
            y: 28,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",

            scrollTrigger: {
              trigger: heading,
              start: "top 86%",
              toggleActions:
                "play none none none",
            },
          },
        );
      }

      /*
       * RESPONSIVE TIMELINES
       */
      const media = gsap.matchMedia();

      media.add(
        "(min-width: 768px)",
        () => {
          const timeline =
            section.querySelector<HTMLElement>(
              "[data-timeline-desktop]",
            );

          if (timeline) {
            setupTimeline(
              timeline,
              reducedMotion,
            );
          }
        },
      );

      media.add(
        "(max-width: 767px)",
        () => {
          const timeline =
            section.querySelector<HTMLElement>(
              "[data-timeline-mobile]",
            );

          if (timeline) {
            setupTimeline(
              timeline,
              reducedMotion,
            );
          }
        },
      );
    }, section);

    /*
     * Wait until DOM/layout has settled before refreshing.
     *
     * This is important when cards/images affect timeline
     * dimensions.
     */
    const refreshId =
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

    return () => {
      cancelAnimationFrame(refreshId);

      /*
       * Kill everything created by this hook.
       */
      context.revert();

      /*
       * Refresh after removing triggers so GSAP doesn't retain
       * stale measurements.
       */
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };
  }, [sectionRef]);
}