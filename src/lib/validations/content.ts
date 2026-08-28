/**
 * Zod schemas + TS types for every piece of CMS content.
 * Single source of truth shared by Mongoose models, API routes, dashboard forms and the site.
 * Author: Avijit Ghosh
 */
import { z } from "zod";

// ---- icons available to content editors (rendered by components/site/icons.tsx) ----
export const ICON_KEYS = [
  "tool",
  "clock",
  "rupee",
  "thumbs",
  "users",
  "shield",
  "pin",
  "headset",
  "ac",
  "fridge",
  "geyser",
  "microwave",
  "mixer",
  "induction",
  "pcb",
  "install",
  "snow",
  "gear",
  "home",
  "list",
  "phone",
  "user",
  "cog",
  "check",
] as const;
export const iconKeySchema = z.enum(ICON_KEYS);
export type IconKey = z.infer<typeof iconKeySchema>;

const shortText = z.string().trim().min(1).max(160);
const longText = z.string().trim().max(2000);
const url = z.string().trim().max(500);
const imagePath = z.string().trim().min(1).max(500);

export const ctaSchema = z.object({
  label: shortText,
  href: url.default("#book"),
});
export type Cta = z.infer<typeof ctaSchema>;

// ---------------------------------------------------------------- site settings
export const siteSettingsSchema = z.object({
  businessName: shortText.default("AG Appliance Services"),
  brandLine1: shortText.default("AG APPLIANCE"),
  brandLine2: shortText.default("SERVICES"),
  tagline: shortText.default("RELIABLE • QUALITY • TRUSTED"),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "10-digit Indian mobile"),
  whatsapp: z
    .string()
    .trim()
    .regex(/^\d{10,13}$/, "Digits only, with country code optional"),
  email: z.string().trim().email(),
  address: shortText.default("Kolkata, West Bengal, India"),
  hours: shortText.default("8 AM – 9 PM, All Days"),
  since: z.string().trim().max(10).default("2026"),
  logo: imagePath.default("/images/logo.png"),
  footerAbout: longText.default(""),
  social: z
    .object({
      facebook: url.default(""),
      instagram: url.default(""),
      whatsapp: url.default(""),
      google: url.default(""),
    })
    .default({ facebook: "", instagram: "", whatsapp: "", google: "" }),
  googleBusinessUrl: url.default(""),
  // rendered as "© {current year} {copyright}" — never store the year, it is added at render time
  copyright: shortText.default("AG Appliance Services. All Rights Reserved."),
  legalText: shortText.default("Privacy Policy • Terms & Conditions"),
  seoTitle: shortText.default("AG Appliance Services — Appliance Repair in Kolkata"),
  seoDescription: longText.default(""),
});
export type SiteSettings = z.infer<typeof siteSettingsSchema>;

// ---------------------------------------------------------------- menus
export const MENU_LOCATIONS = ["header", "footerQuick", "footerServices"] as const;
export const menuLocationSchema = z.enum(MENU_LOCATIONS);
export type MenuLocation = z.infer<typeof menuLocationSchema>;

export const menuItemSchema = z.object({
  id: z.string().trim().min(1).max(40),
  label: shortText,
  href: url.default("#"),
  visible: z.boolean().default(true),
  children: z
    .array(
      z.object({
        id: z.string().trim().min(1).max(40),
        label: shortText,
        href: url.default("#"),
        visible: z.boolean().default(true),
      })
    )
    .default([]),
});
export type MenuItem = z.infer<typeof menuItemSchema>;

export const menuSchema = z.object({
  location: menuLocationSchema,
  title: shortText.optional(),
  items: z.array(menuItemSchema).default([]),
});
export type Menu = z.infer<typeof menuSchema>;

// ---------------------------------------------------------------- banners (hero)
export const bannerSchema = z.object({
  tag: shortText.default("RELIABLE • QUALITY • TRUSTED"),
  heading: shortText, // may contain "\n" for a line break
  headingAccent: shortText.default(""),
  text: longText,
  primaryCta: ctaSchema,
  secondaryCta: ctaSchema.optional(),
  image: imagePath,
  /** Extra slides for the hero slider (the main `image` is always the first slide). */
  images: z.array(imagePath).max(6).default([]),
  imagePosition: z.string().trim().max(40).default("60% 30%"),
  badgeText: shortText.default("SAME-DAY SERVICE"),
  cardTitle: shortText.default("EXPERT TECHNICIANS"),
  cardText: shortText.default("Ready to fix your appliances"),
  trust: z
    .array(z.object({ icon: iconKeySchema, label: shortText }))
    .max(4)
    .default([]),
  order: z.number().int().min(0).default(0),
  active: z.boolean().default(true),
});
export type Banner = z.infer<typeof bannerSchema>;

