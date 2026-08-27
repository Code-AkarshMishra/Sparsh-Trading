import { z } from "zod";
import { connectDB } from "@/lib/db";
import { createSession, hashPassword } from "@/lib/auth";
import { ok, fail, handleError, verifyAllowedOrigin } from "@/lib/api";
import { User } from "@/models/User";
import { ActivityLog } from "@/models/Core";
import { fallbackStore } from "@/lib/offlineStore";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

const schema = z.object({
  name: z.string().min(2).max(100).trim(),
  phone: z.string().min(10).max(15).regex(/^[0-9+ -]+$/, "Invalid phone number format"),
  email: z.string().email().max(100).optional().or(z.literal("")),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100)
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  address: z.string().max(200).optional()
});

export async function POST(request: Request) {
  try {
    if (!verifyAllowedOrigin(request)) {
      return fail("Cross-origin registration blocked.", 403);
    }

    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`register_${clientIp}`, { limit: 5, windowMs: 15 * 60 * 1000 });
    if (!rateCheck.allowed) {
      return fail("Too many registration attempts from this network. Please try again later.", 429);
    }

    const body = schema.parse(await request.json());
    const email = body.email ? body.email.toLowerCase().trim() : undefined;
    const passwordHash = await hashPassword(body.password);

    const db = await connectDB();

    if (db) {
      try {
        const exists = await User.findOne({ $or: [{ phone: body.phone }, ...(email ? [{ email }] : [])] });
        if (exists) return fail("A customer with this phone or email already exists.", 409);
        const user = await User.create({ ...body, email, passwordHash, role: "CUSTOMER" });
        await ActivityLog.create({ user: user._id, action: "CUSTOMER_REGISTERED", entity: "User", entityId: String(user._id) }).catch(() => null);
        await createSession({ id: String(user._id), role: user.role, name: user.name, email: user.email, phone: user.phone });
        return ok({ user: { id: user._id, name: user.name, role: user.role } });
      } catch (dbErr) {
        console.warn("MongoDB write failed, using local offline fallback:", dbErr);
      }
    }

    // Offline / Local storage fallback
    const existsOffline = fallbackStore.findUserByLogin(body.phone) || (email ? fallbackStore.findUserByLogin(email) : null);
    if (existsOffline) return fail("A customer with this phone or email already exists.", 409);

    const newUser = fallbackStore.createUser({
      name: body.name,
      phone: body.phone,
      email,
      passwordHash,
      role: "CUSTOMER",
      status: "ACTIVE",
      address: body.address
    });

    await createSession({ id: newUser.id, role: newUser.role, name: newUser.name, email: newUser.email, phone: newUser.phone });
    return ok({ user: { id: newUser.id, name: newUser.name, role: newUser.role } });
  } catch (error) {
    return handleError(error);
  }
}
