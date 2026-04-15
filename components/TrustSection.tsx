"use client";
import { Shield, Lock, Building2, User } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/i18n";

const ICONS = [Shield, Lock, Building2, User];

export default function TrustSection() {
  const { t } = useLanguage();
  const s = t.trust;

  return (
    <section style={{ background: "#fafaf8", padding: "96px 24px" }}>
      <div className="wrap">

        {/* Header */}
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{
              fontSize: 13, fontWeight: 600, letterSpacing: "0.06em",
              textTransform: "uppercase", color: "#b8902e", marginBottom: 18,
            }}>
              {s.eyebrow}
            </div>
            <h2 style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
              fontSize: "clamp(26px, 3.2vw, 40px)", fontWeight: 600,
              lineHeight: 1.15, letterSpacing: "-0.015em",
              color: "#1a1a2e", margin: 0,
            }}>
              {s.headline}
            </h2>
          </div>
        </ScrollReveal>

        {/* Cards */}
        <div className="trust-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
          maxWidth: 960,
          margin: "0 auto",
          alignItems: "stretch",
        }}>
          {s.cards.map((card, i) => {
            const Icon = ICONS[i];
            return (
              <ScrollReveal key={i} delay={i * 70} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{
                  background: "#ffffff",
                  border: "1px solid #e8e6dc",
                  borderRadius: 14,
                  padding: "24px 20px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#f5ebd0";
                  el.style.boxShadow = "0 4px 20px rgba(184,144,46,0.07)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#e8e6dc";
                  el.style.boxShadow = "none";
                }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: "#fdf9ed", border: "1px solid #f5ebd0",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#b8902e", marginBottom: 14, flexShrink: 0,
                  }}>
                    <Icon size={18} />
                  </div>
                  <div style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                    fontSize: 13, fontWeight: 700, color: "#1a1a2e",
                    marginBottom: 8, letterSpacing: "-0.005em",
                  }}>
                    {card.title}
                  </div>
                  <p style={{ fontSize: 13, color: "#5a5a6e", lineHeight: 1.65, margin: 0 }}>
                    {card.desc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      <style>{`
        .trust-grid > .reveal { height: 100%; display: flex; flex-direction: column; }
        @media (max-width: 767px) {
          .trust-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 420px) {
          .trust-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
