import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { subject, message, from } = await req.json();

    if (!message) {
      return NextResponse.json({ ok: false, error: "Message is required" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",   // change to your verified domain later
      to: "sa.sameer.abdullah@gmail.com",          // <-- your inbox
      subject: subject || "New message from your portfolio",
      replyTo: from || undefined,                  // lets you reply to the sender
      text: `From: ${from || "unknown"}\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message ?? "Send failed" }, { status: 500 });
  }
}
