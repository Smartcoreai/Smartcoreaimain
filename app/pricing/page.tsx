"use client";
import { Check, Star, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage, formatPrice } from "@/lib/i18n";

const PLAN_META = [
  { name: "AI Chatbot",             price: 399,  originalPrice: 699,  color: "#D4AF37", popular: false, priceCustom: false, href: "/#booking" },
  { name: "Leadgen System",         price: 499,  originalPrice: 999,  color: "#F5D87E", popular: true,  priceCustom: false, href: "/#booking" },
  { name: "AI Receptionist",        price: 799,  originalPrice: 1599, color: "#C9A84C", popular: false, priceCustom: false, href: "/#booking" },
  { name: "Custom AI Integrations", price: null, originalPrice: null, color: "#D4AF37", popular: false, priceCustom: true,  href: "/#booking" },
];

export default function PricingPage() {
  const { t, lang } = useLanguage();
  const p = t.pricingPage;

  const PLANS = PLAN_META.map((meta, i) => ({
    ...meta,
    ...p.plans[i],
  }));

  return (
    <div style={{ background: "#1A1A1A", minHeight: "100vh", color: "#F5F0E8" }}>
      <Navbar />

      <main style={{ paddingTop: 120, paddingBottom: 100, paddingLeft: 24, paddingRight: 24 }}>
        <div className="wrap">
          {/* Back button */}
          <a href="/" style={{ display: "inline-block", color: "#8A8070", fontSize: 14, textDecoration: "none", marginBottom: 40, transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#D4AF37")}
            onMouseLeave={e => (e.currentTarget.style.color = "#8A8070")}
          >
            {p.back}
          </a>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h1 style={{
              fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(32px, 6vw, 56px)",
              color: "#F5F0E8", letterSpacing: "-0.03em", marginBottom: 14, lineHeight: 1.1,
            }}>
              {p.title.split(" ").slice(0, -2).join(" ")}{" "}
              <span style={{ background: "linear-gradient(135deg,#D4AF37,#F5D87E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {p.title.split(" ").slice(-2).join(" ")}
              </span>
            </h1>
            <p style={{ fontSize: 16, color: "#8A8070", lineHeight: 1.7 }}>{p.subtitle}</p>
          </div>

          {/* Cards grid */}
          <div className="pricing-page-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18, alignItems: "stretch" }}>
            {PLANS.map((plan) => (
              <div key={plan.name} style={{
                position: "relative",
                background: plan.popular ? "linear-gradient(145deg, rgba(168,85,247,0.10), rgba(34,211,238,0.04))" : "rgba(15,15,20,0.8)",
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
                    background: "linear-gradient(135deg,#D4AF37,#B8960C)",
                    fontSize: 11, fontWeight: 700, color: "#1A1A1A",
                    display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap",
                    boxShadow: "0 4px 20px rgba(168,85,247,0.4)",
                  }}>
                    <Star size={10} fill="currentColor" /> {p.popular}
                  </div>
                )}

                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: plan.color, boxShadow: `0 0 8px ${plan.color}` }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: plan.color }}>{plan.name}</span>
                  </div>
                  {plan.priceCustom ? (
                    <div style={{ marginBottom: 8 }}>
                      <span style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 700, color: plan.color }}>{p.priceCustom}</span>
                      <div style={{ fontSize: 11, color: "#5A5248", marginTop: 6 }}>{p.setupFeeCustom}</div>
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: 12, color: "#8A8070", textDecoration: "line-through", marginBottom: 2, fontVariantNumeric: "tabular-nums" }}>
                        {formatPrice(plan.originalPrice!, lang)}
                      </div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
                        <span style={{ fontFamily: "Syne, sans-serif", fontSize: 32, fontWeight: 800, color: "#F5F0E8", letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>
                          {formatPrice(plan.price!, lang)}
                        </span>
                        <span style={{ fontSize: 13, color: "#8A8070" }}>/{p.period}</span>
                      </div>
                      {/* Founding price badge */}
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 5, marginBottom: 4, padding: "3px 10px", borderRadius: 999, background: `${plan.color}14`, border: `1px solid ${plan.color}28` }}>
                        <Zap size={10} color={plan.color} />
                        <span style={{ fontSize: 10, fontWeight: 700, color: plan.color, letterSpacing: "0.06em", textTransform: "uppercase" }}>{p.foundingPrice}</span>
                      </div>
                      {/* Setup fee */}
                      <div style={{ fontSize: 11, color: "#5A5248", marginTop: 4, marginBottom: 4 }}>{p.setupFee}</div>
                    </>
                  )}
                  <p style={{ fontSize: 13, color: "#8A8070", lineHeight: 1.6, margin: 0 }}>{plan.desc}</p>
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

                <a
                  href={plan.href}
                  target={plan.priceCustom ? "_blank" : "_self"}
                  rel={plan.priceCustom ? "noopener noreferrer" : undefined}
                  style={{
                    display: "block", textAlign: "center", padding: "13px",
                    borderRadius: 12, fontWeight: 600, fontSize: 14,
                    textDecoration: "none", transition: "all 0.3s ease", marginTop: "auto",
                    ...(plan.popular ? {
                      background: "linear-gradient(135deg,#D4AF37,#B8960C)",
                      color: "#1A1A1A",
                      boxShadow: "0 4px 20px rgba(212,175,55,0.25)",
                    } : {
                      background: `${plan.color}10`,
                      color: plan.color,
                      border: `1px solid ${plan.color}30`,
                    }),
                  }}
                  onMouseEnter={e => { if (!plan.popular) (e.currentTarget as HTMLElement).style.background = plan.color + "20"; }}
                  onMouseLeave={e => { if (!plan.popular) (e.currentTarget as HTMLElement).style.background = plan.color + "10"; }}
                >
                  {plan.priceCustom ? p.bookCall : p.getStarted}
                </a>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <p style={{ marginTop: 48, textAlign: "center", fontSize: 13, color: "#8A8070" }}>
            {p.bottomNote}
          </p>
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .pricing-page-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>

      <Footer />
    </div>
  );
}
