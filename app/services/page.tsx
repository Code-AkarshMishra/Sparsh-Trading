import Link from "next/link";
import { services } from "@/lib/business";

export default function ServicesPage() {
  return (
    <main className="section subpage-main">
      <div className="wrap">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span className="brand-dot-pulse" />
          <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
            Specialized Services
          </span>
        </div>
        <h1 className="display big-title">Premium fabrication &amp; architectural solutions.</h1>
        <p className="section-lead">
          Comprehensive fabrication, architectural metalwork, uPVC window systems, glass railings, and modular interior fittings crafted in Pratapgarh.
        </p>

        <div className="cards" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28, marginTop: 36 }}>
          {services.map((s, i) => (
            <Link
              href={`/services/${s.slug}`}
              className="service-card card clickable"
              key={s.slug}
              aria-label={`View ${s.title} details`}
              style={{ borderTop: "3px solid var(--red-2)", position: "relative" }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="service-label" style={{ color: "var(--red-2)", fontWeight: 800 }}>
                    Service 0{i + 1}
                  </span>
                  <span style={{ color: "var(--red-2)", fontWeight: 900 }}>→</span>
                </div>

                <h2 className="display" style={{ fontSize: "1.55rem", margin: "10px 0 12px", color: "var(--strong)" }}>
                  {s.title}
                </h2>
                <p className="muted" style={{ fontSize: "0.95rem" }}>{s.description}</p>
                
                <ul style={{ margin: "14px 0 20px", paddingLeft: 0, listStyle: "none" }}>
                  {s.items.map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.9rem", marginBottom: 6 }}>
                      <span style={{ color: "var(--red-2)", fontWeight: 900 }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <span className="btn primary" style={{ alignSelf: "flex-start", marginTop: "auto" }}>
                Request Quote <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
