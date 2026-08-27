"use client";

import { useState } from "react";
import Link from "next/link";
import { regionalCities } from "@/lib/seoKeywords";

export function SeoKeywordHub() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is the price of Tata Steel door frames (Chaukhat) in Pratapgarh?",
      a: "Tata Steel door frames at Sparsh Trading are custom-fabricated based on your required wall thickness, gauge, and rebate profile (single or double rebate). We offer factory-direct pricing with anti-rust red oxide primer coating across Pratapgarh, Sultanpur, and Jaunpur."
    },
    {
      q: "Are your uPVC sliding windows soundproof and dust-resistant?",
      a: "Yes. Our multi-chamber uPVC sliding and casement window systems feature airtight EPDM rubber gaskets, multipoint locking mechanisms, and toughened float glass, cutting exterior traffic noise by up to 75% while keeping out dust and monsoon rainwater."
    },
    {
      q: "What glass thickness and grade of steel do you use for balcony railings?",
      a: "We use certified 12mm clear architectural toughened safety glass combined with genuine Grade 304 solid stainless steel base spigots and sleek handrails to ensure zero corrosion and maximum safety."
    },
    {
      q: "Do you offer free on-site laser measurements in Uttar Pradesh?",
      a: "Yes. Our team visits your project site in Pratapgarh, Sultanpur, Jaunpur, Prayagraj, Varanasi, Lucknow, and surrounding areas to take exact laser measurements and provide a transparent, fixed-price quote."
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

  return (
    <section className="section grid-bg seo-keyword-hub" aria-labelledby="faq-section-title" style={{ borderTop: "2px solid var(--red-2)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span className="brand-dot-pulse" />
            <span className="eyebrow" style={{ color: "var(--red-2)", fontWeight: 700 }}>
              Help &amp; Buyer Guidance
            </span>
          </div>
          <h2 id="faq-section-title" className="display section-title" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            Frequently Asked Questions
          </h2>
          <p className="section-lead" style={{ maxWidth: 720, margin: "10px auto 0" }}>
            Common questions regarding materials, custom fabrication standards, pricing, and on-site fitting across Uttar Pradesh.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="cards" style={{ gridTemplateColumns: "1fr", gap: 14, maxWidth: 900, margin: "0 auto" }}>
          {faqs.map((faq, idx) => (
            <div
              key={faq.q}
              className="card"
              style={{
                padding: "20px 24px",
                cursor: "pointer",
                borderLeft: expandedFaq === idx ? "4px solid var(--red-2)" : "1px solid var(--border)",
                background: expandedFaq === idx ? "var(--surface-2)" : "var(--surface)",
                transition: "all 0.2s ease"
              }}
              onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <h3 style={{ margin: 0, fontSize: "1.1rem", color: "var(--strong)", fontWeight: 700 }}>
                  {faq.q}
                </h3>
                <span style={{ color: "var(--red-2)", fontSize: "1.4rem", fontWeight: 900, minWidth: 20, textAlign: "center" }}>
                  {expandedFaq === idx ? "−" : "+"}
                </span>
              </div>
              {expandedFaq === idx && (
                <p style={{ margin: "14px 0 0", fontSize: "0.98rem", lineHeight: 1.65, color: "var(--text)" }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Serving Regions List */}
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <p style={{ fontSize: "0.92rem", color: "var(--muted)", margin: "0 0 12px" }}>
            ⚡ <strong>Active Workshop Delivery &amp; Fitting Coverage:</strong>
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 900, margin: "0 auto" }}>
            {regionalCities.map((city) => (
              <span
                key={city}
                style={{
                  fontSize: "0.82rem",
                  background: "rgba(217, 45, 32, 0.12)",
                  color: "var(--red-2)",
                  padding: "4px 12px",
                  borderRadius: 6,
                  fontWeight: 700
                }}
              >
                📍 {city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
