import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <main className="section grid-bg subpage-main">
      <div className="wrap split">
        <div>
          <span className="eyebrow">Customer &amp; Admin Access</span>
          <h1 className="display big-title">
            Access your orders, enquiries and invoices.
          </h1>
          <p className="section-lead">
            Log in to view quotation status, download PDF invoices, and monitor ongoing fabrication and installation timelines.
          </p>
          <div style={{ marginTop: 24 }}>
            <p className="muted" style={{ marginBottom: 12 }}>
              Don't have an account yet?
            </p>
            <Link className="btn" href="/register">
              Create Customer Account &rarr;
            </Link>
          </div>
        </div>

        <AuthForm mode="login" />
      </div>
    </main>
  );
}
