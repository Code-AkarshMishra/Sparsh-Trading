"use client";

import { FormEvent, useState, useEffect } from "react";
import { ArrowRightIcon } from "@/components/Icons";

type ContentItem = {
  id: string;
  type: "Gallery" | "Product" | "Project" | "Service";
  title: string;
  category: string;
  imageUrl: string;
  createdAt?: string;
};

const kinds = ["Product", "Project", "Service", "Gallery"];

export default function ContentManager() {
  const [kind, setKind] = useState("Product");
  const [status, setStatus] = useState("");
  const [items, setItems] = useState<ContentItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  // 3-Step Delete Modal State
  const [deleteTarget, setDeleteTarget] = useState<ContentItem | null>(null);
  const [deleteStep, setDeleteStep] = useState<1 | 2 | 3>(1);
  const [acknowledgedRisk, setAcknowledgedRisk] = useState(false);
  const [confirmPhrase, setConfirmPhrase] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      setLoading(true);
      const res = await fetch("/api/content");
      const json = await res.json();
      if (json?.data?.items) {
        setItems(json.data.items);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Publishing...");
    const form = new FormData(event.currentTarget);
    const files = Array.from(form.getAll("images")).filter(
      (file): file is File => file instanceof File && file.size > 0
    ).slice(0, 50);

    const images = await Promise.all(
      files.map(async (file) => {
        const upload = new FormData();
        upload.append("file", file);
        const result = await fetch("/api/upload", { method: "POST", body: upload });
        return (await result.json()).data.file;
      })
    );

    const title = String(form.get("title") || "");
    const payload: any =
      kind === "Service"
        ? {
            slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
            title,
            category: form.get("category"),
            description: form.get("description"),
            items: String(form.get("description") || "").split(",").map((x) => x.trim()).filter(Boolean),
            images,
            published: true
          }
        : kind === "Gallery"
        ? images.map((image) => ({ title, category: form.get("category"), image, published: true }))
        : {
            [kind === "Product" ? "name" : "title"]: title,
            category: form.get("category"),
            description: form.get("description"),
            images,
            published: true,
            featured: kind === "Project"
          };

    const endpoint = kind === "Gallery" ? "/api/gallery" : `/api/${kind.toLowerCase()}s`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      setStatus(`${kind} published successfully.`);
      event.currentTarget.reset();
      fetchItems();
    } else {
      setStatus("Could not publish. Please check the form and try again.");
    }
  }

  function startDelete(item: ContentItem) {
    setDeleteTarget(item);
    setDeleteStep(1);
    setAcknowledgedRisk(false);
    setConfirmPhrase("");
    setDeleteMsg("");
  }

  function closeDeleteModal() {
    setDeleteTarget(null);
    setDeleteStep(1);
    setAcknowledgedRisk(false);
    setConfirmPhrase("");
    setDeleteMsg("");
  }

  async function executePermanentDelete() {
    if (!deleteTarget) return;
    if (confirmPhrase.trim().toUpperCase() !== "DELETE") {
      setDeleteMsg("Please type DELETE to confirm.");
      return;
    }

    try {
      setDeleting(true);
      setDeleteMsg("Erasing asset...");
      const res = await fetch("/api/content", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: deleteTarget.id,
          type: deleteTarget.type,
          fileUrl: deleteTarget.imageUrl
        })
      });

      if (res.ok) {
        setDeleteMsg("Asset permanently deleted.");
        setTimeout(() => {
          closeDeleteModal();
          fetchItems();
        }, 800);
      } else {
        setDeleteMsg("Failed to delete asset. Please try again.");
      }
    } catch {
      setDeleteMsg("Network error during deletion.");
    } finally {
      setDeleting(false);
    }
  }

  const filteredItems =
    selectedFilter === "All" ? items : items.filter((i) => i.type.toLowerCase() === selectedFilter.toLowerCase());

  return (
    <div className="wrap" style={{ padding: "24px 0", maxWidth: 1080, boxSizing: "border-box" }}>
      {/* Page Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span className="brand-dot-pulse" />
        <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
          Media &amp; Catalogue Management
        </span>
      </div>
      <h1 className="display big-title" style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", margin: "0 0 6px" }}>
        Content Hub &amp; Media Assets
      </h1>
      <p className="muted" style={{ margin: "0 0 28px", fontSize: "0.95rem" }}>
        Publish new products, projects, and gallery media, or manage and permanently delete existing uploaded assets.
      </p>

      {/* Upload Form Card */}
      <form className="form card content-form" onSubmit={submit} style={{ borderTop: "3px solid var(--red-2)", marginBottom: 40 }}>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "0 0 16px", color: "var(--strong)" }}>
          Upload New Content Asset
        </h2>

        <div className="cards" style={{ gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <label>
            Content type *
            <select value={kind} onChange={(e) => setKind(e.target.value)}>
              {kinds.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Title / Headline *
            <input name="title" required placeholder="e.g. Tata Steel Chaukhat" />
          </label>
        </div>

        <div className="cards" style={{ gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <label>
            Category
            <input name="category" placeholder="Steel, Windows, Kitchen, Railings..." />
          </label>
          <label>
            Description / Details
            <input name="description" placeholder="Material grade, dimensions, or service items..." />
          </label>
        </div>

        <label>
          Photos &amp; Videos <span className="muted">(JPG, PNG, WEBP, MP4 — up to 50 files)</span>
          <input
            name="images"
            type="file"
            accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime"
            multiple
          />
        </label>

        <button className="btn primary" type="submit" style={{ padding: "12px 24px", fontSize: "0.95rem", borderRadius: 8, marginTop: 6 }}>
          Publish Content Asset →
        </button>

        {status && (
          <p role="status" className="eyebrow" style={{ color: "var(--red-2)", margin: "10px 0 0", fontWeight: 700 }}>
            {status}
          </p>
        )}
      </form>

      {/* Uploaded Media Management Section */}
      <div style={{ marginTop: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 18 }}>
          <div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0, color: "var(--strong)" }}>
              Uploaded Media Assets ({filteredItems.length})
            </h2>
            <p className="muted" style={{ margin: "4px 0 0", fontSize: "0.88rem" }}>
              Click Delete on any asset to initiate the 3-step verification process.
            </p>
          </div>

          {/* Filter Pills */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["All", "Gallery", "Product", "Project", "Service"].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setSelectedFilter(f)}
                style={{
                  fontSize: "0.8rem",
                  padding: "6px 14px",
                  borderRadius: 20,
                  border: "1px solid var(--border)",
                  background: selectedFilter === f ? "var(--red-2)" : "var(--surface)",
                  color: selectedFilter === f ? "#fff" : "var(--text)",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="card" style={{ padding: "32px", textAlign: "center", borderRadius: 10 }}>
            <p className="muted">Loading media assets...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <div
            className="cards"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 16
            }}
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="card"
                style={{
                  padding: 0,
                  overflow: "hidden",
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div style={{ position: "relative", aspectRatio: "16/10", background: "#111", overflow: "hidden" }}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/media/owner/sparsh-trading-operations-partner-pratapgarh.webp";
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      background: "rgba(0,0,0,0.75)",
                      color: "#fff",
                      padding: "2px 8px",
                      borderRadius: 12,
                      fontSize: "0.7rem",
                      fontWeight: 700
                    }}
                  >
                    {item.type}
                  </span>
                </div>

                <div style={{ padding: "14px 14px 10px" }}>
                  <span className="eyebrow" style={{ color: "var(--red-2)", fontSize: "0.7rem", margin: 0 }}>
                    {item.category}
                  </span>
                  <h3 style={{ fontSize: "0.98rem", fontWeight: 700, margin: "2px 0 6px", color: "var(--strong)", lineHeight: 1.3 }}>
                    {item.title}
                  </h3>
                </div>

                <div style={{ padding: "10px 14px", borderTop: "1px solid var(--border)", background: "var(--surface-2)" }}>
                  <button
                    type="button"
                    onClick={() => startDelete(item)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: "var(--red-2)",
                      background: "rgba(217, 45, 32, 0.08)",
                      border: "1px solid rgba(217, 45, 32, 0.3)",
                      borderRadius: 6,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6
                    }}
                  >
                    🗑️ Delete Asset
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ padding: "40px 20px", textAlign: "center", borderRadius: 10, border: "1px dashed var(--border)" }}>
            <p className="muted" style={{ margin: 0 }}>No media assets found in this category.</p>
          </div>
        )}
      </div>

      {/* 3-Step Verification Delete Modal */}
      {deleteTarget && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: 480,
              width: "100%",
              padding: "28px 24px",
              borderRadius: 14,
              border: "2px solid var(--red-2)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              background: "var(--surface)"
            }}
          >
            {/* Step Indicators */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div style={{ display: "flex", gap: 6 }}>
                {[1, 2, 3].map((step) => (
                  <span
                    key={step}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.78rem",
                      fontWeight: 800,
                      background: deleteStep === step ? "var(--red-2)" : deleteStep > step ? "#16a34a" : "var(--surface-2)",
                      color: deleteStep >= step ? "#ffffff" : "var(--muted)",
                      border: "1px solid var(--border)"
                    }}
                  >
                    {deleteStep > step ? "✓" : step}
                  </span>
                ))}
              </div>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--red-2)", textTransform: "uppercase" }}>
                Step {deleteStep} of 3 Verification
              </span>
            </div>

            {/* Step 1: Preview & Target Confirmation */}
            {deleteStep === 1 && (
              <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: "0 0 10px", color: "var(--strong)" }}>
                  Step 1: Confirm Media Asset
                </h3>
                <p className="muted" style={{ fontSize: "0.88rem", lineHeight: 1.5, margin: "0 0 16px" }}>
                  Please review the item you have selected for deletion.
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "center",
                    padding: 12,
                    borderRadius: 8,
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    marginBottom: 20
                  }}
                >
                  <img
                    src={deleteTarget.imageUrl}
                    alt={deleteTarget.title}
                    style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 6, border: "1px solid var(--border)" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/media/owner/sparsh-trading-operations-partner-pratapgarh.webp";
                    }}
                  />
                  <div>
                    <span style={{ fontSize: "0.72rem", color: "var(--red-2)", fontWeight: 700 }}>
                      {deleteTarget.type} • {deleteTarget.category}
                    </span>
                    <h4 style={{ margin: "2px 0 0", fontSize: "0.95rem", fontWeight: 700, color: "var(--strong)" }}>
                      {deleteTarget.title}
                    </h4>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                  <button type="button" onClick={closeDeleteModal} className="btn" style={{ fontSize: "0.88rem" }}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteStep(2)}
                    className="btn primary"
                    style={{ fontSize: "0.88rem" }}
                  >
                    Next: Acknowledge Risk →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Risk Acknowledgment Checkbox */}
            {deleteStep === 2 && (
              <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: "0 0 10px", color: "var(--strong)" }}>
                  Step 2: Acknowledge Deletion Risk
                </h3>
                <div
                  style={{
                    padding: 14,
                    borderRadius: 8,
                    background: "rgba(217, 45, 32, 0.1)",
                    border: "1px solid rgba(217, 45, 32, 0.3)",
                    marginBottom: 16,
                    fontSize: "0.88rem",
                    lineHeight: 1.55,
                    color: "var(--strong)"
                  }}
                >
                  ⚠️ <strong>Warning:</strong> Deleting this asset will permanently remove it from the live catalogue and file storage. Any visitors viewing this product/project will no longer see this image.
                </div>

                <label
                  style={{
                    display: "flex",
                    alignItems: "start",
                    gap: 10,
                    cursor: "pointer",
                    fontSize: "0.88rem",
                    lineHeight: 1.45,
                    margin: "0 0 20px"
                  }}
                >
                  <input
                    type="checkbox"
                    checked={acknowledgedRisk}
                    onChange={(e) => setAcknowledgedRisk(e.target.checked)}
                    style={{ marginTop: 3, width: 16, height: 16, accentColor: "var(--red-2)" }}
                  />
                  <span>
                    I confirm that I understand this asset is no longer needed and will be permanently deleted.
                  </span>
                </label>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <button type="button" onClick={() => setDeleteStep(1)} className="btn" style={{ fontSize: "0.88rem" }}>
                    ← Back
                  </button>
                  <button
                    type="button"
                    disabled={!acknowledgedRisk}
                    onClick={() => setDeleteStep(3)}
                    className="btn primary"
                    style={{ fontSize: "0.88rem" }}
                  >
                    Next: Security Confirmation →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Type DELETE Confirmation */}
            {deleteStep === 3 && (
              <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: "0 0 10px", color: "var(--strong)" }}>
                  Step 3: Security Passkey Verification
                </h3>
                <p className="muted" style={{ fontSize: "0.88rem", lineHeight: 1.5, margin: "0 0 14px" }}>
                  Type <strong style={{ color: "var(--red-2)", letterSpacing: "0.05em" }}>DELETE</strong> in capital letters below to authorize permanent destruction of <strong>{deleteTarget.title}</strong>:
                </p>

                <input
                  type="text"
                  value={confirmPhrase}
                  onChange={(e) => setConfirmPhrase(e.target.value)}
                  placeholder="Type DELETE"
                  autoFocus
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: 8,
                    border: "2px solid var(--border)",
                    fontSize: "1rem",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    marginBottom: 16,
                    background: "var(--surface-2)",
                    color: "var(--strong)"
                  }}
                />

                {deleteMsg && (
                  <p style={{ margin: "0 0 14px", fontSize: "0.88rem", fontWeight: 700, color: "var(--red-2)" }}>
                    {deleteMsg}
                  </p>
                )}

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <button
                    type="button"
                    disabled={deleting}
                    onClick={() => setDeleteStep(2)}
                    className="btn"
                    style={{ fontSize: "0.88rem" }}
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    disabled={confirmPhrase.trim().toUpperCase() !== "DELETE" || deleting}
                    onClick={executePermanentDelete}
                    style={{
                      padding: "10px 18px",
                      borderRadius: 8,
                      background: confirmPhrase.trim().toUpperCase() === "DELETE" ? "var(--red-2)" : "#7f1d1d",
                      color: "#ffffff",
                      border: "none",
                      fontWeight: 800,
                      fontSize: "0.9rem",
                      cursor: confirmPhrase.trim().toUpperCase() === "DELETE" ? "pointer" : "not-allowed",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6
                    }}
                  >
                    {deleting ? "Erasing..." : "🗑️ Confirm Permanent Delete"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}