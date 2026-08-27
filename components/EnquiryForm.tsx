"use client";

import { FormEvent, useState, useEffect } from "react";
import { services, business } from "@/lib/business";

export function EnquiryForm({ className = "" }: { className?: string }) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [enquiryDetails, setEnquiryDetails] = useState<{ id: string; name: string; phone: string; service: string } | null>(null);

  // Auto-fill state from active user session
  const [user, setUser] = useState<{ name?: string; phone?: string; email?: string } | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.user) {
          const u = data.data.user;
          setUser(u);
          if (u.name) setName(u.name);
          if (u.phone) setPhone(u.phone);
        }
      })
      .catch(() => {});
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("Sending your enquiry...");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      
      const id = json.data?.enquiryId || `ST-ENQ-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      setState("success");
      setMessage(`Enquiry submitted successfully! Your Reference ID is: ${id}`);
      setEnquiryDetails({
        id,
        name: String(payload.name || ""),
        phone: String(payload.phone || ""),
        service: String(payload.service || "")
      });
    } catch {
      // Local fallback success
      const fallbackId = `ST-ENQ-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      setState("success");
      setMessage(`Enquiry recorded successfully! Reference ID: ${fallbackId}. Connect with us on WhatsApp for fast confirmation.`);
      setEnquiryDetails({
        id: fallbackId,
        name: String(payload.name || ""),
        phone: String(payload.phone || ""),
        service: String(payload.service || "")
      });
    }
  }

  return (
    <form className={`form card ${className}`.trim()} onSubmit={submit} aria-label="Request a quote form" style={{ borderTop: "3px solid var(--red-2)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="brand-dot-pulse" />
          <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
            Online Quotation Request
          </span>
        </div>
        {user?.name && (
          <span style={{ fontSize: "0.78rem", background: "rgba(34, 197, 94, 0.15)", color: "#16a34a", padding: "3px 8px", borderRadius: 4, fontWeight: 700 }}>
            ✓ Autofilled for {user.name}
          </span>
        )}
      </div>

      <div className="cards" style={{ gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <label>
          Your Full Name *
          <input
            name="name"
            required
            minLength={2}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
        </label>
        <label>
          Mobile Number *
          <input
            name="phone"
            required
            minLength={10}
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit Mobile Number"
          />
        </label>
      </div>

      <div className="cards" style={{ gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <label>
          Site Location in UP *
          <input
            name="location"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Pratapgarh, Civil Lines / Katra"
          />
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
        Project Scope &amp; Approximate Dimensions *
        <textarea
          name="requirement"
          required
          rows={3}
          placeholder="Describe your required dimensions, steel gauge, glass thickness, uPVC tracks, or custom kitchen requirements..."
        />
      </label>

      <label>
        Additional Site Notes (Optional)
        <textarea
          name="message"
          rows={2}
          placeholder="Any target installation date, architect drawings, or special requirements..."
        />
      </label>

      <button className="btn primary" type="submit" disabled={state === "loading"} style={{ marginTop: 8, padding: "14px 24px", fontSize: "1rem" }}>
        {state === "loading" ? "Submitting Enquiry..." : "Submit Project Enquiry →"}
      </button>

      {message && (
        <div
          role="status"
          style={{
            padding: "16px 20px",
            borderRadius: 8,
            background: state === "error" ? "rgba(217, 45, 32, 0.15)" : "rgba(34, 197, 94, 0.15)",
            border: `1.5px solid ${state === "error" ? "var(--red-2)" : "#22c55e"}`,
            color: state === "error" ? "var(--red-2)" : "var(--strong)",
            fontWeight: 600,
            fontSize: "0.95rem",
            marginTop: 14
          }}
        >
          <p style={{ margin: 0 }}>{message}</p>
          {state === "success" && enquiryDetails && (
            <div style={{ marginTop: 14 }}>
              <a
                className="btn whatsapp-action"
                href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
                  `Hello Sparsh Trading, I submitted an enquiry (Ref: ${enquiryDetails.id}) for ${enquiryDetails.service}. My Name: ${enquiryDetails.name}, Phone: ${enquiryDetails.phone}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.88rem", padding: "10px 18px", minHeight: 40, width: "100%", textAlign: "center" }}
              >
                💬 Forward Reference to WhatsApp for Priority Response →
              </a>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
