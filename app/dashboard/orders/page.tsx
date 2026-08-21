import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Core";
import { DataTable } from "@/components/DataTable";
import { orderStatuses } from "@/lib/business";

export default async function OrdersPage() {
  const user = await requireUser(["CUSTOMER"]);
  await connectDB();
  const orders = await Order.find({ customer: user.id }).sort({ createdAt: -1 }).lean();
  return <div className="wrap"><span className="eyebrow">Orders</span><h1 className="display big-title">Order Tracker</h1><div className="cards">{orderStatuses.map((s) => <div className="card process-step" key={s}><h2>{s.replaceAll("_", " ")}</h2></div>)}</div><DataTable rows={JSON.parse(JSON.stringify(orders))} columns={[{ key: "orderId", label: "Order ID" }, { key: "currentStatus", label: "Status" }, { key: "amount", label: "Amount" }]} /></div>;
}
