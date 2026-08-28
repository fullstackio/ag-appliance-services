import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { SECTION_TITLES } from "@/components/dashboard/section-editor";
import { Card, CardContent } from "@/components/ui/card";
import { SECTION_KEYS } from "@/lib/validations/content";

export default function ContentIndexPage() {
  return (
    <>
      <PageHeader
        title="Page content"
        description="Every section of the single-page website, in the order it appears"
      />
      <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6 xl:grid-cols-3">
        {SECTION_KEYS.map((key, i) => (
          <Link key={key} href={`/dashboard/content/${key}`}>
            <Card className="hover:border-brand-copper/60 transition-colors">
              <CardContent className="flex items-center gap-3 py-4">
                <div className="bg-brand-copper/10 text-brand-copper grid size-9 shrink-0 place-items-center rounded-full text-sm font-bold">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium">{SECTION_TITLES[key]}</div>
                  <div className="text-muted-foreground text-xs">section key: {key}</div>
                </div>
                <ChevronRight className="text-muted-foreground size-4" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
