"use client";
import { Check, Star, Zap } from "lucide-react";
import { useLanguage, formatPrice } from "@/lib/i18n";

const PLAN_META = [
  { name: "AI Chatbot",             price: 399,  originalPrice: 699,  color: "#D4AF37", accent: "#F5D87E", popular: false, icon: "💬" },
  { name: "Leadgen System",         price: 499,  originalPrice: 999,  color: "#F5D87E", accent: "#D4AF37", popular: false, icon: "🎯" },
  { name: "AI Receptionist",        price: 799,  originalPrice: 1599, color: "#D4AF37", accent: "#F5D87E", popular: true,  icon: "📞" },
  { name: "Custom AI Integrations", price: 1500, originalPrice: 2199, color: "#C9A84C", accent: "#D4AF37", popular: false, icon: "⚙️", priceCustom: true },
];

export default function Pricing() {
  const { t, lang } = useLanguage();

  const PLANS = PLAN_META.map((meta, i) => ({
    ...meta,
    ...t.pricing.plans[i],
    name: t.services.items[i].label,  // use translated label so NO shows "AI Resepsjonist"
  }));

  return (
    <section id="pricing" style={{ background: "#111009", padding: "110px 24px", position: "relative", overflow: "hidden" }}>

      {/* Subtle gold radial behind cards */}
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 900, height: 600, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(212,175,55,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="wrap">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="tag" style={{ display: "inline-flex", marginBottom: 20 }}>{t.pricing.tag}</div>
          <h2 className="text-[26px] sm:text-[42px] lg:text-[58px]" style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700, fontStyle: "normal",
            color: "#F5F0E8",
            letterSpacing: "-0.01em",
            marginBottom: 16,
            lineHeight: 1.1,
          }}>
            {t.pricing.headline1}{" "}
            <span style={{ background: "linear-gradient(135deg,#D4AF37,#F5D87E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {t.pricing.headline2}
            </span>
          </h2>
          <p style={{ fontSize: 16, color: "#8A8070", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
            {t.pricing.subtext}
          </p>
        </div>

        {/* Cards grid */}
        <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 20, alignItems: "stretch" }}>
          {PLANS.map((plan) => (
            <div key={plan.name} style={{
              position: "relative",
              borderRadius: 24,
              padding: plan.popular ? "36px 28px 28px" : "28px",
              display: "flex",
              flexDirection: "column",
              background: plan.popular
                ? "linear-gradient(160deg, rgba(26,20,6,1) 0%, rgba(18,14,4,1) 100%)"
                : "rgba(14,11,4,0.95)",
              border: plan.popular
                ? "1px solid rgba(212,175,55,0.55)"
                : "1px solid rgba(212,175,55,0.10)",
              boxShadow: plan.popular
                ? "0 0 0 4px rgba(212,175,55,0.07), 0 24px 80px rgba(212,175,55,0.12)"
                : "0 4px 30px rgba(0,0,0,0.4)",
              transition: "transform 0.35s ease, box-shadow 0.35s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
              (e.currentTarget as HTMLElement).style.boxShadow = plan.popular
                ? "0 0 0 4px rgba(212,175,55,0.12), 0 32px 100px rgba(212,175,55,0.18)"
                : `0 24px 70px rgba(212,175,55,0.10)`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = plan.popular
                ? "0 0 0 4px rgba(212,175,55,0.07), 0 24px 80px rgba(212,175,55,0.12)"
                : "0 4px 30px rgba(0,0,0,0.4)";
            }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div style={{
                  position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                  background: "linear-gradient(135deg,#D4AF37,#B8960C)",
                  color: "#0E0B04", fontSize: 11, fontWeight: 800,
                  padding: "5px 18px", borderRadius: 999,
                  display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap",
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  boxShadow: "0 4px 24px rgba(212,175,55,0.4)",
                }}>
                  <Star size={10} fill="currentColor" /> {t.pricing.popular}
                </div>
              )}

              {/* Icon + name row */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                  background: `${plan.color}18`,
                  border: `1px solid ${plan.color}35`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20,
                }}>
                  {plan.icon}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: plan.color, letterSpacing: "0.05em", textTransform: "uppercase" }}>{plan.name}</div>
                  <div style={{ fontSize: 11, color: "#5A5248", marginTop: 1 }}>{plan.desc}</div>
                </div>
              </div>

              {/* Price block — non-custom cards get minHeight so features align across cards */}
              {plan.priceCustom ? (
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 22, fontWeight: 700, color: plan.color, lineHeight: 1.3 }}>
                    {t.pricing.priceCustom}
                  </div>
                  <div style={{ fontSize: 11, color: "#5A5248", marginTop: 8 }}>
                    {t.pricing.setupFeeCustom}
                  </div>
                </div>
              ) : (
                <div style={{ marginBottom: 28, minHeight: 120, display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                  {/* Live price row */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4, flexWrap: "wrap" }}>
                    <span style={{
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontSize: "clamp(26px, 3.2vw, 38px)",
                      fontWeight: 800,
                      lineHeight: 1,
                      fontVariantNumeric: "tabular-nums",
                      background: `linear-gradient(135deg, ${plan.color} 0%, ${plan.accent} 60%, ${plan.color} 100%)`,
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      animation: "shimmer 4s linear infinite",
                    }}>
                      {formatPrice(plan.price, lang)}
                    </span>
                    <span style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 13, color: "#6A6050", fontWeight: 500, whiteSpace: "nowrap" }}>/{t.pricing.period}</span>
                  </div>
                  {/* Lanseringspris label */}
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 10, padding: "3px 10px", borderRadius: 999, background: `${plan.color}14`, border: `1px solid ${plan.color}28` }}>
                    <Zap size={10} color={plan.color} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: plan.color, letterSpacing: "0.06em", textTransform: "uppercase" }}>{t.pricing.foundingPrice}</span>
                  </div>
                  {/* Launch disclaimer */}
                  <div style={{ fontSize: 10, color: "#5A5248", marginTop: 6, lineHeight: 1.4 }}>
                    {lang === "no"
                      ? `Gjelder de første 5 kundene. Ordinær pris: ${formatPrice(plan.originalPrice, lang)}/${t.pricing.period}`
                      : `For the first 5 clients. Standard price: ${formatPrice(plan.originalPrice, lang)}/${t.pricing.period}`}
                  </div>
                  {/* Setup fee */}
                  <div style={{ fontSize: 11, color: "#5A5248", marginTop: 8 }}>
                    {t.pricing.setupFee}
                  </div>
                </div>
              )}

              {/* Divider */}
              <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${plan.color}30, transparent)`, marginBottom: 24 }} />

              {/* Features */}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 11, flexGrow: 1 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "#C8C0B0", lineHeight: 1.5 }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", flexShrink: 0, background: `${plan.color}1A`, border: `1px solid ${plan.color}35`, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                      <Check size={10} color={plan.color} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a href="/#booking" style={{
                display: "block", textAlign: "center", padding: "14px",
                borderRadius: 14, fontWeight: 700, fontSize: 14,
                textDecoration: "none", transition: "all 0.3s ease",
                letterSpacing: "0.03em",
                ...(plan.popular ? {
                  background: "linear-gradient(135deg,#D4AF37,#B8960C)",
                  color: "#0E0B04",
                  boxShadow: "0 6px 28px rgba(212,175,55,0.30)",
                } : {
                  background: `${plan.color}12`,
                  color: plan.color,
                  border: `1px solid ${plan.color}35`,
                }),
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                if (plan.popular) { el.style.boxShadow = "0 10px 40px rgba(212,175,55,0.45)"; el.style.transform = "translateY(-1px)"; }
                else { el.style.background = plan.color + "22"; }
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                if (plan.popular) { el.style.boxShadow = "0 6px 28px rgba(212,175,55,0.30)"; el.style.transform = ""; }
                else { el.style.background = plan.color + "12"; }
              }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 768px) {
            .pricing-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          }
        `}</style>

        <div style={{ marginTop: 52, textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "#6A6050" }}>
            {t.pricing.bottomNote}
            <a href="#contact" style={{ color: "#D4AF37", textDecoration: "none" }}>{t.pricing.customBundles}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
