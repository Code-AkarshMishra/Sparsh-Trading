import { requireUser } from "@/lib/auth";
import { business } from "@/lib/business";
import { ChangePasswordForm } from "@/components/ChangePasswordForm";

export default async function AdminSettingsPage() {
  await requireUser(["SUPER_ADMIN", "ADMIN", "STAFF"]);

  return (
    <div className="wrap" style={{ padding: "24px 0", maxWidth: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span className="brand-dot-pulse" />
        <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
          Configuration &amp; Controls
        </span>
      </div>
      <h1 className="display big-title" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
        Business &amp; System Settings
      </h1>
      <p className="muted" style={{ margin: "6px 0 24px" }}>
        Official business entity credentials, GST registration, notification endpoints, and domain bindings.
      </p>

      <div className="cards" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
        {/* Business Identity */}
        <div className="card" style={{ padding: 24, borderTop: "4px solid var(--red-2)", borderRadius: 12 }}>
          <h3 style={{ margin: "0 0 14px", fontSize: "1.2rem", color: "var(--strong)" }}>🏢 Enterprise Profile</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.92rem" }}>
            <div><strong>Company Name:</strong> {business.name}</div>
            <div><strong>Legal Entity:</strong> Partnership Firm</div>
            <div><strong>GSTIN:</strong> <span style={{ color: "var(--red-2)", fontWeight: 800 }}>{business.gstin}</span></div>
            <div><strong>Registered Domain:</strong> <a href={`https://${business.domain}`} target="_blank" style={{ color: "var(--red-2)", fontWeight: 700 }}>{business.domain}</a></div>
            <div><strong>Registered Office:</strong> {business.office}</div>
            <div><strong>Fabrication Workshop:</strong> {business.workshop}</div>
          </div>
        </div>

        {/* Contact Hotline & Notifications */}
        <div className="card" style={{ padding: 24, borderTop: "4px solid var(--red-2)", borderRadius: 12 }}>
          <h3 style={{ margin: "0 0 14px", fontSize: "1.2rem", color: "var(--strong)" }}>📞 Communication Gateways</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.92rem" }}>
            <div><strong>Primary Phone:</strong> <a href={`tel:${business.phones[0]}`} style={{ color: "var(--red-2)", fontWeight: 700 }}>+91 {business.phones[0]}</a></div>
            <div><strong>Secondary Phone:</strong> <a href={`tel:${business.phones[1]}`} style={{ color: "var(--red-2)", fontWeight: 700 }}>+91 {business.phones[1]}</a></div>
            <div><strong>Enquiry Email:</strong> <a href={`mailto:${business.email}`} style={{ color: "var(--red-2)", fontWeight: 700 }}>{business.email}</a></div>
            <div><strong>WhatsApp Direct:</strong> <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ color: "#059669", fontWeight: 700 }}>Active (+91 {business.phones[0]}) ↗</a></div>
            <div><strong>Service Area:</strong> {business.serviceArea}</div>
          </div>
        </div>

        {/* Cloud Infrastructure */}
        <div className="card" style={{ padding: 24, borderTop: "4px solid var(--red-2)", borderRadius: 12 }}>
          <h3 style={{ margin: "0 0 14px", fontSize: "1.2rem", color: "var(--strong)" }}>☁️ Infrastructure &amp; Security</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.92rem" }}>
            <div><strong>Hosting:</strong> Vercel Edge Serverless (Global CDN)</div>
            <div><strong>DNS Provider:</strong> Hostinger DNS (`76.76.21.21` / `216.198.79.1`)</div>
            <div><strong>Primary Database:</strong> MongoDB Atlas Cloud M0 Cluster</div>
            <div><strong>Offline Fallback:</strong> Active &amp; Ready (Local JSON Engine)</div>
            <div><strong>SMTP Gateway:</strong> Gmail SSL Direct (Port 465) + HTTPS Fallback</div>
          </div>
        </div>

        {/* Password & Security Management */}
        <div className="card" style={{ padding: 24, borderTop: "4px solid var(--red-2)", borderRadius: 12 }}>
          <h3 style={{ margin: "0 0 6px", fontSize: "1.2rem", color: "var(--strong)" }}>🔒 Password &amp; Credentials</h3>
          <p className="muted" style={{ fontSize: "0.85rem", marginBottom: 16 }}>
            Update your account password. All passwords are automatically hashed with Bcrypt (10 rounds).
          </p>
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
