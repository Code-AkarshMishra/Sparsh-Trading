import { connectDB } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { ok, handleError, fail } from "@/lib/api";
import { Order, OrderStatusHistory, ActivityLog, Notification } from "@/models/Core";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const user = await requireUser(["SUPER_ADMIN", "ADMIN", "STAFF"]);
    const { id } = await params;
    const { status, note, attachment } = await request.json();
    const order = await Order.findByIdAndUpdate(id, { currentStatus: status }, { new: true });
    if (!order) return fail("Order not found", 404);
    await OrderStatusHistory.create({ order: order._id, status, note, attachment, updatedBy: user.id });
    await Notification.create({ user: order.customer, type: "ORDER_UPDATE", title: "Order status updated", message: `${order.orderId} is now ${status}` });
    await ActivityLog.create({ user: user.id, action: "ORDER_STATUS_CHANGED", entity: "Order", entityId: String(order._id), metadata: { status } });
    return ok({ order });
  } catch (error) {
    return handleError(error);
  }
}
