import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Invoice } from "@/models/Core";
import { DataTable } from "@/components/DataTable";

export default async function AdminInvoices() {
  await requireUser(["SUPER_ADMIN", "ADMIN"]);
  await connectDB();
  const rows = await Invoice.find().sort({ createdAt: -1 }).lean();
  return <div className="wrap"><h1 className="display big-title">Invoices</h1><DataTable rows={JSON.parse(JSON.stringify(rows))} columns={[{ key: "invoiceNumber", label: "Invoice" }, { key: "paymentStatus", label: "Status" }, { key: "subtotal", label: "Subtotal" }, { key: "total", label: "Total" }]} /></div>;
}
