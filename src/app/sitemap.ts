import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { research } from "@/content/research";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  return [
    { url: base, priority: 1 },
    { url: `${base}/projects`, priority: 0.8 },
    { url: `${base}/research`, priority: 0.7 },
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}`, priority: 0.6 })),
    ...research.map((r) => ({ url: `${base}/research/${r.slug}`, priority: 0.5 })),
  ];
}
