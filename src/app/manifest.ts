import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.title}`,
    short_name: "GAPZ.",
    description: siteConfig.seoDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#fff5e6",
    theme_color: "#2c929c",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
