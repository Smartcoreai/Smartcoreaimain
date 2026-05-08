"use client";
import { DemoPopup } from "@/components/DemoPopup";

export default function FinalCTA() {
  return (
    <section className="lp-final-cta">
      <div className="lp-container">
        <span className="lp-pill" style={{ marginBottom: 24 }}>Founding-pris: 9 430 kr/mnd</span>
        <h2>Få Ária live for klinikken din<br />på syv dager.</h2>
        <p>14 dagers gratis prøve. Ingen kjøpsplikt. 87% missed-call-reduksjon eller pengene tilbake.</p>
        <DemoPopup triggerText="Bestill demo" className="lp-btn-primary" />
      </div>
    </section>
  );
}
