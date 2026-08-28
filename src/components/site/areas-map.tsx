"use client";

import { useState } from "react";

import { motion } from "framer-motion";

import {
  DISTRICTS,
  MAP_VIEWBOX,
  projectLonLat,
  RIVER_D,
} from "@/components/site/kolkata-map-paths";
import { cn } from "@/lib/utils";
import type { SectionOf } from "@/lib/validations/content";

type AreaItem = SectionOf<"areas">["items"][number];

/** Approximate lon/lat of the areas we serve. Areas without an entry get no pin. */
const GEO: Record<string, [lon: number, lat: number]> = {
  kalyani: [88.434, 22.975],
  kanchrapara: [88.43, 22.945],
  naihati: [88.42, 22.895],
  jagaddal: [88.385, 22.86],
  jagadal: [88.385, 22.86],
  shyamnagar: [88.375, 22.83],
  ichapur: [88.38, 22.8],
  barrackpore: [88.37, 22.765],
  barrackpur: [88.37, 22.765],
  barrackpor: [88.37, 22.765],
  titagarh: [88.37, 22.74],
  titaghar: [88.37, 22.74],
  khardah: [88.375, 22.72],
  khardha: [88.375, 22.72],
  sodepur: [88.385, 22.7],
  "new barrackpore": [88.42, 22.69],
  "new barrackpor": [88.42, 22.69],
  belghoria: [88.38, 22.66],
  belghoriya: [88.38, 22.66],
  baranagar: [88.37, 22.64],
  barahanagar: [88.37, 22.64],
  birati: [88.43, 22.665],
  airport: [88.445, 22.65],
  kaikhali: [88.44, 22.63],
  kestopur: [88.43, 22.6],
  "lake town": [88.4, 22.6],
  laketown: [88.4, 22.6],
  rajarhat: [88.47, 22.62],
  "new town": [88.47, 22.58],
  "salt lake": [88.41, 22.58],
  saltlake: [88.41, 22.58],
  bidhannagar: [88.42, 22.57],
  tala: [88.37, 22.615],
  bagbazar: [88.36, 22.6],
  "bag bazzar": [88.36, 22.6],
  shyambazar: [88.372, 22.6],
  "shyam bazar": [88.372, 22.6],
  sovabazar: [88.365, 22.593],
  dumdum: [88.42, 22.62],
  howrah: [88.31, 22.59],
  behala: [88.31, 22.5],
  garia: [88.39, 22.46],
};

const norm = (s: string) => s.trim().toLowerCase();

/** River vertices, parsed once from the generated path ("M x yL x y…"). */
const RIVER_PTS: Pt[] = RIVER_D.split(/[ML]/)
  .filter(Boolean)
  .map((pair) => pair.trim().split(" ").map(Number) as Pt);

/** Where to write the river name: the vertex nearest to `frac` of the view height, angled along the river. */
function riverLabel(view: Box, frac: number): { x: number; y: number; angle: number } | null {
  const targetY = view.y + view.h * frac;
  const inView = RIVER_PTS.map((pt, i) => ({ pt, i })).filter(
    ({ pt }) =>
      pt[0] > view.x && pt[0] < view.x + view.w && pt[1] > view.y && pt[1] < view.y + view.h
  );
  if (inView.length < 2) {
    return null;
  }
  const best = inView.reduce((a, b) =>
    Math.abs(b.pt[1] - targetY) < Math.abs(a.pt[1] - targetY) ? b : a
  );
  const prev = RIVER_PTS[Math.max(0, best.i - 3)] as Pt;
  const next = RIVER_PTS[Math.min(RIVER_PTS.length - 1, best.i + 3)] as Pt;
  let angle = (Math.atan2(next[1] - prev[1], next[0] - prev[0]) * 180) / Math.PI;
  if (angle > 90) {
    angle -= 180;
  } else if (angle < -90) {
    angle += 180;
  }
  return { x: best.pt[0], y: best.pt[1], angle };
}
const { width: MW, height: MH } = MAP_VIEWBOX;

