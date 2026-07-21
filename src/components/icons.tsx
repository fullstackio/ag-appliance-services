import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const TerminalIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.6} {...p}>
    <polyline points="4 7 9 12 4 17" />
    <line x1="12" y1="17" x2="20" y2="17" />
  </svg>
);

export const CodeIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.6} {...p}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

/** Chevrons pointing in/out — used by service + skill "Frontend" icon. */
export const CodeChevronIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.6} {...p}>
    <polyline points="8 7 3 12 8 17" />
    <polyline points="16 7 21 12 16 17" />
  </svg>
);

export const DatabaseIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.5} {...p}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14a9 3 0 0 0 18 0V5" />
    <path d="M3 12a9 3 0 0 0 18 0" />
  </svg>
);

export const BoltIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.5} {...p}>
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

export const GitBranchIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.5} {...p}>
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="8" r="3" />
    <path d="M18 11a6 6 0 0 1-6 6H9" />
    <line x1="6" y1="9" x2="6" y2="15" />
  </svg>
);

export const BracesIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.5} {...p}>
    <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1" />
    <path d="M16 3h1a2 2 0 0 1 2 2v5a2 2 0 0 0 2 2 2 2 0 0 0-2 2v5a2 2 0 0 1-2 2h-1" />
  </svg>
);

export const CpuIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.4} {...p}>
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
  </svg>
);

export const CmsIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.6} {...p}>
    <path d="M3 3h18v6H3z" />
    <path d="M3 15h18v6H3z" />
    <path d="M7 6h.01M7 18h.01" />
  </svg>
);

export const WrenchIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.7} {...p}>
    <path d="M14.7 6.3a4 4 0 0 0-5.6 5.6l-6 6a1 1 0 0 0 1.4 1.4l6-6a4 4 0 0 0 5.6-5.6l-2.1 2.1-2.1-.7-.7-2.1z" />
  </svg>
);

export const MoonIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.8} {...p}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const SunIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.8} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

export const PhoneIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.7} {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const ChevronLeftIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.8} {...p}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export const ChevronRightIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.8} {...p}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const SearchIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.8} {...p}>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

/** Small tag/bookmark icon shown before post categories. */
export const PostTagIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.7} {...p}>
    <line x1="12" y1="17" x2="12" y2="22" />
    <path d="M9 4h6l-1 5 3 3v1H7v-1l3-3-1-5z" />
  </svg>
);
