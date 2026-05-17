"use client";

import { useLanguage } from "@/lib/i18n";

export default function OfferingContent() {
  const { t } = useLanguage();
  const o = t.offering;

  return (
    <article className="pkg-page">
      <header className="pkg-header">
        <h1 className="pkg-brand">
          {o.brand} <em>{o.brandSub}</em>
        </h1>
        <div className="pkg-meta">
          <div className="pkg-meta-eyebrow">{o.metaEyebrow}</div>
          <div>{o.metaVersion}</div>
        </div>
      </header>

      <div className="pkg-one-liner">
        <div className="pkg-one-liner-label">{o.oneLinerLabel}</div>
        <div className="pkg-one-liner-text">
          {o.oneLinerLead}
          <strong>{o.oneLinerSystems[0]}</strong>
          {o.oneLinerJoiner}
          <strong>{o.oneLinerSystems[1]}</strong>
          {o.oneLinerFinalJoiner}
          <strong>{o.oneLinerSystems[2]}</strong>
          {o.oneLinerTail}
        </div>
      </div>

      <div className="pkg-two-col">
        <div className="pkg-col-card pkg-includes">
          <h3>{o.includesTitle}</h3>
          <ul>
            {o.includes.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="pkg-col-card pkg-excludes">
          <h3>
            {o.excludesTitle.split(o.excludesTitleEm)[0]}
            <em>{o.excludesTitleEm}</em>
            {o.excludesTitle.split(o.excludesTitleEm)[1]}
          </h3>
          <ul>
            {o.excludes.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <section className="pkg-section">
        <h2 className="pkg-section-title">{o.priceHeading}</h2>
        <div className="pkg-pricing">
          <div className="pkg-pricing-grid">
            <div>
              <div className="pkg-pricing-tag">{o.pricingTag}</div>
              <div className="pkg-pricing-block-label">{o.pricingMonthlyLabel}</div>
              <div className="pkg-pricing-strikethrough">{o.pricingStrikethrough}</div>
              <div className="pkg-pricing-price">
                {o.pricingPrice}
                <small>{o.pricingPriceSuffix}</small>
              </div>
            </div>
            <div>
              <div className="pkg-pricing-block-label">{o.pricingStartupLabel}</div>
              <div className="pkg-pricing-price">
                {o.pricingStartupPrice}
                <small> {o.pricingStartupSuffix}</small>
              </div>
            </div>
            <div>
              <div className="pkg-pricing-block-label">{o.pricingLockLabel}</div>
              <div className="pkg-pricing-price">{o.pricingLockValue}</div>
            </div>
          </div>
          <div className="pkg-pricing-note">{o.pricingNote}</div>
        </div>
      </section>

      <section className="pkg-section">
        <h2 className="pkg-section-title">{o.onboardingHeading}</h2>
        <div className="pkg-timeline">
          {o.timelineDays.map((d, i) => (
            <div
              key={i}
              className={`pkg-timeline-day${i >= 5 ? " pkg-live" : ""}`}
            >
              <div className="pkg-timeline-day-label">{d.label}</div>
              <div className="pkg-timeline-day-text">{d.text}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="pkg-section">
        <h2 className="pkg-section-title">{o.successHeading}</h2>
        <div className="pkg-milestones">
          {o.milestones.map((m, i) => (
            <div key={i} className="pkg-milestone">
              <div className="pkg-milestone-day">{m.day}</div>
              <div className="pkg-milestone-text">
                <strong>{m.textStrong}</strong>
                {m.textRest}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pkg-section">
        <h2 className="pkg-section-title">{o.safetyHeading}</h2>
        <div className="pkg-guarantees">
          <div className="pkg-guarantees-grid">
            {o.guarantees.map((g, i) => (
              <div key={i} className="pkg-guarantee">
                <div className="pkg-guarantee-icon">✓</div>
                <div className="pkg-guarantee-text">
                  <strong>{g.strong}</strong>
                  {g.rest}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="pkg-card-footer">
        <div className="pkg-contact">
          <div>
            <div className="pkg-contact-label">{o.contactLabel}</div>
            <strong>{o.contact1Name}</strong> · {o.contact1Email}
          </div>
          <div>
            <div className="pkg-contact-label">{o.contactCtoLabel}</div>
            <strong>{o.contact2Name}</strong> · {o.contact2Email}
          </div>
        </div>
        <a href="https://ekspedenten.no" className="pkg-cta">
          {o.contactCta}
        </a>
      </footer>
    </article>
  );
}
