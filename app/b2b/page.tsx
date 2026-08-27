import Link from "next/link";
import type { Metadata } from "next";
import { business } from "@/lib/business";
import { regionalCities } from "@/lib/seoKeywords";
import {
  BuildingIcon,
  DraftingIcon,
  DeliveryIcon,
  ChecklistIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowRightIcon
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Bulk Supply & Custom Fabrication for Builders & Contractors | Sparsh Trading",
  description: "Direct workshop supply of Tata steel door frames, uPVC window packages, and custom railings for builders, architects, and contractors across UP.",
  keywords: [
    "b2b steel door frame supply",
    "wholesale ppgi chaukhat up",
    "architectural fabrication contractor pratapgarh",
    "bulk upvc windows for builders",
    "commercial metalwork contractor uttar pradesh"
  ]
};

export default function B2BPortalPage() {
  const b2bBenefits = [
    {
      icon: <BuildingIcon width={22} height={22} />,
      title: "Direct Workshop Pricing",
      desc: "No middlemen or distributor markups. Direct fabrication rates for Tata Structura door frames, PPGI chaukhat, and complete window packages."
    },
    {
      icon: <DraftingIcon width={22} height={22} />,
      title: "Plan & Drawing Support",
      desc: "Send us your architectural drawings or site layouts. We will verify structural dimensions, material requirements, and provide exact estimates."
    },
    {
      icon: <DeliveryIcon width={22} height={22} />,
      title: "On-Time Phased Deliveries",
      desc: "We coordinate production with your site schedule so frames and glass arrive right when your masons and plasterers are ready."
    },
    {
      icon: <ChecklistIcon width={22} height={22} />,
      title: "GST Invoicing & Clear Paperwork",
      desc: "Full tax-compliant GST invoicing with input tax credit (ITC) support and material test specifications whenever needed."
    }
  ];

  return (
    <main className="section subpage-main" style={{ paddingBottom: 64 }}>
      <div className="wrap">
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <span className="brand-dot-pulse" />
          <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
            For Builders &amp; Contractors
          </span>
        </div>

        <h1 className="big-title" style={{ maxWidth: 900 }}>
          Direct Workshop Supply for Your Construction Projects
        </h1>
        <p className="section-lead" style={{ maxWidth: 820 }}>
          We work closely with contractors, builders, and architects across Uttar Pradesh to deliver high-quality steel door frames, uPVC windows, and glass railings on schedule.
        </p>

        {/* Benefits Grid */}
        <div
          className="cards"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
            margin: "32px 0 44px"
          }}
        >
          {b2bBenefits.map((b, i) => (
            <div
              key={i}
              className="card"
              style={{
                padding: "24px 22px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                borderRadius: 12,
                border: "1px solid var(--border)"
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "rgba(217, 45, 32, 0.08)",
                  color: "var(--red-2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 4
                }}
              >
                {b.icon}
              </div>
              <h2 style={{ fontSize: "1.12rem", fontWeight: 700, margin: 0, color: "var(--strong)", lineHeight: 1.35 }}>
                {b.title}
              </h2>
              <p className="muted" style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>

        {/* B2B Commercial Inquiries Form */}
        <div
          className="card"
          style={{
            padding: "36px 32px",
            borderRadius: 14,
            border: "1px solid var(--border)",
            maxWidth: 780,
            margin: "0 auto 44px",
            boxShadow: "var(--card-shadow)"
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <span className="eyebrow" style={{ color: "var(--red-2)" }}>Bulk Orders &amp; Projects</span>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "6px 0 8px", color: "var(--strong)" }}>
              Request a Bulk Project Quote
            </h2>
            <p className="muted" style={{ fontSize: "0.92rem", margin: 0 }}>
              Send your project quantities or material list for a fast, itemized estimate.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, fontSize: "0.92rem" }}>
              <div style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid var(--border)" }}>
                <span className="muted" style={{ fontSize: "0.8rem", display: "block" }}>Business Entity</span>
                <strong style={{ color: "var(--strong)" }}>{business.name}</strong>
              </div>
              <div style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid var(--border)" }}>
                <span className="muted" style={{ fontSize: "0.8rem", display: "block" }}>GSTIN Number</span>
                <strong style={{ color: "var(--red-2)", letterSpacing: "0.03em" }}>{business.gstin}</strong>
              </div>
            </div>

            <div style={{ padding: 18, borderRadius: 8, border: "1px solid var(--border)", fontSize: "0.9rem", lineHeight: 1.65 }}>
              <strong style={{ color: "var(--strong)", display: "block", marginBottom: 6 }}>Common Bulk Categories:</strong>
              <ul style={{ paddingLeft: 18, margin: 0, color: "var(--text)" }}>
                <li>Tata Structura &amp; Jindal Steel Door Frames (Chaukhat) — 15 to 300+ Units</li>
                <li>PPGI Pre-Painted Galvanized Door &amp; Window Frames</li>
                <li>Multi-Chamber uPVC Sliding Windows &amp; French Doors</li>
                <li>12mm Toughened Glass Balcony &amp; Staircase Railings</li>
                <li>Custom Laser-Cut Front Elevation &amp; Boundary Gates</li>
              </ul>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
              <Link
                className="btn primary"
                href="/contact?type=B2B_BULK_PROCUREMENT"
                style={{ flex: "1 1 220px", padding: "12px 20px", textAlign: "center", fontSize: "0.95rem", fontWeight: 700, borderRadius: 8 }}
              >
                Send Material Requirements
                <ArrowRightIcon width={16} height={16} />
              </Link>
              <a
                className="btn"
                href={`tel:${business.phones[0]}`}
                style={{ padding: "12px 18px", textAlign: "center", fontWeight: 600, fontSize: "0.92rem", borderRadius: 8 }}
              >
                <PhoneIcon width={16} height={16} />
                Call Partner: +91 {business.phones[0]}
              </a>
            </div>
          </div>
        </div>

        {/* Coverage Footprint */}
        <div className="card" style={{ padding: "28px 24px", textAlign: "center", borderRadius: 12, border: "1px solid var(--border)" }}>
          <span className="eyebrow" style={{ color: "var(--red-2)" }}>Supply Radius</span>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "6px 0 14px", color: "var(--strong)" }}>
            Supplying Sites Across Uttar Pradesh
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 800, margin: "0 auto" }}>
            {regionalCities.map((city) => (
              <Link
                key={city}
                href={`/locations/${city.toLowerCase()}`}
                style={{
                  fontSize: "0.82rem",
                  padding: "6px 14px",
                  borderRadius: 20,
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                  textDecoration: "none",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5
                }}
              >
                <MapPinIcon width={13} height={13} style={{ color: "var(--red-2)" }} />
                {city}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
