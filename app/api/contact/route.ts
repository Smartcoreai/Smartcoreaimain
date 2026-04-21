import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { insertLead } from "@/lib/db";
import { formRatelimit, getClientIp } from "@/lib/ratelimit";
import { ContactSchema, checkContentLength, escapeHtml } from "@/lib/validators";

export async function POST(req: NextRequest) {
  // Reject oversized bodies
  if (!checkContentLength(req)) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }

  // Rate limiting
  const ip = getClientIp(req);
  if (formRatelimit) {
    const { success, reset } = await formRatelimit.limit(ip);
    if (!success) {
      const retryAfter = Math.ceil((reset - Date.now()) / 1000);
      return NextResponse.json(
        { error: "For mange innsendinger. Prøv igjen om litt eller book en samtale direkte." },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      );
    }
  }

  // Parse JSON
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Ugyldig forespørsel" }, { status: 400 });
  }

  // Validate + strip HTML tags
  const result = ContactSchema.safeParse(raw);
  if (!result.success) {
    const msg = result.error.issues[0]?.message ?? "Ugyldig forespørsel";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  const { name, email, phone, business, message } = result.data;

  // Save to leads database
  try {
    insertLead({ name, email, company: business, message, source: "contact-form" });
  } catch (err) {
    console.error("Failed to save lead:", err);
  }

  // Send email via Resend (escapeHtml for HTML template only — data already stripped)
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "Ekspedenten <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL || "hei@ekspedenten.no",
        subject: `New enquiry from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #D4AF37;">New contact form submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666; width: 120px;">Name</td><td style="padding: 8px 0;"><strong>${escapeHtml(name)}</strong></td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Business</td><td style="padding: 8px 0;">${escapeHtml(business || "—")}</td></tr>
            </table>
            <hr style="margin: 16px 0; border: none; border-top: 1px solid #eee;" />
            <h3 style="color: #333; margin-bottom: 8px;">Message</h3>
            <p style="color: #444; line-height: 1.6;">${escapeHtml(message).replace(/\n/g, "<br>")}</p>
            <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
            <p style="color: #999; font-size: 12px;">Sent from ekspedenten.no contact form</p>
          </div>
        `,
      });
    } catch (err) {
      console.error("Email send failed:", err);
      // Still return success — lead was saved
    }
  }

  return NextResponse.json({ ok: true });
}
