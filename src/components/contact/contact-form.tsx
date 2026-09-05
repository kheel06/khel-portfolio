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
   TYPES
============================================================================ */

type FormStatus = "idle" | "success" | "error";

/* ============================================================================
   CONTACT FORM
============================================================================ */

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

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

    const payload = {
      name: data.name.trim(),
      email: data.email.trim(),
      subject: data.subject.trim(),
      message: data.message.trim(),
    };

    try {
      /* ----------------------------------------------------------------------
         1. SAVE MESSAGE TO FIRESTORE
      ---------------------------------------------------------------------- */

      await addDoc(
        collection(db, "messages"),
        {
          ...payload,
          createdAt: serverTimestamp(),
        },
      );

      /* ----------------------------------------------------------------------
         2. SEND EMAIL NOTIFICATION
         
         This calls:
         /api/contact

         Your API route should use Brevo SMTP + Nodemailer.
      ---------------------------------------------------------------------- */

      const emailResponse = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      /*
        If the email endpoint fails, the Firestore message has still
        been saved successfully. We log the problem but don't tell
        the visitor that their message was completely lost.
      */

      if (!emailResponse.ok) {
        console.error(
          "Email notification failed:",
          await emailResponse.text().catch(() => ""),
        );
      }

      /* ----------------------------------------------------------------------
         3. RESET FORM
      ---------------------------------------------------------------------- */

      reset();

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

          active:translate-y-0

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-cyan-500/40
          focus-visible:ring-offset-2
          focus-visible:ring-offset-slate-50

          disabled:cursor-not-allowed
          disabled:opacity-60
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