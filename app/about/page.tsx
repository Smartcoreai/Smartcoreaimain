import "../landing.css";
import Image from "next/image";
import Link from "next/link";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";
import { DemoPopup } from "@/components/DemoPopup";

export const metadata = {
  title: "Om oss. Ekspedenten",
  description: "Bygget i Bergen for klinikker som fortjener bedre. Møt gründerne bak Ekspedenten.",
};

const STATS = [
  { n: "38%", t: "av anrop til norske tannklinikker går ubesvart", s: "Imperial College London, 2025" },
  { n: "65%", t: "av nye pasienter ringer aldri tilbake hvis de ikke får svar", s: "TrueLark, 2025" },
  { n: "21×", t: "mer sannsynlig å bli kunde hvis dere svarer innen 5 min", s: "Harvard Business Review, 2024" },
];

const PRINCIPLES = [
  {
    n: "i.",
    h: "Fokus over alt",
    p: "Vi jobber med et begrenset antall kunder om gangen, slik at alle bedrifter får vår fulle oppmerksomhet. Få ting, gjort skikkelig, er mer verdt enn mange ting halvgjort.",
  },
  {
    n: "ii.",
    h: "Resultater, ikke dashboards",
    p: "Vi måler arbeidet vårt i inntekter generert for klinikkene våre, ikke tomme tall. Hvis Ekspedenten ikke betaler seg selv, fortjener vi ikke å bli brukt.",
  },
  {
    n: "iii.",
    h: "Lite team, med vilje",
    p: "Vi holder oss slanke med vilje. Færre kunder betyr dypere arbeid og bedre systemer. Vi vil hellere være best for hundre klinikker enn middelmådige for tusen.",
  },
];

