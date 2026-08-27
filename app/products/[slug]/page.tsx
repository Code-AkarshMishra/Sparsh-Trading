import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { detailedProducts, getProductBySlug } from "@/lib/productsCatalogueData";
import { business } from "@/lib/business";
import { regionalCities } from "@/lib/seoKeywords";
import { ShieldCheckIcon, PhoneIcon, MapPinIcon, ArrowRightIcon } from "@/components/Icons";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const baseUrl = process.env.APP_URL || "https://sparshtrading.shop";
  const url = `${baseUrl}/products/${product.slug}`;

  return {
    title: product.metaTitle,
    description: product.metaDescription,
    keywords: product.keywords,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: product.metaTitle,
      description: product.metaDescription,
      url,
      siteName: "Sparsh Trading",
      images: [
        {
          url: `${baseUrl}${product.image}`,
          width: 1200,
          height: 630,
          alt: product.name
        }
      ],
      type: "website",
      locale: "en_IN"
    },
    twitter: {
      card: "summary_large_image",
      title: product.metaTitle,
      description: product.metaDescription,
      images: [`${baseUrl}${product.image}`]
    }
  };
}

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const baseUrl = process.env.APP_URL || "https://sparshtrading.shop";

  // Product Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${baseUrl}${product.image}`,
    category: product.category,
    material: product.material,
    brand: {
      "@type": "Brand",
      name: "Sparsh Trading"
    },
    manufacturer: {
      "@type": "Organization",
      name: "Sparsh Trading",
      url: baseUrl,
      telephone: "+91-8795662161",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Meera Bhawan, Near Meera Bhawan Chauraha, Ashtbhuja Nagar",
        addressLocality: "Pratapgarh",
        addressRegion: "Uttar Pradesh",
        postalCode: "230001",
        addressCountry: "IN"
      }
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: "1000",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      url: `${baseUrl}/products/${product.slug}`,
      seller: {
        "@type": "Organization",
        name: "Sparsh Trading"
      }
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "128"
    }
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products Catalogue",
        item: `${baseUrl}/products`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${baseUrl}/products/${product.slug}`
      }
    ]
  };

  // FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a
      }
    }))
  };

  return (
    <main className="section subpage-main" style={{ paddingBottom: 64 }}>
      {/* Microdata JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="wrap">
        {/* Breadcrumb Trail */}
        <nav aria-label="Breadcrumb" style={{ fontSize: "0.85rem", marginBottom: 18, display: "flex", gap: 6, flexWrap: "wrap", color: "var(--muted)" }}>
          <Link href="/" style={{ color: "var(--text)", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link href="/products" style={{ color: "var(--text)", textDecoration: "none" }}>Products</Link>
          <span>/</span>
          <span style={{ color: "var(--red-2)", fontWeight: 600 }}>{product.name}</span>
        </nav>

        {/* Product Hero Split */}
        <div className="split" style={{ alignItems: "start", gap: 36, marginBottom: 44 }}>
          {/* Left: Media & Gallery */}
          <div>
            <div
              className="card"
              style={{
                overflow: "hidden",
                borderRadius: 12,
                border: "1px solid var(--border)",
                padding: 0,
                position: "relative",
                aspectRatio: "16/10",
                background: "#111"
              }}
            >
              <img
                src={product.image}
                alt={`${product.name} manufactured by Sparsh Trading in Pratapgarh UP`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <span
                style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  background: "rgba(0,0,0,0.75)",
                  backdropFilter: "blur(8px)",
                  color: "#fff",
                  padding: "4px 12px",
                  borderRadius: 20,
                  fontSize: "0.76rem",
                  fontWeight: 700
                }}
              >
                {product.category}
              </span>
            </div>

            {/* Thumbnail Previews */}
            {product.galleryImages.length > 1 && (
              <div style={{ display: "flex", gap: 10, marginTop: 12, overflowX: "auto" }}>
                {product.galleryImages.map((img, i) => (
                  <div
                    key={i}
                    style={{
                      width: 80,
                      height: 56,
                      borderRadius: 8,
                      overflow: "hidden",
                      border: "1px solid var(--border)",
                      flexShrink: 0
                    }}
                  >
                    <img src={img} alt={`Showcase photo ${i + 1} for ${product.name}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Commercial Overview & Quick Action */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span className="brand-dot-pulse" />
              <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
                {product.category}
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.3rem)", fontWeight: 800, lineHeight: 1.25, margin: "6px 0 12px", color: "var(--strong)" }}>
              {product.name}
            </h1>

            <p className="muted" style={{ fontSize: "1rem", lineHeight: 1.6, marginBottom: 20 }}>
              {product.heroTagline}
            </p>

            {/* Customization & Guarantee Badges */}
            <div
              className="card"
              style={{
                padding: "16px 20px",
                borderRadius: 10,
                border: "1px solid var(--border)",
                marginBottom: 20
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "var(--muted)", display: "block" }}>Customization &amp; Sizing:</span>
                  <span style={{ fontSize: "1.02rem", fontWeight: 700, color: "var(--strong)" }}>{product.customization}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--muted)", display: "block" }}>Warranty / Quality Promise:</span>
                  <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#16a34a", display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <ShieldCheckIcon width={16} height={16} />
                    {product.warranty}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Specs Summary */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 22, fontSize: "0.88rem" }}>
              <div style={{ padding: "10px 14px", border: "1px solid var(--border)", borderRadius: 8 }}>
                <span className="muted" style={{ fontSize: "0.78rem", display: "block" }}>Material Grade</span>
                <strong style={{ color: "var(--strong)" }}>{product.material.split("+")[0]}</strong>
              </div>
              <div style={{ padding: "10px 14px", border: "1px solid var(--border)", borderRadius: 8 }}>
                <span className="muted" style={{ fontSize: "0.78rem", display: "block" }}>Standard Lead Time</span>
                <strong style={{ color: "var(--strong)" }}>{product.leadTime}</strong>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link
                className="btn primary"
                href={`/contact?product=${encodeURIComponent(product.name)}`}
                style={{ flex: "1 1 180px", padding: "12px 18px", textAlign: "center", fontSize: "0.95rem", fontWeight: 700, borderRadius: 8 }}
              >
                Get a Fast Quote
                <ArrowRightIcon width={16} height={16} />
              </Link>
              <a
                className="btn whatsapp-action"
                href={`https://wa.me/?text=${encodeURIComponent(`Check out ${product.name} from Sparsh Trading (Pratapgarh, UP):\n${product.heroTagline}\nView full design & specs: https://sparshtrading.shop/products/${product.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700, fontSize: "0.9rem", borderRadius: 8, display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                📲 Share on WhatsApp
              </a>
              <a
                className="btn"
                href={`tel:${business.phones[0]}`}
                style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, fontSize: "0.9rem", borderRadius: 8 }}
              >
                <PhoneIcon width={15} height={15} />
                Call +91 {business.phones[0]}
              </a>
            </div>
          </div>
        </div>

        {/* Deep Description & Key Features */}
        <div className="cards" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 40 }}>
          <div className="card" style={{ padding: "24px 22px", borderRadius: 12, border: "1px solid var(--border)" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 10, color: "var(--strong)" }}>About This Product</h2>
            <p style={{ lineHeight: 1.65, fontSize: "0.94rem", color: "var(--text)", margin: "0 0 16px" }}>{product.description}</p>

            <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: "16px 0 8px", color: "var(--strong)" }}>Recommended For</h3>
            <ul style={{ paddingLeft: 18, margin: 0, lineHeight: 1.7, fontSize: "0.9rem", color: "var(--text)" }}>
              {product.applications.map((app, i) => (
                <li key={i}>{app}</li>
              ))}
            </ul>
          </div>

          <div className="card" style={{ padding: "24px 22px", borderRadius: 12, border: "1px solid var(--border)" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 12, color: "var(--strong)" }}>Key Features &amp; Quality Points</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {product.features.map((feat, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "start" }}>
                  <span style={{ color: "var(--red-2)", fontWeight: 800, fontSize: "1rem" }}>✓</span>
                  <span style={{ fontSize: "0.92rem", lineHeight: 1.5, color: "var(--text)" }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Specifications Table */}
        <div className="card" style={{ padding: "26px 24px", marginBottom: 40, borderRadius: 12, border: "1px solid var(--border)" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: 4, color: "var(--strong)" }}>Material &amp; Dimensions Breakdown</h2>
          <p className="muted" style={{ marginBottom: 18, fontSize: "0.9rem" }}>Workshop dimensions and material grades for {product.name}.</p>

          <div style={{ overflowX: "auto", borderRadius: 8, border: "1px solid var(--border)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.92rem" }}>
              <tbody>
                {product.specifications.map((spec, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "transparent" : "var(--surface-2)" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--strong)", width: "35%" }}>{spec.label}</td>
                    <td style={{ padding: "12px 16px", color: "var(--text)" }}>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        {product.faqs.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: 6, textAlign: "center", color: "var(--strong)" }}>
              Common Questions &amp; Helpful Answers
            </h2>
            <p className="muted" style={{ textAlign: "center", marginBottom: 20, fontSize: "0.92rem" }}>
              Straightforward details on customization, durability, and on-site fitting.
            </p>

            <div className="cards" style={{ gridTemplateColumns: "1fr", gap: 12, maxWidth: 840, margin: "0 auto" }}>
              {product.faqs.map((faq, i) => (
                <div key={i} className="card" style={{ padding: "18px 20px", border: "1px solid var(--border)", borderRadius: 10 }}>
                  <h3 style={{ margin: "0 0 6px", fontSize: "1.02rem", fontWeight: 700, color: "var(--strong)" }}>{faq.q}</h3>
                  <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.6, color: "var(--text)" }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Local Area Delivery & Internal Linking Footprint */}
        <div className="card" style={{ padding: "28px 24px", borderRadius: 12, textAlign: "center", border: "1px solid var(--border)" }}>
          <span className="eyebrow" style={{ color: "var(--red-2)" }}>Delivery &amp; Fitting</span>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "6px 0 10px", color: "var(--strong)" }}>
            Available with Free Site Laser Measurement Across Uttar Pradesh
          </h2>
          <p className="muted" style={{ maxWidth: 680, margin: "0 auto 16px", fontSize: "0.9rem" }}>
            Sparsh Trading delivers and fits {product.name.toLowerCase()} with precision alignment across:
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 800, margin: "0 auto 22px" }}>
            {regionalCities.slice(0, 8).map((city) => (
              <Link
                key={city}
                href={`/locations/${city.toLowerCase()}`}
                style={{
                  fontSize: "0.82rem",
                  padding: "6px 14px",
                  borderRadius: 20,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  textDecoration: "none",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5
                }}
              >
                <MapPinIcon width={12} height={12} style={{ color: "var(--red-2)" }} />
                {product.name.split(" ")[0]} in {city}
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <Link className="btn" href="/products" style={{ borderRadius: 8, fontSize: "0.9rem" }}>
              ← View All Products
            </Link>
            <Link className="btn" href={`/services/${product.relatedServiceSlug}`} style={{ borderRadius: 8, fontSize: "0.9rem" }}>
              Related Service
            </Link>
            <Link className="btn primary" href={`/contact?product=${encodeURIComponent(product.name)}`} style={{ borderRadius: 8, fontSize: "0.9rem" }}>
              Request Site Measurement
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
