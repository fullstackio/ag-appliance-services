/**
 * Zod schema for the "Get In Touch" contact form — shared by the API route (server) and
 * the modal (client).
 */
import { z } from "zod";

export const contactInputSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(60, "First name is too long"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(60, "Last name is too long"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  comment: z
    .string()
    .trim()
    .min(5, "Comment is required")
    .max(1000, "Comment is too long"),
});

export type ContactInput = z.input<typeof contactInputSchema>;
export type ContactParsed = z.output<typeof contactInputSchema>;
