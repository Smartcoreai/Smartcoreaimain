"use client";
import { DemoPopup } from "@/components/DemoPopup";

export default function FinalCTA() {
  return (
    <section className="lp-final-cta">
      <div className="lp-container">
        <span className="lp-pill" style={{ marginBottom: 24 }}>Founding-pris: kr 6 900/mnd</span>
        <h2>Få Ekspedenten live for klinikken din<br />på syv dager.</h2>
        <p>Kom i gang på 7 dager. 60 dagers ROI-garanti.</p>
        <DemoPopup triggerText="Bestill demo" className="lp-btn-primary" />
      </div>
    </section>
  );
}
