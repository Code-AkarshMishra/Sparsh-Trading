import { connectDB } from "@/lib/db";
import { requireApiAuth } from "@/lib/auth";
import { ok, fail, handleError, verifyAllowedOrigin } from "@/lib/api";
import { Invoice, ActivityLog } from "@/models/Core";

async function nextInvoiceNumber() {
  const year = new Date().getFullYear();
  const count = await Invoice.countDocuments({ createdAt: { $gte: new Date(`${year}-01-01`) } });
  return `ST-INV-${year}-${String(count + 1).padStart(6, "0")}`;
}

export async function GET() {
  try {
    await connectDB();
    const user = await requireApiAuth(["SUPER_ADMIN", "ADMIN", "CUSTOMER"]);
    const query = user.role === "CUSTOMER" ? { customer: user.id } : {};
    return ok({ invoices: await Invoice.find(query).populate("customer", "name phone email").sort({ createdAt: -1 }).lean() });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    if (!verifyAllowedOrigin(request)) {
      return fail("Cross-origin request blocked.", 403);
    }
    await connectDB();
    const user = await requireApiAuth(["SUPER_ADMIN", "ADMIN"]);
    const body = await request.json();
    const subtotal = body.items?.reduce((sum: number, item: { quantity: number; unitPrice: number }) => sum + Number(item.quantity || 0) * Number(item.unitPrice || 0), 0) || 0;
    const discount = Number(body.discount || 0);
    const taxRate = Number(body.taxRate ?? process.env.TAX_DEFAULT_RATE ?? 0);
    const taxAmount = ((subtotal - discount) * taxRate) / 100;
    const invoice = await Invoice.create({ ...body, invoiceNumber: await nextInvoiceNumber(), subtotal, discount, taxRate, taxAmount, total: subtotal - discount + taxAmount });
    await ActivityLog.create({ user: user.id, action: "INVOICE_CREATED", entity: "Invoice", entityId: String(invoice._id) });
    return ok({ invoice });
  } catch (error) {
    return handleError(error);
  }
}
