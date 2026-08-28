import { type InferSchemaType, type Model, model, models, Schema } from "mongoose";

const EnquirySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    phone: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true, maxlength: 1000 },
    status: { type: String, enum: ["new", "read", "closed"], default: "new", index: true },
  },
  { timestamps: true }
);

export type Enquiry = InferSchemaType<typeof EnquirySchema>;

export const EnquiryModel =
  (models.Enquiry as Model<Enquiry> | undefined) ?? model<Enquiry>("Enquiry", EnquirySchema);
