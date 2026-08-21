import { connectDB } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { ok, handleError } from "@/lib/api";
import { Order, OrderStatusHistory, ActivityLog } from "@/models/Core";

async function nextOrderId() {
  const year = new Date().getFullYear();
  const count = await Order.countDocuments({ createdAt: { $gte: new Date(`${year}-01-01`) } });
  return `ST-ORD-${year}-${String(count + 1).padStart(6, "0")}`;
}

export async function GET() {
  try {
    await connectDB();
    const user = await requireUser(["SUPER_ADMIN", "ADMIN", "STAFF", "CUSTOMER"]);
    const query = user.role === "CUSTOMER" ? { customer: user.id } : {};
    return ok({ orders: await Order.find(query).populate("customer", "name phone email").sort({ createdAt: -1 }).lean() });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const user = await requireUser(["SUPER_ADMIN", "ADMIN"]);
    const order = await Order.create({ ...(await request.json()), orderId: await nextOrderId() });
    await OrderStatusHistory.create({ order: order._id, status: order.currentStatus, note: "Order created", updatedBy: user.id });
    await ActivityLog.create({ user: user.id, action: "ORDER_CREATED", entity: "Order", entityId: String(order._id) });
    return ok({ order });
  } catch (error) {
    return handleError(error);
  }
}
