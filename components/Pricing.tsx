"use client";
import { Check, Zap, Star } from "lucide-react";

const PLANS = [
  {
    name: "AI Chatbot",
    price: 399,
    period: "month",
    color: "#a855f7",
    desc: "Perfect for service businesses wanting to capture & qualify leads 24/7.",
    features: [
      "Custom-trained AI assistant",
      "Unlimited conversations",
      "Lead capture & qualification",
      "CRM / email integration",
      "Booking link integration",
      "Monthly performance report",
    ],
    cta: "Get started",
    popular: false,
  },
  {
    name: "Booking System",
    price: 499,
    period: "month",
    color: "#22d3ee",
    desc: "End back-and-forth scheduling. Your clients book instantly, automatically.",
    features: [
      "Online booking portal",
      "Calendar sync (Google/Outlook)",
      "Auto reminders via SMS & email",
      "Payment collection",
      "Cancellation handling",
      "No-show protection",
    ],
    cta: "Get started",
    popular: false,
  },
  {
    name: "CRM System",
    price: 899,
    period: "month",
    color: "#a855f7",
    desc: "A full CRM pipeline purpose-built for small teams that move fast.",
    features: [
      "Custom CRM dashboard",
      "AI lead scoring & routing",
      "Pipeline automation",
      "Revenue forecasting",
      "Team collaboration tools",
      "API access",
      "Priority support",
    ],
    cta: "Get the CRM",
    popular: true,
  },
  {
    name: "Custom AI",
    price: 1500,
    period: "month",
    color: "#facc15",
    desc: "We design a fully custom AI layer that plugs into every part of your business.",
    features: [
      "Custom AI workflow design",
      "Multi-tool API integrations",
      "Dedicated AI model training",
      "White-label option",
      "Dedicated account manager",
      "SLA guarantee",
      "Unlimited revisions",
    ],
    cta: "Book a strategy call",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" style={{ background: "#08080c", padding: "100px 24px" }}>
      <div className="wrap">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="tag" style={{ display: "inline-flex", marginBottom: 16 }}>Transparent pricing</div>
          <h2 style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(32px,4vw,52px)",
            fontWeight: 800, color: "#f4f4f8", letterSpacing: "-0.03em", marginBottom: 14, lineHeight: 1.1,
          }}>
            Simple, flat rates.{" "}
            <span style={{ background: "linear-gradient(135deg,#a855f7,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              No surprises.
            </span>
          </h2>
          <p style={{ fontSize: 16, color: "#8888a0", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
            No setup fees. No long-term contracts. Cancel anytime.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 18, alignItems: "start",
        }}>
          {PLANS.map((plan) => (
            <div key={plan.name} style={{
              position: "relative",
              background: plan.popular ? `linear-gradient(145deg, rgba(168,85,247,0.10), rgba(34,211,238,0.04))` : "rgba(15,15,20,0.8)",
              border: `1px solid ${plan.popular ? "rgba(168,85,247,0.4)" : "rgba(255,255,255,0.06)"}`,
              borderRadius: 22,
              padding: 28,
              transition: "all 0.4s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
              (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${plan.color}20`;
              (e.currentTarget as HTMLElement).style.borderColor = plan.color + "50";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
              (e.currentTarget as HTMLElement).style.borderColor = plan.popular ? "rgba(168,85,247,0.4)" : "rgba(255,255,255,0.06)";
            }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  padding: "4px 16px", borderRadius: 999,
                  background: "linear-gradient(135deg,#a855f7,#7c3aed)",
                  fontSize: 11, fontWeight: 700, color: "white",
                  display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap",
                  boxShadow: "0 4px 20px rgba(168,85,247,0.4)",
                }}>
                  <Star size={10} fill="currentColor" /> Most Popular
                </div>
              )}

              {/* Plan header */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: plan.color, boxShadow: `0 0 8px ${plan.color}` }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: plan.color }}>{plan.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontFamily: "Syne, sans-serif", fontSize: 42, fontWeight: 800, color: "#f4f4f8", letterSpacing: "-0.03em" }}>
                    ${plan.price.toLocaleString()}
                  </span>
                  <span style={{ fontSize: 13, color: "#8888a0" }}>/{plan.period}</span>
                </div>
                <p style={{ fontSize: 13, color: "#8888a0", lineHeight: 1.6, margin: 0 }}>{plan.desc}</p>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 20 }} />

              {/* Features */}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 10 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "#c4c4d0" }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                      background: plan.color + "20", display: "flex", alignItems: "center", justifyContent: "center",
                      marginTop: 1,
                    }}>
                      <Check size={10} color={plan.color} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a href="#booking" style={{
                display: "block", textAlign: "center", padding: "13px",
                borderRadius: 12, fontWeight: 600, fontSize: 14,
                textDecoration: "none", transition: "all 0.3s ease",
                ...(plan.popular ? {
                  background: "linear-gradient(135deg,#a855f7,#7c3aed)",
                  color: "white",
                  boxShadow: "0 4px 20px rgba(168,85,247,0.3)",
                } : {
                  background: `${plan.color}10`,
                  color: plan.color,
                  border: `1px solid ${plan.color}30`,
                }),
              }}
              onMouseEnter={e => {
                if (!plan.popular) {
                  (e.target as HTMLElement).style.background = plan.color + "20";
                }
              }}
              onMouseLeave={e => {
                if (!plan.popular) {
                  (e.target as HTMLElement).style.background = plan.color + "10";
                }
              }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div style={{ marginTop: 48, textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "#8888a0" }}>
            All plans include onboarding support · 14-day money-back guarantee ·{" "}
            <a href="#contact" style={{ color: "#a855f7", textDecoration: "none" }}>Custom bundles available</a>
          </p>
        </div>
      </div>
    </section>
  );
}
