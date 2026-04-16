"use client";
import { ArrowRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/i18n";

function useCountUp(target: number, duration: number, triggered: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!triggered) { setValue(0); return; }
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
    <section style={{ background: "#1a1a2e", padding: "100px 24px" }}>
      <div className="wrap">
        <div className="midcta-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px 80px",
          alignItems: "center",
          maxWidth: 960,
          margin: "0 auto",
        }}>

          {/* Left: text */}
          <ScrollReveal>
            <div>
              <h2 style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
                fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 600,
                lineHeight: 1.18, letterSpacing: "-0.015em",
                color: "#ffffff", margin: "0 0 18px",
              }}>
                {s.headline}
              </h2>
              <p style={{
                fontSize: 16, color: "rgba(255,255,255,0.52)",
                lineHeight: 1.72, margin: "0 0 36px",
              }}>
                {s.subtitle}
              </p>
              <a
                href="/calculator"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "14px 28px", borderRadius: 11,
                  background: "#b8902e", color: "#ffffff",
                  fontSize: 15, fontWeight: 600, textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(184,144,46,0.28)",
                  transition: "background 0.2s, transform 0.2s",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#d4af37";
                  el.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#b8902e";
                  el.style.transform = "translateY(0)";
                }}
              >
                {s.cta} <ArrowRight size={16} />
              </a>
            </div>
          </ScrollReveal>

          {/* Right: calculator card */}
          <ScrollReveal delay={120}>
            <div
              ref={cardRef}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "32px 30px",
              }}
            >
              {/* Stat 1 — hours saved */}
              <div style={{
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                paddingBottom: 26, marginBottom: 26,
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10,
                }}>
                  {s.savingLabel}
                </div>
                <div style={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                  fontSize: 56, fontWeight: 700, color: "#d4af37",
                  lineHeight: 1, letterSpacing: "-0.03em",
                }}>
                  {hoursCount}
                </div>
                <div style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", marginTop: 6 }}>
                  {s.savingLabel}
                </div>
              </div>

              {/* Stat 2 — extra bookings */}
              <div>
                <div style={{
                  fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10,
                }}>
                  {s.bookingLabel}
                </div>
                <div style={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                  fontSize: 40, fontWeight: 700, color: "#d4af37",
                  lineHeight: 1, letterSpacing: "-0.02em",
                }}>
                  {s.bookingValue}
                </div>
                <div style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", marginTop: 6 }}>
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
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