type Pt = [number, number];
interface Pin {
  name: string;
  x: number;
  y: number;
}
interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** View zoomed onto the pins (+margin), padded to the map frame's aspect ratio. */
function viewFor(pins: Pin[], aspect: number, m = 1.2): Box {
  if (!pins.length) {
    return { x: 0, y: 0, w: MW, h: MH };
  }
  const xs = pins.map((p) => p.x);
  const ys = pins.map((p) => p.y);
  let x0 = Math.min(...xs) - m;
  let x1 = Math.max(...xs) + m;
  let y0 = Math.min(...ys) - m;
  let y1 = Math.max(...ys) + m;
  let w = x1 - x0;
  let h = y1 - y0;
  if (w / h < aspect) {
    const nw = h * aspect;
    x0 -= (nw - w) / 2;
    x1 += (nw - w) / 2;
    w = nw;
  } else {
    const nh = w / aspect;
    y0 -= (nh - h) / 2;
    y1 += (nh - h) / 2;
    h = nh;
  }
  return { x: x0, y: y0, w, h };
}

/** Keep the part of `poly` closer to `a` than to `b` (Sutherland–Hodgman against a bisector). */
function clipHalf(poly: Pt[], a: Pt, b: Pt): Pt[] {
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  const nx = b[0] - a[0];
  const ny = b[1] - a[1];
  const side = (p: Pt) => (p[0] - mx) * nx + (p[1] - my) * ny; // <= 0 → nearer a
  const out: Pt[] = [];
  for (let i = 0; i < poly.length; i++) {
    const cur = poly[i] as Pt;
    const prev = poly[(i + poly.length - 1) % poly.length] as Pt;
    const sc = side(cur);
    const sp = side(prev);
    if (sc <= 0) {
      if (sp > 0) {
        const t = sp / (sp - sc);
        out.push([prev[0] + (cur[0] - prev[0]) * t, prev[1] + (cur[1] - prev[1]) * t]);
      }
      out.push(cur);
    } else if (sp <= 0) {
      const t = sp / (sp - sc);
      out.push([prev[0] + (cur[0] - prev[0]) * t, prev[1] + (cur[1] - prev[1]) * t]);
    }
  }
  return out;
}

/** One convex cell per pin = the region nearer to that town than to any other. */
/** Outward margin (map units) of the tiled service region around the outermost towns. */
const MARGIN = 1.5;

/** Convex hull (monotone chain). */
function hull(points: Pt[]): Pt[] {
  const pts = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  if (pts.length < 3) {
    return pts;
  }
  const cross = (o: Pt, a: Pt, b: Pt) =>
    (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower: Pt[] = [];
  for (const p of pts) {
    while (
      lower.length >= 2 &&
      cross(lower[lower.length - 2] as Pt, lower[lower.length - 1] as Pt, p) <= 0
    ) {
      lower.pop();
    }
    lower.push(p);
  }
  const upper: Pt[] = [];
  for (const p of [...pts].reverse()) {
    while (
      upper.length >= 2 &&
      cross(upper[upper.length - 2] as Pt, upper[upper.length - 1] as Pt, p) <= 0
    ) {
      upper.pop();
    }
    upper.push(p);
  }
  return [...lower.slice(0, -1), ...upper.slice(0, -1)];
}

/** Push a convex polygon's vertices outward by `d` (rounded offset approximation). */
function offsetHull(h: Pt[], d: number): Pt[] {
  const n = h.length;
  const out: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const prev = h[(i + n - 1) % n] as Pt;
    const cur = h[i] as Pt;
    const next = h[(i + 1) % n] as Pt;
    // outward normals of the two adjacent edges (hull is counter-clockwise)
    const n1: Pt = [cur[1] - prev[1], -(cur[0] - prev[0])];
    const n2: Pt = [next[1] - cur[1], -(next[0] - cur[0])];
    const norm = (v: Pt): Pt => {
      const l = Math.hypot(v[0], v[1]) || 1;
      return [v[0] / l, v[1] / l];
    };
    const a = norm(n1);
    const b = norm(n2);
    // two offset points per vertex give a rounded corner
    out.push([cur[0] + a[0] * d, cur[1] + a[1] * d], [cur[0] + b[0] * d, cur[1] + b[1] * d]);
  }
  return out;
}

