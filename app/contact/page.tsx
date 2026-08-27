import { EnquiryForm } from "@/components/EnquiryForm";
import { business, partners } from "@/lib/business";

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
          <h1 className="display big-title">Let's Build Something Strong.</h1>
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
        </div>

        <div>
          <EnquiryForm />
        </div>
      </div>
    </main>
  );
}
