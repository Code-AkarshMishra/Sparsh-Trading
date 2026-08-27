import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";
import { connectDB } from "@/lib/db";
import { fallbackStore, StoredUser } from "@/lib/offlineStore";

export type Role = "SUPER_ADMIN" | "ADMIN" | "STAFF" | "CUSTOMER";
export type SessionUser = { id: string; role: Role; name: string; email?: string; phone?: string };

const secret = () => new TextEncoder().encode(process.env.JWT_SECRET || "dev-only-change-this-secret");

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSession(user: SessionUser) {
  const token = await new SignJWT(user).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(secret());
  (await cookies()).set("st_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
}

export async function clearSession() {
  (await cookies()).delete("st_session");
}

export async function getSession(): Promise<SessionUser | null> {
  const token = (await cookies()).get("st_session")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload as SessionUser;
  } catch {
    return null;
  }
}

export function can(role: Role, allowed: Role[]) {
  return allowed.includes(role);
}

export async function requireUser(allowed?: Role[]) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  if (allowed && !can(session.role, allowed)) {
    if (session.role === "CUSTOMER") {
      redirect("/dashboard");
    }
    redirect("/login");
  }
  return session;
}

export async function requireApiAuth(allowed?: Role[]): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    throw new (await import("@/lib/api")).ApiError("Authentication required.", 401);
  }
  if (allowed && !can(session.role, allowed)) {
    throw new (await import("@/lib/api")).ApiError("Access denied. Insufficient permissions.", 403);
  }
  return session;
}

export async function findUserByLogin(login: string): Promise<any | null> {
  const db = await connectDB();
  if (db) {
    try {
      const user = await User.findOne({ $or: [{ email: login.toLowerCase() }, { phone: login }] }).select("+passwordHash");
      if (user) return user;
    } catch {
      // Fallback to offline store if query fails
    }
  }
  return fallbackStore.findUserByLogin(login);
}

