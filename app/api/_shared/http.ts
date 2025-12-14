import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function readJson<T>(req: Request): Promise<T> {
  try {
    return (await req.json()) as T;
  } catch {
    throw new Error("Invalid JSON body");
  }
}

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, { status: 200, ...init });
}

export function badRequest(message: string, details?: unknown) {
  return NextResponse.json({ error: message, details }, { status: 400 });
}

export function serverError(message: string, details?: unknown) {
  return NextResponse.json({ error: message, details }, { status: 500 });
}

export function fromZodError(err: ZodError) {
  return badRequest("Validation failed", err.flatten());
}
