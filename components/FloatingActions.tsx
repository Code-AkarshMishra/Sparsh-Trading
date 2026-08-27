"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { business } from "@/lib/business";

export function FloatingActions() {
  const [expanded, setExpanded] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);

  useEffect(() => {
    // Show polite greeting bubble after 3 seconds on side
    const t = setTimeout(() => {
      setBubbleVisible(true);
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  const call = `tel:${business.phones[0]}`;
  const wa = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
    "Hello Sparsh Trading, I want to inquire about custom metal fabrication / uPVC windows / modular kitchen services."
  )}`;

  return (
    <aside className="bottom-right-popup" aria-label="Sparsh Assistant Chatbot Widget">
      {/* Friendly Chatbot Bubble (auto appears at side, non-intrusive) */}
      {!expanded && bubbleVisible && (
        <div className="chatbot-greeting-bubble" onClick={() => setExpanded(true)}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span className="brand-dot-pulse" />
              <strong style={{ fontSize: "0.82rem", color: "var(--red-2)" }}>Sparsh Assistant</strong>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setBubbleVisible(false);
              }}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--muted)",
                fontSize: "0.8rem",
                cursor: "pointer",
                padding: 0
              }}
              aria-label="Dismiss message"
            >
              ✕
            </button>
          </div>
          <p style={{ margin: "6px 0 0", fontSize: "0.86rem", lineHeight: 1.4, color: "var(--strong)" }}>
            👋 Need an instant quote or site survey in Pratapgarh? Click to chat!
          </p>
        </div>
      )}

      {/* Expanded Chatbot Window */}
      {expanded && (
        <div className="popup-card chatbot-window card" role="dialog" aria-modal="false">
          <div className="popup-header" style={{ background: "linear-gradient(135deg, #d92d20 0%, #b82117 100%)", color: "#ffffff", padding: "14px 16px", borderRadius: "10px 10px 0 0", margin: "-20px -20px 14px" }}>
            <div className="popup-brand">
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", color: "#d92d20", fontWeight: 900, fontSize: "1rem" }}>
                ST
              </div>
              <div>
                <strong style={{ color: "#ffffff", fontSize: "0.95rem" }}>Sparsh Quick Assistant</strong>
                <span style={{ display: "block", fontSize: "0.72rem", color: "rgba(255,255,255,0.85)" }}>
                  Online • Pratapgarh, UP
                </span>
              </div>
            </div>
            <button
              className="popup-close-btn"
              type="button"
              onClick={() => setExpanded(false)}
              aria-label="Close chat"
              style={{ color: "#ffffff" }}
            >
              ✕
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "var(--surface-2)", padding: "10px 14px", borderRadius: 8, fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text)" }}>
              Welcome to <strong>Sparsh Trading</strong>! How can we assist with your fabrication or interior project today?
            </div>

            <div className="popup-actions" style={{ marginTop: 6 }}>
              <a className="btn whatsapp-action popup-btn" href={wa} target="_blank" rel="noopener noreferrer">
                💬 Chat on WhatsApp Directly
              </a>
              <a className="btn primary popup-btn" href={call}>
                📞 Call Managing Partner (+91 {business.phones[0]})
              </a>
              <Link className="btn popup-btn" href="/contact" onClick={() => setExpanded(false)}>
                📋 Request Free Site Measurement →
              </Link>

              <a className="btn popup-btn" href={business.workshopMapUrl} target="_blank" rel="noopener noreferrer">
                📍 Locate Workshop on Google Maps
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Launcher Button */}
      <div className="floating-launcher-container">
        <button
          className={`floating-launcher-btn ${expanded ? "active" : ""}`}
          type="button"
          onClick={() => {
            setExpanded(!expanded);
            if (!expanded) setBubbleVisible(false);
          }}
          aria-label={expanded ? "Close assistant" : "Open assistant"}
          title="Sparsh Trading Chatbot"
          style={{ width: expanded ? 48 : "auto", height: 48, borderRadius: expanded ? "50%" : 9999 }}
        >
          {expanded ? (
            <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>✕</span>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="floating-pulse-dot" />
              <span style={{ fontWeight: 800, fontSize: "0.86rem", letterSpacing: "0.04em" }}>
                💬 NEED HELP?
              </span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
