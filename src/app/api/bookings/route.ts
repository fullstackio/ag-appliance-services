import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db/mongoose";
import { logger } from "@/lib/logger";
import { bookingInputSchema, fieldErrors } from "@/lib/validations/booking";
import { BookingModel } from "@/models/Booking";

export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    const bookings = await BookingModel.find().sort({ createdAt: -1 }).limit(50).lean();
    return NextResponse.json({ data: bookings });
  } catch (err) {
    logger.error("GET /api/bookings failed", { error: String(err) });
    return NextResponse.json({ error: "Failed to load bookings" }, { status: 500 });
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = bookingInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", fields: fieldErrors(parsed.error) },
      { status: 422 }
    );
  }

  try {
    await connectDB();
    const booking = await BookingModel.create(parsed.data);
    logger.info("Booking created", { id: booking.id, appliance: booking.appliance });
    return NextResponse.json({ data: booking }, { status: 201 });
  } catch (err) {
    logger.error("POST /api/bookings failed", { error: String(err) });
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
