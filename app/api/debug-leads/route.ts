import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const urlPresent = !!supabaseUrl;
  const keyPresent = !!supabaseKey;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ urlPresent, keyPresent, insertError: null });
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const testEmail = "debug-test@ekspedenten.no";

  const { data, error: insertError } = await supabase
    .from("leads")
    .insert({
      klinikk_navn:  "DEBUG_TEST",
      type_klinikk:  "tannlege",
      by:            null,
      kontaktperson: "Debug Testbruker",
      email:         testEmail,
      telefon:       null,
      notater:       "Midlertidig debug-rad — skal slettes automatisk",
      status:        "nye_leads",
      kilde:         "debug",
    })
    .select("id")
    .single();

  if (!insertError && data?.id) {
    await supabase.from("leads").delete().eq("id", data.id);
  }

  return NextResponse.json({
    urlPresent,
    keyPresent,
    insertError: insertError ?? null,
  });
}
