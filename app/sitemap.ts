import type { MetadataRoute } from "next";
import { services } from "@/lib/business";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.APP_URL || "http://localhost:3000";
  return ["", "/about", "/services", "/products", "/projects", "/gallery", "/contact", ...services.map((s) => `/services/${s.slug}`)].map((url) => ({ url: `${base}${url}`, lastModified: new Date() }));
}
