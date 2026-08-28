/**
 * Shared helpers for route handlers: auth guard, JSON parsing, error shaping, revalidation.
 * Author: Avijit Ghosh
 */
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { logger } from "@/lib/logger";
import { fieldErrors } from "@/lib/validations/booking";

import type { Session } from "next-auth";
import type { z } from "zod";

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly fields?: Record<string, string>
  ) {
    super(message);
  }
}

/** Ensures an active dashboard user; optionally requires the owner role. */
export async function requireUser(opts?: { owner?: boolean }): Promise<Session> {
  const session: Session | null = await auth();
  if (!session?.user || session.user.status !== "active") {
    throw new HttpError(401, "Unauthorized");
  }
  if (opts?.owner && session.user.role !== "owner") {
    throw new HttpError(403, "Owner role required");
  }
  return session;
}

/** Parses + validates a JSON body with a Zod schema; throws 400/422 HttpError. */
export async function parseBody<S extends z.ZodType>(
  req: Request,
  schema: S
): Promise<z.output<S>> {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    throw new HttpError(400, "Invalid JSON body");
  }
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    throw new HttpError(422, "Validation failed", fieldErrors(parsed.error));
  }
  return parsed.data;
}

export function ok<T>(data: T, status = 200): NextResponse {
  return NextResponse.json({ data }, { status });
}

/** Wraps a handler so thrown HttpErrors become JSON responses and others become 500s. */
export function handle(
  fn: (req: Request, ctx: { params: Promise<Record<string, string>> }) => Promise<NextResponse>
) {
  return async (req: Request, ctx: { params: Promise<Record<string, string>> }) => {
    try {
      return await fn(req, ctx);
    } catch (err) {
      if (err instanceof HttpError) {
        return NextResponse.json(
          { error: err.message, fields: err.fields },
          { status: err.status }
        );
      }
      logger.error("Unhandled API error", { url: req.url, error: String(err) });
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  };
}

/** Public page is statically cached — call after any content mutation. */
export function revalidateSite(): void {
  revalidatePath("/");
}
