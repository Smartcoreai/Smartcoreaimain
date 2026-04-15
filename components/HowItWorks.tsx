"use client";
import { Phone, Wrench, Rocket } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import ScrollReveal from "@/components/ScrollReveal";

const STEP_ICONS = [Phone, Wrench, Rocket];

export default function HowItWorks() {
  const { t } = useLanguage();
  const s = t.howItWorks;

  return (
    <section style={{ padding: "96px 24px", background: "#080604" }}>
      <div className="wrap">
        {/* Header */}
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="tag">{s.tag}</span>
            <h2 style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700,
              color: "#F5F0E8",
              margin: "16px 0 0",
              letterSpacing: "-0.025em",
            }}>
              {s.headline}
            </h2>
          </div>
        </ScrollReveal>

        {/* Steps */}
        <div className="hiw-grid">
          {s.steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <ScrollReveal key={i} delay={i * 120} style={{ height: "100%" }}>
                <div className="hiw-step">
                  {/* Icon circle */}
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, rgba(212,175,55,0.14), rgba(212,175,55,0.04))",
                    border: "1px solid rgba(212,175,55,0.28)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                  }}>
                    <Icon size={22} style={{ color: "#D4AF37" }} />
                  </div>

                  {/* Step number */}
                  <div style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "rgba(212,175,55,0.45)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    textAlign: "center",
                    marginBottom: 10,
                  }}>
                    {step.num}
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: "Syne, sans-serif",
                    fontSize: "clamp(16px, 1.8vw, 19px)",
                    fontWeight: 700,
                    color: "#F5F0E8",
                    margin: "0 0 12px",
                    textAlign: "center",
                    letterSpacing: "-0.015em",
                    lineHeight: 1.3,
                  }}>
                    {step.title}
                  </h3>

                  {/* Divider */}
                  <div style={{
                    width: 32,
                    height: 1,
                    background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.35), transparent)",
                    margin: "0 auto 14px",
                  }} />

                  {/* Description */}
                  <p style={{
                    fontSize: 14,
                    color: "#8A8070",
                    lineHeight: 1.75,
                    margin: 0,
                    textAlign: "center",
                    flexGrow: 1,
                  }}>
                    {step.desc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      <style>{`
        .hiw-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 960px;
          margin: 0 auto;
        }
        .hiw-step {
          padding: 36px 28px;
          background: rgba(212,175,55,0.02);
          border: 1px solid rgba(212,175,55,0.08);
          border-radius: 20px;
          transition: border-color 0.25s, background 0.25s;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .hiw-step:hover {
          border-color: rgba(212,175,55,0.22);
          background: rgba(212,175,55,0.04);
        }
        @media (max-width: 767px) {
          .hiw-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}
