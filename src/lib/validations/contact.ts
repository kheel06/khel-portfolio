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
    .max(320, "Email address is too long."),

  subject: z
    .string()
    .trim()
    .min(2, "Please enter a subject.")
    .max(200, "Subject is too long."),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(5000, "Message is too long."),
});

export type ContactFormData = z.infer<typeof contactSchema>;