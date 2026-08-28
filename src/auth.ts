/**
 * Auth.js (next-auth v5) — credentials login for the dashboard.
 * Author: Avijit Ghosh
 */
import bcrypt from "bcryptjs";
import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { connectDB } from "@/lib/db/mongoose";
import { logger } from "@/lib/logger";
import { loginSchema, type UserRole, type UserStatus } from "@/lib/validations/auth";
import { UserModel } from "@/models/User";

declare module "next-auth" {
  interface Session {
    user: { id: string; role: UserRole; status: UserStatus } & DefaultSession["user"];
  }
  interface User {
    role?: UserRole;
    status?: UserStatus;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  pages: { signIn: "/login" },
  trustHost: true,
  providers: [
    Credentials({
      name: "Email & password",
      credentials: { email: { label: "Email" }, password: { label: "Password", type: "password" } },
      authorize: async (raw) => {
        const parsed = loginSchema.safeParse(raw);
        if (!parsed.success) {
          return null;
        }
        const { email, password } = parsed.data;
        await connectDB();
        const user = await UserModel.findOne({ email: email.toLowerCase() }).select(
          "+passwordHash"
        );
        if (!user) {
          return null;
        }
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) {
          logger.warn("Login failed: bad password", { email });
          return null;
        }
        if (user.status !== "active") {
          // Surface a specific message to the login page
          throw new Error(user.status === "pending" ? "ACCOUNT_PENDING" : "ACCOUNT_DISABLED");
        }
        user.lastLoginAt = new Date();
        await user.save();
        logger.info("Login", { email, role: user.role });
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.status = user.status;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user.id = token.id as string;
      session.user.role = token.role as UserRole;
      session.user.status = token.status as UserStatus;
      return session;
    },
  },
});
