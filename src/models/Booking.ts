import {
  type HydratedDocument,
  type InferSchemaType,
  type Model,
  model,
  models,
  Schema,
} from "mongoose";

import { APPLIANCE_TYPES } from "@/lib/validations/booking";

const BookingSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    phone: { type: String, required: true, trim: true, match: /^[6-9]\d{9}$/ },
    appliance: { type: String, required: true, enum: APPLIANCE_TYPES },
    address: { type: String, required: true, trim: true, maxlength: 300 },
    message: { type: String, trim: true, maxlength: 1000 },
    preferredDate: { type: Date },
    status: {
      type: String,
      enum: ["new", "confirmed", "completed", "cancelled"],
      default: "new",
      index: true,
    },
  },
  { timestamps: true }
);

export type Booking = InferSchemaType<typeof BookingSchema>;
export type BookingDocument = HydratedDocument<Booking>;

// Reuse the compiled model across hot reloads (Next.js dev / serverless)
export const BookingModel =
  (models.Booking as Model<Booking> | undefined) ?? model<Booking>("Booking", BookingSchema);
