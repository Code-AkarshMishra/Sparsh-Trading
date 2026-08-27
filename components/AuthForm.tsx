"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("Processing authentication, please wait...");
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (!res.ok) {
        setLoading(false);
        return setMessage(json.message || "Invalid credentials or user already exists.");
      }
      
      const role = json.data?.user?.role;
      setMessage("Authenticated successfully! Redirecting...");
      setTimeout(() => {
        if (role === "CUSTOMER") {
          router.push("/dashboard");
        } else {
          router.push("/admin");
        }
        router.refresh();
      }, 500);
    } catch {
      setLoading(false);
      setMessage("Connection issue. Please verify credentials or try again.");
    }
  }

  return (
    <form className="form card" onSubmit={submit} style={{ borderTop: "3px solid var(--red-2)", padding: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span className="brand-dot-pulse" />
        <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
          {mode === "login" ? "Account Access" : "Customer Registration"}
        </span>
      </div>

      {mode === "register" && (
        <label>
          Full Name *
          <input name="name" required minLength={2} placeholder="e.g. Rahul Sharma" />
        </label>
      )}

      {mode === "login" ? (
        <label>
          Phone Number or Email *
          <input name="login" required placeholder="Enter 10-digit mobile or email address" />
        </label>
      ) : (
        <>
          <label>
            10-Digit Mobile Number *
            <input name="phone" required type="tel" minLength={10} placeholder="e.g. 9876543210" />
          </label>
          <label>
            Email Address (Optional)
            <input name="email" type="email" placeholder="name@example.com" />
          </label>
          <label>
            Site / Delivery Address in UP
            <textarea name="address" rows={2} placeholder="e.g. Civil Lines, Pratapgarh / Ashtbhuja Nagar" />
          </label>
        </>
      )}

      <label>
        Password *
        <input
          name="password"
          type="password"
          minLength={8}
          required
          placeholder="Minimum 8 characters"
        />
      </label>

      <button className="btn primary" type="submit" disabled={loading} style={{ marginTop: 12, padding: "12px 24px", fontSize: "1rem" }}>
        {loading ? "Processing..." : mode === "login" ? "Login to Account →" : "Create Customer Account →"}
      </button>

      {message && (
        <div
          role="status"
          style={{
            marginTop: 14,
            padding: "10px 14px",
            borderRadius: 6,
            background: message.includes("success") ? "rgba(34, 197, 94, 0.15)" : "rgba(217, 45, 32, 0.15)",
            color: message.includes("success") ? "#16a34a" : "var(--red-2)",
            fontWeight: 600,
            fontSize: "0.9rem"
          }}
        >
          {message}
        </div>
      )}

      <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", fontSize: "0.88rem" }}>
        {mode === "login" ? (
          <>
            <span className="muted">Don't have an account?</span>
            <Link href="/register" style={{ color: "var(--red-2)", fontWeight: 700 }}>
              Register Here →
            </Link>
          </>
        ) : (
          <>
            <span className="muted">Already registered?</span>
            <Link href="/login" style={{ color: "var(--red-2)", fontWeight: 700 }}>
              Login Here →
            </Link>
          </>
        )}
      </div>
    </form>
  );
}

