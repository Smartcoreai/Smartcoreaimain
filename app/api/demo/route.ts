import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { formRatelimit, getClientIp } from "@/lib/ratelimit";
import { stripTags, escapeHtml, checkContentLength } from "@/lib/validators";

const DemoSchema = z.object({
  klinikk_navn:  z.string().min(2).max(200).transform(stripTags),
  kontaktperson: z.string().max(100).optional().transform(v => v ? stripTags(v) : v),
  email:         z.string().email("Ugyldig e-postadresse").max(254),
  telefon:       z.string().max(20).optional().transform(v => v ? stripTags(v) : v),
  by:            z.string().max(100).optional().transform(v => v ? stripTags(v) : v),
  melding:       z.string().max(2000).optional().transform(v => v ? stripTags(v) : v),
});

export async function POST(req: NextRequest) {
  if (!checkContentLength(req)) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }

  const ip = getClientIp(req);
  if (formRatelimit) {
    const { success, reset } = await formRatelimit.limit(`demo:${ip}`);
    if (!success) {
      const retryAfter = Math.ceil((reset - Date.now()) / 1000);
      return NextResponse.json(
        { error: "For mange innsendinger. Prøv igjen om litt." },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      );
    }
  }

  let raw: unknown;
  try { raw = await req.json(); }
  catch { return NextResponse.json({ error: "Ugyldig forespørsel" }, { status: 400 }); }

  const parsed = DemoSchema.safeParse(raw);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? "Ugyldig forespørsel";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  const { klinikk_navn, kontaktperson, email, telefon, by, melding } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const firstName = (kontaktperson || "").split(/\s+/)[0] || "der";
      const timestamp = new Date().toLocaleString("nb-NO", { timeZone: "Europe/Oslo" });

      // Each Resend call gets a 5s ceiling so a hung upstream can never
      // block this route past Vercel's function timeout.
      const withTimeout = <T,>(p: Promise<T>, label: string) =>
        Promise.race<T>([
          p,
          new Promise<T>((_, reject) =>
            setTimeout(() => reject(new Error(`${label} timeout (5s)`)), 5000),
          ),
        ]);

      const internalHtml = `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,sans-serif;max-width:600px;margin:0 auto;color:#1a1f3a">
          <h2 style="color:#1a1f3a;font-size:20px;margin:0 0 16px">Ny demo-bestilling</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#5a5f73;width:120px">Klinikk</td><td style="padding:8px 0"><strong>${escapeHtml(klinikk_navn)}</strong></td></tr>
            <tr><td style="padding:8px 0;color:#5a5f73">Kontaktperson</td><td style="padding:8px 0">${escapeHtml(kontaktperson || "—")}</td></tr>
            <tr><td style="padding:8px 0;color:#5a5f73">E-post</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:8px 0;color:#5a5f73">Telefon</td><td style="padding:8px 0">${escapeHtml(telefon || "—")}</td></tr>
            <tr><td style="padding:8px 0;color:#5a5f73">By</td><td style="padding:8px 0">${escapeHtml(by || "—")}</td></tr>
            <tr><td style="padding:8px 0;color:#5a5f73">Tidspunkt</td><td style="padding:8px 0">${escapeHtml(timestamp)}</td></tr>
          </table>
          ${melding ? `
            <hr style="margin:16px 0;border:none;border-top:1px solid #e8e3d6" />
            <h3 style="color:#1a1f3a;margin:0 0 8px;font-size:15px">Melding</h3>
            <p style="color:#444;line-height:1.6;font-size:14px">${escapeHtml(melding).replace(/\n/g, "<br>")}</p>
          ` : ""}
          <hr style="margin:24px 0;border:none;border-top:1px solid #e8e3d6" />
          <p style="color:#c9a24a;font-size:13px;font-weight:600">Følg opp innen 24 timer.</p>
        </div>
      `;

      const ackHtml = `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,sans-serif;max-width:560px;margin:0 auto;color:#1a1f3a;line-height:1.6">
          <p style="font-size:15px">Hei ${escapeHtml(firstName)},</p>
          <p style="font-size:15px">Takk for at du bestilte demo av Ekspedenten.<br>Henrik eller Aleksander tar kontakt innen 24 timer for å avtale tid.</p>
          <p style="font-size:15px">Vi gleder oss til å vise dere hvordan Ekspedenten ville hørtes ut for ${escapeHtml(klinikk_navn)}.</p>
          <p style="font-size:15px;margin:24px 0 4px">— Ekspedenten-teamet</p>
          <p style="font-size:13px;color:#5a5f73;margin:0">Bergen, Norge</p>
        </div>
      `;

      const results = await Promise.allSettled([
        withTimeout(
          resend.emails.send({
            from: "Ekspedenten <noreply@ekspedenten.no>",
            to: ["aleksander@ekspedenten.no", "henrik@ekspedenten.no"],
            replyTo: email,
            subject: `Ny demo-bestilling: ${klinikk_navn} / ${kontaktperson || email}`,
            html: internalHtml,
          }),
          "internal",
        ),
        withTimeout(
          resend.emails.send({
            from: "Ekspedenten <noreply@ekspedenten.no>",
            to: email,
            replyTo: "hei@ekspedenten.no",
            subject: `Takk for demo-bestillingen, ${firstName}`,
            html: ackHtml,
          }),
          "ack",
        ),
      ]);

      results.forEach((r, i) => {
        if (r.status === "rejected") {
          console.error(`Demo email failed (${i === 0 ? "internal" : "ack"}):`, r.reason);
        }
      });
    } catch (err) {
      console.error("Resend send failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
