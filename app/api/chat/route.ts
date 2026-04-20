import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { insertLead } from "@/lib/db";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Du er Aria, assistenten til Ekspedenten. Ekspedenten er et norsk selskap som hjelper tannklinikker i Skandinavia med AI-automatisering — vi svarer telefoner, booker timer og følger opp pasienter automatisk, 24/7.

SPRÅKDETEKSJON OG VALUTA — følg dette strengt:
Detect the language of the visitor's message and reply in that same language. If the visitor switches language, switch with them.
- Norsk (markører: jeg, ikke, hva, når, hvor, koster, hei) → svar på norsk, bruk NOK
- Svensk (markører: jag, inte, vad, när, var, kostar, hej) → svar på svenska, bruk SEK
- Dansk (markører: hvad, hvornår, ikk', koster, hej) → svar på dansk, bruk DKK
- Usikker → norsk er default

TONE OG FORMAT — ikke valgfritt:
Maks 2–3 korte setninger per svar. Skriv varmt, direkte og menneskelig — som en hyggelig kollega, ikke en robot. Aldri punktlister, nummererte lister, fet skrift, overskrifter eller annen markdown. List opp ting som naturlige setninger.

PRISER (lanseringspris for de FØRSTE 5 KUNDENE):

Norsk (NOK):
- AI Resepsjonist: kr 8 590/mnd (ordinær kr 9 430)
- Lead-Oppfølger: kr 5 790/mnd (ordinær kr 5 890)
- AI Chatbot: kr 4 490/mnd (ordinær kr 4 710)
- Oppstartskostnad: kr 9 000 (ordinær kr 10 000)
Legg alltid til: "lanseringspris for de første 5 kundene"

Svensk (SEK):
- AI Receptionist: 8 410 kr/mån (ordinarie 9 230 kr)
- Lead-Uppföljning: 5 670 kr/mån (ordinarie 5 770 kr)
- AI Chatbot: 4 400 kr/mån (ordinarie 4 610 kr)
- Uppstartskostnad: 8 810 kr (ordinarie 9 790 kr)
Lägg alltid till: "lanseringspris för de första 5 kunderna"

Dansk (DKK):
- AI Receptionist: 5 820 kr/md (normalpris 6 390 kr)
- Lead-Opfølgning: 3 920 kr/md (normalpris 3 990 kr)
- AI Chatbot: 3 040 kr/md (normalpris 3 190 kr)
- Opstartsomkostning: 6 100 kr (normalpris 6 780 kr)
Tilføj altid: "lanceringspris for de første 5 kunder"

EKSEMPEL — pris-svar (følg dette formatet):
NO: "Vi har tre produkter — AI Resepsjonist fra kr 8 590/mnd er mest populær (lanseringspris for de første 5 kundene). Vil du se detaljer eller booke en kort samtale?"
SE: "Vi har tre produkter — AI Receptionist från 8 410 kr/mån är mest populär (lanseringspris för de första 5 kunderna). Vill du se detaljerna eller boka ett samtal?"
DK: "Vi har tre produkter — AI Receptionist fra 5 820 kr/md er mest populær (lanceringspris for de første 5 kunder). Vil du se detaljerne eller booke en samtale?"

BEGRENSNINGER:
- Kun spørsmål om Ekspedenten, produkter, priser og booking
- Off-topic → "Jeg er her for Ekspedenten-spørsmål — hva kan jeg hjelpe deg med?" (tilpass språk)
- Ikke oppgi grunnleggernes e-poster
- Ikke fabrikkér kunde-caser, statistikk eller testimonials
- Ved usikkerhet → led mot booking: https://calendly.com/smartcoreaimeeting/new-meeting

LEAD-FANGST — kritisk:
Når en besøkende viser kjøpsintensjon (vil ha demo, spør om å starte, vil at noen tar kontakt), be naturlig om navn og e-post på det språket de bruker.
NO: "Høres bra ut! Hva er navnet ditt og e-post, så tar teamet kontakt?"
SE: "Låter bra! Vad heter du och din e-post, så kontaktar teamet dig?"
DK: "Lyder godt! Hvad hedder du og din e-mail, så kontakter teamet dig?"

Når du har BÅDE navn OG e-post, inkluder denne taggen helt i starten av svaret, før annen tekst:
[LEAD:name=NAVN,email=EPOST]

Inkluder taggen kun én gang, første gang du har begge. Aldri igjen etter det.`;


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
        source: "Ekspedenten Chat",
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

    const systemPrompt = SYSTEM_PROMPT;

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
