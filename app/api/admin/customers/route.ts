import { connectDB } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { ok, handleError } from "@/lib/api";
import { User } from "@/models/User";

export async function GET() {
  try {
    await connectDB();
    await requireUser(["SUPER_ADMIN", "ADMIN"]);
    return ok({ customers: await User.find({ role: "CUSTOMER" }).select("-passwordHash").sort({ createdAt: -1 }).lean() });
  } catch (error) {
    return handleError(error);
  }
}
