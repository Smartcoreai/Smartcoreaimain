import "../landing.css";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";

export const metadata = {
  title: "Vilkår — Ekspedenten",
  description:
    "Vilkårene som regulerer bruken av Ekspedenten mellom Ekspedenten AS og klinikker. Pris, binding, SLA, ansvar og personvern — forklart forståelig.",
};

const TOC = [
  { id: "s1", n: "i.", t: "Om disse vilkårene" },
  { id: "s2", n: "ii.", t: "Tjenesten Ekspedenten" },
  { id: "s3", n: "iii.", t: "Avtaleinngåelse og prøveperiode" },
  { id: "s4", n: "iv.", t: "Pris og betaling" },
  { id: "s5", n: "v.", t: "Bindingstid og oppsigelse" },
  { id: "s6", n: "vi.", t: "Oppstartsgaranti og SLA" },
  { id: "s7", n: "vii.", t: "Klinikkens ansvar" },
  { id: "s8", n: "viii.", t: "Personopplysninger og data" },
  { id: "s9", n: "ix.", t: "AI-transparens og medisinsk grense" },
  { id: "s10", n: "x.", t: "Immaterielle rettigheter" },
  { id: "s11", n: "xi.", t: "Ansvarsbegrensning" },
  { id: "s12", n: "xii.", t: "Endringer" },
  { id: "s13", n: "xiii.", t: "Lovvalg og tvisteløsning" },
];

