"use client";
import { useLanguage } from "@/lib/i18n";

export default function PricingHero() {
  const { t } = useLanguage();
  const p = t.pricingStandard;
  return (
    <div className="pp-header">
      <h1>{p.heroTitle}</h1>
      <p>{p.heroSubtitle}</p>
    </div>
  );
}
