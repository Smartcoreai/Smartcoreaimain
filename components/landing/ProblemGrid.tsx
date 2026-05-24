export default function ProblemGrid() {
  return (
    <section className="lp-section" id="problem">
      <div className="lp-container">
        <div className="lp-section-header left">
          <span className="lp-pill lavender">Problemet</span>
          <h2>Pasienthenvendelser stopper aldri.<br className="hidden sm:inline" /> De fleste trenger ikke teamet ditt.</h2>
        </div>

        <div className="lp-problem-grid">
          <div className="lp-problem-card">
            <div className="lp-problem-mockup">
              <div className="lp-mock-line">"Hva tid stenger dere i kveld?"</div>
              <div className="lp-mock-line">"Kan jeg booke til torsdag?"</div>
              <div className="lp-mock-line muted">"Tar dere drop-in?"</div>
              <div className="lp-mock-line muted">"Er klinikken full?"</div>
            </div>
            <h3>Repetitive spørsmål</h3>
            <p>Åpningstider. Pris-spørsmål. Småjusteringer på time. Resepsjonen besvarer de samme henvendelsene hele dagen.</p>
          </div>

          <div className="lp-problem-card">
            <div className="lp-problem-mockup">
              <div className="lp-mock-line danger">
                ⚠ Booking gikk til konkurrenten.
                <br />
                <small>De svarte raskere.</small>
              </div>
              <div className="lp-mock-row">
                <div className="lp-mock-line">
                  <strong>Din klinikk</strong>
                  <small style={{ color: "#d44" }}>● Ikke svart</small>
                </div>
                <div className="lp-mock-line">
                  <strong>Konkurrent</strong>
                  <small style={{ color: "#0a5f1e" }}>● Svar sendt</small>
                </div>
              </div>
            </div>
            <h3>Sene svar koster bookinger</h3>
            <p>Pasienter booker hos den klinikken som svarer først. Hvis dere er trege, går bestillingen et annet sted.</p>
          </div>

          <div className="lp-problem-card">
            <div className="lp-problem-mockup">
              <div className="lp-mock-inbox-head">
                <strong>Innboks</strong>
                <span className="lp-mock-badge-red">834 ulest</span>
              </div>
              <div className="lp-mock-line">Bergen <span className="lp-line-count">87</span></div>
              <div className="lp-mock-line">Stavanger <span className="lp-line-count">22</span></div>
              <div className="lp-mock-line">Oslo <span className="lp-line-count">14</span></div>
            </div>
            <h3>Innboksen er en svart boks</h3>
            <p>Mange kanaler. Ingen oversikt. Ingen tracking på hva som kommer inn og hva som faller mellom to stoler.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
