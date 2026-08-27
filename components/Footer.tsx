import Link from "next/link";
import { business, partners } from "@/lib/business";
import { BrandImage } from "@/components/BrandImage";

export function Footer() {
  return (
    <footer className="footer" role="contentinfo" style={{ borderTop: "2px solid var(--red-2)" }}>
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link href="/" className="logo" aria-label="SPARSH TRADING home">
            <span className="logo-mark">
              <BrandImage src="/brand-logo.png" alt={`${business.name} logo`} />
            </span>
            <span className="wordmark">
              <BrandImage src="/brand-wordmark.png" alt={business.name} />
            </span>
          </Link>
          <p style={{ marginTop: 14, fontSize: "0.94rem", lineHeight: 1.6, color: "var(--muted)" }}>
            High-precision architectural metalwork, Tata steel door frames, soundproof uPVC window systems, frameless glass balustrades, and custom modular kitchens in Pratapgarh, UP.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <span style={{ fontSize: "0.78rem", background: "rgba(217, 45, 32, 0.15)", color: "var(--red-2)", padding: "4px 10px", borderRadius: 4, fontWeight: 800 }}>
              ★ 2 Direct Partner Lines
            </span>
            <span style={{ fontSize: "0.78rem", background: "rgba(217, 45, 32, 0.15)", color: "var(--red-2)", padding: "4px 10px", borderRadius: 4, fontWeight: 800 }}>
              ★ Local Workshop
            </span>
          </div>
        </div>

        <div>
          <h4 style={{ color: "var(--red-2)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.95rem" }}>
            Explore
          </h4>
          <ul className="footer-links" style={{ listStyle: "none", paddingLeft: 0, marginTop: 12 }}>
            <li><Link href="/about">About &amp; Partners</Link></li>
            <li><Link href="/services">Our Services</Link></li>
            <li><Link href="/products">Material Catalogue</Link></li>
            <li><Link href="/projects">Project Portfolio</Link></li>
            <li><Link href="/gallery">Photo &amp; Video Gallery</Link></li>
            <li><Link href="/#how-we-work">Execution Flowchart</Link></li>
            <li><Link href="/#reviews">Customer Reviews</Link></li>
            <li><Link href="/dashboard">Customer Portal</Link></li>
            <li><Link href="/admin">Admin Access</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: "var(--red-2)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.95rem" }}>
            Pratapgarh Locations
          </h4>
          <div className="footer-contact" style={{ marginTop: 12 }}>
            <span className="eyebrow" style={{ color: "var(--red-2)", fontSize: "0.75rem" }}>🏢 Main Office</span>
            <p style={{ fontSize: "0.9rem", margin: "4px 0 6px" }}>{business.office}</p>
            <a href={business.officeMapUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--red-2)", fontSize: "0.82rem", fontWeight: 700 }}>
              Open in Google Maps →
            </a>

            <span className="eyebrow" style={{ color: "var(--red-2)", fontSize: "0.75rem", marginTop: 14, display: "block" }}>⚙️ Fabrication Workshop</span>
            <p style={{ fontSize: "0.9rem", margin: "4px 0 6px" }}>{business.workshop}</p>
            <a href={business.workshopMapUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--red-2)", fontSize: "0.82rem", fontWeight: 700 }}>
              Open in Google Maps →
            </a>

          </div>
        </div>

        <div>
          <h4 style={{ color: "var(--red-2)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.95rem" }}>
            Direct Contact
          </h4>
          <div className="footer-contact" style={{ marginTop: 12 }}>
            <p style={{ fontSize: "0.9rem", margin: 0 }}>
              <strong>Direct Partner Lines:</strong><br />
              <a href={`tel:${business.phones[0]}`} style={{ color: "var(--red-2)", fontWeight: 700 }}>+91 {business.phones[0]}</a><br />
              <a href={`tel:${business.phones[1]}`} style={{ color: "var(--red-2)", fontWeight: 700 }}>+91 {business.phones[1]}</a>
            </p>
            <div style={{ marginTop: 14 }}>
              <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn whatsapp-action" style={{ minHeight: 38, padding: "8px 14px", fontSize: "0.86rem", width: "100%", textAlign: "center" }}>
                💬 Chat on WhatsApp
              </a>
            </div>
            <p style={{ fontSize: "0.86rem", marginTop: 14, color: "var(--text)" }}>
              <strong>GSTIN:</strong> <span style={{ color: "var(--red-2)", fontWeight: 800, letterSpacing: "0.04em" }}>09ELTPM0163A1Z3</span><br />
              <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Official Tax Invoices for residential &amp; commercial fabrication.</span>
            </p>
          </div>
        </div>
      </div>

      <div className="wrap footer-bottom" style={{ borderTop: "1px solid var(--border)", paddingTop: 18, marginTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, fontSize: "0.85rem" }}>
        <span>© {new Date().getFullYear()} {business.name} • GSTIN: <strong>09ELTPM0163A1Z3</strong> • <strong>sparshtrading.shop</strong></span>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <span style={{ color: "var(--red-2)", fontWeight: 700 }}>Serving {business.serviceArea}</span>
          <span style={{ color: "var(--border)" }}>•</span>
          <span style={{ color: "var(--muted)" }}>
            Built &amp; Deployed by{" "}
            <a
              href="https://linktr.ee/akarshmishra"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#ffffff", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              Akarsh Mishra ↗
            </a>
          </span>
        </div>
      </div>
    </footer>
  );



}