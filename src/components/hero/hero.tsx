"use client";

import {
  SiCss,
  SiFirebase,
  SiGithub,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTypescript,
} from "react-icons/si";

import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import { FadeUp } from "@/components/animations/fade-up";

/* =========================================================
   TYPES
========================================================= */

interface TechIconProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
  delay?: number;
  size?: "sm" | "md" | "lg";
}

/* =========================================================
   SHARED EASING
========================================================= */

const easing = [0.22, 1, 0.36, 1] as const;

/* =========================================================
   AWS ICON
========================================================= */

function AWSIcon({ size = 31 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5.2 15.9c3.7 2.6 8.9 3.1 13.6.9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M16.8 15.1l2.2 1.7-2.8.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <text
        x="12"
        y="11.5"
        textAnchor="middle"
        fill="currentColor"
        fontSize="6"
        fontWeight="700"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        aws
      </text>
    </svg>
  );
}

/* =========================================================
   TECHNOLOGY ICON
========================================================= */

function TechIcon({
  icon,
  label,
  className = "",
  delay = 0,
  size = "md",
}: TechIconProps) {
  const shouldReduceMotion = useReducedMotion();

  const sizeClasses = {
    sm: "h-11 w-11",
    md: "h-14 w-14",
    lg: "h-16 w-16",
  };

  return (
    <motion.div
      className={`absolute z-20 ${className}`}
      initial={{
        opacity: 0,
        scale: shouldReduceMotion ? 1 : 0.75,
        y: shouldReduceMotion ? 0 : 14,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.65,
        delay: shouldReduceMotion ? 0 : delay,
        ease: easing,
      }}
    >
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                y: [0, -7, 0],
              }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: 4 + delay,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        className={[
          sizeClasses[size],
          "group relative flex items-center justify-center",
          "rounded-2xl",
          "border border-slate-300/80 dark:border-white/[0.10]",
          "bg-white/90 dark:bg-[#111426]/75",
          "shadow-[0_15px_50px_rgba(15,23,42,0.10)]",
          "dark:shadow-[0_15px_50px_rgba(0,0,0,0.35)]",
          "backdrop-blur-md",
          "transition-all duration-300",
          "hover:-translate-y-1",
          "hover:border-cyan-400/40",
          "hover:shadow-[0_18px_55px_rgba(6,182,212,0.14)]",
          "dark:hover:shadow-[0_18px_55px_rgba(6,182,212,0.15)]",
        ].join(" ")}
      >
        {/* Icon hover glow */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-2xl
            bg-cyan-400/[0.06]
            opacity-0
            blur-xl
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        />

        {/* Icon */}

        <div
          className="
            relative
            text-slate-700
            transition-transform
            duration-300
            group-hover:scale-110
            dark:text-white/80
          "
        >
          {icon}
        </div>

        {/* Label */}

        <span
          className="
            pointer-events-none
            absolute
            -bottom-7
            left-1/2
            -translate-x-1/2
            whitespace-nowrap
            rounded-md
            border
            border-slate-200
            bg-white/95
            px-2
            py-1
            font-mono
            text-[8px]
            uppercase
            tracking-[0.14em]
            text-slate-500
            opacity-0
            shadow-sm
            backdrop-blur-md
            transition-opacity
            duration-300
            group-hover:opacity-100
            dark:border-white/[0.08]
            dark:bg-[#0b1220]/95
            dark:text-slate-400
          "
        >
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   ORBITAL RINGS
========================================================= */

function OrbitalRings() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="
        absolute
        left-1/2
        top-1/2
        h-[520px]
        w-[520px]
        -translate-x-1/2
        -translate-y-1/2
        sm:h-[560px]
        sm:w-[560px]
      "
      aria-hidden="true"
    >
      {/* =================================================
          STRONGER LIGHT-MODE ATMOSPHERE
      ================================================= */}

      <div
        className="
          absolute
          inset-[2%]
          rounded-full
          bg-purple-500/[0.045]
          blur-3xl
          dark:bg-purple-600/[0.055]
        "
      />

      <div
        className="
          absolute
          inset-[10%]
          rounded-full
          bg-cyan-400/[0.025]
          blur-3xl
          dark:bg-cyan-400/[0.025]
        "
      />

      {/* =================================================
          OUTER RING
      ================================================= */}

      <motion.div
        className="
          absolute
          inset-0
          rounded-full
          border
          border-purple-300/45
          shadow-[0_0_45px_rgba(139,92,246,0.07)]
          dark:border-purple-300/[0.14]
          dark:shadow-[0_0_55px_rgba(139,92,246,0.08)]
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                opacity: [0.65, 0.9, 0.65],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =================================================
          SECOND RING
      ================================================= */}

      <div
        className="
          absolute
          inset-[12%]
          rounded-full
          border
          border-purple-300/40
          dark:border-purple-300/[0.13]
        "
      />

      {/* =================================================
          THIRD RING
      ================================================= */}

      <div
        className="
          absolute
          inset-[25%]
          rounded-full
          border
          border-cyan-300/40
          dark:border-cyan-300/[0.11]
        "
      />

      {/* =================================================
          INNER RING
      ================================================= */}

      <div
        className="
          absolute
          inset-[39%]
          rounded-full
          border
          border-slate-300/70
          shadow-[0_0_25px_rgba(6,182,212,0.04)]
          dark:border-white/[0.10]
        "
      />

      {/* =================================================
          EXTRA ORBIT ACCENT
      ================================================= */}

      <div
        className="
          absolute
          inset-[6%]
          rounded-full
          border
          border-transparent
          border-t-purple-400/30
          border-r-cyan-400/20
          dark:border-t-purple-300/20
          dark:border-r-cyan-300/15
        "
      />

      {/* =================================================
          VERTICAL AXIS
      ================================================= */}

      <div
        className="
          absolute
          left-1/2
          top-0
          h-full
          w-px
          -translate-x-1/2
          bg-gradient-to-b
          from-transparent
          via-purple-400/20
          to-transparent
          dark:via-purple-400/[0.14]
        "
      />

      {/* =================================================
          HORIZONTAL AXIS
      ================================================= */}

      <div
        className="
          absolute
          left-0
          top-1/2
          h-px
          w-full
          -translate-y-1/2
          bg-gradient-to-r
          from-transparent
          via-purple-400/20
          to-transparent
          dark:via-purple-400/[0.14]
        "
      />

      {/* =================================================
          DIAGONAL
      ================================================= */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[140%]
          w-px
          -translate-x-1/2
          -translate-y-1/2
          rotate-45
          bg-gradient-to-b
          from-transparent
          via-purple-400/14
          to-transparent
          dark:via-purple-400/[0.08]
        "
      />

      {/* =================================================
          OPPOSITE DIAGONAL
      ================================================= */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[140%]
          w-px
          -translate-x-1/2
          -translate-y-1/2
          -rotate-45
          bg-gradient-to-b
          from-transparent
          via-purple-400/14
          to-transparent
          dark:via-purple-400/[0.08]
        "
      />

      {/* =================================================
          CENTER GLOW
      ================================================= */}

      <motion.div
        className="
          absolute
          left-1/2
          top-1/2
          h-24
          w-24
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-cyan-400/[0.07]
          blur-2xl
          dark:bg-cyan-400/[0.08]
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [0.9, 1.15, 0.9],
                opacity: [0.5, 0.85, 0.5],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =================================================
          CENTER POINT
      ================================================= */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-2.5
          w-2.5
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-cyan-400
          shadow-[0_0_25px_rgba(6,182,212,0.75)]
        "
      />

      {/* =================================================
          CENTER RING
      ================================================= */}

      <motion.div
        className="
          absolute
          left-1/2
          top-1/2
          h-10
          w-10
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-cyan-400/30
          dark:border-cyan-400/20
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.25, 1],
                opacity: [0.45, 0.9, 0.45],
              }
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

/* =========================================================
   SPACE BACKGROUND
========================================================= */

function SpaceBackground() {
  const shouldReduceMotion = useReducedMotion();

  const stars = [
    ["8%", "22%", "bg-slate-400/60", "h-1 w-1"],
    ["17%", "13%", "bg-slate-400/50", "h-0.5 w-0.5"],
    ["28%", "31%", "bg-purple-400/60", "h-1 w-1"],
    ["38%", "18%", "bg-slate-400/60", "h-0.5 w-0.5"],
    ["52%", "28%", "bg-slate-400/40", "h-1 w-1"],
    ["64%", "15%", "bg-slate-400/60", "h-0.5 w-0.5"],
    ["76%", "26%", "bg-purple-400/60", "h-1 w-1"],
    ["91%", "18%", "bg-slate-400/60", "h-0.5 w-0.5"],
    ["11%", "66%", "bg-slate-400/50", "h-0.5 w-0.5"],
    ["22%", "82%", "bg-slate-400/40", "h-1 w-1"],
    ["39%", "72%", "bg-cyan-400/60", "h-0.5 w-0.5"],
    ["57%", "86%", "bg-slate-400/50", "h-1 w-1"],
    ["72%", "73%", "bg-slate-400/50", "h-0.5 w-0.5"],
    ["88%", "64%", "bg-purple-400/60", "h-1 w-1"],
  ];

  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
      aria-hidden="true"
    >
      {/* =================================================
          TECHNICAL GRID
      ================================================= */}

      <div
        className="
          technical-grid
          absolute
          inset-0
          opacity-30
          dark:opacity-30
        "
      />

      {/* =================================================
          STARS
      ================================================= */}

      <div className="absolute inset-0">
        {stars.map(([left, top, color, size], index) => (
          <span
            key={index}
            className={`absolute rounded-full ${color} ${size} ${
              shouldReduceMotion ? "" : "hero-star"
            }`}
            style={{
              left,
              top,
              animationDelay: `${index * 0.22}s`,
            }}
          />
        ))}
      </div>

      {/* =================================================
          PURPLE ATMOSPHERE
      ================================================= */}

      <motion.div
        className="
          absolute
          left-1/2
          top-[-190px]
          h-[330px]
          w-[700px]
          -translate-x-1/2
          rounded-[50%]
          bg-purple-500/[0.07]
          blur-[90px]
          dark:bg-purple-600/[0.16]
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                opacity: [0.65, 1, 0.65],
                scale: [0.96, 1.04, 0.96],
              }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =================================================
          TOP PURPLE BEAM
      ================================================= */}

      <div
        className="
          absolute
          left-1/2
          top-0
          h-px
          w-[420px]
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-purple-500/35
          to-transparent
          blur-sm
          dark:h-1
          dark:w-[520px]
          dark:via-purple-300/50
        "
      />

      {/* =================================================
          TOP LIGHT
      ================================================= */}

      <div
        className="
          absolute
          left-1/2
          top-0
          h-16
          w-[280px]
          -translate-x-1/2
          bg-purple-500/[0.045]
          blur-2xl
          dark:bg-purple-300/[0.10]
        "
      />

      {/* =================================================
          RIGHT BLUE ATMOSPHERE
      ================================================= */}

      <div
        className="
          absolute
          right-[-120px]
          top-[25%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-blue-500/[0.025]
          blur-[120px]
          dark:bg-blue-600/[0.05]
        "
      />

      {/* =================================================
          BOTTOM CYAN ATMOSPHERE
      ================================================= */}

      <div
        className="
          absolute
          bottom-[-150px]
          left-[-150px]
          h-[450px]
          w-[450px]
          rounded-full
          bg-cyan-500/[0.025]
          blur-[120px]
          dark:bg-cyan-600/[0.035]
        "
      />

      {/* =================================================
          BOTTOM FADE
      ================================================= */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-40
          bg-gradient-to-t
          from-[var(--background)]
          to-transparent
        "
      />
    </div>
  );
}

/* =========================================================
   TECHNOLOGY ORBIT
========================================================= */

function TechnologyOrbit() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="
        relative
        hidden
        h-[620px]
        w-full
        lg:block
      "
      aria-hidden="true"
    >
      <OrbitalRings />

      {/* =================================================
          ROTATING ORBIT DOT
      ================================================= */}

      {!shouldReduceMotion && (
        <motion.div
          className="
            absolute
            left-1/2
            top-1/2
            z-10
            h-[500px]
            w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
          "
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            className="
              absolute
              -top-1
              left-1/2
              h-2
              w-2
              -translate-x-1/2
              rounded-full
              bg-cyan-300
              shadow-[0_0_18px_rgba(6,182,212,0.8)]
            "
          />
        </motion.div>
      )}

      {/* =================================================
          REACT
      ================================================= */}

      <TechIcon
        label="React"
        delay={0.15}
        size="lg"
        className="left-[48%] top-[9%]"
        icon={
          <SiReact
            size={34}
            className="text-[#61DAFB]"
          />
        }
      />

      {/* =================================================
          JAVASCRIPT
      ================================================= */}

      <TechIcon
        label="JavaScript"
        delay={0.25}
        className="left-[69%] top-[18%]"
        icon={
          <SiJavascript
            size={30}
            className="text-[#F7DF1E]"
          />
        }
      />

      {/* =================================================
          FIREBASE
      ================================================= */}

      <TechIcon
        label="Firebase"
        delay={0.35}
        className="left-[39%] top-[32%]"
        icon={
          <SiFirebase
            size={30}
            className="text-[#FFCA28]"
          />
        }
      />

      {/* =================================================
          NEXT.JS
      ================================================= */}

      <TechIcon
        label="Next.js"
        delay={0.45}
        className="left-[77%] top-[38%]"
        icon={
          <SiNextdotjs
            size={30}
            className="text-slate-800 dark:text-white"
          />
        }
      />

      {/* =================================================
          TYPESCRIPT
      ================================================= */}

      <TechIcon
        label="TypeScript"
        delay={0.55}
        className="left-[51%] top-[48%]"
        icon={
          <SiTypescript
            size={31}
            className="text-[#3178C6]"
          />
        }
      />

      {/* =================================================
          AWS
      ================================================= */}

      <TechIcon
        label="AWS"
        delay={0.65}
        className="left-[79%] top-[57%]"
        icon={<AWSIcon size={31} />}
      />

      {/* =================================================
          GITHUB
      ================================================= */}

      <TechIcon
        label="GitHub"
        delay={0.75}
        className="left-[51%] top-[68%]"
        icon={
          <SiGithub
            size={31}
            className="text-slate-800 dark:text-white"
          />
        }
      />

      {/* =================================================
          CSS
      ================================================= */}

      <TechIcon
        label="CSS"
        delay={0.85}
        className="left-[34%] top-[70%]"
        icon={
          <SiCss
            size={31}
            className="text-[#1572B6]"
          />
        }
      />
    </div>
  );
}

