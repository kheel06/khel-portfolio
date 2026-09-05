"use client";

import {
  useLayoutEffect,
  useRef,
} from "react";

import {
  gsap,
  ScrollTrigger,
} from "@/lib/gsap";

type GSAPRevealProps = {
  children: React.ReactNode;
  className?: string;
};

export function GSAPReveal({
  children,
  className = "",
}: GSAPRevealProps) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element =
      containerRef.current;

    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",

          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, element);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
    >
      {children}
    </div>
  );
}