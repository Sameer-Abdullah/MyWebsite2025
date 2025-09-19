import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const HAS_KEY = !!process.env.RESEND_API_KEY;
const resend = HAS_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));
    const email = body.email ?? body.from;
    const subject = body.subject;
    const message = body.message;

    if (!email || !subject || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing email/subject/message" },
        { status: 400 }
      );
    }

    if (!HAS_KEY) {
      return NextResponse.json(
        { ok: true, message: "Form received (email disabled in this environment)." },
        { status: 200 }
      );
    }

    const { data, error } = await resend!.emails.send({
      from: "Sameer <onboarding@resend.dev>", 
      to: ["sa.sameer.abdullah@gmail.com"],
      subject: `[Portfolio] ${subject}`,
      html: `
        <h2>New contact</h2>
        <p><b>From:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${String(message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (error) return NextResponse.json({ ok: false, error }, { status: 500 });
    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Unknown error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, emailEnabled: HAS_KEY, info: "POST to /api/email" });
}