// ---------------------------------------------------------------- sections
export const SECTION_KEYS = [
  "stats",
  "services",
  "serviceCategories",
  "why",
  "steps",
  "video",
  "testimonials",
  "gallery",
  "brands",
  "areas",
  "faqs",
  "cta",
] as const;
export const sectionKeySchema = z.enum(SECTION_KEYS);
export type SectionKey = z.infer<typeof sectionKeySchema>;

const baseSection = {
  pill: shortText.optional(),
  heading: shortText.optional(),
  headingAccent: shortText.optional(),
  subtitle: longText.optional(),
  visible: z.boolean().default(true),
};

export const statItemSchema = z.object({ icon: iconKeySchema, value: shortText, label: shortText });
export const serviceItemSchema = z.object({
  icon: iconKeySchema,
  title: shortText,
  subtitle: shortText,
  href: url.default("#book"),
});
export const serviceCategorySchema = z.object({
  icon: iconKeySchema,
  title: shortText,
  chips: z.array(shortText).default([]),
});
export const whyItemSchema = z.object({ icon: iconKeySchema, title: shortText, text: longText });
export const stepItemSchema = z.object({ icon: iconKeySchema, title: shortText, text: longText });
export const testimonialSchema = z.object({
  quote: longText,
  name: shortText,
  location: shortText,
  rating: z.number().int().min(1).max(5).default(5),
});
export const GALLERY_SIZES = ["normal", "big", "tall", "wide"] as const;
export const galleryItemSchema = z.object({
  image: imagePath,
  chip: shortText,
  title: shortText,
  subtitle: shortText,
  category: shortText.default("All"),
  size: z.enum(GALLERY_SIZES).default("normal"),
  feature: z.boolean().default(false),
});
export const brandItemSchema = z.object({ name: shortText, logo: imagePath });
export const areaItemSchema = z.object({ name: shortText });
export const faqItemSchema = z.object({ question: shortText, answer: longText });
export const videoSchema = z.object({
  ...baseSection,
  image: imagePath.default("/images/gallery-3.jpg"),
  primaryCta: ctaSchema,
  secondaryCta: ctaSchema.optional(),
});
export const ctaSectionSchema = z.object({
  ...baseSection,
  primaryCta: ctaSchema,
  secondaryCta: ctaSchema.optional(),
});
export const gallerySchema = z.object({
  ...baseSection,
  tabs: z.array(shortText).default(["All"]),
  items: z.array(galleryItemSchema).default([]),
});

/** Discriminated by `key`; every section is stored as one document. */
export const sectionSchema = z.discriminatedUnion("key", [
  z.object({ key: z.literal("stats"), ...baseSection, items: z.array(statItemSchema) }),
  z.object({ key: z.literal("services"), ...baseSection, items: z.array(serviceItemSchema) }),
  z.object({
    key: z.literal("serviceCategories"),
    ...baseSection,
    items: z.array(serviceCategorySchema),
  }),
  z.object({ key: z.literal("why"), ...baseSection, items: z.array(whyItemSchema) }),
  z.object({ key: z.literal("steps"), ...baseSection, items: z.array(stepItemSchema) }),
  z.object({ key: z.literal("video"), ...videoSchema.shape }),
  z.object({ key: z.literal("testimonials"), ...baseSection, items: z.array(testimonialSchema) }),
  z.object({ key: z.literal("gallery"), ...gallerySchema.shape }),
  z.object({ key: z.literal("brands"), ...baseSection, items: z.array(brandItemSchema) }),
  z.object({ key: z.literal("areas"), ...baseSection, items: z.array(areaItemSchema) }),
  z.object({ key: z.literal("faqs"), ...baseSection, items: z.array(faqItemSchema) }),
  z.object({ key: z.literal("cta"), ...ctaSectionSchema.shape }),
]);
export type Section = z.infer<typeof sectionSchema>;
export type SectionOf<K extends SectionKey> = Extract<Section, { key: K }>;

// ---------------------------------------------------------------- enquiries (contact form)
export const enquiryInputSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  message: z.string().trim().min(5).max(1000),
});
export type EnquiryInput = z.infer<typeof enquiryInputSchema>;

// ---------------------------------------------------------------- whole-page payload
export interface SiteContent {
  settings: SiteSettings;
  menus: Record<MenuLocation, Menu>;
  banners: Banner[];
  sections: { [K in SectionKey]: SectionOf<K> };
}
