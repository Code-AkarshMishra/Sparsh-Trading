import { z } from "zod";
import { createSession, findUserByLogin, verifyPassword } from "@/lib/auth";
import { ok, fail, handleError } from "@/lib/api";
import { ActivityLog } from "@/models/Core";

const schema = z.object({
  login: z.string().min(3),
  password: z.string().min(1),
  portal: z.enum(["customer", "admin"]).optional().default("customer"),
  honeypot: z.string().optional() // Anti-bot trap field
});

export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const body = schema.parse(raw);

    // 1. Anti-Bot Honeypot Defense (Bots automatically fill all input fields)
    if (body.honeypot && body.honeypot.trim().length > 0) {
      console.warn("Spam Bot blocked by Honeypot trap on login route");
      return fail("Security verification failed.", 400);
    }

    const user = await findUserByLogin(body.login);
    if (!user || user.status !== "ACTIVE") {
      return fail("Invalid credentials or unregistered account.", 401);
    }

    const valid = await verifyPassword(body.password, user.passwordHash);
    if (!valid) {
      return fail("Invalid credentials or password.", 401);
    }

    const isAdminRole = user.role === "SUPER_ADMIN" || user.role === "ADMIN" || user.role === "STAFF";

    // 2. Separate Admin vs Customer Portals to defeat cross-credential bot scanning
    if (body.portal === "admin" && !isAdminRole) {
      return fail("Access denied. Administrative & Staff credentials required.", 403);
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
