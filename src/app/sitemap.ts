import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { research } from "@/content/research";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const lastModified = new Date();
  return [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/projects`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/research`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...research.map((r) => ({ url: `${base}/research/${r.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
