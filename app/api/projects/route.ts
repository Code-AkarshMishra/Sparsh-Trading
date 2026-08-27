import { connectDB } from "@/lib/db";
import { requireApiAuth } from "@/lib/auth";
import { ok, fail, handleError, verifyAllowedOrigin } from "@/lib/api";
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
    if (!verifyAllowedOrigin(request)) {
      return fail("Cross-origin request blocked.", 403);
    }
    const db = await connectDB();
    await requireApiAuth(["SUPER_ADMIN", "ADMIN"]);
    const body = await request.json();
    if (db) {
      return ok({ project: await Project.create(body) });
    }
    return ok({ project: { ...body, _id: `prj_${Date.now()}` } });
  } catch (error) {
    return handleError(error);
  }
}
