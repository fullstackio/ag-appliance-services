import { type InferSchemaType, type Model, model, models, Schema } from "mongoose";

import { USER_ROLES, USER_STATUS } from "@/lib/validations/auth";

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: USER_ROLES, default: "admin" },
    status: { type: String, enum: USER_STATUS, default: "pending", index: true },
    lastLoginAt: Date,
  },
  { timestamps: true }
);

export type User = InferSchemaType<typeof UserSchema>;

export const UserModel =
  (models.User as Model<User> | undefined) ?? model<User>("User", UserSchema);