/* =========================================================
   MOBILE TECHNOLOGY VISUAL
========================================================= */

function MobileTechnologyVisual() {
  const shouldReduceMotion = useReducedMotion();

  const technologies = [
    {
      label: "React",
      icon: (
        <SiReact
          size={22}
          className="text-[#61DAFB]"
        />
      ),
    },
    {
      label: "Next",
      icon: (
        <SiNextdotjs
          size={21}
          className="text-slate-800 dark:text-white"
        />
      ),
    },
    {
      label: "TS",
      icon: (
        <SiTypescript
          size={21}
          className="text-[#3178C6]"
        />
      ),
    },
    {
      label: "Firebase",
      icon: (
        <SiFirebase
          size={21}
          className="text-[#FFCA28]"
        />
      ),
    },
  ];

  const positions = [
    "left-[6%] top-[38%]",
    "right-[6%] top-[20%]",
    "right-[16%] bottom-[10%]",
    "left-[18%] bottom-[7%]",
  ];

  return (
    <div
      className="
        relative
        mx-auto
        mt-14
        h-[250px]
        w-[250px]
        lg:hidden
      "
      aria-hidden="true"
    >
      {/* Outer ring */}

      <div
        className="
          absolute
          inset-0
          rounded-full
          border
          border-purple-300/50
          dark:border-purple-400/10
        "
      />

      {/* Middle ring */}

      <div
        className="
          absolute
          inset-[15%]
          rounded-full
          border
          border-cyan-300/50
          dark:border-cyan-400/10
        "
      />

      {/* Inner ring */}

      <div
        className="
          absolute
          inset-[30%]
          rounded-full
          border
          border-slate-300/70
          dark:border-white/[0.08]
        "
      />

      {/* Center KHEL node */}

      <motion.div
        initial={{
          opacity: 0,
          scale: shouldReduceMotion ? 1 : 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.7,
          ease: easing,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          flex
          h-20
          w-20
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-cyan-400/25
          bg-white/80
          shadow-[0_0_50px_rgba(6,182,212,0.10)]
          backdrop-blur-md
          dark:bg-[#0b1220]/75
          dark:shadow-[0_0_50px_rgba(6,182,212,0.12)]
        "
      >
        <span
          className="
            font-mono
            text-[9px]
            uppercase
            tracking-[0.2em]
            text-cyan-600
            dark:text-cyan-300
          "
        >
          KHEL
        </span>
      </motion.div>

      {/* Technology nodes */}

      {technologies.map((technology, index) => (
        <motion.div
          key={technology.label}
          initial={{
            opacity: 0,
            scale: shouldReduceMotion ? 1 : 0.7,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            delay: shouldReduceMotion
              ? 0
              : 0.15 + index * 0.1,
            ease: easing,
          }}
          className={`absolute ${positions[index]}`}
        >
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -5, 0],
                  }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    duration: 3.5 + index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white/90
              shadow-sm
              backdrop-blur-md
              dark:border-white/[0.10]
              dark:bg-[#111426]/75
            "
          >
            {technology.icon}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

/* =========================================================
   HERO
========================================================= */

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const { scrollY } = useScroll();

  /* =======================================================
     SCROLL PARALLAX
  ======================================================= */

  const backgroundY = useTransform(
    scrollY,
    [0, 700],
    [0, shouldReduceMotion ? 0 : 70],
  );

  const visualY = useTransform(
    scrollY,
    [0, 700],
    [0, shouldReduceMotion ? 0 : -45],
  );

  const contentY = useTransform(
    scrollY,
    [0, 500],
    [0, shouldReduceMotion ? 0 : -25],
  );

  const contentOpacity = useTransform(
    scrollY,
    [0, 500],
    [1, shouldReduceMotion ? 1 : 0.45],
  );

  const visualOpacity = useTransform(
    scrollY,
    [0, 650],
    [1, shouldReduceMotion ? 1 : 0.3],
  );

  return (
    <section
      id="hero"
      className="
        relative
        isolate
        min-h-[760px]
        overflow-hidden
        border-b
        border-slate-200/70
        bg-[var(--background)]
        pt-24
        dark:border-white/[0.05]
        sm:min-h-[800px]
        lg:min-h-[820px]
      "
    >
      {/* =================================================
          BACKGROUND
      ================================================= */}

      <motion.div
        className="
          absolute
          inset-x-0
          top-0
          h-full
        "
        style={{
          y: backgroundY,
        }}
      >
        <SpaceBackground />
      </motion.div>

      {/* =================================================
          MAIN CONTAINER
      ================================================= */}

      <div
        className="
          container-khel
          relative
          z-10
          flex
          min-h-[690px]
          items-center
        "
      >
        <div
          className="
            grid
            w-full
            items-center
            gap-8
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-10
          "
        >
          {/* =================================================
              HERO CONTENT
          ================================================= */}

          <motion.div
            className="
              relative
              z-30
              max-w-2xl
            "
            style={{
              y: contentY,
              opacity: contentOpacity,
            }}
          >
            {/* =================================================
                ROLE BADGE
            ================================================= */}

            <FadeUp delay={0.1}>
              <div
                className="
                  mb-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-cyan-500/20
                  bg-cyan-500/[0.04]
                  px-3
                  py-1.5
                  dark:border-cyan-400/20
                  dark:bg-cyan-400/[0.05]
                "
              >
                <span className="relative flex h-2 w-2">
                  {!shouldReduceMotion && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-50" />
                  )}

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                </span>

                <span
                  className="
                    font-mono
                    text-[10px]
                    uppercase
                    tracking-[0.18em]
                    text-cyan-600
                    dark:text-cyan-300
                  "
                >
                  Software Engineer · Web Developer
                </span>
              </div>
            </FadeUp>

            {/* =================================================
                MAIN HEADING
            ================================================= */}

            <FadeUp delay={0.2}>
              <h1
                className="
                  max-w-4xl
                  text-5xl
                  font-bold
                  leading-[0.98]
                  tracking-[-0.045em]
                  text-[var(--foreground)]
                  sm:text-6xl
                  lg:text-7xl
                "
              >
                I BUILD{" "}

                <span
                  className="
                    bg-gradient-to-r
                    from-cyan-500
                    via-blue-500
                    to-purple-500
                    bg-clip-text
                    text-transparent
                    dark:from-cyan-300
                    dark:via-blue-400
                    dark:to-purple-400
                  "
                >
                  RELIABLE
                </span>{" "}

                DIGITAL PRODUCTS.
              </h1>
            </FadeUp>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <FadeUp delay={0.3}>
              <p
                className="
                  mt-7
                  max-w-xl
                  text-base
                  leading-7
                  text-slate-600
                  dark:text-slate-400
                  sm:text-lg
                "
              >
                I design and develop modern web applications with a focus on
                performance, usability, maintainability, and real-world
                problem solving.
              </p>
            </FadeUp>

            {/* =================================================
                CTA BUTTONS
            ================================================= */}

            <FadeUp delay={0.4}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {/* Primary CTA */}

                <a
                  href="#projects"
                  className="
                    group
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-slate-950
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    !text-white
                    shadow-[0_10px_35px_rgba(15,23,42,0.12)]
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-slate-800
                    dark:bg-white
                    dark:!text-slate-950
                    dark:hover:bg-slate-100
                  "
                >
                  View My Work

                  <ArrowUpRight
                    size={16}
                    className="
                      transition-transform
                      duration-200
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                    "
                  />
                </a>

                {/* Secondary CTA */}

                <a
                  href="#contact"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-200
                    bg-white/60
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-slate-800
                    shadow-sm
                    backdrop-blur-sm
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:border-cyan-400/30
                    hover:bg-cyan-400/[0.04]
                    dark:border-white/[0.10]
                    dark:bg-white/[0.03]
                    dark:text-white
                    dark:hover:border-cyan-400/30
                    dark:hover:bg-cyan-400/[0.05]
                  "
                >
                  Let's Talk
                </a>
              </div>
            </FadeUp>

            {/* =================================================
                VALUE PROPOSITIONS
            ================================================= */}

            <FadeUp delay={0.5}>
              <div
                className="
                  mt-10
                  flex
                  flex-wrap
                  items-center
                  gap-x-6
                  gap-y-3
                  text-xs
                  text-slate-500
                "
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={14}
                    className="text-cyan-500 dark:text-cyan-400"
                  />

                  <span>Performance focused</span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={14}
                    className="text-cyan-500 dark:text-cyan-400"
                  />

                  <span>Responsive by default</span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={14}
                    className="text-cyan-500 dark:text-cyan-400"
                  />

                  <span>Built to scale</span>
                </div>
              </div>
            </FadeUp>

            {/* =================================================
                MOBILE TECHNOLOGY VISUAL
            ================================================= */}

            <MobileTechnologyVisual />
          </motion.div>

          {/* =================================================
              DESKTOP TECHNOLOGY VISUAL
          ================================================= */}

          <motion.div
            className="relative"
            style={{
              y: visualY,
              opacity: visualOpacity,
            }}
          >
            <TechnologyOrbit />
          </motion.div>
        </div>
      </div>

      {/* =================================================
          SCROLL INDICATOR
      ================================================= */}

      <motion.a
        href="#profile"
        aria-label="Scroll to profile"
        className="
          absolute
          bottom-7
          left-1/2
          z-30
          hidden
          -translate-x-1/2
          flex-col
          items-center
          gap-2
          text-slate-400
          transition-colors
          hover:text-cyan-500
          dark:text-slate-600
          dark:hover:text-cyan-400
          sm:flex
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                y: [0, 6, 0],
              }
        }
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <span
          className="
            font-mono
            text-[8px]
            uppercase
            tracking-[0.25em]
          "
        >
          Scroll
        </span>

        <ArrowDown size={14} />
      </motion.a>
    </section>
  );
}