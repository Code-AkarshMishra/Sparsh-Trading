import { connectDB } from "@/lib/db";
import { requireApiAuth } from "@/lib/auth";
import { ok, handleError } from "@/lib/api";
import { Enquiry, Order, Invoice, Product, Project } from "@/models/Core";
import { User } from "@/models/User";

export async function GET() {
  try {
    await connectDB();
    await requireApiAuth(["SUPER_ADMIN", "ADMIN", "STAFF"]);
    const [customers, newEnquiries, pendingEnquiries, activeOrders, completedOrders, pendingInvoices, revenue, products, projects] = await Promise.all([
      User.countDocuments({ role: "CUSTOMER" }),
      Enquiry.countDocuments({ status: "NEW" }),
      Enquiry.countDocuments({ status: { $ne: "CLOSED" } }),
      Order.countDocuments({ currentStatus: { $ne: "COMPLETED" } }),
      Order.countDocuments({ currentStatus: "COMPLETED" }),
      Invoice.countDocuments({ paymentStatus: { $in: ["ISSUED", "PARTIALLY_PAID", "OVERDUE"] } }),
      Invoice.aggregate([{ $match: { paymentStatus: "PAID" } }, { $group: { _id: null, total: { $sum: "$total" } } }]),
      Product.countDocuments(),
      Project.countDocuments()
    ]);
    return ok({ customers, newEnquiries, pendingEnquiries, activeOrders, completedOrders, pendingInvoices, revenue: revenue[0]?.total || 0, products, projects });
  } catch (error) {
    return handleError(error);
  }
}
