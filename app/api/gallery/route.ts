import { connectDB } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { ok, handleError } from "@/lib/api";
import { GalleryItem } from "@/models/Core";

export async function GET() {
  try { await connectDB(); return ok({ gallery: await GalleryItem.find({ published: true }).sort({ createdAt: -1 }).lean() }); } catch (error) { return handleError(error); }
}

export async function POST(request: Request) {
  try { await connectDB(); await requireUser(["SUPER_ADMIN", "ADMIN"]); return ok({ gallery: await GalleryItem.insertMany(await request.json()) }); } catch (error) { return handleError(error); }
}