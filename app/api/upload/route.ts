import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { requireApiAuth } from "@/lib/auth";
import { ok, fail, handleError, verifyAllowedOrigin } from "@/lib/api";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

const MIME_EXTENSION_MAP: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "video/mp4": ".mp4",
  "video/webm": ".webm",
  "video/quicktime": ".mov",
  "application/pdf": ".pdf"
};

export async function POST(request: Request) {
  try {
    if (!verifyAllowedOrigin(request)) {
      return fail("Cross-origin upload blocked.", 403);
    }

    const session = await requireApiAuth(["SUPER_ADMIN", "ADMIN", "STAFF", "CUSTOMER"]);

    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`upload_${session.id}_${clientIp}`, { limit: 15, windowMs: 5 * 60 * 1000 });
    if (!rateCheck.allowed) {
      return fail("Upload rate limit exceeded. Please wait a few minutes.", 429);
    }

    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return fail("File is required", 422);

    const safeExtension = MIME_EXTENSION_MAP[file.type.toLowerCase()];
    if (!safeExtension) {
      return fail("Unsupported file type. Allowed formats: JPG, PNG, WEBP, PDF, MP4, WEBM.", 422);
    }

    if (file.size > 25 * 1024 * 1024) {
      return fail("File must be 25MB or smaller", 422);
    }

    const bytes = Buffer.from(await file.arrayBuffer());

    // Basic file magic number validation
    if (file.type.startsWith("image/png") && (bytes[0] !== 0x89 || bytes[1] !== 0x50 || bytes[2] !== 0x4e || bytes[3] !== 0x47)) {
      return fail("Corrupted or invalid PNG image file.", 422);
    }
    if (file.type.startsWith("image/jpeg") && (bytes[0] !== 0xff || bytes[1] !== 0xd8)) {
      return fail("Corrupted or invalid JPEG image file.", 422);
    }
    if (file.type === "application/pdf" && !bytes.subarray(0, 4).toString().startsWith("%PDF")) {
      return fail("Corrupted or invalid PDF document.", 422);
    }

    const uniqueId = crypto.randomUUID();
    const safeName = `${uniqueId}${safeExtension}`;
    const sanitizedOriginalName = path.basename(file.name).replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);

    const dir = path.join(process.cwd(), process.env.UPLOAD_DIR || "public/uploads");
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, safeName), bytes);

    return ok({
      file: {
        url: `/uploads/${safeName}`,
        name: sanitizedOriginalName,
        type: file.type,
        size: file.size
      }
    });
  } catch (error) {
    return handleError(error);
  }
}
