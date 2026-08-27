import { BrandImage } from "@/components/BrandImage";
import { partners, business } from "@/lib/business";

export function OwnerMessage() {
  return (
    <section className="owner-message section" aria-labelledby="owner-message-title">
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span className="brand-dot-pulse" />
            <span className="eyebrow" style={{ color: "var(--red-2)", fontWeight: 700 }}>
              Founders &amp; Leadership
            </span>
          </div>
          <h2 id="owner-message-title" className="display section-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Built With Trust. Finished With Care.
          </h2>
          <p className="section-lead" style={{ maxWidth: 780, margin: "12px auto 0" }}>
            “Every gate, window, railing, and kitchen we make carries our personal promise. We stay involved from the first site measurement to the final installation in your home.”
          </p>
        </div>

        <div className="cards partner-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
          {partners.map((partner, index) => (
            <div
              key={partner.phone}
              className="card partner-card"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
                padding: "28px 24px",
                position: "relative",
                borderTop: "3px solid var(--red-2)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div
                  className="owner-portrait"
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2.5px solid var(--red-2)",
                    background: "rgba(217, 45, 32, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  <BrandImage
                    src="/brand-logo.png"
                    alt={`Partner ${index + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div>
                  <span className="eyebrow" style={{ color: "var(--red-2)", fontSize: "0.75rem", letterSpacing: "0.08em" }}>
                    {partner.title}
                  </span>
                  <h3 style={{ margin: "4px 0 6px", fontSize: "1.3rem" }}>
                    {partner.name}
                  </h3>
                  <div style={{ height: 20, display: "flex", alignItems: "center" }}>
                    <BrandImage src="/brand-wordmark.png" alt="SPARSH TRADING" style={{ height: 18, width: "auto" }} />
                  </div>
                </div>
              </div>

              <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6, color: "var(--text)" }}>
                Directly leading <strong>{partner.role}</strong> with hands-on quality checks at our Pratapgarh workshop.
              </p>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 14, borderTop: "1px solid var(--border)" }}>
                <a
                  href={`tel:${partner.phone}`}
                  className="btn"
                  style={{ fontSize: "0.85rem", padding: "7px 14px", minHeight: 36, borderColor: "var(--red-2)", color: "var(--red-2)" }}
                >
                  📞 Call +91 {partner.phone}
                </a>
                <a
                  href={`https://wa.me/91${partner.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn whatsapp-action"
                  style={{ fontSize: "0.85rem", padding: "7px 14px", minHeight: 36 }}
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}