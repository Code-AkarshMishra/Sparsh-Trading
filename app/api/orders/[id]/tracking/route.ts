import { connectDB } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { ok, handleError, fail } from "@/lib/api";
import { Order, OrderStatusHistory } from "@/models/Core";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const user = await requireUser(["SUPER_ADMIN", "ADMIN", "STAFF", "CUSTOMER"]);
    const { id } = await params;
    const order = await Order.findById(id).lean() as { customer?: unknown } | null;
    if (!order) return fail("Order not found", 404);
    if (user.role === "CUSTOMER" && String(order.customer) !== user.id) return fail("Unauthorized", 403);
    const timeline = await OrderStatusHistory.find({ order: id }).sort({ createdAt: 1 }).lean();
    return ok({ order, timeline });
  } catch (error) {
    return handleError(error);
  }
}
