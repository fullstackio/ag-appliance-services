/**
 * Seed MongoDB with the approved mockup content (idempotent — only fills missing documents
 * unless --force is passed, which overwrites everything).
 *
 *   npm run db:seed            # fill missing
 *   npm run db:seed -- --force # reset content to mockup defaults
 *
 * Author: Avijit Ghosh
 */
import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import mongoose from "mongoose";

import {
  defaultBanners,
  defaultMenus,
  defaultSections,
  defaultSettings,
} from "../src/lib/content/defaults";
import { BannerModel } from "../src/models/Banner";
import { MenuModel } from "../src/models/Menu";
import { SectionModel } from "../src/models/Section";
import { SiteSettingsModel } from "../src/models/SiteSettings";

const force = process.argv.includes("--force");

async function main(): Promise<void> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI missing in .env");
  }
  await mongoose.connect(uri, { dbName: process.env.MONGODB_DB ?? "ag_appliance" });
  console.log(`Connected to ${mongoose.connection.name} (force=${force})`);

  // settings (single doc)
  if (force || !(await SiteSettingsModel.exists({}))) {
    await SiteSettingsModel.deleteMany({});
    await SiteSettingsModel.create(defaultSettings);
    console.log("✓ settings");
  }

  // menus
  for (const menu of Object.values(defaultMenus)) {
    if (force || !(await MenuModel.exists({ location: menu.location }))) {
      await MenuModel.findOneAndUpdate({ location: menu.location }, menu, { upsert: true });
      console.log(`✓ menu:${menu.location}`);
    }
  }

  // banners
  if (force || (await BannerModel.countDocuments()) === 0) {
    await BannerModel.deleteMany({});
    await BannerModel.insertMany(defaultBanners);
    console.log(`✓ banners (${defaultBanners.length})`);
  }

  // sections
  for (const section of Object.values(defaultSections)) {
    if (force || !(await SectionModel.exists({ key: section.key }))) {
      await SectionModel.findOneAndUpdate({ key: section.key }, section, { upsert: true });
      console.log(`✓ section:${section.key}`);
    }
  }

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
