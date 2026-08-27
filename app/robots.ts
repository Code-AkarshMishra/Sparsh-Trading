import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.APP_URL || "https://sparshtrading.shop";
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/dashboard"] },
    sitemap: `${base}/sitemap.xml`,
    host: "https://sparshtrading.shop"
  };
}

