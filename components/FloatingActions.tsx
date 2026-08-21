import Link from "next/link";
import { business } from "@/lib/business";

export function FloatingActions() {
  const call = `tel:${business.phones[0]}`;
  const wa = `https://wa.me/${business.whatsapp}`;

  return (
    <>
      <div className="fab" aria-label="Quick contact actions">
        <a className="btn primary" href={call} title="Call Now">
          📞 Call
        </a>
        <a className="btn" href={wa} target="_blank" rel="noopener noreferrer" title="WhatsApp">
          💬 WhatsApp
        </a>
        <Link className="btn" href="/contact" title="Request Quote">
          ✉️ Enquire
        </Link>
      </div>

      <nav className="mobile-bar" aria-label="Mobile quick actions">
        <a href={call}>📞 CALL</a>
        <a href={wa} target="_blank" rel="noopener noreferrer">💬 WHATSAPP</a>
        <Link href="/contact">✉️ ENQUIRE</Link>
      </nav>
    </>
  );
}
