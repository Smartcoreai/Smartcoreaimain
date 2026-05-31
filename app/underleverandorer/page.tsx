import "../landing.css";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";
import SubprocessorSubscribe from "@/components/SubprocessorSubscribe";

export const metadata = {
  title: "Underleverandører — Ekspedenten",
  description:
    "Tjenestene Ekspedenten bruker for å levere produktet, og hvor data behandles. Alle innenfor EU/EØS med signert databehandleravtale.",
};

type Subprocessor = {
  name: string;
  meta: string;
  dpa: string;
  purpose: string;
  data: string;
  region: string;
  regionNorge?: boolean;
  added: string;
};

type Category = { num: string; title: string; items: Subprocessor[] };

const CATEGORIES: Category[] = [
  {
    num: "i.",
    title: "Kjernedrift",
    items: [
      {
        name: "Supabase",
        meta: "Database og autentisering",
        dpa: "https://supabase.com/legal/dpa",
        purpose: "Lagrer CRM-data, pasientregister, samtale-logger, brukerinnlogging.",
        data: "Datakategori: kontaktinfo, pasient-metadata, samtaleinnhold",
        region: "EU · Frankfurt",
        added: "Lagt til mars 2026",
      },
      {
        name: "Vercel",
        meta: "Hosting og deployment",
        dpa: "https://vercel.com/legal/dpa",
        purpose: "Server nettsiden og CRM-en. Behandler IP-adresser og tekniske data for å levere innhold.",
        data: "Datakategori: tekniske data (IP, nettlesertype)",
        region: "EU · Frankfurt",
        added: "Lagt til mars 2026",
      },
      {
        name: "Amazon Web Services",
        meta: "Underliggende infrastruktur (via Supabase)",
        dpa: "https://aws.amazon.com/compliance/gdpr-center/",
        purpose: "Fysisk infrastruktur for Supabase. All data fysisk lagret i AWS Frankfurt-region.",
        data: "Datakategori: alle data håndtert av Supabase",
        region: "EU · Frankfurt",
        added: "Lagt til mars 2026",
      },
    ],
  },
  {
    num: "ii.",
    title: "Kommunikasjon",
    items: [
      {
        name: "Telnyx",
        meta: "Telefoni og SMS",
        dpa: "https://telnyx.com/resources/data-processing-addendum",
        purpose: "Mottar inngående anrop, sender SMS-bekreftelser. Behandler samtale-metadata og telefonnummer.",
        data: "Datakategori: telefonnummer, samtaletid, SMS-innhold",
        region: "EU",
        added: "Lagt til april 2026",
      },
      {
        name: "Resend",
        meta: "Transaksjonell e-post",
        dpa: "https://resend.com/legal/dpa",
        purpose: "Sender bekreftelsesmail, faktura, varsler. Behandler e-postadresser og meldingsinnhold.",
        data: "Datakategori: e-postadresse, meldingsinnhold",
        region: "EU",
        added: "Lagt til april 2026",
      },
    ],
  },
  {
    num: "iii.",
    title: "Integrasjoner",
    items: [
      {
        name: "Microsoft Azure",
        meta: "Voice-AI (Speech-to-Text, Text-to-Speech)",
        dpa: "https://www.microsoft.com/licensing/docs/view/Microsoft-Products-and-Services-Data-Protection-Addendum-DPA",
        purpose: "Transkriberer pasienthenvendelser og genererer Arias stemme. Behandling skjer i sanntid uten lagring.",
        data: "Datakategori: lydstrøm, transkripsjon",
        region: "EU · Sweden Central",
        added: "Lagt til april 2026",
      },
      {
        name: "Anthropic",
        meta: "Språkmodell (Claude)",
        dpa: "https://www.anthropic.com/legal/dpa",
        purpose: "Genererer Arias svar basert på pasientens henvendelse. Data brukes ikke til modelltrening.",
        data: "Datakategori: samtaleinnhold (anonymisert i prompt)",
        region: "EU",
        added: "Lagt til april 2026",
      },
    ],
  },
  {
    num: "iv.",
    title: "Overvåkning",
    items: [
      {
        name: "Sentry",
        meta: "Feilrapportering",
        dpa: "https://sentry.io/legal/dpa/",
        purpose: "Fanger applikasjonsfeil for å forbedre stabilitet. Personopplysninger filtreres ut før sending.",
        data: "Datakategori: tekniske feilmeldinger, stack traces",
        region: "EU · Tyskland",
        added: "Lagt til mai 2026",
      },
      {
        name: "BetterStack",
        meta: "Oppetidsovervåkning + status-side",
        dpa: "https://betterstack.com/legal/data-processing-agreement",
        purpose: "Måler oppetid og responstid. Ingen personopplysninger.",
        data: "Datakategori: tekniske status-data",
        region: "EU",
        added: "Lagt til mai 2026",
      },
    ],
  },
];

