import { handle, ok, requireUser } from "@/lib/api-helpers";
import { defaultSections } from "@/lib/content/defaults";
import { connectDB } from "@/lib/db/mongoose";
import { SECTION_KEYS } from "@/lib/validations/content";
import { SectionModel } from "@/models/Section";

export const dynamic = "force-dynamic";

export const GET = handle(async () => {
  await requireUser();
  await connectDB();
  const docs = await SectionModel.find().lean();
  return ok(SECTION_KEYS.map((key) => docs.find((d) => d.key === key) ?? defaultSections[key]));
});
