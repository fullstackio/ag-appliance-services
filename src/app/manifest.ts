import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AG Appliance Services — Kolkata",
    short_name: "AG Appliance",
    description:
      "Expert doorstep repair for AC, refrigerator, geyser, microwave, mixer grinder, induction and PCB in Kolkata.",
    start_url: "/",
    display: "standalone",
    background_color: "#121212",
    theme_color: "#B8712F",
    icons: [
      { src: "/images/logo.png", sizes: "512x512", type: "image/png" },
      { src: "/images/logo.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
