"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  ["Enquiry", "Tell us what you need."],
  ["Discussion", "Understand the brief together."],
  ["Measurement", "Capture accurate site details."],
  ["Design", "Plan the right solution."],
  ["Estimate", "Agree the scope and materials."],
  ["Fabrication", "Build with care and control."],
  ["Quality Check", "Review every important detail."],
  ["Installation", "Fit the finished work cleanly."],
  ["Handover", "Leave you ready to use it."]
];

export function HowWeWork() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.step));
          }
        });
      },
      { rootMargin: "-35% 0px -45%", threshold: 0.1 }
    );
    refs.current.forEach((item) => item && observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section grid-bg workflow-section" id="how-we-work">
      <div className="wrap">
        <span className="eyebrow">How We Work</span>
        <h2 className="display big-title">A clear path from brief to handover.</h2>
        <p className="section-lead">
          A considered workflow keeps the work moving and the finished result dependable.
        </p>

        <ol className="workflow">
          {steps.map(([title, description], index) => (
            <li
              key={title}
              className={`card clickable ${index === active ? "active" : index < active ? "complete" : ""}`}
              data-step={index}
              ref={(element) => {
                refs.current[index] = element;
              }}
              onClick={() => setActive(index)}
              style={{ cursor: "pointer" }}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActive(index);
                }
              }}
            >
              <div className="workflow-node">
                <span className="workflow-index">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="workflow-copy">
                <h3>{title}</h3>
                <p className="muted">{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}