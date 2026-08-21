"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("Authenticating, please wait...");
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
        return setMessage(json.message || "Something went wrong.");
      }
      router.push(json.data.user.role === "CUSTOMER" ? "/dashboard" : "/admin");
    } catch {
      setLoading(false);
      setMessage("Connection error. Please try again.");
    }
  }

  return (
    <form className="form card" onSubmit={submit}>
      {mode === "register" && (
        <label>
          Full Name
          <input name="name" required placeholder="e.g. Rahul Sharma" />
        </label>
      )}

      {mode === "login" ? (
        <label>
          Email or Phone Number
          <input name="login" required placeholder="Enter your registered email or phone" />
        </label>
      ) : (
        <>
          <label>
            Phone Number
            <input name="phone" required type="tel" placeholder="10-digit mobile number" />
          </label>
          <label>
            Email Address (optional)
            <input name="email" type="email" placeholder="name@example.com" />
          </label>
          <label>
            Project / Site Address
            <textarea name="address" placeholder="Enter delivery or project address in Pratapgarh / UP" />
          </label>
        </>
      )}

      <label>
        Password
        <input
          name="password"
          type="password"
          minLength={8}
          required
          placeholder="Minimum 8 characters"
        />
      </label>

      <button className="btn primary" type="submit" disabled={loading} style={{ marginTop: 8 }}>
        {loading ? "Processing..." : mode === "login" ? "Login to Account" : "Create Account"}
      </button>

      {message && (
        <p role="status" className={message.includes("error") || message.includes("wrong") ? "muted" : "eyebrow"} style={{ marginTop: 12 }}>
          {message}
        </p>
      )}
    </form>
  );
}
