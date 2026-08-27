"use client";

import { useState } from "react";
import Link from "next/link";
import { regionalCities } from "@/lib/seoKeywords";
import { MapPinIcon } from "@/components/Icons";

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
    <section className="section seo-keyword-hub" aria-labelledby="faq-section-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span className="brand-dot-pulse" />
            <span className="eyebrow" style={{ color: "var(--red-2)", fontWeight: 700 }}>
              Help &amp; Buyer Guidance
            </span>
          </div>
          <h2 id="faq-section-title" className="section-title" style={{ textAlign: "center" }}>
            Frequently Asked Questions
          </h2>
          <p className="section-lead" style={{ maxWidth: 700, margin: "8px auto 0" }}>
            Common questions regarding materials, custom fabrication standards, pricing, and on-site fitting across Uttar Pradesh.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="cards" style={{ gridTemplateColumns: "1fr", gap: 12, maxWidth: 860, margin: "0 auto" }}>
          {faqs.map((faq, idx) => (
            <div
              key={faq.q}
              className="card"
              style={{
                padding: "18px 22px",
                cursor: "pointer",
                borderRadius: 10,
                border: "1px solid var(--border)",
                borderLeft: expandedFaq === idx ? "4px solid var(--red-2)" : "1px solid var(--border)",
                background: expandedFaq === idx ? "var(--surface-2)" : "var(--surface)",
                transition: "all 0.2s ease"
              }}
              onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <h3 style={{ margin: 0, fontSize: "1.05rem", color: "var(--strong)", fontWeight: 600, lineHeight: 1.4 }}>
                  {faq.q}
                </h3>
                <span style={{ color: "var(--red-2)", fontSize: "1.3rem", fontWeight: 700, minWidth: 20, textAlign: "center" }}>
                  {expandedFaq === idx ? "−" : "+"}
                </span>
              </div>
              {expandedFaq === idx && (
                <p style={{ margin: "12px 0 0", fontSize: "0.94rem", lineHeight: 1.65, color: "var(--text)" }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Serving Regions List */}
        <div style={{ marginTop: 36, textAlign: "center" }}>
          <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 10px", fontWeight: 600 }}>
            Active Workshop Delivery &amp; Fitting Coverage:
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", maxWidth: 840, margin: "0 auto" }}>
            {regionalCities.map((city) => (
              <Link
                key={city}
                href={`/locations/${city.toLowerCase()}`}
                style={{
                  fontSize: "0.8rem",
                  background: "var(--surface-2)",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                  padding: "5px 12px",
                  borderRadius: 16,
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4
                }}
              >
                <MapPinIcon width={12} height={12} style={{ color: "var(--red-2)" }} />
                {city}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
