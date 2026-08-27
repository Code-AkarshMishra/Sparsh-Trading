import { z } from "zod";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { fallbackStore } from "@/lib/offlineStore";
import { ok, fail, handleError, verifyAllowedOrigin } from "@/lib/api";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { ActivityLog } from "@/models/Core";

const schema = z.object({
  login: z.string().min(3).max(100).trim(),
  token: z.string().min(4).max(100).trim(),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100)
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number")
});

export async function POST(request: Request) {
  try {
    if (!verifyAllowedOrigin(request)) {
      return fail("Cross-origin request blocked.", 403);
    }

    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`reset_pw_${clientIp}`, { limit: 5, windowMs: 15 * 60 * 1000 });
    if (!rateCheck.allowed) {
      return fail("Too many attempts. Please try again after 15 minutes.", 429);
    }

    const raw = await request.json();
    const body = schema.parse(raw);

    const tokenHash = crypto.createHash("sha256").update(body.token.trim()).digest("hex");
    const newPasswordHash = await bcrypt.hash(body.newPassword, 10);

    let resetSucceeded = false;
    let updatedUserId = "";

    const db = await connectDB();
    if (db) {
      try {
        const user = await User.findOne({
          $or: [{ email: body.login.toLowerCase() }, { phone: body.login }]
        }).select("+resetTokenHash +resetTokenExpiresAt");

        if (user && user.resetTokenHash && user.resetTokenExpiresAt) {
          const isExpired = new Date(user.resetTokenExpiresAt).getTime() < Date.now();
          const isMatch = user.resetTokenHash === tokenHash;

          if (!isExpired && isMatch) {
            user.passwordHash = newPasswordHash;
            // Immediate one-time single-use invalidation
            user.resetTokenHash = undefined;
            user.resetTokenExpiresAt = undefined;
            await user.save();
            resetSucceeded = true;
            updatedUserId = String(user._id);

            await ActivityLog.create({
              user: user._id,
              action: "PASSWORD_RESET_COMPLETED",
              entity: "User",
              entityId: String(user._id)
            }).catch(() => null);
          }
        }
      } catch (err) {
        console.warn("DB reset execution note:", err);
      }
    }

    // Fallback store reset execution
    const offlineSuccess = fallbackStore.updatePasswordWithToken(body.login, tokenHash, newPasswordHash);
    if (offlineSuccess) {
      resetSucceeded = true;
    }

    if (!resetSucceeded) {
      return fail("Invalid, expired, or already-used reset token. Please request a new one.", 400);
    }

    return ok({
      message: "Password reset successful! You can now log in securely with your new password."
    });
  } catch (error) {
    return handleError(error);
  }
}
