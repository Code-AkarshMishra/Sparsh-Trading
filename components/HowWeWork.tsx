"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BrandImage } from "@/components/BrandImage";

const steps = [
  {
    step: "01",
    title: "Enquiry & Brief",
    desc: "Share your room dimensions, architectural blueprints, or project requirements online or over call.",
    tag: "Start Point"
  },
  {
    step: "02",
    title: "Technical Consultation",
    desc: "We discuss optimal material grades (Tata Steel, Lead-Free uPVC, SS 304, PPGI) tailored to your budget.",
    tag: "Advisory"
  },
  {
    step: "03",
    title: "Precision Site Survey",
    desc: "Our technical team visits your site in Pratapgarh/UP for millimeter-accurate laser and physical measurements.",
    tag: "Measurement"
  },
  {
    step: "04",
    title: "Design & Quotation",
    desc: "Transparent price estimation with clear material breakdown, design sketches, and scheduled milestones.",
    tag: "Approval"
  },
  {
    step: "05",
    title: "Workshop Fabrication",
    desc: "Precision CNC cutting, structural welding, edge finishing, and anti-corrosion primer coating at our local workshop.",
    tag: "Fabrication"
  },
  {
    step: "06",
    title: "Rigorous Quality Check",
    desc: "Structural load, weld smoothness, glass safety tolerances, and weather-seal inspections before dispatch.",
    tag: "Inspection"
  },
  {
    step: "07",
    title: "On-Site Installation",
    desc: "Professional installation by trained craftsmen with seamless alignment, anchoring, and clean site cleanup.",
    tag: "Fitting"
  },
  {
    step: "08",
    title: "Final Handover & Support",
    desc: "Client walkthrough, operation check, warranty assurance, and dedicated after-sales assistance.",
    tag: "Completion"
  }
];

export function HowWeWork() {
  const [active, setActive] = useState(0);

  return (
    <section className="section grid-bg workflow-section" id="how-we-work" aria-label="How We Work Process Flowchart">
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <span className="eyebrow" style={{ color: "var(--red-2)", fontWeight: 700 }}>
            Proven Execution Flowchart
          </span>
          <h2 className="display big-title" style={{ margin: "8px auto 14px", maxWidth: 850 }}>
            A Seamless Path From Concept To Installation.
          </h2>
          <p className="section-lead" style={{ maxWidth: 720, margin: "0 auto" }}>
            Our structured 8-step flowchart ensures every gate, window, railing, and kitchen is engineered with zero fitting error and long-term durability.
          </p>
        </div>

        {/* Interactive Flowchart Progress Bar */}
        <div className="flowchart-stepper" style={{ marginBottom: 36, overflowX: "auto", paddingBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", minWidth: 680, justifyContent: "space-between", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: 20,
                right: 20,
                top: 20,
                height: 3,
                background: "var(--border)",
                zIndex: 0
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 20,
                width: `${(active / (steps.length - 1)) * 100}%`,
                top: 20,
                height: 3,
                background: "linear-gradient(90deg, #b82117, #ff3333)",
                boxShadow: "0 0 12px rgba(255, 51, 51, 0.6)",
                transition: "width 0.35s ease",
                zIndex: 1
              }}
            />

            {steps.map((s, index) => (
              <button
                key={s.step}
                type="button"
                onClick={() => setActive(index)}
                style={{
                  position: "relative",
                  zIndex: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: 4
                }}
                aria-label={`Go to step ${s.step}: ${s.title}`}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    transition: "all 0.25s ease",
                    background:
                      index === active
                        ? "var(--red-2)"
                        : index < active
                        ? "#991b1b"
                        : "var(--surface)",
                    color: index <= active ? "#ffffff" : "var(--muted)",
                    border: `2px solid ${index <= active ? "var(--red-2)" : "var(--border)"}`,
                    boxShadow: index === active ? "0 0 16px rgba(220, 38, 38, 0.7)" : "none",
                    transform: index === active ? "scale(1.15)" : "scale(1)"
                  }}
                >
                  {index < active ? "✓" : s.step}
                </div>
                <span
                  style={{
                    fontSize: "0.74rem",
                    fontWeight: 700,
                    marginTop: 8,
                    color: index === active ? "var(--red-2)" : "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    whiteSpace: "nowrap"
                  }}
                >
                  {s.tag}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Flowchart Grid with Arrows */}
        <div className="flowchart-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {steps.map((item, index) => {
            const isActive = index === active;
            const isCompleted = index < active;

            return (
              <div
                key={item.step}
                className={`card flowchart-node ${isActive ? "active-node" : ""}`}
                onClick={() => setActive(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setActive(index);
                }}
                style={{
                  padding: "24px 20px",
                  cursor: "pointer",
                  position: "relative",
                  border: isActive ? "2px solid var(--red-2)" : "1.5px solid var(--border)",
                  background: isActive ? "var(--surface-2)" : "var(--surface)",
                  boxShadow: isActive ? "0 8px 30px rgba(220, 38, 38, 0.25)" : "var(--card-shadow)",
                  transition: "all 0.25s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 6,
                          background: isActive ? "var(--red-2)" : "rgba(217, 45, 32, 0.12)",
                          color: isActive ? "#ffffff" : "var(--red-2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 800,
                          fontSize: "0.82rem"
                        }}
                      >
                        {item.step}
                      </span>
                      <span
                        className="eyebrow"
                        style={{
                          color: "var(--red-2)",
                          fontSize: "0.72rem",
                          letterSpacing: "0.08em",
                          margin: 0
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>

                    <span
                      style={{
                        color: "var(--red-2)",
                        fontWeight: 900,
                        fontSize: "1.1rem",
                        opacity: index < steps.length - 1 ? 1 : 0.4
                      }}
                    >
                      {index % 4 === 3 ? "↓" : "→"}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.25rem", margin: "0 0 8px", color: "var(--strong)", fontWeight: 800 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "0.92rem", lineHeight: 1.5, color: "var(--muted)", margin: 0 }}>
                    {item.desc}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 18, paddingTop: 12, borderTop: "1px dashed var(--border)" }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: isActive ? "#ff3333" : "var(--border-strong)",
                      boxShadow: isActive ? "0 0 8px #ff3333" : "none"
                    }}
                  />
                  <span style={{ fontSize: "0.78rem", color: isActive ? "var(--red-2)" : "var(--muted)", fontWeight: 600 }}>
                    {isActive ? "Active Stage Selected" : isCompleted ? "Stage Completed" : "Upcoming Phase"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: 44 }}>
          <Link className="btn primary" href="/contact" style={{ padding: "14px 32px", fontSize: "1.05rem" }}>
            Start Step 01: Request Project Estimate →

          </Link>
        </div>
      </div>
    </section>
  );
}