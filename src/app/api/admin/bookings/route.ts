import { handle, ok, requireUser } from "@/lib/api-helpers";
import { connectDB } from "@/lib/db/mongoose";
import { BookingModel } from "@/models/Booking";

export const dynamic = "force-dynamic";

export const GET = handle(async (req) => {
  await requireUser();
  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const limit = Math.min(Number(url.searchParams.get("limit") ?? 100), 500);
  await connectDB();
  const filter: Record<string, unknown> = status ? { status } : {};
  const [items, total] = await Promise.all([
    BookingModel.find(filter).sort({ createdAt: -1 }).limit(limit).lean(),
    BookingModel.countDocuments(filter),
  ]);
  return ok({ items, total });
});
