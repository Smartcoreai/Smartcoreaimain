"use client";
import { DemoPopup } from "@/components/DemoPopup";

export default function PricingCTA() {
  return (
    <>
      <div className="pp-bottom-cta pp-fade-target">
        <h3>Klar for å se hva Ekspedenten kan gjøre for klinikken din?</h3>
        <p>Uforpliktende 20-minutters kartlegging. 60 dagers ROI-garanti.</p>
        <DemoPopup triggerText="Bestill demo" className="pp-btn-primary" />
      </div>
      <p className="pp-footnote">
        Alle priser ekskl. mva. Engangsoppsett kr 10 000 ved første kontrakt. Live på 7 dager.
      </p>
    </>
  );
}
