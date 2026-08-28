import { handle, ok, requireUser } from "@/lib/api-helpers";
import { connectDB } from "@/lib/db/mongoose";
import { EnquiryModel } from "@/models/Enquiry";

export const dynamic = "force-dynamic";

export const GET = handle(async (req) => {
  await requireUser();
  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  await connectDB();
  const filter: Record<string, unknown> = status ? { status } : {};
  const [items, total] = await Promise.all([
    EnquiryModel.find(filter).sort({ createdAt: -1 }).limit(200).lean(),
    EnquiryModel.countDocuments(filter),
  ]);
  return ok({ items, total });
});
