import { isValidObjectId } from "mongoose";
import { z } from "zod";

import { handle, HttpError, ok, parseBody, requireUser } from "@/lib/api-helpers";
import { connectDB } from "@/lib/db/mongoose";
import { EnquiryModel } from "@/models/Enquiry";

export const dynamic = "force-dynamic";

const patchSchema = z.object({ status: z.enum(["new", "read", "closed"]) });

export const PATCH = handle(async (req, ctx) => {
  await requireUser();
  const { id } = await ctx.params;
  if (!isValidObjectId(id)) {
    throw new HttpError(404, "Enquiry not found");
  }
  const data = await parseBody(req, patchSchema);
  await connectDB();
  const doc = await EnquiryModel.findByIdAndUpdate(id, data, { new: true }).lean();
  if (!doc) {
    throw new HttpError(404, "Enquiry not found");
  }
  return ok(doc);
});

export const DELETE = handle(async (_req, ctx) => {
  await requireUser({ owner: true });
  const { id } = await ctx.params;
  if (!isValidObjectId(id)) {
    throw new HttpError(404, "Enquiry not found");
  }
  await connectDB();
  await EnquiryModel.findByIdAndDelete(id);
  return ok({ id });
});
