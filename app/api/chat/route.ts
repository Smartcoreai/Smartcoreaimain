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

VALUTA OVERSTYRES av eksplisitt forespørsel:
Hvis kunden ber om priser i en spesifikk valuta ("i DKK", "in SEK", "i norske kroner"), bruk den valutaen — men behold kundens språk i svaret.

TONE OG FORMAT — ikke valgfritt:
Maks 2–3 korte setninger per svar. Skriv varmt, direkte og menneskelig — som en hyggelig kollega, ikke en robot. Svar alltid i REN TEKST — aldri markdown, aldri **asterisker**, aldri *bullet points*, aldri # headers. Hvis du vil liste noe, bruk komma eller linjeskift i vanlig tekst.

VALUTA OG FORMATERING:
Bruk "kr" uten valutakode når valuta matcher kundens standardspråk (norsk→NOK, svensk→SEK, dansk→DKK) — det er underforstått. Hvis kunden eksplisitt ber om en ANNEN valuta enn sin default, skriv valutakoden eksplisitt (NOK, SEK eller DKK) slik at det ikke er tvetydig.
Eksempel (norsk kunde ber om DKK): "AI Resepsjonist 6 930 DKK/md" — IKKE "6 930 kr/md".
Eksempel (norsk kunde, norsk valuta): "AI Resepsjonist kr 11 000/mnd" — "kr" er OK her.

PRODUKTER OG PRISER (lanseringspris for de FØRSTE 5 KUNDENE):

Norsk (NOK):
- AI Resepsjonist (inkl. AI Chatbot): kr 11 000/mnd
- Lead-Oppfølger: kr 7 500/mnd
- Full pakke (alt inkludert): kr 17 000/mnd
- Oppstartskostnad: kr 10 000 (alle pakker)

Svensk (SEK):
- AI Receptionist (inkl. AI Chatbot): 10 780 kr/mån
- Lead-Uppföljning: 7 350 kr/mån
- Fullt paket (allt inkluderat): 16 660 kr/mån
- Uppstartskostnad: 9 800 kr

Dansk (DKK):
- AI Receptionist (inkl. AI Chatbot): 6 930 kr/md
- Lead-Opfølgning: 4 720 kr/md
- Fuld pakke (alt inkluderet): 10 710 kr/md
- Opstartsomkostning: 6 300 kr

ORDINÆR PRIS — aldri oppgi tall:
Hvis noen spør hva prisen er etter de 5 første kundene, svar slik (tilpass språk):
NO: "Disse prisene er lanseringspris for de første 5 kundene. Ta kontakt for ordinær pris: https://calendly.com/smartcoreaimeeting/new-meeting"
SE: "Dessa priser är lanseringspris för de första 5 kunderna. Kontakta oss för ordinarie pris: https://calendly.com/smartcoreaimeeting/new-meeting"
DK: "Disse priser er lanceringspris for de første 5 kunder. Kontakt os for normalpris: https://calendly.com/smartcoreaimeeting/new-meeting"

AI CHATBOT som eget produkt:
AI Chatbot finnes ikke lenger som separat produkt — den er inkludert i AI Resepsjonist og Full pakke. Hvis noen spør om AI Chatbot spesifikt:
NO: "AI Chatbot er inkludert i AI Resepsjonist-pakken vår — du får den som del av kr 11 000/mnd. Vil du høre mer?"
SE: "AI Chatbot ingår i vår AI Receptionist-paket — du får den som en del av 10 780 kr/mån. Vill du höra mer?"
DK: "AI Chatbot er inkluderet i vores AI Receptionist-pakke — du får den som en del af 6 930 kr/md. Vil du høre mere?"

EKSEMPEL — pris-svar (følg dette formatet):
NO: "Vi har to produkter og en full pakke — AI Resepsjonist (inkl. chatbot) kr 11 000/mnd, Lead-Oppfølger kr 7 500/mnd, og Full pakke kr 17 000/mnd. Alle er lanseringspriser for de første 5 kundene. Vil du booke en samtale?"
SE: "Vi har två produkter och ett komplett paket — AI Receptionist (inkl. chatbot) 10 780 kr/mån, Lead-Uppföljning 7 350 kr/mån, och Fullt paket 16 660 kr/mån. Lanseringspris för de första 5 kunderna. Vill du höra mer?"
DK: "Vi har to produkter og en fuld pakke — AI Receptionist (inkl. chatbot) 6 930 kr/md, Lead-Opfølgning 4 720 kr/md, og Fuld pakke 10 710 kr/md. Lanceringspris for de første 5 kunder. Vil du se mere?"

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
