import { z } from "zod";
import { createSession, findUserByLogin, verifyPassword } from "@/lib/auth";
import { ok, fail, handleError, verifyAllowedOrigin } from "@/lib/api";
import { ActivityLog } from "@/models/Core";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

const schema = z.object({
  login: z.string().min(3).max(100),
  password: z.string().min(1).max(100),
  portal: z.enum(["customer", "admin"]).optional().default("customer"),
  honeypot: z.string().optional() // Anti-bot trap field
});

export async function POST(request: Request) {
  try {
    if (!verifyAllowedOrigin(request)) {
      return fail("Cross-origin login blocked.", 403);
    }

    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`login_${clientIp}`, { limit: 10, windowMs: 5 * 60 * 1000 });
    if (!rateCheck.allowed) {
      return fail("Too many login attempts. Please try again after 5 minutes.", 429);
    }

    const raw = await request.json();
    const body = schema.parse(raw);

    // 1. Anti-Bot Honeypot Defense (Bots automatically fill all input fields)
    if (body.honeypot && body.honeypot.trim().length > 0) {
      console.warn("Spam Bot blocked by Honeypot trap on login route");
      return fail("Security verification failed.", 400);
    }

    const user = await findUserByLogin(body.login);
    if (!user || user.status !== "ACTIVE") {
      return fail("Invalid credentials.", 401);
    }

    const valid = await verifyPassword(body.password, user.passwordHash);
    if (!valid) {
      return fail("Invalid credentials.", 401);
    }

    const isAdminRole = user.role === "SUPER_ADMIN" || user.role === "ADMIN" || user.role === "STAFF";

    // 2. Separate Admin vs Customer Portals to defeat cross-credential bot scanning
    if (body.portal === "admin" && !isAdminRole) {
      return fail("Access denied. Administrative credentials required.", 403);
    }

    if (body.portal === "customer" && isAdminRole) {
      return fail("Administrative account detected. Please login via the Management Portal (/admin-login).", 403);
    }

    const userId = String(user._id || user.id);
    await ActivityLog.create({
      user: user._id,
      action: `${user.role}_LOGGED_IN_${body.portal.toUpperCase()}`,
      entity: "User",
      entityId: userId
    }).catch(() => null);

    await createSession({
      id: userId,
      role: user.role,
      name: user.name,
      email: user.email,
      phone: user.phone
    });

    return ok({
      user: { id: userId, name: user.name, role: user.role, portal: body.portal },
      redirectTo: isAdminRole ? "/admin" : "/dashboard"
    });
  } catch (error) {
    return handleError(error);
  }
}
