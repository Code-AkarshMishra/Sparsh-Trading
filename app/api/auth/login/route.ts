import { z } from "zod";
import { createSession, findUserByLogin, verifyPassword } from "@/lib/auth";
import { ok, fail, handleError } from "@/lib/api";
import { ActivityLog } from "@/models/Core";

const schema = z.object({ login: z.string().min(3), password: z.string().min(1) });

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    const user = await findUserByLogin(body.login);
    if (!user || user.status !== "ACTIVE") return fail("Invalid login details.", 401);
    const valid = await verifyPassword(body.password, user.passwordHash);
    if (!valid) return fail("Invalid login details.", 401);
    await ActivityLog.create({ user: user._id, action: `${user.role}_LOGGED_IN`, entity: "User", entityId: String(user._id) });
    await createSession({ id: String(user._id), role: user.role, name: user.name, email: user.email, phone: user.phone });
    return ok({ user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    return handleError(error);
  }
}
