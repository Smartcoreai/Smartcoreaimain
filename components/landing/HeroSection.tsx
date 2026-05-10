"use client";
import Link from "next/link";
import { DemoPopup } from "@/components/DemoPopup";

export default function HeroSection() {
  return (
    <section className="lp-hero">
      <div className="lp-container lp-hero-grid">
        <div>
          <span className="lp-pill">Bygget for nordiske klinikker</span>
          <h1>
            Telefonen.<br />Besvart automatisk.
          </h1>
          <p className="lp-lead">
            Ekspedenten svarer pasienter 24/7 på norsk og booker time direkte i kalenderen, mens teamet ditt fokuserer på pasientene som er foran dem.
          </p>
          <div className="lp-btn-group">
            <DemoPopup triggerText="Bestill demo" className="lp-btn-primary" />
            <Link href="/diagnose" className="lp-btn-secondary">
              Beregn din ROI <span className="lp-arrow">→</span>
            </Link>
          </div>
        </div>

        <div className="lp-hero-stage">
          <div className="lp-floating-sms">
            <div className="lp-sms-label">SMS · Bergen Tannklinikk</div>
            <div className="lp-sms-text">Din time er bekreftet, torsdag kl 10:00. Klikk for å se detaljer.</div>
          </div>

          <div className="lp-call-card">
            <div className="lp-call-header">
              <div className="lp-call-status">
                <div className="lp-pulse-dot" />
                <span>Live · Pågående samtale</span>
              </div>
              <div className="lp-call-time">02:14</div>
            </div>

            <div className="lp-caller-info">
              <div className="lp-caller-avatar">LO</div>
              <div>
                <div className="lp-caller-name">Lars Olsen</div>
                <div className="lp-caller-meta">+47 480 21 045 · Norge</div>
              </div>
            </div>

            <div className="lp-waveform" aria-hidden="true">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className="lp-wave-bar"
                  style={{
                    height: `${WAVE_HEIGHTS[i]}%`,
                    animationDelay: `${WAVE_DELAYS[i]}s`,
                  }}
                />
              ))}
            </div>

            <div className="lp-transcript-label">Live transkript</div>

            <div className="lp-transcript-line patient">
              <div className="lp-speaker">Pasient</div>
              <div className="lp-text">"Jeg trenger en tannrens. Har dere noe ledig denne uken?"</div>
            </div>
            <div className="lp-transcript-line aria">
              <div className="lp-speaker">Ekspedenten</div>
              <div className="lp-text">"Selvsagt. Vi har ledig torsdag formiddag klokka ti, eller fredag ettermiddag klokka to. Hva passer best?"</div>
            </div>
            <div className="lp-transcript-line patient">
              <div className="lp-speaker">Pasient</div>
              <div className="lp-text">"Torsdag klokka ti."</div>
            </div>
          </div>

          <div className="lp-floating-booking">
            <div className="lp-booking-icon">✓</div>
            <div className="lp-booking-label">Booking bekreftet</div>
            <div className="lp-booking-title">Tannrens</div>
            <div className="lp-booking-time">Tor. 7. mai · 10:00</div>
          </div>
        </div>
      </div>
    </section>
  );
}

const WAVE_HEIGHTS = [30,60,80,50,90,40,75,55,85,35,65,50,80,45,70,30,55,90,60,40,75,50,65,35];
const WAVE_DELAYS  = [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0,1.1,1.2,1.3,0.05,0.15,0.25,0.35,0.45,0.55,0.65,0.75,0.85,0.95];
