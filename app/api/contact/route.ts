import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { insertLead } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { name, email, phone, business, message } = await req.json();

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
        from: "Ekspedenten <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL || "hei@ekspedenten.no",
        subject: `New enquiry from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #D4AF37;">New contact form submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666; width: 120px;">Name</td><td style="padding: 8px 0;"><strong>${name}</strong></td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Business</td><td style="padding: 8px 0;">${business || "—"}</td></tr>
            </table>
            <hr style="margin: 16px 0; border: none; border-top: 1px solid #eee;" />
            <h3 style="color: #333; margin-bottom: 8px;">Message</h3>
            <p style="color: #444; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</p>
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

  // Send to GoHighLevel as a new contact + create opportunity
  // Pipeline: "Smartcoreaimainweb" (BTQoCZdlr20nXOVPYvw7), Stage: "New lead" (39f56ebe-de61-4a09-bee1-c755b0c8eeca)
  const GHL_PIPELINE_ID = "BTQoCZdlr20nXOVPYvw7";
  const GHL_STAGE_ID    = "39f56ebe-de61-4a09-bee1-c755b0c8eeca";

  const ghlKey    = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (ghlKey && locationId) {
    const ghlHeaders = {
      "Authorization": `Bearer ${ghlKey}`,
      "Version": "2021-07-28",
      "Content-Type": "application/json",
    };

    // 1. Create contact
    let contactId: string | null = null;
    try {
      const [firstName, ...rest] = name.trim().split(" ");
      const lastName = rest.join(" ") || "";
      const contactRes = await fetch("https://services.leadconnectorhq.com/contacts/", {
        method: "POST",
        headers: ghlHeaders,
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone: phone || undefined,
          companyName: business || "",
          source: "Ekspedenten Website",
          locationId,
          tags: ["website-lead", "website-inquiry"],
        }),
      });
      const contactData = await contactRes.json();
      console.log("[GHL] contact status:", contactRes.status, JSON.stringify(contactData));
      contactId = contactData?.contact?.id ?? null;
    } catch (err) {
      console.error("[GHL] contact creation threw:", err);
    }

    // 2. Add message as a note on the contact
    if (contactId) {
      try {
        const noteRes = await fetch(
          `https://services.leadconnectorhq.com/contacts/${contactId}/notes`,
          {
            method: "POST",
            headers: ghlHeaders,
            body: JSON.stringify({
              body: "Melding fra nettskjema:\n\nHva trenger du: " + message,
            }),
          }
        );
        const noteData = await noteRes.json();
        console.log("[GHL] note status:", noteRes.status, JSON.stringify(noteData));
      } catch (err) {
        console.error("[GHL] note creation threw:", err);
      }
    }

    // 3. Create opportunity (hardcoded pipeline/stage IDs — confirmed valid)
    if (contactId) {
      try {
        const oppRes = await fetch("https://services.leadconnectorhq.com/opportunities/", {
          method: "POST",
          headers: ghlHeaders,
          body: JSON.stringify({
            pipelineId: GHL_PIPELINE_ID,
            pipelineStageId: GHL_STAGE_ID,
            locationId,
            contactId,
            name: `${name}${business ? ` — ${business}` : ""}`,
            status: "open",
          }),
        });
        const oppData = await oppRes.json();
        console.log("[GHL] opportunity status:", oppRes.status, JSON.stringify(oppData));
      } catch (err) {
        console.error("[GHL] opportunity creation threw:", err);
      }
    } else {
      console.error("[GHL] skipping opportunity — no contactId");
    }
  } else {
    console.error("[GHL] missing GHL_API_KEY or GHL_LOCATION_ID env vars");
  }

  return NextResponse.json({ ok: true });
}