const TOTAL = CATEGORIES.reduce((sum, c) => sum + c.items.length, 0);

export default function UnderleverandorerPage() {
  return (
    <div className="lp-root">
      <LandingNavbar />
      <main>
        <section className="lp-doc-header">
          <div className="lp-container">
            <span className="lp-label">Juridisk</span>
            <h1>Underleverandører</h1>
            <p className="lp-doc-lead">
              Tjenestene Ekspedenten bruker for å levere produktet, og hvor data behandles. Vi varsler om endringer minst 30 dager før de trer i kraft.
            </p>
            <div className="lp-doc-meta">
              <span>Sist oppdatert <b>30. mai 2026</b></span>
              <span>Totalt <b>{TOTAL} underleverandører</b></span>
            </div>

            <SubprocessorSubscribe />
          </div>
        </section>

        <section className="lp-doc-wrap wide">
          <div className="lp-container">
            <div className="lp-doc-card wide">
              <div className="lp-doc-intro">
                <p>En underleverandør (sub-processor) er en tredjepart som behandler personopplysninger på vegne av Ekspedenten for å kunne levere tjenesten. Vi har inngått <b>databehandleravtaler etter GDPR artikkel 28</b> med samtlige.</p>
                <p>All databehandling foregår innenfor EU/EØS. For detaljer om hvordan vi behandler data, se vår <a className="in" href="/personvern">Personvernerklæring</a>.</p>
              </div>

              {CATEGORIES.map((cat) => (
                <div key={cat.num} className="lp-doc-cat">
                  <div className="lp-doc-cathead">
                    <span className="num">{cat.num}</span>
                    <h2>{cat.title}</h2>
                  </div>
                  {cat.items.map((item) => (
                    <div key={item.name} className="lp-sub-row">
                      <div className="lp-sub-name">
                        {item.name}
                        <span className="meta-line">{item.meta}</span>
                        <a className="dpa" href={item.dpa} target="_blank" rel="noopener noreferrer">DPA →</a>
                      </div>
                      <div className="lp-sub-purpose">
                        {item.purpose}
                        <span className="data">{item.data}</span>
                      </div>
                      <div>
                        <span className={`lp-sub-region${item.regionNorge ? " norge" : ""}`}>{item.region}</span>
                        <span className="lp-sub-added">{item.added}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <aside className="lp-doc-note wide">
              <h4>Endringer og varsel</h4>
              <p>Vi varsler alle klinikker minst <b>30 dager før</b> en ny underleverandør tas i bruk eller en eksisterende byttes ut. Du kan også abonnere via skjemaet øverst for å få varsel uavhengig av om du er kunde.</p>
              <p>Spørsmål om underleverandører: <a href="mailto:aleksander@ekspedenten.no">aleksander@ekspedenten.no</a>. Du har også rett til å klage til <a href="https://www.datatilsynet.no" target="_blank" rel="noopener noreferrer">Datatilsynet</a>.</p>
            </aside>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
