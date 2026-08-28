import { type ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <main className="from-brand-cream to-background flex min-h-screen items-center justify-center bg-linear-to-b p-6">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-6 flex items-center justify-center gap-3">
          <Image
            src="/images/logo.png"
            alt="AG Appliance Services"
            width={56}
            height={56}
            className="rounded-full shadow-md"
          />
          <div className="leading-tight">
            <div className="text-lg font-extrabold tracking-wide">AG APPLIANCE</div>
            <div className="text-brand-copper text-sm font-bold tracking-[.14em]">SERVICES</div>
          </div>
        </Link>
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
          <CardFooter className="text-muted-foreground justify-center text-sm">{footer}</CardFooter>
        </Card>
      </div>
    </main>
  );
}
