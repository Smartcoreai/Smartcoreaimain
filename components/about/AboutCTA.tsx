"use client";
import Link from "next/link";
import { DemoPopup } from "@/components/DemoPopup";

export default function AboutCTA() {
  return (
    <section className="ab-final-cta">
      <div className="ab-container">
        <span className="ab-pill" style={{ marginBottom: 24 }}>Bli med på reisen</span>
        <h2>
          Vil du være<br />
          <em>en av de første</em>?
        </h2>
        <p>
          Founding-pris for første 5 klinikker. Live på 7 dager. 60 dagers ROI-garanti.
        </p>
        <div className="ab-cta-row">
          <DemoPopup triggerText="Bestill demo" className="lp-btn-primary" />
          <Link href="/diagnose" className="ab-btn-secondary">
            Beregn ROI <span aria-hidden="true">→</span>
          </Link>
        </div>
        <p className="ab-cta-trust">
          60 dagers ROI-garanti · Svar innen 4 timer
        </p>
      </div>
    </section>
  );
}
