"use client";
import Link from "next/link";
import { DemoPopup } from "@/components/DemoPopup";

const STATS: { icon: React.ReactNode; label: string; value: string; gold?: boolean }[] = [
  {
    label: "Anrop besvart",
    value: "14",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
    ),
  },
  {
    label: "Timer booket",
    value: "9",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
    ),
  },
  {
    label: "Innkallinger sendt",
    value: "23",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
    ),
  },
  {
    label: "Pasienter reaktivert",
    value: "3",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M8 16H3v5" /></svg>
    ),
  },
  {
    label: "Google-vurdering",
    value: "5,0",
    gold: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
    ),
  },
];

export default function HeroSection() {
  return (
    <section className="lp-hero">
      <div className="lp-container lp-hero-grid">
        <div>
          <h1>
            Telefonen. <span className="second">Besvart automatisk.</span>
          </h1>
          <p className="lp-lead">
            Ekspedenten svarer pasienter 24/7 på norsk og booker time direkte i kalenderen, mens teamet ditt fokuserer på pasientene som er foran dem.
          </p>
          <div className="lp-btn-group">
            <DemoPopup triggerText="Bestill demo" className="lp-btn-primary" />
            <Link href="/diagnose" className="lp-btn-ghost">
              Beregn din lekkasje <span className="lp-arrow">→</span>
            </Link>
          </div>
        </div>

        <div className="lp-hero-stage">
          <div className="lp-pavakt">
            <div className="lp-pavakt-head">
              <div className="lp-pavakt-status">
                <span className="lp-pavakt-dot" />
                Ekspedenten · på vakt
              </div>
              <div className="lp-pavakt-time">i dag</div>
            </div>

            <div className="lp-pavakt-subtitle">Her er dagen min så langt.</div>

            <div className="lp-pavakt-stats">
              {STATS.map((s) => (
                <div className="lp-pavakt-stat" key={s.label}>
                  <span className={`lp-pavakt-icon${s.gold ? " gold" : ""}`} aria-hidden="true">{s.icon}</span>
                  <span className="lp-pavakt-label">{s.label}</span>
                  <span className="lp-pavakt-value">{s.value}</span>
                </div>
              ))}
            </div>

            <div className="lp-pavakt-booking">
              <div className="lp-pavakt-check" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l4 4L19 7" /></svg>
              </div>
              <div className="lp-pavakt-booking-info">
                <div className="lp-pavakt-booking-label">Siste booking</div>
                <div className="lp-pavakt-booking-name">Lars Olsen · Tannrens</div>
              </div>
              <div className="lp-pavakt-booking-time">
                <b>Nettopp</b>
                Tor. 10:00
              </div>
            </div>

            <div className="lp-pavakt-saved">
              <div className="lp-pavakt-saved-label">Reddet omsetning i dag</div>
              <div className="lp-pavakt-saved-value">18 400 kr</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
