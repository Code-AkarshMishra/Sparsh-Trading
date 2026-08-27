"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";

interface MobileSwipeableContainerProps {
  children: ReactNode[];
  autoSlideInterval?: number;
  className?: string;
  gridClassName?: string;
}

export function MobileSwipeableContainer({
  children,
  autoSlideInterval = 3200,
  className = "",
  gridClassName = "cards"
}: MobileSwipeableContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const total = children.length;

  // Auto-advance
  useEffect(() => {
    if (total <= 1) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, autoSlideInterval);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [total, autoSlideInterval, currentIndex]);

  const pauseAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const resumeAutoPlay = () => {
    if (total <= 1) return;
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, autoSlideInterval);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    pauseAutoPlay();
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    resumeAutoPlay();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    pauseAutoPlay();
    setCurrentIndex((prev) => (prev + 1) % total);
    resumeAutoPlay();
  };

  // Touch Swipe
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
    if (distance > 40) {
      setCurrentIndex((prev) => (prev + 1) % total);
    } else if (distance < -40) {
      setCurrentIndex((prev) => (prev - 1 + total) % total);
    }
    setTouchStart(null);
    setTouchEnd(null);
    resumeAutoPlay();
  };

  return (
    <div className={`responsive-swipe-root ${className}`} style={{ width: "100%", position: "relative" }}>
      {/* Desktop Grid */}
      <div className={`desktop-grid-view ${gridClassName}`}>
        {children}
      </div>

      {/* Mobile Single Card Carousel */}
      <div
        className="mobile-swipe-view"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          width: "100%",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: `translateX(-${currentIndex * 100}%)`
          }}
        >
          {children.map((child, idx) => (
            <div
              key={idx}
              style={{
                width: "100%",
                minWidth: "100%",
                maxWidth: "100%",
                flexShrink: 0,
                boxSizing: "border-box",
                padding: "0"
              }}
            >
              {child}
            </div>
          ))}
        </div>

        {/* Navigation Arrows & Indicator Dots */}
        {total > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 12,
              padding: "0 2px"
            }}
          >
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous card"
              className="btn"
              style={{
                padding: "6px 14px",
                minHeight: 34,
                fontSize: "0.95rem",
                background: "var(--surface)",
                color: "var(--red-2)",
                borderColor: "var(--red-2)",
                fontWeight: 900
              }}
            >
              ←
            </button>

            <div style={{ display: "flex", gap: 5 }}>
              {children.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => {
                    pauseAutoPlay();
                    setCurrentIndex(dotIdx);
                    resumeAutoPlay();
                  }}
                  aria-label={`Go to item ${dotIdx + 1}`}
                  style={{
                    width: currentIndex === dotIdx ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    border: "none",
                    background: currentIndex === dotIdx ? "var(--red-2)" : "var(--border)",
                    transition: "all 0.25s ease",
                    cursor: "pointer",
                    padding: 0
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next card"
              className="btn"
              style={{
                padding: "6px 14px",
                minHeight: 34,
                fontSize: "0.95rem",
                background: "var(--surface)",
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
    </div>
  );
}
