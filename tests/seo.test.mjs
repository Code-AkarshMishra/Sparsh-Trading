import test from "node:test";
import assert from "node:assert/strict";
import { detailedProducts, getProductBySlug } from "../lib/productsCatalogueData.ts";
import { locationsDatabase, getLocationBySlug } from "../lib/locationsData.ts";
import { detailedProjectsData, getProjectBySlug } from "../lib/projectsDetailedData.ts";
import { guidesData, getGuideBySlug } from "../lib/guidesData.ts";
import { services } from "../lib/business.ts";

function generateTestSitemap() {
  const base = "https://sparshtrading.shop";
  const now = new Date();

  const staticRoutes = [
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

  const serviceRoutes = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.95
  }));

  const productRoutes = detailedProducts.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.95
  }));

  const locationRoutes = locationsDatabase.map((loc) => ({
    url: `${base}/locations/${loc.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9
  }));

  const projectRoutes = detailedProjectsData.map((prj) => ({
    url: `${base}/projects/${prj.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85
  }));

  const guideRoutes = guidesData.map((g) => ({
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

test("Product Catalogue Data Quality & Schema Integrity", () => {
  assert.ok(detailedProducts.length >= 8, "Must have at least 8 flagship products");

  for (const product of detailedProducts) {
    assert.ok(product.slug && product.slug.length > 3, `Product slug valid: ${product.slug}`);
    assert.ok(product.name && product.name.length > 5, `Product name valid: ${product.name}`);
    assert.ok(product.metaTitle && product.metaTitle.includes("Sparsh Trading"), `Meta title contains brand: ${product.metaTitle}`);
    assert.ok(product.metaDescription && product.metaDescription.length > 50, `Meta description rich: ${product.metaDescription}`);
    assert.ok(product.keywords && product.keywords.length >= 4, "Keywords array populated");
    assert.ok(product.customization && product.customization.length > 5, "Customization info is populated");
    assert.ok(product.specifications && product.specifications.length >= 4, "Specifications array populated");
    assert.ok(product.faqs && product.faqs.length >= 1, "Product has FAQs for rich snippets");

    const found = getProductBySlug(product.slug);
    assert.equal(found?.slug, product.slug, "getProductBySlug retrieves product correctly");
  }
});

test("Local SEO Regional Database Integrity", () => {
  assert.ok(locationsDatabase.length >= 8, "Must have at least 8 UP regional cities");

  const requiredCities = ["pratapgarh", "sultanpur", "jaunpur", "prayagraj", "varanasi", "lucknow", "ayodhya", "raebareli"];
  for (const city of requiredCities) {
    const loc = getLocationBySlug(city);
    assert.ok(loc, `Location exists for city: ${city}`);
    assert.ok(loc.localities && loc.localities.length >= 4, `Localities populated for ${city}`);
    assert.ok(loc.localReview && loc.localReview.quote.length > 20, `Local customer review present for ${city}`);
    assert.ok(loc.metaTitle && loc.metaDescription, `Meta tags valid for ${city}`);
  }
});

test("Individual Project Case Studies Integrity", () => {
  assert.ok(detailedProjectsData.length >= 4, "Must have at least 4 detailed case studies");

  for (const prj of detailedProjectsData) {
    assert.ok(prj.slug, `Project slug valid: ${prj.slug}`);
    assert.ok(prj.title, `Project title valid: ${prj.title}`);
    assert.ok(prj.scopeOfWork && prj.scopeOfWork.length >= 3, "Scope of work items populated");
    assert.ok(prj.materialsUsed && prj.materialsUsed.length >= 3, "Materials used populated");
    assert.ok(prj.clientTestimonial && prj.clientTestimonial.rating === 5, "Testimonial present");

    const found = getProjectBySlug(prj.slug);
    assert.equal(found?.slug, prj.slug, "getProjectBySlug retrieves project");
  }
});

test("Topical Authority Buying Guides Integrity", () => {
  assert.ok(guidesData.length >= 5, "Must have at least 5 in-depth buying guides");

  for (const guide of guidesData) {
    assert.ok(guide.slug, `Guide slug valid: ${guide.slug}`);
    assert.ok(guide.tableOfContents && guide.tableOfContents.length >= 3, "TOC populated");
    assert.ok(guide.contentSections && guide.contentSections.length >= 2, "Content sections populated");
    assert.ok(guide.faqs && guide.faqs.length >= 1, "Guide has FAQs");

    const found = getGuideBySlug(guide.slug);
    assert.equal(found?.slug, guide.slug, "getGuideBySlug retrieves guide");
  }
});

test("Dynamic Sitemap XML Completeness & Coverage", () => {
  const map = generateTestSitemap();
  assert.ok(Array.isArray(map), "Sitemap must return array of routes");
  assert.ok(map.length >= 30, `Sitemap must contain 30+ URLs (got ${map.length})`);

  const urls = map.map((entry) => entry.url);
  assert.ok(urls.some((u) => u.includes("/products/tata-steel-door-frames-chaukhat")), "Includes product route");
  assert.ok(urls.some((u) => u.includes("/locations/pratapgarh")), "Includes location route");
  assert.ok(urls.some((u) => u.includes("/projects/civil-lines-modular-kitchen")), "Includes project route");
  assert.ok(urls.some((u) => u.includes("/guides/upvc-vs-aluminium-windows-guide")), "Includes guide route");
  assert.ok(urls.some((u) => u.includes("/b2b")), "Includes B2B portal route");
});

test("WebP Image Asset Optimization & Master Preservation Verification", async () => {
  const fs = await import("node:fs");
  const path = await import("node:path");

  // Check product images
  for (const product of detailedProducts) {
    assert.ok(product.image.endsWith(".webp"), `Product image must serve .webp: ${product.image}`);
    const localPath = path.resolve("public", product.image.replace(/^\//, ""));
    assert.ok(fs.existsSync(localPath), `WebP file exists on disk: ${localPath}`);
  }

  // Check project images
  for (const prj of detailedProjectsData) {
    assert.ok(prj.image.endsWith(".webp"), `Project image must serve .webp: ${prj.image}`);
    const localPath = path.resolve("public", prj.image.replace(/^\//, ""));
    assert.ok(fs.existsSync(localPath), `WebP file exists on disk: ${localPath}`);
  }

  // Check brand logo WebP and master PNG preservation
  const webpLogo = path.resolve("public", "brand-logo.webp");
  const masterLogo = path.resolve("public", "brand-logo.png");
  assert.ok(fs.existsSync(webpLogo), "brand-logo.webp exists");
  assert.ok(fs.existsSync(masterLogo), "Master brand-logo.png is preserved");

  const webpWordmark = path.resolve("public", "brand-wordmark.webp");
  const masterWordmark = path.resolve("public", "brand-wordmark.png");
  assert.ok(fs.existsSync(webpWordmark), "brand-wordmark.webp exists");
  assert.ok(fs.existsSync(masterWordmark), "Master brand-wordmark.png is preserved");
});
