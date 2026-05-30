"use client";
import { useLanguage } from "@/lib/i18n";

export default function BridgeSection() {
  const { t } = useLanguage();
  const b = t.bridge;

  return (
    <section className="lp-mission">
      <div className="lp-container">
        <div className="lp-mission-grid">
          <div className="lp-mission-left">
            <div>
              <span className="lp-label on-dark">{b.eyebrow}</span>
              <p className="lp-mission-eyebrow">{b.lead}</p>
              <h2>
                {b.mottoPre} <em>{b.mottoEm}</em>.
              </h2>
              <p className="lp-mission-quote">&ldquo;{b.quote}&rdquo;</p>
            </div>

            <div className="lp-mission-byline">
              <div className="lp-mission-av" aria-hidden="true">AB</div>
              <div>
                <div className="lp-mission-nm">{b.founders}</div>
                <div className="lp-mission-ttl">{b.role}</div>
              </div>
            </div>
          </div>

          <div className="lp-mission-right" aria-hidden="true">
            <div className="lp-team-photo">{b.teamPlaceholder}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
