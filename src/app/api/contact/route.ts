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
      from: "Portfolio <onboarding@resend.dev>",   
      to: "sa.sameer.abdullah@gmail.com",          
      subject: subject || "New message from your portfolio",
      replyTo: from || undefined,                  
      text: `From: ${from || "unknown"}\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  }  catch (err: unknown) {                          
    const msg = err instanceof Error ? err.message : "Send failed";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
