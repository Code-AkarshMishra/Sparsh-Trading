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

    const cleanToken = body.token.replace(/\D/g, "");
    if (cleanToken.length !== 6) {
      return fail("Verification code must be exactly 6 digits.", 400);
    }

    const tokenHash = crypto.createHash("sha256").update(cleanToken).digest("hex");
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
            await User.updateOne(
              { _id: user._id },
              {
                $set: { passwordHash: newPasswordHash },
                $unset: { resetTokenHash: 1, resetTokenExpiresAt: 1 }
              }
            );
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
    const offlineResult = fallbackStore.updatePasswordWithToken(body.login, tokenHash, newPasswordHash);
    if (offlineResult.success) {
      resetSucceeded = true;
    }

    if (!resetSucceeded) {
      if (offlineResult.reason === "TOKEN_MISMATCH") {
        return fail("The 6-digit verification code is incorrect. If you requested multiple codes, please enter the latest code received in your email.", 400);
      }
      if (offlineResult.reason === "TOKEN_EXPIRED") {
        return fail("This verification code has expired (15-minute time limit). Please request a new code.", 400);
      }
      if (offlineResult.reason === "NO_ACTIVE_TOKEN") {
        return fail("This verification code has already been used or no active reset request exists. Please request a new code.", 400);
      }
      return fail("Invalid or expired reset token. Please request a new code.", 400);
    }

    return ok({
      message: "Password reset successful! You can now log in securely with your new password."
    });
  } catch (error) {
    return handleError(error);
  }
}
