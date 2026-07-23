import type { NavLink } from "@/lib/types";

export const siteConfig = {
  name: "Avijit Ghosh",
  phone: "+91 85838 22906",
  phoneHref: "tel:+918583822906",
  emails: ["service.avi@gmail.com", "support.avi462@outlook.com"],
  location: "Barrackpore, Kolkata 700122",
  linkedin: "https://www.linkedin.com/in/avijit-appliance-technician",
  github: "https://github.com/",
};

/** Primary nav used on the home page (in-page anchors). */
export const homeNav: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

/** Nav used on secondary pages (blog) — links back to the home sections. */
export const pageNav: NavLink[] = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Workflow", href: "/#workflow" },
  { label: "Reviews", href: "/#testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Contacts", href: "/#contact" },
];
