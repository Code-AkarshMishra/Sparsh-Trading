import { connectDB } from "@/lib/db";
import { requireApiAuth } from "@/lib/auth";
import { ok, fail, handleError, verifyAllowedOrigin } from "@/lib/api";
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
    if (!verifyAllowedOrigin(request)) {
      return fail("Cross-origin request blocked.", 403);
    }
    await connectDB();
    await requireApiAuth(["SUPER_ADMIN", "ADMIN"]);
    return ok({ service: await Service.create(await request.json()) });
  } catch (error) {
    return handleError(error);
  }
}
