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
    firstName: { type: String, required: true, trim: true, maxlength: 60 },
    lastName: { type: String, required: true, trim: true, maxlength: 60 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    phone: { type: String, required: true, trim: true, match: /^[6-9]\d{9}$/ },
    appliance: { type: String, required: true, enum: APPLIANCE_TYPES },
    company: { type: String, trim: true, maxlength: 120 },
    country: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    zipCode: { type: String, required: true, trim: true, maxlength: 10 },
    address: { type: String, required: true, trim: true, maxlength: 300 },
    landmark: { type: String, trim: true, maxlength: 150 },
    message: { type: String, trim: true, maxlength: 1000 },
    preferredDate: { type: Date },
    status: {
      type: String,
      enum: ["new", "confirmed", "completed", "cancelled"],
      default: "new",
      index: true,
    },
  },
  { timestamps: true },
);

export type Booking = InferSchemaType<typeof BookingSchema>;
export type BookingDocument = HydratedDocument<Booking>;

// Reuse the compiled model across hot reloads (Next.js dev / serverless)
export const BookingModel =
  (models.Booking as Model<Booking> | undefined) ??
  model<Booking>("Booking", BookingSchema);
