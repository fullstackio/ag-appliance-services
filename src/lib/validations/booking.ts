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

export const bookingInputSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80, "Name is too long"),
  phone: z.string().trim().regex(indianMobile, "Enter a valid 10-digit Indian mobile number"),
  appliance: z.enum(APPLIANCE_TYPES, { message: "Select a valid appliance type" }),
  address: z.string().trim().min(5, "Address is required").max(300, "Address is too long"),
  message: z
    .string()
    .trim()
    .max(1000, "Message is too long")
    .optional()
    .transform((v) => (v ? v : undefined)),
  preferredDate: z.coerce.date({ message: "Preferred date is invalid" }).optional(),
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
