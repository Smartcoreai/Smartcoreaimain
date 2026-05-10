export default function FeatureCards() {
  return (
    <section className="lp-section">
      <div className="lp-container">
        <div className="lp-feature-grid">
          <div className="lp-feature-card">
            <h4>Fra henvendelse til booking, automatisk</h4>
            <p>Ekspedenten leser meldingen, sjekker kalender, foreslår tider, sender SMS-lenke. Pasienten klikker og bekrefter selv.</p>
            <div className="lp-feature-mock" style={{ textAlign: "center" }}>
              <strong style={{ fontSize: 14, letterSpacing: "0.05em" }}>4 SEKUNDER</strong>
              <p style={{ marginTop: 6, fontSize: 12 }}>Fra henvendelse til bekreftet booking.</p>
            </div>
          </div>

          <div className="lp-feature-card">
            <h4>GDPR-trygt fra dag én</h4>
            <p>All data lagres i Frankfurt. Ekspedenten spør aldri om symptomer eller helseopplysninger. Detaljer tas opp av tannlegen på klinikken.</p>
            <div className="lp-feature-mock" style={{ textAlign: "center" }}>
              <strong style={{ fontSize: 14, letterSpacing: "0.05em" }}>EU · FRANKFURT</strong>
              <p style={{ marginTop: 6, fontSize: 12 }}>GDPR-compliant. Datatilsynet sandkasse-kvalifisert.</p>
            </div>
          </div>

          <div className="lp-feature-card">
            <h4>Integrerer med journalsystemet deres</h4>
            <p>Opus, Anita, Muntra og andre nordiske journalsystem. Ekspedenten leser kalenderen, booker time og oppdaterer pasientregisteret automatisk.</p>
            <div className="lp-feature-mock" style={{ textAlign: "center" }}>
              <strong style={{ fontSize: 14, letterSpacing: "0.05em" }}>Opus · Anita · Muntra</strong>
              <p style={{ marginTop: 6, fontSize: 12 }}>+ andre etter behov</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
