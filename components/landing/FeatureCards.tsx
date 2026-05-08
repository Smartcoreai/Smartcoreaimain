export default function FeatureCards() {
  return (
    <section className="lp-section">
      <div className="lp-container">
        <div className="lp-feature-grid">
          <div className="lp-feature-card">
            <h4>Fra henvendelse til booking — automatisk</h4>
            <p>Ária leser meldingen, sjekker kalender, foreslår tider, sender SMS-lenke. Pasienten klikker og bekrefter selv.</p>
            <div className="lp-feature-mock" style={{ textAlign: "center" }}>
              <strong style={{ fontSize: 14 }}>4 SEKUNDER · ENDE-TIL-ENDE</strong>
              <p style={{ marginTop: 6, fontSize: 12 }}>Henvendelse mottatt → Ária behandlet → SMS sendt → time bekreftet.</p>
              <div style={{ marginTop: 14, display: "flex", justifyContent: "center", gap: 6 }}>
                <span className="lp-tag tannrens">TANNRENS</span>
                <span className="lp-tag kontroll">BEKREFTET</span>
              </div>
            </div>
          </div>

          <div className="lp-feature-card">
            <h4>GDPR-trygt fra dag én</h4>
            <p>All data lagres i Frankfurt. Ária spør aldri om symptomer eller helseopplysninger. Detaljer tas opp av tannlegen på klinikken.</p>
            <div className="lp-feature-mock" style={{ textAlign: "center" }}>
              <strong style={{ fontSize: 14 }}>EU · FRANKFURT</strong>
              <p style={{ marginTop: 6, fontSize: 12 }}>GDPR-compliant. Datatilsynet sandkasse-kvalifisert.</p>
            </div>
          </div>

          <div className="lp-feature-card">
            <h4>Integrerer med journalsystemet deres</h4>
            <p>Opus, Anita, Muntra og andre nordiske journalsystem. Ária leser kalenderen, booker time og oppdaterer pasientregisteret automatisk.</p>
            <div className="lp-feature-mock">
              <div className="lp-feature-cols-3">
                <div>Opus</div>
                <div>Anita</div>
                <div>Muntra</div>
              </div>
              <p style={{ marginTop: 12, fontSize: 11, color: "var(--lp-ink-tertiary)", textAlign: "center" }}>
                + andre etter behov
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
