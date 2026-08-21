import { connectDB } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { ok, handleError } from "@/lib/api";
import { Project } from "@/models/Core";

export async function GET() {
  try {
    await connectDB();
    return ok({ projects: await Project.find({ published: true }).sort({ featured: -1, createdAt: -1 }).lean() });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    await requireUser(["SUPER_ADMIN", "ADMIN"]);
    return ok({ project: await Project.create(await request.json()) });
  } catch (error) {
    return handleError(error);
  }
}
