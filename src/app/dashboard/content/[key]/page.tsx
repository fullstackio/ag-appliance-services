import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/dashboard/page-header";
import { SECTION_TITLES, SectionEditor } from "@/components/dashboard/section-editor";
import { Button } from "@/components/ui/button";
import { sectionKeySchema } from "@/lib/validations/content";

export default async function SectionPage({ params }: PageProps<"/dashboard/content/[key]">) {
  const { key } = await params;
  const parsed = sectionKeySchema.safeParse(key);
  if (!parsed.success) {
    notFound();
  }
  return (
    <>
      <PageHeader
        title={SECTION_TITLES[parsed.data]}
        description={`Editing section “${parsed.data}” — changes go live on save`}
        actions={
          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<Link href="/dashboard/content" />}
          >
            All sections
          </Button>
        }
      />
      <div className="p-4 sm:p-6">
        <SectionEditor sectionKey={parsed.data} />
      </div>
    </>
  );
}
