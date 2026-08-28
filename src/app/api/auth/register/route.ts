import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db/mongoose";
import { logger } from "@/lib/logger";
import { registerSchema } from "@/lib/validations/auth";
import { fieldErrors } from "@/lib/validations/booking";
import { UserModel } from "@/models/User";

export const dynamic = "force-dynamic";

/**
 * Dashboard registration.
 * The very first account becomes the active `owner`; later sign-ups are created as
 * `pending` admins and must be approved by the owner from Dashboard → Users.
 */
export async function POST(req: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", fields: fieldErrors(parsed.error) },
      { status: 422 }
    );
  }

  try {
    await connectDB();
    const email = parsed.data.email.toLowerCase();
    if (await UserModel.exists({ email })) {
      return NextResponse.json(
        {
          error: "An account with this email already exists",
          fields: { email: "Already registered" },
        },
        { status: 409 }
      );
    }
    const isFirst = (await UserModel.countDocuments()) === 0;
    const passwordHash = await bcrypt.hash(parsed.data.password, 12);
    const user = await UserModel.create({
      name: parsed.data.name,
      email,
      passwordHash,
      role: isFirst ? "owner" : "admin",
      status: isFirst ? "active" : "pending",
    });
    logger.info("User registered", { email, role: user.role, status: user.status });
    return NextResponse.json(
      {
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    logger.error("POST /api/auth/register failed", { error: String(err) });
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
