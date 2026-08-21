import { connectDB } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { ok, handleError } from "@/lib/api";
import { Service } from "@/models/Core";

export async function GET() {
  try {
    await connectDB();
    return ok({ services: await Service.find({ published: true }).sort({ title: 1 }).lean() });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    await requireUser(["SUPER_ADMIN", "ADMIN"]);
    return ok({ service: await Service.create(await request.json()) });
  } catch (error) {
    return handleError(error);
  }
}
