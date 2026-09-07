"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Award,
  ExternalLink,
} from "lucide-react";
import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";
import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

import {
  certifications,
  type Certification,
} from "@/data/certifications";

import CertificationDialog from "./certification-dialog";

gsap.registerPlugin(ScrollTrigger);

export function CertificationSection() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const [selectedCertification, setSelectedCertification] =
    useState<Certification | null>(null);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  /*
   * ============================================================
   * GSAP SECTION ENTRANCE
   * ============================================================
   */

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const ctx = gsap.context(() => {
      const eyebrow =
        section.querySelector(
          "[data-cert-eyebrow]",
        );

      const heading =
        section.querySelector(
          "[data-cert-heading]",
        );

      const description =
        section.querySelector(
          "[data-cert-description]",
        );

      const cards =
        section.querySelectorAll(
          "[data-cert-card]",
        );

      const footer =
        section.querySelector(
          "[data-cert-footer]",
        );

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set(
          [
            eyebrow,
            heading,
            description,
            ...cards,
            footer,
          ],
          {
            autoAlpha: 1,
            y: 0,
            x: 0,
            scale: 1,
            clearProps: "transform",
          },
        );

        return;
      }

      gsap.set(
        [
          eyebrow,
          heading,
          description,
          ...cards,
          footer,
        ],
        {
          autoAlpha: 0,
        },
      );

      gsap.set(
        eyebrow,
        {
          y: 20,
        },
      );

      gsap.set(
        heading,
        {
          y: 35,
        },
      );

      gsap.set(
        description,
        {
          y: 25,
        },
      );

      gsap.set(
        cards,
        {
          y: 45,
        },
      );

      gsap.set(
        footer,
        {
          y: 20,
        },
      );

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });

      timeline
        .to(eyebrow, {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
        })
        .to(
          heading,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.25",
        )
        .to(
          description,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.35",
        )
        .to(
          cards,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.25",
        )
        .to(
          footer,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.3",
        );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  /*
   * ============================================================
   * OPEN
   * ============================================================
   */

  const openCertification = (
    certification: Certification,
  ) => {
    setSelectedCertification(certification);

    /*
     * Wait one frame before opening.
     * This guarantees AnimatePresence sees
     * the mounted dialog correctly.
     */
    requestAnimationFrame(() => {
      setDialogOpen(true);
    });
  };

  /*
   * ============================================================
   * CLOSE
   * ============================================================
   */

  const closeCertification = () => {
    /*
     * IMPORTANT:
     * Do NOT set selectedCertification(null) here.
     *
     * The certificate must stay mounted during
     * the exit animation.
     */
    setDialogOpen(false);
  };

  /*
   * ============================================================
   * AFTER EXIT
   * ============================================================
   */

  const handleDialogExited = () => {
    setSelectedCertification(null);
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="certifications"
        aria-labelledby="certifications-heading"
        className="
          relative
          overflow-hidden
          bg-[#050912]
          py-24
          sm:py-28
          lg:py-32
        "
      >
        {/* ========================================================
           AMBIENT BACKGROUND
        ======================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            overflow-hidden
          "
        >
          <div
            className="
              absolute
              -right-40
              top-20
              h-[500px]
              w-[500px]
              rounded-full
              bg-cyan-500/[0.035]
              blur-[120px]
            "
          />

          <div
            className="
              absolute
              -left-40
              bottom-0
              h-[400px]
              w-[400px]
              rounded-full
              bg-blue-500/[0.025]
              blur-[110px]
            "
          />

          <div
            className="
              absolute
              inset-x-0
              top-0
              h-px
              bg-white/[0.06]
            "
          />
        </div>

        {/* ========================================================
           CONTENT
        ======================================================== */}

        <div
          className="
            relative
            mx-auto
            w-full
            max-w-7xl
            px-5
            sm:px-8
            lg:px-10
          "
        >
          {/* ======================================================
             HEADER
          ====================================================== */}

          <div className="max-w-4xl">
            <div
              data-cert-eyebrow
              className="
                flex
                items-center
                gap-3
                text-[10px]
                font-bold
                uppercase
                tracking-[0.24em]
                text-cyan-300
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-px
                  w-9
                  bg-cyan-400
                "
              />

              <span>06 — Certifications</span>
            </div>

            <h2
              id="certifications-heading"
              data-cert-heading
              className="
                mt-6
                text-[clamp(2.8rem,7vw,5.2rem)]
                font-black
                leading-[0.92]
                tracking-[-0.055em]
                text-white
              "
            >
              VERIFIED{" "}
              <span className="text-cyan-400">
                KNOWLEDGE.
              </span>
            </h2>

            <p
              data-cert-description
              className="
                mt-7
                max-w-3xl
                text-sm
                leading-7
                text-slate-400
                sm:text-[15px]
                lg:text-base
              "
            >
              A collection of certifications and
              continuous learning experiences that
              strengthen my software engineering,
              systems, digital technology, and AI
              capabilities.
            </p>
          </div>

          {/* ======================================================
             CERTIFICATION GRID
          ====================================================== */}

          <div
            className="
              mt-14
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {certifications.map(
              (certification, index) => (
                <CertificationCard
                  key={certification.id}
                  certification={certification}
                  index={index}
                  onOpen={
                    openCertification
                  }
                />
              ),
            )}
          </div>

          {/* ======================================================
             FOOTER
          ====================================================== */}

          <div
            data-cert-footer
            className="
              mt-8
              flex
              flex-col
              gap-3
              border-t
              border-white/[0.07]
              pt-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <p
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-slate-600
              "
            >
              KHEL / CONTINUOUS LEARNING
            </p>

            <p
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-slate-600
              "
            >
              {String(
                certifications.length,
              ).padStart(2, "0")}{" "}
              VERIFIED CREDENTIALS
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================================
         DIALOG
      ========================================================== */}

      <CertificationDialog
        certification={
          selectedCertification
        }
        open={dialogOpen}
        onClose={closeCertification}
        onExited={handleDialogExited}
      />
    </>
  );
}

