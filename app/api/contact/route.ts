import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { insertLead } from "@/lib/db";
import { formRatelimit, getClientIp } from "@/lib/ratelimit";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validateContact(body: unknown): { valid: boolean; error?: string } {
  if (!body || typeof body !== "object") return { valid: false, error: "Invalid request" };
  const b = body as Record<string, unknown>;

  if (typeof b.name !== "string" || b.name.trim().length < 2 || b.name.length > 100)
    return { valid: false, error: "Navn må være mellom 2 og 100 tegn" };

  if (typeof b.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) || b.email.length > 254)
    return { valid: false, error: "Ugyldig e-postadresse" };

  if (b.phone !== undefined && b.phone !== "") {
    if (typeof b.phone !== "string" || b.phone.length > 30)
      return { valid: false, error: "Ugyldig telefonnummer" };
  }

  if (b.business !== undefined && b.business !== "") {
    if (typeof b.business !== "string" || b.business.length > 200)
      return { valid: false, error: "Klinikknavnet er for langt" };
  }

  if (typeof b.message !== "string" || b.message.trim().length < 10 || b.message.length > 5000)
    return { valid: false, error: "Meldingen må være mellom 10 og 5000 tegn" };

  return { valid: true };
}

export async function POST(req: NextRequest) {
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

  const body = await req.json();
  const validation = validateContact(body);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { name, email, phone, business, message } = body as {
    name: string; email: string; phone?: string; business?: string; message: string;
  };

  // Save to leads database
  try {
    insertLead({ name, email, company: business, message, source: "contact-form" });
  } catch (err) {
    console.error("Failed to save lead:", err);
  }

  // Send email via Resend
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
