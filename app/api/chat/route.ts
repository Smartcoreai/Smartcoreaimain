import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";
import { chatRatelimit, getClientIp } from "@/lib/ratelimit";
import { ChatSchema, checkContentLength } from "@/lib/validators";
import { EKSPEDENTEN_PROMPT } from "@/lib/chat-prompt";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Prompt emits [LEAD:name=NAVN,email=EPOST,telephone=TELEFON] on the last line
// when it has name + (email or phone). Telephone field is optional; email may
// be empty ('' or nothing) when only phone was given. Tag is stripped before
// the reply reaches the client.
const LEAD_TAG_RE = /\[LEAD:name=([^,\]]+),email=([^,\]]*)(?:,telephone=([^,\]]*))?\]/;

// Belt-and-braces filter: the prompt forbids em/en/double dashes, but the
// model still slips them in. Run on the fully assembled reply (we don't
// stream), so a "--" split across tokens can't sneak through.
function stripDashes(text: string): string {
  return text
    .replace(/\s*[-—–]{2,}\s*/g, ", ")  // -- / --- / —— → comma
    .replace(/\s*[—–]\s*/g, ", ")        // single em/en dash → comma
    .replace(/([.!?]),\s*/g, "$1 ")      // ". , Foo" → ". Foo"
    .replace(/,\s*,+/g, ",")             // ",,," → ","
    .replace(/[ \t]{2,}/g, " ")          // collapse runs of spaces
    .trim();
}


export async function POST(req: NextRequest) {
  // Reject oversized bodies
  if (!checkContentLength(req)) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }

  try {
    // Rate limiting
    const ip = getClientIp(req);
    if (chatRatelimit) {
      const { success, reset } = await chatRatelimit.limit(ip);
      if (!success) {
        const retryAfter = Math.ceil((reset - Date.now()) / 1000);
        return NextResponse.json(
          { error: "Du har sendt for mange meldinger. Prøv igjen om litt, eller book en gratis samtale.", bookingUrl: "https://calendly.com/smartcoreaimeeting/new-meeting" },
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

    // Validate + strip HTML tags from message content
    const result = ChatSchema.safeParse(raw);
    if (!result.success) {
      return NextResponse.json({ error: "Ugyldig meldingsformat" }, { status: 400 });
    }
    const { messages, lang } = result.data;

    const systemPrompt = EKSPEDENTEN_PROMPT;

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 256,
      system: systemPrompt,
      messages,
    });

    let text = response.content[0].type === "text" ? response.content[0].text : "";

    // Parse and strip lead capture tag — save lead server-side, visitor sees clean reply.
    // GDPR: persondata lagres KUN i Supabase (Frankfurt, EU) med service-role-key.
    console.log("Chat: model output (first 200)", text.slice(0, 200));
    const match = text.match(LEAD_TAG_RE);
    if (match) {
      const [, rawName, rawEmail, rawTelephone] = match;
      const name = rawName.trim();
      const email = rawEmail.trim().replace(/^'+|'+$/g, "");
      const telephone = rawTelephone?.trim().replace(/^'+|'+$/g, "") || null;
      console.log("Chat: LEAD tag matched", { name, email, telephone });
      // Strip the tag (and any leading whitespace/newlines around it) from the reply.
      text = text.replace(LEAD_TAG_RE, "").replace(/\s+$/g, "").trim();

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (!supabaseUrl || !supabaseKey) {
        console.error(
          "Chat: Supabase insert skipped — missing env",
          { hasUrl: !!supabaseUrl, hasServiceKey: !!supabaseKey },
        );
        return NextResponse.json(
          { error: "lead_save_failed", message: "Supabase env missing" },
          { status: 500 },
        );
      }

      try {
        const supabase = createClient(supabaseUrl, supabaseKey, {
          auth: { autoRefreshToken: false, persistSession: false },
        });
        const { data, error: dbError } = await supabase.from("leads").insert({
          klinikk_navn:  null,
          type_klinikk:  "tannlege",
          by:            null,
          kontaktperson: name,
          email:         email || null,
          telefon:       telephone,
          notater:       null,
          status:        "nye_leads",
          kilde:         "chat",
        }).select("id").maybeSingle();
        if (dbError) {
          console.error("Chat: Supabase insert failed", {
            code:    dbError.code,
            message: dbError.message,
            details: dbError.details,
            hint:    dbError.hint,
            email,
          });
          return NextResponse.json(
            { error: "lead_save_failed", message: dbError.message },
            { status: 500 },
          );
        }
        console.log("Chat: lead inserted", { email, telephone, id: data?.id });
      } catch (err) {
        console.error("Chat: Supabase client error", err);
        const message = err instanceof Error ? err.message : "unknown supabase client error";
        return NextResponse.json(
          { error: "lead_save_failed", message },
          { status: 500 },
        );
      }
    }

    return NextResponse.json({ reply: stripDashes(text) });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ reply: "Sorry, I'm having trouble connecting right now. Please try again shortly." }, { status: 200 });
  }
}
