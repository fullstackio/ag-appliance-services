import { isValidObjectId } from "mongoose";

import { handle, HttpError, ok, parseBody, requireUser } from "@/lib/api-helpers";
import { connectDB } from "@/lib/db/mongoose";
import { updateUserSchema } from "@/lib/validations/auth";
import { UserModel } from "@/models/User";

export const dynamic = "force-dynamic";

/** Owner only: approve (status=active), disable, or change role. */
export const PATCH = handle(async (req, ctx) => {
  const session = await requireUser({ owner: true });
  const { id } = await ctx.params;
  if (!isValidObjectId(id)) {
    throw new HttpError(404, "User not found");
  }
  const data = await parseBody(req, updateUserSchema);
  if (id === session.user.id && (data.status === "disabled" || data.role === "admin")) {
    throw new HttpError(422, "You cannot demote or disable your own owner account");
  }
  await connectDB();
  const doc = await UserModel.findByIdAndUpdate(id, data, { new: true }).lean();
  if (!doc) {
    throw new HttpError(404, "User not found");
  }
  return ok(doc);
});

export const DELETE = handle(async (_req, ctx) => {
  const session = await requireUser({ owner: true });
  const { id } = await ctx.params;
  if (!isValidObjectId(id)) {
    throw new HttpError(404, "User not found");
  }
  if (id === session.user.id) {
    throw new HttpError(422, "You cannot delete your own account");
  }
  await connectDB();
  await UserModel.findByIdAndDelete(id);
  return ok({ id });
});
