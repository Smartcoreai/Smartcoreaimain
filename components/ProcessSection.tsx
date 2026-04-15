"use client";
import { useLanguage } from "@/lib/i18n";
import ScrollReveal from "@/components/ScrollReveal";

export default function ProcessSection() {
  const { t } = useLanguage();
  const s = t.process;

  return (
    <section style={{ background: "#fafaf8", padding: "96px 24px" }}>
      <div className="wrap">

        {/* Header */}
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
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

        {/* Steps */}
        <div style={{
          position: "relative",
          maxWidth: 900,
          margin: "0 auto",
        }}>
          {/* Connecting line — desktop only */}
          <div className="process-line" style={{
            position: "absolute",
            top: 22,
            left: "12%",
            right: "12%",
            height: 1,
            background: "linear-gradient(90deg, transparent, #e8e6dc 15%, #f5ebd0 50%, #e8e6dc 85%, transparent)",
            zIndex: 0,
            pointerEvents: "none",
          }} />

          <div className="process-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0 28px",
          }}>
            {s.steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 90}>
                <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>

                  {/* Number circle */}
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: i === 0 ? "#1a1a2e" : "#ffffff",
                    border: i === 0 ? "none" : "1.5px solid #e8e6dc",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 22px",
                    boxShadow: i === 0 ? "0 4px 16px rgba(26,26,46,0.14)" : "0 0 0 4px #fafaf8",
                    transition: "transform 0.2s",
                  }}>
                    <span style={{
                      fontSize: 13, fontWeight: 700, letterSpacing: "0.02em",
                      color: i === 0 ? "#ffffff" : "#b8902e",
                      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                    }}>
                      {step.num}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                    fontSize: 16, fontWeight: 700, color: "#1a1a2e",
                    margin: "0 0 8px", letterSpacing: "-0.01em",
                  }}>
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontSize: 13.5, color: "#5a5a6e",
                    lineHeight: 1.65, margin: 0,
                  }}>
                    {step.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .process-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .process-line { display: none !important; }
          .process-grid .reveal { text-align: left !important; }
          .process-grid .reveal > div { text-align: left !important; }
          .process-grid .reveal > div > div:first-child {
            margin-left: 0 !important;
            margin-right: auto !important;
          }
        }
        @media (min-width: 768px) and (max-width: 900px) {
          .process-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 40px 28px !important; }
          .process-line { display: none !important; }
        }
      `}</style>
    </section>
  );
}
