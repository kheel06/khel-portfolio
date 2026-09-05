"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Award, ExternalLink, X } from "lucide-react";

import type { Certification } from "@/data/certifications";

interface CertificationDialogProps {
  certification: Certification | null;
  onClose: () => void;
}

const easing = [0.22, 1, 0.36, 1] as const;

export function CertificationDialog({
  certification,
  onClose,
}: CertificationDialogProps) {
  const reducedMotion = useReducedMotion();

  /*
   * Close with Escape and prevent the page behind the dialog
   * from scrolling while the dialog is open.
   */
  useEffect(() => {
    if (!certification) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [certification, onClose]);

  return (
    <AnimatePresence>
      {certification && (
        <motion.div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            p-4
            sm:p-6
          "
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                }
          }
          animate={{
            opacity: 1,
          }}
          exit={
            reducedMotion
              ? undefined
              : {
                  opacity: 0,
                }
          }
        >
          {/* ============================================================
              BACKDROP
          ============================================================ */}

          <motion.button
            type="button"
            aria-label="Close certification dialog"
            onClick={onClose}
            className="
              absolute
              inset-0
              cursor-default
              bg-slate-950/70
              backdrop-blur-sm
              dark:bg-black/75
            "
          />

          {/* ============================================================
              DIALOG
          ============================================================ */}

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="certification-dialog-title"
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 30,
                    scale: 0.97,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={
              reducedMotion
                ? undefined
                : {
                    opacity: 0,
                    y: 20,
                    scale: 0.98,
                  }
            }
            transition={{
              duration: reducedMotion ? 0 : 0.35,
              ease: easing,
            }}
            className="
              relative
              z-10
              max-h-[90vh]
              w-full
              max-w-3xl
              overflow-y-auto
              rounded-2xl
              border
              border-slate-900/[0.08]
              bg-white
              text-slate-950
              shadow-2xl
              dark:border-white/[0.1]
              dark:bg-[#0b1220]
              dark:text-white
            "
          >
            {/* ==========================================================
                CLOSE BUTTON
            =========================================================== */}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close certification dialog"
              className="
                absolute
                right-4
                top-4
                z-20
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-slate-900/[0.08]
                bg-white/80
                text-slate-500
                shadow-sm
                backdrop-blur-md
                transition-all
                duration-200
                hover:border-slate-900/[0.14]
                hover:bg-slate-50
                hover:text-slate-950
                dark:border-white/[0.08]
                dark:bg-black/30
                dark:text-slate-400
                dark:hover:border-white/[0.15]
                dark:hover:bg-black/50
                dark:hover:text-white
              "
            >
              <X size={18} />
            </button>

            {/* ==========================================================
                CERTIFICATE IMAGE
            =========================================================== */}

            <div
              className="
                relative
                aspect-[16/9]
                overflow-hidden
                border-b
                border-slate-900/[0.08]
                bg-slate-100
                dark:border-white/[0.06]
                dark:bg-[#070b14]
              "
            >
              {certification.image ? (
                <img
                  src={certification.image}
                  alt={`${certification.title} certificate`}
                  className="
                    h-full
                    w-full
                    object-contain
                  "
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Award
                    size={64}
                    className="
                      text-cyan-500/35
                      dark:text-cyan-400/40
                    "
                  />
                </div>
              )}

              {/* Image edge gradient */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  h-20
                  bg-gradient-to-t
                  from-white/20
                  to-transparent
                  dark:from-[#0b1220]/40
                "
              />
            </div>

            {/* ==========================================================
                CONTENT
            =========================================================== */}

            <div className="p-6 sm:p-8">
              {/* Issuer */}

              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-cyan-600
                  dark:text-cyan-400
                "
              >
                {certification.issuer}
              </p>

              {/* Title */}

              <h2
                id="certification-dialog-title"
                className="
                  mt-3
                  text-2xl
                  font-bold
                  tracking-tight
                  text-slate-950
                  sm:text-3xl
                  dark:text-white
                "
              >
                {certification.title}
              </h2>

              {/* Date */}

              <p
                className="
                  mt-2
                  text-sm
                  text-slate-500
                  dark:text-slate-500
                "
              >
                Issued {certification.date}
              </p>

              {/* Description */}

              <p
                className="
                  mt-6
                  text-sm
                  leading-7
                  text-slate-600
                  sm:text-base
                  dark:text-slate-400
                "
              >
                {certification.description}
              </p>

              {/* ========================================================
                  SKILLS
              ========================================================= */}

              <div className="mt-8">
                <h3
                  className="
                    text-sm
                    font-semibold
                    text-slate-950
                    dark:text-white
                  "
                >
                  Skills Covered
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  {certification.skills.map((skill) => (
                    <span
                      key={skill}
                      className="
                        rounded-full
                        border
                        border-cyan-500/15
                        bg-cyan-500/[0.06]
                        px-3
                        py-1.5
                        text-xs
                        text-cyan-700
                        transition-colors
                        duration-200
                        hover:border-cyan-500/25
                        hover:bg-cyan-500/[0.1]
                        dark:border-cyan-400/10
                        dark:bg-cyan-400/[0.06]
                        dark:text-cyan-200
                        dark:hover:border-cyan-400/20
                        dark:hover:bg-cyan-400/[0.1]
                      "
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* ========================================================
                  CREDENTIAL
              ========================================================= */}

              {certification.credentialUrl && (
                <div className="mt-8">
                  <a
                    href={certification.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-slate-950
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      text-white
                      shadow-sm
                      transition-all
                      duration-200
                      hover:-translate-y-0.5
                      hover:bg-slate-800
                      hover:shadow-md
                      dark:bg-cyan-400
                      dark:text-slate-950
                      dark:hover:bg-cyan-300
                    "
                  >
                    Verify Credential

                    <ExternalLink size={15} />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}