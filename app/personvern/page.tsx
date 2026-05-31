import "../landing.css";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";

export const metadata = {
  title: "Personvern — Ekspedenten",
  description:
    "Hvordan Ekspedenten behandler personopplysninger. GDPR-grunnlag, helse-data, dine rettigheter og sikkerhet — forklart forståelig.",
};

const TOC = [
  { id: "s1", n: "i.", t: "Innledning" },
  { id: "s2", n: "ii.", t: "Hvilke opplysninger vi samler" },
  { id: "s3", n: "iii.", t: "Hvor lagres data" },
  { id: "s4", n: "iv.", t: "Behandlingsgrunnlag" },
  { id: "s5", n: "v.", t: "Helse-data" },
  { id: "s6", n: "vi.", t: "Dine rettigheter" },
  { id: "s7", n: "vii.", t: "Sikkerhet" },
  { id: "s8", n: "viii.", t: "Cookies" },
  { id: "s9", n: "ix.", t: "Endringer" },
];

export default function PersonvernPage() {
  return (
    <div className="lp-root">
      <LandingNavbar />
      <main>
        <section className="lp-doc-header">
          <div className="lp-container">
            <span className="lp-label">Juridisk</span>
            <h1>Personvern</h1>
            <p className="lp-doc-lead">
              Hvordan vi behandler personopplysninger i Ekspedenten. Vi har skrevet det for å være forståelig, ikke bare juridisk holdbart.
            </p>
            <div className="lp-doc-meta">
              <span>Sist oppdatert <b>30. mai 2026</b></span>
              <span>Behandlingsansvarlig <b>Ekspedenten AS</b></span>
            </div>
          </div>
        </section>

        <section className="lp-doc-wrap">
          <div className="lp-container">
            <div className="lp-doc-card">
              <nav className="lp-doc-toc" aria-label="Innholdsfortegnelse">
                <h4>På denne siden</h4>
                <div className="lp-doc-toc-list">
                  {TOC.map((s) => (
                    <a key={s.id} href={`#${s.id}`}>
                      <span className="n">{s.n}</span>
                      {s.t}
                    </a>
                  ))}
                </div>
              </nav>

              <section className="lp-doc-section" id="s1">
                <div className="lp-doc-shead"><span className="lp-doc-num">i.</span><h2>Innledning</h2></div>
                <div className="lp-doc-sbody">
                  <p>Ekspedenten AS («vi», «oss») er behandlingsansvarlig for personopplysninger vi samler om besøkende på vår nettside og brukere av tjenesten vår. Denne personvernerklæringen forklarer hvilke opplysninger vi behandler, hvorfor, hvor lenge, og hvilke rettigheter du har.</p>
                  <p>For klinikker som bruker Ekspedenten til å behandle pasientdata: klinikken er behandlingsansvarlig for pasientdataene, og vi er databehandler. Detaljene er regulert i en egen databehandleravtale (DPA) som inngås ved oppstart.</p>
                </div>
              </section>

              <section className="lp-doc-section" id="s2">
                <div className="lp-doc-shead"><span className="lp-doc-num">ii.</span><h2>Hvilke opplysninger vi samler</h2></div>
                <div className="lp-doc-sbody">
                  <p>Vi samler bare det vi trenger for å levere tjenesten og kommunisere med deg:</p>
                  <ul>
                    <li><b>Når du fyller ut et skjema:</b> navn, e-post, telefon, klinikknavn, melding.</li>
                    <li><b>Når du bruker CRM-en:</b> innloggings-token, sesjonsdata, valgte preferanser.</li>
                    <li><b>Når du ringer eller chatter med Ekspedenten:</b> samtaleinnhold, telefonnummer, tid og varighet. Dette behandles på vegne av klinikken som databehandler.</li>
                    <li><b>Når du besøker nettsiden:</b> tekniske data fra hosting-leverandør (IP-adresse, nettlesertype) for å levere siden og oppdage feil.</li>
                  </ul>
                  <p>Vi setter ingen sporings- eller markedsføringscookies. Vi selger ikke data til tredjeparter.</p>
                </div>
              </section>

              <section className="lp-doc-section" id="s3">
                <div className="lp-doc-shead"><span className="lp-doc-num">iii.</span><h2>Hvor lagres data</h2></div>
                <div className="lp-doc-sbody">
                  <p>All data lagres innenfor EU. CRM-data lagres i <b>Frankfurt</b> via Supabase. Voice-AI kjører på Microsoft Azure i Sweden Central. Telnyx (telefoni) bruker EU-region. Ingen pasientdata forlater EU.</p>
                  <p>Vi bruker noen underleverandører som hver har inngått databehandleravtaler med oss. Hele listen finner du på <a className="in" href="/underleverandorer">Underleverandører →</a></p>
                </div>
              </section>

              <section className="lp-doc-section" id="s4">
                <div className="lp-doc-shead"><span className="lp-doc-num">iv.</span><h2>Behandlingsgrunnlag</h2></div>
                <div className="lp-doc-sbody">
                  <p>Vi behandler personopplysninger basert på følgende rettslige grunnlag etter GDPR artikkel 6:</p>
                  <ul>
                    <li><b>Avtale (Art. 6(1)(b))</b> — for å levere tjenesten du har avtalt med oss, inkludert support og fakturering.</li>
                    <li><b>Berettiget interesse (Art. 6(1)(f))</b> — for å forbedre tjenesten, oppdage feil og sikkerhetstrusler. Vi vurderer din interesse opp mot vår, og setter samtykke der det er påkrevd.</li>
                    <li><b>Samtykke (Art. 6(1)(a))</b> — der det er påkrevd, for eksempel ved markedsføring per e-post.</li>
                    <li><b>Rettslig forpliktelse (Art. 6(1)(c))</b> — for å overholde bokførings- og skattelovgivning.</li>
                  </ul>
                </div>
              </section>

              <section className="lp-doc-section" id="s5">
                <div className="lp-doc-shead"><span className="lp-doc-num">v.</span><h2>Helse-data</h2></div>
                <div className="lp-doc-sbody">
                  <p>Når Ekspedenten brukes på klinikker, kan tjenesten komme i kontakt med <b>helseopplysninger</b> (GDPR artikkel 9). Dette er sensitiv informasjon med strengere krav til behandling.</p>
                  <div className="lp-callout">
                    <div className="lab">Vår praksis for helse-data</div>
                    <p>Ekspedenten spør aldri om symptomer, diagnose eller medisinske detaljer. Hvis en pasient nevner slikt selv, eskaleres samtalen til klinikkens personale. Klinikken har behandlingsansvar; vi er databehandler underlagt streng DPA. All behandling skjer innenfor EU.</p>
                  </div>
                  <p>For klinikker er en separat databehandleravtale (DPA) etter GDPR artikkel 28 et obligatorisk vedlegg til tjenesteavtalen.</p>
                </div>
              </section>

              <section className="lp-doc-section" id="s6">
                <div className="lp-doc-shead"><span className="lp-doc-num">vi.</span><h2>Dine rettigheter</h2></div>
                <div className="lp-doc-sbody">
                  <p>Etter GDPR har du rett til å:</p>
                  <ul>
                    <li><b>Innsyn</b> — be om kopi av opplysninger vi har om deg.</li>
                    <li><b>Retting</b> — be oss korrigere feil eller mangler.</li>
                    <li><b>Sletting</b> — be oss slette opplysninger der det er rettslig grunnlag for det.</li>
                    <li><b>Begrensning</b> — be oss begrense behandlingen midlertidig.</li>
                    <li><b>Dataportabilitet</b> — få utlevert dine opplysninger i et standard format.</li>
                    <li><b>Innsigelse</b> — protestere mot behandling basert på berettiget interesse.</li>
                    <li><b>Klage</b> — sende klage til Datatilsynet hvis du mener vi behandler opplysninger feil.</li>
                  </ul>
                  <p>Ta kontakt på <a className="in" href="mailto:aleksander@ekspedenten.no">aleksander@ekspedenten.no</a> for å utøve rettighetene. Vi svarer innen 30 dager.</p>
                </div>
              </section>

              <section className="lp-doc-section" id="s7">
                <div className="lp-doc-shead"><span className="lp-doc-num">vii.</span><h2>Sikkerhet</h2></div>
                <div className="lp-doc-sbody">
                  <p>Vi behandler data med tekniske og organisatoriske tiltak som er egnet til risikonivået:</p>
                  <ul>
                    <li>Kryptering i transitt (HTTPS/TLS 1.3) og i hvile (AES-256).</li>
                    <li>Rollebasert tilgangsstyring i CRM-en (Row Level Security i Supabase).</li>
                    <li>To-faktor-autentisering (TOTP) er obligatorisk for alle admins.</li>
                    <li>Sikkerhetsmonitorering via Sentry (feil) og BetterStack (oppetid).</li>
                    <li>Regelmessige backups i EU-region.</li>
                  </ul>
                  <p>Ved brudd på sikkerheten som påvirker dine personopplysninger, varsler vi Datatilsynet innen 72 timer og deg dersom risikoen er høy.</p>
                </div>
              </section>

              <section className="lp-doc-section" id="s8">
                <div className="lp-doc-shead"><span className="lp-doc-num">viii.</span><h2>Cookies</h2></div>
                <div className="lp-doc-sbody">
                  <p>Vi bruker minimalt med cookies, kun det som er strengt nødvendig for innlogging og sikkerhet. Vi setter ingen sporings- eller markedsføringscookies. Detaljer på <a className="in" href="/cookies">Cookies-siden →</a></p>
                </div>
              </section>

              <section className="lp-doc-section" id="s9">
                <div className="lp-doc-shead"><span className="lp-doc-num">ix.</span><h2>Endringer</h2></div>
                <div className="lp-doc-sbody">
                  <p>Vi oppdaterer denne siden når praksis eller regelverk endres. Datoen øverst viser sist oppdatering. Vesentlige endringer varsles til innloggede brukere ved neste sesjon, og til klinikker per e-post minst 30 dager før de trer i kraft.</p>
                </div>
              </section>
            </div>

            <aside className="lp-doc-note">
              <h4>Kontakt og klager</h4>
              <p>Spørsmål om personvern: <a href="mailto:aleksander@ekspedenten.no">aleksander@ekspedenten.no</a> (CTO). For tjeneste-relaterte spørsmål, se <a href="/contact">Kontakt-siden</a>.</p>
              <p>Du har også rett til å klage til <a href="https://www.datatilsynet.no" target="_blank" rel="noopener noreferrer">Datatilsynet</a> hvis du mener vi behandler personopplysninger i strid med regelverket.</p>
            </aside>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
