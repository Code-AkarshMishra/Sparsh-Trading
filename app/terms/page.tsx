import Link from "next/link";
import type { Metadata } from "next";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Terms of Service | Sparsh Trading Pratapgarh",
  description: "Terms and conditions for metal fabrication, Tata steel door frames, uPVC window installations, glass railings, and modular kitchen projects with Sparsh Trading in Uttar Pradesh.",
  alternates: {
    canonical: "https://www.sparshtrading.shop/terms"
  }
};

export default function TermsPage() {
  return (
    <main className="section grid-bg subpage-main">
      <div className="wrap" style={{ maxWidth: 860 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span className="brand-dot-pulse" />
          <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
            Commercial Terms
          </span>
        </div>

        <h1 className="display big-title" style={{ margin: "0 0 16px" }}>
          Terms of Service
        </h1>

        <p className="muted" style={{ fontSize: "0.95rem", marginBottom: 32 }}>
          Effective Date: September 2026 • Governing Architectural Fabrication &amp; Turnkey Installations
        </p>

        <div className="card" style={{ padding: "32px 36px", lineHeight: 1.8, fontSize: "0.96rem" }}>
          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: "1.25rem", color: "var(--strong)", marginBottom: 10 }}>1. Scope of Engagement</h2>
            <p>
              These Terms of Service govern all quotation inquiries, site surveys, structural metal fabrication, architectural joinery, window installations, and interior solutions provided by <strong>{business.name}</strong> (&quot;Sparsh Trading&quot;) across Pratapgarh and throughout Uttar Pradesh.
            </p>
          </section>

          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: "1.25rem", color: "var(--strong)", marginBottom: 10 }}>2. Site Measurements &amp; Custom Specifications</h2>
            <p>
              Because our architectural products (including steel chaukhat frames, acoustic uPVC windows, laser-cut main gates, and modular kitchen units) are custom-engineered to your property&apos;s exact site dimensions:
            </p>
            <ul style={{ paddingLeft: 22, marginTop: 8 }}>
              <li>All final fabrication begins only after on-site laser measurements are verified by our technical team or certified architectural drawings are approved in writing.</li>
              <li>Modifications to site civil work, lintel heights, or wall openings made after final measurement must be reported immediately, as alteration fees may apply.</li>
            </ul>
          </section>

          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: "1.25rem", color: "var(--strong)", marginBottom: 10 }}>3. Quotations, Pricing &amp; GST Invoicing</h2>
            <p>
              Quotation estimates generated online or provided via official invoice are valid for 15 calendar days from issuance, subject to raw material market fluctuations (structural steel, aluminium, and float glass indices). All commercial and residential orders are billed with full GST invoices (GSTIN: {business.gstin}).
            </p>
          </section>

          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: "1.25rem", color: "var(--strong)", marginBottom: 10 }}>4. Payment Terms &amp; Production Schedule</h2>
            <p>Standard fabrication workflows follow milestone-based payments:</p>
            <ul style={{ paddingLeft: 22, marginTop: 8 }}>
              <li><strong>Advance Booking:</strong> 40% to 50% deposit upon order confirmation and material procurement authorization.</li>
              <li><strong>Mid-Fabrication / Delivery:</strong> 40% upon completion of factory manufacturing and site delivery.</li>
              <li><strong>Handover:</strong> Remaining balance upon final alignment, hardware calibration, and customer acceptance.</li>
            </ul>
          </section>

          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: "1.25rem", color: "var(--strong)", marginBottom: 10 }}>5. Site Readiness &amp; Installation</h2>
            <p>
              To ensure flawless fitting and seal integrity, the client is responsible for providing reasonable site access, basic single/three-phase electricity for installation power tools, and unobstructed masonry openings on the agreed installation dates.
            </p>
          </section>

          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: "1.25rem", color: "var(--strong)", marginBottom: 10 }}>6. Material Standards &amp; Quality Assurances</h2>
            <p>
              Sparsh Trading strictly sources certified raw materials: high-tensile structural steel, branded galvanized steel profiles, multi-chamber virgin uPVC formulations, SS 304 architectural hardware, and BIS-compliant toughened safety glass. Standard engineering fabrication tolerances apply as per Bureau of Indian Standards (BIS) architectural guidelines.
            </p>
          </section>

          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: "1.25rem", color: "var(--strong)", marginBottom: 10 }}>7. Warranty &amp; After-Sales Service</h2>
            <p>
              We stand behind our craftsmanship. Structural metalwork and window frames carry comprehensive fabrication workmanship guarantees. Manufacturer warranties apply directly to specialized hardware components (friction stays, multi-point locks, toughened glass). Our local Pratapgarh workshop ensures prompt repair and alignment dispatch.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1.25rem", color: "var(--strong)", marginBottom: 10 }}>8. Governing Law &amp; Jurisdiction</h2>
            <p>
              These Terms and any commercial agreements shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with our services shall be subject to the exclusive jurisdiction of the competent courts in Pratapgarh, Uttar Pradesh.
            </p>
          </section>
        </div>

        <div style={{ marginTop: 28, textAlign: "center" }}>
          <Link href="/" className="btn" style={{ marginRight: 12 }}>
            ← Back to Home
          </Link>
          <Link href="/privacy-policy" className="btn primary">
            Read Privacy Policy →
          </Link>
        </div>
      </div>
    </main>
  );
}
