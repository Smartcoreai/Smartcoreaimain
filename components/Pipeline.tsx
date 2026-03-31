"use client";
import { useState, useEffect } from "react";
import { Phone, Calendar, Rocket, TrendingUp, CheckCircle, ArrowDown } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: <Phone size={22} />,
    color: "#a855f7",
    title: "First Contact",
    desc: "Visitor lands on your site. The AI chatbot engages instantly, captures their details, and qualifies the lead — even at 3am.",
    outcome: "Lead captured",
    outcomeColor: "#a855f7",
    metric: "Avg. 2 min",
    metricLabel: "to first response",
    details: ["Name & contact captured", "Business needs identified", "Urgency scored by AI"],
  },
  {
    step: "02",
    icon: <Calendar size={22} />,
    color: "#22d3ee",
    title: "Instant Booking",
    desc: "The AI books them directly into your calendar — no back-and-forth, no phone calls. A confirmation lands in their inbox immediately.",
    outcome: "Booking confirmed",
    outcomeColor: "#22d3ee",
    metric: "0 emails",
    metricLabel: "needed to schedule",
    details: ["Calendar sync checked", "SMS + email confirmation", "Reminder sent 24h before"],
  },
  {
    step: "03",
    icon: <Rocket size={22} />,
    color: "#f472b6",
    title: "Onboarding",
    desc: "After the call, they're auto-added to your CRM. A tailored onboarding sequence kicks off with zero manual effort on your part.",
    outcome: "Client onboarded",
    outcomeColor: "#f472b6",
    metric: "< 1 day",
    metricLabel: "onboarding time",
    details: ["CRM record created", "Welcome sequence triggered", "Intake form sent & tracked"],
  },
  {
    step: "04",
    icon: <TrendingUp size={22} />,
    color: "#4ade80",
    title: "Revenue Generated",
    desc: "Invoices go out automatically, payments are tracked in the CRM, and your dashboard shows real revenue — in real time.",
    outcome: "Revenue generated",
    outcomeColor: "#4ade80",
    metric: "340%",
    metricLabel: "avg revenue lift",
    details: ["Invoice auto-generated", "Payment tracked in CRM", "Revenue dashboard updated"],
  },
];

export default function Pipeline() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveStep(s => (s + 1) % STEPS.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="pipeline" style={{ background: "#0b0b18", padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: 600, height: 400, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(168,85,247,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="wrap">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="tag" style={{ display: "inline-flex", marginBottom: 16 }}>The pipeline</div>
          <h2 style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(32px,4vw,52px)",
            fontWeight: 800, color: "#f4f4f8", letterSpacing: "-0.03em", marginBottom: 14, lineHeight: 1.1,
          }}>
            From stranger to{" "}
            <span style={{ background: "linear-gradient(135deg,#4ade80,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              paying client
            </span>
            {" "}— automated.
          </h2>
          <p style={{ fontSize: 16, color: "#8888a0", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Here's exactly what happens from the moment someone visits your site to the moment they pay you.
          </p>
        </div>

        {/* Desktop: horizontal steps + detail panel */}
        <div className="pipeline-desktop" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {/* Step tabs */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20,
            overflow: "hidden", marginBottom: 24,
          }}>
            {STEPS.map((s, i) => (
              <button key={s.step} onClick={() => setActiveStep(i)} style={{
                padding: "20px 20px",
                background: activeStep === i ? s.color + "10" : "rgba(15,15,20,0.5)",
                borderRight: i < STEPS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit",
                borderBottom: activeStep === i ? `2px solid ${s.color}` : "2px solid transparent",
                transition: "all 0.3s ease",
                position: "relative",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <div style={{
                    color: activeStep === i ? s.color : "#44444e",
                    transition: "color 0.3s",
                  }}>{s.icon}</div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: activeStep === i ? s.color : "#44444e", letterSpacing: "0.08em", textTransform: "uppercase", transition: "color 0.3s" }}>
                    Step {s.step}
                  </span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: activeStep === i ? "#f4f4f8" : "#8888a0", transition: "color 0.3s" }}>
                  {s.title}
                </div>
                {/* Live indicator */}
                {activeStep === i && (
                  <div style={{
                    position: "absolute", top: 12, right: 12, display: "flex", alignItems: "center", gap: 4,
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, animation: "blink 1.5s infinite" }} />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          {(() => {
            const s = STEPS[activeStep];
            return (
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24,
                background: "rgba(15,15,20,0.7)", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 20, padding: 32, backdropFilter: "blur(12px)",
              }} className="pipeline-panel">
                {/* Left */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 14,
                      background: s.color + "15", display: "flex", alignItems: "center", justifyContent: "center",
                      color: s.color, border: `1px solid ${s.color}30`,
                    }}>{s.icon}</div>
                    <div>
                      <div style={{ fontSize: 11, color: "#8888a0", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>Step {s.step}</div>
                      <div style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800, color: "#f4f4f8", letterSpacing: "-0.02em" }}>{s.title}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 15, color: "#8888a0", lineHeight: 1.75, marginBottom: 24 }}>{s.desc}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                    {s.details.map(d => (
                      <li key={d} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#c4c4d0" }}>
                        <CheckCircle size={14} color={s.color} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: Outcome card */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {/* Outcome */}
                  <div style={{
                    background: s.color + "08", border: `1px solid ${s.color}25`,
                    borderRadius: 16, padding: "24px 24px", textAlign: "center",
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#8888a0", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Outcome</div>
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px",
                      background: s.outcomeColor + "20", borderRadius: 999,
                      border: `1px solid ${s.outcomeColor}40`,
                    }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.outcomeColor, boxShadow: `0 0 8px ${s.outcomeColor}` }} />
                      <span style={{ fontSize: 14, fontWeight: 700, color: s.outcomeColor }}>{s.outcome}</span>
                    </div>
                  </div>

                  {/* Metric */}
                  <div style={{
                    background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: 16, padding: "24px", textAlign: "center",
                  }}>
                    <div style={{ fontFamily: "Syne, sans-serif", fontSize: 40, fontWeight: 800, color: "#f4f4f8", letterSpacing: "-0.03em", marginBottom: 4 }}>
                      {s.metric}
                    </div>
                    <div style={{ fontSize: 13, color: "#8888a0" }}>{s.metricLabel}</div>
                  </div>

                  {/* Next step hint */}
                  {activeStep < STEPS.length - 1 && (
                    <button onClick={() => setActiveStep(activeStep + 1)} style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      padding: "12px", borderRadius: 12,
                      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                      color: "#8888a0", fontSize: 13, cursor: "pointer", fontFamily: "inherit",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.color = "#f4f4f8"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; (e.currentTarget as HTMLElement).style.color = "#8888a0"; }}
                    >
                      Next: {STEPS[activeStep + 1].title} <ArrowDown size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (max-width: 768px) {
          .pipeline-panel { grid-template-columns: 1fr !important; }
          .pipeline-desktop > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .pipeline-desktop > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
