import { handle, HttpError, ok, parseBody, requireUser, revalidateSite } from "@/lib/api-helpers";
import { defaultSections } from "@/lib/content/defaults";
import { connectDB } from "@/lib/db/mongoose";
import { sectionKeySchema, sectionSchema } from "@/lib/validations/content";
import { SectionModel } from "@/models/Section";

export const dynamic = "force-dynamic";

async function key(ctx: { params: Promise<Record<string, string>> }) {
  const { key: raw } = await ctx.params;
  const parsed = sectionKeySchema.safeParse(raw);
  if (!parsed.success) {
    throw new HttpError(404, "Unknown section");
  }
  return parsed.data;
}

export const GET = handle(async (_req, ctx) => {
  await requireUser();
  const k = await key(ctx);
  await connectDB();
  const doc = await SectionModel.findOne({ key: k }).lean();
  return ok(doc ?? defaultSections[k]);
});

export const PUT = handle(async (req, ctx) => {
  await requireUser();
  const k = await key(ctx);
  const data = await parseBody(req, sectionSchema);
  if (data.key !== k) {
    throw new HttpError(422, "Section key mismatch");
  }
  await connectDB();
  // Replace the whole document so removed items/fields don't linger
  const doc = await SectionModel.findOneAndReplace({ key: k }, data, {
    upsert: true,
    returnDocument: "after",
  }).lean();
  revalidateSite();
  return ok(doc);
});

/** Reset a section to the approved mockup defaults */
export const DELETE = handle(async (_req, ctx) => {
  await requireUser();
  const k = await key(ctx);
  await connectDB();
  const doc = await SectionModel.findOneAndReplace({ key: k }, defaultSections[k], {
    upsert: true,
    returnDocument: "after",
  }).lean();
  revalidateSite();
  return ok(doc);
});
