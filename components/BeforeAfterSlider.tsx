"use client";

import { useState, useRef, TouchEvent, MouseEvent } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";

type ComparisonItem = {
  id: string;
  title: string;
  category: string;
  beforeLabel: string;
  afterLabel: string;
  beforeDesc: string;
  afterDesc: string;
  beforeImage: string;
  afterImage: string;
};

const comparisons: ComparisonItem[] = [
  {
    id: "chaukhat",
    title: "Old Wooden Frame vs. Tata Steel Chaukhat",
    category: "Door Frames",
    beforeLabel: "BEFORE (Termite Damaged Wooden Frame)",
    afterLabel: "AFTER (Sparsh Tata Steel Chaukhat)",
    beforeDesc: "Swollen wood, cracked joints, termite hollowing, and sagging hinges.",
    afterDesc: "100% termite proof, zero warping, pre-welded hinges, and precision 90° corners.",
    beforeImage: "/media/owner/sparsh-trading-design-partner-pratapgarh.webp",
    afterImage: "/media/steel-fabrication/heavy-structural-steel-fabrication-pratapgarh.webp"
  },
  {
    id: "railing",
    title: "Old Heavy Iron Grill vs. Frameless 12mm Glass Railing",
    category: "Balcony & Staircase",
    beforeLabel: "BEFORE (Rusted Heavy Iron Grill)",
    afterLabel: "AFTER (12mm Toughened Glass Balustrade)",
    beforeDesc: "Obstructed view, regular rusting issues, and dated appearance.",
    afterDesc: "Crystal-clear panoramic views, solid SS 304 spigots that never rust in outdoor rain.",
    beforeImage: "/media/owner/sparsh-trading-workshop-fabrication-master.webp",
    afterImage: "/media/toughened-glass-railing/frameless-12mm-toughened-glass-balcony-railing.webp"
  },
  {
    id: "windows",
    title: "Old Vibrating Aluminium vs. Soundproof uPVC Windows",
    category: "Window Systems",
    beforeLabel: "BEFORE (Rattling Single-Glass Frame)",
    afterLabel: "AFTER (3-Track uPVC Sliding with Mesh)",
    beforeDesc: "Street noise leaks, dust ingress, and draughts during monsoon.",
    afterDesc: "70% noise reduction, airtight EPDM seals, and built-in SS 304 mosquito mesh.",
    beforeImage: "/media/upvc-windows-doors/powder-coated-domal-aluminium-sliding-window.webp",
    afterImage: "/media/upvc-windows-doors/3-track-sliding-upvc-window-with-mosquito-mesh.webp"
  }
];

export function BeforeAfterSlider() {
  const [activeTab, setActiveTab] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeItem = comparisons[activeTab];

  function handleMove(clientX: number) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }

  function onMouseMove(e: MouseEvent) {
    if (isDragging) handleMove(e.clientX);
  }

  function onTouchMove(e: TouchEvent) {
    handleMove(e.touches[0].clientX);
  }

  return (
    <section className="section" aria-labelledby="transformation-heading" style={{ padding: "48px 0" }}>
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span className="brand-dot-pulse" />
            <span className="eyebrow" style={{ color: "var(--red-2)", fontWeight: 700, margin: 0 }}>
              Live Renovation Transformation
            </span>
          </div>
          <h2 id="transformation-heading" className="section-title" style={{ textAlign: "center" }}>
            See The Difference: Before &amp; After
          </h2>
          <p className="section-lead" style={{ maxWidth: 680, margin: "10px auto 0" }}>
            Drag the slider to compare traditional troubled installations with Sparsh Trading’s custom architectural metal, glass, and uPVC solutions.
          </p>
        </div>

        {/* Tab Selection */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {comparisons.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveTab(idx);
                setSliderPosition(50);
              }}
              style={{
                fontSize: "0.85rem",
                padding: "8px 16px",
                borderRadius: 20,
                border: "1px solid var(--border)",
                background: activeTab === idx ? "var(--red-2)" : "var(--surface)",
                color: activeTab === idx ? "#ffffff" : "var(--text)",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              {item.title.split(" vs. ")[0]} vs. {item.title.split(" vs. ")[1]}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Slider Container */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 920,
            margin: "0 auto",
            aspectRatio: "16/9",
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid var(--border)",
            boxShadow: "var(--card-shadow)",
            cursor: "ew-resize",
            userSelect: "none"
          }}
        >
          {/* AFTER Image (Background Layer) */}
          <img
            src={activeItem.afterImage}
            alt={activeItem.afterLabel}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />

          {/* BEFORE Image (Clipped Overlay Layer) */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
              overflow: "hidden"
            }}
          >
            <img
              src={activeItem.beforeImage}
              alt={activeItem.beforeLabel}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "grayscale(30%) contrast(90%)"
              }}
            />
          </div>

          {/* Badges */}
          <span
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(6px)",
              color: "#ff8b8b",
              padding: "4px 12px",
              borderRadius: 20,
              fontSize: "0.75rem",
              fontWeight: 800,
              letterSpacing: "0.04em",
              pointerEvents: "none"
            }}
          >
            {activeItem.beforeLabel}
          </span>

          <span
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              background: "rgba(22, 163, 74, 0.9)",
              backdropFilter: "blur(6px)",
              color: "#ffffff",
              padding: "4px 12px",
              borderRadius: 20,
              fontSize: "0.75rem",
              fontWeight: 800,
              letterSpacing: "0.04em",
              pointerEvents: "none"
            }}
          >
            ✓ {activeItem.afterLabel}
          </span>

          {/* Vertical Divider Line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${sliderPosition}%`,
              width: 3,
              background: "#ffffff",
              boxShadow: "0 0 10px rgba(0,0,0,0.6)",
              transform: "translateX(-50%)",
              pointerEvents: "none"
            }}
          >
            {/* Draggable Circle Knob */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "var(--red-2)",
                color: "#ffffff",
                border: "3px solid #ffffff",
                boxShadow: "0 4px 14px rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.85rem",
                fontWeight: 900
              }}
            >
              ⇄
            </div>
          </div>
        </div>

        {/* Feature Comparison Highlights Box */}
        <div
          className="card"
          style={{
            maxWidth: 920,
            margin: "20px auto 0",
            padding: "20px 24px",
            borderRadius: 12,
            border: "1px solid var(--border)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20
          }}
        >
          <div style={{ paddingRight: 12, borderRight: "1px solid var(--border)" }}>
            <span style={{ color: "var(--red-2)", fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase" }}>
              Old Construction Problems:
            </span>
            <p style={{ margin: "6px 0 0", fontSize: "0.92rem", lineHeight: 1.55, color: "var(--text)" }}>
              {activeItem.beforeDesc}
            </p>
          </div>
          <div>
            <span style={{ color: "#16a34a", fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase" }}>
              Sparsh Trading Advantage:
            </span>
            <p style={{ margin: "6px 0 0", fontSize: "0.92rem", lineHeight: 1.55, color: "var(--strong)", fontWeight: 600 }}>
              {activeItem.afterDesc}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link
            className="btn primary"
            href={`/contact?service=${encodeURIComponent(activeItem.category)}`}
            style={{ padding: "12px 24px", fontSize: "0.95rem", borderRadius: 8, display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            Get Free Site Measurement for Your Home
            <ArrowRightIcon width={14} height={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
