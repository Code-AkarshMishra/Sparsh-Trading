import { connectDB } from "@/lib/db";
import { requireApiAuth } from "@/lib/auth";
import { ok, handleError } from "@/lib/api";
import { User } from "@/models/User";

export async function GET() {
  try {
    await connectDB();
    await requireApiAuth(["SUPER_ADMIN", "ADMIN"]);
    return ok({ customers: await User.find({ role: "CUSTOMER" }).select("-passwordHash").sort({ createdAt: -1 }).lean() });
  } catch (error) {
    return handleError(error);
  }
}
