import { connectDB } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { ok, handleError } from "@/lib/api";
import { Project } from "@/models/Core";
import { defaultProjects } from "@/lib/projectsData";

export async function GET() {
  try {
    const db = await connectDB();
    if (db) {
      try {
        const projects = await Project.find({ published: true }).sort({ featured: -1, createdAt: -1 }).lean();
        if (projects && projects.length > 0) return ok({ projects });
      } catch {
        // Fallback
      }
    }
    return ok({ projects: defaultProjects });
  } catch (error) {
    return handleError(error);
  }
}


export async function POST(request: Request) {
  try {
    const db = await connectDB();
    await requireUser(["SUPER_ADMIN", "ADMIN"]);
    if (db) {
      return ok({ project: await Project.create(await request.json()) });
    }
    return ok({ project: { ...await request.json(), _id: `prj_${Date.now()}` } });
  } catch (error) {
    return handleError(error);
  }
}

