import { connectDB } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { ok, handleError } from "@/lib/api";
import { Product } from "@/models/Core";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");
    const filter: Record<string, unknown> = { published: true };
    for (const key of ["category", "material", "design", "application"]) if (searchParams.get(key)) filter[key] = searchParams.get(key);
    if (q) filter.$text = { $search: q };
    const products = await Product.find(filter).sort({ createdAt: -1 }).limit(100).lean();
    return ok({ products });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    await requireUser(["SUPER_ADMIN", "ADMIN"]);
    const product = await Product.create(await request.json());
    return ok({ product });
  } catch (error) {
    return handleError(error);
  }
}
