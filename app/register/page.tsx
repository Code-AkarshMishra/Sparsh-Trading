import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <main className="section grid-bg subpage-main">
      <div className="wrap split">
        <div>
          <span className="eyebrow">Customer Registration</span>
          <h1 className="display big-title">
            Create a customer account.
          </h1>
          <p className="section-lead">
            Register to track enquiries, review fabrication milestones, access verified GST invoices, and receive direct project notifications securely.
          </p>
          <div style={{ marginTop: 24 }}>
            <p className="muted" style={{ marginBottom: 12 }}>
              Already registered with Sparsh Trading?
            </p>
            <Link className="btn" href="/login">
              Log in to your account →

            </Link>
          </div>
        </div>

        <AuthForm mode="register" />
      </div>
    </main>
  );
}
