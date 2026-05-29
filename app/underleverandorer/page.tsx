import "../landing.css";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";
import SubprocessorSubscribe from "@/components/SubprocessorSubscribe";
import styles from "./page.module.css";

export const metadata = {
  title: "Underleverandører — Ekspedenten",
  description:
    "Oversikt over underleverandørene som behandler data på Ekspedentens vegne. Alle innenfor EU/EØS, med signert databehandleravtale.",
};

type Subprocessor = {
  name: string;
  url: string;
  purpose: string;
  dataKind: string;
  region: string;
  dpa: string;
  addedAt: string;
};

type Category = {
  num: string;
  title: string;
  items: Subprocessor[];
};

const ADDED = "Lagt til 28. mai 2026";

const CATEGORIES: Category[] = [
  {
    num: "01",
    title: "Kjernedrift",
    items: [
      {
        name: "Supabase",
        url: "https://supabase.com",
        purpose: "Database og backend for leads, samtaler, bookinger og klinikkdata.",
        dataKind: "Kontaktinfo, bookingdata, samtale-metadata.",
        region: "EU · Frankfurt",
        dpa: "https://supabase.com/legal/dpa",
        addedAt: ADDED,
      },
      {
        name: "Microsoft Azure",
        url: "https://azure.microsoft.com",
        purpose: "AI-stemmemotor (Azure OpenAI og Speech) som driver Ekspedenten på telefon.",
        dataKind: "Transkribert tale fra pasientsamtaler. Rå lyd lagres ikke.",
        region: "EU · Sweden Central",
        dpa: "https://www.microsoft.com/licensing/docs/view/Microsoft-Products-and-Services-Data-Protection-Addendum-DPA",
        addedAt: ADDED,
      },
      {
        name: "Vercel",
        url: "https://vercel.com",
        purpose: "Hosting av nettside og serverless API-endepunkter.",
        dataKind: "Skjema-innsendinger, API-trafikk.",
        region: "EU · Frankfurt",
        dpa: "https://vercel.com/legal/dpa",
        addedAt: ADDED,
      },
    ],
  },
  {
    num: "02",
    title: "Kommunikasjon",
    items: [
      {
        name: "Telnyx",
        url: "https://telnyx.com",
        purpose: "Telefoni og SMS-utsendelse for innkommende anrop og varsler.",
        dataKind: "Telefonnumre, samtalemetadata, SMS-innhold.",
        region: "EU",
        dpa: "https://telnyx.com/resources/data-processing-addendum",
        addedAt: ADDED,
      },
      {
        name: "Resend",
        url: "https://resend.com",
        purpose: "Transaksjonelle e-poster (bekreftelser, varsler, kontakt-svar).",
        dataKind: "E-postadresser og meldingsinnhold.",
        region: "EU",
        dpa: "https://resend.com/legal/dpa",
        addedAt: ADDED,
      },
    ],
  },
  {
    num: "03",
    title: "Integrasjoner",
    items: [
      {
        name: "Leyr.io",
        url: "https://leyr.io",
        purpose: "Booking-integrasjon mot journalsystemene Opus, Muntra og Anita.",
        dataKind: "Pasientnavn og time-detaljer (kun ved booking).",
        region: "EU",
        dpa: "https://leyr.io",
        addedAt: ADDED,
      },
    ],
  },
  {
    num: "04",
    title: "Overvåkning",
    items: [
      {
        name: "Sentry",
        url: "https://sentry.io",
        purpose: "Feilrapportering og overvåkning i produksjon.",
        dataKind: "Tekniske feil og kontekst (kan inneholde IP-adresse).",
        region: "EU · Tyskland",
        dpa: "https://sentry.io/legal/dpa/",
        addedAt: ADDED,
      },
      {
        name: "BetterStack",
        url: "https://betterstack.com",
        purpose: "Uptime-overvåkning av offentlige tjenester og status-side.",
        dataKind: "Offentlige URL-er. Ingen personopplysninger.",
        region: "EU",
        dpa: "https://betterstack.com/legal/dpa",
        addedAt: ADDED,
      },
    ],
  },
];

const TOTAL = CATEGORIES.reduce((sum, c) => sum + c.items.length, 0);

export default function UnderleverandorerPage() {
  return (
    <div className="lp-root">
      <LandingNavbar />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={`${styles.wrap} ${styles.heroInner}`}>
            <span className={styles.eyebrow}>
              <span className={styles.dot} />
              Personvern
            </span>
            <h1 className={styles.h1}>
              Hvem som behandler data <i>på våre vegne.</i>
            </h1>
            <p className={styles.lead}>
              Ekspedenten bruker noen underleverandører for å levere tjenesten. Alle behandler data innenfor EU/EØS, i samsvar med GDPR og signert databehandleravtale (DPA). Listen oppdateres når den endres, og klinikker varsles minst 30 dager før.
            </p>
            <div className={styles.stats}>
              <span>{TOTAL} underleverandører</span>
              <span className={styles.statsSep}>·</span>
              <span>{CATEGORIES.length} kategorier</span>
              <span className={styles.statsSep}>·</span>
              <span>Sist oppdatert 28. mai 2026</span>
            </div>
          </div>
        </section>

        <section className={styles.subscribeSection}>
          <div className={styles.wrap}>
            <SubprocessorSubscribe />
          </div>
        </section>

        <section>
          <div className={styles.wrap}>
            <div className={styles.listCard}>
              <div className={styles.listInner}>
                {CATEGORIES.map((cat) => (
                  <div key={cat.num}>
                    <div className={styles.sectionHead}>
                      <span className={styles.sectionNum}>{cat.num}</span>
                      <h2 className={styles.sectionTitle}>
                        <i>{cat.title}</i>
                      </h2>
                    </div>
                    {cat.items.map((item) => (
                      <div key={item.name} className={styles.row}>
                        <div className={styles.cellName}>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.name}
                          >
                            {item.name}
                          </a>
                          <a
                            href={item.dpa}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.dpaLink}
                          >
                            DPA →
                          </a>
                        </div>
                        <div className={styles.cellPurpose}>
                          <span className={styles.purpose}>{item.purpose}</span>
                          <span className={styles.dataKind}>{item.dataKind}</span>
                        </div>
                        <span className={styles.regionPill}>{item.region}</span>
                        <span className={styles.addedAt}>{item.addedAt}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.note}>
              <h3 className={styles.noteTitle}>Endringer og kontakt</h3>
              <p className={styles.noteP}>
                Ved endring av underleverandører varsler vi alle klinikker på e-post minst 30 dager før endringen trer i kraft, slik at dere kan vurdere konsekvensene for egen databehandling.
              </p>
              <p className={styles.noteP}>
                Spørsmål, eller behov for en signert databehandleravtale (DPA)? Kontakt{" "}
                <a href="mailto:aleksander@ekspedenten.no">aleksander@ekspedenten.no</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
