import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function ok(data: unknown = {}) {
  return NextResponse.json({ ok: true, data });
}

export function fail(message: string, status = 400, details?: unknown) {
  return NextResponse.json({ ok: false, message, details }, { status });
}

export function handleError(error: unknown) {
  if (error instanceof ZodError) return fail("Validation failed", 422, error.flatten());
  if (error instanceof Error && "status" in error) return fail(error.message, Number(error.status));
  console.error(error);
  return fail("Something went wrong. Please try again.", 500);
}

export async function parseJson<T>(request: Request): Promise<T> {
  return request.json() as Promise<T>;
}
