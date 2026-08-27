import { business } from "@/lib/business";
import { formatInternationalPhone } from "@/lib/whatsapp";

export type OrderStage = "ENQUIRY" | "MEASUREMENT" | "DRAWING_3D" | "FABRICATION" | "POWDER_COATING" | "OUT_FOR_INSTALLATION" | "COMPLETED";

export const STAGE_MESSAGES: Record<string, { label: string; desc: string }> = {
  ENQUIRY: {
    label: "Enquiry Registered",
    desc: "Your requirements are logged. Our technical team is reviewing your project details."
  },
  MEASUREMENT: {
    label: "On-Site Laser Measurement Done",
    desc: "Site measurements completed. Your custom CAD drawings are being generated."
  },
  DRAWING_3D: {
    label: "3D CAD & Cutting Blueprint Approved",
    desc: "Design and material specs locked. Metal sheets and sections allocated for cutting."
  },
  FABRICATION: {
    label: "Under Precision Workshop Fabrication",
    desc: "Your job is on the workshop floor — hydraulic bending, TIG/MIG welding, and assembly underway."
  },
  POWDER_COATING: {
    label: "Anti-Rust Primer & Surface Finishing",
    desc: "Zinc chromate anti-rust primer applied and electrostatic finish curing in the baking booth."
  },
  OUT_FOR_INSTALLATION: {
    label: "Dispatched & Fitting Team On The Way",
    desc: "Fabricated units dispatched from our Meera Bhawan workshop. Installation team is arriving at your site."
  },
  COMPLETED: {
    label: "Handed Over & Verified",
    desc: "Installation, locking alignment, and quality inspection completed successfully."
  }
};

export function formatOrderStatusWhatsAppMessage(params: {
  customerName: string;
  orderId: string;
  service: string;
  status: string;
  expectedDate?: string;
  notes?: string;
}): string {
  const stageInfo = STAGE_MESSAGES[params.status] || {
    label: params.status.replaceAll("_", " "),
    desc: "Your custom fabrication order is making progress."
  };

  const partnerPhone = business.phones[0];

  return `*SPARSH TRADING • Live Order Tracking Update* 🏗️

Dear *${params.customerName || "Customer"}*,
Here is the latest live production update for your custom order:

📋 *Order ID:* ${params.orderId}
🛠️ *Item/Service:* ${params.service || "Custom Metal / uPVC Fabrication"}
📍 *Current Stage:* *${stageInfo.label}*
ℹ️ *Status Note:* ${stageInfo.desc}
${params.notes ? `📝 *Workshop Update:* ${params.notes}\n` : ""}${params.expectedDate ? `📅 *Target Completion:* ${params.expectedDate}\n` : ""}
🔗 *Track in Customer Portal:*
https://sparshtrading.shop/dashboard/orders

For any queries, our workshop partners are directly available:
📞 *Co-Founder (Ankush Mishra):* +91 ${partnerPhone}
🏢 *Workshop:* Meera Bhawan Chauraha, Pratapgarh (UP)

_Thank you for choosing Sparsh Trading!_`;
}

export function getOrderStatusWhatsAppUrl(params: {
  customerPhone: string;
  customerName: string;
  orderId: string;
  service: string;
  status: string;
  expectedDate?: string;
  notes?: string;
}): string {
  const cleanPhone = formatInternationalPhone(params.customerPhone);
  const text = formatOrderStatusWhatsAppMessage(params);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
