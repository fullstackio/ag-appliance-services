"use client";

import { type ReactNode, useRef } from "react";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * Scroll-linked reveal: as the block scrolls up into view it rises from below and sharpens;
 * as it continues towards the top of the viewport it sinks back down and blurs again.
 * Progress 0 = block's top at the viewport bottom, 1 = block's bottom at the viewport top.
 */
export function ScrollReveal({
  children,
  className,
  distance = 70,
  blur = 14,
}: {
  children: ReactNode;
  className?: string;
  /** px the block travels */
  distance?: number;
  /** max blur in px */
  blur?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const y = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [distance, 0, 0, distance]);
  const px = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [blur, 0, 0, blur]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 1, 1, 0]);
  const filter = useMotionTemplate`blur(${px}px)`;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { y, filter, opacity, willChange: "transform, filter, opacity" }}
    >
      {children}
    </motion.div>
  );
}
