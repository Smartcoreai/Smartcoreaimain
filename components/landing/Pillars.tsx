"use client";
import { useLanguage } from "@/lib/i18n";

export default function Pillars() {
  const { t } = useLanguage();
  const p = t.pillars;

  return (
    <section className="lp-pillars">
      <div className="lp-container">
        <div className="lp-section-header">
          <span className="lp-label">{p.label}</span>
          <h2>
            {p.headingPre} <em>{p.headingEm}</em>
          </h2>
          <p>{p.sub}</p>
        </div>

        <div className="lp-features">
          {p.cards.map((c, i) => (
            <div key={i} className="lp-feat">
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <div className="lp-feat-badge">
                <div className="lp-feat-b1">{c.b1}</div>
                <div className="lp-feat-b2">{c.b2}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
