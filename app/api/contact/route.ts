import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
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

  // GDPR: persondata lagres KUN i Supabase (Frankfurt, EU). Service-role-key
  // bypasser RLS for server-side system-writes — samme mønster som /api/diagnose.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error(
      "Contact: Supabase insert skipped — missing env",
      { hasUrl: !!supabaseUrl, hasServiceKey: !!supabaseKey },
    );
  } else {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });
      const { error: dbError } = await supabase.from("leads").insert({
        klinikk_navn:  business || null,
        type_klinikk:  "tannlege",
        by:            null,
        kontaktperson: name,
        email,
        telefon:       phone || null,
        notater:       message,
        status:        "ny",
        kilde:         "kontakt",
      });
      if (dbError) {
        console.error("Contact: Supabase insert failed", {
          code:    dbError.code,
          message: dbError.message,
          details: dbError.details,
          hint:    dbError.hint,
          email,
        });
      }
    } catch (err) {
      console.error("Contact: Supabase client error", err);
    }
  }

  // Send emails via Resend (escapeHtml for HTML template only — data already stripped)
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const firstName = name.split(/\s+/)[0] || name;
      const timestamp = new Date().toLocaleString("nb-NO", { timeZone: "Europe/Oslo" });

      const internalHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1f3a;">
          <h2 style="color: #1a1f3a; font-size: 20px; margin: 0 0 16px;">Ny henvendelse fra kontaktskjemaet</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 8px 0; color: #5a5f73; width: 120px;">Navn</td><td style="padding: 8px 0;"><strong>${escapeHtml(name)}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #5a5f73;">E-post</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #5a5f73;">Telefon</td><td style="padding: 8px 0;">${escapeHtml(phone || "—")}</td></tr>
            <tr><td style="padding: 8px 0; color: #5a5f73;">Klinikk</td><td style="padding: 8px 0;">${escapeHtml(business || "—")}</td></tr>
            <tr><td style="padding: 8px 0; color: #5a5f73;">Tidspunkt</td><td style="padding: 8px 0;">${escapeHtml(timestamp)}</td></tr>
          </table>
          <hr style="margin: 16px 0; border: none; border-top: 1px solid #e8e3d6;" />
          <h3 style="color: #1a1f3a; margin: 0 0 8px; font-size: 15px;">Melding</h3>
          <p style="color: #444; line-height: 1.6; font-size: 14px;">${escapeHtml(message).replace(/\n/g, "<br>")}</p>
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #e8e3d6;" />
          <p style="color: #c9a24a; font-size: 13px; font-weight: 600;">Følg opp innen 24 timer.</p>
        </div>
      `;

      const ackHtml = `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,sans-serif;max-width:560px;margin:0 auto;color:#1a1f3a;line-height:1.65;font-size:15px;padding:8px">
          <p style="margin:0 0 16px">Hei ${escapeHtml(firstName)},</p>
          <p style="margin:0 0 16px">Takk for at du tok kontakt med Ekspedenten! Vi ser på tallene for klinikken din og svarer deg innen 4 timer i arbeidstiden.</p>
          <p style="margin:0 0 16px">I mellomtiden kan du gjerne kjøre vår <a href="https://ekspedenten.no/diagnose" style="color:#1a1f3a;font-weight:600;text-decoration:underline">lekkasje-kalkulator</a> for å se hva tapte anrop koster dere i dag.</p>
          <p style="margin:24px 0 4px">— Henrik &amp; Aleksander</p>
          <p style="margin:0;font-size:13px;color:#5a5f73">Ekspedenten · Bergen, Norge</p>
        </div>
      `;

      const ackText = `Hei ${firstName},

Takk for at du tok kontakt med Ekspedenten! Vi ser på tallene for klinikken din og svarer deg innen 4 timer i arbeidstiden.

I mellomtiden kan du gjerne kjøre vår lekkasje-kalkulator for å se hva tapte anrop koster dere i dag: https://ekspedenten.no/diagnose

— Henrik & Aleksander
Ekspedenten · Bergen, Norge
`;

      const results = await Promise.allSettled([
        resend.emails.send({
          from: "Ekspedenten <noreply@ekspedenten.no>",
          to: ["aleksander@ekspedenten.no", "henrik@ekspedenten.no"],
          replyTo: email,
          subject: `Ny lead: ${business || "Ukjent klinikk"} / ${name}`,
          html: internalHtml,
        }),
        resend.emails.send({
          from: "Ekspedenten <noreply@ekspedenten.no>",
          to: email,
          replyTo: "hei@ekspedenten.no",
          subject: `Takk for interessen, ${firstName}`,
          html: ackHtml,
          text: ackText,
        }),
      ]);

      results.forEach((r, i) => {
        if (r.status === "rejected") {
          console.error(`Email send failed (${i === 0 ? "internal" : "ack"}):`, r.reason);
        }
      });
    } catch (err) {
      console.error("Email send failed:", err);
      // Still return success — lead was saved
    }
  }

  return NextResponse.json({ ok: true });
}
