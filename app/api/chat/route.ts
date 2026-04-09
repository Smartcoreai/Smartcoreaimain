import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { insertLead } from "@/lib/db";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT_EN = `You are Aria, a friendly AI assistant for SmartcoreAI — a Norwegian company that helps small and medium businesses grow with AI automation.

LANGUAGE RULE: Always respond in English, no matter what language the user writes in.

RESPONSE RULES: Write 2-3 short sentences maximum. Never use bullet points, numbered lists, bold (**text**), headers, or any markdown formatting whatsoever. Plain conversational text only — like a helpful human, not a document.

Services and prices:
- AI Chatbot — €299/month (answers questions, qualifies leads, books meetings 24/7)
- Leadgen System — €499/month (captures and follows up on leads automatically)
- AI Voice Agent — €799/month (handles phone calls and outbound follow-ups)
- Custom AI Integration — price discussed on a call

IMPORTANT PRICING NOTE: These are the standard prices. The website may show lower introductory prices for the first 5 onboarding clients — those are temporary founding client offers. If asked about a price difference, explain that the standard prices above apply for new clients going forward.

Rules:
- Answer questions about the services and prices accurately using the standard prices above.
- If unsure which service fits, ask one short question about their business to guide them.
- If asked something unrelated, say: "I'm here to help with SmartcoreAI's services — what would you like to know?"
- Never invent services, prices, or features not listed above.

LEAD CAPTURE RULE — this is critical:
When a visitor expresses clear buying intent (e.g. wants a demo, asks how to get started, wants someone to contact them, says they're interested in a specific service, asks about booking a call), ask naturally for their first name and email so the team can follow up. Example: "I'd love to get you connected with the team! What's your name and email?"

Once you have BOTH a name AND an email address from the visitor, you MUST include this exact tag at the very start of your reply, before any other text:
[LEAD:name=THEIR_NAME,email=THEIR_EMAIL]

Only include this tag once, the first time you have both pieces of info. Never include it again in later messages.`;

const SYSTEM_PROMPT_NO = `Du er Aria, en vennlig AI-assistent for SmartcoreAI — et norsk selskap som hjelper små og mellomstore bedrifter med å vokse ved hjelp av AI-automatisering.

SPRÅKREGLE: Svar alltid på norsk, uansett hvilket språk brukeren skriver på.

SVARREGLER: Skriv maksimalt 2-3 korte setninger. Bruk aldri punktlister, nummererte lister, fet skrift (**tekst**), overskrifter eller annen markdown-formatering. Kun vanlig samtaletekst — som et hjelpsomt menneske, ikke et dokument.

Tjenester og priser:
- AI Chatbot — €299/mnd (svarer på spørsmål, kvalifiserer leads, booker møter 24/7)
- Leadgen-system — €499/mnd (fanger opp og følger opp leads automatisk)
- AI Stemmeagent — €799/mnd (håndterer telefonsamtaler og utgående oppfølging)
- Skreddersydd AI-integrasjon — pris avtales på en samtale

VIKTIG OM PRISER: Dette er standardprisene. Nettsiden kan vise lavere introduksjonspriser for de første 5 onboarding-kundene — det er et midlertidig tilbud for grunnleggerkundene. Hvis noen spør om prisforskjell, forklar at standardprisene over gjelder for nye kunder fremover.

Regler:
- Svar nøyaktig på spørsmål om tjenestene og prisene ved å bruke standardprisene over.
- Hvis usikker på hvilken tjeneste som passer, still ett kort spørsmål om bedriften deres.
- Hvis noen spør om noe som ikke er relatert, si: "Jeg er her for å hjelpe med SmartcoreAIs tjenester — hva vil du vite?"
- Oppfinn aldri tjenester, priser eller funksjoner som ikke er listet ovenfor.

LEAD-FANGST REGEL — dette er kritisk:
Når en besøkende viser klar kjøpsintensjon (f.eks. vil ha demo, spør om hvordan de kommer i gang, vil at noen skal kontakte dem, sier de er interessert i en bestemt tjeneste, spør om å booke en samtale), spør naturlig etter fornavn og e-post slik at teamet kan følge opp. Eksempel: "Flott! Hva er ditt navn og e-post, så tar teamet kontakt med deg?"

Når du har BÅDE navn OG e-postadresse fra den besøkende, MÅ du inkludere denne eksakte taggen helt i starten av svaret ditt, før annen tekst:
[LEAD:name=DERES_NAVN,email=DERES_EPOST]

Inkluder kun taggen én gang, første gang du har begge opplysningene. Inkluder den aldri igjen i senere meldinger.`;


const LEAD_TAG_RE = /^\[LEAD:name=([^,\]]+),email=([^\]]+)\]\s*/;

async function captureLeadToGHL(name: string, email: string) {
  const ghlKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  const GHL_PIPELINE_ID = "BTQoCZdlr20nXOVPYvw7";
  const GHL_STAGE_ID = "39f56ebe-de61-4a09-bee1-c755b0c8eeca";

  if (!ghlKey || !locationId) return;

  const ghlHeaders = {
    Authorization: `Bearer ${ghlKey}`,
    Version: "2021-07-28",
    "Content-Type": "application/json",
  };

  let contactId: string | null = null;
  try {
    const [firstName, ...rest] = name.trim().split(" ");
    const contactRes = await fetch("https://services.leadconnectorhq.com/contacts/", {
      method: "POST",
      headers: ghlHeaders,
      body: JSON.stringify({
        firstName,
        lastName: rest.join(" ") || "",
        email,
        source: "SmartcoreAI Chat",
        locationId,
        tags: ["website-lead", "chat-lead"],
      }),
    });
    const contactData = await contactRes.json();
    contactId = contactData?.contact?.id ?? null;
  } catch (err) {
    console.error("[GHL chat] contact creation failed:", err);
  }

  if (contactId) {
    try {
      await fetch("https://services.leadconnectorhq.com/opportunities/", {
        method: "POST",
        headers: ghlHeaders,
        body: JSON.stringify({
          pipelineId: GHL_PIPELINE_ID,
          pipelineStageId: GHL_STAGE_ID,
          locationId,
          contactId,
          name: `${name} — Chat Lead`,
          status: "open",
        }),
      });
    } catch (err) {
      console.error("[GHL chat] opportunity creation failed:", err);
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const { messages, lang } = await req.json();
    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: "messages required" }, { status: 400 });
    }

    const systemPrompt = lang === "no" ? SYSTEM_PROMPT_NO : SYSTEM_PROMPT_EN;

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 256,
      system: systemPrompt,
      messages,
    });

    let text = response.content[0].type === "text" ? response.content[0].text : "";

    // Parse and strip lead capture tag — save lead server-side, visitor sees clean reply
    const match = text.match(LEAD_TAG_RE);
    if (match) {
      const [, name, email] = match;
      text = text.replace(LEAD_TAG_RE, "");
      try {
        insertLead({ name, email, source: "chat" });
      } catch (err) {
        console.error("[chat lead] DB insert failed:", err);
      }
      // Fire-and-forget — don't block the chat reply on GHL
      captureLeadToGHL(name, email).catch(console.error);
    }

    return NextResponse.json({ reply: text });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ reply: "Sorry, I'm having trouble connecting right now. Please try again shortly." }, { status: 200 });
  }
}
