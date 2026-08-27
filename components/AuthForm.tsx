"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AuthFormProps {
  mode: "login" | "register";
  portal?: "customer" | "admin";
}

export function AuthForm({ mode, portal = "customer" }: AuthFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("Verifying credentials...");
    
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    payload.portal = portal;

    try {
      const endpoint = mode === "register" ? "/api/auth/register" : "/api/auth/login";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      
      if (!res.ok) {
        setLoading(false);
        return setMessage(json.message || "Invalid credentials. Please verify your details.");
      }
      
      const role = json.data?.user?.role;
      const targetUrl = json.data?.redirectTo || (role === "CUSTOMER" ? "/dashboard" : "/admin");
      
      setMessage("Authenticated successfully! Redirecting securely...");
      setTimeout(() => {
        router.push(targetUrl);
        router.refresh();
      }, 400);
    } catch {
      setLoading(false);
      setMessage("Network connection issue. Please try again.");
    }
  }

  const isAdmin = portal === "admin";

  return (
    <form
      className="form card"
      onSubmit={submit}
      style={{
        border: "1.5px solid var(--border-strong)",
        borderTop: `4px solid ${isAdmin ? "#b82117" : "var(--red-2)"}`,
        padding: "28px 24px",
        borderRadius: 14,
        background: "var(--surface)",
        boxShadow: "var(--card-shadow)"
      }}
    >
      {/* Invisible Anti-Bot Honeypot Trap Field */}
      <div style={{ display: "none", visibility: "hidden", height: 0, overflow: "hidden" }} aria-hidden="true">
        <input
          name="honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          placeholder="Leave this empty"
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span className="brand-dot-pulse" style={{ background: isAdmin ? "#b82117" : "var(--red-2)" }} />
        <span
          className="eyebrow"
          style={{
            color: isAdmin ? "#b82117" : "var(--red-2)",
            margin: 0,
            fontWeight: 800,
            letterSpacing: "0.08em"
          }}
        >
          {isAdmin
            ? "🔒 Restricted Admin Portal"
            : mode === "login"
            ? "Client Account Access"
            : "Customer Registration"}
        </span>
      </div>

      {mode === "register" && (
        <label style={{ display: "block", marginBottom: 14 }}>
          <span style={{ fontSize: "0.9rem", fontWeight: 700, display: "block", marginBottom: 6 }}>Full Name *</span>
          <input name="name" required minLength={2} placeholder="e.g. Rahul Sharma" />
        </label>
      )}

      {mode === "login" ? (
        <label style={{ display: "block", marginBottom: 14 }}>
          <span style={{ fontSize: "0.9rem", fontWeight: 700, display: "block", marginBottom: 6 }}>
            {isAdmin ? "Admin Username or Registered Email *" : "10-Digit Mobile Number or Email *"}
          </span>
          <input
            name="login"
            required
            autoComplete="username"
            placeholder={isAdmin ? "Enter admin login username or email" : "Enter mobile number or email"}
          />
        </label>
      ) : (
        <>
          <label style={{ display: "block", marginBottom: 14 }}>
            <span style={{ fontSize: "0.9rem", fontWeight: 700, display: "block", marginBottom: 6 }}>10-Digit Mobile Number *</span>
            <input name="phone" required type="tel" minLength={10} placeholder="e.g. 9876543210" />
          </label>
          <label style={{ display: "block", marginBottom: 14 }}>
            <span style={{ fontSize: "0.9rem", fontWeight: 700, display: "block", marginBottom: 6 }}>Email Address (Optional)</span>
            <input name="email" type="email" placeholder="name@example.com" />
          </label>
          <label style={{ display: "block", marginBottom: 14 }}>
            <span style={{ fontSize: "0.9rem", fontWeight: 700, display: "block", marginBottom: 6 }}>Site / Delivery Location in UP</span>
            <textarea name="address" rows={2} placeholder="e.g. Civil Lines, Pratapgarh" />
          </label>
        </>
      )}

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: "0.9rem", fontWeight: 700 }}>
            {isAdmin ? "Administrative Password *" : "Account Password *"}
          </span>
          {mode === "login" && (
            <Link
              href="/forgot-password"
              style={{
                fontSize: "0.82rem",
                color: "var(--red-2)",
                fontWeight: 700,
                textDecoration: "none"
              }}
            >
              Forgot Password?
            </Link>
          )}
        </div>
        <input
          name="password"
          type="password"
          minLength={6}
          required
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          placeholder="••••••••••••"
        />
      </div>

      <button
        className="btn primary"
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px 24px",
          fontSize: "1rem",
          fontWeight: 800,
          background: isAdmin ? "linear-gradient(90deg, #991b1b, #dc2626)" : undefined,
          borderColor: isAdmin ? "#991b1b" : undefined
        }}
      >
        {loading
          ? "Authenticating..."
          : isAdmin
          ? "Enter Management Console →"
          : mode === "login"
          ? "Login to Customer Portal →"
          : "Create Customer Account →"}
      </button>

      {message && (
        <div
          role="status"
          style={{
            marginTop: 14,
            padding: "10px 14px",
            borderRadius: 8,
            background: message.includes("success") ? "rgba(34, 197, 94, 0.15)" : "rgba(217, 45, 32, 0.15)",
            color: message.includes("success") ? "#16a34a" : "var(--red-2)",
            fontWeight: 700,
            fontSize: "0.88rem"
          }}
        >
          {message}
        </div>
      )}

      {/* Cross-Link Gateways */}
      <div
        style={{
          marginTop: 20,
          paddingTop: 16,
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
          fontSize: "0.85rem"
        }}
      >
        {isAdmin ? (
          <>
            <span className="muted">Looking for client orders?</span>
            <Link href="/login" style={{ color: "var(--red-2)", fontWeight: 700 }}>
              Client Portal →
            </Link>
          </>
        ) : mode === "login" ? (
          <>
            <Link href="/register" style={{ color: "var(--red-2)", fontWeight: 700 }}>
              Create Account →
            </Link>
            <Link href="/admin-login" className="muted" style={{ fontSize: "0.8rem", textDecoration: "underline" }}>
              Staff Login
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
