"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Send,
} from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";

import { db } from "@/lib/firebase";
import {
  contactSchema,
  type ContactFormData,
} from "@/lib/validations/contact";

/* ============================================================================
   TYPES
============================================================================ */

type FormStatus = "idle" | "success" | "error";

/* ============================================================================
   CONTACT FORM
============================================================================ */

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [turnstileToken, setTurnstileToken] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  /* ==========================================================================
     SUBMIT
  ========================================================================== */

  const onSubmit = async (data: ContactFormData) => {
    if (isSubmitting) {
      return;
    }

    setStatus("idle");

    /*
     * Turnstile must be completed before submitting.
     */
    if (!turnstileToken) {
      setStatus("error");
      return;
    }

    const payload = {
      name: data.name.trim(),
      email: data.email.trim(),
      subject: data.subject.trim(),
      message: data.message.trim(),

      /*
       * Honeypot.
       *
       * This field is intentionally never rendered visibly.
       * Bots that automatically fill every input may populate it.
       */
      website: "",
      
      /*
       * Cloudflare Turnstile token.
       */
      turnstileToken,
    };

    try {
      /* ----------------------------------------------------------------------
         1. SEND TO SECURE SERVER API

         The API performs:

         - Turnstile verification
         - Honeypot validation
         - Rate limiting
         - Server-side validation
         - Spam checks
         - Brevo email delivery
      ---------------------------------------------------------------------- */

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        console.error(
          "Contact API rejected submission:",
          result,
        );

        setStatus("error");

        return;
      }

      /* ----------------------------------------------------------------------
         2. SAVE VERIFIED MESSAGE TO FIRESTORE

         IMPORTANT:

         We only save after the server accepts the submission.
      ---------------------------------------------------------------------- */

      await addDoc(
        collection(db, "messages"),
        {
          name: payload.name,
          email: payload.email,
          subject: payload.subject,
          message: payload.message,
          createdAt: serverTimestamp(),
        },
      );

      /* ----------------------------------------------------------------------
         3. RESET FORM
      ---------------------------------------------------------------------- */

      reset();

      /*
       * Turnstile tokens are single-use.
       *
       * Clear our local token so another submission requires
       * a fresh token.
       */
      setTurnstileToken("");

      /* ----------------------------------------------------------------------
         4. SUCCESS
      ---------------------------------------------------------------------- */

      setStatus("success");
    } catch (error) {
      console.error(
        "Contact form submission failed:",
        error,
      );

      setStatus("error");
    }
  };

  /* ==========================================================================
     RENDER
  ========================================================================== */

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
    >
      {/* ======================================================================
          HONEYPOT
      ====================================================================== */}

      <div
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
        aria-hidden="true"
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

      {/* ======================================================================
          NAME
      ====================================================================== */}

      <div>
        <label
          htmlFor="name"
          className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-700
            dark:text-slate-300
          "
        >
          Name
        </label>

        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          disabled={isSubmitting}
          {...register("name")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={
            errors.name
              ? "name-error"
              : undefined
          }
          className="
            w-full
            rounded-xl
            border
            border-slate-900/[0.10]
            bg-slate-50
            px-4
            py-3
            text-sm
            text-slate-950
            outline-none
            transition-all
            duration-200

            placeholder:text-slate-400

            hover:border-slate-900/[0.15]

            focus:border-cyan-500/50
            focus:bg-white
            focus:ring-2
            focus:ring-cyan-500/10

            disabled:cursor-not-allowed
            disabled:opacity-60

            dark:border-white/[0.08]
            dark:bg-white/[0.025]
            dark:text-white
            dark:placeholder:text-slate-600

            dark:hover:border-white/[0.12]

            dark:focus:border-cyan-400/50
            dark:focus:bg-white/[0.035]
            dark:focus:ring-cyan-400/10
          "
        />

        {errors.name && (
          <p
            id="name-error"
            role="alert"
            className="
              mt-2
              text-xs
              text-red-600
              dark:text-red-400
            "
          >
            {errors.name.message}
          </p>
        )}
      </div>

      {/* ======================================================================
          EMAIL
      ====================================================================== */}

      <div>
        <label
          htmlFor="email"
          className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-700
            dark:text-slate-300
          "
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          disabled={isSubmitting}
          {...register("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={
            errors.email
              ? "email-error"
              : undefined
          }
          className="
            w-full
            rounded-xl
            border
            border-slate-900/[0.10]
            bg-slate-50
            px-4
            py-3
            text-sm
            text-slate-950
            outline-none
            transition-all
            duration-200

            placeholder:text-slate-400

            hover:border-slate-900/[0.15]

            focus:border-cyan-500/50
            focus:bg-white
            focus:ring-2
            focus:ring-cyan-500/10

            disabled:cursor-not-allowed
            disabled:opacity-60

            dark:border-white/[0.08]
            dark:bg-white/[0.025]
            dark:text-white
            dark:placeholder:text-slate-600

            dark:hover:border-white/[0.12]

            dark:focus:border-cyan-400/50
            dark:focus:bg-white/[0.035]
            dark:focus:ring-cyan-400/10
          "
        />

        {errors.email && (
          <p
            id="email-error"
            role="alert"
            className="
              mt-2
              text-xs
              text-red-600
              dark:text-red-400
            "
          >
            {errors.email.message}
          </p>
        )}
      </div>

      {/* ======================================================================
          SUBJECT
      ====================================================================== */}

      <div>
        <label
          htmlFor="subject"
          className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-700
            dark:text-slate-300
          "
        >
          Subject
        </label>

        <input
          id="subject"
          type="text"
          autoComplete="off"
          placeholder="What would you like to discuss?"
          disabled={isSubmitting}
          {...register("subject")}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={
            errors.subject
              ? "subject-error"
              : undefined
          }
          className="
            w-full
            rounded-xl
            border
            border-slate-900/[0.10]
            bg-slate-50
            px-4
            py-3
            text-sm
            text-slate-950
            outline-none
            transition-all
            duration-200

            placeholder:text-slate-400

            hover:border-slate-900/[0.15]

            focus:border-cyan-500/50
            focus:bg-white
            focus:ring-2
            focus:ring-cyan-500/10

            disabled:cursor-not-allowed
            disabled:opacity-60

            dark:border-white/[0.08]
            dark:bg-white/[0.025]
            dark:text-white
            dark:placeholder:text-slate-600

            dark:hover:border-white/[0.12]

            dark:focus:border-cyan-400/50
            dark:focus:bg-white/[0.035]
            dark:focus:ring-cyan-400/10
          "
        />

        {errors.subject && (
          <p
            id="subject-error"
            role="alert"
            className="
              mt-2
              text-xs
              text-red-600
              dark:text-red-400
            "
          >
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* ======================================================================
          MESSAGE
      ====================================================================== */}

      <div>
        <label
          htmlFor="message"
          className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-700
            dark:text-slate-300
          "
        >
          Message
        </label>

        <textarea
          id="message"
          rows={6}
          placeholder="Tell me about your project..."
          disabled={isSubmitting}
          {...register("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message
              ? "message-error"
              : undefined
          }
          className="
            w-full
            resize-none
            rounded-xl
            border
            border-slate-900/[0.10]
            bg-slate-50
            px-4
            py-3
            text-sm
            leading-6
            text-slate-950
            outline-none
            transition-all
            duration-200

            placeholder:text-slate-400

            hover:border-slate-900/[0.15]

            focus:border-cyan-500/50
            focus:bg-white
            focus:ring-2
            focus:ring-cyan-500/10

            disabled:cursor-not-allowed
            disabled:opacity-60

            dark:border-white/[0.08]
            dark:bg-white/[0.025]
            dark:text-white
            dark:placeholder:text-slate-600

            dark:hover:border-white/[0.12]

            dark:focus:border-cyan-400/50
            dark:focus:bg-white/[0.035]
            dark:focus:ring-cyan-400/10
          "
        />

        {errors.message && (
          <p
            id="message-error"
            role="alert"
            className="
              mt-2
              text-xs
              text-red-600
              dark:text-red-400
            "
          >
            {errors.message.message}
          </p>
        )}
      </div>

      {/* ======================================================================
          TURNSTILE
      ====================================================================== */}

      <div className="pt-1">
        <Turnstile
          siteKey={
            process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""
          }
          options={{
            theme: "auto",
            size: "flexible",
          }}
          onSuccess={(token) => {
            setTurnstileToken(token);
            setStatus("idle");
          }}
          onError={() => {
            setTurnstileToken("");
            setStatus("error");
          }}
          onExpire={() => {
            setTurnstileToken("");
          }}
        />
      </div>

      {/* ======================================================================
          SUCCESS
      ====================================================================== */}

      {status === "success" && (
        <div
          role="status"
          aria-live="polite"
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-emerald-500/20
            bg-emerald-50
            px-4
            py-3
            text-sm
            text-emerald-700

            dark:border-emerald-400/20
            dark:bg-emerald-400/[0.06]
            dark:text-emerald-300
          "
        >
          <CheckCircle2
            size={18}
            className="shrink-0"
          />

          <span>
            Message sent successfully. I&apos;ll get
            back to you soon.
          </span>
        </div>
      )}

      {/* ======================================================================
          ERROR
      ====================================================================== */}

      {status === "error" && (
        <div
          role="alert"
          aria-live="assertive"
          className="
            rounded-xl
            border
            border-red-500/20
            bg-red-50
            px-4
            py-3
            text-sm
            text-red-700

            dark:border-red-400/20
            dark:bg-red-400/[0.06]
            dark:text-red-300
          "
        >
          {!turnstileToken
            ? "Please complete the security verification and try again."
            : "Something went wrong while sending your message. Please try again."}
        </div>
      )}

      {/* ======================================================================
          SUBMIT
      ====================================================================== */}

      <button
        type="submit"
        disabled={isSubmitting || !turnstileToken}
        className="
          inline-flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl

          bg-cyan-500
          px-5
          py-3

          text-sm
          font-semibold
          text-slate-950

          shadow-[0_8px_24px_rgba(6,182,212,0.12)]

          transition-all
          duration-200

          hover:-translate-y-0.5
          hover:bg-cyan-400
          hover:shadow-[0_12px_30px_rgba(6,182,212,0.18)]

          active:translate-y-0

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-cyan-500/40
          focus-visible:ring-offset-2
          focus-visible:ring-offset-slate-50

          disabled:cursor-not-allowed
          disabled:opacity-50
          disabled:hover:translate-y-0
          disabled:hover:bg-cyan-500

          dark:bg-cyan-400
          dark:hover:bg-cyan-300
          dark:disabled:hover:bg-cyan-400
          dark:focus-visible:ring-cyan-400/40
          dark:focus-visible:ring-offset-[#070b14]
        "
      >
        {isSubmitting ? (
          <>
            <Loader2
              size={17}
              className="animate-spin"
              aria-hidden="true"
            />

            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>

            <Send
              size={16}
              aria-hidden="true"
            />
          </>
        )}
      </button>
    </form>
  );
}