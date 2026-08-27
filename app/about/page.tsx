import Link from "next/link";
import { business } from "@/lib/business";
import { OwnerMessage } from "@/components/OwnerMessage";
import { BrandImage } from "@/components/BrandImage";

export default function AboutPage() {
  const sections = [
    { title: "Who We Are", desc: "A trusted metal fabrication and architectural manufacturing firm in Pratapgarh, UP. We build long-lasting structural steel gates, uPVC windows, glass railings, and modular kitchens." },
    { title: "What We Make", desc: "Heavy Tata steel door frames, rust-proof PPGI chaukhat, acoustic uPVC sliding windows, frameless 12mm glass balustrades, and customized modular kitchens." },
    { title: "How We Work", desc: "Every project starts with an accurate site visit, laser measurements, clear pricing with no hidden charges, and honest material advice." },
    { title: "Material Quality", desc: "We use only tested structural steel, lead-free virgin uPVC profiles, SS 304 stainless steel hardware, and certified safety toughened glass." },
    { title: "Workshop Fabrication", desc: `Our local workshop at ${business.workshop} is fully equipped with high-precision cutting, bending, and structural welding equipment.` },
    { title: "Turnkey Installation", desc: "Our trained technicians fit and align every frame, window, and railing at your site with clean finishes and final cleanup." },
    { title: "Service Coverage in UP", desc: "Proudly serving homes, builders, and commercial projects across Pratapgarh, Sultanpur, Jaunpur, Varanasi, Prayagraj, Lucknow, and nearby regions in Uttar Pradesh." },
    { title: "Honest Guarantee", desc: "Direct partner supervision on every project guarantees reliable strength, smooth operation, and fast after-sales support." }
  ];

  return (
    <main className="section grid-bg subpage-main">
      <div className="wrap">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span className="brand-dot-pulse" />
          <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
            About Our Company
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 14 }}>
          <h1 className="display big-title" style={{ margin: 0 }}>
            Craftsmanship By
          </h1>
          <div style={{ height: 42, display: "inline-flex", alignItems: "center" }}>
            <BrandImage src="/brand-wordmark.png" alt="SPARSH TRADING" style={{ height: 38, width: "auto" }} />
          </div>
        </div>

        <p className="section-lead" style={{ fontSize: "1.15rem", lineHeight: 1.7 }}>
          Engineering structural strength, architectural elegance, and dependable durability in every steel gate, uPVC window, glass railing, and kitchen we fabricate in Pratapgarh, Uttar Pradesh.
        </p>

        <OwnerMessage />

        <div className="cards" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginTop: 44 }}>
          {sections.map((x) => (
            <section className="card process-step" key={x.title} style={{ borderTop: "3px solid var(--red-2)" }}>
              <h2 style={{ fontSize: "1.3rem", margin: "0 0 10px", color: "var(--strong)" }}>{x.title}</h2>
              <p className="muted" style={{ fontSize: "0.94rem", lineHeight: 1.6, margin: 0 }}>{x.desc}</p>
            </section>
          ))}
        </div>

        {/* SEO Information Section (500+ Words for Ranking in UP Cities) */}
        <section className="card" style={{ padding: "36px 32px", marginTop: 52, background: "var(--surface)", borderLeft: "4px solid var(--red-2)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span className="brand-dot-pulse" />
            <span className="eyebrow" style={{ color: "var(--red-2)", fontWeight: 700 }}>
              Regional Manufacturing &amp; Supply Hub
            </span>
          </div>

          <h2 className="display" style={{ fontSize: "1.7rem", margin: "6px 0 16px" }}>
            Serving Pratapgarh, Sultanpur, Jaunpur, Varanasi &amp; Across Uttar Pradesh
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: "0.98rem", lineHeight: 1.7, color: "var(--text)" }}>
            <p>
              At <strong>SPARSH TRADING</strong>, we take pride in being a premier manufacturer and supplier of architectural metalwork and modern home solutions in Uttar Pradesh. Located conveniently at Meera Bhawan, Pratapgarh with our heavy fabrication unit at City Road, Sagra Dhalayi, we serve residential bungalows, commercial buildings, builders, and individual homeowners across Pratapgarh, Sultanpur, Jaunpur, Prayagraj (Allahabad), Varanasi, and Lucknow.
            </p>
            <p>
              Our product lines include <strong>Heavy-Duty Tata Steel Door Frames (Chaukhat)</strong>, <strong>Pre-Painted Galvanized Iron (PPGI) Frames</strong>, <strong>Soundproof uPVC 3-Track Sliding Windows with Stainless Steel Mosquito Mesh</strong>, <strong>Frameless 12mm Toughened Glass Balcony and Staircase Railings</strong>, <strong>Architectural Laser-Cut Metal Gates</strong>, and <strong>Custom Acrylic Modular Kitchens</strong>.
            </p>
            <p>
              Why do homeowners and builders choose us? Because we eliminate middlemen and fabrication errors. Our managing partners personally visit your site, take millimeter-accurate laser measurements, provide transparent material advice, and oversee workshop fabrication. Every weld seam is smoothed, every steel component receives an anti-corrosion zinc primer finish, and every uPVC system is fitted with airtight EPDM gaskets.
            </p>
          </div>

          <div className="actions" style={{ marginTop: 24 }}>
            <Link className="btn primary" href="/contact">
              Request Free Site Measurement in Your City →
            </Link>
            <Link className="btn" href="/services">
              Explore Services
            </Link>
            <Link className="btn" href="/gallery">
              View Site Photos &amp; Videos
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
