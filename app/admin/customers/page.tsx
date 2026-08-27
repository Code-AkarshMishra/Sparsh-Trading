import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { DataTable } from "@/components/DataTable";
import { fallbackStore } from "@/lib/offlineStore";

export default async function AdminCustomers() {
  await requireUser(["SUPER_ADMIN", "ADMIN"]);
  const db = await connectDB();
  let rows: any[] = [];

  if (db) {
    try {
      rows = await User.find({ role: "CUSTOMER" }).select("-passwordHash").sort({ createdAt: -1 }).lean();
    } catch {
      rows = fallbackStore.getUsers().filter((u) => u.role === "CUSTOMER");
    }
  } else {
    rows = fallbackStore.getUsers().filter((u) => u.role === "CUSTOMER");
  }

  return (
    <div className="wrap" style={{ padding: "32px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span className="brand-dot-pulse" />
        <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
          Customer Management
        </span>
      </div>
      <h1 className="display big-title">Registered Customers ({rows.length})</h1>
      <div style={{ marginTop: 24 }}>
        <DataTable
          rows={JSON.parse(JSON.stringify(rows))}
          columns={[
            { key: "name", label: "Customer Name" },
            { key: "phone", label: "Mobile Number" },
            { key: "email", label: "Email Address" },
            { key: "address", label: "Project Address" },
            { key: "status", label: "Status" }
          ]}
        />
      </div>
    </div>
  );
}