/** Keep the part of `poly` inside the convex polygon `region` (edges as half-planes). */
function clipToConvex(poly: Pt[], region: Pt[]): Pt[] {
  const n = region.length;
  let out = poly;
  for (let i = 0; i < n && out.length; i++) {
    const a = region[i] as Pt;
    const b = region[(i + 1) % n] as Pt;
    // express "inside the edge" as a bisector clip: a point just inside vs. its mirror just outside
    const nx = b[1] - a[1];
    const ny = -(b[0] - a[0]); // outward normal (region is counter-clockwise)
    const len = Math.hypot(nx, ny) || 1;
    const inside: Pt = [a[0] - (nx / len) * 2, a[1] - (ny / len) * 2];
    const outside: Pt = [a[0] + (nx / len) * 2, a[1] + (ny / len) * 2];
    out = clipHalf(out, inside, outside);
  }
  return out;
}

/**
 * One cell per town = the region nearer to that town than to any other, clipped to the
 * service belt (convex hull of all towns + MARGIN) so the belt reads as one tiled region.
 */
function voronoi(
  pins: Pin[],
  view: Box
): { cells: Array<{ name: string; points: string }>; region: string } {
  const pad = Math.max(view.w, view.h);
  const frame: Pt[] = [
    [view.x - pad, view.y - pad],
    [view.x + view.w + pad, view.y - pad],
    [view.x + view.w + pad, view.y + view.h + pad],
    [view.x - pad, view.y + view.h + pad],
  ];
  const region = offsetHull(hull(pins.map((p) => [p.x, p.y] as Pt)), MARGIN);
  const fmt = (poly: Pt[]) => poly.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  const cells = pins.map((p) => {
    let poly = frame;
    for (const q of pins) {
      if (q !== p && poly.length) {
        poly = clipHalf(poly, [p.x, p.y], [q.x, q.y]);
      }
    }
    return { name: p.name, points: fmt(clipToConvex(poly, region)) };
  });
  return { cells, region: fmt(region) };
}

const ASPECT = 1.45; // ≈ the .map frame (800 × 550)

