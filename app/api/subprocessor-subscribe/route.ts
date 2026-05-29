import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { formRatelimit, getClientIp } from "@/lib/ratelimit";
import { checkContentLength } from "@/lib/validators";

const SubscribeSchema = z.object({
  email: z.string().email("Ugyldig e-postadresse").max(254, "Ugyldig e-postadresse"),
});

export async function POST(req: NextRequest) {
  if (!checkContentLength(req, 10_000)) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }

  const ip = getClientIp(req);
  if (formRatelimit) {
    const { success, reset } = await formRatelimit.limit(ip);
    if (!success) {
      const retryAfter = Math.ceil((reset - Date.now()) / 1000);
      return NextResponse.json(
        { error: "For mange forsøk. Prøv igjen om litt." },
        { status: 429, headers: { "Retry-After": String(retryAfter) } },
      );
    }
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Ugyldig forespørsel" }, { status: 400 });
  }

  const result = SubscribeSchema.safeParse(raw);
  if (!result.success) {
    const msg = result.error.issues[0]?.message ?? "Ugyldig forespørsel";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  const email = result.data.email.trim().toLowerCase();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error(
      "Subprocessor subscribe failed: missing Supabase env",
      { hasUrl: !!supabaseUrl, hasServiceKey: !!supabaseKey },
    );
    return NextResponse.json(
      { error: "Kunne ikke lagre forespørselen. Prøv igjen senere." },
      { status: 500 },
    );
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { error: dbError } = await supabase
      .from("subprocessor_subscribers")
      .insert({ email });

    if (dbError) {
      // 23505 = unique_violation. Idempotent: behandle som suksess.
      if (dbError.code === "23505") {
        return NextResponse.json({ ok: true });
      }
      console.error("Subprocessor subscribe failed", {
        code: dbError.code,
        message: dbError.message,
        details: dbError.details,
        hint: dbError.hint,
        email,
      });
      return NextResponse.json(
        { error: "Kunne ikke lagre forespørselen. Prøv igjen senere." },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("Subprocessor subscribe failed: client error", err);
    return NextResponse.json(
      { error: "Kunne ikke lagre forespørselen. Prøv igjen senere." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
