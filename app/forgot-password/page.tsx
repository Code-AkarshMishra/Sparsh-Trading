"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [login, setLogin] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);

  async function handleRequestCode(e: FormEvent) {
    e.preventDefault();
    if (!login.trim()) return;

    setLoading(true);
    setMessage({ text: "Generating single-use reset code...", type: "info" });

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: login.trim() })
      });
      const data = await res.json();

      setLoading(false);
      if (res.ok) {
        setMessage({
          text: data.message || "A 15-minute one-time code has been generated.",
          type: "success"
        });
        if (data.data?.devTokenHint) {
          setToken(data.data.devTokenHint);
        }
        setStep(2);
      } else {
        setMessage({ text: data.message || "Failed to process request. Please try again.", type: "error" });
      }
    } catch {
      setLoading(false);
      setMessage({ text: "Network error. Please check your connection.", type: "error" });
    }
  }

  async function handleResetPassword(e: FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return setMessage({ text: "Passwords do not match. Please verify.", type: "error" });
    }
    if (newPassword.length < 8) {
      return setMessage({ text: "Password must be at least 8 characters with letters & numbers.", type: "error" });
    }

    setLoading(true);
    setMessage({ text: "Verifying one-time code and securing password with bcrypt...", type: "info" });

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: login.trim(),
          token: token.trim(),
          newPassword
        })
      });
      const data = await res.json();

      setLoading(false);
      if (res.ok) {
        setMessage({
          text: "Password reset successful! Redirecting to login...",
          type: "success"
        });
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        setMessage({
          text: data.message || "Invalid or expired one-time code.",
          type: "error"
        });
      }
    } catch {
      setLoading(false);
      setMessage({ text: "Network connection error. Please try again.", type: "error" });
    }
  }

  return (
    <main className="wrap" style={{ padding: "clamp(32px, 6vw, 64px) 16px", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: 480, width: "100%" }}>
        <div
          className="form card"
          style={{
            border: "1.5px solid var(--border-strong)",
            borderTop: "4px solid var(--red-2)",
            padding: "32px 24px",
            borderRadius: 14,
            background: "var(--surface)",
            boxShadow: "var(--card-shadow)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span className="brand-dot-pulse" />
            <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 800 }}>
              One-Time Password Recovery
            </span>
          </div>

          <h1 className="display" style={{ fontSize: "1.6rem", margin: "4px 0 12px" }}>
            {step === 1 ? "Reset Your Password" : "Enter Verification Code"}
          </h1>

          <p className="muted" style={{ fontSize: "0.9rem", marginBottom: 20 }}>
            {step === 1
              ? "Enter your registered 10-digit mobile number or email address. We will generate a secure 15-minute one-time recovery code."
              : "Enter the single-use code sent to your account along with your new password."}
          </p>

          {step === 1 ? (
            <form onSubmit={handleRequestCode}>
              <label style={{ display: "block", marginBottom: 16 }}>
                <span style={{ fontSize: "0.9rem", fontWeight: 700, display: "block", marginBottom: 6 }}>
                  Registered Mobile Number or Email *
                </span>
                <input
                  type="text"
                  required
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder="e.g. 8795662161 or user@example.com"
                  autoFocus
                />
              </label>

              <button
                className="btn primary"
                type="submit"
                disabled={loading}
                style={{ width: "100%", padding: "12px", fontSize: "1rem", fontWeight: 800 }}
              >
                {loading ? "Generating Code..." : "Send One-Time Reset Code →"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword}>
              <label style={{ display: "block", marginBottom: 14 }}>
                <span style={{ fontSize: "0.9rem", fontWeight: 700, display: "block", marginBottom: 6 }}>
                  One-Time Reset Code (6-Digits) *
                </span>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="123456"
                  style={{ letterSpacing: "4px", fontSize: "1.2rem", fontWeight: 800, textAlign: "center" }}
                  autoFocus
                />
              </label>

              <label style={{ display: "block", marginBottom: 14 }}>
                <span style={{ fontSize: "0.9rem", fontWeight: 700, display: "block", marginBottom: 6 }}>
                  New Secure Password *
                </span>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters (letters & numbers)"
                />
              </label>

              <label style={{ display: "block", marginBottom: 18 }}>
                <span style={{ fontSize: "0.9rem", fontWeight: 700, display: "block", marginBottom: 6 }}>
                  Confirm New Password *
                </span>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                />
              </label>

              <button
                className="btn primary"
                type="submit"
                disabled={loading}
                style={{ width: "100%", padding: "12px", fontSize: "1rem", fontWeight: 800 }}
              >
                {loading ? "Updating Password..." : "Confirm & Reset Password 🔒"}
              </button>

              <div style={{ marginTop: 12, textAlign: "center" }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: "0.85rem", cursor: "pointer", textDecoration: "underline" }}
                >
                  ← Request a new reset code
                </button>
              </div>
            </form>
          )}

          {message && (
            <div
              role="status"
              style={{
                marginTop: 18,
                padding: "10px 14px",
                borderRadius: 8,
                background:
                  message.type === "success"
                    ? "rgba(34, 197, 94, 0.15)"
                    : message.type === "error"
                    ? "rgba(217, 45, 32, 0.15)"
                    : "rgba(59, 130, 246, 0.15)",
                color:
                  message.type === "success"
                    ? "#16a34a"
                    : message.type === "error"
                    ? "var(--red-2)"
                    : "#2563eb",
                fontWeight: 700,
                fontSize: "0.88rem"
              }}
            >
              {message.text}
            </div>
          )}

          <div
            style={{
              marginTop: 24,
              paddingTop: 16,
              borderTop: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "0.88rem"
            }}
          >
            <span className="muted">Remembered password?</span>
            <Link href="/login" style={{ color: "var(--red-2)", fontWeight: 700 }}>
              Return to Login →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
