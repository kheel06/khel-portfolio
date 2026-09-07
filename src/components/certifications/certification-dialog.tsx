"use client";

import Image from "next/image";
import {
  CalendarDays,
  ExternalLink,
  X,
} from "lucide-react";
import {
  useEffect,
  useRef,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import type { Certification } from "@/data/certifications";

type CertificationDialogProps = {
  certification: Certification | null;
  open: boolean;
  onClose: () => void;
  onExited: () => void;
};

export default function CertificationDialog({
  certification,
  open,
  onClose,
  onExited,
}: CertificationDialogProps) {
  const prefersReducedMotion = useReducedMotion();

  const closeButtonRef =
    useRef<HTMLButtonElement>(null);

  const previousFocusRef =
    useRef<HTMLElement | null>(null);

  /*
   * ============================================================
   * BODY SCROLL + KEYBOARD HANDLING
   * ============================================================
   */

  useEffect(() => {
    if (!open || !certification) {
      return;
    }

    previousFocusRef.current =
      document.activeElement as HTMLElement | null;

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.clearTimeout(focusTimer);

      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      document.body.style.overflow =
        originalOverflow;

      /*
       * Return focus to the certificate card.
       */
      previousFocusRef.current?.focus();

      previousFocusRef.current = null;
    };
  }, [
    open,
    certification,
    onClose,
  ]);

  /*
   * Nothing selected.
   */
  if (!certification) {
    return null;
  }

  return (
    <AnimatePresence
      initial={false}
      onExitComplete={onExited}
    >
      {open && (
        <motion.div
          key={certification.id}
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            p-3
            sm:p-5
            lg:p-8
          "
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: prefersReducedMotion
              ? 0
              : 0.2,
            ease: "easeOut",
          }}
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              onClose();
            }
          }}
        >
          {/* ======================================================
             BACKDROP
          ====================================================== */}

          <motion.div
            aria-hidden="true"
            className="
              absolute
              inset-0
              bg-slate-950/75
              backdrop-blur-md
              dark:bg-black/80
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          />

          {/* ======================================================
             DIALOG
          ====================================================== */}

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-dialog-title"
            aria-describedby="certificate-dialog-description"
            className="
              relative
              flex
              max-h-[94vh]
              w-full
              max-w-6xl
              flex-col
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-2xl
              dark:border-white/[0.10]
              dark:bg-[#080d16]
              dark:shadow-black/60
            "
            initial={{
              opacity: 0,
              y: prefersReducedMotion
                ? 0
                : 18,
              scale: prefersReducedMotion
                ? 1
                : 0.985,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: prefersReducedMotion
                ? 0
                : 12,
              scale: prefersReducedMotion
                ? 1
                : 0.985,
            }}
            transition={{
              duration: prefersReducedMotion
                ? 0
                : 0.25,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
          >
            {/* ====================================================
               HEADER
            ==================================================== */}

            <div
              className="
                flex
                shrink-0
                items-center
                justify-between
                gap-4
                border-b
                border-slate-200
                px-4
                py-3
                sm:px-6
                sm:py-4
                dark:border-white/[0.08]
              "
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-cyan-500/20
                    bg-cyan-500/[0.06]
                    dark:border-cyan-400/20
                    dark:bg-cyan-400/[0.06]
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      h-2
                      w-2
                      rounded-full
                      bg-cyan-500
                      dark:bg-cyan-300
                    "
                  />
                </div>

                <div className="min-w-0">
                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.24em]
                      text-cyan-600
                      dark:text-cyan-300
                    "
                  >
                    Verified Credential
                  </p>

                  <p
                    className="
                      mt-0.5
                      truncate
                      text-xs
                      font-medium
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    {certification.issuer}
                  </p>
                </div>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close certificate dialog"
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-slate-200
                  bg-slate-50
                  text-slate-500
                  transition
                  hover:border-slate-300
                  hover:bg-slate-100
                  hover:text-slate-900
                  focus:outline-none
                  focus:ring-2
                  focus:ring-cyan-500/40
                  dark:border-white/[0.10]
                  dark:bg-white/[0.03]
                  dark:text-slate-400
                  dark:hover:border-white/[0.18]
                  dark:hover:bg-white/[0.07]
                  dark:hover:text-white
                "
              >
                <X
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />
              </button>
            </div>

            {/* ====================================================
               SCROLLABLE CONTENT
            ==================================================== */}

            <div className="min-h-0 overflow-y-auto">
              {/* ==================================================
                 CERTIFICATE IMAGE
              ================================================== */}

              <div
                className="
                  border-b
                  border-slate-200
                  bg-slate-100
                  p-3
                  sm:p-5
                  lg:p-7
                  dark:border-white/[0.06]
                  dark:bg-[#0b111b]
                "
              >
                <div
                  className="
                    relative
                    mx-auto
                    aspect-[16/10]
                    w-full
                    max-w-5xl
                    overflow-hidden
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    shadow-sm
                    dark:border-white/[0.08]
                    dark:bg-[#060a11]
                  "
                >
                  <Image
                    src={certification.image}
                    alt={`${certification.title} certificate`}
                    fill
                    /*
                     * IMPORTANT:
                     * Do NOT use priority here.
                     *
                     * This image only appears after the
                     * user opens the dialog.
                     */
                    sizes="94vw"
                    className="
                      object-contain
                      p-1
                      sm:p-2
                    "
                  />
                </div>
              </div>

              {/* ==================================================
                 CERTIFICATE INFORMATION
              ================================================== */}

              <div
                className="
                  px-5
                  py-6
                  sm:px-8
                  sm:py-8
                  lg:px-10
                  lg:py-9
                "
              >
                {/* Issuer */}

                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-cyan-600
                    dark:text-cyan-300
                  "
                >
                  {certification.issuer}
                </p>

                {/* Title */}

                <h2
                  id="certificate-dialog-title"
                  className="
                    mt-2
                    max-w-4xl
                    text-2xl
                    font-bold
                    tracking-tight
                    text-slate-950
                    sm:text-3xl
                    lg:text-4xl
                    dark:text-white
                  "
                >
                  {certification.title}
                </h2>

                {/* Date + Status */}

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-slate-200
                      bg-slate-50
                      px-3
                      py-1.5
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-slate-600
                      dark:border-white/[0.08]
                      dark:bg-white/[0.03]
                      dark:text-slate-300
                    "
                  >
                    <CalendarDays className="h-3.5 w-3.5" />
                    Issued {certification.date}
                  </span>

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-emerald-500/20
                      bg-emerald-500/[0.06]
                      px-3
                      py-1.5
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-emerald-600
                      dark:text-emerald-300
                    "
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    Credential
                  </span>
                </div>

                {/* Description */}

                <p
                  id="certificate-dialog-description"
                  className="
                    mt-6
                    max-w-4xl
                    text-sm
                    leading-7
                    text-slate-600
                    sm:text-[15px]
                    dark:text-slate-400
                  "
                >
                  {certification.description}
                </p>

                {/* ==================================================
                   SKILLS
                ================================================== */}

                {certification.skills.length >
                  0 && (
                  <div className="mt-7">
                    <p
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.24em]
                        text-slate-400
                        dark:text-slate-500
                      "
                    >
                      Skills & Topics
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {certification.skills.map(
                        (skill) => (
                          <span
                            key={skill}
                            className="
                              rounded-full
                              border
                              border-cyan-500/15
                              bg-cyan-500/[0.04]
                              px-3
                              py-1.5
                              text-[10px]
                              font-medium
                              text-cyan-700
                              dark:border-cyan-400/15
                              dark:bg-cyan-400/[0.04]
                              dark:text-cyan-300
                            "
                          >
                            {skill}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {/* ==================================================
                   OPTIONAL VERIFY BUTTON
                ================================================== */}

                {certification.credentialUrl && (
                  <div className="mt-8">
                    <a
                      href={
                        certification.credentialUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-lg
                        border
                        border-cyan-500/20
                        bg-cyan-500/[0.06]
                        px-4
                        py-2.5
                        text-xs
                        font-semibold
                        text-cyan-700
                        transition
                        hover:border-cyan-500/40
                        hover:bg-cyan-500/[0.10]
                        dark:border-cyan-400/20
                        dark:bg-cyan-400/[0.06]
                        dark:text-cyan-300
                        dark:hover:border-cyan-400/40
                        dark:hover:bg-cyan-400/[0.10]
                      "
                    >
                      Verify Credential

                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                )}

                {/* ==================================================
                   FOOTER
                ================================================== */}

                <div
                  className="
                    mt-8
                    border-t
                    border-slate-200
                    pt-4
                    dark:border-white/[0.06]
                  "
                >
                  <p
                    className="
                      text-[9px]
                      font-medium
                      uppercase
                      tracking-[0.18em]
                      text-slate-400
                      dark:text-slate-600
                    "
                  >
                    KHEL / VERIFIED KNOWLEDGE
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}