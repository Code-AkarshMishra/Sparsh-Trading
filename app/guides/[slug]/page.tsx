import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { guidesData, getGuideBySlug } from "@/lib/guidesData";
import { business } from "@/lib/business";
import { ClockIcon, CalendarIcon, ArrowRightIcon } from "@/components/Icons";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  const baseUrl = process.env.APP_URL || "https://sparshtrading.shop";
  const url = `${baseUrl}/guides/${guide.slug}`;

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    keywords: guide.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url,
      siteName: "Sparsh Trading",
      images: [
        {
          url: `${baseUrl}/brand-wordmark.png`,
          width: 1200,
          height: 630,
          alt: guide.title
        }
      ],
      type: "article"
    }
  };
}

export default async function GuideDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const baseUrl = process.env.APP_URL || "https://sparshtrading.shop";

  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: guide.title,
    description: guide.metaDescription,
    author: {
      "@type": "Organization",
      name: "Sparsh Trading Engineering Team",
      url: baseUrl
    },
    publisher: {
      "@type": "Organization",
      name: "Sparsh Trading",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/brand-wordmark.png`
      }
    },
    datePublished: "2026-08-01",
    dateModified: new Date().toISOString().split("T")[0],
    mainEntityOfPage: `${baseUrl}/guides/${guide.slug}`
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${baseUrl}/guides` },
      { "@type": "ListItem", position: 3, name: guide.title, item: `${baseUrl}/guides/${guide.slug}` }
    ]
  };

  return (
    <main className="section subpage-main" style={{ paddingBottom: 64 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="wrap" style={{ maxWidth: 880 }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ fontSize: "0.85rem", marginBottom: 18, display: "flex", gap: 6, flexWrap: "wrap", color: "var(--muted)" }}>
          <Link href="/" style={{ color: "var(--text)", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link href="/guides" style={{ color: "var(--text)", textDecoration: "none" }}>Guides</Link>
          <span>/</span>
          <span style={{ color: "var(--red-2)", fontWeight: 600 }}>{guide.category}</span>
        </nav>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span className="brand-dot-pulse" />
          <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
            {guide.category} Guide
          </span>
        </div>

        <h1 style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.4rem)", fontWeight: 800, lineHeight: 1.25, marginBottom: 14, color: "var(--strong)" }}>
          {guide.title}
        </h1>

        <div style={{ display: "flex", gap: 18, flexWrap: "wrap", fontSize: "0.85rem", color: "var(--muted)", marginBottom: 28 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <ClockIcon width={14} height={14} />
            {guide.readTime}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <CalendarIcon width={14} height={14} />
            Published: {guide.publishedDate}
          </span>
          <span>By Sparsh Trading Team</span>
        </div>

        {/* Summary Card */}
        <div className="card" style={{ padding: "22px 24px", borderLeft: "4px solid var(--red-2)", borderRadius: 10, marginBottom: 32 }}>
          <p style={{ margin: 0, fontSize: "1.02rem", lineHeight: 1.7, color: "var(--strong)" }}>
            {guide.summary}
          </p>
        </div>

        {/* Table of Contents */}
        {guide.tableOfContents.length > 0 && (
          <div className="card" style={{ padding: "22px 24px", borderRadius: 10, marginBottom: 36, border: "1px solid var(--border)" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 10px", color: "var(--strong)" }}>
              Table of Contents
            </h2>
            <ul style={{ paddingLeft: 20, margin: 0, lineHeight: 1.8, fontSize: "0.92rem" }}>
              {guide.tableOfContents.map((item, i) => (
                <li key={i} style={{ color: "var(--red-2)", fontWeight: 600 }}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Content Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32, marginBottom: 44 }}>
          {guide.contentSections.map((sec, i) => (
            <article key={i}>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: 12, color: "var(--strong)" }}>
                {sec.heading}
              </h2>
              <p style={{ fontSize: "0.98rem", lineHeight: 1.75, color: "var(--text)", marginBottom: 16 }}>
                {sec.body}
              </p>

              {sec.table && (
                <div style={{ overflowX: "auto", margin: "20px 0", borderRadius: 8, border: "1px solid var(--border)" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
                    <thead>
                      <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}>
                        {sec.table.headers.map((h, hi) => (
                          <th key={hi} style={{ padding: "12px 16px", color: "var(--strong)", fontWeight: 700 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sec.table.rows.map((row, ri) => (
                        <tr key={ri} style={{ borderBottom: "1px solid var(--border)", background: ri % 2 === 0 ? "transparent" : "var(--surface-2)" }}>
                          {row.map((cell, ci) => (
                            <td key={ci} style={{ padding: "12px 16px", color: "var(--text)", fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* FAQs */}
        {guide.faqs.length > 0 && (
          <div style={{ marginBottom: 44 }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: 16, color: "var(--strong)" }}>
              Frequently Asked Questions
            </h2>
            <div className="cards" style={{ gridTemplateColumns: "1fr", gap: 12 }}>
              {guide.faqs.map((faq, i) => (
                <div key={i} className="card" style={{ padding: "18px 20px", borderLeft: "3px solid var(--red-2)", borderRadius: 8, border: "1px solid var(--border)", borderLeftColor: "var(--red-2)" }}>
                  <h3 style={{ margin: "0 0 6px", fontSize: "1.02rem", fontWeight: 700, color: "var(--strong)" }}>{faq.q}</h3>
                  <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.6, color: "var(--text)" }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Consultation Callout */}
        <div className="card" style={{ padding: "32px 24px", textAlign: "center", background: "var(--surface-2)", borderRadius: 12, border: "1px solid var(--border)" }}>
          <span className="eyebrow" style={{ color: "var(--red-2)" }}>Need Expert Material Advice?</span>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "6px 0 10px", color: "var(--strong)" }}>
            Speak Directly with Our Engineering Workshop
          </h2>
          <p className="muted" style={{ maxWidth: 620, margin: "0 auto 20px", fontSize: "0.92rem" }}>
            Get honest material recommendations, laser site survey appointments, and transparent quotations.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <Link className="btn" href="/guides" style={{ borderRadius: 8, fontSize: "0.9rem" }}>
              ← View All Guides
            </Link>
            {guide.relatedProductSlug && (
              <Link className="btn" href={`/products/${guide.relatedProductSlug}`} style={{ borderRadius: 8, fontSize: "0.9rem" }}>
                Explore Product Specs →
              </Link>
            )}
            <Link className="btn primary" href="/contact" style={{ borderRadius: 8, fontSize: "0.9rem" }}>
              Request Free Site Measurement
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
