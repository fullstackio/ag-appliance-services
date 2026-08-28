import { handle, HttpError, ok, parseBody, requireUser, revalidateSite } from "@/lib/api-helpers";
import { defaultMenus } from "@/lib/content/defaults";
import { connectDB } from "@/lib/db/mongoose";
import { menuLocationSchema, menuSchema } from "@/lib/validations/content";
import { MenuModel } from "@/models/Menu";

export const dynamic = "force-dynamic";

async function location(ctx: { params: Promise<Record<string, string>> }) {
  const { location: raw } = await ctx.params;
  const parsed = menuLocationSchema.safeParse(raw);
  if (!parsed.success) {
    throw new HttpError(404, "Unknown menu location");
  }
  return parsed.data;
}

export const GET = handle(async (_req, ctx) => {
  await requireUser();
  const loc = await location(ctx);
  await connectDB();
  const doc = await MenuModel.findOne({ location: loc }).lean();
  return ok(doc ?? defaultMenus[loc]);
});

export const PUT = handle(async (req, ctx) => {
  await requireUser();
  const loc = await location(ctx);
  const data = await parseBody(req, menuSchema.omit({ location: true }));
  await connectDB();
  const doc = await MenuModel.findOneAndUpdate(
    { location: loc },
    { ...data, location: loc },
    { upsert: true, new: true }
  ).lean();
  revalidateSite();
  return ok(doc);
});
