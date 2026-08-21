import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { requireUser } from "@/lib/auth";
import { ok, fail, handleError } from "@/lib/api";

const allowed = new Set(["image/jpeg", "image/png", "image/webp", "application/pdf"]);

export async function POST(request: Request) {
  try {
    await requireUser(["SUPER_ADMIN", "ADMIN", "STAFF", "CUSTOMER"]);
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return fail("File is required", 422);
    if (!allowed.has(file.type)) return fail("Unsupported file type", 422);
    if (file.size > 5 * 1024 * 1024) return fail("File must be 5MB or smaller", 422);
    const bytes = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name).toLowerCase() || `.${file.type.split("/")[1]}`;
    const name = `${crypto.randomUUID()}${ext}`;
    const dir = path.join(process.cwd(), process.env.UPLOAD_DIR || "public/uploads");
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, name), bytes);
    return ok({ file: { url: `/uploads/${name}`, name: file.name, type: file.type, size: file.size } });
  } catch (error) {
    return handleError(error);
  }
}
