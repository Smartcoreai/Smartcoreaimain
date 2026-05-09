const VALUES = [
  {
    title: "Fokus over alt",
    desc: "Vi jobber med et begrenset antall kunder om gangen, slik at alle bedrifter får vår fulle oppmerksomhet.",
  },
  {
    title: "Resultater, ikke dashboards",
    desc: "Vi måler arbeidet vårt i inntekter generert, ikke tomme tall. Ingen fyll, ingen dikkedarer.",
  },
  {
    title: "Lite team, med vilje",
    desc: "Vi holder oss slanke med vilje. Færre kunder betyr dypere arbeid og bedre systemer.",
  },
];

export default function ValuesGrid() {
  return (
    <section className="ab-section">
      <div className="ab-container">
        <div className="ab-section-header">
          <span className="ab-pill peach">Det vi står for</span>
          <h2>
            Tre prinsipper<br />
            vi <em>ikke vraker på</em>.
          </h2>
        </div>

        <div className="ab-values-grid">
          {VALUES.map((v, i) => (
            <div
              className={`ab-value-card ab-fade-target${i ? ` delay-${i}` : ""}`}
              key={v.title}
            >
              <div className="ab-value-num">{String(i + 1).padStart(2, "0")}</div>
              <h4>{v.title}</h4>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
