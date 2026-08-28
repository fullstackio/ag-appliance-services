import { handle, ok, parseBody } from "@/lib/api-helpers";
import { connectDB } from "@/lib/db/mongoose";
import { logger } from "@/lib/logger";
import { enquiryInputSchema } from "@/lib/validations/content";
import { EnquiryModel } from "@/models/Enquiry";

export const dynamic = "force-dynamic";

/** Public contact form */
export const POST = handle(async (req) => {
  const data = await parseBody(req, enquiryInputSchema);
  await connectDB();
  const enquiry = await EnquiryModel.create(data);
  logger.info("Enquiry created", { id: enquiry.id });
  return ok({ id: enquiry.id }, 201);
});
