"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { SectionOf } from "@/lib/validations/content";

/**
 * FAQ — the accordion lives inside a modal opened from a "Get FAQ's" button, keeping
 * the section itself short. Items keep the mockup's `.q` card look, base-ui Accordion.
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
        <div className="flex justify-center">
          <Dialog>
            <DialogTrigger
              render={
                <Button variant="copper" size="site">
                  Get FAQ&apos;s
                </Button>
              }
            />
            <DialogContent className="sm:max-w-2xl">
              <div className="site flex flex-col gap-4">
                <DialogHeader>
                  <DialogTitle>Frequently Asked Questions</DialogTitle>
                </DialogHeader>
                <AccordionPrimitive.Root
                  className="flex max-h-[65vh] flex-col gap-3 overflow-y-auto py-1"
                  multiple
                >
                  {section.items.map((f) => (
                    <AccordionPrimitive.Item key={f.question} className="q">
                      <AccordionPrimitive.Header
                        className="q-head"
                        render={<div />}
                      >
                        <AccordionPrimitive.Trigger className="q-head">
                          {f.question}
                          <span>⌄</span>
                        </AccordionPrimitive.Trigger>
                      </AccordionPrimitive.Header>
                      <AccordionPrimitive.Panel className="q-body">
                        {f.answer}
                      </AccordionPrimitive.Panel>
                    </AccordionPrimitive.Item>
                  ))}
                </AccordionPrimitive.Root>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
