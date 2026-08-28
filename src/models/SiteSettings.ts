import { type Model, model, models, Schema } from "mongoose";

import type { SiteSettings } from "@/lib/validations/content";

const SiteSettingsSchema = new Schema<SiteSettings>(
  {
    businessName: String,
    brandLine1: String,
    brandLine2: String,
    tagline: String,
    phone: String,
    whatsapp: String,
    email: String,
    address: String,
    hours: String,
    since: String,
    logo: String,
    footerAbout: String,
    social: { facebook: String, instagram: String, whatsapp: String, google: String },
    googleBusinessUrl: String,
    copyright: String,
    legalText: String,
    seoTitle: String,
    seoDescription: String,
  },
  { timestamps: true, minimize: false }
);

export const SiteSettingsModel =
  (models.SiteSettings as Model<SiteSettings> | undefined) ??
  model<SiteSettings>("SiteSettings", SiteSettingsSchema);
