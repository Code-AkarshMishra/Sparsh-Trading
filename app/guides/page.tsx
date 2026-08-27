import Link from "next/link";
import type { Metadata } from "next";
import { guidesData } from "@/lib/guidesData";
import { ClockIcon, CalendarIcon, ArrowRightIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Architectural Metalwork, Windows & Kitchen Buying Guides | Sparsh Trading",
  description: "Comprehensive technical guides, cost breakdowns, and comparison articles for steel door frames (Chaukhat), uPVC windows, glass railings & modular kitchens in UP.",
  keywords: [
    "sparsh trading guides",
    "upvc vs aluminium windows guide",
    "steel chaukhat cost guide",
    "modular kitchen price pratapgarh",
    "glass railing safety guide"
  ]
};

export default function GuidesHubPage() {
  return (
    <main className="section subpage-main" style={{ paddingBottom: 64 }}>
      <div className="wrap">
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <span className="brand-dot-pulse" />
          <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
            Helpful Guides
          </span>
        </div>

        <h1 className="big-title" style={{ maxWidth: 850 }}>
          Practical Guides for Homeowners &amp; Builders
        </h1>
        <p className="section-lead" style={{ maxWidth: 780 }}>
          Honest advice on steel gauges, glass safety, window insulation, and modular kitchen planning to help you choose the right materials.
        </p>

        <div
          className="cards"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 22,
            marginTop: 32
          }}
        >
          {guidesData.map((guide) => (
            <article
              key={guide.slug}
              className="card"
              style={{
                borderRadius: 12,
                border: "1px solid var(--border)",
                padding: "24px 22px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.25s ease"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span
                    style={{
                      background: "rgba(217, 45, 32, 0.08)",
                      color: "var(--red-2)",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: 20,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase"
                    }}
                  >
                    {guide.category}
                  </span>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--muted)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5
                    }}
                  >
                    <ClockIcon width={13} height={13} />
                    {guide.readTime}
                  </span>
                </div>

                <h2
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    margin: "0 0 10px",
                    color: "var(--strong)",
                    lineHeight: 1.4
                  }}
                >
                  <Link href={`/guides/${guide.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                    {guide.title}
                  </Link>
                </h2>

                <p className="muted" style={{ fontSize: "0.9rem", lineHeight: 1.6, margin: "0 0 18px" }}>
                  {guide.summary}
                </p>
              </div>

              <div
                style={{
                  paddingTop: 14,
                  borderTop: "1px solid var(--border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--muted)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5
                  }}
                >
                  <CalendarIcon width={13} height={13} />
                  {guide.publishedDate}
                </span>
                <Link
                  href={`/guides/${guide.slug}`}
                  style={{
                    color: "var(--red-2)",
                    fontWeight: 700,
                    fontSize: "0.86rem",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4
                  }}
                >
                  Read Complete Guide
                  <ArrowRightIcon width={13} height={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
