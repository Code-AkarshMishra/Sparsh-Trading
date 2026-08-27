import { business } from "@/lib/business";

export type EnquiryNotificationPayload = {
  enquiryId: string;
  name: string;
  phone: string;
  email?: string;
  location?: string;
  service: string;
  requirement?: string;
  dimensions?: string;
  message?: string;
};

/**
 * Formats a clean, structured WhatsApp message for the lead
 */
export function formatEnquiryWhatsAppMessage(data: EnquiryNotificationPayload): string {
  const parts = [
    `*NEW PROJECT ENQUIRY — SPARSH TRADING*`,
    `──────────────────────────`,
    `Ref ID: ${data.enquiryId}`,
    `Client Name: ${data.name}`,
    `Contact: +91 ${data.phone}`,
    data.location ? `Site Location: ${data.location}` : null,
    `Service: ${data.service}`,
    data.requirement ? `Details: ${data.requirement}` : null,
    data.dimensions ? `Dimensions: ${data.dimensions}` : null,
    data.message ? `Notes: ${data.message}` : null,
    `──────────────────────────`,
    `Submitted from sparshtrading.shop`
  ].filter(Boolean);

  return parts.join("\n");
}

/**
 * Generates a direct click-to-chat WhatsApp URL with pre-filled enquiry text
 */
export function getWhatsAppEnquiryUrl(data: EnquiryNotificationPayload, phone?: string): string {
  const targetPhone = (phone || business.whatsapp).replace(/[^0-9]/g, "");
  const text = formatEnquiryWhatsAppMessage(data);
  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * Server-Side WhatsApp Dispatch Engine
 * Supports Meta Cloud API, UltraMsg, Twilio WhatsApp, and generic Webhook integrations
 */
export async function sendWhatsAppServerNotification(data: EnquiryNotificationPayload): Promise<{
  success: boolean;
  provider: "ultramsg" | "meta" | "twilio" | "webhook" | "disabled" | "error";
  message?: string;
}> {
  const ownerPhone = (process.env.WHATSAPP_ALERT_PHONE || business.whatsapp).replace(/[^0-9]/g, "");
  const text = formatEnquiryWhatsAppMessage(data);

  // 1. Generic Webhook (Pabbly / Make / Zapier / Wati / Interakt)
  const webhookUrl = process.env.WHATSAPP_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: ownerPhone,
          customerPhone: data.phone,
          customerName: data.name,
          messageText: text,
          ...data
        })
      });
      if (res.ok) {
        return { success: true, provider: "webhook" };
      }
    } catch (err: any) {
      console.warn("WhatsApp Webhook dispatch failed:", err.message);
    }
  }

  // 2. UltraMsg WhatsApp Gateway (Popular instant WhatsApp API in India)
  const ultraMsgInstance = process.env.ULTRAMSG_INSTANCE_ID;
  const ultraMsgToken = process.env.ULTRAMSG_TOKEN;
  if (ultraMsgInstance && ultraMsgToken) {
    try {
      const url = `https://api.ultramsg.com/${ultraMsgInstance}/messages/chat`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          token: ultraMsgToken,
          to: ownerPhone,
          body: text,
          priority: "10"
        })
      });
      const json = await res.json();
      if (json?.sent === "true" || json?.id) {
        return { success: true, provider: "ultramsg", message: json.id };
      }
    } catch (err: any) {
      console.warn("UltraMsg dispatch failed:", err.message);
    }
  }

  // 3. Meta Official WhatsApp Cloud API
  const metaToken = process.env.WHATSAPP_CLOUD_TOKEN;
  const metaPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (metaToken && metaPhoneId) {
    try {
      const url = `https://graph.facebook.com/v19.0/${metaPhoneId}/messages`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${metaToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: ownerPhone,
          type: "text",
          text: { body: text }
        })
      });
      const json = await res.json();
      if (json?.messages?.[0]?.id) {
        return { success: true, provider: "meta", message: json.messages[0].id };
      }
    } catch (err: any) {
      console.warn("Meta Cloud API dispatch failed:", err.message);
    }
  }

  return {
    success: true,
    provider: "disabled",
    message: "Server WhatsApp keys not set. Direct 1-click WhatsApp client dispatch is active."
  };
}

export function formatInternationalPhone(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, "");
  if (digits.length === 10) {
    return `91${digits}`;
  }
  return digits;
}

