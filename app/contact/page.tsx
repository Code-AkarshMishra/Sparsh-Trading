import { EnquiryForm } from "@/components/EnquiryForm";
import { business, partners } from "@/lib/business";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  IndiaMartIcon,
  JustdialIcon,
  PhotosIcon,
  ExternalLinkIcon
} from "@/components/Icons";

export default function ContactPage() {
  return (
    <main className="section grid-bg subpage-main">
      <div className="wrap split">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span className="brand-dot-pulse" />
            <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
              Direct Business Consultation
            </span>
          </div>
          <h1 className="display big-title">Let&apos;s Build Something Strong.</h1>
          <p className="section-lead">
            Have a custom requirement or need an estimate for your construction or interior project? Reach out to our Pratapgarh partner team directly.
          </p>

          <div className="card" style={{ padding: 24, marginBottom: 24, borderTop: "3px solid var(--red-2)" }}>
            <span className="eyebrow" style={{ color: "var(--red-2)" }}>🏢 Office &amp; Meeting Location</span>
            <p style={{ fontWeight: 600, margin: "6px 0 14px", color: "var(--strong)", fontSize: "1.02rem" }}>
              {business.office}
            </p>
            <a
              className="btn primary"
              href={business.officeMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "0.85rem", padding: "8px 16px" }}
            >
              Open Office in Google Maps →
            </a>
          </div>

          <div className="card" style={{ padding: 24, marginBottom: 24, borderTop: "3px solid var(--red-2)" }}>
            <span className="eyebrow" style={{ color: "var(--red-2)" }}>⚙️ Workshop &amp; Fabrication Unit</span>
            <p style={{ fontWeight: 600, margin: "6px 0 14px", color: "var(--strong)", fontSize: "1.02rem" }}>
              {business.workshop}
            </p>
            <a
              className="btn primary"
              href={business.workshopMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "0.85rem", padding: "8px 16px" }}
            >
              Open Workshop in Google Maps →
            </a>

          </div>

          <div className="card" style={{ padding: 24, borderLeft: "4px solid var(--red-2)" }}>
            <span className="eyebrow" style={{ color: "var(--red-2)", fontWeight: 700 }}>Direct Partner Lines</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
              {partners.map((p) => (
                <div key={p.phone} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, paddingBottom: 10, borderBottom: "1px solid var(--border)" }}>
                  <div>
                    <strong style={{ display: "block", color: "var(--strong)" }}>{p.title}</strong>
                    <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>{p.role}</span>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <a className="btn" href={`tel:${p.phone}`} style={{ fontSize: "0.82rem", padding: "6px 12px", minHeight: 32 }}>
                      📞 {p.phone}
                    </a>
                    <a className="btn whatsapp-action" href={`https://wa.me/91${p.phone}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.82rem", padding: "6px 12px", minHeight: 32 }}>
                      💬 Chat
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 24, marginTop: 24, borderTop: "3px solid #FF7700" }}>
            <span className="eyebrow" style={{ color: "var(--red-2)", fontWeight: 700 }}>
              ⭐ Verified Portals &amp; Social Channels
            </span>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "6px 0 16px", lineHeight: 1.6 }}>
              Verify our company credentials, inspect real workshop fabrication photos, or connect with our team across leading platforms:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
              <a
                href={business.socials.indiamart}
                target="_blank"
                rel="noopener noreferrer"
                className="card"
                style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 10, textDecoration: "none", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8 }}
              >
                <IndiaMartIcon width={24} height={24} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{ display: "block", fontSize: "0.84rem", color: "var(--strong)" }}>IndiaMART Verified</strong>
                  <span style={{ fontSize: "0.72rem", color: "var(--muted)", display: "block" }}>B2B Catalog &amp; Trust Seal</span>
                </div>
                <ExternalLinkIcon width={11} height={11} style={{ color: "var(--muted)", flexShrink: 0 }} />
              </a>

              <a
                href={business.socials.justdial}
                target="_blank"
                rel="noopener noreferrer"
                className="card"
                style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 10, textDecoration: "none", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8 }}
              >
                <JustdialIcon width={24} height={24} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{ display: "block", fontSize: "0.84rem", color: "var(--strong)" }}>Justdial Listing</strong>
                  <span style={{ fontSize: "0.72rem", color: "var(--muted)", display: "block" }}>Verified Business Profile</span>
                </div>
                <ExternalLinkIcon width={11} height={11} style={{ color: "var(--muted)", flexShrink: 0 }} />
              </a>

              <a
                href={business.socials.justdialPhotos}
                target="_blank"
                rel="noopener noreferrer"
                className="card"
                style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 10, textDecoration: "none", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8 }}
              >
                <div style={{ width: 24, height: 24, borderRadius: 5, background: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--border)", color: "var(--red-2)", flexShrink: 0 }}>
                  <PhotosIcon width={15} height={15} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{ display: "block", fontSize: "0.84rem", color: "var(--strong)" }}>JD Photos Gallery</strong>
                  <span style={{ fontSize: "0.72rem", color: "var(--muted)", display: "block" }}>Real Workshop Photos</span>
                </div>
                <ExternalLinkIcon width={11} height={11} style={{ color: "var(--muted)", flexShrink: 0 }} />
              </a>

              <a
                href={business.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="card"
                style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 10, textDecoration: "none", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8 }}
              >
                <div style={{ width: 24, height: 24, borderRadius: 5, background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>
                  <InstagramIcon width={14} height={14} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{ display: "block", fontSize: "0.84rem", color: "var(--strong)" }}>Instagram</strong>
                  <span style={{ fontSize: "0.72rem", color: "var(--muted)", display: "block" }}>@sparsh_metal_industries</span>
                </div>
                <ExternalLinkIcon width={11} height={11} style={{ color: "var(--muted)", flexShrink: 0 }} />
              </a>

              <a
                href={business.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="card"
                style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 10, textDecoration: "none", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8 }}
              >
                <div style={{ width: 24, height: 24, borderRadius: 5, background: "#1877F2", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>
                  <FacebookIcon width={14} height={14} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{ display: "block", fontSize: "0.84rem", color: "var(--strong)" }}>Facebook</strong>
                  <span style={{ fontSize: "0.72rem", color: "var(--muted)", display: "block" }}>@sparshmetal</span>
                </div>
                <ExternalLinkIcon width={11} height={11} style={{ color: "var(--muted)", flexShrink: 0 }} />
              </a>

              <a
                href={business.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="card"
                style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 10, textDecoration: "none", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8 }}
              >
                <div style={{ width: 24, height: 24, borderRadius: 5, background: "#0A66C2", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>
                  <LinkedInIcon width={14} height={14} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{ display: "block", fontSize: "0.84rem", color: "var(--strong)" }}>LinkedIn</strong>
                  <span style={{ fontSize: "0.72rem", color: "var(--muted)", display: "block" }}>Aniket Mishra</span>
                </div>
                <ExternalLinkIcon width={11} height={11} style={{ color: "var(--muted)", flexShrink: 0 }} />
              </a>
            </div>
          </div>
        </div>

        <div>
          <EnquiryForm />
        </div>
      </div>
    </main>
  );
}
