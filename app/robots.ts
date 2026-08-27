import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.APP_URL || "https://sparshtrading.shop";
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/products/*", "/services/*", "/locations/*", "/projects/*", "/guides/*", "/b2b", "/gallery", "/about", "/contact"],
      disallow: ["/admin", "/admin/*", "/admin-login", "/dashboard", "/api/*"]
    },
    sitemap: `${base}/sitemap.xml`,
    host: "https://sparshtrading.shop"
  };
}
