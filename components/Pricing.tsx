"use client";
import { Check, Star } from "lucide-react";
import { useLanguage, formatPrice } from "@/lib/i18n";

const PLAN_META = [
  { name: "AI Chatbot",             price: 699,  originalPrice: 999,  color: "#a855f7", popular: false },
  { name: "Leadgen System",         price: 1099, originalPrice: 1599, color: "#22d3ee", popular: false },
  { name: "AI Voice Agent",         price: 1599, originalPrice: 2199, color: "#f472b6", popular: true  },
  { name: "Custom AI Integrations", price: 1500, originalPrice: 2199, color: "#facc15", popular: false, priceCustom: true },
];

export default function Pricing() {
  const { t, lang } = useLanguage();

  const PLANS = PLAN_META.map((meta, i) => ({
    ...meta,
    ...t.pricing.plans[i],
  }));

  return (
    <section id="pricing" style={{ background: "#080812", padding: "100px 24px" }}>
      <div className="wrap">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="tag" style={{ display: "inline-flex", marginBottom: 16 }}>{t.pricing.tag}</div>
          <h2 className="text-[22px] sm:text-4xl lg:text-[52px]" style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800, color: "#f4f4f8", letterSpacing: "-0.03em", marginBottom: 14, lineHeight: 1.1,
          }}>
            {t.pricing.headline1}{" "}
            <span style={{ background: "linear-gradient(135deg,#a855f7,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {t.pricing.headline2}
            </span>
          </h2>
          <p style={{ fontSize: 16, color: "#8888a0", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
            {t.pricing.subtext}
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18, alignItems: "stretch" }}>
          {PLANS.map((plan) => (
            <div key={plan.name} style={{
              position: "relative",
              background: plan.popular ? `linear-gradient(145deg, rgba(168,85,247,0.10), rgba(34,211,238,0.04))` : "rgba(15,15,20,0.8)",
              border: `1px solid ${plan.popular ? "rgba(168,85,247,0.4)" : "rgba(255,255,255,0.06)"}`,
              borderRadius: 22, padding: 28, transition: "all 0.4s ease",
              display: "flex", flexDirection: "column",
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
              {plan.popular && (
                <div style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  padding: "4px 16px", borderRadius: 999,
                  background: "linear-gradient(135deg,#a855f7,#7c3aed)",
                  fontSize: 11, fontWeight: 700, color: "white",
                  display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap",
                  boxShadow: "0 4px 20px rgba(168,85,247,0.4)",
                }}>
                  <Star size={10} fill="currentColor" /> {t.pricing.popular}
                </div>
              )}

              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: plan.color, boxShadow: `0 0 8px ${plan.color}` }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: plan.color }}>{plan.name}</span>
                </div>
                {plan.priceCustom ? (
                  <div style={{ marginBottom: 8 }}>
                    <span style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 700, color: plan.color }}>{t.pricing.priceCustom}</span>
                  </div>
                ) : (
                  <>
                    <div style={{ fontSize: 12, color: "#8888a0", textDecoration: "line-through", marginBottom: 2 }}>
                      {formatPrice(plan.originalPrice, lang)}
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8, flexWrap: "nowrap", overflow: "hidden" }}>
                      <span style={{ fontFamily: "Syne, sans-serif", fontSize: 28, fontWeight: 800, color: "#f4f4f8", letterSpacing: "-0.03em", whiteSpace: "nowrap", minWidth: 0, flexShrink: 1 }}>
                        {formatPrice(plan.price, lang)}
                      </span>
                      <span style={{ fontSize: 13, color: "#8888a0", whiteSpace: "nowrap", flexShrink: 0 }}>/{t.pricing.period}</span>
                    </div>
                  </>
                )}
                <p style={{ fontSize: 13, color: "#8888a0", lineHeight: 1.6, margin: 0 }}>{plan.desc}</p>
              </div>

              <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 20 }} />

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 10, flexGrow: 1 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "#c4c4d0" }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", flexShrink: 0, background: plan.color + "20", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                      <Check size={10} color={plan.color} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <a href="#booking" style={{
                display: "block", textAlign: "center", padding: "13px",
                borderRadius: 12, fontWeight: 600, fontSize: 14,
                textDecoration: "none", transition: "all 0.3s ease", marginTop: "auto",
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
              onMouseEnter={e => { if (!plan.popular) (e.target as HTMLElement).style.background = plan.color + "20"; }}
              onMouseLeave={e => { if (!plan.popular) (e.target as HTMLElement).style.background = plan.color + "10"; }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "#8888a0" }}>
            {t.pricing.bottomNote}
            <a href="#contact" style={{ color: "#a855f7", textDecoration: "none" }}>{t.pricing.customBundles}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
