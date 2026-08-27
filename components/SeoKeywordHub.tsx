"use client";

import { useState } from "react";
import Link from "next/link";
import { coreCategories, regionalCities, pratapgarhLocalities, seoKeywordsList } from "@/lib/seoKeywords";

export function SeoKeywordHub() {
  const [activeCategory, setActiveCategory] = useState<string>(coreCategories[0].slug);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is the price of Tata Steel door frames (Chaukhat) in Pratapgarh?",
      a: "Tata Steel door frames at Sparsh Trading are custom-fabricated based on required wall thickness, rebate profile (single or double rebate), and gauge. We offer factory-direct pricing with anti-rust primer coating starting at competitive per-foot rates across Pratapgarh, Sultanpur, and Jaunpur."
    },
    {
      q: "Are your uPVC sliding windows soundproof and dust-resistant?",
      a: "Yes. Our multi-chamber uPVC sliding and casement window systems feature airtight EPDM rubber gaskets, multipoint locking mechanisms, and toughened float glass, cutting exterior traffic noise by up to 75% while keeping out dust and rainwater."
    },
    {
      q: "What glass thickness and grade of steel do you use for balcony railings?",
      a: "We use certified 12mm clear architectural toughened safety glass combined with genuine Grade 304 solid stainless steel base spigots and slim handrails to ensure zero corrosion even in heavy monsoon conditions."
    },
    {
      q: "Do you offer free on-site laser measurements in Uttar Pradesh?",
      a: "Yes. Our founders personally visit your project site in Pratapgarh, Sultanpur, Jaunpur, Prayagraj, Varanasi, Lucknow, and surrounding areas to take exact laser measurements and provide a transparent, fixed-price quote."
    },
    {
      q: "What is the timeline for custom modular kitchen manufacturing?",
      a: "Once site measurements and 3D layout approvals are finalized, our workshop manufactures and pre-assembles your modular kitchen cabinets and SS 304 pull-out baskets in 7 to 12 working days, followed by 1 to 2 days for neat on-site installation."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  const currentCat = coreCategories.find((c) => c.slug === activeCategory) || coreCategories[0];

  return (
    <section className="section grid-bg seo-keyword-hub" aria-labelledby="seo-hub-title" style={{ borderTop: "2px solid var(--red-2)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span className="brand-dot-pulse" />
            <span className="eyebrow" style={{ color: "var(--red-2)", fontWeight: 700 }}>
              Regional Search &amp; Service Index • 500+ Verified Service Areas
            </span>
          </div>
          <h2 id="seo-hub-title" className="display section-title" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            Fabrication, Windows &amp; Kitchens in Uttar Pradesh
          </h2>
          <p className="section-lead" style={{ maxWidth: 820, margin: "10px auto 0" }}>
            Explore genuine product specifications, pricing guidance, and service coverage across Pratapgarh, Sultanpur, Jaunpur, Prayagraj, Varanasi, Lucknow, and all UP districts.
          </p>
        </div>

        {/* Category Tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 28 }}>
          {coreCategories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setActiveCategory(cat.slug)}
              className="btn"
              style={{
                fontSize: "0.86rem",
                padding: "8px 16px",
                minHeight: 36,
                background: activeCategory === cat.slug ? "var(--red-2)" : "var(--surface)",
                color: activeCategory === cat.slug ? "#ffffff" : "var(--strong)",
                borderColor: activeCategory === cat.slug ? "var(--red-2)" : "var(--border)"
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Active Category Content Card */}
        <div className="card" style={{ padding: "32px 28px", borderLeft: "4px solid var(--red-2)", marginBottom: 36 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
            <h3 style={{ fontSize: "1.4rem", margin: 0, color: "var(--strong)" }}>
              {currentCat.name} Fabrication &amp; Supply
            </h3>
            <Link className="btn primary" href={`/services/${currentCat.slug}`} style={{ fontSize: "0.86rem", padding: "8px 16px" }}>
              Explore Service Details →
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 16 }}>
            {currentCat.keywords.map((kw) => (
              <div key={kw} style={{ background: "var(--surface-2)", padding: "12px 16px", borderRadius: 6, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "var(--red-2)", fontWeight: 900 }}>•</span>
                <span style={{ fontSize: "0.92rem", textTransform: "capitalize", color: "var(--text)" }}>
                  {kw}
                </span>
              </div>
            ))}
          </div>

          {/* Regional Cities Serving Indicator */}
          <div style={{ marginTop: 24, paddingTop: 18, borderTop: "1px solid var(--border)" }}>
            <strong style={{ fontSize: "0.88rem", color: "var(--strong)", display: "block", marginBottom: 8 }}>
              ⚡ Fast On-Site Supply &amp; Measurement Available In:
            </strong>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {regionalCities.map((city) => (
                <span
                  key={city}
                  style={{
                    fontSize: "0.78rem",
                    background: "rgba(217, 45, 32, 0.12)",
                    color: "var(--red-2)",
                    padding: "4px 10px",
                    borderRadius: 4,
                    fontWeight: 700
                  }}
                >
                  📍 {city}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions (FAQ) Section with Schema.org */}
        <div style={{ marginTop: 44 }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <span className="eyebrow" style={{ color: "var(--red-2)", fontWeight: 700 }}>
              Help &amp; Buyer Guidance
            </span>
            <h3 className="display" style={{ fontSize: "1.7rem", margin: "4px 0 0" }}>
              Frequently Asked Questions (FAQ)
            </h3>
          </div>

          <div className="cards" style={{ gridTemplateColumns: "1fr", gap: 12 }}>
            {faqs.map((faq, idx) => (
              <div
                key={faq.q}
                className="card"
                style={{
                  padding: "18px 22px",
                  cursor: "pointer",
                  borderLeft: expandedFaq === idx ? "4px solid var(--red-2)" : "1px solid var(--border)"
                }}
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <h4 style={{ margin: 0, fontSize: "1.08rem", color: "var(--strong)" }}>
                    {faq.q}
                  </h4>
                  <span style={{ color: "var(--red-2)", fontSize: "1.2rem", fontWeight: 900 }}>
                    {expandedFaq === idx ? "−" : "+"}
                  </span>
                </div>
                {expandedFaq === idx && (
                  <p style={{ margin: "12px 0 0", fontSize: "0.95rem", lineHeight: 1.65, color: "var(--text)" }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 500+ Keywords Search Tags Index (Search Crawler Optimized) */}
        <div style={{ marginTop: 40, padding: 20, background: "var(--surface)", borderRadius: 8, border: "1px solid var(--border)" }}>
          <span className="eyebrow" style={{ color: "var(--red-2)", fontSize: "0.74rem", display: "block", marginBottom: 8 }}>
            Popular Search Queries in Uttar Pradesh (500+ Keyword Index)
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, maxHeight: 180, overflowY: "auto", paddingRight: 6 }}>
            {seoKeywordsList.slice(0, 150).map((kw) => (
              <span
                key={kw}
                style={{
                  fontSize: "0.74rem",
                  color: "var(--muted)",
                  background: "var(--surface-2)",
                  padding: "3px 8px",
                  borderRadius: 3
                }}
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
