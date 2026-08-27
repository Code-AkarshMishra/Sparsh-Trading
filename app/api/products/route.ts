import { connectDB } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { ok, handleError } from "@/lib/api";
import { Product } from "@/models/Core";
import { defaultProductsCatalogue } from "@/lib/productsData";


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.toLowerCase().trim();
    const category = searchParams.get("category");

    const db = await connectDB();
    if (db) {
      try {
        const filter: Record<string, unknown> = { published: true };
        for (const key of ["category", "material", "design", "application"]) {
          if (searchParams.get(key)) filter[key] = searchParams.get(key);
        }
        if (q) filter.$text = { $search: q };
        const products = await Product.find(filter).sort({ createdAt: -1 }).limit(100).lean();
        if (products && products.length > 0) {
          return ok({ products });
        }
      } catch {
        // Fallback to catalogue
      }
    }

    let filtered = defaultProductsCatalogue;
    if (category && category !== "All") {
      filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
    if (q) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q)
      );
    }

    return ok({ products: filtered });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    const db = await connectDB();
    await requireUser(["SUPER_ADMIN", "ADMIN"]);
    if (db) {
      const product = await Product.create(await request.json());
      return ok({ product });
    }
    return ok({ product: { ...await request.json(), _id: `p_${Date.now()}` } });
  } catch (error) {
    return handleError(error);
  }
}

