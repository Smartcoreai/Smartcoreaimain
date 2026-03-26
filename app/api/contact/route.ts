import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { insertLead } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { name, email, business, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

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
        from: "SmartcoreAI <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL || "aleksanderb2006@gmail.com",
        subject: `New enquiry from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #a855f7;">New contact form submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666; width: 120px;">Name</td><td style="padding: 8px 0;"><strong>${name}</strong></td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Business</td><td style="padding: 8px 0;">${business || "—"}</td></tr>
            </table>
            <hr style="margin: 16px 0; border: none; border-top: 1px solid #eee;" />
            <h3 style="color: #333; margin-bottom: 8px;">Message</h3>
            <p style="color: #444; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</p>
            <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
            <p style="color: #999; font-size: 12px;">Sent from smartcoreai.com contact form</p>
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
