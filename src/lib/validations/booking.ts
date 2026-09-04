/**
 * Zod schemas for bookings — shared by the API route (server) and the form (client).
 * Author: Avijit Ghosh
 */
import { z } from "zod";

export const APPLIANCE_TYPES = [
  "ac",
  "refrigerator",
  "geyser",
  "microwave",
  "mixer-grinder",
  "induction",
  "pcb-electrical",
  "other",
] as const;
export type ApplianceType = (typeof APPLIANCE_TYPES)[number];

export const APPLIANCE_LABELS: Record<ApplianceType, string> = {
  ac: "AC",
  refrigerator: "Refrigerator",
  geyser: "Geyser",
  microwave: "Microwave Oven",
  "mixer-grinder": "Mixer Grinder",
  induction: "Induction Cooktop",
  "pcb-electrical": "PCB / Electrical",
  other: "Other",
};

const indianMobile = /^[6-9]\d{9}$/;
const zipCode = /^[A-Za-z0-9][A-Za-z0-9 -]{2,9}$/;

const optionalText = (max: number, message: string) =>
  z
    .string()
    .trim()
    .max(max, message)
    .optional()
    .transform((v) => (v ? v : undefined));

export const bookingInputSchema = z.object({
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
    .regex(indianMobile, "Enter a valid 10-digit Indian mobile number"),
  appliance: z.enum(APPLIANCE_TYPES, {
    message: "Select a valid service type",
  }),
  company: optionalText(120, "Company name is too long"),
  country: z.string().trim().min(1, "Select a country"),
  state: z.string().trim().min(1, "Select a state"),
  city: z.string().trim().min(1, "Select a city"),
  zipCode: z.string().trim().regex(zipCode, "Enter a valid zip / postal code"),
  address: z
    .string()
    .trim()
    .min(5, "Address is required")
    .max(300, "Address is too long"),
  landmark: optionalText(150, "Landmark is too long"),
  message: optionalText(1000, "Message is too long"),
  preferredDate: z.coerce
    .date({ message: "Preferred date is invalid" })
    .optional(),
});

export type BookingInput = z.input<typeof bookingInputSchema>;
export type BookingParsed = z.output<typeof bookingInputSchema>;

/** Flatten Zod issues into `{ field: message }` for form display. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_";
    if (!(key in out)) {
      out[key] = issue.message;
    }
  }
  return out;
}
