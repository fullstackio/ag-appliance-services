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
  const [logo, banner] = await Promise.all([
    readFile(path.join(process.cwd(), "public/images/logo-og.png")),
    readFile(path.join(process.cwd(), "public/images/banner_1.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const bannerSrc = `data:image/png;base64,${banner.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        ...row,
        width: "100%",
        height: "100%",
        position: "relative",
        padding: 72,
        color: "#fff",
      }}
    >
      {/* the real hero banner photo as the background, same image used on the site itself */}
      <img
        src={bannerSrc}
        alt=""
        width={1200}
        height={630}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      {/* dark-to-photo gradient (mirrors the site's own hero layout: text left, photo right)
          so the title/CTA text stays fully legible over the photo. Note: satori's gradient
          parser doesn't handle rgba() color stops (silently drops the whole background) —
          solid colors and the `transparent` keyword work fine, so this sticks to those. */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(90deg, #121212 0%, #121212 52%, transparent 88%)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 700,
          position: "relative",
        }}
      >
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
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: 68,
            fontWeight: 800,
          }}
        >
          <span>Appliance Repair Service in&nbsp;</span>
          <span style={{ color: "#D4924A" }}>Kolkata</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#d8cfc3",
            marginTop: 28,
          }}
        >
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
      {/* small corner badge instead of a large medallion, so it never overlaps the headline */}
      <img
        src={logoSrc}
        alt=""
        width={110}
        height={110}
        style={{
          position: "absolute",
          right: 56,
          bottom: 56,
          borderRadius: 55,
          boxShadow:
            "0 0 0 6px rgba(232,178,92,.5), 0 10px 30px rgba(0,0,0,.5)",
        }}
      />
    </div>,
    size,
  );
}
