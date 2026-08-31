import {
  type InferSchemaType,
  type Model,
  model,
  models,
  Schema,
} from "mongoose";

const ContactSchema = new Schema(
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
    comment: { type: String, required: true, trim: true, maxlength: 1000 },
    status: {
      type: String,
      enum: ["new", "read", "closed"],
      default: "new",
      index: true,
    },
  },
  { timestamps: true },
);

export type Contact = InferSchemaType<typeof ContactSchema>;

export const ContactModel =
  (models.Contact as Model<Contact> | undefined) ??
  model<Contact>("Contact", ContactSchema);
