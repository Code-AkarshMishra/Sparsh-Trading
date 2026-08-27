import Link from "next/link";
import { connectDB } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { Enquiry, Order, Invoice, Product, Project } from "@/models/Core";
import { User } from "@/models/User";
import { fallbackStore } from "@/lib/offlineStore";
import { defaultProductsCatalogue } from "@/lib/productsData";
import { defaultProjects } from "@/lib/projectsData";

export default async function AdminPage() {
  await requireUser(["SUPER_ADMIN", "ADMIN", "STAFF"]);
  const db = await connectDB();

  let stats = [0, 0, 0, 0, defaultProductsCatalogue.length, defaultProjects.length];

  if (db) {
    try {
      stats = await Promise.all([
        User.countDocuments({ role: "CUSTOMER" }),
        Enquiry.countDocuments({ status: "NEW" }),
        Order.countDocuments({ currentStatus: { $ne: "COMPLETED" } }),
        Invoice.countDocuments({ paymentStatus: { $ne: "PAID" } }),
        Product.countDocuments(),
        Project.countDocuments()
      ]);
    } catch {
      // Fallback
    }
  } else {
    const offlineUsers = fallbackStore.getUsers().filter((u) => u.role === "CUSTOMER");
    const offlineEnquiries = fallbackStore.getEnquiries();
    stats = [
      offlineUsers.length,
      offlineEnquiries.filter((e) => e.status === "NEW").length || offlineEnquiries.length,
      0,
      0,
      defaultProductsCatalogue.length,
      defaultProjects.length
    ];
  }

  const statItems = [
    { label: "Total Customers", count: stats[0], href: "/admin/customers", hint: "View registered customer accounts" },
    { label: "New Enquiries", count: stats[1], href: "/admin/enquiries", hint: "Review and respond to new leads" },
    { label: "Active Orders", count: stats[2], href: "/admin/orders", hint: "Track fabrication & milestones" },
    { label: "Pending Invoices", count: stats[3], href: "/admin/invoices", hint: "Manage billing and tax receipts" },
    { label: "Products Catalogue", count: stats[4], href: "/admin/content", hint: "Edit steel, uPVC & railing catalog" },
    { label: "Featured Projects", count: stats[5], href: "/admin/content", hint: "Update verified installation portfolio" }
  ];

  return (
    <div className="wrap" style={{ padding: "24px 0", maxWidth: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span className="brand-dot-pulse" />
        <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
          Management &amp; Controls
        </span>
      </div>
      <h1 className="display big-title" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
        Sparsh Trading Admin Dashboard
      </h1>
      
      <div
        className="cards"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 18,
          margin: "24px 0"
        }}
      >
        {statItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="card clickable"
            style={{
              border: "1.5px solid var(--border-strong)",
              borderTop: "4px solid var(--red-2)",
              borderRadius: 12,
              padding: "22px 20px",
              background: "var(--surface)",
              boxShadow: "var(--card-shadow)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              textDecoration: "none"
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontSize: "2.6rem", color: "var(--red-2)", margin: 0, fontWeight: 900 }}>
                  {item.count}
                </h2>
                <span style={{ fontSize: "1.1rem", color: "var(--red-2)", fontWeight: 900 }}>→</span>
              </div>
              <p style={{ margin: "8px 0 4px", fontWeight: 800, color: "var(--strong)", fontSize: "1.1rem" }}>
                {item.label}
              </p>
              <p style={{ margin: 0, fontSize: "0.84rem", color: "var(--muted)" }}>
                {item.hint}
              </p>
            </div>
            <span
              style={{
                marginTop: 14,
                fontSize: "0.82rem",
                color: "var(--red-2)",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: 4
              }}
            >
              Open Section →
            </span>
          </Link>
        ))}
      </div>

      <div className="card" style={{ padding: "20px 22px", borderLeft: "4px solid var(--red-2)", borderRadius: 10, background: "var(--surface)" }}>
        <h3 style={{ margin: "0 0 8px", fontSize: "1.05rem", color: "var(--strong)" }}>System &amp; Database Status</h3>
        <p className="muted" style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.5 }}>
          Storage Mode: <strong>{db ? "Connected (MongoDB Atlas Cloud)" : "Local Storage Engine (Direct JSON storage fallback)"}</strong>. All customer enquiries, accounts, and GST invoices are automatically synced.
        </p>
      </div>
    </div>
  );
}
