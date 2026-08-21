"use client";

import { FormEvent, useState } from "react";
import { services, business } from "@/lib/business";

export function EnquiryForm() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [enquiryDetails, setEnquiryDetails] = useState<{ id: string; name: string; phone: string; service: string } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (res.ok) {
        const id = json.data?.enquiryId || `ST-${Date.now().toString().slice(-6)}`;
        setState("success");
        setMessage(`Enquiry submitted successfully! Reference ID: ${id}`);
        setEnquiryDetails({
          id,
          name: String(payload.name || ""),
          phone: String(payload.phone || ""),
          service: String(payload.service || "")
        });
        event.currentTarget.reset();
      } else {
        setState("error");
        setMessage(json.message || "Unable to process online. Please call or WhatsApp us directly.");
      }
    } catch {
      setState("error");
      setMessage("Network connection issue. Please connect with us directly via WhatsApp or phone.");
    }
  }

  return (
    <form className="form card" onSubmit={submit} aria-label="Request a quote form">
      <div className="cards" style={{ gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <label>
          Your Name *
          <input name="name" required minLength={2} placeholder="Full Name" />
        </label>
        <label>
          Mobile Number *
          <input name="phone" required minLength={10} inputMode="tel" placeholder="10-digit Mobile" />
        </label>
      </div>

      <div className="cards" style={{ gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <label>
          Site Location
          <input name="location" placeholder="e.g. Pratapgarh, Civil Lines" />
        </label>
        <label>
          Service Required *
          <select name="service" required defaultValue="">
            <option value="" disabled>Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>{s.title}</option>
            ))}
            <option value="Custom Metal Work">Custom Metal Work / Other</option>
          </select>
        </label>
      </div>

      <label>
        Project Requirement *
        <textarea
          name="requirement"
          required
          placeholder="Describe dimensions, quantity, steel/uPVC grade, or custom requirements..."
        />
      </label>

      <label>
        Additional Reference / Site Notes (Optional)
        <textarea
          name="message"
          placeholder="Any specific architectural drawings, site constraints, or target completion dates..."
          style={{ minHeight: 70 }}
        />
      </label>

      <button className="btn primary" type="submit" disabled={state === "loading"} style={{ marginTop: 6 }}>
        {state === "loading" ? "Submitting enquiry..." : "Submit Enquiry & Request Quote"}
      </button>

      {message && (
        <div
          role="status"
          style={{
            padding: "14px 18px",
            borderRadius: 8,
            background: state === "error" ? "rgba(217, 45, 32, 0.1)" : "rgba(34, 197, 94, 0.12)",
            border: `1.5px solid ${state === "error" ? "var(--red-2)" : "#22c55e"}`,
            color: state === "error" ? "var(--red-2)" : "var(--strong)",
            fontWeight: 600,
            fontSize: "0.94rem",
            marginTop: 10
          }}
        >
          <p style={{ margin: 0 }}>{message}</p>
          {state === "success" && enquiryDetails && (
            <div style={{ marginTop: 12 }}>
              <a
                className="btn"
                href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
                  `Hello Sparsh Trading, I submitted an enquiry (Ref: ${enquiryDetails.id}) for ${enquiryDetails.service}. My Name: ${enquiryDetails.name}, Phone: ${enquiryDetails.phone}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.85rem", padding: "8px 14px", minHeight: 38 }}
              >
                💬 Send on WhatsApp as well &rarr;
              </a>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
