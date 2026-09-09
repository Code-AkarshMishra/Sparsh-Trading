import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

export type EmailResult = {
  success: boolean;
  provider: "smtp" | "free-form" | "skipped" | "error";
  message?: string;
};

function getTransporter() {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, "") : undefined;
  if (!smtpUser || !smtpPass) return null;

  const port = Number(process.env.SMTP_PORT) || 587;
  // Port 465 uses SSL directly; port 587 uses STARTTLS (secure: false)
  const secure = process.env.SMTP_SECURE !== undefined ? process.env.SMTP_SECURE === "true" : port === 465;

  const transportConfig: SMTPTransport.Options = {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure,
    auth: {
      user: smtpUser,
      pass: smtpPass
    },
    tls: {
      rejectUnauthorized: false
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
  };

  return nodemailer.createTransport(transportConfig);
}

export async function sendPasswordResetEmail(
  targetEmail: string,
  resetToken: string,
  userName?: string
): Promise<EmailResult> {
  const smtpUser = process.env.SMTP_USER;
  const transporter = getTransporter();

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 28px; border: 1.5px solid #d92d20; border-radius: 12px; background: #ffffff;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h2 style="color: #b82117; margin: 0 0 6px 0; font-size: 1.6rem; letter-spacing: -0.5px;">Sparsh Trading</h2>
        <span style="font-size: 0.8rem; color: #6b7280; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px;">Password Reset Verification</span>
      </div>
      <p style="font-size: 1rem; color: #1f2937; margin: 0 0 12px 0;">Hello <strong>${userName || "Customer"}</strong>,</p>
      <p style="font-size: 0.95rem; color: #374151; line-height: 1.5; margin: 0 0 20px 0;">
        We received a request to reset the password for your Sparsh Trading account. Use the 6-digit one-time verification code below to verify your identity:
      </p>
      <div style="background: #fef2f2; border: 2px dashed #dc2626; padding: 18px; text-align: center; border-radius: 10px; margin: 20px 0;">
        <span style="font-size: 2.2rem; font-weight: 900; letter-spacing: 8px; color: #991b1b; font-family: Consolas, monospace;">${resetToken}</span>
      </div>
      <p style="font-size: 0.88rem; color: #4b5563; line-height: 1.4; margin: 16px 0;">
        ⏳ <strong>Notice:</strong> This verification code is valid for <strong>15 minutes</strong> and can only be used once. Never share this code with anyone.
      </p>
      <div style="font-size: 0.82rem; color: #9ca3af; margin-top: 24px; border-top: 1px solid #e5e7eb; padding-top: 16px; line-height: 1.4;">
        If you did not request this password reset, you can safely ignore this email. Your account password remains unchanged.
      </div>
    </div>
  `;

  if (transporter && smtpUser) {
    try {
      const info: any = await transporter.sendMail({
        to: targetEmail,
        from: process.env.SMTP_FROM || `"Sparsh Trading Security" <${smtpUser}>`,
        subject: `Sparsh Trading - Your Password Reset Code: ${resetToken}`,
        html
      });
      return { success: true, provider: "smtp", message: info?.messageId || "sent" };
    } catch (err: any) {
      console.error("Direct SMTP password reset delivery failed:", err.message);
      return { success: false, provider: "error", message: err.message };
    }
  }

  return { success: false, provider: "error", message: "SMTP credentials not configured" };
}

export async function sendOwnerEnquiryEmail(
  subject: string,
  html: string,
  rawData?: Record<string, any>
): Promise<EmailResult> {
  const targetEmail = process.env.OWNER_EMAIL || "mail.sparshtrading@gmail.com";
  const smtpUser = process.env.SMTP_USER;
  const transporter = getTransporter();

  // 1. Direct Gmail / SMTP
  if (transporter && smtpUser) {
    try {
      const info: any = await transporter.sendMail({
        to: targetEmail,
        from: process.env.SMTP_FROM || `"Sparsh Trading Enquiries" <${smtpUser}>`,
        subject,
        html
      });

      const messageId = info?.messageId || "sent";
      return { success: true, provider: "smtp", message: messageId };
    } catch (err: any) {
      console.warn("Direct SMTP attempt failed:", err.message);
    }
  }

  // 2. HTTPS API Fallback (Works on Serverless Platform if SMTP blocks)
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
