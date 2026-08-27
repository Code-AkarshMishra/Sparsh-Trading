"use client";

import { useState, FormEvent } from "react";

export function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return setMessage({ text: "New passwords do not match.", type: "error" });
    }
    if (newPassword.length < 8) {
      return setMessage({ text: "Password must be at least 8 characters with letters & numbers.", type: "error" });
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const json = await res.json();

      setLoading(false);
      if (res.ok) {
        setMessage({ text: "Password updated and securely re-hashed with bcrypt!", type: "success" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({ text: json.message || "Failed to update password.", type: "error" });
      }
    } catch {
      setLoading(false);
      setMessage({ text: "Network error. Please try again.", type: "error" });
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <label style={{ display: "block" }}>
        <span style={{ fontSize: "0.85rem", fontWeight: 700, display: "block", marginBottom: 4 }}>Current Password *</span>
        <input
          type="password"
          required
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="••••••••••••"
          style={{ width: "100%" }}
        />
      </label>

      <label style={{ display: "block" }}>
        <span style={{ fontSize: "0.85rem", fontWeight: 700, display: "block", marginBottom: 4 }}>New Password *</span>
        <input
          type="password"
          required
          minLength={8}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Min 8 characters"
          style={{ width: "100%" }}
        />
      </label>

      <label style={{ display: "block" }}>
        <span style={{ fontSize: "0.85rem", fontWeight: 700, display: "block", marginBottom: 4 }}>Confirm New Password *</span>
        <input
          type="password"
          required
          minLength={8}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          style={{ width: "100%" }}
        />
      </label>

      <button
        className="btn primary"
        type="submit"
        disabled={loading}
        style={{ padding: "10px 16px", fontSize: "0.9rem", fontWeight: 800, marginTop: 4 }}
      >
        {loading ? "Updating..." : "Update Account Password 🔒"}
      </button>

      {message && (
        <div
          role="status"
          style={{
            padding: "8px 12px",
            borderRadius: 6,
            fontSize: "0.85rem",
            fontWeight: 700,
            background: message.type === "success" ? "rgba(34, 197, 94, 0.15)" : "rgba(217, 45, 32, 0.15)",
            color: message.type === "success" ? "#16a34a" : "var(--red-2)"
          }}
        >
          {message.text}
        </div>
      )}
    </form>
  );
}
