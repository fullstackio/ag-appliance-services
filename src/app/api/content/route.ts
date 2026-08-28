import { handle, ok } from "@/lib/api-helpers";
import { getSiteContent } from "@/lib/content/get-content";

export const dynamic = "force-dynamic";

/** Public read of the full page content (used by the dashboard preview and integrations). */
export const GET = handle(async () => ok(await getSiteContent()));
