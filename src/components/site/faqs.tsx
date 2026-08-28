"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

import { SectionHeading } from "@/components/site/section-heading";
import type { SectionOf } from "@/lib/validations/content";

/**
 * FAQ — shadcn/base-ui Accordion primitives styled with the mockup's `.q` card look.
 * Two-column layout is preserved by rendering the items inside the `.cols` grid.
 */
export function Faqs({ section }: { section: SectionOf<"faqs"> }) {
  if (!section.visible) {
    return null;
  }
  return (
    <section className="sec faq" id="faqs">
      <div className="wrap">
        <SectionHeading
          pill={section.pill}
          heading={section.heading}
          accent={section.headingAccent}
        />
        <AccordionPrimitive.Root className="cols" multiple>
          {section.items.map((f) => (
            <AccordionPrimitive.Item key={f.question} className="q" style={{ alignSelf: "start" }}>
              <AccordionPrimitive.Header className="q-head" render={<div />}>
                <AccordionPrimitive.Trigger className="q-head">
                  {f.question}
                  <span>⌄</span>
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Panel className="q-body">{f.answer}</AccordionPrimitive.Panel>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  );
}
