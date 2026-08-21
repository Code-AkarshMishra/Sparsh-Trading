import { EnquiryForm } from "@/components/EnquiryForm";
import { business } from "@/lib/business";

export default function ContactPage() {
  return (
    <main className="section grid-bg subpage-main">
      <div className="wrap split">
        <div>
          <span className="eyebrow">Contact Us</span>
          <h1 className="display big-title">Let's Build Something Strong.</h1>
          <p className="section-lead">
            Have a custom requirement or need an estimate for your construction or interior project? Reach out to our Pratapgarh team directly.
          </p>

          <div className="card" style={{ padding: 24, marginBottom: 24 }}>
            <span className="eyebrow">Office Location</span>
            <p style={{ fontWeight: 600, margin: "6px 0 14px", color: "var(--strong)" }}>
              {business.office}
            </p>
            <a
              className="text-link"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.office)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions &rarr;
            </a>
          </div>

          <div className="card" style={{ padding: 24, marginBottom: 24 }}>
            <span className="eyebrow">Workshop Location</span>
            <p style={{ fontWeight: 600, margin: "6px 0 14px", color: "var(--strong)" }}>
              {business.workshop}
            </p>
            <a
              className="text-link"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.workshop)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions &rarr;
            </a>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <span className="eyebrow">Direct Contact Numbers</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10 }}>
              <a className="btn" href={`tel:${business.phones[0]}`}>
                📞 {business.phones[0]}
              </a>
              <a className="btn" href={`tel:${business.phones[1]}`}>
                📞 {business.phones[1]}
              </a>
              <a
                className="btn primary"
                href={`https://wa.me/${business.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 WhatsApp Chat
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
