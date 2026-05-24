export default function HowItWorks() {
  return (
    <section className="lp-section gradient-bg" id="how">
      <div className="lp-container">
        <div className="lp-section-header">
          <span className="lp-pill peach">Slik funker det</span>
          <h2>Vi tar oss av oppsett og opplæring<br className="hidden sm:inline" /> som en del av avtalen.</h2>
          <p>Ekspedenten leser klinikkens egne tjenester, priser og åpningstider, og bygger din kunnskapsbase automatisk.</p>
        </div>

        <div className="lp-how-grid">
          <div className="lp-how-card">
            <div className="lp-how-num">1</div>
            <h4>Koble til</h4>
            <p>Vi kobler til kalenderen og e-postsystemet ditt. Tar 15 minutter.</p>
          </div>
          <div className="lp-how-card">
            <div className="lp-how-num">2</div>
            <h4>Lær opp</h4>
            <p>Ekspedenten leser dine tjenester, priser og åpningstider. Bygger kunnskapsbase automatisk.</p>
          </div>
          <div className="lp-how-card">
            <div className="lp-how-num">3</div>
            <h4>Automatiser</h4>
            <p>Ekspedenten tar telefonen 24/7. Sjekker kalenderen. Booker time. Sender SMS-bekreftelse.</p>
          </div>
          <div className="lp-how-card">
            <div className="lp-how-num">4</div>
            <h4>Forbedre</h4>
            <p>Ekspedenten lærer av hver samtale. Du fyller inn kunnskapshull manuelt når du vil.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
