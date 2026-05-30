export default function ProblemGrid() {
  return (
    <section className="lp-problem" id="problem">
      <div className="lp-container">
        <span className="lp-label on-lav">Problemet</span>
        <h2>Pasienthenvendelser stopper aldri. <em>De fleste trenger ikke teamet ditt.</em></h2>

        <div className="lp-problem-grid">
          <div className="lp-problem-card">
            <span className="lp-prob-num">01.</span>
            <div className="lp-problem-mockup">
              <div className="lp-qbubble">&ldquo;Hva tid stenger dere i kveld?&rdquo;</div>
              <div className="lp-qbubble">&ldquo;Kan jeg booke til torsdag?&rdquo;</div>
              <div className="lp-qbubble">&ldquo;Tar dere drop-in?&rdquo;</div>
              <div className="lp-qbubble">&ldquo;Er klinikken full?&rdquo;</div>
            </div>
            <h3>Repetitive spørsmål</h3>
            <p>Åpningstider. Pris-spørsmål. Småjusteringer på time. Resepsjonen besvarer de samme henvendelsene hele dagen.</p>
          </div>

          <div className="lp-problem-card">
            <span className="lp-prob-num">02.</span>
            <div className="lp-problem-mockup">
              <div className="lp-alert-line">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.86l-8.18 14.18A2 2 0 003.85 21h16.3a2 2 0 001.73-2.96L13.7 3.86a2 2 0 00-3.4 0z" /></svg>
                Booking gikk til konkurrenten.
              </div>
              <div className="lp-alert-sub">De svarte raskere.</div>
              <div className="lp-clinic-row">
                <div className="lp-clinic-box bad">
                  <div className="lp-clinic-name">Din klinikk</div>
                  <div className="lp-clinic-status"><span className="lp-dot" />Ikke svart</div>
                </div>
                <div className="lp-clinic-box good">
                  <div className="lp-clinic-name">Konkurrent</div>
                  <div className="lp-clinic-status"><span className="lp-dot" />Svar sendt</div>
                </div>
              </div>
            </div>
            <h3>Sene svar koster bookinger</h3>
            <p>Pasienter booker hos den klinikken som svarer først. Hvis dere er trege, går bestillingen et annet sted.</p>
          </div>

          <div className="lp-problem-card">
            <span className="lp-prob-num">03.</span>
            <div className="lp-problem-mockup lp-inbox-mock">
              <div className="lp-inbox-head">Innboks <span className="lp-inbox-unread">834 ulest</span></div>
              <div className="lp-inbox-row"><span className="lp-inbox-city">Bergen</span><span className="lp-inbox-count">87</span></div>
              <div className="lp-inbox-row"><span className="lp-inbox-city">Stavanger</span><span className="lp-inbox-count">22</span></div>
              <div className="lp-inbox-row"><span className="lp-inbox-city">Oslo</span><span className="lp-inbox-count">14</span></div>
            </div>
            <h3>Innboksen er en svart boks</h3>
            <p>Mange kanaler. Ingen oversikt. Ingen tracking på hva som kommer inn og hva som faller mellom to stoler.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
