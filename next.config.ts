import type { NextConfig } from "next";

const ONE_YEAR = 60 * 60 * 24 * 365;

const nextConfig: NextConfig = {
  // Required for the slim Docker runner image (copies .next/standalone).
  // Must be omitted on Vercel — its build pipeline expects the default
  // trace-file layout and breaks (ENOENT on *.nft.json) with standalone output.
  ...(process.env.VERCEL ? {} : { output: "standalone" as const }),
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // serve modern formats; cache optimised variants for 30 days
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        // hashed-name static assets: brand SVGs, photos, uploads → cache for a year
        source: "/:dir(images|brands|uploads)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${ONE_YEAR}, immutable`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
