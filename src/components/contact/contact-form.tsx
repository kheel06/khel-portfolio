"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import {
  Check,
  Loader2,
  Send,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import { Turnstile } from "@marsidev/react-turnstile";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import { z } from "zod";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { gsap } from "@/lib/gsap";

/* =========================================================
   VALIDATION
========================================================= */

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "Name is too long."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(254, "Email is too long."),

  subject: z
    .string()
    .trim()
    .min(2, "Please enter a subject.")
    .max(150, "Subject is too long."),

  message: z
    .string()
    .trim()
    .min(
      10,
      "Please enter at least 10 characters."
    )
    .max(
      5000,
      "Message is too long."
    ),

  /*
   * Honeypot field.
   *
   * Normal users never see this.
   */
  website: z
    .string()
    .max(
      0,
      "Invalid submission."
    )
    .optional(),
});

type ContactFormData =
  z.infer<typeof contactSchema>;

/* =========================================================
   MOTION
========================================================= */

const easing = [
  0.22,
  1,
  0.36,
  1,
] as const;

/* =========================================================
   ANIMATED FIELD
========================================================= */

function AnimatedField({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? {
              opacity: 0,
            }
          : {
              opacity: 0,
              y: 14,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.55,
        delay,
        ease: easing,
      }}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   SUCCESS MESSAGE
========================================================= */

function SuccessMessage({
  onReset,
}: {
  onReset: () => void;
}) {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <motion.div
      key="success"
      initial={
        shouldReduceMotion
          ? {
              opacity: 0,
            }
          : {
              opacity: 0,
              y: 24,
              scale: 0.985,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: -20,
        scale: 0.985,
      }}
      transition={{
        duration: 0.65,
        ease: easing,
      }}
      className="
        relative
        flex
        min-h-[520px]
        w-full
        flex-col
        items-center
        justify-center
        overflow-hidden
        rounded-2xl

        border
        border-cyan-500/20

        bg-slate-950

        px-6
        py-16

        text-center

        dark:border-cyan-400/15
      "
    >
      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1,
          ease: easing,
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-80
          w-80
          -translate-x-1/2
          -translate-y-1/2
          rounded-full

          bg-cyan-500/[0.07]

          blur-3xl
        "
      />

      {/* =====================================================
          ORBITAL RING
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.5,
          rotate: -20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: 0,
        }}
        transition={{
          duration: 1,
          delay: 0.1,
          ease: easing,
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[35%]

          h-44
          w-44

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          border
          border-cyan-400/[0.10]
        "
      />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: easing,
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[35%]

          h-28
          w-28

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          border
          border-cyan-400/[0.15]
        "
      />

      {/* =====================================================
          HORIZONTAL LIGHT
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          scaleX: 0,
        }}
        animate={{
          opacity: 1,
          scaleX: 1,
        }}
        transition={{
          duration: 0.8,
          delay: 0.25,
          ease: easing,
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[35%]

          h-px
          w-64

          -translate-x-1/2

          bg-gradient-to-r
          from-transparent
          via-cyan-400/[0.14]
          to-transparent
        "
      />

      {/* =====================================================
          ICON
      ===================================================== */}

      <div
        className="
          relative
          mb-10
          flex
          h-28
          w-28
          items-center
          justify-center
        "
      >
        {/* Ripple 1 */}

        {!shouldReduceMotion && (
          <motion.span
            initial={{
              opacity: 0,
              scale: 0.4,
            }}
            animate={{
              opacity: [
                0,
                0.4,
                0,
              ],
              scale: [
                0.55,
                1.3,
                1.65,
              ],
            }}
            transition={{
              delay: 0.65,
              duration: 1.3,
              ease: "easeOut",
            }}
            className="
              absolute
              inset-1
              rounded-full
              border
              border-cyan-400/30
            "
          />
        )}

        {/* Ripple 2 */}

        {!shouldReduceMotion && (
          <motion.span
            initial={{
              opacity: 0,
              scale: 0.4,
            }}
            animate={{
              opacity: [
                0,
                0.25,
                0,
              ],
              scale: [
                0.55,
                1.5,
                1.9,
              ],
            }}
            transition={{
              delay: 0.85,
              duration: 1.4,
              ease: "easeOut",
            }}
            className="
              absolute
              inset-1
              rounded-full
              border
              border-cyan-400/20
            "
          />
        )}

        {/* ===================================================
            MAIN ICON CIRCLE
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.4,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 0.2,
            duration: 0.6,
            ease: easing,
          }}
          className="
            relative
            z-10
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full

            bg-cyan-400

            shadow-[0_0_45px_rgba(34,211,238,0.22)]
          "
        >
          {/* =================================================
              PAPER AIRPLANE
          ================================================= */}

          <motion.div
            initial={
              shouldReduceMotion
                ? {
                    opacity: 0,
                  }
                : {
                    opacity: 0,
                    x: -5,
                    y: 8,
                    rotate: -12,
                    scale: 0.6,
                  }
            }
            animate={
              shouldReduceMotion
                ? {
                    opacity: 0,
                  }
                : {
                    opacity: [
                      0,
                      1,
                      1,
                      0,
                    ],

                    x: [
                      -5,
                      0,
                      14,
                      40,
                    ],

                    y: [
                      8,
                      0,
                      -12,
                      -36,
                    ],

                    rotate: [
                      -12,
                      0,
                      8,
                      16,
                    ],

                    scale: [
                      0.6,
                      1,
                      1,
                      0.78,
                    ],
                  }
            }
            transition={{
              delay: 0.5,
              duration: 1.05,
              times: [
                0,
                0.18,
                0.68,
                1,
              ],
              ease: easing,
            }}
            className="
              absolute
              z-30
            "
          >
            <Send
              className="
                h-8
                w-8
                fill-white
                text-white
              "
              strokeWidth={1.8}
            />
          </motion.div>

          {/* =================================================
              CHECK
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.4,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 1.45,
              duration: 0.45,
              ease: easing,
            }}
            className="
              absolute
              z-20
            "
          >
            <Check
              className="
                h-9
                w-9
                text-white
              "
              strokeWidth={2.5}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* =====================================================
          TITLE
      ===================================================== */}

      <motion.h3
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.05,
          duration: 0.6,
          ease: easing,
        }}
        className="
          relative
          z-10

          text-3xl
          font-semibold
          tracking-[-0.03em]

          text-white

          sm:text-4xl
        "
      >
        THANK YOU
        <span className="text-cyan-400">
          .
        </span>
      </motion.h3>

      {/* =====================================================
          DESCRIPTION
      ===================================================== */}

      <motion.p
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.2,
          duration: 0.6,
          ease: easing,
        }}
        className="
          relative
          z-10

          mt-5

          max-w-[470px]

          text-sm
          leading-7

          text-slate-400
        "
      >
        Your project request has been
        submitted successfully. I&apos;ll
        review the details and get back
        to you as soon as possible.
      </motion.p>

      {/* =====================================================
          STATUS
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 6,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.35,
          duration: 0.5,
          ease: easing,
        }}
        className="
          relative
          z-10

          mt-5

          flex
          items-center
          gap-2

          text-[10px]
          font-semibold
          uppercase
          tracking-[0.18em]

          text-slate-500
        "
      >
        <span
          className="
            h-1.5
            w-1.5
            rounded-full

            bg-cyan-400

            shadow-[0_0_10px_rgba(34,211,238,0.65)]
          "
        />

        MESSAGE DELIVERED
      </motion.div>

      {/* =====================================================
          ANOTHER REQUEST
      ===================================================== */}

      <motion.button
        type="button"
        onClick={onReset}
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.5,
          duration: 0.6,
          ease: easing,
        }}
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                y: -2,
              }
        }
        whileTap={
          shouldReduceMotion
            ? undefined
            : {
                scale: 0.97,
              }
        }
        className="
          relative
          z-10

          mt-8

          text-[11px]
          font-semibold
          uppercase
          tracking-[0.2em]

          text-white

          transition-colors
          duration-300

          hover:text-cyan-400
        "
      >
        Submit another request
      </motion.button>
    </motion.div>
  );
}

