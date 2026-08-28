import { type Model, model, models, Schema } from "mongoose";

import { MENU_LOCATIONS, type Menu } from "@/lib/validations/content";

const MenuChildSchema = new Schema(
  { id: String, label: String, href: String, visible: { type: Boolean, default: true } },
  { _id: false }
);
const MenuItemSchema = new Schema(
  {
    id: String,
    label: String,
    href: String,
    visible: { type: Boolean, default: true },
    children: { type: [MenuChildSchema], default: [] },
  },
  { _id: false }
);

const MenuSchema = new Schema<Menu>(
  {
    location: { type: String, enum: MENU_LOCATIONS, required: true, unique: true },
    title: String,
    items: { type: [MenuItemSchema], default: [] },
  },
  { timestamps: true }
);

export const MenuModel =
  (models.Menu as Model<Menu> | undefined) ?? model<Menu>("Menu", MenuSchema);
