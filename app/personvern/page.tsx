import "../landing.css";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";
import styles from "./page.module.css";

export const metadata = {
  title: "Personvernerklæring · Ekspedenten",
  description:
    "Hvordan Ekspedenten behandler personopplysninger for nettside-besøkende, CRM-brukere og pasienter. Alt innenfor EU/EØS, i samsvar med GDPR.",
};

type TocItem = { num: string; href: string; title: string };

const TOC: TocItem[] = [
  { num: "01", href: "#innledning",        title: "Innledning" },
  { num: "02", href: "#data",              title: "Hva slags data" },
  { num: "03", href: "#underleverandorer", title: "Underleverandører" },
  { num: "04", href: "#grunnlag",          title: "Lovlig grunnlag" },
  { num: "05", href: "#lagringstid",       title: "Lagringstid" },
  { num: "06", href: "#rettigheter",       title: "Dine rettigheter" },
  { num: "07", href: "#cookies",           title: "Cookies" },
  { num: "08", href: "#endringer",         title: "Endringer" },
  { num: "09", href: "#datatilsynet",      title: "Datatilsynet" },
];

export default function PersonvernPage() {
  return (
    <div className="lp-root">
      <LandingNavbar />
      <main className={styles.page}>
        {/* HERO */}
        <section className={styles.hero}>
          <div className={`${styles.wrap} ${styles.heroInner}`}>
            <span className={styles.eyebrow}>
              <span className={styles.dot} />
              Juridisk
            </span>
            <h1 className={styles.h1}>Personvernerklæring</h1>
            <p className={styles.lead}>
              Denne erklæringen forklarer hvilke personopplysninger vi behandler, hvorfor, hvor lenge, og hvilke rettigheter du har. Vi behandler all data innenfor EU/EØS, i samsvar med GDPR.
            </p>
            <div className={styles.meta}>
              <span className={styles.metaItem}>
                <span className={styles.metaDot} />Sist oppdatert 29. mai 2026
              </span>
              <span className={styles.metaItem}>
                <span className={styles.metaDot} />Dekker ekspedenten.no og app.ekspedenten.no
              </span>
              <span className={styles.metaItem}>
                <span className={styles.metaDot} />Sist juridisk gjennomgang etter pilot
              </span>
            </div>
          </div>
        </section>

        {/* TOC */}
        <section className={styles.tocSection}>
          <div className={styles.wrap}>
            <div className={`${styles.toc} ${styles.narrow}`}>
              <p className={styles.tocTitle}>På denne siden</p>
              <div className={styles.tocGrid}>
                {TOC.map((item) => (
                  <a key={item.num} href={item.href} className={styles.tocItem}>
                    <span className={styles.tocNum}>{item.num}</span>
                    <span>{item.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* HOVED-KORT */}
        <section>
          <div className={styles.wrap}>
            <div className={`${styles.mainCard} ${styles.narrow}`}>
              <div className={styles.mainInner}>

                {/* 01 Innledning */}
                <article id="innledning" className={styles.section}>
                  <div className={styles.sectionHead}>
                    <span className={styles.sectionNum}>01</span>
                    <h2 className={styles.sectionTitle}>
                      <i>Inn</i>ledning
                    </h2>
                  </div>
                  <p className={styles.p}>
                    Ekspedenten AS (under registrering) er et norsk selskap med base i Bergen. Vi leverer en AI-basert digital ekspedient til tannklinikker. Hun svarer på telefon og web-chat, booker timer, og sender bekreftelser, mens en CRM-plattform håndterer leads og oppfølging.
                  </p>
                  <p className={styles.p}>
                    Klinikken er behandlingsansvarlig for pasientdata. Ekspedenten er databehandler på vegne av klinikken, basert på signert databehandleravtale (DPA).
                  </p>
                </article>

                {/* 02 Hva slags data */}
                <article id="data" className={styles.section}>
                  <div className={styles.sectionHead}>
                    <span className={styles.sectionNum}>02</span>
                    <h2 className={styles.sectionTitle}>
                      <i>Hva</i> slags data vi behandler
                    </h2>
                  </div>
                  <p className={styles.p}>Vi behandler kun det som er nødvendig for å levere tjenesten:</p>
                  <ul className={styles.list}>
                    <li><strong>Kontaktopplysninger:</strong> navn, telefonnummer, e-postadresse.</li>
                    <li><strong>Booking-detaljer:</strong> tjeneste, tidspunkt, klinikk-tilknytning.</li>
                    <li><strong>Samtale-metadata:</strong> tidspunkt, varighet, utfall. Transkribert tekst lagres for kvalitetssikring, men rå lyd lagres aldri.</li>
                    <li><strong>Tekniske logger:</strong> IP-adresse, nettleser, feilmeldinger. Brukes til drift og feilretting.</li>
                  </ul>
                  <div className={styles.callout}>
                    <span className={styles.calloutLabel}>Helse-data</span>
                    <p className={styles.calloutText}>
                      Ekspedenten spør ikke aktivt om symptomer, diagnoser eller andre helseopplysninger. Nevner pasienten det frivillig, lagres det ikke utover det som er nødvendig for å overføre samtalen til klinikken.
                    </p>
                  </div>
                </article>

                {/* 03 Underleverandører */}
                <article id="underleverandorer" className={styles.section}>
                  <div className={styles.sectionHead}>
                    <span className={styles.sectionNum}>03</span>
                    <h2 className={styles.sectionTitle}>
                      <i>Under</i>leverandører
                    </h2>
                  </div>
                  <p className={styles.p}>
                    Vi behandler data sammen med noen utvalgte underleverandører, alle innenfor EU/EØS og med signert databehandleravtale (DPA). Den til enhver tid gjeldende listen finner du her:{" "}
                    <a href="/underleverandorer" className={styles.linkInternal}>Underleverandører →</a>
                  </p>
                  <div className={styles.callout}>
                    <span className={styles.calloutLabel}>Hvor lagres data</span>
                    <p className={styles.calloutText}>
                      All persondata behandles og lagres innenfor EU/EØS. CRM og database ligger i Frankfurt (Supabase). AI-stemmemotor kjører i Sweden Central (Microsoft Azure). Ingen pasientdata forlater EU.
                    </p>
                  </div>
                </article>

                {/* 04 Lovlig grunnlag */}
                <article id="grunnlag" className={styles.section}>
                  <div className={styles.sectionHead}>
                    <span className={styles.sectionNum}>04</span>
                    <h2 className={styles.sectionTitle}>
                      <i>Lov</i>lig grunnlag (GDPR Art. 6)
                    </h2>
                  </div>
                  <p className={styles.p}>Vi baserer behandlingen på følgende grunnlag:</p>
                  <ul className={styles.list}>
                    <li><strong>Berettigede interesser (Art. 6(1)(f))</strong> for å levere tjenesten klinikken har bestilt, og for sikkerhets- og driftsformål.</li>
                    <li><strong>Avtale (Art. 6(1)(b))</strong> når en pasient booker time eller tar kontakt via klinikken.</li>
                    <li><strong>Samtykke (Art. 6(1)(a))</strong> når dette eksplisitt innhentes, for eksempel ved tilmelding på underleverandør-varsler.</li>
                  </ul>
                </article>

                {/* 05 Lagringstid */}
                <article id="lagringstid" className={styles.section}>
                  <div className={styles.sectionHead}>
                    <span className={styles.sectionNum}>05</span>
                    <h2 className={styles.sectionTitle}>
                      <i>Lag</i>ringstid
                    </h2>
                  </div>
                  <p className={styles.p}>Vi lagrer data kun så lenge det er nødvendig:</p>
                  <ul className={styles.list}>
                    <li><strong>Aktive lead- og bookingdata:</strong> så lenge avtalen med klinikken løper.</li>
                    <li><strong>Etter avsluttet kundeforhold:</strong> slettes innen 30 dager. På forespørsel kan vi eksportere dataene først (CSV eller JSON).</li>
                    <li><strong>Tekniske logger og feilrapporter:</strong> 90 dager (Sentry, Vercel).</li>
                    <li><strong>Subscribe-liste for underleverandør-varsler:</strong> til du avmelder.</li>
                  </ul>
                </article>

                {/* 06 Dine rettigheter */}
                <article id="rettigheter" className={styles.section}>
                  <div className={styles.sectionHead}>
                    <span className={styles.sectionNum}>06</span>
                    <h2 className={styles.sectionTitle}>
                      <i>Dine</i> rettigheter
                    </h2>
                  </div>
                  <p className={styles.p}>Du har følgende rettigheter under GDPR:</p>
                  <ul className={styles.list}>
                    <li><strong>Innsyn (Art. 15)</strong> i hvilke data vi har om deg.</li>
                    <li><strong>Retting (Art. 16)</strong> av feilaktige opplysninger.</li>
                    <li><strong>Sletting (Art. 17),</strong> også kalt &quot;retten til å bli glemt&quot;.</li>
                    <li><strong>Begrensning (Art. 18)</strong> av behandlingen.</li>
                    <li><strong>Dataportabilitet (Art. 20).</strong> Du kan be om dataene i et maskinlesbart format.</li>
                    <li><strong>Innsigelse (Art. 21)</strong> mot behandling basert på berettigede interesser.</li>
                  </ul>
                  <p className={styles.p}>
                    For å utøve disse rettighetene, kontakt klinikken din (behandlingsansvarlig). De vil videreformidle til oss om nødvendig. Du kan også kontakte oss direkte på{" "}
                    <a href="mailto:aleksander@ekspedenten.no" className={styles.linkMail}>aleksander@ekspedenten.no</a>.
                  </p>
                </article>

                {/* 07 Cookies */}
                <article id="cookies" className={styles.section}>
                  <div className={styles.sectionHead}>
                    <span className={styles.sectionNum}>07</span>
                    <h2 className={styles.sectionTitle}>
                      <i>Cook</i>ies
                    </h2>
                  </div>
                  <p className={styles.p}>
                    Vi bruker kun strengt nødvendige cookies på ekspedenten.no (innlogging, preferanser). Vi setter ingen tredjeparts-sporing eller markedsføringscookies uten samtykke.
                  </p>
                  <p className={styles.p}>
                    På CRM-en (app.ekspedenten.no) brukes session-cookies for å holde deg innlogget.
                  </p>
                </article>

                {/* 08 Endringer */}
                <article id="endringer" className={styles.section}>
                  <div className={styles.sectionHead}>
                    <span className={styles.sectionNum}>08</span>
                    <h2 className={styles.sectionTitle}>
                      <i>End</i>ringer
                    </h2>
                  </div>
                  <p className={styles.p}>
                    Denne erklæringen oppdateres når det er nødvendig. Vesentlige endringer varsles til klinikker på e-post minst 30 dager før endringen trer i kraft. Datoen øverst på siden viser sist oppdatering.
                  </p>
                </article>

                {/* 09 Datatilsynet */}
                <article id="datatilsynet" className={styles.section}>
                  <div className={styles.sectionHead}>
                    <span className={styles.sectionNum}>09</span>
                    <h2 className={styles.sectionTitle}>
                      <i>Data</i>tilsynet
                    </h2>
                  </div>
                  <p className={styles.p}>
                    Hvis du mener at vi ikke behandler dine personopplysninger i samsvar med GDPR eller norsk personvernregelverk, kan du klage til{" "}
                    <a
                      href="https://www.datatilsynet.no"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkExternal}
                    >
                      Datatilsynet
                    </a>
                    . Vi setter pris på om du tar kontakt med oss først, slik at vi kan rette opp.
                  </p>
                </article>

              </div>
            </div>

            {/* Note-boks */}
            <div className={`${styles.note} ${styles.narrow}`}>
              <h3 className={styles.noteTitle}>Spørsmål om personvern</h3>
              <p className={styles.noteP}>
                Behandlingsansvarlig for pasientdata er klinikken. For tekniske spørsmål om hvordan Ekspedenten behandler data, eller for behov for signert databehandleravtale (DPA), kontakt{" "}
                <a href="mailto:aleksander@ekspedenten.no" className={styles.linkMail}>aleksander@ekspedenten.no</a>.
              </p>
              <p className={styles.noteP}>
                Ekspedenten AS, Bergen, Norge. Org.nr. under registrering.
              </p>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
