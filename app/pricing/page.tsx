import "../landing.css";
import Link from "next/link";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";
import { DemoPopup } from "@/components/DemoPopup";

export const metadata = {
  title: "Priser. Ekspedenten",
  description:
    "Ekspedenten Standard — én pakke for norske tannklinikker. Founding-pris kr 6 900/mnd, ordinær kr 10 000/mnd. Ingen oppstartavgift.",
};

const INCLUDED = [
  "AI som tar inngående anrop 24/7",
  "SMS-bekreftelse til pasient",
  "Booking direkte i Opus, Muntra eller Anita",
  "Dashboard på app.ekspedenten.no",
  "Manuell opplæring fra Henrik / Aleksander første uke",
];

const GUARANTEES = [
  "60 dagers ROI-garanti",
  "Live på 7 virkedager",
  "Klinikken eier dataen",
  "All data lagret i EU (Frankfurt)",
];

function Check() {
  return (
    <span className="lp-pris-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
        <path d="M5 12l4 4L19 7" />
      </svg>
    </span>
  );
}

export default function PricingPage() {
  return (
    <div className="lp-root">
      <LandingNavbar />
      <main>
        <section className="lp-pris-header">
          <div className="lp-container">
            <span className="lp-label">Priser</span>
            <h1>
              Én pris. <em>Alt inkludert.</em>
            </h1>
            <p className="lp-pris-lead">
              Ingen oppstartavgift skjult under linjer. Founding-pris låst i 12 måneder for de første fem klinikkene.
            </p>
          </div>
        </section>

        <section className="lp-pris-wrap">
          <div className="lp-container">
            <div className="lp-pris-card">
              <div className="lp-pris-top">
                <div className="lp-pris-meta">
                  <div className="lp-pris-founding">Founding · første 5 klinikker</div>
                  <h2>Ekspedenten Standard</h2>
                  <p className="lp-pris-sub">
                    AI-resepsjonist som tar telefonen 24/7 og booker direkte i Opus, Muntra og Anita.
                  </p>
                </div>
                <div className="lp-pris-num">
                  <div className="lp-pris-ord">Ordinær pris kr 10 000/mnd</div>
                  <div className="lp-pris-big">
                    <span className="kr">kr</span>
                    <span className="amt">6 900</span>
                    <span className="per">/mnd</span>
                  </div>
                  <p className="lp-pris-note">
                    Founding-pris låst i 12 måneder fra signering. Øker ikke selv etter de 5 første klinikkene er fylt.
                  </p>
                  <p className="lp-pris-binding">
                    <b>Binding</b>3 måneder, deretter månedlig
                  </p>
                </div>
              </div>

              <div className="lp-pris-lists">
                <div className="lp-pris-list">
                  <h3>Inkludert</h3>
                  <ul>
                    {INCLUDED.map((item) => (
                      <li key={item}>
                        <Check />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lp-pris-list">
                  <h3>Garantier</h3>
                  <ul>
                    {GUARANTEES.map((item) => (
                      <li key={item}>
                        <Check />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lp-pris-cta">
                <DemoPopup triggerText="Bestill demo" className="lp-btn-primary" />
                <Link href="/pakke" className="lp-pris-textlink">
                  Se hele pakken →
                </Link>
              </div>
            </div>
          </div>

          <div className="lp-pris-trust">
            <div className="lp-container">
              <p>
                Ingen skjulte kostnader. Ingen lange kontrakter. Ekte verdi for klinikken, eller pengene tilbake innen 60 dager.
              </p>
            </div>
          </div>
        </section>

        <section className="lp-pris-faq">
          <div className="lp-container">
            <h2>
              Spørsmål før <em>du booker?</em>
            </h2>
            <p>
              Vi har samlet de vanligste spørsmålene om oppsett, pris, integrasjoner og sikkerhet. Sjekk dem først, så bruker du demo-samtalen på det som faktisk er klinikkspesifikt.
            </p>
            <div className="lp-pris-faq-btns">
              <Link href="/faq" className="lp-btn-primary">
                Se ofte stilte spørsmål →
              </Link>
              <DemoPopup triggerText="Bestill demo" className="lp-btn-secondary" />
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
