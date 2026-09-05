import { z } from "zod";

export const contactSchema = z.object({
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
    .min(10, "Please enter at least 10 characters.")
    .max(5000, "Message is too long."),

  /*
   * Honeypot anti-spam field.
   *
   * Normal visitors should leave this empty.
   * Automated bots that fill hidden fields can be detected
   * and rejected by /api/contact.
   */
  website: z
    .string()
    .max(0, "Invalid submission.")
    .optional(),
});

export type ContactFormData =
  z.infer<typeof contactSchema>;