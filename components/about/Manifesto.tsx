export default function Manifesto() {
  return (
    <section className="ab-section">
      <div className="ab-container">
        <div className="ab-manifesto ab-fade-target">
          <span className="ab-pill peach">Vår misjon</span>
          <blockquote>
            Ingen pasient skal falle gjennom <em>fordi telefonen ikke ble tatt</em>.
          </blockquote>
          <p>
            Klinikker mister 80–180 000 kr i måneden bare på ubesvarte anrop. Det er ikke et driftsproblem, det er et strukturelt hull. Vi lukker det.
          </p>
        </div>

        <div className="ab-stats-row">
          <div className="ab-stat-card ab-fade-target">
            <div className="ab-stat-num">38%</div>
            <div className="ab-stat-label">av anrop til norske tannklinikker går ubesvart</div>
            <div className="ab-stat-source">Imperial College London, 2025</div>
          </div>
          <div className="ab-stat-card ab-fade-target delay-1">
            <div className="ab-stat-num">65%</div>
            <div className="ab-stat-label">av nye pasienter ringer aldri tilbake hvis de ikke får svar</div>
            <div className="ab-stat-source">TrueLark, 2025</div>
          </div>
          <div className="ab-stat-card ab-fade-target delay-2">
            <div className="ab-stat-num">21x</div>
            <div className="ab-stat-label">mer sannsynlig å bli kunde hvis dere svarer innen 5 min</div>
            <div className="ab-stat-source">Harvard Business Review, 2024</div>
          </div>
        </div>
      </div>
    </section>
  );
}
