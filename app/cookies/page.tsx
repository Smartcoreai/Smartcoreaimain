import "../landing.css";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";

export const metadata = {
  title: "Cookies — Ekspedenten",
  description:
    "Vi bruker minimalt med cookies. Hvilke vi setter, hvorfor, og hvordan du administrerer dem selv — forklart forståelig.",
};

const TOC = [
  { id: "s1", n: "i.", t: "Hva er cookies" },
  { id: "s2", n: "ii.", t: "Hvilke vi bruker" },
  { id: "s3", n: "iii.", t: "Tredjepartstjenester" },
  { id: "s4", n: "iv.", t: "Administrere cookies" },
  { id: "s5", n: "v.", t: "Endringer" },
];

export default function CookiesPage() {
  return (
    <div className="lp-root">
      <LandingNavbar />
      <main>
        <section className="lp-doc-header">
          <div className="lp-container">
            <span className="lp-label">Juridisk</span>
            <h1>Cookies</h1>
            <p className="lp-doc-lead">
              Vi bruker minimalt med cookies. Denne siden forklarer hvilke vi setter, hvorfor, og hvordan du kan administrere dem selv.
            </p>
            <div className="lp-doc-meta">
              <span>Sist oppdatert <b>30. mai 2026</b></span>
              <span>Dekker <b>ekspedenten.no og app.ekspedenten.no</b></span>
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
                <div className="lp-doc-shead"><span className="lp-doc-num">i.</span><h2>Hva er cookies</h2></div>
                <div className="lp-doc-sbody">
                  <p>Cookies er små tekstfiler som lagres på enheten din når du besøker en nettside. De gjør at nettsiden husker preferanser, innstillinger og innlogging på tvers av sidevisninger.</p>
                  <p>Noen cookies er strengt nødvendige for at tjenesten skal fungere (for eksempel innlogging). Andre er valgfrie og brukes til analyse eller markedsføring. Vi bruker kun det som er nødvendig.</p>
                  <div className="lp-callout">
                    <div className="lab">Vår praksis</div>
                    <p>Vi setter ingen sporings- eller markedsføringscookies. Vi sporer deg ikke på tvers av nettsider, og vi selger ikke data til tredjeparter.</p>
                  </div>
                </div>
              </section>

              <section className="lp-doc-section" id="s2">
                <div className="lp-doc-shead"><span className="lp-doc-num">ii.</span><h2>Hvilke vi bruker</h2></div>
                <div className="lp-doc-sbody">
                  <p>Alle cookies vi setter er <b>strengt nødvendige</b> for at tjenesten skal fungere. De faller under unntaket fra samtykkekravet i <b>Ekomloven § 2-7b andre ledd</b>, og krever derfor ikke samtykke-banner.</p>

                  <div className="lp-ck-table">
                    <div className="lp-ck-row h">
                      <div>Navn</div>
                      <div>Formål</div>
                      <div>Type</div>
                      <div>Varighet</div>
                    </div>
                    <div className="lp-ck-row">
                      <div className="lp-ck-nm">sb-access-token</div>
                      <div className="lp-ck-pp">Holder deg innlogget på app.ekspedenten.no (CRM).</div>
                      <div className="lp-ck-ty">Nødvendig</div>
                      <div className="lp-ck-dur">1 time</div>
                    </div>
                    <div className="lp-ck-row">
                      <div className="lp-ck-nm">sb-refresh-token</div>
                      <div className="lp-ck-pp">Fornyer innlogging automatisk så du slipper å logge inn på nytt.</div>
                      <div className="lp-ck-ty">Nødvendig</div>
                      <div className="lp-ck-dur">30 dager</div>
                    </div>
                  </div>

                  <div className="lp-callout">
                    <div className="lab">Lignende teknologier</div>
                    <p>Vi bruker også <b>localStorage</b> i nettleseren din for å lagre tekniske preferanser (for eksempel valgt språk og sortering i CRM-en). Dette er ikke cookies, men dekkes av samme regelverk. Vi lagrer ingen identifiserbar informasjon i localStorage utover det som er nødvendig for innlogging.</p>
                  </div>
                </div>
              </section>

              <section className="lp-doc-section" id="s3">
                <div className="lp-doc-shead"><span className="lp-doc-num">iii.</span><h2>Tredjepartstjenester</h2></div>
                <div className="lp-doc-sbody">
                  <p>Vi bruker noen tredjepartstjenester for å levere Ekspedenten. Når du besøker våre sider, kan disse sette egne cookies under sitt eget domene:</p>
                  <ul>
                    <li><b>Vercel</b> (hosting) kan sette tekniske cookies for ytelse og sikkerhet. Setter ingen sporing.</li>
                    <li><b>Sentry</b> (feilrapportering) setter normalt ingen cookies i nettleseren.</li>
                    <li><b>BetterStack</b> (status-side på eget subdomene) administrerer egne cookies på status.ekspedenten.no.</li>
                  </ul>
                  <p>Hele listen over underleverandører finner du på <a className="in" href="/underleverandorer">Underleverandører →</a></p>
                </div>
              </section>

              <section className="lp-doc-section" id="s4">
                <div className="lp-doc-shead"><span className="lp-doc-num">iv.</span><h2>Administrere cookies</h2></div>
                <div className="lp-doc-sbody">
                  <p>Du kan blokkere eller slette cookies via innstillingene i nettleseren din. Slik gjør du det:</p>
                  <ul>
                    <li><a className="in" href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Chrome</a></li>
                    <li><a className="in" href="https://support.apple.com/no-no/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
                    <li><a className="in" href="https://support.mozilla.org/no/kb/aktiver-og-deaktiver-informasjonskapsler" target="_blank" rel="noopener noreferrer">Firefox</a></li>
                    <li><a className="in" href="https://support.microsoft.com/nb-no/microsoft-edge/slett-informasjonskapsler-i-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Edge</a></li>
                  </ul>
                  <div className="lp-callout">
                    <div className="lab">Konsekvens</div>
                    <p>Hvis du blokkerer nødvendige cookies, kan deler av tjenesten slutte å fungere. Særlig vil du ikke kunne logge inn på app.ekspedenten.no.</p>
                  </div>
                </div>
              </section>

              <section className="lp-doc-section" id="s5">
                <div className="lp-doc-shead"><span className="lp-doc-num">v.</span><h2>Endringer</h2></div>
                <div className="lp-doc-sbody">
                  <p>Denne siden oppdateres når vi endrer cookie-bruken vår. Datoen øverst viser sist oppdatering. Vesentlige endringer varsles til innloggede brukere ved neste sesjon.</p>
                </div>
              </section>
            </div>

            <aside className="lp-doc-note">
              <h4>Spørsmål om cookies</h4>
              <p>Har du spørsmål om hvilke cookies vi setter, eller ønsker du å vite mer om hvordan vi behandler personopplysninger? Se vår <a href="/personvern">Personvernerklæring</a>, eller kontakt <a href="mailto:aleksander@ekspedenten.no">aleksander@ekspedenten.no</a>.</p>
              <p>Du har også rett til å klage til <a href="https://www.datatilsynet.no" target="_blank" rel="noopener noreferrer">Datatilsynet</a> hvis du mener vi behandler personopplysninger i strid med regelverket.</p>
            </aside>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
