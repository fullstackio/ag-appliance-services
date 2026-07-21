export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export const homeFooterColumns: FooterColumn[] = [
  {
    title: "Expertise",
    links: [
      { label: "Frontend & React", href: "#skills" },
      { label: "WordPress & CMS", href: "#services" },
      { label: "Performance & APIs", href: "#services" },
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
      { label: "Software Development", href: "/#services" },
      { label: "Appliance Repair", href: "/#services" },
      { label: "Bike & Car Wash", href: "/#services" },
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