/* =========================================================
   CONTACT FORM
========================================================= */

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    isSuccess,
    setIsSuccess,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    turnstileToken,
    setTurnstileToken,
  ] = useState("");

  const shouldReduceMotion =
    useReducedMotion();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: {
      errors,
    },
  } = useForm<ContactFormData>({
    resolver:
      zodResolver(contactSchema),

    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },

    mode: "onBlur",
  });

  const messageValue =
    watch("message") ?? "";

  useLayoutEffect(() => {
    const form = formRef.current;

    if (!form || shouldReduceMotion || isSuccess) {
      return;
    }

    const fields = Array.from(
      form.querySelectorAll<HTMLElement>("[data-contact-field]"),
    );

    const handleFocus = (event: FocusEvent) => {
      gsap.to(event.currentTarget, {
        y: -2,
        duration: 0.22,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleBlur = (event: FocusEvent) => {
      gsap.to(event.currentTarget, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    fields.forEach((field) => {
      field.addEventListener("focus", handleFocus);
      field.addEventListener("blur", handleBlur);
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        form,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.78,
          ease: "power3.out",
          scrollTrigger: {
            trigger: form,
            start: "top 86%",
            once: true,
          },
        },
      );
    }, form);

    return () => {
      fields.forEach((field) => {
        field.removeEventListener("focus", handleFocus);
        field.removeEventListener("blur", handleBlur);
      });

      ctx.revert();
    };
  }, [isSuccess, shouldReduceMotion]);

  /* =======================================================
     RESET
  ======================================================= */

  const handleReset = () => {
    reset();

    setErrorMessage("");
    setTurnstileToken("");
    setIsSubmitting(false);
    setIsSuccess(false);
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const onSubmit = async (
    data: ContactFormData
  ) => {
    if (isSubmitting) {
      return;
    }

    setErrorMessage("");

    /* =====================================================
       TURNSTILE
    ===================================================== */

    if (!turnstileToken) {
      setErrorMessage(
        "Please complete the security verification."
      );

      return;
    }

    setIsSubmitting(true);

    try {
      /* =====================================================
         1. SERVER API
      ===================================================== */

      const response = await fetch(
        "/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name: data.name.trim(),

            email:
              data.email.trim(),

            subject:
              data.subject.trim(),

            message:
              data.message.trim(),

            website:
              data.website ?? "",

            turnstileToken,
          }),
        }
      );

      const result =
        await response
          .json()
          .catch(() => null);

      if (
        !response.ok ||
        !result?.success
      ) {
        throw new Error(
          result?.error ||
            "Unable to send your message."
        );
      }

      /* =====================================================
         2. SAVE TO FIRESTORE
      ===================================================== */

      await addDoc(
        collection(db, "messages"),
        {
          name: data.name.trim(),

          email:
            data.email.trim(),

          subject:
            data.subject.trim(),

          message:
            data.message.trim(),

          createdAt:
            serverTimestamp(),
        }
      );

      console.log(
        "Contact message saved to Firestore."
      );

      /* =====================================================
         3. RESET FORM
      ===================================================== */

      reset();

      setTurnstileToken("");
      setErrorMessage("");
      setIsSubmitting(false);

      /* =====================================================
         4. SUCCESS ANIMATION
      ===================================================== */

      requestAnimationFrame(() => {
        setIsSuccess(true);
      });
    } catch (error) {
      console.error(
        "Contact form submission error:",
        error
      );

      setIsSubmitting(false);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  /* =========================================================
     INPUT STYLES
  ========================================================= */

  const inputClass = `
    w-full
    rounded-xl

    border
    border-slate-900/[0.1]

    bg-slate-950/[0.025]

    px-4
    py-3.5

    text-sm
    text-slate-950

    outline-none

    transition-all
    duration-300

    placeholder:text-slate-400

    hover:border-slate-900/[0.16]

    focus:border-cyan-400
    focus:bg-white/[0.035]
    focus:ring-4
    focus:ring-cyan-400/10

    dark:border-white/[0.09]
    dark:bg-white/[0.025]
    dark:text-white
    dark:placeholder:text-slate-600
    dark:hover:border-white/[0.16]

    disabled:cursor-not-allowed
    disabled:opacity-60
  `;

  const fieldErrorClass = `
    mt-1.5
    text-xs
    text-red-400
  `;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
    >
      {isSuccess ? (
        <SuccessMessage
          key="success-state"
          onReset={handleReset}
        />
      ) : (
        <motion.form
          ref={formRef}
          key="contact-form"
          onSubmit={
            handleSubmit(onSubmit)
          }
          noValidate
          exit={
            shouldReduceMotion
              ? {
                  opacity: 0,
                }
              : {
                  opacity: 0,
                  y: -18,
                  scale: 0.985,
                }
          }
          transition={{
            duration: 0.45,
            ease: easing,
          }}
          className="
            relative
            w-full
          "
        >
          <div className="space-y-6">

            {/* =================================================
                NAME
            ================================================= */}

            <AnimatedField delay={0.05}>
              <div>
                <label
                  htmlFor="name"
                  className="
                    mb-2
                    block

                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.14em]

                    text-slate-400
                  "
                >
                  Name
                </label>

                <input
                  data-contact-field
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  disabled={isSubmitting}
                  {...register("name")}
                  className={inputClass}
                />

                {errors.name && (
                  <p
                    className={
                      fieldErrorClass
                    }
                  >
                    {errors.name.message}
                  </p>
                )}
              </div>
            </AnimatedField>

            {/* =================================================
                EMAIL
            ================================================= */}

            <AnimatedField delay={0.1}>
              <div>
                <label
                  htmlFor="email"
                  className="
                    mb-2
                    block

                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.14em]

                    text-slate-400
                  "
                >
                  Email
                </label>

                <input
                  data-contact-field
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  disabled={isSubmitting}
                  {...register("email")}
                  className={inputClass}
                />

                {errors.email && (
                  <p
                    className={
                      fieldErrorClass
                    }
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>
            </AnimatedField>

            {/* =================================================
                SUBJECT
            ================================================= */}

            <AnimatedField delay={0.15}>
              <div>
                <label
                  htmlFor="subject"
                  className="
                    mb-2
                    block

                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.14em]

                    text-slate-400
                  "
                >
                  Subject
                </label>

                <input
                  data-contact-field
                  id="subject"
                  type="text"
                  placeholder="What would you like to build?"
                  disabled={isSubmitting}
                  {...register("subject")}
                  className={inputClass}
                />

                {errors.subject && (
                  <p
                    className={
                      fieldErrorClass
                    }
                  >
                    {errors.subject.message}
                  </p>
                )}
              </div>
            </AnimatedField>

            {/* =================================================
                MESSAGE
            ================================================= */}

            <AnimatedField delay={0.2}>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="message"
                    className="
                      block

                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.14em]

                      text-slate-400
                    "
                  >
                    Message
                  </label>

                  <span
                    className="
                      text-[10px]
                      tabular-nums
                      text-slate-600
                    "
                  >
                    {messageValue.length}/5000
                  </span>
                </div>

                <textarea
                  data-contact-field
                  id="message"
                  rows={7}
                  placeholder="Tell me a little about your project..."
                  disabled={isSubmitting}
                  {...register("message")}
                  className={`
                    ${inputClass}
                    min-h-[170px]
                    resize-y
                  `}
                />

                {errors.message && (
                  <p
                    className={
                      fieldErrorClass
                    }
                  >
                    {errors.message.message}
                  </p>
                )}
              </div>
            </AnimatedField>

            {/* =================================================
                HONEYPOT
            ================================================= */}

            <div
              aria-hidden="true"
              className="
                absolute
                left-[-9999px]
                h-0
                w-0
                overflow-hidden
              "
            >
              <label htmlFor="website">
                Website
              </label>

              <input
                id="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
              />
            </div>

            {/* =================================================
                TURNSTILE
            ================================================= */}

            <AnimatedField delay={0.25}>
              <motion.div
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: easing,
                }}
                className="
                  flex
                  min-h-[65px]
                  items-center
                  justify-start
                  overflow-hidden
                  rounded-xl

                  border
                  border-cyan-400/10

                  bg-white/[0.02]

                  p-3
                "
              >
                {process.env
                  .NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
                  <Turnstile
                    siteKey={
                      process.env
                        .NEXT_PUBLIC_TURNSTILE_SITE_KEY
                    }
                    options={{
                      theme: "dark",
                      size: "flexible",
                    }}
                    onSuccess={(
                      token
                    ) => {
                      setTurnstileToken(
                        token
                      );

                      setErrorMessage("");
                    }}
                    onExpire={() => {
                      setTurnstileToken(
                        ""
                      );
                    }}
                    onError={() => {
                      setTurnstileToken(
                        ""
                      );

                      setErrorMessage(
                        "Security verification failed. Please try again."
                      );
                    }}
                  />
                ) : (
                  <p
                    className="
                      text-xs
                      text-red-400
                    "
                  >
                    Turnstile site key is
                    not configured.
                  </p>
                )}
              </motion.div>
            </AnimatedField>

            {/* =================================================
                ERROR
            ================================================= */}

            <AnimatePresence
              mode="wait"
            >
              {errorMessage && (
                <motion.div
                  key="form-error"
                  initial={{
                    opacity: 0,
                    height: 0,
                    y: -5,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    y: -5,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: easing,
                  }}
                  className="overflow-hidden"
                >
                  <div
                    role="alert"
                    className="
                      rounded-xl

                      border
                      border-red-400/20

                      bg-red-400/[0.05]

                      px-4
                      py-3

                      text-sm
                      leading-6

                      text-red-400
                    "
                  >
                    {errorMessage}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* =================================================
                SUBMIT
            ================================================= */}

            <AnimatedField delay={0.3}>
              <motion.button
                type="submit"
                disabled={
                  isSubmitting ||
                  !turnstileToken
                }
                whileHover={
                  shouldReduceMotion ||
                  isSubmitting ||
                  !turnstileToken
                    ? undefined
                    : {
                        y: -2,
                      }
                }
                whileTap={
                  shouldReduceMotion ||
                  isSubmitting ||
                  !turnstileToken
                    ? undefined
                    : {
                        scale: 0.985,
                      }
                }
                className="
                  group
                  relative
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2.5
                  overflow-hidden
                  rounded-xl

                  bg-cyan-400

                  px-6
                  py-4

                  text-sm
                  font-semibold

                  text-slate-950

                  shadow-[0_12px_35px_rgba(34,211,238,0.16)]

                  transition-all
                  duration-300

                  hover:bg-cyan-300

                  hover:shadow-[0_16px_45px_rgba(34,211,238,0.24)]

                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  disabled:shadow-none
                "
              >
                {!shouldReduceMotion && (
                  <motion.span
                    initial={{
                      x: "-120%",
                    }}
                    animate={{
                      x: "120%",
                    }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      repeatDelay: 4,
                      ease: "easeInOut",
                    }}
                    className="
                      pointer-events-none
                      absolute
                      inset-y-0
                      w-1/3
                      skew-x-[-20deg]
                      bg-white/[0.12]
                    "
                  />
                )}

                {isSubmitting ? (
                  <>
                    <Loader2
                      className="
                        h-4
                        w-4
                        animate-spin
                      "
                    />

                    <span>
                      Sending message...
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      Send message
                    </span>

                    <Send
                      className="
                        h-4
                        w-4

                        transition-transform
                        duration-300

                        group-hover:translate-x-1
                        group-hover:-translate-y-0.5
                      "
                      strokeWidth={2}
                    />
                  </>
                )}
              </motion.button>
            </AnimatedField>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

/* =========================================================
   DEFAULT EXPORT
========================================================= */

export default ContactForm;
