/** "#services" → "/#services" when rendered off the home page; "#book" keeps opening the dialog. */
export const sectionHref = (href: string, base = ""): string =>
  base && href.startsWith("#") && href !== "#book" ? `${base}${href}` : href;
