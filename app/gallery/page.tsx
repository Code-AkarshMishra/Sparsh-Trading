"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { mediaCatalogue, galleryCategories, MediaItem } from "@/lib/mediaData";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [items, setItems] = useState<MediaItem[]>(mediaCatalogue);

  useEffect(() => {
    fetch("/api/gallery")
      .then((response) => response.json())
      .then((json) => {
        const uploaded = (json.data?.gallery || []).flatMap((entry: any) => {
          const file = entry.image;
          if (!file?.url) return [];
          return [{
            id: String(entry._id),
            title: entry.title || file.name || "Sparsh Trading project media",
            serviceSlug: "",
            category: entry.category || "Projects",
            type: String(file.type || "").startsWith("video/") ? "video" : "image",
            url: file.url,
            description: entry.description
          } satisfies MediaItem];
        });
        if (uploaded.length > 0) setItems([...uploaded, ...mediaCatalogue]);
      })
      .catch(() => setItems(mediaCatalogue));
  }, []);

  const filteredItems =
    activeCategory === "All"
      ? items
      : activeCategory === "Videos"
        ? items.filter((item) => item.type === "video")
        : items.filter(
          (item) => item.category.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <main className="section subpage-main">
      <div className="wrap">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span className="brand-dot-pulse" />
          <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
            Visual Showcase
          </span>
        </div>
        <h1 className="display big-title">Work that speaks for itself.</h1>
        <p className="section-lead">
          Browse real site photos &amp; videos of modular kitchens, uPVC window systems, toughened glass railings, and structural steel fabrication across Pratapgarh.
        </p>

        {/* Category Tabs */}
        <div className="category-tabs" role="tablist" aria-label="Gallery category filters" style={{ marginTop: 28, marginBottom: 32 }}>
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              className={`category-tab ${activeCategory === cat ? "active" : ""}`}
              type="button"
              onClick={() => setActiveCategory(cat)}
              style={{
                border: activeCategory === cat ? "1.5px solid var(--red-2)" : "1px solid var(--border)",
                background: activeCategory === cat ? "var(--red-2)" : "var(--surface)",
                color: activeCategory === cat ? "#ffffff" : "var(--strong)"
              }}
            >
              {cat === "Videos" ? "▶ " : ""}
              {cat}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
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
              style={{
                overflow: "hidden",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                border: "1.5px solid var(--border)",
                background: "var(--surface)"
              }}
            >
              <div style={{ position: "relative", width: "100%", height: 220, overflow: "hidden", background: "#000000" }}>
                <span
                  className="media-badge"
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    zIndex: 2,
                    background: "rgba(217, 45, 32, 0.9)",
                    color: "#ffffff",
                    padding: "4px 10px",
                    borderRadius: 4,
                    fontSize: "0.74rem",
                    fontWeight: 800,
                    letterSpacing: "0.04em"
                  }}
                >
                  {item.type === "video" ? "▶ Video" : "📷 Photo"}
                </span>

                {item.type === "video" ? (
                  <div style={{ position: "relative", width: "100%", height: "100%" }}>
                    <video
                      src={item.url}
                      preload="metadata"
                      muted
                      playsInline
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(0, 0, 0, 0.35)"
                      }}
                    >
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          background: "var(--red-2)",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.2rem",
                          boxShadow: "0 0 16px rgba(220, 38, 38, 0.8)"
                        }}
                      >
                        ▶
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    loading="lazy"
                  />
                )}
              </div>

              <div style={{ padding: "18px 16px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                <div>
                  <span className="eyebrow" style={{ color: "var(--red-2)", fontSize: "0.72rem", marginBottom: 4, display: "block" }}>
                    {item.category}
                  </span>
                  <h3 style={{ fontSize: "1.1rem", margin: "4px 0 8px", color: "var(--strong)", lineHeight: 1.3 }}>
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="muted" style={{ fontSize: "0.86rem", margin: 0, lineHeight: 1.45 }}>
                      {item.description}
                    </p>
                  )}
                </div>

                <div style={{ marginTop: 14, paddingTop: 10, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--red-2)", fontWeight: 700 }}>
                    Click to View {item.type === "video" ? "Video" : "Photo"}
                  </span>
                  <span style={{ color: "var(--red-2)", fontWeight: 900 }}>→</span>
                </div>
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
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 850 }}>
              <button
                className="lightbox-close"
                type="button"
                onClick={() => setSelectedMedia(null)}
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="lightbox-media" style={{ background: "#000", borderRadius: 8, overflow: "hidden" }}>
                {selectedMedia.type === "video" ? (
                  <video src={selectedMedia.url} controls autoPlay playsInline style={{ width: "100%", maxHeight: "70vh" }} />
                ) : (
                  <img src={selectedMedia.url} alt={selectedMedia.title} style={{ width: "100%", maxHeight: "70vh", objectFit: "contain" }} />
                )}
              </div>

              <div className="lightbox-details" style={{ marginTop: 16 }}>
                <span className="eyebrow" style={{ color: "var(--red-2)" }}>{selectedMedia.category}</span>
                <h2 className="display" style={{ fontSize: "1.5rem", margin: "6px 0 10px" }}>
                  {selectedMedia.title}
                </h2>
                {selectedMedia.description && <p className="muted" style={{ margin: "0 0 16px" }}>{selectedMedia.description}</p>}
                
                <div className="actions" style={{ marginTop: 16 }}>
                  <Link
                    className="btn primary"
                    href={`/contact?subject=${encodeURIComponent(selectedMedia.title)}`}
                  >
                    Get Estimate for Similar Work →
                  </Link>
                  {selectedMedia.serviceSlug && (
                    <Link className="btn" href={`/services/${selectedMedia.serviceSlug}`}>
                      View Service Details
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Simplified Call to Action */}
        <div className="card" style={{ padding: "36px 32px", marginTop: 56, background: "var(--surface)", borderLeft: "4px solid var(--red-2)" }}>
          <span className="eyebrow" style={{ color: "var(--red-2)", fontWeight: 700 }}>Custom Manufacturing in Pratapgarh</span>
          <h2 className="display" style={{ fontSize: "1.8rem", margin: "8px 0 12px" }}>
            Ready to Start Your Fabrication or Interior Project?
          </h2>
          <p className="muted" style={{ maxWidth: 700, margin: "0 0 20px", fontSize: "1.02rem" }}>
            We provide custom site visits, precision laser measurements, transparent material pricing, and guaranteed delivery timelines for homes and businesses.
          </p>
          <div className="actions">
            <Link className="btn primary" href="/contact">
              Get an Estimate for Your Project →
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
