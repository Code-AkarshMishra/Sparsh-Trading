"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";

interface MobileSwipeableContainerProps {
  children: ReactNode[];
  autoSlideInterval?: number; // ms, default 3000ms
  className?: string;
  gridClassName?: string;
}

export function MobileSwipeableContainer({
  children,
  autoSlideInterval = 3000,
  className = "",
  gridClassName = ""
}: MobileSwipeableContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const total = children.length;

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-advance on mobile
  useEffect(() => {
    if (!isMobile || total <= 1) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, autoSlideInterval);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isMobile, total, autoSlideInterval, currentIndex]);

  const pauseAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const resumeAutoPlay = () => {
    if (!isMobile || total <= 1) return;
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, autoSlideInterval);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    pauseAutoPlay();
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    resumeAutoPlay();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    pauseAutoPlay();
    setCurrentIndex((prev) => (prev + 1) % total);
    resumeAutoPlay();
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    pauseAutoPlay();
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      resumeAutoPlay();
      return;
    }
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 40;
    const isRightSwipe = distance < -40;

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % total);
    } else if (isRightSwipe) {
      setCurrentIndex((prev) => (prev - 1 + total) % total);
    }
    setTouchStart(null);
    setTouchEnd(null);
    resumeAutoPlay();
  };

  // Desktop view: return standard grid
  if (!isMobile) {
    return <div className={gridClassName || "cards"}>{children}</div>;
  }

  // Mobile Swipe View
  return (
    <div
      className={`mobile-swipe-wrapper ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ position: "relative", width: "100%", overflow: "hidden", padding: "6px 0 16px" }}
    >
      <div
        className="mobile-swipe-track"
        style={{
          display: "flex",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: `translateX(-${currentIndex * 100}%)`,
          width: "100%"
        }}
      >
        {children.map((child, idx) => (
          <div
            key={idx}
            className="mobile-swipe-slide"
            style={{
              minWidth: "100%",
              maxWidth: "100%",
              flexShrink: 0,
              boxSizing: "border-box",
              padding: "0 4px"
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Swipe Navigation Buttons & Indicators */}
      {total > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 14,
            padding: "0 6px"
          }}
        >
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous item"
            className="btn"
            style={{
              padding: "6px 14px",
              minHeight: 34,
              fontSize: "0.9rem",
              background: "var(--surface-2)",
              color: "var(--red-2)",
              borderColor: "var(--red-2)",
              fontWeight: 900
            }}
          >
            ←
          </button>

          {/* Dots */}
          <div style={{ display: "flex", gap: 6 }}>
            {children.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => {
                  pauseAutoPlay();
                  setCurrentIndex(dotIdx);
                  resumeAutoPlay();
                }}
                aria-label={`Go to slide ${dotIdx + 1}`}
                style={{
                  width: currentIndex === dotIdx ? 22 : 8,
                  height: 8,
                  borderRadius: 4,
                  border: "none",
                  background: currentIndex === dotIdx ? "var(--red-2)" : "var(--border)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  padding: 0
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next item"
            className="btn"
            style={{
              padding: "6px 14px",
              minHeight: 34,
              fontSize: "0.9rem",
              background: "var(--surface-2)",
              color: "var(--red-2)",
              borderColor: "var(--red-2)",
              fontWeight: 900
            }}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