export default function TermsPage() {
  return (
    <div className="lp-root">
      <LandingNavbar />
      <main>
        <section className="lp-doc-header">
          <div className="lp-container">
            <span className="lp-label">Juridisk</span>
            <h1>Vilkår</h1>
            <p className="lp-doc-lead">
              Disse vilkårene regulerer bruken av Ekspedenten mellom Ekspedenten AS og klinikker som tar tjenesten i bruk. Skrevet for å være forståelige, ikke bare juridisk holdbare.
            </p>
            <div className="lp-doc-meta">
              <span>Sist oppdatert <b>30. mai 2026</b></span>
              <span>Gjelder <b>Ekspedenten AS, org.nr under registrering</b></span>
              <span>Versjon <b>1.0</b></span>
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
                <div className="lp-doc-shead"><span className="lp-doc-num">i.</span><h2>Om disse vilkårene</h2></div>
                <div className="lp-doc-sbody">
                  <p>Disse vilkårene utgjør avtalen mellom Ekspedenten AS («Ekspedenten», «vi», «oss») og den klinikk eller virksomhet som inngår avtale om bruk av tjenesten («klinikken», «du»).</p>
                  <p>Ved å bestille tjenesten, signere et tilbud, eller ta tjenesten i bruk, aksepterer du disse vilkårene som bindende. Hvis du representerer en virksomhet, bekrefter du at du har fullmakt til å binde virksomheten.</p>
                  <div className="lp-doc-defs">
                    <h4>Sentrale begreper</h4>
                    <dl>
                      <dt>Tjenesten</dt><dd>Ekspedentens AI-resepsjonist, inkludert telefon, chat, SMS-bekreftelser, lead-oppfølging og CRM-dashboard.</dd>
                      <dt>Klinikken</dt><dd>Den virksomheten som bruker tjenesten under sin egen organisasjon.</dd>
                      <dt>DPA</dt><dd>Databehandleravtale etter GDPR artikkel 28, vedlagt avtalen.</dd>
                      <dt>SLA</dt><dd>Service Level Agreement, måling av tilgjengelighet og responstid.</dd>
                    </dl>
                  </div>
                </div>
              </section>

              <section className="lp-doc-section" id="s2">
                <div className="lp-doc-shead"><span className="lp-doc-num">ii.</span><h2>Tjenesten Ekspedenten</h2></div>
                <div className="lp-doc-sbody">
                  <p>Ekspedenten er en AI-drevet resepsjonist for klinikker. Tjenesten består av:</p>
                  <ul>
                    <li><b>AI-resepsjonist (Aria)</b> som tar inngående anrop, sjekker tilgjengelighet, foreslår tider og bekrefter bookinger via SMS, 24 timer i døgnet.</li>
                    <li><b>Chat-funksjon</b> for nettsider, med samme funksjonalitet som telefon.</li>
                    <li><b>Lead-oppfølging</b> i opptil 7 dager via SMS og e-post for nye henvendelser.</li>
                    <li><b>CRM-dashboard</b> (app.ekspedenten.no) for innsyn i samtaler, bookinger og forbruk.</li>
                    <li><b>Integrasjoner</b> mot vanlige journalsystemer (Opus, Muntra, Anita) og kalendertjenester.</li>
                  </ul>
                  <p>Tjenestens funksjoner kan utvides eller endres. Vesentlige endringer som påvirker bruken varsles minst 30 dager før de trer i kraft.</p>
                </div>
              </section>

              <section className="lp-doc-section" id="s3">
                <div className="lp-doc-shead"><span className="lp-doc-num">iii.</span><h2>Avtaleinngåelse og prøveperiode</h2></div>
                <div className="lp-doc-sbody">
                  <p>Avtalen inngås ved skriftlig aksept av tilbud, signering av ordrebekreftelse, eller ved at klinikken tar tjenesten i bruk.</p>
                  <p>Nye klinikker får <b>14 dagers prøveperiode</b> fra avtalt oppstartsdato. I prøveperioden kan klinikken si opp avtalen uten kostnad eller bindingstid. Eventuelle innbetalte beløp refunderes i sin helhet.</p>
                  <p>Etter prøveperioden løper avtalen videre på de vilkår som er beskrevet i punkt 4 og 5.</p>
                </div>
              </section>

              <section className="lp-doc-section" id="s4">
                <div className="lp-doc-shead"><span className="lp-doc-num">iv.</span><h2>Pris og betaling</h2></div>
                <div className="lp-doc-sbody">
                  <p>Pris fremgår av tilbudet eller bestillingen. Alle priser er oppgitt i norske kroner (NOK) eksklusive merverdiavgift.</p>
                  <p>Faktura sendes forskuddsvis månedlig eller etter avtale. Betalingsfrist er 14 dager fra fakturadato. Ved forsinket betaling påløper forsinkelsesrente etter forsinkelsesrenteloven.</p>
                  <ul>
                    <li><b>Founding-pris</b> gjelder for de første fem klinikkene som signerer, låst i 12 måneder fra oppstartsdato. Prisen øker ikke selv etter at de fem founding-plassene er fylt.</li>
                    <li><b>Ordinær pris</b> gjelder for nye klinikker etter at founding-plassene er fylt, og for fornyelser etter 12-månedersperioden.</li>
                    <li><b>Tilleggsbruk</b> utover inkludert volum (for eksempel telefonsamtaler over inkluderte minutter) faktureres etter forhåndsavtalte enhetspriser.</li>
                  </ul>
                  <p>Prisendringer kan skje med minst 60 dagers skriftlig varsel, og kan ikke gjelde i en pågående bindingsperiode.</p>
                </div>
              </section>

              <section className="lp-doc-section" id="s5">
                <div className="lp-doc-shead"><span className="lp-doc-num">v.</span><h2>Bindingstid og oppsigelse</h2></div>
                <div className="lp-doc-sbody">
                  <p>Avtalen har <b>3 måneders minimumsbinding</b> fra første hele driftsmåned. Etter bindingsperioden løper avtalen månedlig.</p>
                  <p>Oppsigelse må skje skriftlig til <a className="in" href="mailto:post@ekspedenten.no">post@ekspedenten.no</a> med <b>30 dagers varsel</b> regnet fra første dag i påfølgende måned.</p>
                  <p>Ekspedenten kan si opp avtalen med samme varsel hvis klinikken vesentlig misligholder avtalen, herunder ved manglende betaling etter purring, brudd på databehandleravtalen, eller bruk som strider mot lov.</p>
                  <div className="lp-callout">
                    <div className="lab">60 dagers ROI-garanti</div>
                    <p>Hvis klinikken ikke ser dokumentert verdi av tjenesten innen 60 dager fra go-live, kan avtalen sies opp uten bindingsperiode og innbetalt beløp refunderes for de første to månedene. Forutsetter at klinikken har gitt Ekspedenten rimelig mulighet til å justere oppsettet.</p>
                  </div>
                </div>
              </section>

              <section className="lp-doc-section" id="s6">
                <div className="lp-doc-shead"><span className="lp-doc-num">vi.</span><h2>Oppstartsgaranti og SLA</h2></div>
                <div className="lp-doc-sbody">
                  <p><b>Live på 7 dager.</b> Vi garanterer at klinikken er i drift med fungerende tjeneste innen syv arbeidsdager fra mottatt nødvendig informasjon. Hvis vi ikke leverer, betaler klinikken ikke for oppstart.</p>
                  <p><b>Oppetid.</b> Vi garanterer 99,9 % månedlig oppetid for tjenestens kjernefunksjoner (telefon, chat, dashboard). Planlagt vedlikehold varsles minst 48 timer i forveien og regnes ikke som nedetid.</p>
                  <p>Hvis månedlig oppetid faller under 99,9 %, godskrives klinikken som følger:</p>
                  <ul>
                    <li>Mellom 99,0 % og 99,89 %: 10 % kreditering av månedsavgiften.</li>
                    <li>Mellom 95,0 % og 98,99 %: 25 % kreditering av månedsavgiften.</li>
                    <li>Under 95,0 %: 50 % kreditering, og klinikken kan si opp avtalen uten bindingsperiode.</li>
                  </ul>
                  <p>Status og oppetidshistorikk er offentlig tilgjengelig på <a className="in" href="https://ekspedenten.betteruptime.com" target="_blank" rel="noopener noreferrer">ekspedenten.betteruptime.com</a>.</p>
                </div>
              </section>

              <section className="lp-doc-section" id="s7">
                <div className="lp-doc-shead"><span className="lp-doc-num">vii.</span><h2>Klinikkens ansvar</h2></div>
                <div className="lp-doc-sbody">
                  <p>Klinikken er ansvarlig for å:</p>
                  <ul>
                    <li>Holde kalender, åpningstider, priser og tjenestetilbud oppdatert i de systemene Ekspedenten leser fra.</li>
                    <li>Sørge for at egne ansatte er kjent med hvordan Ekspedenten håndterer pasienthenvendelser, særlig hvordan eskaleringer fra Ekspedenten til menneske blir mottatt.</li>
                    <li>Følge opp eskaleringer fra Ekspedenten innen rimelig tid (senest neste arbeidsdag).</li>
                    <li>Innhente nødvendige samtykker fra pasienter der det er påkrevd etter personopplysningsloven og helselovgivningen.</li>
                    <li>Informere Ekspedenten om endringer som påvirker tjenesten, for eksempel bytte av journalsystem, telefonleverandør eller åpningstider.</li>
                  </ul>
                </div>
              </section>

              <section className="lp-doc-section" id="s8">
                <div className="lp-doc-shead"><span className="lp-doc-num">viii.</span><h2>Personopplysninger og data</h2></div>
                <div className="lp-doc-sbody">
                  <p>Klinikken er behandlingsansvarlig for personopplysninger om pasienter. Ekspedenten er databehandler og behandler kun opplysninger etter klinikkens instruks.</p>
                  <p>En egen <b>databehandleravtale (DPA)</b> etter GDPR artikkel 28 inngås som vedlegg til denne avtalen og regulerer behandlingen i detalj.</p>
                  <p><b>Eierskap.</b> Klinikken eier sin egen pasientdata. Ekspedenten kan ikke bruke pasientdata til å trene egne modeller eller dele med tredjepart utenfor det som er nødvendig for å levere tjenesten.</p>
                  <p><b>Lagring.</b> All pasientdata lagres innenfor EU (Frankfurt, AWS). Ekspedenten benytter underleverandører som er listet på <a className="in" href="/underleverandorer">Underleverandører</a>.</p>
                  <p>For detaljer om hvilke opplysninger som behandles og rettighetene den registrerte har, se vår <a className="in" href="/personvern">Personvernerklæring</a>.</p>
                  <div className="lp-callout">
                    <div className="lab">Ved avtaleslutt</div>
                    <p>Ved oppsigelse kan klinikken eksportere sin data i et standard format innen 30 dager etter siste driftsdag. Etter 90 dager slettes all klinikk-spesifikk data permanent fra produksjonsmiljø. Sikkerhetskopier slettes etter ytterligere 90 dager.</p>
                  </div>
                </div>
              </section>

              <section className="lp-doc-section" id="s9">
                <div className="lp-doc-shead"><span className="lp-doc-num">ix.</span><h2>AI-transparens og medisinsk grense</h2></div>
                <div className="lp-doc-sbody">
                  <p>Ekspedenten presenterer seg <b>alltid</b> tydelig som en AI-resepsjonist ved oppstart av hver samtale eller chat. Dette følger kravene i EU AI Act artikkel 50 om transparens overfor brukere som samhandler med kunstig intelligens.</p>
                  <p><b>Medisinsk grense.</b> Ekspedenten gir ikke medisinske råd, diagnose eller behandlingsanbefaling. Hvis en pasient beskriver smerte, akutt-symptomer eller spør om medisinske forhold:</p>
                  <ul>
                    <li>Ekspedenten prioriterer akutt-time eller eskalerer til klinikkens personale.</li>
                    <li>Ekspedenten gjetter aldri på medisinske forhold. Ved tvil overføres samtalen til menneske.</li>
                    <li>Klinikken har det faglige ansvaret for all medisinsk vurdering. Ekspedenten er en kommunikasjonskanal, ikke en helsearbeider.</li>
                  </ul>
                  <p>Klinikken skal sørge for at egne rutiner gir personell mulighet til å motta eskaleringer fra Ekspedenten i åpningstid.</p>
                </div>
              </section>

              <section className="lp-doc-section" id="s10">
                <div className="lp-doc-shead"><span className="lp-doc-num">x.</span><h2>Immaterielle rettigheter</h2></div>
                <div className="lp-doc-sbody">
                  <p>Ekspedenten eier alle rettigheter til programvaren, modeller, dokumentasjon og merkevaren. Klinikken får en ikke-eksklusiv, ikke-overførbar bruksrett i avtaleperioden.</p>
                  <p>Klinikken eier sitt eget innhold, sin pasientdata, og sine egne tilpasninger (for eksempel egendefinerte fraser, kunnskapsbase, prisliste).</p>
                  <p>Ingen av partene gir den andre rett til å bruke logo, navn eller merkevare i markedsføring uten skriftlig samtykke. Med ett unntak: Ekspedenten kan nevne klinikkens navn i en liste over kunder, så lenge klinikken ikke har reservert seg skriftlig mot dette.</p>
                </div>
              </section>

              <section className="lp-doc-section" id="s11">
                <div className="lp-doc-shead"><span className="lp-doc-num">xi.</span><h2>Ansvarsbegrensning</h2></div>
                <div className="lp-doc-sbody">
                  <p>Ekspedenten leverer tjenesten med rimelig faglig dyktighet, men gir ingen garanti for at tjenesten alltid vil være feilfri eller passe for ethvert formål.</p>
                  <p><b>Ekspedentens samlede ansvar</b> overfor klinikken for ethvert krav som oppstår under eller i tilknytning til avtalen, er begrenset til det beløp klinikken faktisk har betalt i avgift for tjenesten i de siste 12 månedene før kravet oppsto.</p>
                  <p>Ekspedenten er ikke ansvarlig for:</p>
                  <ul>
                    <li>Indirekte tap, herunder tapt fortjeneste, tap av pasienter, omdømmetap eller forretningsavbrudd.</li>
                    <li>Følger av at klinikken har gitt feil eller manglende informasjon i oppsettet (åpningstider, kalender, priser).</li>
                    <li>Følger av at tredjeparts tjenester (telefonleverandør, journalsystem, kalender) har feil eller nedetid.</li>
                  </ul>
                  <p><b>Unntak.</b> Ansvarsbegrensningen gjelder ikke for tap som skyldes grov uaktsomhet eller forsett fra Ekspedentens side, eller ved brudd på databehandleravtalen som medfører bot fra Datatilsynet.</p>
                </div>
              </section>

              <section className="lp-doc-section" id="s12">
                <div className="lp-doc-shead"><span className="lp-doc-num">xii.</span><h2>Endringer</h2></div>
                <div className="lp-doc-sbody">
                  <p>Vi kan endre tjenestens funksjonalitet løpende. Endringer som har vesentlig negativ påvirkning på klinikkens bruk varsles minst 30 dager i forveien.</p>
                  <p>Vilkårene kan oppdateres ved behov, for eksempel ved endringer i regelverk eller tjenestens omfang. Vesentlige endringer varsles per e-post til klinikkens kontaktperson minst 30 dager før de trer i kraft. Klinikken kan da si opp avtalen før endringene gjelder, uten å være bundet av minimumsperioden.</p>
                  <p>Datoen øverst viser når vilkårene sist ble oppdatert. Tidligere versjoner kan rekvireres på <a className="in" href="mailto:post@ekspedenten.no">post@ekspedenten.no</a>.</p>
                </div>
              </section>

              <section className="lp-doc-section" id="s13">
                <div className="lp-doc-shead"><span className="lp-doc-num">xiii.</span><h2>Lovvalg og tvisteløsning</h2></div>
                <div className="lp-doc-sbody">
                  <p>Avtalen reguleres av <b>norsk rett</b>.</p>
                  <p>Partene skal først forsøke å løse enhver tvist gjennom dialog. Lykkes ikke dette innen rimelig tid, kan tvisten bringes inn for <b>Bergen tingrett</b> som verneting i første instans.</p>
                  <p>Klager kan også sendes til Forbrukertilsynet, men merk at Ekspedenten leverer tjenester til virksomheter (B2B), og at forbrukerlovgivningen som hovedregel ikke gjelder for denne avtalen.</p>
                </div>
              </section>
            </div>

            <aside className="lp-doc-note">
              <h4>Spørsmål om vilkårene</h4>
              <p>Spørsmål eller ønsker du å diskutere endringer i en spesifikk klausul? Ta kontakt med <a href="mailto:aleksander@ekspedenten.no">aleksander@ekspedenten.no</a> (CTO) eller <a href="mailto:henrik@ekspedenten.no">henrik@ekspedenten.no</a> (CEO).</p>
              <p>Du har også rett til å klage til <a href="https://www.datatilsynet.no" target="_blank" rel="noopener noreferrer">Datatilsynet</a> for forhold som gjelder behandling av personopplysninger.</p>
            </aside>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
