"use client";
import { useLanguage } from "@/lib/i18n";

export default function PricingFootnote() {
  const { t } = useLanguage();
  return <p className="pp-footnote">{t.pricingStandard.footnote}</p>;
}
