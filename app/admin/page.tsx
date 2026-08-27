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

  const statLabels = ["Total Customers", "New Enquiries", "Active Orders", "Pending Invoices", "Products Catalogue", "Featured Projects"];

  return (
    <div className="wrap" style={{ padding: "32px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span className="brand-dot-pulse" />
        <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
          Management &amp; Controls
        </span>
      </div>
      <h1 className="display big-title">Sparsh Trading Admin Dashboard</h1>
      
      <div className="cards" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, margin: "28px 0" }}>
        {statLabels.map((label, i) => (
          <div className="card process-step" key={label} style={{ borderTop: "3px solid var(--red-2)", padding: 24 }}>
            <h2 style={{ fontSize: "2.4rem", color: "var(--red-2)", margin: 0 }}>{stats[i]}</h2>
            <p style={{ margin: "8px 0 0", fontWeight: 700, color: "var(--strong)" }}>{label}</p>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 24, borderLeft: "4px solid var(--red-2)" }}>
        <h3 style={{ margin: "0 0 10px" }}>System Status</h3>
        <p className="muted" style={{ margin: 0, fontSize: "0.94rem" }}>
          Database Mode: <strong>{db ? "Connected (MongoDB Atlas)" : "Local Storage Mode (Online fallback active)"}</strong>. Enquiries and customer accounts are automatically preserved.
        </p>
      </div>
    </div>
  );
}

