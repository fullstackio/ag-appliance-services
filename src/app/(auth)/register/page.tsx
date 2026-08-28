import Link from "next/link";

import { AuthCard } from "@/components/auth/auth-card";
import { RegisterForm } from "@/components/auth/register-form";

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Register — AG Appliance Dashboard" };

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create an account"
      description="The first account becomes the owner. Later accounts need owner approval."
      footer={
        <span>
          Already registered?{" "}
          <Link href="/login" className="text-brand-copper font-medium hover:underline">
            Sign in
          </Link>
        </span>
      }
    >
      <RegisterForm />
    </AuthCard>
  );
}
