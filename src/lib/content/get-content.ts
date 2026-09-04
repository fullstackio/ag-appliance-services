import "server-only";

import { cache } from "react";

import { connectDB } from "@/lib/db/mongoose";
import { logger } from "@/lib/logger";
import {
  MENU_LOCATIONS,
  SECTION_KEYS,
  type Banner,
  type Menu,
  type MenuLocation,
  type SectionKey,
  type SectionOf,
  type SiteContent,
  type SiteSettings,
} from "@/lib/validations/content";
import { BannerModel } from "@/models/Banner";
import { MenuModel } from "@/models/Menu";
import { SectionModel } from "@/models/Section";
import { SiteSettingsModel } from "@/models/SiteSettings";

import {
  defaultBanners,
  defaultMenus,
  defaultSections,
  defaultSettings,
} from "./defaults";

function strip<T>(doc: unknown): T {
  // Drop Mongo internals so the payload is serialisable for Server → Client components
  const rest = { ...(doc as Record<string, unknown>) };
  for (const k of ["_id", "__v", "createdAt", "updatedAt"]) {
    delete rest[k];
  }
  return rest as T;
}

/**
 * Loads everything the public page needs. Any missing document falls back to the mockup
 * defaults; if MongoDB is unreachable the whole default content is returned so the site
 * never goes blank.
 */
async function loadSiteContent(): Promise<SiteContent> {
  try {
    await connectDB();
    const [settingsDoc, menuDocs, bannerDocs, sectionDocs] = await Promise.all([
      SiteSettingsModel.findOne().lean(),
      MenuModel.find().lean(),
      BannerModel.find({ active: true }).sort({ order: 1 }).lean(),
      SectionModel.find().lean(),
    ]);

    const settings: SiteSettings = settingsDoc
      ? { ...defaultSettings, ...strip<Partial<SiteSettings>>(settingsDoc) }
      : defaultSettings;

    const menus = Object.fromEntries(
      MENU_LOCATIONS.map((loc) => {
        const found = menuDocs.find((m) => m.location === loc);
        return [loc, found ? strip<Menu>(found) : defaultMenus[loc]];
      }),
    ) as Record<MenuLocation, Menu>;

    const banners: Banner[] = bannerDocs.length
      ? bannerDocs.map((b) => strip<Banner>(b))
      : defaultBanners;

    const sections = Object.fromEntries(
      SECTION_KEYS.map((key) => {
        const found = sectionDocs.find((s) => s.key === key);
        return [
          key,
          found ? strip<SectionOf<SectionKey>>(found) : defaultSections[key],
        ];
      }),
    ) as SiteContent["sections"];

    return { settings, menus, banners, sections };
  } catch (err) {
    // Missing MONGODB_URI is an expected, already-handled state in local/preview setups
    // without a database configured — the defaults below are the intended fallback, so it's
    // only worth a warning. A real connection failure (auth, network, timeout) stays an error.
    const message = err instanceof Error ? err.message : String(err);
    const isUnconfigured = message.includes("MONGODB_URI is not set");
    logger[isUnconfigured ? "warn" : "error"](
      "getSiteContent failed — serving default content",
      { error: message },
    );
    return {
      settings: defaultSettings,
      menus: defaultMenus,
      banners: defaultBanners,
      sections: defaultSections,
    };
  }
}

/** Per-request memoised — layout, page and metadata share one load. */
export const getSiteContent = cache(loadSiteContent);
