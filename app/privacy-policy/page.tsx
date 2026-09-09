import Link from "next/link";
import type { Metadata } from "next";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Privacy Policy | Sparsh Trading Pratapgarh",
  description: "Privacy Policy of Sparsh Trading. Learn how we collect, handle, and protect your project inquiries, site measurements, and customer records in Uttar Pradesh.",
  alternates: {
    canonical: "https://www.sparshtrading.shop/privacy-policy"
  }
};

export default function PrivacyPolicyPage() {
  return (
    <main className="section grid-bg subpage-main">
      <div className="wrap" style={{ maxWidth: 860 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span className="brand-dot-pulse" />
          <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
            Legal &amp; Compliance
          </span>
        </div>

        <h1 className="display big-title" style={{ margin: "0 0 16px" }}>
          Privacy Policy
        </h1>

        <p className="muted" style={{ fontSize: "0.95rem", marginBottom: 32 }}>
          Last Updated: September 2026 • Governed under the Information Technology Act (India)
        </p>

        <div className="card" style={{ padding: "32px 36px", lineHeight: 1.8, fontSize: "0.96rem" }}>
          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: "1.25rem", color: "var(--strong)", marginBottom: 10 }}>1. Introduction</h2>
            <p>
              At <strong>{business.name}</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we respect your privacy and are committed to safeguarding the personal and commercial information you provide when using our website (<Link href="/" style={{ color: "var(--red-2)", fontWeight: 600 }}>sparshtrading.shop</Link>) or engaging our architectural fabrication, uPVC window, and interior design services across Uttar Pradesh.
            </p>
          </section>

          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: "1.25rem", color: "var(--strong)", marginBottom: 10 }}>2. Information We Collect</h2>
            <p>We only collect information necessary to fulfill site surveys, quote estimations, custom manufacturing, and billing:</p>
            <ul style={{ paddingLeft: 22, marginTop: 8 }}>
              <li><strong>Contact Information:</strong> Full name, phone number, email address, and billing address.</li>
              <li><strong>Site &amp; Project Details:</strong> Physical site/delivery location in UP, structural dimensions, project specifications, architectural drawings, and service preferences (e.g. steel fabrication, uPVC windows, glass railings, modular kitchen).</li>
              <li><strong>Account Credentials:</strong> Hashed passwords and secure session identifiers for registered customer and partner portals.</li>
              <li><strong>Technical Logs:</strong> IP address, browser type, and interaction timestamps used strictly for rate limiting, bot protection, and security verification.</li>
            </ul>
          </section>

          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: "1.25rem", color: "var(--strong)", marginBottom: 10 }}>3. How We Use Your Information</h2>
            <p>We process your data exclusively for legitimate business and contractual purposes:</p>
            <ul style={{ paddingLeft: 22, marginTop: 8 }}>
              <li>Scheduling site visits and taking on-site laser measurements in Pratapgarh, Sultanpur, Prayagraj, and neighboring regions.</li>
              <li>Preparing transparent, itemized quotation estimates and engineering proposals.</li>
              <li>Fabricating custom metalwork, window systems, and modular furniture to your exact specifications.</li>
              <li>Issuing GST-compliant tax invoices (GSTIN: {business.gstin}).</li>
              <li>Direct customer service, delivery coordination, and post-installation warranty support via phone or WhatsApp.</li>
            </ul>
          </section>

          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: "1.25rem", color: "var(--strong)", marginBottom: 10 }}>4. Communications &amp; WhatsApp Notifications</h2>
            <p>
              When you submit a quote request or contact form on our website, we send you a direct confirmation and may initiate communication via WhatsApp or phone call to confirm your site requirements. We do not engage in spam marketing or sell customer contact lists to third-party telemarketers.
            </p>
          </section>

          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: "1.25rem", color: "var(--strong)", marginBottom: 10 }}>5. Data Security &amp; Protection</h2>
            <p>
              We implement industry-standard security safeguards, including TLS/HTTPS encryption in transit, bcrypt cryptographic password hashing, strict HTTP security headers (HSTS, CSP, X-Frame-Options), and access-controlled cloud database storage. Administrative dashboards are protected by multi-factor session validation.
            </p>
          </section>

          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: "1.25rem", color: "var(--strong)", marginBottom: 10 }}>6. Cookies &amp; Local Storage</h2>
            <p>
              Our website uses essential session cookies and browser local storage solely to retain your UI theme preference (dark/light mode) and securely maintain your authenticated portal session. We do not use intrusive third-party cross-site advertising cookies.
            </p>
          </section>

          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: "1.25rem", color: "var(--strong)", marginBottom: 10 }}>7. Your Rights &amp; Data Rectification</h2>
            <p>
              You have the right to request access to the personal data we hold about you, request corrections to your contact or billing information, or request deletion of your online portal account. To exercise any of these rights, contact our managing team directly.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1.25rem", color: "var(--strong)", marginBottom: 10 }}>8. Contact Us</h2>
            <p>For any privacy inquiries, data requests, or compliance questions, please contact:</p>
            <div style={{ background: "var(--surface-2)", padding: "16px 20px", borderRadius: 8, marginTop: 10 }}>
              <strong style={{ color: "var(--strong)", display: "block" }}>{business.name}</strong>
              <span>Head Office: {business.office}</span><br />
              <span>Workshop: {business.workshop}</span><br />
              <span>Direct Lines: +91 {business.phones[0]} / +91 {business.phones[1]}</span><br />
              <span>Email: <a href="mailto:mail.sparshtrading@gmail.com" style={{ color: "var(--red-2)", fontWeight: 600 }}>mail.sparshtrading@gmail.com</a></span>
            </div>
          </section>
        </div>

        <div style={{ marginTop: 28, textAlign: "center" }}>
          <Link href="/" className="btn" style={{ marginRight: 12 }}>
            ← Back to Home
          </Link>
          <Link href="/terms" className="btn primary">
            Read Terms of Service →
          </Link>
        </div>
      </div>
    </main>
  );
}
