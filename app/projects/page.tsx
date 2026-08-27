"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const defaultProjects = [
  {
    _id: "pr1",
    title: "Residential uPVC Window & Door Installation",
    category: "uPVC Solutions",
    description: "Complete 3-BHK home fitting with multi-slide uPVC window frames, toughened glass, and acoustic weather-stripping in Pratapgarh.",
    location: "Ashtbhuja Nagar, Pratapgarh"
  },
  {
    _id: "pr2",
    title: "Commercial Heavy Steel Entrance Gate & Grills",
    category: "Steel Fabrication",
    description: "Industrial grade 16ft sliding main gate, boundary grills, and structural canopy designed for a commercial warehouse complex.",
    location: "City Road, Pratapgarh"
  },
  {
    _id: "pr3",
    title: "Frameless Toughened Glass Balcony Railings",
    category: "Glass Railings",
    description: "12mm crystal toughened glass balustrade with grade 304 stainless steel base shoe profile and polished round handrail.",
    location: "Civil Lines, Pratapgarh"
  },
  {
    _id: "pr4",
    title: "Custom PPGI Door Frames for Housing Society",
    category: "PPGI Frames",
    description: "Batch fabrication and precise masonry alignment of 48 corrosion-resistant PPGI door frames for a multi-unit development.",
    location: "Pratapgarh Bypass"
  }
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>(defaultProjects);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((j) => {
        if (j.data?.projects && j.data.projects.length > 0) {
          setProjects(j.data.projects);
        }
      })
      .catch(() => setProjects(defaultProjects));
  }, []);

  return (
    <main className="section grid-bg subpage-main">
      <div className="wrap">
        <span className="eyebrow">Projects</span>
        <h1 className="display big-title">Project portfolio.</h1>
        <p className="section-lead">
          Take a look at recently fabricated metal structures, custom railings, and architectural installations completed across Uttar Pradesh.
        </p>

        <div className="gallery-grid">
          {projects.map((project) => (
            <Link
              href={`/contact?project=${encodeURIComponent(project.title)}`}
              className="card project-card clickable"
              key={project._id}
              aria-label={`View details or enquire about ${project.title}`}
            >
              {project.images?.[0]?.url ? (
                <img src={project.images[0].url} alt={project.title} />
              ) : (
                <div
                  style={{
                    height: 200,
                    background: "var(--surface-2)",
                    display: "grid",
                    placeItems: "center",
                    borderBottom: "1.5px solid var(--border)",
                    color: "var(--muted)",
                    fontWeight: 700
                  }}
                >
                  🏗️ {project.category || "Sparsh Project"}
                </div>
              )}
              <div>
                <span className="eyebrow">{project.category || "Fabrication"}</span>
                <h2>{project.title}</h2>
                <p className="muted">{project.description}</p>
                {project.location && (
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--strong)", marginTop: 8 }}>
                    📍 {project.location}
                  </p>
                )}
                <span className="text-link" style={{ marginTop: 14 }}>
                  Enquire about similar work →

                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="card" style={{ padding: 36, marginTop: 56, textAlign: "center" }}>
          <h2 className="display" style={{ fontSize: "2rem", marginBottom: 12 }}>
            Have a project in mind?
          </h2>
          <p className="muted" style={{ maxWidth: 640, margin: "0 auto 24px" }}>
            We provide complimentary on-site measurement and material consultation for homes, builders, and commercial spaces.
          </p>
          <div className="actions" style={{ justifyContent: "center" }}>
            <Link className="btn primary" href="/contact">
              Request On-Site Estimate
            </Link>
            <Link className="btn" href="/services">
              Browse All Services
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
