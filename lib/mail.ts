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

  // 1. Direct Gmail / SMTP
  if (smtpUser && smtpPass) {
    try {
      const isGmail = (process.env.SMTP_HOST || "smtp.gmail.com").includes("gmail") || smtpUser.includes("@gmail.com");
      const port = Number(process.env.SMTP_PORT || (isGmail ? 465 : 587));
      const secure = port === 465;
      
      const transportConfig: SMTPTransport.Options = isGmail
        ? {
            service: "gmail",
            auth: {
              user: smtpUser,
              pass: smtpPass
            },
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 10000
          }
        : {
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port,
            secure,
            auth: {
              user: smtpUser,
              pass: smtpPass
            },
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 10000
          };

      const transporter = nodemailer.createTransport(transportConfig);

      await transporter.sendMail({
        to: targetEmail,
        from: process.env.SMTP_FROM || `"Sparsh Trading" <${smtpUser}>`,
        subject,
        html
      });
      return { success: true, provider: "smtp" };
    } catch (err: any) {
      console.warn("Direct SMTP attempt failed:", err.message);
    }
  }


  // 2. Free FormSubmit endpoint fallback
  try {
    const endpoint = process.env.FREE_FORM_ENDPOINT || `https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`;
    const plainMessage = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: subject,
        _template: "table",
        name: rawData?.name || "Sparsh Customer",
        phone: rawData?.phone || "N/A",
        service: rawData?.service || "General Inquiry",
        message: rawData?.requirement || rawData?.message || plainMessage,
        details: plainMessage
      })
    });

    if (response.ok) {
      return { success: true, provider: "free-form" };
    }
  } catch (err: any) {
    console.warn("FormSubmit endpoint email failed:", err.message);
  }

  return { success: false, provider: "error", message: "Email delivery pending configuration" };
}
