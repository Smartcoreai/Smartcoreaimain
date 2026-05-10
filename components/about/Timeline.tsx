const STEPS = [
  {
    date: "Okt 2025",
    title: "Idéen tar form",
    body: "Etter å ha sett klinikker miste leads gang etter gang, begynner Aleksander og Henrik å bygge en prototype av Ekspedenten.",
  },
  {
    date: "Mar 2026",
    title: "Rebrand til Ekspedenten",
    body: "Tidligere SmartcoreAI blir til Ekspedenten. Et navn som speiler det vi faktisk er: en digital ekspedent.",
  },
  {
    date: "Apr 2026",
    title: "Ekspedenten live i sandbox",
    body: "Første fungerende voice AI på norsk. Booker time, sender SMS, alt EU-hosted. Klar for første pilot-klinikker.",
  },
  {
    date: "Mai 2026",
    title: "Founding-pris åpner",
    body: "Første 5 klinikker får founding-pris med 50% rabatt. Vi bygger sammen med dem mot Datatilsynet sandkasse.",
  },
];

export default function Timeline() {
  return (
    <section className="ab-section ab-section-cream">
      <div className="ab-container">
        <div className="ab-section-header">
          <span className="ab-pill lavender">Reisen</span>
          <h2>
            Steg for steg<br />
            fra <em>idé til live</em>.
          </h2>
        </div>

        <div className="ab-timeline ab-fade-target">
          {STEPS.map((step) => (
            <div className="ab-timeline-row" key={step.date}>
              <div className="ab-date">{step.date}</div>
              <div>
                <h5>{step.title}</h5>
                <p>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
