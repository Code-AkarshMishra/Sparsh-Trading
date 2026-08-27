import { connectDB } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { ok, handleError } from "@/lib/api";
import { GalleryItem } from "@/models/Core";

export async function GET() {
  try {
    const db = await connectDB();
    if (db) {
      try {
        const gallery = await GalleryItem.find({ published: true }).sort({ createdAt: -1 }).lean();
        return ok({ gallery });
      } catch {
        // Fallback
      }
    }
    return ok({ gallery: [] });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    const db = await connectDB();
    await requireUser(["SUPER_ADMIN", "ADMIN"]);
    if (db) {
      return ok({ gallery: await GalleryItem.insertMany(await request.json()) });
    }
    return ok({ gallery: await request.json() });
  } catch (error) {
    return handleError(error);
  }
}