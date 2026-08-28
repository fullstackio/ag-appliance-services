import { handle, ok, requireUser } from "@/lib/api-helpers";
import { defaultMenus } from "@/lib/content/defaults";
import { connectDB } from "@/lib/db/mongoose";
import { MENU_LOCATIONS } from "@/lib/validations/content";
import { MenuModel } from "@/models/Menu";

export const dynamic = "force-dynamic";

export const GET = handle(async () => {
  await requireUser();
  await connectDB();
  const docs = await MenuModel.find().lean();
  const menus = MENU_LOCATIONS.map(
    (loc) => docs.find((d) => d.location === loc) ?? defaultMenus[loc]
  );
  return ok(menus);
});
