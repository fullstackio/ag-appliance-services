import { isValidObjectId } from "mongoose";

import { handle, HttpError, ok, parseBody, requireUser, revalidateSite } from "@/lib/api-helpers";
import { connectDB } from "@/lib/db/mongoose";
import { bannerSchema } from "@/lib/validations/content";
import { BannerModel } from "@/models/Banner";

export const dynamic = "force-dynamic";

async function id(ctx: { params: Promise<Record<string, string>> }) {
  const { id: raw } = await ctx.params;
  if (!isValidObjectId(raw)) {
    throw new HttpError(404, "Banner not found");
  }
  return raw;
}

export const PATCH = handle(async (req, ctx) => {
  await requireUser();
  const bannerId = await id(ctx);
  const data = await parseBody(req, bannerSchema.partial());
  await connectDB();
  const doc = await BannerModel.findByIdAndUpdate(bannerId, data, { new: true }).lean();
  if (!doc) {
    throw new HttpError(404, "Banner not found");
  }
  revalidateSite();
  return ok(doc);
});

export const DELETE = handle(async (_req, ctx) => {
  await requireUser();
  const bannerId = await id(ctx);
  await connectDB();
  const doc = await BannerModel.findByIdAndDelete(bannerId).lean();
  if (!doc) {
    throw new HttpError(404, "Banner not found");
  }
  revalidateSite();
  return ok({ id: bannerId });
});
