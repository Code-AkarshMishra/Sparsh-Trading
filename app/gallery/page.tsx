"use client";

import { useState } from "react";
import Link from "next/link";
import { mediaCatalogue, galleryCategories, MediaItem } from "@/lib/mediaData";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const filteredItems =
    activeCategory === "All"
      ? mediaCatalogue
      : activeCategory === "Videos"
      ? mediaCatalogue.filter((item) => item.type === "video")
      : mediaCatalogue.filter(
          (item) => item.category.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <main className="section subpage-main">
      <div className="wrap">
        <span className="eyebrow">Visual Showcase</span>
        <h1 className="display big-title">Work that speaks for itself.</h1>
        <p className="section-lead">
          Explore our complete category-wise collection of metal fabrication, custom uPVC windows, glass railings, modular kitchen setups, and workshop videos.
        </p>

        {/* Category Tabs */}
        <div className="category-tabs" role="tablist" aria-label="Gallery category filters">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              className={`category-tab ${activeCategory === cat ? "active" : ""}`}
              type="button"
              onClick={() => setActiveCategory(cat)}
            >
              {cat === "Videos" ? "▶ " : ""}
              {cat}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="gallery-grid">
          {filteredItems.map((item) => (
            <div
              className="card media-card clickable"
              key={item.id}
              onClick={() => setSelectedMedia(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelectedMedia(item);
              }}
            >
              <span className="media-badge">
                {item.type === "video" ? "▶ Video" : "📷 Photo"}
              </span>
              <div className="media-preview">
                {item.type === "video" ? (
                  <>
                    <video src={item.url} preload="metadata" muted playsInline />
                    <div className="media-play-overlay">
                      <div className="media-play-icon">▶</div>
                    </div>
                  </>
                ) : (
                  <img src={item.url} alt={item.title} />
                )}
              </div>
              <div className="media-info">
                <span className="eyebrow" style={{ fontSize: "0.72rem", marginBottom: 2 }}>
                  {item.category}
                </span>
                <h3>{item.title}</h3>
                {item.description && <p>{item.description}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedMedia && (
          <div
            className="lightbox-modal"
            onClick={() => setSelectedMedia(null)}
            role="dialog"
            aria-modal="true"
          >
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="lightbox-close"
                type="button"
                onClick={() => setSelectedMedia(null)}
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="lightbox-media">
                {selectedMedia.type === "video" ? (
                  <video src={selectedMedia.url} controls autoPlay playsInline style={{ width: "100%" }} />
                ) : (
                  <img src={selectedMedia.url} alt={selectedMedia.title} />
                )}
              </div>

              <div className="lightbox-details">
                <span className="eyebrow">{selectedMedia.category}</span>
                <h2 className="display" style={{ fontSize: "1.6rem", margin: "6px 0 10px" }}>
                  {selectedMedia.title}
                </h2>
                {selectedMedia.description && <p className="muted">{selectedMedia.description}</p>}
                <div className="actions" style={{ marginTop: 18 }}>
                  <Link
                    className="btn primary"
                    href={`/contact?subject=${encodeURIComponent(selectedMedia.title)}`}
                  >
                    Request Quote for Similar Work &rarr;
                  </Link>
                  <Link className="btn" href={`/services/${selectedMedia.serviceSlug}`}>
                    View Service Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Guide Card for adding photos and videos */}
        <div className="card" style={{ padding: 32, marginTop: 56, background: "var(--surface)" }}>
          <span className="eyebrow">How to add more photos &amp; videos</span>
          <h2 className="display" style={{ fontSize: "1.7rem", margin: "8px 0 12px" }}>
            Add your workshop photos &amp; site videos in 2 steps:
          </h2>
          <ol style={{ paddingLeft: 20, margin: "14px 0 20px", display: "grid", gap: 10, color: "var(--text)" }}>
            <li>
              <strong>Step 1:</strong> Save your photos/videos into the project folder:
              <br />
              <code style={{ background: "var(--surface-2)", padding: "2px 8px", borderRadius: 4, display: "inline-block", marginTop: 4 }}>
                public/media/modular-kitchen/
              </code>,{" "}
              <code style={{ background: "var(--surface-2)", padding: "2px 8px", borderRadius: 4 }}>
                public/media/steel-fabrication/
              </code>, etc.
            </li>
            <li>
              <strong>Step 2:</strong> Add or edit entries in{" "}
              <code style={{ background: "var(--surface-2)", padding: "2px 8px", borderRadius: 4 }}>
                lib/mediaData.ts
              </code>{" "}
              with the title and file path. They will instantly appear in all category tabs and on each service page!
            </li>
          </ol>
          <div className="actions">
            <Link className="btn primary" href="/contact">
              Get an Estimate for Your Project
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
