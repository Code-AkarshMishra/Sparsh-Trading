import nodemailer from "nodemailer";

export type EmailResult = {
  success: boolean;
  provider: "smtp" | "free-form" | "skipped" | "error";
  message?: string;
};

export async function sendOwnerEnquiryEmail(subject: string, html: string, rawData?: Record<string, any>): Promise<EmailResult> {
  const targetEmail = process.env.OWNER_EMAIL || "mail.sparshtrading@gmail.com";

  // 1. Direct SMTP (if configured with Gmail or custom mail server)
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      });
      await transporter.sendMail({
        to: targetEmail,
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        subject,
        html
      });
      return { success: true, provider: "smtp" };
    } catch (err: any) {
      console.warn("SMTP email attempt failed:", err.message);
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
