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
        data-code={`0${current + 1}`}
        aria-label={`View ${service.title} details`}
      >
        <div>
          <span className="service-label">Service 0{current + 1}</span>
          <h3>{service.title}</h3>
          <p className="muted">{service.description}</p>
          <ul>
            {service.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <span className="btn" style={{ alignSelf: "flex-start", marginTop: 16 }}>
          View Service <span aria-hidden="true">-&gt;</span>
        </span>
      </Link>

      <div className="carousel-controls">
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
          &rarr;
        </button>
      </div>
    </div>
  );
}