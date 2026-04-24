"use client";
import { useRef, useState, useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/i18n";

const GOLD = "#c8a04a";
const NAVY = "#1a1a2e";
const CREAM = "#faf7f0";

function useCountUp(target: number, duration: number, triggered: boolean) {
  const [value, setValue] = useState(target);
  useEffect(() => {
    if (!triggered) return;
    let current = 0;
    const increment = target / (duration / 16);
    const id = setInterval(() => {
      current = Math.min(current + increment, target);
      setValue(Math.floor(current));
      if (current >= target) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [triggered, target, duration]);
  return value;
}

export default function MidCTA() {
  const { t } = useLanguage();
  const s = t.midCta;

  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, []);

  const hoursCount = useCountUp(47, 1400, inView);

  return (
    <section style={{ background: NAVY, padding: "100px 24px" }}>
      <div className="wrap">
        <div className="midcta-grid" style={{
          display: "flex",
          gap: "56px",
          alignItems: "center",
          maxWidth: 1100,
          margin: "0 auto",
        }}>

          {/* Left: text */}
          <ScrollReveal>
            <div style={{ flex: "1.15" }}>
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(28px, 3.6vw, 48px)",
                fontWeight: 700,
                fontStyle: "normal",
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: CREAM,
                margin: "0 0 24px",
              }}>
                {s.headline}
              </h2>
              <p style={{
                fontSize: "clamp(15px, 1.6vw, 17px)",
                color: "rgba(250,247,240,0.6)",
                lineHeight: 1.7,
                margin: "0 0 36px",
                maxWidth: 480,
              }}>
                {s.subtitle}
              </p>
              <a
                href="/calculator"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "14px 28px", borderRadius: 11,
                  background: GOLD, color: NAVY,
                  fontSize: 15, fontWeight: 700, textDecoration: "none",
                  transition: "opacity 0.18s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              >
                {s.cta}
              </a>
            </div>
          </ScrollReveal>

          {/* Right: stat box */}
          <ScrollReveal delay={120}>
            <div
              ref={cardRef}
              style={{
                flex: "0.85",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(200,160,74,0.18)",
                borderRadius: 12,
                padding: "32px 36px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Stat 1 — hours saved */}
              <div style={{ paddingBottom: 28 }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "rgba(250,247,240,0.45)",
                  marginBottom: 10,
                }}>
                  {s.savingLabel}
                </div>
                <div style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "clamp(32px, 4vw, 48px)",
                  fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1,
                  color: GOLD, marginBottom: 8,
                }}>
                  {hoursCount}
                </div>
                <div style={{ fontSize: 13, color: "rgba(250,247,240,0.45)" }}>
                  {s.savingLabel}
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 28 }} />

              {/* Stat 2 — extra bookings */}
              <div>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "rgba(250,247,240,0.45)",
                  marginBottom: 10,
                }}>
                  {s.bookingLabel}
                </div>
                <div style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "clamp(32px, 4vw, 48px)",
                  fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1,
                  color: GOLD, marginBottom: 8,
                }}>
                  {s.bookingValue}
                </div>
                <div style={{ fontSize: 13, color: "rgba(250,247,240,0.45)" }}>
                  {s.bookingLabel}
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .midcta-grid {
            flex-direction: column !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
