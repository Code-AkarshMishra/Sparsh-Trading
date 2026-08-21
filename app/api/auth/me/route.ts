import { getSession } from "@/lib/auth";
import { ok } from "@/lib/api";

export async function GET() {
  return ok({ user: await getSession() });
}
