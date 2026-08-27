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
  gridClassName = "cards"
}: MobileSwipeableContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const total = children.length;

  // Auto-advance on mobile
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

  return (
    <div className={`responsive-swipe-root ${className}`}>
      {/* Desktop Grid (Hidden on Mobile via CSS) */}
      <div className={`desktop-grid-view ${gridClassName}`}>
        {children}
      </div>

      {/* Mobile Swipe Carousel (Hidden on Desktop via CSS) */}
      <div
        className="mobile-swipe-view"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          padding: "4px 0 12px"
        }}
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
                width: "100%",
                minWidth: "100%",
                maxWidth: "100%",
                flexShrink: 0,
                boxSizing: "border-box",
                padding: "2px 2px"
              }}
            >
              {child}
            </div>
          ))}
        </div>

        {/* Swipe Navigation Buttons & Indicators */}
        {total > 1 && (
          <div
            className="mobile-swipe-controls"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 14,
              padding: "0 4px"
            }}
          >
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="btn"
              style={{
                padding: "6px 14px",
                minHeight: 36,
                fontSize: "1rem",
                background: "var(--surface)",
                color: "var(--red-2)",
                borderColor: "var(--red-2)",
                fontWeight: 900
              }}
            >
              ←
            </button>

            {/* Pagination Dots */}
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
                    width: currentIndex === dotIdx ? 24 : 8,
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
              aria-label="Next slide"
              className="btn"
              style={{
                padding: "6px 14px",
                minHeight: 36,
                fontSize: "1rem",
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
