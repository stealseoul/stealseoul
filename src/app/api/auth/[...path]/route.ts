import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";

const notConfigured = () => NextResponse.json({ error: "Neon Auth not configured" }, { status: 503 });

const handlers = auth?.handler();

export const GET = handlers?.GET ?? notConfigured;
export const POST = handlers?.POST ?? notConfigured;
