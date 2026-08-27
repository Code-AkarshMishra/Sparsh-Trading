"use client";

import Link from "next/link";
import { useState } from "react";

type Service = { slug: string; title: string; description: string; items: string[] };

export function ServiceCarousel({ services }: { services: Service[] }) {
  const [current, setCurrent] = useState(0);
  const service = services[current];

  function move(direction: number) {
    setCurrent((current + direction + services.length) % services.length);
  }

  return (
    <div className="service-carousel">
      <Link
        href={`/services/${service.slug}`}
        className="service-card card clickable"
        aria-label={`View ${service.title} details`}
        style={{ borderTop: "3px solid var(--red-2)" }}
      >
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="service-label" style={{ color: "var(--red-2)", fontWeight: 800 }}>
              Service 0{current + 1}
            </span>
            <span style={{ color: "var(--red-2)", fontWeight: 900 }}>→</span>
          </div>

          <h3 style={{ fontSize: "1.55rem", margin: "10px 0 10px", color: "var(--strong)" }}>
            {service.title}
          </h3>
          <p className="muted" style={{ fontSize: "0.96rem" }}>{service.description}</p>
          
          <ul style={{ margin: "14px 0 20px", paddingLeft: 0, listStyle: "none" }}>
            {service.items.map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.9rem", marginBottom: 6 }}>
                <span style={{ color: "var(--red-2)", fontWeight: 900 }}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <span className="btn" style={{ alignSelf: "flex-start", marginTop: 16, borderColor: "var(--red-2)" }}>
          View Service <span aria-hidden="true">→</span>
        </span>
      </Link>

      <div className="carousel-controls" style={{ marginTop: 16 }}>
        <button
          className="carousel-button"
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous service"
        >
          &larr;
        </button>
        <div className="carousel-dots" aria-label="Choose a service">
          {services.map((item, index) => (
            <button
              key={item.slug}
              className={index === current ? "active" : ""}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Show ${item.title}`}
            />
          ))}
        </div>
        <button
          className="carousel-button"
          type="button"
          onClick={() => move(1)}
          aria-label="Next service"
        >
          →
        </button>
      </div>
    </div>
  );
}