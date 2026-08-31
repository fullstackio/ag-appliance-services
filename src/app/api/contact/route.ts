import { handle, ok, parseBody } from "@/lib/api-helpers";
import { connectDB } from "@/lib/db/mongoose";
import { logger } from "@/lib/logger";
import { contactInputSchema } from "@/lib/validations/contact";
import { ContactModel } from "@/models/Contact";

export const dynamic = "force-dynamic";

/** Public "Get In Touch" contact form */
export const POST = handle(async (req) => {
  const data = await parseBody(req, contactInputSchema);
  await connectDB();
  const contact = await ContactModel.create(data);
  logger.info("Contact message created", { id: contact.id });
  return ok({ id: contact.id }, 201);
});
