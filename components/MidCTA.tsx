"use client";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/i18n";

const GOLD = "#c8a04a";
const NAVY = "#1a1a2e";
const CREAM = "#faf7f0";

export default function MidCTA() {
  const { t } = useLanguage();
  const s = t.midCta;
  const [open, setOpen] = useState(false);

  return (
    <section style={{ background: NAVY, padding: "100px 24px" }}>
      <div className="wrap">
        <div className="midcta-grid" style={{
          display: "flex",
          gap: "56px",
          alignItems: "flex-start",
          maxWidth: 1100,
          margin: "0 auto",
        }}>

          {/* Left: text */}
          <ScrollReveal>
            <div style={{ flex: "1.1" }}>
              <h2 style={{
                fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                fontSize: "clamp(24px, 3vw, 40px)",
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: CREAM,
                margin: "0 0 20px",
              }}>
                {s.headline}
              </h2>
              <p style={{
                fontSize: "clamp(15px, 1.5vw, 17px)",
                color: "rgba(250,247,240,0.55)",
                lineHeight: 1.7,
                margin: "0 0 36px",
                maxWidth: 460,
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
            <div style={{
              flexShrink: 0,
              width: 360,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(200,160,74,0.18)",
              borderRadius: 12,
              padding: "32px 36px",
              display: "flex",
              flexDirection: "column",
            }}>

              {/* Stat 1 — lost revenue */}
              <div style={{ paddingBottom: 24 }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "rgba(250,247,240,0.45)",
                  marginBottom: 10, whiteSpace: "nowrap",
                }}>
                  {s.stat1Label}
                </div>
                <div style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "clamp(28px, 3.5vw, 42px)",
                  fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1,
                  color: GOLD, marginBottom: 8, whiteSpace: "nowrap",
                }}>
                  {s.stat1Value}
                </div>
                <div style={{ fontSize: 13, color: "rgba(250,247,240,0.4)", whiteSpace: "nowrap" }}>
                  {s.stat1Sub}
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 24 }} />

              {/* Stat 2 — LTV */}
              <div style={{ paddingBottom: 20 }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "rgba(250,247,240,0.45)",
                  marginBottom: 10, whiteSpace: "nowrap",
                }}>
                  {s.stat2Label}
                </div>
                <div style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "clamp(28px, 3.5vw, 42px)",
                  fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1,
                  color: GOLD, marginBottom: 8, whiteSpace: "nowrap",
                }}>
                  {s.stat2Value}
                </div>
                <div style={{ fontSize: 13, color: "rgba(250,247,240,0.4)", whiteSpace: "nowrap" }}>
                  {s.stat2Sub}
                </div>
              </div>

              {/* Breakdown trigger */}
              <button
                onClick={() => setOpen(v => !v)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: 0, display: "inline-flex", alignItems: "center", gap: 5,
                  fontSize: 13, fontWeight: 600, color: GOLD,
                  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                  transition: "opacity 0.15s",
                  alignSelf: "flex-start",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              >
                {s.breakdownTrigger}
                <span style={{
                  display: "inline-block",
                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.22s ease",
                  fontSize: 9,
                }}>▼</span>
              </button>

              {/* Breakdown content */}
              {open && (
                <div style={{
                  marginTop: 16,
                  fontSize: 12,
                  color: "rgba(250,247,240,0.55)",
                  lineHeight: 1.65,
                }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "rgba(250,247,240,0.7)", margin: "0 0 12px" }}>
                    Slik beregner vi tallene:
                  </p>
                  <ol style={{ margin: 0, padding: "0 0 0 16px", display: "flex", flexDirection: "column", gap: 10 }}>
                    {s.breakdown.map((item, i) => (
                      <li key={i}>
                        <strong style={{ color: "rgba(250,247,240,0.75)", display: "block", marginBottom: 2 }}>
                          {item.title}
                        </strong>
                        {item.detail.split("\n").map((line, j) => (
                          <span key={j} style={{ display: "block" }}>{line}</span>
                        ))}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

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
          .midcta-grid > * { width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
