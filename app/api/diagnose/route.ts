import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { formRatelimit, getClientIp } from "@/lib/ratelimit";
import { stripTags, escapeHtml, checkContentLength } from "@/lib/validators";

const DiagnoseSchema = z.object({
  email:      z.string().email("Ugyldig e-postadresse").max(254),
  name:       z.string().min(1).max(100).optional().transform(v => v ? stripTags(v) : v),
  clinicName: z.string().min(1).max(200).optional().transform(v => v ? stripTags(v) : v),
  inputs: z.object({
    callsPerDay:  z.number().min(0).max(500),
    missedPct:    z.number().min(0).max(100),
    patientBase:  z.number().min(0).max(100000),
    noShowPct:    z.number().min(0).max(100),
    bookingValue: z.number().min(0).max(1000000),
  }),
  meta: z.object({
    userAgent: z.string().max(500).optional(),
    referrer:  z.string().max(500).optional(),
  }).optional(),
});

// Server-side recompute. Mirrors app/diagnose/page.tsx so we never trust client
// math. Formulas use the explicit-step model and webleads now scales with the
// patient base (was a hardcoded ~24/mnd, which gave kr 360 000 even when both
// anrop and pasienter were 0).
function computeAnnual(i: z.infer<typeof DiagnoseSchema>["inputs"]) {
  const ad = i.callsPerDay;
  const pb = i.patientBase;
  const sp = i.bookingValue;
  const mu = i.missedPct / 100;
  const ns = i.noShowPct / 100;

  const callsPerMonth = ad * 22;
  // 1) Ubesvarte: anrop × 22 × andel_ubesvart × 0.55 × 0.40 × 0.70 × snittpris
  const ubesvarteM    = callsPerMonth * mu * 0.55 * 0.40 * 0.70 * sp;
  // 2) Reaktivering: pb × 0.35 × 0.20 / 18 × snittpris
  const reaktiveringM = pb * 0.35 * 0.20 / 18 * sp;
  // 3) No-shows: (anrop_per_mnd × 0.7 booking-rate) × no_show_rate × 0.4 × snittpris
  const noShowsM      = callsPerMonth * 0.7 * ns * 0.4 * sp;
  // 4) Webleads: pb × 0.008 × 0.5 × snittpris, floored at 2/mnd for any active
  //    clinic (an active site always gets some after-hours leads). Returns 0
  //    only when both anrop and pasienter are 0.
  const hasActivity   = ad > 0 || pb > 0;
  const webleadsBase  = hasActivity ? Math.max(2, pb * 0.008) : 0;
  const webleadsM     = webleadsBase * 0.5 * sp;
  const totalM        = ubesvarteM + reaktiveringM + noShowsM + webleadsM;

  // ROI: annual leak vs annual price tier. Both prices are MONTHLY × 12.
  // Founding 6 900 kr/mnd × 12 = 82 800/yr. Ordinary 10 000 kr/mnd × 12 = 120 000/yr.
  const totalAnnual = totalM * 12;
  return {
    ubesvarteAnnual:    ubesvarteM * 12,
    reaktiveringAnnual: reaktiveringM * 12,
    noShowsAnnual:      noShowsM * 12,
    webleadsAnnual:     webleadsM * 12,
    totalAnnual,
    foundingRoi:        totalAnnual / 82_800,
    ordinaryRoi:        totalAnnual / 120_000,
  };
}

const fmtKr = (n: number) =>
  "kr " + Math.round(n).toLocaleString("nb-NO").replace(/[,  ]/g, " ");
const fmtRoi = (n: number) => `${(Math.round(n * 10) / 10).toFixed(1)}x`;

