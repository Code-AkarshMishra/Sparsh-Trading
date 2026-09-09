import { z } from "zod";
import crypto from "crypto";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { fallbackStore } from "@/lib/offlineStore";
import { ok, fail, handleError, verifyAllowedOrigin } from "@/lib/api";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { sendPasswordResetEmail } from "@/lib/mail";

const schema = z.object({
  login: z.string().min(3).max(100).trim(),
  honeypot: z.string().optional()
});

function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!domain) return email;
  if (user.length <= 3) {
    return `${user[0]}***@${domain}`;
  }
  return `${user.slice(0, 2)}${"*".repeat(Math.min(user.length - 3, 5))}${user.slice(-1)}@${domain}`;
}

export async function POST(request: Request) {
  try {
    if (!verifyAllowedOrigin(request)) {
      return fail("Cross-origin request blocked.", 403);
    }

    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`forgot_pw_${clientIp}`, { limit: 5, windowMs: 15 * 60 * 1000 });
    if (!rateCheck.allowed) {
      return fail("Too many password reset requests. Please try again after 15 minutes.", 429);
    }

    const raw = await request.json();
    const body = schema.parse(raw);

    if (body.honeypot && body.honeypot.trim().length > 0) {
      return fail("Security verification failed.", 400);
    }

    // Generate a secure, high-entropy 6-digit one-time PIN token
    const tokenBuffer = crypto.randomBytes(3);
    const resetToken = (tokenBuffer.readUIntBE(0, 3) % 900000 + 100000).toString();
    const tokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiration

    const db = await connectDB();
    let accountFound = false;
    let targetEmail: string | undefined;
    let userName: string | undefined;

    if (db) {
      try {
        const user = await User.findOne({
          $or: [{ email: body.login.toLowerCase() }, { phone: body.login }]
        });
        if (user) {
          user.resetTokenHash = tokenHash;
          user.resetTokenExpiresAt = expiresAt;
          await user.save();
          accountFound = true;
          targetEmail = user.email;
          userName = user.name;
        }
      } catch (err) {
        console.warn("DB reset token error:", err);
      }
    }

    // Also update offline store
    const offlineUser = fallbackStore.findUserByLogin(body.login);
    if (offlineUser) {
      accountFound = true;
      targetEmail = targetEmail || offlineUser.email;
      userName = userName || offlineUser.name;
      fallbackStore.setResetToken(body.login, tokenHash, expiresAt.toISOString());
    }

    if (!accountFound) {
      return fail("No account found with this mobile number or email. Please verify your details or register a new account.", 404);
    }

    if (!targetEmail) {
      return fail(
        "No email address is linked to this account for password recovery. Please contact Sparsh Trading support at +91 8795662161 or mail.sparshtrading@gmail.com to update your credentials.",
        400
      );
    }

    // Dispatch verification code directly to the user's registered email
    const mailResult = await sendPasswordResetEmail(targetEmail, resetToken, userName);
    if (!mailResult.success) {
      return fail("Failed to send reset code email. Please check your connection or try again shortly.", 500);
    }

    const masked = maskEmail(targetEmail);
    return ok({
      message: `A 6-digit verification code has been sent to your registered email (${masked}). Please check your inbox and spam folder.`,
      maskedEmail: masked
    });
  } catch (error) {
    return handleError(error);
  }
}
