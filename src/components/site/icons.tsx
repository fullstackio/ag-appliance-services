/**
 * Line icons used across the site — path data taken 1:1 from the approved mockup.
 * Editors pick icons by key (see ICON_KEYS in lib/validations/content.ts).
 */
import type { SVGProps } from "react";

import { cn } from "@/lib/utils";
import type { IconKey } from "@/lib/validations/content";

/**
 * Per-icon hover animation, built entirely from each icon's own existing sub-shapes (see
 * PATHS below) plus a few small added mist dots — nothing about the icon's base look
 * changes, these classes only add motion on `.glow-card:hover` (see site.css):
 *  - `case`:  static outline pieces, unaffected.
 *  - `pulse`: a line/shape that fades in and out (a "glow" read).
 *  - `flow`:  a short accent line whose dashed stroke streams along its length.
 *  - `spin`:  a straight line that continuously rotates about its own center — reads as a
 *             spinning blade/turntable, since rotation sweeps it between vertical and
 *             horizontal every half-turn.
 *  - `mist`:  small dots that fade in, drift, and fade out, staggered.
 */
interface AnimatedIconSpec {
  case?: string[];
  pulse?: string[];
  flow?: string[];
  spin?: string[];
  mist?: Array<{ cx: number; cy: number }>;
  /** mist drifts upward (steam/heat) instead of the default downward (drip/airflow) */
  mistUp?: boolean;
}

const ANIMATED_ICONS: Partial<Record<IconKey, AnimatedIconSpec>> = {
  ac: {
    case: [
      "M4 5h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z",
    ],
    pulse: ["M6 10h12"],
    flow: ["M7 18l-1 3", "M12 18v3", "M17 18l1 3"],
    mist: [
      { cx: 7, cy: 13 },
      { cx: 12, cy: 12 },
      { cx: 17, cy: 13 },
    ],
  },
  fridge: {
    case: [
      "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z",
    ],
    pulse: ["M5 9h14"],
    flow: ["M9 5v2", "M9 12v3"],
    mist: [
      { cx: 15, cy: 4 },
      { cx: 15, cy: 9 },
      { cx: 15, cy: 14 },
    ],
  },
  geyser: {
    case: [
      "M10 2h4a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4z",
    ],
    pulse: ["M9 8h6", "M9 12h6"],
    flow: ["M10 19v3", "M14 19v3"],
    mist: [
      { cx: 11, cy: 1 },
      { cx: 12, cy: 0 },
      { cx: 13, cy: 1 },
    ],
    mistUp: true,
  },
  microwave: {
    case: [
      "M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z",
    ],
    pulse: ["M5 8h10v8H5z"],
    flow: ["M18 9v1", "M18 13v1"],
    spin: ["M7 12h6"],
    mist: [
      { cx: 8, cy: 12 },
      { cx: 10, cy: 13 },
      { cx: 12, cy: 12 },
    ],
    mistUp: true,
  },
  mixer: {
    case: ["M8 3h8l1 8H7z", "M6 11h12v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"],
    spin: ["M12 14v4"],
    mist: [
      { cx: 9, cy: 5 },
      { cx: 12, cy: 4 },
      { cx: 15, cy: 5 },
    ],
  },
  induction: {
    case: [
      "M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
    ],
    pulse: [
      "M9 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
      "M16 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
    ],
    flow: ["M6 17h12"],
    mist: [
      { cx: 9, cy: 4 },
      { cx: 16, cy: 5 },
      { cx: 12, cy: 2 },
    ],
    mistUp: true,
  },
  pcb: {
    case: [
      "M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
    ],
    pulse: ["M9 9h6v6H9z"],
    flow: [
      "M9 4V2",
      "M15 4V2",
      "M9 22v-2",
      "M15 22v-2",
      "M4 9H2",
      "M4 15H2",
      "M22 9h-2",
      "M22 15h-2",
    ],
    mist: [
      { cx: 9, cy: 9 },
      { cx: 15, cy: 9 },
      { cx: 12, cy: 15 },
    ],
    mistUp: true,
  },
  install: {
    flow: [
      "M12 2v4",
      "M12 18v4",
      "M4.9 4.9l2.8 2.8",
      "M16.3 16.3l2.8 2.8",
      "M2 12h4",
      "M18 12h4",
      "M4.9 19.1l2.8-2.8",
      "M16.3 7.7l2.8-2.8",
    ],
    mist: [{ cx: 12, cy: 12 }],
  },
};

