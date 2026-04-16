"use client";
import { Check, Star, MessageSquare, Phone, Zap, ArrowRight, Shield, DollarSign, Clock, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/i18n";

// ── Config ─────────────────────────────────────────────────────────────────────
// Change FOUNDING_SPOTS to update the number in the urgency bar
const FOUNDING_SPOTS = 5;

// Display order: Chatbot (i18n plans[0]), Receptionist (i18n plans[2]), Leadgen (i18n plans[1])
const PLAN_DATA = [
  { planIdx: 0, price: 4_710,  originalPrice: 8_240,  featured: false, Icon: MessageSquare },
  { planIdx: 2, price: 9_430,  originalPrice: 18_870, featured: true,  Icon: Phone },
  { planIdx: 1, price: 5_890,  originalPrice: 11_790, featured: false, Icon: Zap },
];

function nokStr(n: number): string {
  return "kr\u00A0" + n.toLocaleString("nb-NO").replace(/\u00A0/g, "\u202F");
}

export default function PricingPage() {
  const { t } = useLanguage();
  const p = t.pricingPage;

  const plans = PLAN_DATA.map((meta, displayIdx) => ({
    ...meta,
    name:    (p.planNames    as readonly string[])[displayIdx],
    tagline: (p.planTaglines as readonly string[])[displayIdx],
    desc:     (p.plans[meta.planIdx] as { desc: string; features: readonly string[] }).desc,
    features: (p.plans[meta.planIdx] as { desc: string; features: readonly string[] }).features,
  }));

  return (
    <>
      {/* ── Urgency bar ───────────────────────────────────────────────────── */}
      <div className="pricing-urgency-bar">
        <div className="pricing-urgency-shimmer" />
        <div style={{
          position: "relative", zIndex: 1,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
        }}>
          <div className="pricing-urgency-dot" />
          <span style={{ fontSize: 13, fontWeight: 500, color: "#e8d9a8", letterSpacing: "0.01em" }}>
            {p.urgencyBarPrefix}
            <strong style={{ color: "#f5d87e", fontWeight: 700 }}>{FOUNDING_SPOTS}</strong>
            {p.urgencyBarSuffix}
          </span>
        </div>
      </div>

      <Navbar />

      <main style={{ background: "#ffffff" }}>

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section style={{
          background: "#ffffff",
          padding: "100px 24px 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Radial glow */}
          <div style={{
            position: "absolute", top: "5%", left: "50%", transform: "translateX(-50%)",
            width: 640, height: 340, borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(184,144,46,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto" }}>

            <ScrollReveal>
              <div className="pricing-eyebrow">
                <span className="pricing-eyebrow-line" />
                {p.heroEyebrow}
                <span className="pricing-eyebrow-line pricing-eyebrow-line--right" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(40px, 6vw, 60px)",
                fontWeight: 700, lineHeight: 1.1,
                color: "#1a1a2e",
                margin: "22px 0 24px",
                letterSpacing: "-0.02em",
              }}>
                {p.heroHeadline1}
                <br />
                <span style={{ fontStyle: "italic", color: "#b8902e" }}>{p.heroHeadline2}</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p style={{
                fontSize: 17, color: "#5a5a6e", lineHeight: 1.75,
                maxWidth: 520, margin: "0 auto 32px",
              }}>
                {p.heroSubtitle}
              </p>
            </ScrollReveal>

            {/* Trust badge pill */}
            <ScrollReveal delay={300}>
              <div style={{
                display: "inline-flex", alignItems: "center",
                padding: "10px 22px", borderRadius: 999,
                background: "#fafaf8", border: "1px solid #e8e6dc",
                fontSize: 13, color: "#5a5a6e", fontWeight: 500,
                flexWrap: "wrap", justifyContent: "center", gap: 0,
              }}>
                {(p.trustItems as readonly string[]).map((item, i) => (
                  <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    {i > 0 && (
                      <span style={{
                        display: "inline-block",
                        width: 1, height: 14,
                        background: "#e8e6dc",
                        margin: "0 12px",
                      }} />
                    )}
                    <span style={{ color: "#b8902e", fontWeight: 700 }}>✓</span>
                    {"\u00A0"}{item}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Pricing grid ──────────────────────────────────────────────────── */}
        <section style={{ background: "#f7f6f1", padding: "64px 24px 96px" }}>
          <div className="wrap">
            <div className="pricing-grid">
              {plans.map((plan, i) => (
                <ScrollReveal key={plan.name} delay={i * 80} style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    className={plan.featured ? "pricing-card pricing-card--featured" : "pricing-card"}
                    style={{
                      position: "relative",
                      background: plan.featured ? "#1a1a2e" : "#ffffff",
                      border: `1px solid ${plan.featured ? "#b8902e" : "#e8e6dc"}`,
                      borderRadius: 24,
                      padding: "32px 28px",
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(-4px)";
                      el.style.boxShadow = "0 24px 60px rgba(26,26,46,0.15)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "none";
                    }}
                  >
                    {/* Featured badge */}
                    {plan.featured && (
                      <div style={{
                        position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                        display: "inline-flex", alignItems: "center", gap: 6,
                        padding: "5px 16px", borderRadius: 999,
                        background: "linear-gradient(135deg, #b8902e, #8a6d22)",
                        fontSize: 11, fontWeight: 700, color: "#ffffff",
                        letterSpacing: "0.08em", textTransform: "uppercase",
                        whiteSpace: "nowrap",
                        boxShadow: "0 4px 16px rgba(184,144,46,0.35)",
                      }}>
                        <Star size={10} fill="currentColor" />
                        {p.popular}
                      </div>
                    )}

                    {/* Plan icon */}
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%",
                      background: plan.featured ? "rgba(184,144,46,0.15)" : "#fdf9ed",
                      border: plan.featured ? "1px solid rgba(184,144,46,0.4)" : "1px solid #f5ebd0",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#b8902e", marginBottom: 16, flexShrink: 0,
                    }}>
                      <plan.Icon size={20} />
                    </div>

                    {/* Plan name */}
                    <div style={{
                      fontSize: 12, fontWeight: 700, color: "#b8902e",
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      marginBottom: 6,
                    }}>
                      {plan.name}
                    </div>

                    {/* Tagline — fixed height so all cards align */}
                    <div style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: 20, fontWeight: 700,
                      color: plan.featured ? "#f5f0e8" : "#1a1a2e",
                      marginBottom: 10, lineHeight: 1.25,
                      letterSpacing: "-0.01em",
                      minHeight: "2.6em",
                    }}>
                      {plan.tagline}
                    </div>

                    {/* Description — fixed height so prices align */}
                    <p style={{
                      fontSize: 13,
                      color: plan.featured ? "#a09888" : "#5a5a6e",
                      lineHeight: 1.65, margin: "0 0 18px",
                      minHeight: "4.2em",
                    }}>
                      {plan.desc}
                    </p>

                    {/* Price block */}
                    <div style={{
                      borderBottom: `1px solid ${plan.featured ? "rgba(255,255,255,0.08)" : "#e8e6dc"}`,
                      paddingBottom: 16, marginBottom: 16,
                    }}>
                      {/* Old price */}
                      <div style={{
                        fontSize: 13,
                        fontVariantNumeric: "tabular-nums",
                        textDecoration: "line-through",
                        textDecorationColor: "#b8902e",
                        color: plan.featured ? "#5a5248" : "#8a8a98",
                        marginBottom: 4,
                      }}>
                        {nokStr(plan.originalPrice)}
                      </div>

                      {/* Current price */}
                      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                        <span style={{
                          fontFamily: "'DM Sans', -apple-system, sans-serif",
                          fontSize: 38, fontWeight: 800,
                          background: "linear-gradient(135deg, #b8902e, #8a6d22)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          letterSpacing: "-0.03em",
                          fontVariantNumeric: "tabular-nums",
                          lineHeight: 1,
                        }}>
                          {nokStr(plan.price)}
                        </span>
                        <span style={{ fontSize: 13, color: plan.featured ? "#8a8070" : "#5a5a6e" }}>
                          /{p.period}
                        </span>
                      </div>

                      {/* Founding badge */}
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        padding: "3px 10px", borderRadius: 999,
                        background: "rgba(184,144,46,0.12)",
                        border: "1px solid rgba(184,144,46,0.25)",
                        fontSize: 10, fontWeight: 700,
                        color: "#b8902e", letterSpacing: "0.06em",
                        textTransform: "uppercase", marginBottom: 10,
                      }}>
                        <Star size={9} fill="currentColor" />
                        {p.foundingBadge}
                      </div>

                      {/* Setup fee */}
                      <div style={{
                        borderTop: `1px dashed ${plan.featured ? "rgba(255,255,255,0.10)" : "#e8e6dc"}`,
                        paddingTop: 10,
                        fontSize: 13,
                        color: plan.featured ? "#7a7060" : "#8a8a98",
                      }}>
                        {p.setupFee}
                      </div>
                    </div>

                    {/* Features */}
                    <ul style={{
                      listStyle: "none", padding: 0, margin: "0 0 20px",
                      display: "flex", flexDirection: "column", gap: 8,
                      flexGrow: 1,
                    }}>
                      {(plan.features as readonly string[]).map(f => (
                        <li key={f} style={{
                          display: "flex", alignItems: "flex-start", gap: 10,
                          fontSize: 14,
                          color: plan.featured ? "#c8c0b4" : "#5a5a6e",
                        }}>
                          <div style={{
                            width: 20, height: 20, borderRadius: "50%",
                            flexShrink: 0, marginTop: 1,
                            background: "rgba(184,144,46,0.12)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <Check size={11} color="#b8902e" />
                          </div>
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a
                      href="/about#booking"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        gap: 8, padding: "12px 20px", borderRadius: 12,
                        fontWeight: 600, fontSize: 14,
                        textDecoration: "none", transition: "all 0.2s ease",
                        marginTop: "auto",
                        ...(plan.featured ? {
                          background: "linear-gradient(135deg, #b8902e, #8a6d22)",
                          color: "#ffffff",
                          boxShadow: "0 4px 20px rgba(184,144,46,0.30)",
                        } : {
                          background: "#1a1a2e",
                          color: "#ffffff",
                        }),
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        if (plan.featured) {
                          el.style.background = "linear-gradient(135deg, #c9a03e, #9a7d32)";
                          el.style.boxShadow = "0 6px 28px rgba(184,144,46,0.40)";
                        } else {
                          el.style.background = "#2a2a4e";
                        }
                        el.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        if (plan.featured) {
                          el.style.background = "linear-gradient(135deg, #b8902e, #8a6d22)";
                          el.style.boxShadow = "0 4px 20px rgba(184,144,46,0.30)";
                        } else {
                          el.style.background = "#1a1a2e";
                        }
                        el.style.transform = "translateY(0)";
                      }}
                    >
                      {p.getStarted} <ArrowRight size={15} />
                    </a>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Bottom note */}
            <p style={{ marginTop: 40, textAlign: "center", fontSize: 13, color: "#8a8a98" }}>
              {p.bottomNote}
            </p>
          </div>
        </section>

        {/* ── 4. Guarantee bar ─────────────────────────────────────────────── */}
        <section style={{ background: "#ffffff", padding: "64px 24px" }}>
          <div className="wrap">
            <ScrollReveal>
              <div style={{
                background: "#f7f6f1",
                border: "1px solid #e8e6dc",
                borderRadius: 24,
                padding: "40px 40px",
              }}>
                <div className="pricing-guarantee-grid">
                  {(p.guarantee as { items: readonly { title: string; desc: string }[] }).items.map((item, i) => {
                    const Icon = [Shield, DollarSign, Clock, Lock][i];
                    return (
                      <div key={i} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: 12,
                          background: "#ffffff",
                          border: "1px solid #e8e6dc",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#b8902e", flexShrink: 0,
                        }}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a2e", marginBottom: 4 }}>
                            {item.title}
                          </div>
                          <div style={{ fontSize: 13, color: "#5a5a6e", lineHeight: 1.6 }}>
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── 5. Compare section ───────────────────────────────────────────── */}
        <section style={{ background: "#f7f6f1", padding: "96px 24px" }}>
          <div className="wrap">
            <ScrollReveal>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <div style={{
                  fontSize: 13, fontWeight: 700,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "#b8902e", marginBottom: 16,
                }}>
                  {(p.compare as { eyebrow: string }).eyebrow}
                </div>
                <h2 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(28px, 3.8vw, 42px)",
                  fontWeight: 700, color: "#1a1a2e",
                  margin: "0 0 14px", letterSpacing: "-0.02em",
                }}>
                  {(p.compare as { headline: string }).headline}
                </h2>
                <p style={{ fontSize: 16, color: "#5a5a6e", margin: 0 }}>
                  {(p.compare as { subtitle: string }).subtitle}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div style={{
                maxWidth: 860, margin: "0 auto",
                border: "1px solid #e8e6dc",
                borderRadius: 24, overflow: "hidden",
              }}>
                {/* Header row */}
                <div className="compare-row compare-row--header">
                  <div className="compare-cell compare-cell--area" style={{ fontWeight: 700, fontSize: 13, color: "#8a8a98", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {(p.compare as { colArea: string }).colArea}
                  </div>
                  <div className="compare-cell compare-cell--without" style={{ fontWeight: 700, fontSize: 13, color: "#8a8a98", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {(p.compare as { colWithout: string }).colWithout}
                  </div>
                  <div className="compare-cell compare-cell--with" style={{
                    background: "#1a1a2e",
                    fontWeight: 700, fontSize: 13,
                    color: "#b8902e", textTransform: "uppercase", letterSpacing: "0.06em",
                  }}>
                    {(p.compare as { colWith: string }).colWith}
                  </div>
                </div>

                {/* Data rows */}
                {(p.compare as { rows: readonly { area: string; without: string; with: string }[] }).rows.map((row, i) => (
                  <div
                    key={i}
                    className="compare-row"
                    style={{ background: i % 2 === 0 ? "#ffffff" : "#fafaf8" }}
                  >
                    <div className="compare-cell compare-cell--area" style={{ fontSize: 14, fontWeight: 500, color: "#1a1a2e" }}>
                      {row.area}
                    </div>
                    <div className="compare-cell compare-cell--without" style={{ fontSize: 14, color: "#8a8a98" }}>
                      {row.without}
                    </div>
                    <div className="compare-cell compare-cell--with" style={{
                      background: i % 2 === 0 ? "rgba(184,144,46,0.03)" : "rgba(184,144,46,0.05)",
                      fontSize: 14, fontWeight: 500, color: "#1a1a2e",
                    }}>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                      }}>
                        <span style={{
                          width: 18, height: 18, borderRadius: "50%",
                          background: "rgba(184,144,46,0.15)",
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                        }}>
                          <Check size={10} color="#b8902e" />
                        </span>
                        {row.with}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── 6. FAQ teaser ────────────────────────────────────────────────── */}
        <section style={{ background: "#ffffff", padding: "96px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            <ScrollReveal>
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(28px, 3.8vw, 38px)",
                fontWeight: 700, color: "#1a1a2e",
                margin: "0 0 16px", letterSpacing: "-0.02em",
              }}>
                {(p.faqTeaser as { headline: string }).headline}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p style={{ fontSize: 16, color: "#5a5a6e", lineHeight: 1.7, margin: "0 0 32px" }}>
                {(p.faqTeaser as { desc: string }).desc}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <a
                href="/faq"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "13px 28px", borderRadius: 12,
                  fontSize: 14, fontWeight: 600, color: "#b8902e",
                  background: "transparent",
                  border: "1px solid #b8902e",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#b8902e";
                  el.style.color = "#ffffff";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "transparent";
                  el.style.color = "#b8902e";
                }}
              >
                {(p.faqTeaser as { cta: string }).cta}
              </a>
            </ScrollReveal>
          </div>
        </section>

      </main>

      <Footer />
      <ChatWidget />

      <style>{`
        /* ── Urgency bar ── */
        .pricing-urgency-bar {
          position: relative;
          overflow: hidden;
          background: linear-gradient(90deg, #1a1a2e, #2a2a4a, #1a1a2e);
          border-bottom: 1px solid rgba(184,144,46,0.4);
          padding: 10px 24px;
          text-align: center;
        }
        .pricing-urgency-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(245,216,126,0.13) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: urgencyShimmer 4s ease-in-out infinite;
        }
        @keyframes urgencyShimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .pricing-urgency-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #b8902e;
          box-shadow: 0 0 0 0 rgba(184,144,46,0.6);
          animation: urgencyPulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes urgencyPulse {
          0%   { box-shadow: 0 0 0 0   rgba(184,144,46,0.6); }
          70%  { box-shadow: 0 0 0 8px rgba(184,144,46,0);   }
          100% { box-shadow: 0 0 0 0   rgba(184,144,46,0);   }
        }

        /* ── Hero eyebrow with lines ── */
        .pricing-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #b8902e;
        }
        .pricing-eyebrow-line {
          display: block;
          height: 1px;
          width: 40px;
          background: linear-gradient(90deg, transparent, #b8902e);
        }
        .pricing-eyebrow-line--right {
          background: linear-gradient(90deg, #b8902e, transparent);
        }

        /* ── Pricing grid ── */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1080px;
          margin: 0 auto;
          align-items: stretch;
        }
        .pricing-grid > .reveal {
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 968px) {
          .pricing-grid {
            grid-template-columns: 1fr !important;
            max-width: 480px !important;
          }
        }

        /* ── Guarantee grid ── */
        .pricing-guarantee-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }

        /* ── Compare table ── */
        .compare-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
        }
        .compare-row--header {
          background: #f7f6f1;
        }
        .compare-cell {
          padding: 16px 20px;
          border-bottom: 1px solid #e8e6dc;
        }
        .compare-cell--with {
          border-left: 2px solid rgba(184,144,46,0.35);
        }
        .compare-row:last-child .compare-cell {
          border-bottom: none;
        }

        @media (max-width: 768px) {
          .pricing-guarantee-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .compare-cell {
            padding: 12px 14px;
            font-size: 13px !important;
          }
          .compare-row--header .compare-cell {
            font-size: 11px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pricing-urgency-shimmer { animation: none; }
          .pricing-urgency-dot     { animation: none; }
        }
      `}</style>
    </>
  );
}
