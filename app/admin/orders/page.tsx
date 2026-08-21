import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Core";
import { DataTable } from "@/components/DataTable";

export default async function AdminOrders() {
  await requireUser(["SUPER_ADMIN", "ADMIN", "STAFF"]);
  await connectDB();
  const rows = await Order.find().populate("customer", "name phone").sort({ createdAt: -1 }).lean();
  return <div className="wrap"><h1 className="display big-title">Orders</h1><DataTable rows={JSON.parse(JSON.stringify(rows))} columns={[{ key: "orderId", label: "Order ID" }, { key: "currentStatus", label: "Status" }, { key: "amount", label: "Amount" }]} /></div>;
}
