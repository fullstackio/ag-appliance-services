export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export const homeFooterColumns: FooterColumn[] = [
  {
    title: "Expertise",
    links: [
      { label: "AC & Cooling", href: "#skills" },
      { label: "Refrigeration", href: "#services" },
      { label: "Washing Machines", href: "#services" },
      { label: "Experience", href: "#experience" },
      { label: "Projects", href: "#projects" },
    ],
  },
  {
    title: "Useful Links",
    links: [
      { label: "Home", href: "#home" },
      { label: "About Me", href: "#about" },
      { label: "Education", href: "#education" },
      { label: "Blog & News", href: "#blog" },
      { label: "Contact", href: "#contact" },
      { label: "Back to Top", href: "#main" },
    ],
  },
];

export const pageFooterColumns: FooterColumn[] = [
  {
    title: "Services",
    links: [
      { label: "AC Repair", href: "/#services" },
      { label: "Refrigerator Repair", href: "/#services" },
      { label: "Washing Machine Repair", href: "/#services" },
      { label: "My Workflow", href: "/#workflow" },
      { label: "Experience", href: "/#stats" },
    ],
  },
  {
    title: "Useful Links",
    links: [
      { label: "Home", href: "/#home" },
      { label: "About Me", href: "/#about" },
      { label: "Testimonials", href: "/#testimonials" },
      { label: "Blog & News", href: "/blog" },
      { label: "Contact", href: "/#contact" },
      { label: "Back to Top", href: "#main" },
    ],
  },
];
