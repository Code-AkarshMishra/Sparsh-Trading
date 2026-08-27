import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Core";
import { DataTable } from "@/components/DataTable";

export default async function AdminOrders() {
  await requireUser(["SUPER_ADMIN", "ADMIN", "STAFF"]);
  const db = await connectDB();
  let rows: any[] = [];

  if (db) {
    try {
      rows = await Order.find().populate("customer", "name phone").sort({ createdAt: -1 }).lean();
    } catch {
      rows = [];
    }
  }

  return (
    <div className="wrap" style={{ padding: "32px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span className="brand-dot-pulse" />
        <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
          Order Management
        </span>
      </div>
      <h1 className="display big-title">Fabrication Orders ({rows.length})</h1>
      <div style={{ marginTop: 24 }}>
        <DataTable
          rows={JSON.parse(JSON.stringify(rows))}
          columns={[
            { key: "orderId", label: "Order ID" },
            { key: "currentStatus", label: "Status" },
            { key: "amount", label: "Amount (₹)" }
          ]}
        />
      </div>
    </div>
  );
}
