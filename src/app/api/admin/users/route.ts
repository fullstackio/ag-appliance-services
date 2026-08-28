import { handle, ok, requireUser } from "@/lib/api-helpers";
import { connectDB } from "@/lib/db/mongoose";
import { UserModel } from "@/models/User";

export const dynamic = "force-dynamic";

export const GET = handle(async () => {
  await requireUser();
  await connectDB();
  const users = await UserModel.find().sort({ createdAt: 1 }).lean();
  return ok(users);
});
