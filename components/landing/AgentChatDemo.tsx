export default function AgentChatDemo() {
  return (
    <section className="lp-section">
      <div className="lp-container">
        <div className="lp-section-header">
          <span className="lp-pill mint">AI-resepsjonist</span>
          <h2>Pasientene får svar på minutter.<br />Ikke timer.</h2>
          <p>Ekspedenten svarer øyeblikkelig på norsk. Hun sjekker tilgjengelighet, foreslår tider, og sender bekreftelse. Resepsjonen tar kun de samtalene som faktisk trenger menneskelig vurdering.</p>
        </div>

        <div className="lp-chat-mockup">
          <div className="lp-chat-bubble received">Hei, jeg har vondt i en tann. Trenger jeg å komme inn snart?</div>
          <div className="lp-chat-meta">
            <div className="lp-avatar-dot" />
            <span>Anonym pasient · 09:14</span>
          </div>
          <div className="lp-chat-bubble sent">Det høres ut som du burde komme inn raskt. Vi har akutt-time på 30 minutter til 1 200 kroner. Vil du at jeg sjekker hva som er ledig?</div>
          <div className="lp-chat-bubble received">Ja takk, helst i dag.</div>
          <div className="lp-chat-bubble sent">Vi har ledig i dag klokka tre om ettermiddagen. Passer det?</div>
          <div className="lp-chat-bubble received">Perfekt!</div>
          <div className="lp-chat-bubble sent">Jeg sender deg en SMS med booking-lenken nå. Bli bra snart!</div>
          <div style={{ textAlign: "right", marginTop: -8 }}>
            <span className="lp-booking-confirmed">✓ Akutt-time booket · 15:00</span>
          </div>
          <div className="lp-chat-meta" style={{ justifyContent: "flex-end" }}>
            <span>Ekspedenten · Bergen Tannklinikk · 09:16</span>
          </div>
        </div>
      </div>
    </section>
  );
}
