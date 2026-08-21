import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Invoice } from "@/models/Core";
import { DataTable } from "@/components/DataTable";

export default async function InvoicesPage() {
  const user = await requireUser(["CUSTOMER"]);
  await connectDB();
  const invoices = await Invoice.find({ customer: user.id }).sort({ createdAt: -1 }).lean();
  return <div className="wrap"><span className="eyebrow">Invoices</span><h1 className="display big-title">Billing</h1><DataTable rows={JSON.parse(JSON.stringify(invoices))} columns={[{ key: "invoiceNumber", label: "Invoice" }, { key: "paymentStatus", label: "Status" }, { key: "total", label: "Total" }]} /></div>;
}
