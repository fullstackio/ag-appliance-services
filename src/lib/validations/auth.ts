import { z } from "zod";

export const USER_ROLES = ["owner", "admin"] as const;
export const USER_STATUS = ["pending", "active", "disabled"] as const;
export type UserRole = (typeof USER_ROLES)[number];
export type UserStatus = (typeof USER_STATUS)[number];

const password = z
  .string()
  .min(8, "At least 8 characters")
  .max(72)
  .regex(/[A-Za-z]/, "Must contain a letter")
  .regex(/\d/, "Must contain a number");

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Name is required").max(80),
    email: z.string().trim().email("Enter a valid email"),
    password,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
export type RegisterInput = z.infer<typeof registerSchema>;

export const updateUserSchema = z.object({
  role: z.enum(USER_ROLES).optional(),
  status: z.enum(USER_STATUS).optional(),
});
