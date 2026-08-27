import { BrandImage } from "@/components/BrandImage";
import { partners, business } from "@/lib/business";
import { MobileSwipeableContainer } from "@/components/MobileSwipeableContainer";
import { PhoneIcon, WhatsAppIcon } from "@/components/Icons";

export function OwnerMessage() {
  return (
    <section className="owner-message section" aria-labelledby="owner-message-title">
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span className="brand-dot-pulse" />
            <span className="eyebrow" style={{ color: "var(--red-2)", fontWeight: 700 }}>
              Founders &amp; Leadership
            </span>
          </div>
          <h2 id="owner-message-title" className="section-title" style={{ textAlign: "center" }}>
            Built With Trust. Finished With Care.
          </h2>
          <p className="section-lead" style={{ maxWidth: 740, margin: "10px auto 0" }}>
            “Every gate, window, railing, and kitchen we make carries our personal promise. We stay involved from the first site measurement to the final installation in your home.”
          </p>
        </div>

        <MobileSwipeableContainer autoSlideInterval={4000} gridClassName="cards partner-grid">
          {partners.map((partner, index) => (
            <div
              key={partner.phone}
              className="card partner-card"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
                padding: "24px 22px",
                borderRadius: 12,
                border: "1px solid var(--border)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div
                  className="owner-portrait"
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid var(--red-2)",
                    background: "rgba(217, 45, 32, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  <BrandImage
                    src={partner.image || "/brand-logo.webp"}
                    alt={`${partner.name} - ${partner.title}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div>
                  <span className="eyebrow" style={{ color: "var(--red-2)", fontSize: "0.72rem", letterSpacing: "0.06em", margin: 0 }}>
                    {partner.title}
                  </span>
                  <h3 style={{ margin: "2px 0 4px", fontSize: "1.15rem", fontWeight: 700, color: "var(--strong)" }}>
                    {partner.name}
                  </h3>
                  <div style={{ height: 18, display: "flex", alignItems: "center" }}>
                    <BrandImage src="/brand-wordmark.png" alt="SPARSH TRADING" style={{ height: 16, width: "auto" }} />
                  </div>
                </div>
              </div>

              <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.6, color: "var(--text)" }}>
                Directly leading <strong>{partner.role}</strong> with hands-on quality checks at our Pratapgarh workshop.
              </p>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 14, borderTop: "1px solid var(--border)", gap: 10 }}>
                <a
                  href={`tel:${partner.phone}`}
                  className="btn"
                  style={{ fontSize: "0.82rem", padding: "6px 12px", minHeight: 34, borderRadius: 6, borderColor: "var(--border)", color: "var(--strong)", display: "inline-flex", alignItems: "center", gap: 5 }}
                >
                  <PhoneIcon width={13} height={13} style={{ color: "var(--red-2)" }} />
                  Call +91 {partner.phone}
                </a>
                <a
                  href={`https://wa.me/91${partner.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn whatsapp-action"
                  style={{ fontSize: "0.82rem", padding: "6px 12px", minHeight: 34, borderRadius: 6, display: "inline-flex", alignItems: "center", gap: 5 }}
                >
                  <WhatsAppIcon width={14} height={14} />
                  WhatsApp
                </a>
              </div>
            </div>
          ))}
        </MobileSwipeableContainer>
      </div>
    </section>
  );
}