const PATHS: Record<IconKey, string> = {
  tool: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  clock: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2",
  rupee: "M6 3h12M6 8h12M18 3c0 5-3 8-8 8h-4l8 10",
  thumbs:
    "M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.3a2 2 0 0 0 2-1.7l1.4-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3",
  users:
    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4",
  pin: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  headset:
    "M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z",
  ac: "M4 5h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM6 10h12M7 18l-1 3M12 18v3M17 18l1 3",
  fridge:
    "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM5 9h14M9 5v2M9 12v3",
  geyser:
    "M10 2h4a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4zM10 19v3M14 19v3M9 8h6M9 12h6",
  microwave:
    "M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM5 8h10v8H5zM18 9v1M18 13v1",
  mixer: "M8 3h8l1 8H7zM6 11h12v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zM12 14v4",
  induction:
    "M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM9 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM16 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM6 17h12",
  pcb: "M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM9 4V2M15 4V2M9 22v-2M15 22v-2M4 9H2M4 15H2M22 9h-2M22 15h-2M9 9h6v6H9z",
  install:
    "M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8",
  snow: "M12 2v20M4.9 4.9l14.2 14.2M2 12h20M4.9 19.1L19.1 4.9",
  gear: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1",
  home: "M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z",
  list: "M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM3 10h18M8 15h4",
  phone:
    "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2z",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  cog: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z",
  check: "M20 6L9 17l-5-5",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
  building:
    "M6 2h12a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM9 22v-4h6v4M9 8h.01M15 8h.01M9 12h.01M15 12h.01",
  globe:
    "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  hash: "M4 9h16M4 15h16M10 3l-2 18M16 3l-2 18",
};

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconKey;
}

export function Icon({ name, className, ...rest }: IconProps) {
  const anim = ANIMATED_ICONS[name];
  if (anim) {
    return (
      <svg
        className={className ?? "ic"}
        viewBox="0 0 24 24"
        aria-hidden="true"
        {...rest}
      >
        {anim.case?.map((d, i) => (
          // eslint-disable-next-line react/no-array-index-key -- fixed, order-stable list
          <path key={i} d={d} />
        ))}
        {anim.pulse?.map((d, i) => (
          <path
            // eslint-disable-next-line react/no-array-index-key -- fixed, order-stable list
            key={i}
            className="icon-pulse"
            style={{ animationDelay: `${(i * 0.3).toFixed(2)}s` }}
            d={d}
          />
        ))}
        {anim.flow?.map((d, i) => (
          <path
            // eslint-disable-next-line react/no-array-index-key -- fixed, order-stable list
            key={i}
            className="icon-flow"
            style={{ animationDelay: `${(i * 0.1).toFixed(2)}s` }}
            d={d}
          />
        ))}
        {anim.spin?.map((d, i) => (
          <path
            // eslint-disable-next-line react/no-array-index-key -- fixed, order-stable list
            key={i}
            className="icon-spin"
            style={{ animationDelay: `${(i * 0.1).toFixed(2)}s` }}
            d={d}
          />
        ))}
        {anim.mist?.map((p, i) => (
          <circle
            // eslint-disable-next-line react/no-array-index-key -- fixed, order-stable list
            key={i}
            className={cn("icon-mist", anim.mistUp && "icon-mist-up")}
            style={{ animationDelay: `${(i * 0.37).toFixed(2)}s` }}
            cx={p.cx}
            cy={p.cy}
            r={0.9}
          />
        ))}
      </svg>
    );
  }
  return (
    <svg
      className={className ?? "ic"}
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...rest}
    >
      <path d={PATHS[name] ?? PATHS.check} />
    </svg>
  );
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="#fff"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.6 2.8.5a2.4 2.4 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" />
    </svg>
  );
}

export function MoonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg className="ic moon" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export function SunIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg className="ic sun" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