export function AreasMap({ items }: { items: AreaItem[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [zoomed, setZoomed] = useState(true);
  const pins: Pin[] = items
    .map((a) => ({ name: a.name, geo: GEO[norm(a.name)] }))
    .filter((p): p is { name: string; geo: [number, number] } => Boolean(p.geo))
    .map((p) => ({ name: p.name, ...projectLonLat(p.geo[0], p.geo[1]) }));

  // two framings: zoomed on the service belt (default) or the whole state
  const stateView = viewFor(
    [
      { name: "", x: 0, y: 0 },
      { name: "", x: MW, y: MH },
    ],
    ASPECT
  );
  const beltView = viewFor(pins, ASPECT, 1.1);
  const view = zoomed ? beltView : stateView;
  const label = riverLabel(view, zoomed ? 0.3 : 0.55);
  const { cells } = voronoi(pins, stateView);
  // draw the active pin last so its label paints on top
  const ordered = [...pins].sort((a, b) => Number(a.name === active) - Number(b.name === active));
  const u = view.h / 100; // 1% of the visible height, for stroke/dot sizing

  const toggle = (name: string) => setActive((cur) => (cur === name ? null : name));

  return (
    <>
      <ul aria-label="Areas we serve">
        {items.map((a) => {
          const on = active === a.name;
          const hasPin = Boolean(GEO[norm(a.name)]);
          return (
            <li
              key={a.name}
              className={cn(on && "is-active", hovered === a.name && "is-hover")}
              onMouseEnter={hasPin ? () => setHovered(a.name) : undefined}
              onMouseLeave={hasPin ? () => setHovered(null) : undefined}
              onClick={hasPin ? () => toggle(a.name) : undefined}
              onKeyDown={hasPin ? (e) => e.key === "Enter" && toggle(a.name) : undefined}
              tabIndex={hasPin ? 0 : undefined}
              role={hasPin ? "button" : undefined}
              aria-pressed={hasPin ? on : undefined}
            >
              {a.name}
            </li>
          );
        })}
      </ul>

      <div className="map" role="img" aria-label="Map of the Kolkata areas we serve">
        <motion.svg
          initial={false}
          animate={{ viewBox: `${view.x} ${view.y} ${view.w} ${view.h}` }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          style={{ ["--u" as string]: `${u}px` }}
        >
          <defs>
            {/* halftone dot grids — land (dim), areas (copper), hovered / active (gold, white) */}
            {(
              [
                ["ag-dots-land", "rgba(255,255,255,0.42)", 0.2],
                ["ag-dots-cell", "#D4924A", 0.24],
                ["ag-dots-hover", "#E8B25C", 0.28],
                ["ag-dots-active", "#FFD98A", 0.34],
              ] as const
            ).map(([id, color, r]) => (
              <pattern
                key={id}
                id={id}
                patternUnits="userSpaceOnUse"
                width={u * 1.25}
                height={u * 1.25}
              >
                <circle cx={u * 0.625} cy={u * 0.625} r={u * r} fill={color} />
              </pattern>
            ))}
          </defs>
          {/* plain land */}
          <g className="land">
            {DISTRICTS.map((d) => (
              <path key={d.name} d={d.d} className="landmass" />
            ))}
          </g>
          {/* area cells — the belt is inland, so no land clip (avoids slivers along district seams) */}
          <g className="cells">
            {cells.map((c) => (
              <polygon
                key={c.name}
                points={c.points}
                className={cn(
                  "cell",
                  active === c.name && "is-active",
                  hovered === c.name && "is-hover"
                )}
                onClick={() => toggle(c.name)}
                onMouseEnter={() => setHovered(c.name)}
                onMouseLeave={() => setHovered(null)}
              >
                <title>{c.name}</title>
              </polygon>
            ))}
          </g>

          {/* Ganga / Hooghly */}
          <g className="river">
            <path d={RIVER_D} className="river-glow" />
            <path d={RIVER_D} className="river-line" />
            {label ? (
              <text
                className="river-label"
                transform={`translate(${label.x.toFixed(2)} ${label.y.toFixed(2)}) rotate(${label.angle.toFixed(1)})`}
                dy={-u * 2.2}
                textAnchor="middle"
              >
                GANGA · HOOGHLY
              </text>
            ) : null}
          </g>

          {/* small bullet markers */}
          {ordered.map((p) => {
            const on = active === p.name;
            return (
              <g
                key={p.name}
                className={cn("dot", on && "is-active", hovered === p.name && "is-hover")}
                transform={`translate(${p.x.toFixed(2)} ${p.y.toFixed(2)})`}
                onMouseEnter={() => setHovered(p.name)}
                onMouseLeave={() => setHovered(null)}
                role="button"
                tabIndex={0}
                aria-label={p.name}
                aria-pressed={on}
                onClick={() => toggle(p.name)}
                onKeyDown={(e) => e.key === "Enter" && toggle(p.name)}
              >
                <title>{p.name}</title>
                <circle className="hit" r={u * 2.2} />
                <circle className="ring" r={u * 1.1} />
                <circle className="core" r={u * 0.55} />
                <text className="tag" y={-u * 2.1} textAnchor="middle">
                  {p.name}
                </text>
              </g>
            );
          })}
        </motion.svg>
        <div className="map-zoom" role="group" aria-label="Map zoom">
          <button
            type="button"
            className={cn(zoomed && "on")}
            aria-pressed={zoomed}
            onClick={() => setZoomed(true)}
          >
            Service area
          </button>
          <button
            type="button"
            className={cn(!zoomed && "on")}
            aria-pressed={!zoomed}
            onClick={() => setZoomed(false)}
          >
            West Bengal
          </button>
        </div>
        <span className="lbl">
          {zoomed ? "Kolkata · North 24 Parganas" : "West Bengal · service areas highlighted"}
        </span>
      </div>
    </>
  );
}