function buildEmailHtml(args: {
  name?: string;
  clinicName?: string;
  inputs: z.infer<typeof DiagnoseSchema>["inputs"];
  out: ReturnType<typeof computeAnnual>;
}) {
  const greetingTo = args.name || "der";
  const titleClinic = args.clinicName ? ` for ${escapeHtml(args.clinicName)}` : "";
  const bookingUrl = "https://calendly.com/smartcoreaimeeting/new-meeting";

  return `<!doctype html>
<html lang="nb"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f3ee;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,sans-serif;color:#1a1f3a;line-height:1.55">
<div style="max-width:560px;margin:0 auto;padding:32px 24px">
  <p style="font-size:14px;color:#5a5f73;margin:0 0 16px">Hei ${escapeHtml(greetingTo)},</p>
  <h1 style="font-size:24px;font-weight:800;letter-spacing:-0.025em;margin:0 0 8px;color:#1a1f3a">
    Her er diagnosen${titleClinic}
  </h1>
  <p style="font-size:14px;color:#5a5f73;margin:0 0 24px">
    Basert på tallene du oppga, lekker klinikken ca. <strong style="color:#1a1f3a">${fmtKr(args.out.totalAnnual)}</strong> i året fordelt på fire kilder.
  </p>

  <div style="background:#fbf6ec;border:1px solid #e8d5a1;border-radius:14px;padding:24px;margin:0 0 16px">
    <div style="font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#c9a24a;font-weight:700;margin:0 0 10px">Total lekkasje per år</div>
    <div style="font-size:34px;font-weight:800;letter-spacing:-0.03em;color:#1a1f3a">${fmtKr(args.out.totalAnnual)}</div>
  </div>

  <div style="background:#fff;border:1px solid #e8e3d6;border-radius:14px;padding:18px 22px;margin:0 0 16px">
    <div style="font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#c9a24a;font-weight:700;margin:0 0 14px">Verdi fordelt på funksjon</div>
    ${[
      ["Ubesvarte anrop", args.out.ubesvarteAnnual],
      ["Sovende pasienter (reaktivering)", args.out.reaktiveringAnnual],
      ["No-shows", args.out.noShowsAnnual],
      ["Webleads utenom åpningstid", args.out.webleadsAnnual],
    ].map(([label, val], i, arr) => `
      <div style="display:flex;justify-content:space-between;padding:10px 0;${i < arr.length - 1 ? "border-bottom:1px solid #e8e3d6;" : ""}font-size:13px">
        <span style="color:#5a5f73">${label}</span>
        <span style="font-weight:700;color:#1a1f3a">${fmtKr(val as number)}</span>
      </div>`).join("")}
  </div>

  <div style="background:#1a1f3a;color:#fff;border-radius:14px;padding:18px 22px;margin:0 0 24px">
    <div style="font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#e8d5a1;font-weight:700;margin:0 0 14px">Avkastning på Ekspedenten</div>
    <table style="width:100%;border-collapse:collapse">
      <tr>
        <td style="text-align:center;padding:6px">
          <div style="font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#e8d5a1;font-weight:600;margin:0 0 6px">Founding-pris</div>
          <div style="font-size:24px;font-weight:800;letter-spacing:-0.03em">${fmtRoi(args.out.foundingRoi)}</div>
        </td>
        <td style="text-align:center;padding:6px">
          <div style="font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#e8d5a1;font-weight:600;margin:0 0 6px">Ordinær pris</div>
          <div style="font-size:24px;font-weight:800;letter-spacing:-0.03em">${fmtRoi(args.out.ordinaryRoi)}</div>
        </td>
      </tr>
    </table>
  </div>

  <p style="font-size:14px;color:#5a5f73;margin:0 0 16px;line-height:1.6">
    Lekkasjen er størst på <strong style="color:#1a1f3a">${biggestSource(args.out)}</strong>. Det er typisk her Ekspedenten henter inn mest verdi de første ukene.
  </p>
  <p style="font-size:14px;color:#5a5f73;margin:0 0 28px;line-height:1.6">
    Vil du se hva dette betyr konkret for klinikken? Book 20 minutters kartlegging:
  </p>

  <p style="margin:0 0 32px">
    <a href="${bookingUrl}" style="display:inline-block;background:#1a1f3a;color:#fff;text-decoration:none;padding:14px 24px;border-radius:10px;font-size:14px;font-weight:600">Book kartlegging</a>
  </p>

  <hr style="border:none;border-top:1px solid #e8e3d6;margin:24px 0">
  <p style="font-size:11px;color:#9a9ca6;margin:0;line-height:1.6">
    Estimater basert på bransjedata for norske tannklinikker. Tallene varierer med rutiner, geografi og pasientmiks. Vi sender ikke nyhetsbrev. Hvis du har spørsmål, svar bare på denne mailen.
  </p>
</div></body></html>`;
}

function biggestSource(o: ReturnType<typeof computeAnnual>): string {
  const sources: Array<[string, number]> = [
    ["ubesvarte anrop", o.ubesvarteAnnual],
    ["sovende pasienter", o.reaktiveringAnnual],
    ["no-shows", o.noShowsAnnual],
    ["webleads utenom åpningstid", o.webleadsAnnual],
  ];
  sources.sort((a, b) => b[1] - a[1]);
  return sources[0][0];
}

