import { env } from "@/lib/env";

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const legal = ["/privacy-policy", "/terms-and-conditions", "/cookies-policy"].map((p) => ({
    url: `${env.NEXT_PUBLIC_SITE_URL}${p}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));
  return [
    ...legal,
    {
      url: env.NEXT_PUBLIC_SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
