import { handle, ok, parseBody, requireUser, revalidateSite } from "@/lib/api-helpers";
import { connectDB } from "@/lib/db/mongoose";
import { bannerSchema } from "@/lib/validations/content";
import { BannerModel } from "@/models/Banner";

export const dynamic = "force-dynamic";

export const GET = handle(async () => {
  await requireUser();
  await connectDB();
  return ok(await BannerModel.find().sort({ order: 1, createdAt: 1 }).lean());
});

export const POST = handle(async (req) => {
  await requireUser();
  const data = await parseBody(req, bannerSchema);
  await connectDB();
  const count = await BannerModel.countDocuments();
  const doc = await BannerModel.create({ ...data, order: data.order || count });
  revalidateSite();
  return ok(doc.toObject(), 201);
});
