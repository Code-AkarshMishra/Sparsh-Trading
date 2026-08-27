import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { locationsDatabase, getLocationBySlug } from "@/lib/locationsData";
import { business } from "@/lib/business";
import { detailedProducts } from "@/lib/productsCatalogueData";
import { MapPinIcon, ArrowRightIcon } from "@/components/Icons";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) return {};

  const baseUrl = process.env.APP_URL || "https://sparshtrading.shop";
  const url = `${baseUrl}/locations/${location.slug}`;

  return {
    title: location.metaTitle,
    description: location.metaDescription,
    keywords: [
      `steel fabrication in ${location.name}`,
      `metal work ${location.name}`,
      `upvc windows in ${location.name}`,
      `modular kitchen ${location.name}`,
      `toughened glass railing ${location.name}`,
      `tata steel chaukhat ${location.name}`,
      `sparsh trading ${location.name}`
    ],
    alternates: { canonical: url },
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      url,
      siteName: "Sparsh Trading",
      images: [
        {
          url: `${baseUrl}/brand-wordmark.png`,
          width: 1200,
          height: 630,
          alt: `${location.name} Metal Fabrication Sparsh Trading`
        }
      ],
      type: "website"
    }
  };
}

export default async function LocationPage({
  params
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) notFound();

  const baseUrl = process.env.APP_URL || "https://sparshtrading.shop";

  // LocalBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: `Sparsh Trading - ${location.name}`,
    description: location.metaDescription,
    url: `${baseUrl}/locations/${location.slug}`,
    telephone: "+91-8795662161",
    priceRange: "₹₹",
    image: `${baseUrl}/brand-wordmark.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Meera Bhawan, Near Meera Bhawan Chauraha, Ashtbhuja Nagar",
      addressLocality: location.name,
      addressRegion: "Uttar Pradesh",
      postalCode: "230001",
      addressCountry: "IN"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.9191811,
      longitude: 81.9781645
    },
    areaServed: location.localities,
    review: {
      "@type": "Review",
      author: { "@type": "Person", name: location.localReview.author },
      reviewBody: location.localReview.quote,
      reviewRating: {
        "@type": "Rating",
        ratingValue: location.localReview.rating,
        bestRating: 5
      }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${baseUrl}/#locations` },
      { "@type": "ListItem", position: 3, name: location.name, item: `${baseUrl}/locations/${location.slug}` }
    ]
  };

  return (
    <main className="section subpage-main" style={{ paddingBottom: 64 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="wrap">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" style={{ fontSize: "0.85rem", marginBottom: 18, display: "flex", gap: 6, flexWrap: "wrap", color: "var(--muted)" }}>
          <Link href="/" style={{ color: "var(--text)", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <span>Locations</span>
          <span>/</span>
          <span style={{ color: "var(--red-2)", fontWeight: 600 }}>{location.name} ({location.hindiName})</span>
        </nav>

        {/* Hero Section */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span className="brand-dot-pulse" />
          <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
            Serving {location.name}, Uttar Pradesh
          </span>
        </div>

        <h1 className="big-title" style={{ maxWidth: 880 }}>
          {location.headline}
        </h1>

        <p className="section-lead" style={{ maxWidth: 820, margin: "0 0 24px" }}>
          {location.metaDescription}
        </p>

        {/* Distance & Quick Logistics Info */}
        <div
          className="card"
          style={{
            padding: "16px 20px",
            borderRadius: 10,
            border: "1px solid var(--border)",
            marginBottom: 32
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <div>
              <span style={{ fontSize: "0.8rem", color: "var(--muted)", display: "block" }}>Workshop &amp; Delivery from Pratapgarh:</span>
              <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--strong)" }}>{location.distanceFromPratapgarh}</span>
            </div>
            <div>
              <Link
                className="btn primary"
                href={`/contact?location=${encodeURIComponent(location.name)}`}
                style={{ fontSize: "0.86rem", padding: "8px 16px", borderRadius: 8 }}
              >
                Book Free Site Visit in {location.name}
                <ArrowRightIcon width={13} height={13} />
              </Link>
            </div>
          </div>
        </div>

        {/* Key Service Highlights in this City */}
        <div className="cards" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18, marginBottom: 40 }}>
          {location.serviceHighlights.map((highlight, idx) => (
            <div key={idx} className="card" style={{ padding: "20px 18px", borderRadius: 10, border: "1px solid var(--border)" }}>
              <span style={{ color: "var(--red-2)", fontWeight: 800, fontSize: "1.1rem", display: "block", marginBottom: 6 }}>
                0{idx + 1}
              </span>
              <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.5, color: "var(--text)", fontWeight: 500 }}>
                {highlight}
              </p>
            </div>
          ))}
        </div>

        {/* Core Products Available in this City */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 6, color: "var(--strong)" }}>
            Popular Products Supplied in {location.name}
          </h2>
          <p className="muted" style={{ marginBottom: 18, fontSize: "0.92rem" }}>
            Direct workshop pricing, on-site laser measurements, and neat on-site installation.
          </p>

          <div className="cards" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
            {detailedProducts.slice(0, 6).map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="card"
                style={{ textDecoration: "none", color: "inherit", padding: "18px 18px", borderRadius: 10, border: "1px solid var(--border)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: "0.72rem", color: "var(--red-2)", fontWeight: 700, textTransform: "uppercase" }}>
                      {p.category}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 6px", color: "var(--strong)", lineHeight: 1.35 }}>
                    {p.name}
                  </h3>
                  <p className="muted" style={{ fontSize: "0.86rem", lineHeight: 1.5, margin: "0 0 10px" }}>
                    {p.heroTagline}
                  </p>
                </div>
                <span style={{ fontSize: "0.82rem", color: "var(--red-2)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4 }}>
                  View Details &amp; Sizes in {location.name}
                  <ArrowRightIcon width={12} height={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Served Localities in this City */}
        <div className="card" style={{ padding: "26px 24px", marginBottom: 40, borderRadius: 12, border: "1px solid var(--border)" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: 6, color: "var(--strong)" }}>
            Areas We Cover in {location.name}
          </h2>
          <p className="muted" style={{ marginBottom: 16, fontSize: "0.9rem" }}>
            Our fabrication and fitting team regularly takes measurements and completes installations across:
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {location.localities.map((loc) => (
              <span
                key={loc}
                style={{
                  fontSize: "0.82rem",
                  border: "1px solid var(--border)",
                  padding: "5px 12px",
                  borderRadius: 20,
                  fontWeight: 600,
                  color: "var(--text)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4
                }}
              >
                <MapPinIcon width={12} height={12} style={{ color: "var(--red-2)" }} />
                {loc}
              </span>
            ))}
          </div>
        </div>

        {/* Customer Review Proof */}
        <div
          className="card"
          style={{
            padding: "26px 24px",
            borderLeft: "4px solid var(--red-2)",
            borderRadius: 12,
            border: "1px solid var(--border)",
            borderLeftColor: "var(--red-2)",
            marginBottom: 40
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 8, color: "#f59e0b", fontSize: "1rem" }}>
            {"★".repeat(location.localReview.rating)}
          </div>
          <p style={{ fontSize: "0.98rem", fontStyle: "italic", lineHeight: 1.6, color: "var(--strong)", margin: "0 0 10px" }}>
            "{location.localReview.quote}"
          </p>
          <div style={{ fontSize: "0.88rem", color: "var(--muted)", fontWeight: 600 }}>
            — {location.localReview.author}, <span style={{ color: "var(--red-2)" }}>{location.localReview.locality}</span>
          </div>
        </div>

        {/* Other Regional Cities Footprint */}
        <div className="card" style={{ padding: "26px 24px", textAlign: "center", borderRadius: 12, border: "1px solid var(--border)" }}>
          <span className="eyebrow" style={{ color: "var(--red-2)" }}>Explore Other Cities</span>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "6px 0 12px", color: "var(--strong)" }}>
            Sparsh Trading Across Uttar Pradesh
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 800, margin: "0 auto 20px" }}>
            {locationsDatabase.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                style={{
                  fontSize: "0.82rem",
                  padding: "5px 12px",
                  borderRadius: 20,
                  background: loc.slug === location.slug ? "var(--red-2)" : "transparent",
                  color: loc.slug === location.slug ? "#ffffff" : "var(--text)",
                  border: "1px solid var(--border)",
                  textDecoration: "none",
                  fontWeight: 600
                }}
              >
                {loc.name} ({loc.hindiName})
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <Link className="btn" href="/services" style={{ borderRadius: 8, fontSize: "0.9rem" }}>
              Browse Services
            </Link>
            <Link className="btn" href="/products" style={{ borderRadius: 8, fontSize: "0.9rem" }}>
              Product Catalogue
            </Link>
            <Link className="btn primary" href={`/contact?location=${encodeURIComponent(location.name)}`} style={{ borderRadius: 8, fontSize: "0.9rem" }}>
              Contact Us in {location.name}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
