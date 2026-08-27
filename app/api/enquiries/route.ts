import { z } from "zod";
import { connectDB } from "@/lib/db";
import { getSession, requireApiAuth } from "@/lib/auth";
import { ok, fail, handleError, ApiError, verifyAllowedOrigin } from "@/lib/api";
import { Enquiry, ActivityLog, Notification } from "@/models/Core";
import { sendOwnerEnquiryEmail } from "@/lib/mail";
import { sendWhatsAppServerNotification } from "@/lib/whatsapp";
import { fallbackStore } from "@/lib/offlineStore";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

const schema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(10).max(15).regex(/^[0-9+ -]+$/, "Invalid phone number format"),
  email: z.string().email().optional().or(z.literal("")),
  location: z.string().max(150).optional(),
  service: z.string().min(2).max(100),
  requirement: z.string().max(1000).optional(),
  dimensions: z.string().max(200).optional(),
  budgetRange: z.string().max(100).optional(),
  preferredContactMethod: z.string().max(50).optional(),
  message: z.string().max(2000).optional(),
  uploads: z.array(z.object({ url: z.string(), name: z.string(), type: z.string(), size: z.number() })).optional()
});

function generateFallbackEnquiryId() {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `ST-ENQ-${year}-${random}`;
}

export async function POST(request: Request) {
  try {
    if (!verifyAllowedOrigin(request)) {
      return fail("Cross-origin request blocked.", 403);
    }

    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`enquiry_${clientIp}`, { limit: 10, windowMs: 10 * 60 * 1000 });
    if (!rateCheck.allowed) {
      return fail("Too many enquiry requests from this network. Please try again later.", 429);
    }

    const rawBody = await request.json();
    const body = schema.parse(rawBody);
    const session = await getSession().catch(() => null);
    
    let enquiryId = generateFallbackEnquiryId();

    // 1. Save in fallback persistent store
    try {
      fallbackStore.saveEnquiry({
        enquiryId,
        name: body.name,
        phone: body.phone,
        email: body.email || undefined,
        location: body.location || undefined,
        service: body.service,
        requirement: body.requirement || undefined,
        dimensions: body.dimensions || undefined,
        message: body.message || undefined,
        status: "NEW",
        customer: session?.id
      });
    } catch (saveErr) {
      console.warn("Fallback store save note:", saveErr);
    }

    // 2. Also save in MongoDB if online
    const db = await connectDB();
    if (db) {
      try {
        const enquiry = await Enquiry.create({
          ...body,
          customer: session?.role === "CUSTOMER" ? session.id : undefined,
          enquiryId
        });

        await ActivityLog.create({
          user: session?.id,
          action: "ENQUIRY_CREATED",
          entity: "Enquiry",
          entityId: String(enquiry._id),
          metadata: { enquiryId: enquiry.enquiryId }
        }).catch(() => null);

        await Notification.create({
          type: "NEW_ENQUIRY",
          title: "New enquiry",
          message: `${enquiry.enquiryId} for ${enquiry.service}`
        }).catch(() => null);
      } catch (dbErr) {
        console.warn("MongoDB async sync note:", dbErr);
      }
    }

    // 3. Dispatch email notification with await (Essential for Vercel serverless execution)
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #d92d20; border-radius: 8px;">
        <h2 style="color: #d92d20; margin-top: 0;">New Sparsh Trading Website Enquiry</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Reference ID:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiryId}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Customer Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${body.name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone Number:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="tel:${body.phone}">+91 ${body.phone}</a></td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Service Required:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${body.service}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Location / Area:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${body.location || "Not specified"}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Requirement Details:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${body.requirement || "None"}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Additional Message:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${body.message || "None"}</td></tr>
        </table>
        <p style="font-size: 0.85rem; color: #666; margin-top: 18px;">Submitted on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
      </div>
    `;

    let emailStatus = "pending";
    try {
      const emailResult = await sendOwnerEnquiryEmail(
        `New Website Enquiry: ${enquiryId} (${body.service}) - ${body.name}`,
        emailHtml,
        body
      );
      emailStatus = emailResult.success ? "sent" : "error";
    } catch (mailErr) {
      console.warn("Email dispatch note:", mailErr);
    }

    // 4. Dispatch automated WhatsApp notification
    let whatsappStatus = "pending";
    try {
      const waResult = await sendWhatsAppServerNotification({
        enquiryId,
        name: body.name,
        phone: body.phone,
        email: body.email,
        location: body.location,
        service: body.service,
        requirement: body.requirement,
        dimensions: body.dimensions,
        message: body.message
      });
      whatsappStatus = waResult.success ? waResult.provider : "error";
    } catch (waErr) {
      console.warn("WhatsApp server dispatch note:", waErr);
    }

    return ok({
      enquiryId,
      emailStatus,
      whatsappStatus,
      message: "Enquiry submitted successfully! Our team will contact you shortly."
    });

  } catch (error) {
    return handleError(error);
  }
}

export async function GET() {
  try {
    const session = await requireApiAuth(["SUPER_ADMIN", "ADMIN", "STAFF", "CUSTOMER"]);
    const isCustomer = session.role === "CUSTOMER";

    const db = await connectDB();
    if (db) {
      try {
        const query = isCustomer ? { customer: session.id } : {};
        const enquiries = await Enquiry.find(query).sort({ createdAt: -1 }).limit(100).lean();
        return ok({ enquiries });
      } catch {
        // Fallback to local store
      }
    }
    const enquiries = fallbackStore.getEnquiries(isCustomer ? session.id : undefined);
    return ok({ enquiries });
  } catch (error) {
    return handleError(error);
  }
}
