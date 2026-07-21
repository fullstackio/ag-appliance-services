"use client";

import dynamic from "next/dynamic";
import { AosProvider } from "@/components/common/aos-provider";
import { Preloader } from "@/components/layout/preloader";
import { ToTop } from "@/components/layout/to-top";

// Cursor is purely decorative + pointer-only — load it lazily, client-only.
const CustomCursor = dynamic(
  () => import("@/components/layout/custom-cursor").then((m) => m.CustomCursor),
  { ssr: false },
);

/** Global page furniture shared by every route. */
export function SiteChrome() {
  return (
    <>
      <CustomCursor />
      <Preloader />
      <AosProvider />
      <ToTop />
    </>
  );
}
