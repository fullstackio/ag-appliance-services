import { handle, ok, requireUser } from "@/lib/api-helpers";
import { connectDB } from "@/lib/db/mongoose";
import { BookingModel } from "@/models/Booking";
import { EnquiryModel } from "@/models/Enquiry";
import { UserModel } from "@/models/User";

export const dynamic = "force-dynamic";

/** Dashboard overview counters */
export const GET = handle(async () => {
  await requireUser();
  await connectDB();
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const [bookingsTotal, bookingsNew, bookingsToday, enquiriesNew, usersPending, recent] =
    await Promise.all([
      BookingModel.countDocuments(),
      BookingModel.countDocuments({ status: "new" }),
      BookingModel.countDocuments({ createdAt: { $gte: startOfDay } }),
      EnquiryModel.countDocuments({ status: "new" }),
      UserModel.countDocuments({ status: "pending" }),
      BookingModel.find().sort({ createdAt: -1 }).limit(8).lean(),
    ]);
  return ok({ bookingsTotal, bookingsNew, bookingsToday, enquiriesNew, usersPending, recent });
});
