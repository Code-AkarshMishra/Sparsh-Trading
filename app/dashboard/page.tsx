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
    <main className="section subpage-main">
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <span className="eyebrow" style={{ color: "var(--red-2)" }}>Customer Portal</span>
            <h1 className="display big-title" style={{ margin: "6px 0" }}>Welcome, {user.name}</h1>
            <p className="muted" style={{ margin: 0 }}>Registered Phone: +91 {user.phone || "N/A"}</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <Link className="btn primary" href="/contact">
              + New Enquiry
            </Link>
            <LogoutButton />
          </div>
        </div>

        <div className="cards" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, margin: "28px 0" }}>
          <div className="card process-step" style={{ borderTop: "3px solid var(--red-2)" }}>
            <h2 style={{ color: "var(--red-2)", fontSize: "2rem" }}>{enquiries.length}</h2>
            <p>Submitted Enquiries</p>
          </div>
          <div className="card process-step" style={{ borderTop: "3px solid var(--red-2)" }}>
            <h2 style={{ color: "var(--red-2)", fontSize: "2rem" }}>{orders.length}</h2>
            <p>Active Fabrication Orders</p>
          </div>
          <div className="card process-step" style={{ borderTop: "3px solid var(--red-2)" }}>
            <h2 style={{ color: "var(--red-2)", fontSize: "2rem" }}>{invoices.length}</h2>
            <p>Invoices &amp; Billing</p>
          </div>
        </div>

        <h2 className="display" style={{ fontSize: "1.6rem", marginTop: 36, marginBottom: 14 }}>
          My Project Enquiries
        </h2>

        {enquiries.length > 0 ? (
          <DataTable
            rows={JSON.parse(JSON.stringify(enquiries))}
            columns={[
              { key: "enquiryId", label: "Reference ID" },
              { key: "service", label: "Service / Requirement" },
              { key: "status", label: "Status" },
              { key: "createdAt", label: "Date" }
            ]}
          />
        ) : (
          <div className="empty">
            <p>No past enquiries found for this account.</p>
            <Link className="btn primary" href="/contact" style={{ marginTop: 14 }}>
              Submit a Project Enquiry →

            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

