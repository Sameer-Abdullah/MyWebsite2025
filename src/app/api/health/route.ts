import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    env: process.env.NODE_ENV || "development",
    hasResendKey: Boolean(process.env.RESEND_API_KEY),
  });
}

