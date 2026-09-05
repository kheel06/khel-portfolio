"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Send,
} from "lucide-react";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import {
  useForm,
} from "react-hook-form";
import {
  zodResolver,
} from "@hookform/resolvers/zod";

import { db } from "@/lib/firebase";
import {
  contactSchema,
  type ContactFormData,
} from "@/lib/validations/contact";

/* ============================================================================
   CONTACT FORM
============================================================================ */

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

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
  });

  /* ==========================================================================
     SUBMIT
  ========================================================================== */

  const onSubmit = async (data: ContactFormData) => {
    setStatus("idle");

    try {
      await addDoc(
        collection(db, "messages"),
        {
          name: data.name.trim(),
          email: data.email.trim(),
          subject: data.subject.trim(),
          message: data.message.trim(),
          createdAt: serverTimestamp(),
        },
      );

      reset();
      setStatus("success");
    } catch (error) {
      console.error(
        "Contact form submission failed:",
        error,
      );

      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
    >
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
          placeholder="What would you like to discuss?"
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
          SUCCESS MESSAGE
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
          ERROR MESSAGE
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
          Something went wrong while sending your
          message. Please try again.
        </div>
      )}

      {/* ======================================================================
          SUBMIT BUTTON
      ====================================================================== */}

      <button
        type="submit"
        disabled={isSubmitting}
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

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-cyan-500/40
          focus-visible:ring-offset-2
          focus-visible:ring-offset-slate-50

          active:translate-y-0

          disabled:cursor-not-allowed
          disabled:opacity-60
          disabled:hover:translate-y-0

          dark:bg-cyan-400
          dark:hover:bg-cyan-300
          dark:focus-visible:ring-cyan-400/40
          dark:focus-visible:ring-offset-[#070b14]
        "
      >
        {isSubmitting ? (
          <>
            <Loader2
              size={17}
              className="animate-spin"
            />

            Sending...
          </>
        ) : (
          <>
            Send Message

            <Send size={16} />
          </>
        )}
      </button>
    </form>
  );
}