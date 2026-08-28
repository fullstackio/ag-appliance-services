import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="bg-background flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
      <Image
        src="/images/logo.png"
        alt="AG Appliance Services"
        width={88}
        height={88}
        className="rounded-full shadow-lg"
      />
      <div>
        <p className="text-brand-copper text-xs font-semibold tracking-[.16em] uppercase">
          Error 404
        </p>
        <h1 className="mt-2 text-3xl font-bold">This page could not be found</h1>
        <p className="text-muted-foreground mt-2 max-w-md text-sm">
          The link may be outdated. Head back to the homepage or call us and we&apos;ll help right
          away.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="copper" size="site" nativeButton={false} render={<Link href="/" />}>
          Back to homepage
        </Button>
        <Button variant="ink" size="site" nativeButton={false} render={<a href="tel:9123667075" />}>
          📞 9123667075
        </Button>
      </div>
    </main>
  );
}