export async function POST(req: NextRequest) {
  if (!checkContentLength(req)) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }

  const ip = getClientIp(req);
  if (formRatelimit) {
    const { success, reset } = await formRatelimit.limit(`diagnose:${ip}`);
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

  const parsed = DiagnoseSchema.safeParse(raw);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? "Ugyldig forespørsel";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  const { email, name, clinicName, inputs, meta } = parsed.data;
  const out = computeAnnual(inputs);

  // Service-role key bypasses RLS for server-side writes. Anon key fails
  // silently on RLS-protected tables, so we never fall back to it here —
  // if the service-role env var is missing, log loudly and skip the insert.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error(
      "Diagnose: Supabase insert skipped — missing env",
      { hasUrl: !!supabaseUrl, hasServiceKey: !!supabaseKey },
    );
  } else {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });
      const notater = JSON.stringify({
        kind: "diagnose",
        inputs,
        outputs: out,
        meta: meta ?? null,
        ts: new Date().toISOString(),
      });
      const { error: dbError } = await supabase.from("leads").insert({
        klinikk_navn:  clinicName ?? null,
        type_klinikk:  "tannlege",
        by:            null,
        kontaktperson: name ?? null,
        email,
        telefon:       null,
        notater,
        status:        "ny",
        kilde:         "diagnose",
      });
      if (dbError) {
        console.error("Diagnose: Supabase insert failed", {
          code:    dbError.code,
          message: dbError.message,
          details: dbError.details,
          hint:    dbError.hint,
          email,
        });
      }
    } catch (err) {
      console.error("Diagnose: Supabase client error", err);
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const html = buildEmailHtml({ name, clinicName, inputs, out });
      const clinicLabel = clinicName || "klinikken din";
      const timestamp = new Date().toLocaleString("nb-NO", { timeZone: "Europe/Oslo" });

      const results = await Promise.allSettled([
        resend.emails.send({
          from: "Ekspedenten <noreply@ekspedenten.no>",
          to: email,
          subject: `Din diagnose: ${clinicLabel} kan ha lekkasje på ${fmtKr(out.totalAnnual)} / år`,
          html,
          replyTo: "hei@ekspedenten.no",
        }),
        resend.emails.send({
          from: "Ekspedenten <noreply@ekspedenten.no>",
          to: ["aleksander@ekspedenten.no", "henrik@ekspedenten.no"],
          replyTo: email,
          subject: `Ny lead: ${clinicName || "Ukjent klinikk"} / ${name || email}`,
          html: `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,sans-serif;max-width:600px;margin:0 auto;color:#1a1f3a">
  <h2 style="color:#1a1f3a;font-size:20px;margin:0 0 16px">Ny lead fra /diagnose</h2>
  <table style="width:100%;border-collapse:collapse;font-size:14px">
    <tr><td style="padding:8px 0;color:#5a5f73;width:140px">Navn</td><td style="padding:8px 0"><strong>${escapeHtml(name ?? "—")}</strong></td></tr>
    <tr><td style="padding:8px 0;color:#5a5f73">E-post</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
    <tr><td style="padding:8px 0;color:#5a5f73">Klinikk</td><td style="padding:8px 0">${escapeHtml(clinicName ?? "—")}</td></tr>
    <tr><td style="padding:8px 0;color:#5a5f73">Total lekkasje (år)</td><td style="padding:8px 0"><strong>${fmtKr(out.totalAnnual)}</strong></td></tr>
    <tr><td style="padding:8px 0;color:#5a5f73">ROI</td><td style="padding:8px 0">Founding ${fmtRoi(out.foundingRoi)} · Ordinær ${fmtRoi(out.ordinaryRoi)}</td></tr>
    <tr><td style="padding:8px 0;color:#5a5f73">Tidspunkt</td><td style="padding:8px 0">${escapeHtml(timestamp)}</td></tr>
    <tr><td style="padding:8px 0;color:#5a5f73">Referrer</td><td style="padding:8px 0">${escapeHtml(meta?.referrer ?? "—")}</td></tr>
  </table>
  <hr style="margin:16px 0;border:none;border-top:1px solid #e8e3d6" />
  <p style="font-size:13px;color:#5a5f73;margin:0 0 6px">Inputs:</p>
  <pre style="font-size:12px;background:#fbf6ec;border:1px solid #e8d5a1;border-radius:8px;padding:10px;color:#1a1f3a;white-space:pre-wrap">${escapeHtml(JSON.stringify(inputs, null, 2))}</pre>
  <p style="color:#c9a24a;font-size:13px;font-weight:600;margin-top:16px">Følg opp innen 24 timer.</p>
</div>`,
        }),
      ]);

      results.forEach((r, i) => {
        if (r.status === "rejected") {
          console.error(`Diagnose email failed (${i === 0 ? "lead" : "internal"}):`, r.reason);
        }
      });
    } catch (err) {
      console.error("Resend send failed:", err);
    }
  }

  return NextResponse.json({ ok: true, outputs: out });
}
