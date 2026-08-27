import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export const metadata = {
  title: "Client & Customer Login | Sparsh Trading",
  description: "Access your fabrication orders, laser measurements, and invoices."
};

export default function LoginPage() {
  return (
    <main className="section grid-bg subpage-main">
      <div className="wrap split">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span className="brand-dot-pulse" />
            <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
              Client Portal Access
            </span>
          </div>
          <h1 className="display big-title">
            Track your fabrication orders &amp; invoices.
          </h1>
          <p className="section-lead">
            Log in to view quotation status, download PDF invoices, and monitor ongoing fabrication and installation timelines across Uttar Pradesh.
          </p>

          <div style={{ marginTop: 24, padding: "18px 20px", background: "var(--surface)", borderRadius: 12, border: "1.5px solid var(--border)" }}>
            <p style={{ margin: "0 0 10px", fontWeight: 700, color: "var(--strong)" }}>
              First time working with Sparsh Trading?
            </p>
            <Link className="btn primary" href="/register" style={{ fontSize: "0.92rem", padding: "10px 20px" }}>
              Create Customer Account →
            </Link>
          </div>
        </div>

        <AuthForm mode="login" portal="customer" />
      </div>
    </main>
  );
}
