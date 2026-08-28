import { type Model, model, models, Schema } from "mongoose";

import type { Banner } from "@/lib/validations/content";

const CtaSchema = new Schema({ label: String, href: String }, { _id: false });

const BannerSchema = new Schema<Banner>(
  {
    tag: String,
    heading: { type: String, required: true },
    headingAccent: String,
    text: String,
    primaryCta: CtaSchema,
    secondaryCta: CtaSchema,
    image: { type: String, required: true },
    images: { type: [String], default: [] },
    imagePosition: String,
    badgeText: String,
    cardTitle: String,
    cardText: String,
    trust: { type: [new Schema({ icon: String, label: String }, { _id: false })], default: [] },
    order: { type: Number, default: 0, index: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const BannerModel =
  (models.Banner as Model<Banner> | undefined) ?? model<Banner>("Banner", BannerSchema);
