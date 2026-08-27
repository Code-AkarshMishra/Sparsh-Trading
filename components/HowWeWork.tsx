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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance through stages
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 3200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [active]);

  const pauseTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const resumeTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 3200);
  };

  const handlePrev = () => {
    pauseTimer();
    setActive((prev) => (prev - 1 + steps.length) % steps.length);
    resumeTimer();
  };

  const handleNext = () => {
    pauseTimer();
    setActive((prev) => (prev + 1) % steps.length);
    resumeTimer();
  };

  // Touch Swipe on mobile card
  const handleTouchStart = (e: React.TouchEvent) => {
    pauseTimer();
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      resumeTimer();
      return;
    }
    const diff = touchStart - touchEnd;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
    resumeTimer();
  };

  const activeStep = steps[active];

  return (
    <section className="section grid-bg workflow-section" id="how-we-work" aria-label="How We Work Process Flowchart">
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
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

        {/* Interactive Flowchart Progress Stepper Bar (Synced Real-time) */}
        <div className="flowchart-stepper" style={{ marginBottom: 32, overflowX: "auto", paddingBottom: 10 }}>
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
                boxShadow: "0 0 14px rgba(255, 51, 51, 0.7)",
                transition: "width 0.35s ease",
                zIndex: 1
              }}
            />

            {steps.map((s, index) => (
              <button
                key={s.step}
                type="button"
                onClick={() => {
                  pauseTimer();
                  setActive(index);
                  resumeTimer();
                }}
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
                    width: 40,
                    height: 40,
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
                    boxShadow: index === active ? "0 0 16px rgba(220, 38, 38, 0.8)" : "none",
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

        {/* Mobile View: Dedicated Synced Active Step Card */}
        <div
          className="mobile-only-flowchart"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ width: "100%", margin: "0 auto 20px" }}
        >
          <div
            className="card active-node"
            style={{
              padding: "26px 20px",
              border: "2px solid var(--red-2)",
              background: "var(--surface-2)",
              boxShadow: "0 8px 30px rgba(220, 38, 38, 0.25)",
              borderRadius: 12
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    background: "var(--red-2)",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: "0.9rem"
                  }}
                >
                  {activeStep.step}
                </span>
                <span
                  className="eyebrow"
                  style={{
                    color: "var(--red-2)",
                    fontSize: "0.78rem",
                    letterSpacing: "0.08em",
                    margin: 0
                  }}
                >
                  {activeStep.tag}
                </span>
              </div>
              <span style={{ fontSize: "0.85rem", color: "var(--muted)", fontWeight: 700 }}>
                {active + 1} of {steps.length}
              </span>
            </div>

            <h3 style={{ fontSize: "1.35rem", margin: "0 0 10px", color: "var(--strong)", fontWeight: 800 }}>
              {activeStep.title}
            </h3>
            <p style={{ fontSize: "0.96rem", lineHeight: 1.6, color: "var(--text)", margin: "0 0 18px" }}>
              {activeStep.desc}
            </p>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px dashed var(--border)" }}>
              <button
                type="button"
                onClick={handlePrev}
                className="btn"
                style={{ padding: "6px 16px", minHeight: 36, fontSize: "0.9rem", color: "var(--red-2)", borderColor: "var(--red-2)" }}
              >
                ← Prev
              </button>

              <div style={{ display: "flex", gap: 5 }}>
                {steps.map((_, dotIdx) => (
                  <span
                    key={dotIdx}
                    onClick={() => {
                      pauseTimer();
                      setActive(dotIdx);
                      resumeTimer();
                    }}
                    style={{
                      width: active === dotIdx ? 18 : 6,
                      height: 6,
                      borderRadius: 3,
                      background: active === dotIdx ? "var(--red-2)" : "var(--border)",
                      transition: "all 0.25s ease",
                      cursor: "pointer"
                    }}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="btn primary"
                style={{ padding: "6px 16px", minHeight: 36, fontSize: "0.9rem" }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* Desktop View: Full 8-Step Grid with Connected Status */}
        <div className="desktop-only-flowchart flowchart-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
          {steps.map((item, index) => {
            const isActive = index === active;
            const isCompleted = index < active;

            return (
              <div
                key={item.step}
                className={`card flowchart-node ${isActive ? "active-node" : ""}`}
                onClick={() => {
                  pauseTimer();
                  setActive(index);
                  resumeTimer();
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    pauseTimer();
                    setActive(index);
                    resumeTimer();
                  }
                }}
                style={{
                  padding: "22px 18px",
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
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: 6,
                          background: isActive ? "var(--red-2)" : "rgba(217, 45, 32, 0.12)",
                          color: isActive ? "#ffffff" : "var(--red-2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 800,
                          fontSize: "0.8rem"
                        }}
                      >
                        {item.step}
                      </span>
                      <span
                        className="eyebrow"
                        style={{
                          color: "var(--red-2)",
                          fontSize: "0.7rem",
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
                        fontSize: "1.05rem",
                        opacity: index < steps.length - 1 ? 1 : 0.4
                      }}
                    >
                      {index % 4 === 3 ? "↓" : "→"}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.2rem", margin: "0 0 8px", color: "var(--strong)", fontWeight: 800 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.5, color: "var(--muted)", margin: 0 }}>
                    {item.desc}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16, paddingTop: 10, borderTop: "1px dashed var(--border)" }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: isActive ? "#ff3333" : "var(--border-strong)",
                      boxShadow: isActive ? "0 0 8px #ff3333" : "none"
                    }}
                  />
                  <span style={{ fontSize: "0.76rem", color: isActive ? "var(--red-2)" : "var(--muted)", fontWeight: 600 }}>
                    {isActive ? "Active Stage Selected" : isCompleted ? "Stage Completed" : "Upcoming Phase"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link className="btn primary" href="/contact" style={{ padding: "14px 32px", fontSize: "1.05rem" }}>
            Start Step 01: Request Project Estimate →
          </Link>
        </div>
      </div>
    </section>
  );
}