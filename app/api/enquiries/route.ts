import { z } from "zod";
import { connectDB } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { ok, handleError } from "@/lib/api";
import { Enquiry, ActivityLog, Notification } from "@/models/Core";
import { sendOwnerEnquiryEmail } from "@/lib/mail";

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
    const db = await connectDB();

    if (db) {
      try {
        const year = new Date().getFullYear();
        const count = await Enquiry.countDocuments({ createdAt: { $gte: new Date(`${year}-01-01`) } });
        enquiryId = `ST-ENQ-${year}-${String(count + 1).padStart(6, "0")}`;

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
        console.warn("DB save encountered error, continuing with email delivery:", dbErr);
      }
    }

    // Send owner notification email to mail.sparshtrading@gmail.com
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

    const emailResult = await sendOwnerEnquiryEmail(
      `New Enquiry: ${enquiryId} (${body.service}) - ${body.name}`,
      emailHtml,
      body
    );

    return ok({
      enquiryId,
      emailStatus: emailResult.success ? "sent" : "fallback",
      message: "Enquiry processed successfully."
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function GET() {
  try {
    const db = await connectDB();
    if (!db) {
      return ok({ enquiries: [] });
    }
    const session = await getSession().catch(() => null);
    const query = session?.role === "CUSTOMER" ? { customer: session.id } : {};
    const enquiries = await Enquiry.find(query).sort({ createdAt: -1 }).limit(100).lean();
    return ok({ enquiries });
  } catch (error) {
    return handleError(error);
  }
}
