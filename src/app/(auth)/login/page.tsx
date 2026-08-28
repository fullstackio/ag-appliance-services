import { Suspense } from "react";

import Link from "next/link";

import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sign in — AG Appliance Dashboard" };

export default function LoginPage() {
  return (
    <AuthCard
      title="Sign in to the dashboard"
      description="Manage page content, banners, menus and bookings."
      footer={
        <span>
          New here?{" "}
          <Link href="/register" className="text-brand-copper font-medium hover:underline">
            Create an account
          </Link>
        </span>
      }
    >
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthCard>
  );
}
