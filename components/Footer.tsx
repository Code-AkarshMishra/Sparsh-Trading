import Link from "next/link";
import { business } from "@/lib/business";
import { BrandImage } from "@/components/BrandImage";

export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
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
          <p>
            Architectural metalwork, premium uPVC systems, custom railings, and practical interior solutions in Pratapgarh.
          </p>
        </div>

        <div>
          <h4>Explore</h4>
          <ul className="footer-links">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/services">Our Services</Link></li>
            <li><Link href="/products">Material Catalogue</Link></li>
            <li><Link href="/projects">Project Portfolio</Link></li>
            <li><Link href="/gallery">Photo Gallery</Link></li>
            <li><Link href="/#how-we-work">How We Work</Link></li>
          </ul>
        </div>

        <div>
          <h4>Locations</h4>
          <div className="footer-contact">
            <span className="eyebrow">Office</span>
            <p>{business.office}</p>
            <span className="eyebrow" style={{ marginTop: 12 }}>Workshop</span>
            <p>{business.workshop}</p>
          </div>
        </div>

        <div>
          <h4>Contact Us</h4>
          <div className="footer-contact">
            <p>
              Direct lines:<br />
              <a href={`tel:${business.phones[0]}`}>+91 {business.phones[0]}</a><br />
              <a href={`tel:${business.phones[1]}`}>{business.phones[1]}</a>
            </p>
            <p style={{ marginTop: 10 }}>
              <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn" style={{ minHeight: 38, padding: "8px 14px", fontSize: "0.85rem", marginTop: 4 }}>
                Chat on WhatsApp
              </a>
            </p>
            <p style={{ fontSize: "0.84rem", marginTop: 12 }} className="muted">
              GST details available on official estimates & invoices.
            </p>
          </div>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} {business.name}. All rights reserved.</span>
        <span>{business.serviceArea}</span>
      </div>
    </footer>
  );
}