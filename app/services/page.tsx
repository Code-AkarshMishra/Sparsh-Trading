import Link from "next/link";
import { services } from "@/lib/business";

export default function ServicesPage() {
  return (
    <main className="section subpage-main">
      <div className="wrap">
        <span className="eyebrow">Services</span>
        <h1 className="display big-title">Premium service catalogue.</h1>
        <p className="section-lead">
          Comprehensive fabrication, architectural metalwork, window systems, and interior solutions designed and delivered for Pratapgarh and surrounding regions.
        </p>

        <div className="cards">
          {services.map((s, i) => (
            <Link
              href={`/services/${s.slug}`}
              className="service-card card clickable"
              data-code={`ST/${i + 1}`}
              key={s.slug}
              aria-label={`View ${s.title} details`}
            >
              <div>
                <span className="service-label">Service 0{i + 1}</span>
                <h2 className="display" style={{ fontSize: "1.55rem", margin: "8px 0 12px" }}>
                  {s.title}
                </h2>
                <p className="muted">{s.description}</p>
                <ul style={{ margin: "12px 0 16px" }}>
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <span className="btn primary" style={{ alignSelf: "flex-start", marginTop: "auto" }}>
                Request Quote <span aria-hidden="true">-&gt;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
