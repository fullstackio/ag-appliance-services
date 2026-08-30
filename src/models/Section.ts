import { type Model, model, models, Schema } from "mongoose";

import { SECTION_KEYS, type Section } from "@/lib/validations/content";

/**
 * One document per section, keyed by `key`. The shape of `items` / extra fields varies per
 * section and is validated by the Zod discriminated union before writes, so the Mongoose schema
 * is intentionally loose (`Mixed`).
 */
const SectionSchema = new Schema(
  {
    key: { type: String, enum: SECTION_KEYS, required: true, unique: true },
    pill: String,
    heading: String,
    headingAccent: String,
    subtitle: String,
    visible: { type: Boolean, default: true },
    items: { type: Schema.Types.Mixed, default: undefined },
    tabs: { type: [String], default: undefined },
    image: String,
    video: String,
    primaryCta: { type: Schema.Types.Mixed, default: undefined },
    secondaryCta: { type: Schema.Types.Mixed, default: undefined },
  },
  { timestamps: true, minimize: false, strict: false },
);

export const SectionModel =
  (models.Section as Model<Section> | undefined) ??
  model<Section>("Section", SectionSchema);
