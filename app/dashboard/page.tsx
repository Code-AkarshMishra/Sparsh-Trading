import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Enquiry, Order, Invoice } from "@/models/Core";
import { DataTable } from "@/components/DataTable";

export default async function DashboardPage() {
  const user = await requireUser(["CUSTOMER"]);
  await connectDB();
  const [enquiries, orders, invoices] = await Promise.all([
    Enquiry.find({ customer: user.id }).sort({ createdAt: -1 }).lean(),
    Order.find({ customer: user.id }).sort({ createdAt: -1 }).lean(),
    Invoice.find({ customer: user.id }).sort({ createdAt: -1 }).lean()
  ]);
  return <div className="wrap"><span className="eyebrow">Overview</span><h1 className="display big-title">Welcome, {user.name}</h1><div className="cards">{["Active enquiries", "Active orders", "Pending quotations", "Outstanding invoices"].map((x, i) => <div className="card process-step" key={x}><h2>{[enquiries.length, orders.length, 0, invoices.length][i]}</h2><p>{x}</p></div>)}</div><h2 className="display">My Enquiries</h2><DataTable rows={JSON.parse(JSON.stringify(enquiries))} columns={[{ key: "enquiryId", label: "Enquiry ID" }, { key: "service", label: "Service" }, { key: "status", label: "Status" }, { key: "adminResponse", label: "Admin Response" }]} /></div>;
}
