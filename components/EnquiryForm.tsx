"use client";

import { FormEvent, useState, useEffect } from "react";
import { services, business } from "@/lib/business";
import { WhatsAppIcon, ArrowRightIcon } from "@/components/Icons";
import { formatEnquiryWhatsAppMessage, getWhatsAppEnquiryUrl } from "@/lib/whatsapp";

export function EnquiryForm({ className = "" }: { className?: string }) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [enquiryDetails, setEnquiryDetails] = useState<{
    enquiryId: string;
    name: string;
    phone: string;
    location?: string;
    service: string;
    requirement?: string;
    message?: string;
  } | null>(null);

  // Auto-fill state from active user session
  const [user, setUser] = useState<{ name?: string; phone?: string; email?: string } | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [requirement, setRequirement] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [autoOpenWhatsApp, setAutoOpenWhatsApp] = useState(true);

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

  async function submitForm(openWhatsAppNow: boolean) {
    setState("loading");
    setMessage("Processing your enquiry...");

    const payload = {
      name,
      phone,
      location,
      service: service || "Custom Metal Work",
      requirement,
      message: additionalNotes
    };

    let id = `ST-ENQ-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json?.data?.enquiryId) {
        id = json.data.enquiryId;
      }
    } catch {
      // Local fallback
    }

    const details = {
      enquiryId: id,
      ...payload
    };

    setEnquiryDetails(details);
    setState("success");
    setMessage(`Enquiry recorded! Reference ID: ${id}.`);

    if (openWhatsAppNow) {
      const waUrl = getWhatsAppEnquiryUrl(details);
      if (typeof window !== "undefined") {
        window.open(waUrl, "_blank", "noopener,noreferrer");
      }
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submitForm(autoOpenWhatsApp);
  }

  function handleDirectWhatsAppClick() {
    if (!name.trim() || !phone.trim()) {
      setState("error");
      setMessage("Please enter your Name and Mobile Number first.");
      return;
    }
    submitForm(true);
  }

  return (
    <form className={`form card ${className}`.trim()} onSubmit={handleSubmit} aria-label="Request a quote form" style={{ borderTop: "3px solid var(--red-2)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="brand-dot-pulse" />
          <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
            Online Quotation &amp; WhatsApp Request
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
          <select name="service" required value={service} onChange={(e) => setService(e.target.value)}>
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
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          placeholder="Describe your required dimensions, steel gauge, glass thickness, uPVC tracks, or custom kitchen requirements..."
        />
      </label>

      <label>
        Additional Site Notes (Optional)
        <textarea
          name="message"
          rows={2}
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          placeholder="Any target installation date, architect drawings, or special requirements..."
        />
      </label>

      {/* WhatsApp Automation Option */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "4px 0 10px", fontSize: "0.88rem", color: "var(--text)" }}>
        <input
          type="checkbox"
          id="wa-auto-check"
          checked={autoOpenWhatsApp}
          onChange={(e) => setAutoOpenWhatsApp(e.target.checked)}
          style={{ width: 16, height: 16, cursor: "pointer", accentColor: "#16803c" }}
        />
        <label htmlFor="wa-auto-check" style={{ cursor: "pointer", margin: 0, fontWeight: 500 }}>
          Also send a copy directly to Sparsh Trading on WhatsApp for priority response
        </label>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 }}>
        <button
          className="btn primary"
          type="submit"
          disabled={state === "loading"}
          style={{ flex: "1 1 200px", padding: "12px 20px", fontSize: "0.95rem", borderRadius: 8 }}
        >
          {state === "loading" ? "Submitting..." : "Submit Project Enquiry"}
          <ArrowRightIcon width={14} height={14} />
        </button>

        <button
          type="button"
          onClick={handleDirectWhatsAppClick}
          disabled={state === "loading"}
          className="btn whatsapp-action"
          style={{ padding: "12px 18px", fontSize: "0.92rem", borderRadius: 8, display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          <WhatsAppIcon width={16} height={16} />
          Send on WhatsApp
        </button>
      </div>

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
            <div style={{ marginTop: 12 }}>
              <a
                className="btn whatsapp-action"
                href={getWhatsAppEnquiryUrl(enquiryDetails)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.88rem", padding: "10px 18px", minHeight: 40, width: "100%", textAlign: "center", borderRadius: 6, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}
              >
                <WhatsAppIcon width={16} height={16} />
                Open Pre-Filled WhatsApp Chat with Partner
              </a>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
