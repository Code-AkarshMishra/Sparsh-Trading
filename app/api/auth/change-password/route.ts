import { z } from "zod";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { requireApiAuth, verifyPassword } from "@/lib/auth";
import { User } from "@/models/User";
import { fallbackStore } from "@/lib/offlineStore";
import { ok, fail, handleError, verifyAllowedOrigin } from "@/lib/api";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { ActivityLog } from "@/models/Core";

const schema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z
    .string()
    .min(8, "New password must be at least 8 characters long")
    .max(100)
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number")
});

export async function POST(request: Request) {
  try {
    if (!verifyAllowedOrigin(request)) {
      return fail("Cross-origin request blocked.", 403);
    }

    const session = await requireApiAuth(["SUPER_ADMIN", "ADMIN", "STAFF", "CUSTOMER"]);

    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`change_pw_${session.id}_${clientIp}`, { limit: 5, windowMs: 15 * 60 * 1000 });
    if (!rateCheck.allowed) {
      return fail("Too many password change attempts. Please wait.", 429);
    }

    const raw = await request.json();
    const body = schema.parse(raw);

    const db = await connectDB();
    let updated = false;

    if (db) {
      const user = await User.findById(session.id).select("+passwordHash");
      if (user) {
        const valid = await verifyPassword(body.currentPassword, user.passwordHash);
        if (!valid) {
          return fail("Current password is incorrect.", 400);
        }
        user.passwordHash = await bcrypt.hash(body.newPassword, 10);
        await user.save();
        updated = true;

        await ActivityLog.create({
          user: user._id,
          action: "PASSWORD_CHANGED",
          entity: "User",
          entityId: String(user._id)
        }).catch(() => null);
      }
    }

    // Fallback store password update
    if (!updated) {
      const offlineUser = fallbackStore.getUsers().find((u) => u.id === session.id);
      if (offlineUser) {
        const valid = await verifyPassword(body.currentPassword, offlineUser.passwordHash);
        if (!valid) {
          return fail("Current password is incorrect.", 400);
        }
        const newHash = await bcrypt.hash(body.newPassword, 10);
        fallbackStore.updatePassword(session.id, newHash);
        updated = true;
      }
    }

    if (!updated) {
      return fail("User record could not be found.", 404);
    }

    return ok({ message: "Password updated successfully!" });
  } catch (error) {
    return handleError(error);
  }
}