export default function AboutPage() {
  return (
    <div className="lp-root">
      <LandingNavbar />
      <main>
        {/* HERO asymmetrisk */}
        <section className="lp-about-hero">
          <div className="lp-container">
            <div className="lp-about-hero-grid">
              <h1>To kamerater. <span className="em">Én misjon.</span></h1>
              <div className="lp-about-hero-meta">
                <span className="label">Om oss</span>
                <p className="from"><b>Bergen</b>Skrevet av Aleksander &amp; Henrik<br />Mai 2026</p>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO — sticky kapittel-aside */}
        <section className="lp-about-intro">
          <div className="lp-container">
            <div className="lp-about-intro-grid">
              <aside className="lp-about-aside">
                <div className="lp-about-chnum">i.</div>
                <div className="lp-about-chname">Hvor det startet</div>
                <div className="lp-about-chrule" />
              </aside>
              <div className="lp-about-intro-body">
                <h2>En liten frustrasjon, <span className="em">over flere år.</span></h2>
                <p>Vi har kjent hverandre siden vi var små. Når vi snakket om hvorfor så mange bedrifter betalte for AI som aldri leverte, så vi det samme: en kløft mellom det som ble lovet og det som faktisk virket. Tannklinikker mistet pasienter til ubesvarte anrop, mens verktøyene som kunne hjulpet var bygget for enterprise, ikke for dem.</p>
                <p>Vi to bestemte oss for å bygge det vi savnet selv. Premium betyr ikke nødvendigvis kompleks. Det betyr at det funker, hver dag, uten å måtte overtales.</p>
              </div>
            </div>
          </div>
        </section>

        {/* MANIFEST QUOTE */}
        <section className="lp-about-manifest">
          <span className="lp-about-quotemark" aria-hidden="true">&ldquo;</span>
          <blockquote>Ingen pasient skal falle gjennom fordi telefonen ikke ble tatt.</blockquote>
          <p className="qatt">Vår misjon, kort fortalt</p>
        </section>

        {/* STATS band */}
        <section className="lp-about-stats">
          <div className="lp-about-stats-inner">
            <div className="lp-about-stats-intro">
              <p className="kicker">Det vi vet om problemet</p>
              <h3>Det er ikke en service-feil. Det er en kapasitetsfeil, og den koster norske klinikker mer enn de fleste vet.</h3>
            </div>
            <div className="lp-about-stats-grid">
              {STATS.map((st) => (
                <div className="lp-about-stat" key={st.n}>
                  <div className="n">{st.n}</div>
                  <div className="t">{st.t}</div>
                  <div className="s">{st.s}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM spread */}
        <section className="lp-about-team">
          <div className="lp-container">
            <div className="lp-about-team-header">
              <aside className="lp-about-aside">
                <div className="lp-about-chnum">ii.</div>
                <div className="lp-about-chname">Folkene bak</div>
                <div className="lp-about-chrule" />
              </aside>
              <h2>To kamerater som så <span className="em">det samme problemet.</span></h2>
            </div>

            {/* Henrik — foto venstre, tekst høyre */}
            <div className="lp-about-person left">
              <div className="lp-about-photo">
                <Image src="/team/henrik.png" alt="Henrik Andreassen Bøe" fill sizes="(max-width: 820px) 100vw, 45vw" />
              </div>
              <div className="lp-about-person-text">
                <div>
                  <div className="lp-about-person-num">a.</div>
                  <div className="lp-about-person-name">Henrik Andreassen Bøe</div>
                  <div className="lp-about-person-role">Medgründer &amp; CEO · Det kommersielle</div>
                  <p className="lp-about-person-bio">Entreprenør fra Bergen, opptatt av at teknologi faktisk skal skape resultater, ikke bare imponere. Grunnla Ekspedenten sammen med Aleksander etter å ha sett hvor mange bedrifter som betaler for AI som aldri leverer.</p>
                </div>
                <div className="lp-about-person-contact">
                  <a href="mailto:henrik@ekspedenten.no">henrik@ekspedenten.no</a>
                  <a href="https://www.linkedin.com/in/henrik-andreassen-b%C3%B8e/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
              </div>
            </div>

            {/* Aleksander — tekst venstre, foto høyre */}
            <div className="lp-about-person right">
              <div className="lp-about-photo">
                <Image src="/team/aleksander.png" alt="Aleksander Nordeide Bjørndal" fill sizes="(max-width: 820px) 100vw, 45vw" />
              </div>
              <div className="lp-about-person-text">
                <div>
                  <div className="lp-about-person-num">b.</div>
                  <div className="lp-about-person-name">Aleksander Nordeide Bjørndal</div>
                  <div className="lp-about-person-role">Medgründer &amp; CTO · Det tekniske</div>
                  <p className="lp-about-person-bio">Selvlært utvikler fra Bergen med en lidenskap for å bygge AI-systemer som faktisk fungerer. Grunnla Ekspedenten sammen med Henrik fordi han var lei av å se bedrifter betale for teknologi som aldri leverte.</p>
                </div>
                <div className="lp-about-person-contact">
                  <a href="mailto:aleksander@ekspedenten.no">aleksander@ekspedenten.no</a>
                  <a href="https://www.linkedin.com/in/aleksander-bj%C3%B8rndal/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRINSIPPER */}
        <section className="lp-about-princ">
          <div className="lp-container">
            <div className="lp-about-princ-header">
              <aside className="lp-about-aside">
                <div className="lp-about-chnum">iii.</div>
                <div className="lp-about-chname">Det vi tror på</div>
                <div className="lp-about-chrule" />
              </aside>
              <h2>Tre prinsipper vi <span className="em">ikke vraker på.</span></h2>
            </div>

            <div className="lp-about-princ-list">
              {PRINCIPLES.map((pr) => (
                <div className="lp-about-princ-row" key={pr.n}>
                  <div className="lp-about-princ-num">{pr.n}</div>
                  <div className="lp-about-princ-body">
                    <h3>{pr.h}</h3>
                    <p>{pr.p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section className="lp-about-closing">
          <p className="kicker">Bli med på reisen</p>
          <h2>Vil du være <span className="em">en av de første?</span></h2>
          <p className="sub">Founding-pris for første 5 klinikker. Live på 7 dager. 60 dagers ROI-garanti.</p>
          <div className="ctas">
            <DemoPopup triggerText="Bestill demo" className="lp-btn-primary" />
            <Link href="/diagnose" className="lp-btn-secondary">
              Beregn lekkasje <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
