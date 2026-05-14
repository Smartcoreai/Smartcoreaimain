"use client";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/i18n";

export default function BridgeSection() {
  const { t } = useLanguage();
  const b = t.bridge;

  return (
    <section className="lp-bridge">
      <div className="lp-bridge-orbs" aria-hidden="true">
        <span className="lp-bridge-orb lavender" />
        <span className="lp-bridge-orb peach" />
        <span className="lp-bridge-orb lavender-2" />
      </div>

      <div className="lp-container">
        <div className="lp-bridge-eyebrow-wrap">
          <span className="lp-bridge-eyebrow">
            <span className="lp-dot" aria-hidden="true" />
            {b.eyebrow}
          </span>
        </div>

        <ScrollReveal>
          <div className="lp-bridge-card">
            <div className="lp-bridge-card-left">
              <div>
                <p className="lp-bridge-motto-lead">{b.lead}</p>
                <h2 className="lp-bridge-motto">
                  {b.mottoPre} <em>{b.mottoEm}</em>.
                </h2>
                <p className="lp-bridge-quote">&ldquo;{b.quote}&rdquo;</p>
              </div>

              <div className="lp-bridge-attribution">
                <div className="lp-bridge-avatar" aria-hidden="true" />
                <div className="lp-bridge-attribution-text">
                  <strong>{b.founders}</strong>
                  <span>{b.role}</span>
                </div>
              </div>
            </div>

            <div className="lp-bridge-card-right" aria-hidden="true">
              <span className="lp-bridge-team-pill">{b.teamPlaceholder}</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
