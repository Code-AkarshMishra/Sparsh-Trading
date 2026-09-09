import Link from "next/link";
import { business } from "@/lib/business";
import { BrandImage } from "@/components/BrandImage";
import { detailedProducts } from "@/lib/productsCatalogueData";
import { locationsDatabase } from "@/lib/locationsData";
import { guidesData } from "@/lib/guidesData";
import {
  WhatsAppIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  IndiaMartIcon,
  JustdialIcon,
  PhotosIcon,
  ExternalLinkIcon
} from "@/components/Icons";

export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="wrap footer-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 28 }}>
        {/* Brand Column */}
        <div className="footer-brand" style={{ gridColumn: "1 / -1", maxWidth: 760 }}>
          <Link href="/" className="logo" aria-label="SPARSH TRADING home">
            <span className="logo-mark">
              <BrandImage src="/brand-logo.png" alt={`${business.name} logo`} />
            </span>
            <span className="wordmark">
              <BrandImage src="/brand-wordmark.png" alt={business.name} />
            </span>
          </Link>
          <p style={{ marginTop: 12, fontSize: "0.92rem", lineHeight: 1.6, color: "var(--muted)" }}>
            High-precision architectural metalwork, Tata steel door frames (Chaukhat), soundproof uPVC window systems, frameless glass balustrades, and custom modular kitchens in Pratapgarh and Uttar Pradesh.
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.76rem", background: "var(--surface-2)", color: "var(--text)", border: "1px solid var(--border)", padding: "4px 10px", borderRadius: 16, fontWeight: 600 }}>
              2 Direct Partner Lines
            </span>
            <span style={{ fontSize: "0.76rem", background: "var(--surface-2)", color: "var(--text)", border: "1px solid var(--border)", padding: "4px 10px", borderRadius: 16, fontWeight: 600 }}>
              Dedicated Workshop in Pratapgarh
            </span>
            <span style={{ fontSize: "0.76rem", background: "var(--surface-2)", color: "var(--text)", border: "1px solid var(--border)", padding: "4px 10px", borderRadius: 16, fontWeight: 600 }}>
              100% Tax Compliant GST Invoicing
            </span>
          </div>

          {/* Verified Trade Listings & Social Channels */}
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px dashed var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              {/* Verified Portals */}
              <div>
                <span style={{ fontSize: "0.76rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--strong)", display: "block", marginBottom: 8 }}>
                  Verified Trade Portals &amp; Listings
                </span>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                  <a
                    href={business.socials.indiamart}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="directory-badge-pill im"
                    title="Sparsh Trading verified supplier catalog on IndiaMART"
                    aria-label="IndiaMART Verified Supplier Profile"
                  >
                    <IndiaMartIcon width={18} height={18} />
                    <span>IndiaMART Verified</span>
                  </a>
                  <a
                    href={business.socials.justdial}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="directory-badge-pill jd"
                    title="Sparsh Trading rated & verified business profile on Justdial"
                    aria-label="Justdial Rated Business Profile"
                  >
                    <JustdialIcon width={18} height={18} />
                    <span>Justdial Listing</span>
                  </a>
                  <a
                    href={business.socials.justdialPhotos}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="directory-badge-pill"
                    title="Real workshop and site fabrication photos on Justdial"
                    aria-label="Justdial Real Site & Workshop Photos"
                  >
                    <PhotosIcon width={16} height={16} />
                    <span>JD Site Photos</span>
                  </a>
                </div>
              </div>

              {/* Social Media Channels */}
              <div>
                <span style={{ fontSize: "0.76rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--strong)", display: "block", marginBottom: 8 }}>
                  Official Social Channels
                </span>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <a
                    href={business.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-btn social-ig"
                    title="Follow Sparsh Metal on Instagram (@sparsh_metal_industries)"
                    aria-label="Sparsh Metal on Instagram"
                  >
                    <InstagramIcon width={18} height={18} />
                  </a>
                  <a
                    href={business.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-btn social-fb"
                    title="Follow Sparsh Metal on Facebook (@sparshmetal)"
                    aria-label="Sparsh Metal on Facebook"
                  >
                    <FacebookIcon width={18} height={18} />
                  </a>
                  <a
                    href={business.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-btn social-li"
                    title="Connect with Aniket Mishra on LinkedIn"
                    aria-label="Aniket Mishra on LinkedIn"
                  >
                    <LinkedInIcon width={18} height={18} />
                  </a>
                  <a
                    href={`https://wa.me/${business.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-btn social-wa"
                    title="Instant WhatsApp Consultation (+91 8795662161)"
                    aria-label="Instant WhatsApp Consultation"
                  >
                    <WhatsAppIcon width={18} height={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 1: Core Products */}
        <div>
          <h4 style={{ color: "var(--strong)", fontWeight: 700, fontSize: "0.9rem", margin: "0 0 10px", letterSpacing: "0.02em" }}>
            Products Catalogue
          </h4>
          <ul className="footer-links" style={{ listStyle: "none", paddingLeft: 0, margin: 0, lineHeight: 1.8, fontSize: "0.86rem" }}>
            {detailedProducts.slice(0, 5).map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`}>{p.name.split("(")[0]}</Link>
              </li>
            ))}
            <li><Link href="/products" style={{ color: "var(--red-2)", fontWeight: 600 }}>All Products →</Link></li>
          </ul>
        </div>

        {/* Column 2: Regional Service Hubs */}
        <div>
          <h4 style={{ color: "var(--strong)", fontWeight: 700, fontSize: "0.9rem", margin: "0 0 10px", letterSpacing: "0.02em" }}>
            Regional Hubs (UP)
          </h4>
          <ul className="footer-links" style={{ listStyle: "none", paddingLeft: 0, margin: 0, lineHeight: 1.8, fontSize: "0.86rem" }}>
            {locationsDatabase.slice(0, 5).map((loc) => (
              <li key={loc.slug}>
                <Link href={`/locations/${loc.slug}`}>Fabrication in {loc.name}</Link>
              </li>
            ))}
            <li><Link href="/b2b" style={{ color: "var(--red-2)", fontWeight: 600 }}>B2B &amp; Contractors Portal →</Link></li>
          </ul>
        </div>

        {/* Column 3: Buyer Knowledge & Guides */}
        <div>
          <h4 style={{ color: "var(--strong)", fontWeight: 700, fontSize: "0.9rem", margin: "0 0 10px", letterSpacing: "0.02em" }}>
            Buying Guides &amp; Specs
          </h4>
          <ul className="footer-links" style={{ listStyle: "none", paddingLeft: 0, margin: 0, lineHeight: 1.8, fontSize: "0.86rem" }}>
            {guidesData.slice(0, 3).map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`}>{g.title.split(":")[0]}</Link>
              </li>
            ))}
            <li><Link href="/guides" style={{ color: "var(--red-2)", fontWeight: 600 }}>All Buying Guides →</Link></li>
            <li><Link href="/projects">Case Studies Portfolio</Link></li>
            <li><Link href="/gallery">Photos &amp; Videos</Link></li>
            <li>
              <a
                href={business.socials.justdialPhotos}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 5 }}
                title="Browse real workshop photos on Justdial"
              >
                <span>Justdial Photos Gallery</span>
                <ExternalLinkIcon width={11} height={11} />
              </a>
            </li>
            <li>
              <a
                href={business.socials.indiamart}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 5 }}
                title="View verified supplier catalogue on IndiaMART"
              >
                <span>IndiaMART Catalogue</span>
                <ExternalLinkIcon width={11} height={11} />
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact & Workshop */}
        <div>
          <h4 style={{ color: "var(--strong)", fontWeight: 700, fontSize: "0.9rem", margin: "0 0 10px", letterSpacing: "0.02em" }}>
            Workshop &amp; Inquiries
          </h4>
          <div className="footer-contact" style={{ fontSize: "0.86rem" }}>
            <p style={{ margin: "0 0 8px" }}>
              <span className="muted" style={{ display: "block", fontSize: "0.78rem" }}>Direct Partner Lines:</span>
              <a href={`tel:${business.phones[0]}`} style={{ color: "var(--red-2)", fontWeight: 600, marginRight: 8 }}>+91 {business.phones[0]}</a>
              <a href={`tel:${business.phones[1]}`} style={{ color: "var(--red-2)", fontWeight: 600 }}>+91 {business.phones[1]}</a>
            </p>
            <p style={{ margin: "0 0 10px" }}>
              <span className="muted" style={{ display: "block", fontSize: "0.78rem" }}>Main Workshop:</span>
              {business.office}
            </p>
            <div>
              <a
                href={`https://wa.me/${business.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn whatsapp-action"
                style={{ minHeight: 34, padding: "6px 12px", fontSize: "0.82rem", width: "100%", textAlign: "center", borderRadius: 6, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}
              >
                <WhatsAppIcon width={14} height={14} />
                WhatsApp Consultation
              </a>
            </div>
            <p style={{ fontSize: "0.8rem", marginTop: 8, color: "var(--text)" }}>
              <strong style={{ color: "var(--strong)" }}>GSTIN:</strong> <span style={{ color: "var(--red-2)", fontWeight: 700 }}>{business.gstin}</span>
            </p>
            <div style={{ marginTop: 14, paddingTop: 10, borderTop: "1px solid var(--border)" }}>
              <span className="muted" style={{ display: "block", fontSize: "0.76rem", marginBottom: 6 }}>
                Connect on Social &amp; Trade Portals:
              </span>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                <a href={business.socials.instagram} target="_blank" rel="noopener noreferrer" className="social-icon-btn social-ig" title="Instagram" aria-label="Instagram" style={{ width: 30, height: 30 }}>
                  <InstagramIcon width={15} height={15} />
                </a>
                <a href={business.socials.facebook} target="_blank" rel="noopener noreferrer" className="social-icon-btn social-fb" title="Facebook" aria-label="Facebook" style={{ width: 30, height: 30 }}>
                  <FacebookIcon width={15} height={15} />
                </a>
                <a href={business.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-btn social-li" title="LinkedIn" aria-label="LinkedIn" style={{ width: 30, height: 30 }}>
                  <LinkedInIcon width={15} height={15} />
                </a>
                <a href={business.socials.indiamart} target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="IndiaMART" aria-label="IndiaMART" style={{ width: 30, height: 30, padding: 0 }}>
                  <IndiaMartIcon width={18} height={18} />
                </a>
                <a href={business.socials.justdial} target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="Justdial" aria-label="Justdial" style={{ width: 30, height: 30, padding: 0 }}>
                  <JustdialIcon width={18} height={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap footer-bottom" style={{ borderTop: "1px solid var(--border)", paddingTop: 16, marginTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, fontSize: "0.82rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span>© {new Date().getFullYear()} {business.name} • GSTIN: <strong>{business.gstin}</strong></span>
          <span style={{ color: "var(--border)" }}>•</span>
          <Link href="/privacy-policy" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
            Privacy Policy
          </Link>
          <span style={{ color: "var(--border)" }}>•</span>
          <Link href="/terms" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
            Terms of Service
          </Link>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ color: "var(--muted)" }}>Serving {business.serviceArea}</span>
          <span style={{ color: "var(--border)" }}>•</span>
          <span style={{ color: "var(--muted)" }}>
            Built &amp; Deployed by{" "}
            <a
              href="https://linktr.ee/akarshmishra"
              target="_blank"
              rel="noopener noreferrer"
              className="dev-credit-link"
              style={{ color: "var(--red-2)", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              Akarsh Mishra ↗
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}