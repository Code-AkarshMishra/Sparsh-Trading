"use client";
import { FormEvent, useState } from "react";

const kinds = ["Product", "Project", "Service", "Gallery"];
export default function ContentManager() {
    const [kind, setKind] = useState("Product");
    const [status, setStatus] = useState("");
    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault(); setStatus("Publishing...");
        const form = new FormData(event.currentTarget); const files = Array.from(form.getAll("images")).filter((file): file is File => file instanceof File && file.size > 0).slice(0, 50);
        const images = await Promise.all(files.map(async (file) => { const upload = new FormData(); upload.append("file", file); const result = await fetch("/api/upload", { method: "POST", body: upload }); return (await result.json()).data.file; }));
        const title = String(form.get("title") || ""); const payload: any = kind === "Service" ? { slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""), title, category: form.get("category"), description: form.get("description"), items: String(form.get("description") || "").split(",").map((x) => x.trim()).filter(Boolean), images, published: true } : kind === "Gallery" ? images.map((image) => ({ title, category: form.get("category"), image, published: true })) : { [kind === "Product" ? "name" : "title"]: title, category: form.get("category"), description: form.get("description"), images, published: true, featured: kind === "Project" };
        const endpoint = kind === "Gallery" ? "/api/gallery" : `/api/${kind.toLowerCase()}s`; const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        setStatus(response.ok ? `${kind} published successfully.` : "Could not publish. Please check the form and try again."); if (response.ok) event.currentTarget.reset();
    }
    return <div className="wrap"><span className="eyebrow">Content manager</span><h1 className="display big-title">Publish your work.</h1><p className="muted">Add products, projects, services or up to 50 gallery photos/videos. Assign each upload to a category so visitors can find it.</p><form className="form card content-form" onSubmit={submit}><label>Content type<select value={kind} onChange={(e) => setKind(e.target.value)}>{kinds.map((item) => <option key={item}>{item}</option>)}</select></label><label>Title<input name="title" required /></label><label>Category<input name="category" placeholder="Steel, Windows, Kitchen..." /></label><label>Description / service items<input name="description" placeholder="Use commas between service items" /></label><label>Photos and videos <span className="muted">(up to 50 files)</span><input name="images" type="file" accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime" multiple /></label><button className="btn primary" type="submit">Publish content</button>{status && <p role="status" className="eyebrow">{status}</p>}</form></div>;
}