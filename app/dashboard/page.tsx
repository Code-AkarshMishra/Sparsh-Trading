import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Enquiry, Order, Invoice } from "@/models/Core";
import { DataTable } from "@/components/DataTable";
import { fallbackStore } from "@/lib/offlineStore";
import Link from "next/link";
import { LogoutButton } from "@/components/LogoutButton";

export default async function DashboardPage() {
  const user = await requireUser(["CUSTOMER"]);
  const db = await connectDB();

  let enquiries: any[] = [];
  let orders: any[] = [];
  let invoices: any[] = [];

  if (db) {
    try {
      [enquiries, orders, invoices] = await Promise.all([
        Enquiry.find({ customer: user.id }).sort({ createdAt: -1 }).lean(),
        Order.find({ customer: user.id }).sort({ createdAt: -1 }).lean(),
        Invoice.find({ customer: user.id }).sort({ createdAt: -1 }).lean()
      ]);
    } catch {
      enquiries = fallbackStore.getEnquiries(user.id);
    }
  } else {
    enquiries = fallbackStore.getEnquiries(user.id);
  }

  return (
    <main className="section subpage-main" style={{ paddingTop: 20 }}>
      <div className="wrap" style={{ maxWidth: "100%", boxSizing: "border-box" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
          <div>
            <span className="eyebrow" style={{ color: "var(--red-2)" }}>Customer Portal</span>
            <h1 className="display big-title" style={{ margin: "4px 0 6px", fontSize: "clamp(1.7rem, 4vw, 2.3rem)" }}>
              Welcome, {user.name}
            </h1>
            <p className="muted" style={{ margin: 0, fontSize: "0.92rem" }}>Registered Phone: +91 {user.phone || "N/A"}</p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link className="btn primary" href="/contact" style={{ padding: "8px 18px", fontSize: "0.92rem" }}>
              + New Enquiry
            </Link>
            <LogoutButton />
          </div>
        </div>

        {/* Clickable Customer Stat Cards */}
        <div className="cards" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, margin: "24px 0" }}>
          <a
            href="#enquiries-table"
            className="card clickable"
            style={{
              border: "1.5px solid var(--border-strong)",
              borderTop: "4px solid var(--red-2)",
              borderRadius: 12,
              padding: "20px",
              background: "var(--surface)",
              textDecoration: "none",
              display: "block"
            }}
          >
            <h2 style={{ color: "var(--red-2)", fontSize: "2.4rem", margin: 0, fontWeight: 900 }}>
              {enquiries.length}
            </h2>
            <p style={{ margin: "6px 0 2px", fontWeight: 800, color: "var(--strong)" }}>Submitted Enquiries</p>
            <span style={{ fontSize: "0.8rem", color: "var(--red-2)", fontWeight: 700 }}>View Table ↓</span>
          </a>

          <Link
            href="/dashboard/orders"
            className="card clickable"
            style={{
              border: "1.5px solid var(--border-strong)",
              borderTop: "4px solid var(--red-2)",
              borderRadius: 12,
              padding: "20px",
              background: "var(--surface)",
              textDecoration: "none",
              display: "block"
            }}
          >
            <h2 style={{ color: "var(--red-2)", fontSize: "2.4rem", margin: 0, fontWeight: 900 }}>
              {orders.length}
            </h2>
            <p style={{ margin: "6px 0 2px", fontWeight: 800, color: "var(--strong)" }}>Active Orders</p>
            <span style={{ fontSize: "0.8rem", color: "var(--red-2)", fontWeight: 700 }}>Track Status →</span>
          </Link>

          <Link
            href="/dashboard/invoices"
            className="card clickable"
            style={{
              border: "1.5px solid var(--border-strong)",
              borderTop: "4px solid var(--red-2)",
              borderRadius: 12,
              padding: "20px",
              background: "var(--surface)",
              textDecoration: "none",
              display: "block"
            }}
          >
            <h2 style={{ color: "var(--red-2)", fontSize: "2.4rem", margin: 0, fontWeight: 900 }}>
              {invoices.length}
            </h2>
            <p style={{ margin: "6px 0 2px", fontWeight: 800, color: "var(--strong)" }}>Invoices &amp; Billing</p>
            <span style={{ fontSize: "0.8rem", color: "var(--red-2)", fontWeight: 700 }}>View Invoices →</span>
          </Link>
        </div>

        <div id="enquiries-table" style={{ marginTop: 32 }}>
          <h2 className="display" style={{ fontSize: "1.45rem", marginBottom: 14, color: "var(--strong)" }}>
            My Project Enquiries
          </h2>

          {enquiries.length > 0 ? (
            <DataTable
              rows={JSON.parse(JSON.stringify(enquiries))}
              columns={[
                { key: "enquiryId", label: "Reference ID" },
                { key: "service", label: "Service / Requirement" },
                { key: "location", label: "Location" },
                { key: "status", label: "Status" }
              ]}
            />
          ) : (
            <div className="card" style={{ padding: "32px 20px", textAlign: "center", borderRadius: 12 }}>
              <p className="muted" style={{ margin: 0 }}>No past enquiries found for this account.</p>
              <Link className="btn primary" href="/contact" style={{ marginTop: 14, display: "inline-block" }}>
                Submit a Project Enquiry →
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
