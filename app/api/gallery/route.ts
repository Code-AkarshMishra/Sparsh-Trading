import { connectDB } from "@/lib/db";
import { requireApiAuth } from "@/lib/auth";
import { ok, fail, handleError, verifyAllowedOrigin } from "@/lib/api";
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
    if (!verifyAllowedOrigin(request)) {
      return fail("Cross-origin request blocked.", 403);
    }
    const db = await connectDB();
    await requireApiAuth(["SUPER_ADMIN", "ADMIN"]);
    const body = await request.json();
    if (db) {
      return ok({ gallery: await GalleryItem.insertMany(body) });
    }
    return ok({ gallery: body });
  } catch (error) {
    return handleError(error);
  }
}