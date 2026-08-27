import { connectDB } from "@/lib/db";
import { requireApiAuth } from "@/lib/auth";
import { ok, fail, handleError, verifyAllowedOrigin } from "@/lib/api";
import { GalleryItem, Product, Project, Service, ActivityLog } from "@/models/Core";
import { unlink } from "fs/promises";
import path from "path";
import { z } from "zod";

const deleteSchema = z.object({
  id: z.string().optional(),
  type: z.enum(["Gallery", "Product", "Project", "Service", "File"]).optional(),
  fileUrl: z.string().optional()
});

export async function GET() {
  try {
    await requireApiAuth(["SUPER_ADMIN", "ADMIN", "STAFF"]);
    const db = await connectDB();

    let items: any[] = [];
    if (db) {
      const [gallery, products, projects, services] = await Promise.all([
        GalleryItem.find().sort({ createdAt: -1 }).limit(100).lean(),
        Product.find().sort({ createdAt: -1 }).limit(100).lean(),
        Project.find().sort({ createdAt: -1 }).limit(100).lean(),
        Service.find().sort({ createdAt: -1 }).limit(100).lean()
      ]);

      items = [
        ...gallery.map((g: any) => ({
          id: String(g._id),
          type: "Gallery",
          title: g.title || "Gallery Upload",
          category: g.category || "General",
          imageUrl: g.image?.url || (typeof g.image === "string" ? g.image : "/media/owner/sparsh-trading-operations-partner-pratapgarh.webp"),
          createdAt: g.createdAt
        })),
        ...products.map((p: any) => ({
          id: String(p._id),
          type: "Product",
          title: p.name || "Product",
          category: p.category || "Products",
          imageUrl: p.images?.[0]?.url || "/media/products/sparsh-tata-steel-door-frame-pratapgarh.webp",
          createdAt: p.createdAt
        })),
        ...projects.map((prj: any) => ({
          id: String(prj._id),
          type: "Project",
          title: prj.title || "Project",
          category: prj.category || "Projects",
          imageUrl: prj.images?.[0]?.url || "/media/projects/sparsh-tata-steel-chaukhat-installation-pratapgarh.webp",
          createdAt: prj.createdAt
        })),
        ...services.map((s: any) => ({
          id: String(s._id),
          type: "Service",
          title: s.title || "Service",
          category: s.category || "Services",
          imageUrl: s.images?.[0]?.url || "/media/products/sparsh-luxury-acrylic-modular-kitchen-pratapgarh.webp",
          createdAt: s.createdAt
        }))
      ];
    }

    return ok({ items });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    if (!verifyAllowedOrigin(request)) {
      return fail("Cross-origin delete blocked.", 403);
    }

    const session = await requireApiAuth(["SUPER_ADMIN", "ADMIN"]);
    const body = await request.json();
    const { id, type, fileUrl } = deleteSchema.parse(body);

    const db = await connectDB();

    // 1. Delete record from MongoDB
    if (db && id && type) {
      if (type === "Gallery") {
        await GalleryItem.findByIdAndDelete(id);
      } else if (type === "Product") {
        await Product.findByIdAndDelete(id);
      } else if (type === "Project") {
        await Project.findByIdAndDelete(id);
      } else if (type === "Service") {
        await Service.findByIdAndDelete(id);
      }

      await ActivityLog.create({
        user: session.id,
        action: "CONTENT_DELETED",
        entity: type,
        entityId: id,
        metadata: { fileUrl }
      }).catch(() => null);
    }

    // 2. If it's a locally uploaded file in /public/uploads/, safely delete from disk
    if (fileUrl && fileUrl.startsWith("/uploads/")) {
      try {
        const safeFileName = path.basename(fileUrl);
        const filePath = path.join(process.cwd(), "public", "uploads", safeFileName);
        await unlink(filePath).catch(() => null);
      } catch (err: any) {
        console.warn("File unlink error:", err.message);
      }
    }

    return ok({
      success: true,
      message: "Asset permanently deleted successfully."
    });
  } catch (error) {
    return handleError(error);
  }
}
