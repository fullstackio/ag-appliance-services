import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { handle, HttpError, ok, requireUser } from "@/lib/api-helpers";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/svg+xml": "svg",
  "image/gif": "gif",
};

/**
 * Multipart image upload → saved under UPLOAD_DIR (default ./public/uploads), served at /uploads/*.
 * On Vercel the filesystem is read-only; set UPLOAD_DIR=/tmp/uploads or switch to Vercel Blob.
 */
export const POST = handle(async (req) => {
  await requireUser();
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    throw new HttpError(400, "Missing file");
  }
  const ext = ALLOWED[file.type];
  if (!ext) {
    throw new HttpError(422, "Only JPG, PNG, WEBP, SVG or GIF images are allowed");
  }
  if (file.size > MAX_BYTES) {
    throw new HttpError(422, "Image must be 5 MB or smaller");
  }

  const dir = path.resolve(process.env.UPLOAD_DIR ?? "./public/uploads");
  await mkdir(/* turbopackIgnore: true */ dir, { recursive: true });
  const base = file.name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 40);
  const name = `${base || "image"}-${randomBytes(4).toString("hex")}.${ext}`;
  const target = path.join(/* turbopackIgnore: true */ dir, name);
  await writeFile(/* turbopackIgnore: true */ target, Buffer.from(await file.arrayBuffer()));
  logger.info("Image uploaded", { name, size: file.size });
  return ok({ url: `/uploads/${name}`, name, size: file.size, type: file.type }, 201);
});
