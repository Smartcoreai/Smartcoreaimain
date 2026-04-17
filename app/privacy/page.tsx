"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SECTIONS = [
  {
    title: "1. Hvem vi er",
    body: "SmartcoreAI er et norskregistrert selskap (org.nr: under registrering) som leverer AI-baserte kommunikasjons- og bookingsystemer til norske bedrifter. Vi har ansvar for behandlingen av personopplysningene som samles inn via denne nettsiden og våre tjenester.",
    contact: "Kontakt: aleksander@smartcoreai.no",
  },
  {
    title: "2. Hvilke data vi samler inn",
    bullets: [
      "Kontaktinformasjon (navn, e-post, telefonnummer) når du booker en samtale eller sender en henvendelse",
      "Bruksdata fra nettsiden via cookies og analyseverktøy",
      "Samtalelogger mellom AI-assistenten Aria og besøkende på nettsiden",
      "Data som våre klienter deler med oss for å konfigurere og forbedre AI-systemer",
    ],
  },
  {
    title: "3. Hvorfor vi samler inn data",
    bullets: [
      "For å levere og forbedre våre tjenester",
      "For å kommunisere med deg om henvendelser og bookinger",
      "For å trene og forbedre AI-modellene våre",
      "For å analysere og forbedre nettsiden",
    ],
  },
  {
    title: "4. Hvem vi deler data med",
    bullets: [
      "Vi selger aldri dine personopplysninger til tredjeparter",
      "Vi deler kun data med tjenesteleverandører som er nødvendige for å levere tjenesten (hosting, e-post, CRM)",
      "Alle underleverandører er GDPR-kompatible og har signert databehandleravtaler med oss",
    ],
  },
  {
    title: "5. Datalagring og sikkerhet",
    bullets: [
      "All data lagres på servere i EU (Frankfurt, Tyskland) via AWS",
      "Ende-til-ende-kryptering for sensitive data",
      "Tilgang er begrenset til autorisert personell",
      "Vi gjennomfører jevnlige sikkerhetsrevisjoner",
    ],
  },
  {
    title: "6. Dine rettigheter (GDPR)",
    body: "Under Personvernforordningen (GDPR) har du følgende rettigheter:",
    bullets: [
      "Innsyn i dine personopplysninger",
      "Retting av uriktige eller ufullstendige opplysninger",
      'Sletting av dine data ("retten til å bli glemt")',
      "Dataportabilitet — eksport av dine data i et maskinlesbart format",
      "Å trekke tilbake samtykke når som helst uten at dette påvirker lovligheten av tidligere behandling",
      "Å klage til Datatilsynet dersom du mener vi behandler data i strid med regelverket",
    ],
  },
  {
    title: "7. Cookies",
    body: "Vi bruker nødvendige cookies for at nettsiden skal fungere, samt analysecookies (via Google Analytics) for å forstå hvordan nettsiden brukes. Calendly (vårt bookingverktøy) kan også sette cookies når du interagerer med bookingwidgeten. Du kan administrere cookie-innstillinger i nettleseren din.",
  },
  {
    title: "8. Endringer i personvernerklæringen",
    body: "Vi kan oppdatere denne personvernerklæringen ved behov. Vesentlige endringer vil bli kommunisert via e-post til registrerte brukere eller varslet tydelig på nettsiden. Den til enhver tid gjeldende versjon er alltid tilgjengelig på denne siden.",
  },
  {
    title: "9. Kontakt oss",
    body: "Har du spørsmål om personvern, ønsker innsyn i dine data, eller vil utøve noen av rettighetene dine? Ta kontakt med oss på:",
    contact: "aleksander@smartcoreai.no",
  },
];

export default function PrivacyPage() {
  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ paddingTop: 120, paddingBottom: 96, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>

          {/* Eyebrow */}
          <div style={{
            fontSize: 12, fontWeight: 700, letterSpacing: "0.08em",
            textTransform: "uppercase", color: "#b8902e", marginBottom: 16,
          }}>
            Juridisk
          </div>

          {/* H1 */}
          <h1 style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
            fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700,
            letterSpacing: "-0.02em", lineHeight: 1.1,
            color: "#1a1a2e", margin: "0 0 12px",
          }}>
            Personvernerklæring
          </h1>

          <p style={{ fontSize: 14, color: "#8a8a98", margin: "0 0 64px" }}>
            Sist oppdatert: April 2026
          </p>

          {/* Sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {SECTIONS.map(({ title, body, bullets, contact }) => (
              <div
                key={title}
                style={{
                  borderTop: "1px solid #e8e6dc",
                  paddingTop: 32,
                  paddingBottom: 32,
                }}
              >
                <h2 style={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                  fontSize: 20, fontWeight: 700,
                  color: "#1a1a2e", margin: "0 0 12px", letterSpacing: "-0.01em",
                }}>
                  {title}
                </h2>

                {body && (
                  <p style={{ fontSize: 15, color: "#5a5a6e", lineHeight: 1.8, margin: bullets ? "0 0 12px" : "0" }}>
                    {body}
                  </p>
                )}

                {bullets && (
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {bullets.map((b) => (
                      <li key={b} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ color: "#b8902e", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>·</span>
                        <span style={{ fontSize: 15, color: "#5a5a6e", lineHeight: 1.8 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {contact && (
                  <p style={{ fontSize: 15, color: "#5a5a6e", lineHeight: 1.8, margin: body ? "12px 0 0" : "0" }}>
                    <a
                      href={`mailto:${contact}`}
                      style={{ color: "#b8902e", textDecoration: "none" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.textDecoration = "underline"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.textDecoration = "none"; }}
                    >
                      {contact}
                    </a>
                  </p>
                )}
              </div>
            ))}
            {/* Final border */}
            <div style={{ borderTop: "1px solid #e8e6dc" }} />
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
