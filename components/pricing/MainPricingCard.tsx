const FEATURES = [
  "Svarer telefon, SMS og chat 24/7",
  "Booker time direkte i kalenderen",
  "Norsk stemme, klinikkens tone",
  "Overfører til menneske ved behov",
  "AI-chatbot på nettsiden inkludert",
  "Integrerer med Opus, Anita, Muntra",
  "CRM-dashboard med sanntids-aktivitet",
  "GDPR-trygt. Data lagret i Frankfurt",
  "Månedsrapport med konkret ROI",
  "Live på 7 dager. 14 dagers gratis prøve",
];

export default function MainPricingCard() {
  return (
    <div className="pp-main-card pp-fade-target">
      <div className="pp-card-head">
        <div>
          <div className="pp-card-title">AI Resepsjonist for klinikker</div>
          <p className="pp-card-desc">
            Kjernen i Ekspedenten. Tar telefonen 24/7, booker time, og jobber sømløst med teamet ditt.
          </p>
        </div>
        <div className="pp-price-block">
          <div className="pp-price-amount">
            kr 11 000<span className="pp-unit">/mnd</span>
          </div>
          <div className="pp-price-sub">per klinikk</div>
        </div>
      </div>

      <div className="pp-price-callout">
        <strong>kr 11 000/mnd</strong>
        <span>· Lanseringspris for første 5 klinikker</span>
      </div>

      <div className="pp-feature-grid">
        {FEATURES.map((f) => (
          <div className="pp-feature-row" key={f}>
            <span className="pp-feature-check">✓</span>
            <span>{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
