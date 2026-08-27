import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

export type EmailResult = {
  success: boolean;
  provider: "smtp" | "free-form" | "skipped" | "error";
  message?: string;
};

export async function sendOwnerEnquiryEmail(
  subject: string,
  html: string,
  rawData?: Record<string, any>
): Promise<EmailResult> {
  const targetEmail = process.env.OWNER_EMAIL || "mail.sparshtrading@gmail.com";
  const smtpUser = process.env.SMTP_USER || "mail.sparshtrading@gmail.com";
  const smtpPass = (process.env.SMTP_PASS || "ehyvkwhduxvyjzng").replace(/\s+/g, "");

  // 1. Direct Gmail SMTP via Port 465 (SSL)
  if (smtpUser && smtpPass) {
    try {
      const transportConfig: SMTPTransport.Options = {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: smtpUser,
          pass: smtpPass
        },
        tls: {
          rejectUnauthorized: false
        },
        connectionTimeout: 8000,
        greetingTimeout: 8000,
        socketTimeout: 8000
      };

      const transporter = nodemailer.createTransport(transportConfig);

      const info: any = await transporter.sendMail({
        to: targetEmail,
        from: `"Sparsh Trading Enquiries" <${smtpUser}>`,
        subject,
        html
      });


      const messageId = info?.messageId || "sent";
      console.log("Email sent successfully via Gmail SMTP:", messageId);
      return { success: true, provider: "smtp", message: messageId };
    } catch (err: any) {
      console.warn("Direct SMTP attempt failed on cloud runtime:", err.message);
    }

  }

  // 2. HTTPS API Fallback (Works 100% on any Serverless Platform without SMTP blocks)
  try {
    const plainMessage = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        _subject: subject,
        _template: "table",
        _captcha: "false",
        name: rawData?.name || "Sparsh Trading Customer",
        phone: rawData?.phone || "N/A",
        service: rawData?.service || "Fabrication Enquiry",
        location: rawData?.location || "Not specified",
        requirement: rawData?.requirement || rawData?.message || plainMessage,
        full_details: plainMessage
      })
    });

    if (response.ok) {
      console.log("Email delivered successfully via HTTPS Cloud Fallback");
      return { success: true, provider: "free-form" };
    }
  } catch (err: any) {
    console.warn("HTTPS API fallback error:", err.message);
  }

  return { success: false, provider: "error", message: "Email delivery failed across all gateways" };
}
