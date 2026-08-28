import { handle, ok, parseBody, requireUser, revalidateSite } from "@/lib/api-helpers";
import { defaultSettings } from "@/lib/content/defaults";
import { connectDB } from "@/lib/db/mongoose";
import { siteSettingsSchema } from "@/lib/validations/content";
import { SiteSettingsModel } from "@/models/SiteSettings";

export const dynamic = "force-dynamic";

export const GET = handle(async () => {
  await requireUser();
  await connectDB();
  const doc = await SiteSettingsModel.findOne().lean();
  return ok(doc ? { ...defaultSettings, ...doc } : defaultSettings);
});

export const PUT = handle(async (req) => {
  await requireUser();
  const data = await parseBody(req, siteSettingsSchema);
  await connectDB();
  const doc = await SiteSettingsModel.findOneAndUpdate({}, data, {
    upsert: true,
    new: true,
    runValidators: true,
  }).lean();
  revalidateSite();
  return ok(doc);
});
