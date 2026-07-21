"use client";

import { useEffect, useRef, useState } from "react";
import { AnimHead } from "@/components/common/anim-head";
import { workflowSteps } from "@/lib/data/portfolio";
import type { WorkflowStep } from "@/lib/types";

function AccordionItem({
  step,
  open,
  onToggle,
}: {
  step: WorkflowStep;
  open: boolean;
  onToggle: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    setMaxHeight(open ? `${panel.scrollHeight}px` : "0px");
  }, [open]);

  // Keep the open panel sized correctly on resize.
  useEffect(() => {
    if (!open) return;
    const onResize = () => {
      if (panelRef.current) setMaxHeight(`${panelRef.current.scrollHeight}px`);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  return (
    <div className={`accordion__item${open ? " is-open" : ""}`}>
      <button
        className="accordion__head"
        aria-expanded={open}
        onClick={onToggle}
        type="button"
      >
        <span className="accordion__dot" aria-hidden="true" />
        <span className="accordion__no">{step.no}</span>
        <span className="accordion__title">{step.title}</span>
        <span className="accordion__icon" aria-hidden="true" />
      </button>
      <div className="accordion__panel" ref={panelRef} style={{ maxHeight }}>
        <ul>
          {step.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Workflow() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="block plain workflow" id="workflow" data-aos="fade-up" suppressHydrationWarning>
      <div className="workflow__inner">
        <div className="workflow__intro">
          <p className="eyebrow">HOW I WORK</p>
          <AnimHead as="h2" className="section-title" lines={["MY WORKFLOW"]} />
          <p className="muted">
            A clear, repeatable process for every engagement — from discovery to
            delivery — so each build ships dependable, performant and on time.
          </p>
        </div>

        <div className="accordion" id="accordion">
          {workflowSteps.map((step, i) => (
            <AccordionItem
              key={step.no}
              step={step}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