/* ========================================================================
   CERTIFICATION CARD
======================================================================== */

type CertificationCardProps = {
  certification: Certification;
  index: number;
  onOpen: (
    certification: Certification,
  ) => void;
};

function CertificationCard({
  certification,
  index,
  onOpen,
}: CertificationCardProps) {
  return (
    <button
      type="button"
      data-cert-card
      onClick={() =>
        onOpen(certification)
      }
      aria-label={`View ${certification.title} certificate`}
      className="
        group
        relative
        flex
        w-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.08]
        bg-white/[0.025]
        text-left
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-cyan-400/25
        hover:bg-white/[0.04]
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-cyan-400/60
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#050912]
      "
    >
      {/* ======================================================
         IMAGE
      ====================================================== */}

      <div
        className="
          relative
          aspect-[16/10]
          overflow-hidden
          border-b
          border-white/[0.07]
          bg-[#0a111c]
        "
      >
        <Image
          src={certification.image}
          alt=""
          fill
          sizes="
            (max-width: 767px) 100vw,
            (max-width: 1279px) 50vw,
            33vw
          "
          className="
            object-contain
            p-2
            transition-transform
            duration-500
            ease-out
            group-hover:scale-[1.025]
          "
        />

        {/* Image overlay */}
        <div
          aria-hidden="true"
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#050912]/75
            via-transparent
            to-transparent
            opacity-80
          "
        />

        {/* Index */}
        <span
          className="
            absolute
            left-4
            top-4
            rounded-full
            border
            border-white/[0.10]
            bg-[#050912]/70
            px-2.5
            py-1
            text-[9px]
            font-bold
            tracking-[0.15em]
            text-slate-300
            backdrop-blur-sm
          "
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* View indicator */}
        <span
          className="
            absolute
            bottom-4
            right-4
            flex
            items-center
            gap-1.5
            rounded-full
            border
            border-cyan-400/20
            bg-[#050912]/75
            px-3
            py-1.5
            text-[9px]
            font-bold
            uppercase
            tracking-[0.14em]
            text-cyan-300
            opacity-0
            backdrop-blur-sm
            transition-opacity
            duration-300
            group-hover:opacity-100
            group-focus-visible:opacity-100
          "
        >
          View
          <ArrowUpRight className="h-3 w-3" />
        </span>
      </div>

      {/* ======================================================
         CONTENT
      ====================================================== */}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Issuer */}
        <div className="flex items-center justify-between gap-3">
          <p
            className="
              truncate
              text-[9px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-cyan-300
            "
          >
            {certification.issuer}
          </p>

          <Award
            aria-hidden="true"
            className="
              h-4
              w-4
              shrink-0
              text-slate-600
              transition-colors
              duration-300
              group-hover:text-cyan-400
            "
          />
        </div>

        {/* Title */}
        <h3
          className="
            mt-3
            min-h-[3.5rem]
            text-lg
            font-bold
            leading-snug
            tracking-tight
            text-white
          "
        >
          {certification.title}
        </h3>

        {/* Date */}
        <p
          className="
            mt-2
            text-[10px]
            font-medium
            uppercase
            tracking-[0.14em]
            text-slate-500
          "
        >
          Issued {certification.date}
        </p>

        {/* Description */}
        <p
          className="
            mt-4
            line-clamp-3
            text-xs
            leading-6
            text-slate-500
          "
        >
          {certification.description}
        </p>

        {/* Skills */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {certification.skills
            .slice(0, 3)
            .map((skill) => (
              <span
                key={skill}
                className="
                  rounded-full
                  border
                  border-white/[0.07]
                  bg-white/[0.025]
                  px-2.5
                  py-1
                  text-[9px]
                  font-medium
                  text-slate-400
                "
              >
                {skill}
              </span>
            ))}
        </div>

        {/* CTA */}
        <div
          className="
            mt-6
            flex
            items-center
            justify-between
            border-t
            border-white/[0.06]
            pt-4
          "
        >
          <span
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-slate-500
              transition-colors
              duration-300
              group-hover:text-cyan-300
            "
          >
            Open certificate
          </span>

          <span
            aria-hidden="true"
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              border
              border-white/[0.08]
              text-slate-500
              transition-all
              duration-300
              group-hover:border-cyan-400/30
              group-hover:bg-cyan-400/[0.06]
              group-hover:text-cyan-300
            "
          >
            <ExternalLink className="h-3 w-3" />
          </span>
        </div>
      </div>
    </button>
  );
}