import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/resume`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
