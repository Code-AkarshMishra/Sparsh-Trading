import { clearSession } from "@/lib/auth";
import { ok } from "@/lib/api";

export async function POST() {
  await clearSession();
  return ok();
}
