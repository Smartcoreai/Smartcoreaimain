"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { DemoPopup } from "@/components/DemoPopup";

export default function MainPricingCard() {
  const { t } = useLanguage();
  const p = t.pricingStandard;

  return (
    <div className="pp-main-card pp-fade-target">
      <div className="pp-card-head">
        <div className="pp-card-headline">
          <div className="pp-card-title">{p.cardTitle}</div>
          <p className="pp-card-desc">{p.oneLiner}</p>
        </div>

        <div className="pp-price-stack">
          <div className="pp-price-tag">{p.foundingTag}</div>
          <div className="pp-price-strike">
            {p.regularPrice}
            <span className="pp-unit">{p.period}</span>
          </div>
          <div className="pp-price-amount">
            {p.foundingPrice}
            <span className="pp-unit">{p.period}</span>
          </div>
          <div className="pp-price-clar">{p.priceClarification}</div>
        </div>
      </div>

      <div className="pp-price-meta">
        <div className="pp-meta-row">
          <span className="pp-meta-label">{p.setupLabel}</span>
          <span className="pp-meta-value">{p.setupValue}</span>
        </div>
        <div className="pp-meta-row">
          <span className="pp-meta-label">{p.commitmentLabel}</span>
          <span className="pp-meta-value">{p.commitmentValue}</span>
        </div>
      </div>

      <div className="pp-block">
        <h3 className="pp-block-title">{p.includesHeading}</h3>
        <div className="pp-feature-grid">
          {p.includes.map((f) => (
            <div className="pp-feature-row" key={f}>
              <span className="pp-feature-check">✓</span>
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pp-block">
        <h3 className="pp-block-title">{p.guaranteesHeading}</h3>
        <div className="pp-feature-grid">
          {p.guarantees.map((g) => (
            <div className="pp-feature-row" key={g}>
              <span className="pp-feature-check">✓</span>
              <span>{g}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pp-cta-stack">
        <DemoPopup triggerText={p.ctaPrimary} className="pp-btn-primary" />
        <Link href="/pakke" className="pp-btn-secondary">
          {p.ctaSecondary}
        </Link>
      </div>
    </div>
  );
}
