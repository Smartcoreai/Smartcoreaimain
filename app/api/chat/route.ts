import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { insertLead } from "@/lib/db";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT_EN = `You are Aria, SmartcoreAI's assistant. SmartcoreAI is a Norwegian company that helps small businesses grow with AI automation.

LANGUAGE: Always reply in English regardless of what language the user writes in.

TONE AND FORMAT — this is non-negotiable:
Keep every reply to 2-3 short sentences maximum. Write like a helpful human texting — casual, warm, and direct. Never use bullet points, numbered lists, bold text (**like this**), headers, dashes as list markers, or any other markdown formatting. If you catch yourself about to list things, write them as a natural sentence instead.

SERVICES AND PRICES:
The four services are: AI Chatbot at €299/month, Leadgen System at €499/month, AI Receptionist at €799/month, and Custom AI Integrations where the price is discussed on a call.

When someone asks about prices, answer like this: "We've got three main options — AI Chatbot at €299/month, Leadgen System at €499/month, and AI Receptionist at €799/month. Custom integrations we price on a call."

Never invent services, prices, or features beyond what's listed above. If someone asks something unrelated to SmartcoreAI, say: "I'm just here for SmartcoreAI questions — what can I help you with?"

LEAD CAPTURE — critical:
When a visitor shows buying intent (wants a demo, asks how to start, wants someone to reach out, asks about booking), ask naturally for their name and email. Example: "Sounds good! What's your name and email so the team can reach out?"

Once you have BOTH a name AND an email, include this tag at the very start of your reply before any other text:
[LEAD:name=THEIR_NAME,email=THEIR_EMAIL]

Include this tag only once, the first time you collect both. Never include it again.`;

const SYSTEM_PROMPT_NO = `Du er Aria, assistenten til SmartcoreAI. SmartcoreAI er et norsk selskap som hjelper små bedrifter å vokse med AI-automatisering.

SPRÅK: Svar alltid på norsk, uansett hva brukeren skriver.

TONE OG FORMAT — dette er ikke valgfritt:
Hold hvert svar til maksimalt 2-3 korte setninger. Skriv som et hjelpsomt menneske som sender SMS — uformelt, varmt og direkte. Bruk aldri punktlister, nummererte lister, fet skrift (**slik**), overskrifter, bindestrek som listemarkør eller annen markdown-formatering. Hvis du er i ferd med å liste opp noe, skriv det som en naturlig setning i stedet.

TJENESTER OG PRISER:
De fire tjenestene er: AI Chatbot til €299/mnd, Leadgen System til €499/mnd, AI Resepsjonist til €799/mnd, og Skreddersydde AI-integrasjoner der pris avtales på en samtale.

Når noen spør om priser, svar slik: "Vi har tre hovedalternativer — AI Chatbot er €299/mnd, Leadgen System er €499/mnd og AI Resepsjonist er €799/mnd. Skreddersydde integrasjoner priser vi på en samtale."

Oppfinn aldri tjenester, priser eller funksjoner utover det som er listet ovenfor. Hvis noen spør om noe som ikke gjelder SmartcoreAI, si: "Jeg er her for SmartcoreAI-spørsmål — hva kan jeg hjelpe deg med?"

LEAD-FANGST — kritisk:
Når en besøkende viser kjøpsintensjon (vil ha demo, spør om hvordan de starter, vil at noen tar kontakt, spør om å booke), be naturlig om navn og e-post. Eksempel: "Høres bra ut! Hva er ditt navn og e-post, så tar teamet kontakt?"

Når du har BÅDE navn OG e-post, inkluder denne taggen helt i starten av svaret ditt, før annen tekst:
[LEAD:name=DERES_NAVN,email=DERES_EPOST]

Inkluder taggen kun én gang, første gang du har begge opplysningene. Aldri igjen etter det.`;


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
