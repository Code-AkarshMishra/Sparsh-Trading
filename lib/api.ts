import { NextResponse } from "next/server";
import { ZodError } from "zod";

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status = 400, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export function ok(data: unknown = {}) {
  return NextResponse.json({ ok: true, data });
}

export function fail(message: string, status = 400, details?: unknown) {
  return NextResponse.json({ ok: false, message, details }, { status });
}

export function handleError(error: unknown) {
  if (error instanceof ApiError) {
    return fail(error.message, error.status, error.details);
  }
  if (error instanceof ZodError) {
    return fail("Validation failed", 422, error.flatten());
  }
  if (error instanceof Error && "status" in error && typeof (error as any).status === "number") {
    return fail(error.message, Number((error as any).status));
  }
  console.error("Unhandled API Error:", error);
  return fail("Something went wrong. Please try again.", 500);
}

export function verifyAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // Non-browser / same-origin GET/requests without Origin header
  
  const host = request.headers.get("host");
  try {
    const originUrl = new URL(origin);
    if (host && (originUrl.host === host || originUrl.host.toLowerCase() === host.toLowerCase())) {
      return true;
    }
    const allowedDomains = [
      "sparshtrading.shop",
      "www.sparshtrading.shop",
      "localhost:3000",
      "localhost:3001",
      "127.0.0.1:3000"
    ];
    return allowedDomains.includes(originUrl.host);
  } catch {
    return false;
  }
}

export async function parseJson<T>(request: Request): Promise<T> {
  return request.json() as Promise<T>;
}

