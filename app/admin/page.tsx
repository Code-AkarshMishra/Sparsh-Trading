import { connectDB } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { Enquiry, Order, Invoice, Product, Project } from "@/models/Core";
import { User } from "@/models/User";

export default async function AdminPage() {
  await requireUser(["SUPER_ADMIN", "ADMIN", "STAFF"]);
  await connectDB();
  const stats = await Promise.all([User.countDocuments({ role: "CUSTOMER" }), Enquiry.countDocuments({ status: "NEW" }), Order.countDocuments({ currentStatus: { $ne: "COMPLETED" } }), Invoice.countDocuments({ paymentStatus: { $ne: "PAID" } }), Product.countDocuments(), Project.countDocuments()]);
  return <div className="wrap"><span className="eyebrow">Management</span><h1 className="display big-title">Industrial Admin Dashboard</h1><div className="cards">{["Total customers", "New enquiries", "Active orders", "Pending invoices", "Products", "Projects"].map((x, i) => <div className="card process-step" key={x}><h2>{stats[i]}</h2><p>{x}</p></div>)}</div><p className="muted">Charts use actual MongoDB records only; no fabricated revenue or demand data is displayed.</p></div>;
}
