import { NextResponse } from "next/server";

import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

export function GET(): NextResponse {
  logger.debug("Health check");
  return NextResponse.json({
    status: "ok",
    service: "ag-appliance-service",
    time: new Date().toISOString(),
  });
}
