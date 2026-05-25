import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";
import { chatRatelimit, getClientIp } from "@/lib/ratelimit";
import { ChatSchema, checkContentLength } from "@/lib/validators";
import { EKSPEDENTEN_PROMPT } from "@/lib/chat-prompt";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Regex stays in place: if the prompt is ever wired back up to emit
// [LEAD:name=…,email=…] tags, the capture-and-insert block below still works.
const LEAD_TAG_RE = /^\[LEAD:name=([^,\]]+),email=([^\]]+)\]\s*/;

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
    const match = text.match(LEAD_TAG_RE);
    if (match) {
      const [, name, email] = match;
      text = text.replace(LEAD_TAG_RE, "");
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (!supabaseUrl || !supabaseKey) {
        console.error(
          "Chat: Supabase insert skipped — missing env",
          { hasUrl: !!supabaseUrl, hasServiceKey: !!supabaseKey },
        );
      } else {
        try {
          const supabase = createClient(supabaseUrl, supabaseKey, {
            auth: { autoRefreshToken: false, persistSession: false },
          });
          const { error: dbError } = await supabase.from("leads").insert({
            klinikk_navn:  null,
            type_klinikk:  "tannlege",
            by:            null,
            kontaktperson: name,
            email,
            telefon:       null,
            notater:       null,
            status:        "nye_leads",
            kilde:         "chat",
          });
          if (dbError) {
            console.error("Chat: Supabase insert failed", {
              code:    dbError.code,
              message: dbError.message,
              details: dbError.details,
              hint:    dbError.hint,
              email,
            });
          }
        } catch (err) {
          console.error("Chat: Supabase client error", err);
        }
      }
    }

    return NextResponse.json({ reply: stripDashes(text) });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ reply: "Sorry, I'm having trouble connecting right now. Please try again shortly." }, { status: 200 });
  }
}
