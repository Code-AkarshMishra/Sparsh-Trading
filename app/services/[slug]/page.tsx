import { notFound } from "next/navigation";
import Link from "next/link";
import { services } from "@/lib/business";
import { connectDB } from "@/lib/db";
import { Service } from "@/models/Core";
import { getMediaByService } from "@/lib/mediaData";

export const dynamic = "force-dynamic";

type ServiceView = {
  title: string;
  category: string;
  description?: string;
  items: string[];
  images?: { url?: string; name?: string }[];
};

export default async function ServiceDetail({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fallback = services.find((s) => s.slug === slug) as ServiceView | undefined;
  let service: ServiceView | undefined = fallback;

  try {
    await connectDB();
    service =
      ((await Service.findOne({ slug, published: true }).lean()) as unknown as ServiceView | null) ||
      fallback;
  } catch {
    /* Static catalogue fallback */
  }

  if (!service) notFound();

  // Fetch all photos and videos for this specific service
  const serviceMedia = getMediaByService(slug);

  return (
    <main className="section grid-bg subpage-main">
      <div className="wrap">
        <span className="eyebrow">{service.category}</span>
        <h1 className="display big-title">{service.title}</h1>
        <p className="section-lead">
          {service.description ||
            `Practical ${service.title.toLowerCase()} solutions planned, fabricated and installed with precision by Sparsh Trading.`}
        </p>

        {/* Media Section: Photos & Videos for this service */}
        <div style={{ marginTop: 24, marginBottom: 48 }}>
          <h2 className="display" style={{ fontSize: "1.8rem", marginBottom: 8 }}>
            Photos &amp; Videos Showcase
          </h2>
          <p className="muted" style={{ marginBottom: 20 }}>
            Real workshop fabrication and installed site photos for {service.title}.
          </p>

          <div className="gallery-grid">
            {serviceMedia.map((media) => (
              <article className="media-card" key={media.id}>
                <span className="media-badge">
                  {media.type === "video" ? "▶ Video" : "📷 Photo"}
                </span>
                <div className="media-preview">
                  {media.type === "video" ? (
                    <video
                      src={media.url}
                      controls
                      playsInline
                      preload="metadata"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <img src={media.url} alt={media.title} />
                  )}
                </div>
                <div className="media-info">
                  <span className="eyebrow" style={{ fontSize: "0.72rem", marginBottom: 2 }}>
                    {media.category}
                  </span>
                  <h3>{media.title}</h3>
                  {media.description && <p>{media.description}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="split" style={{ alignItems: "start", marginTop: 32 }}>
          <section>
            <h2 className="display section-title">What we provide</h2>
            <div className="cards">
              {service.items.map((item: string) => (
                <div className="card process-step" key={item}>
                  <h3>{item}</h3>
                  <p className="muted">
                    Planned around your space, functional use, material grade and custom finish requirements.
                  </p>
                </div>
              ))}
            </div>
          </section>

          <aside className="card" style={{ padding: 32, position: "sticky", top: 88 }}>
            <span className="eyebrow">Need this service?</span>
            <h2 className="display" style={{ fontSize: "2rem", margin: "10px 0 14px" }}>
              Let's discuss it.
            </h2>
            <p className="muted" style={{ marginBottom: 24 }}>
              Share a brief requirement and our engineering and fabrication team in Pratapgarh will prepare a custom quotation.
            </p>
            <Link
              className="btn primary"
              href={`/contact?service=${encodeURIComponent(service.title)}`}
              style={{ width: "100%" }}
            >
              Request Quote
            </Link>
          </aside>
        </div>

        <div className="actions" style={{ marginTop: 48 }}>
          <Link className="btn" href="/services">
            &larr; All Services
          </Link>
          <Link className="btn" href="/gallery">
            Full Gallery
          </Link>
          <Link className="btn primary" href="/contact">
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
