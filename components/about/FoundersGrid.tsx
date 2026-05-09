/* eslint-disable @next/next/no-img-element */

const FOUNDERS = [
  {
    photo: "/team/henrik.png",
    name: "Henrik Andreassen Bøe",
    role: "Medgründer & CEO",
    bio: "Entreprenør fra Bergen, opptatt av at teknologi faktisk skal skape resultater, ikke bare imponere. Grunnla Ekspedenten sammen med Aleksander etter å ha sett hvor mange bedrifter som betaler for AI som aldri leverer. Driver det kommersielle: kundekontakt, strategi, vekst.",
    email: "henrik@ekspedenten.no",
    linkedin: "https://www.linkedin.com/in/henrik-andreassen-b%C3%B8e",
  },
  {
    photo: "/team/aleksander.png",
    name: "Aleksander Nordeide Bjørndal",
    role: "Medgründer & CTO",
    bio: "Selvlært utvikler fra Bergen med en lidenskap for å bygge AI-systemer som faktisk fungerer. Grunnla Ekspedenten sammen med Henrik fordi han var lei av å se bedrifter betale for teknologi som aldri leverte. Driver det tekniske: bygging, integrasjoner, AI-trening.",
    email: "aleksander@ekspedenten.no",
    linkedin: "https://www.linkedin.com/in/aleksander-bj%C3%B8rndal/",
  },
];

export default function FoundersGrid() {
  return (
    <section className="ab-section ab-section-cream">
      <div className="ab-container">
        <div className="ab-section-header">
          <span className="ab-pill mint">Gründerne</span>
          <h2>
            To i Bergen som så<br />
            <em>det samme problemet</em>.
          </h2>
        </div>

        <div className="ab-founders-grid">
          {FOUNDERS.map((f, i) => (
            <div
              className={`ab-founder-card ab-fade-target${i ? " delay-1" : ""}`}
              key={f.email}
            >
              <div className="ab-founder-photo">
                <img src={f.photo} alt={f.name} />
              </div>
              <div className="ab-founder-name">{f.name}</div>
              <div className="ab-founder-role">{f.role}</div>
              <p className="ab-founder-bio">{f.bio}</p>
              <div className="ab-founder-links">
                <a href={`mailto:${f.email}`} className="ab-founder-link">{f.email}</a>
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ab-founder-link"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
