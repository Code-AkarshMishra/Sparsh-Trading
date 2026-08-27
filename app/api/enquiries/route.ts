import { z } from "zod";
import { connectDB } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { ok, handleError } from "@/lib/api";
import { Enquiry, ActivityLog, Notification } from "@/models/Core";
import { sendOwnerEnquiryEmail } from "@/lib/mail";
import { fallbackStore } from "@/lib/offlineStore";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email().optional().or(z.literal("")),
  location: z.string().optional(),
  service: z.string().min(2),
  requirement: z.string().optional(),
  dimensions: z.string().optional(),
  budgetRange: z.string().optional(),
  preferredContactMethod: z.string().optional(),
  message: z.string().optional(),
  uploads: z.array(z.object({ url: z.string(), name: z.string(), type: z.string(), size: z.number() })).optional()
});

function generateFallbackEnquiryId() {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `ST-ENQ-${year}-${random}`;
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const body = schema.parse(rawBody);
    const session = await getSession().catch(() => null);
    
    let enquiryId = generateFallbackEnquiryId();

    // 1. Always save in fallback persistent store
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

    // 3. Dispatch email notification in background without holding HTTP response
    const emailHtml = `
      <h2>New Sparsh Trading Website Enquiry</h2>
      <p><strong>Reference ID:</strong> ${enquiryId}</p>
      <p><strong>Customer Name:</strong> ${body.name}</p>
      <p><strong>Phone Number:</strong> ${body.phone}</p>
      <p><strong>Service:</strong> ${body.service}</p>
      <p><strong>Location:</strong> ${body.location || "Not specified"}</p>
      <p><strong>Requirement Details:</strong> ${body.requirement || "None"}</p>
      <p><strong>Additional Message:</strong> ${body.message || "None"}</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
    `;

    sendOwnerEnquiryEmail(
      `New Enquiry: ${enquiryId} (${body.service}) - ${body.name}`,
      emailHtml,
      body
    ).catch((mailErr) => console.warn("Email background dispatch:", mailErr));

    return ok({
      enquiryId,
      emailStatus: "dispatched",
      message: "Enquiry submitted successfully! Our team will contact you shortly."
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function GET() {
  try {
    const session = await getSession().catch(() => null);
    const db = await connectDB();
    if (db) {
      try {
        const query = session?.role === "CUSTOMER" ? { customer: session.id } : {};
        const enquiries = await Enquiry.find(query).sort({ createdAt: -1 }).limit(100).lean();
        return ok({ enquiries });
      } catch {
        // Fallback to local store
      }
    }
    const enquiries = fallbackStore.getEnquiries(session?.role === "CUSTOMER" ? session.id : undefined);
    return ok({ enquiries });
  } catch (error) {
    return handleError(error);
  }
}

