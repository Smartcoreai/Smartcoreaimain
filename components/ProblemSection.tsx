"use client";
import { Phone, Clock, Inbox } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/i18n";

const ICONS = [Phone, Clock, Inbox];

export default function ProblemSection() {
  const { t } = useLanguage();
  const s = t.problem;

  return (
    <section style={{ background: "var(--bg-section, #f7f6f1)", padding: "96px 24px" }}>
      <div className="wrap">

        {/* Header */}
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{
              fontSize: 13, fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#b8902e",
              marginBottom: 18,
            }}>
              {s.eyebrow}
            </div>
            <h2 style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
              fontSize: "clamp(26px, 3.2vw, 40px)",
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
              color: "#1a1a2e",
              margin: "0 auto",
              maxWidth: 580,
            }}>
              {s.headline}
            </h2>
          </div>
        </ScrollReveal>

        {/* Cards */}
        <div className="problem-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
          maxWidth: 960,
          margin: "0 auto",
          alignItems: "stretch",
        }}>
          {s.cards.map((card, i) => {
            const Icon = ICONS[i];
            return (
              <ScrollReveal key={i} delay={i * 80} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{
                  background: "#ffffff",
                  border: "1px solid #e8e6dc",
                  borderRadius: 16,
                  padding: "32px 28px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#f5ebd0";
                  el.style.boxShadow = "0 4px 24px rgba(184,144,46,0.08)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#e8e6dc";
                  el.style.boxShadow = "none";
                }}
                >
                  {/* Icon */}
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: "#fdf9ed",
                    border: "1px solid #f5ebd0",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#b8902e",
                    marginBottom: 20,
                    flexShrink: 0,
                  }}>
                    <Icon size={20} />
                  </div>

                  {/* Stat */}
                  <div style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                    fontSize: 40, fontWeight: 700,
                    color: "#b8902e", lineHeight: 1,
                    marginBottom: 10,
                    letterSpacing: "-0.02em",
                  }}>
                    {card.stat}
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                    fontSize: 17, fontWeight: 600,
                    color: "#1a1a2e",
                    margin: "0 0 10px",
                    lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                  }}>
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontSize: 14,
                    color: "#5a5a6e",
                    lineHeight: 1.7,
                    margin: 0,
                    flexGrow: 1,
                  }}>
                    {card.desc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Source footnote */}
        <p style={{ fontSize: 11, color: "#8a8a98", textAlign: "center", margin: "28px auto 0", maxWidth: 700, lineHeight: 1.6 }}>
          {(s as typeof s & { sources: string }).sources}
        </p>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .problem-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 768px) and (max-width: 900px) {
          .problem-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        .problem-grid > .reveal {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </section>
  );
}
