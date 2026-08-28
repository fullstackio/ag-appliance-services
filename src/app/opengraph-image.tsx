import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

import { defaultSettings } from "@/lib/content/defaults";

/**
 * Social share image (1200×630) — also reused by twitter-image.tsx.
 * Built from the static defaults so it renders at build time with no DB dependency.
 * Note: the OG renderer (satori) needs `display: flex` on every element with >1 child.
 */
export const alt = "AG Appliance Services — Appliance Repair in Kolkata";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const gold = "#E8B25C";
const row = { display: "flex", alignItems: "center" } as const;

export default async function OpengraphImage() {
  const logo = await readFile(path.join(process.cwd(), "public/images/logo-og.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        ...row,
        width: "100%",
        height: "100%",
        padding: 72,
        background: "linear-gradient(135deg, #2a1d12 0%, #121212 45%, #1a1a1c 100%)",
        color: "#fff",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 48 }}>
        <div
          style={{
            ...row,
            alignSelf: "flex-start",
            border: `2px solid ${gold}`,
            color: gold,
            fontSize: 20,
            letterSpacing: 4,
            padding: "10px 22px",
            borderRadius: 999,
            marginBottom: 34,
          }}
        >
          {defaultSettings.tagline}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", fontSize: 68, fontWeight: 800 }}>
          <span>Appliance Repair Service in&nbsp;</span>
          <span style={{ color: "#D4924A" }}>Kolkata</span>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#d8cfc3", marginTop: 28 }}>
          AC · Refrigerator · Geyser · Microwave · Mixer · Induction · PCB
        </div>
        <div style={{ ...row, gap: 18, marginTop: 40, fontSize: 26 }}>
          <div
            style={{
              ...row,
              background: "linear-gradient(135deg,#D4924A,#B8712F)",
              padding: "16px 30px",
              borderRadius: 14,
              fontWeight: 700,
            }}
          >
            Call {defaultSettings.phone}
          </div>
          <div
            style={{
              ...row,
              border: `2px solid ${gold}`,
              padding: "16px 30px",
              borderRadius: 14,
              color: gold,
            }}
          >
            Same-day doorstep service
          </div>
        </div>
      </div>
      <img
        src={logoSrc}
        alt=""
        width={300}
        height={300}
        style={{ borderRadius: 150, boxShadow: "0 0 0 10px rgba(232,178,92,.35)" }}
      />
    </div>,
    size
  );
}
