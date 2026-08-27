import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export const metadata = {
  title: "Administrative Console | Sparsh Trading",
  description: "Secure administrative login for Sparsh Trading founders and management staff.",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminLoginPage() {
  return (
    <main className="section grid-bg subpage-main">
      <div className="wrap split">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span className="brand-dot-pulse" style={{ background: "#991b1b" }} />
            <span className="eyebrow" style={{ color: "#991b1b", margin: 0, fontWeight: 800 }}>
              Restricted Management Gateway
            </span>
          </div>
          <h1 className="display big-title" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>
            Sparsh Trading Executive Portal
          </h1>
          <p className="section-lead">
            Authorized access for Partners &amp; Operations Supervisors. Manage customer leads, active fabrication queues, GST invoicing, and team logs.
          </p>

          <div style={{ marginTop: 24, padding: "18px 20px", background: "var(--surface)", borderRadius: 12, border: "1.5px solid var(--border-strong)", borderLeft: "4px solid #991b1b" }}>
            <p style={{ margin: "0 0 6px", fontWeight: 800, color: "var(--strong)", fontSize: "0.95rem" }}>
              🛡️ Enhanced Anti-Bot Defense Active
            </p>
            <p className="muted" style={{ margin: 0, fontSize: "0.85rem", lineHeight: 1.5 }}>
              This portal utilizes silent honeypot traps and session cryptographic tokens. All authentication attempts are logged with IP &amp; timestamp audit trails.
            </p>
          </div>
        </div>

        <AuthForm mode="login" portal="admin" />
      </div>
    </main>
  );
}
