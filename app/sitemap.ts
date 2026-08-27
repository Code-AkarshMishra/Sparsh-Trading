import type { MetadataRoute } from "next";
import { services } from "@/lib/business";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.APP_URL || "https://sparshtrading.shop";

  const staticRoutes = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.95 },
    { url: `${base}/products`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.95 },
    { url: `${base}/projects`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${base}/gallery`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 }
  ];

  const serviceRoutes = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9
  }));

  return [...staticRoutes, ...serviceRoutes];
}
