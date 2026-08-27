import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Invoice } from "@/models/Core";
import { DataTable } from "@/components/DataTable";

export default async function AdminInvoices() {
  await requireUser(["SUPER_ADMIN", "ADMIN"]);
  const db = await connectDB();
  let rows: any[] = [];

  if (db) {
    try {
      rows = await Invoice.find().sort({ createdAt: -1 }).lean();
    } catch {
      rows = [];
    }
  }

  return (
    <div className="wrap" style={{ padding: "32px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span className="brand-dot-pulse" />
        <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
          Billing &amp; Invoices
        </span>
      </div>
      <h1 className="display big-title">Invoices ({rows.length})</h1>
      <div style={{ marginTop: 24 }}>
        <DataTable
          rows={JSON.parse(JSON.stringify(rows))}
          columns={[
            { key: "invoiceNumber", label: "Invoice #" },
            { key: "paymentStatus", label: "Status" },
            { key: "subtotal", label: "Subtotal" },
            { key: "total", label: "Total Amount (₹)" }
          ]}
        />
      </div>
    </div>
  );
}
