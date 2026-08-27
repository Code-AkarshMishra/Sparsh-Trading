import type { MetadataRoute } from "next";
import { services } from "@/lib/business";
import { detailedProducts } from "@/lib/productsCatalogueData";
import { locationsDatabase } from "@/lib/locationsData";
import { detailedProjectsData } from "@/lib/projectsDetailedData";
import { guidesData } from "@/lib/guidesData";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.APP_URL || "https://sparshtrading.shop";
  const now = new Date();

  // Core Static Landing Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/b2b`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 }
  ];

  // Core Service Pages
  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.95
  }));

  // Dedicated Product Pages
  const productRoutes: MetadataRoute.Sitemap = detailedProducts.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.95
  }));

  // Regional City Pages
  const locationRoutes: MetadataRoute.Sitemap = locationsDatabase.map((loc) => ({
    url: `${base}/locations/${loc.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9
  }));

  // Individual Project Case Studies
  const projectRoutes: MetadataRoute.Sitemap = detailedProjectsData.map((prj) => ({
    url: `${base}/projects/${prj.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85
  }));

  // Buying Guides & Explainers
  const guideRoutes: MetadataRoute.Sitemap = guidesData.map((g) => ({
    url: `${base}/guides/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...productRoutes,
    ...locationRoutes,
    ...projectRoutes,
    ...guideRoutes
  ];
}
