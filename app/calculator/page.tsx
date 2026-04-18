"use client";
import { useState } from "react";
import { TrendingUp, Calendar, DollarSign } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/i18n";

function nokFmt(n: number): string {
  return "kr\u00A0" + Math.round(n).toLocaleString("nb-NO").replace(/\u00A0/g, "\u202F");
}

function numFmt(n: number): string {
  return Math.round(n).toLocaleString("nb-NO").replace(/\u00A0/g, "\u202F");
}

export default function CalculatorPage() {
  const { t } = useLanguage();
  const c = t.calculator;

  const [callsPerWeek,  setCallsPerWeek]  = useState<string>("20");
  const [missedPct,     setMissedPct]     = useState(25);
  const [customerValue, setCustomerValue] = useState<string>("1500");

  // ── Calculations ──────────────────────────────────────────────────────────────
  const calls   = Math.max(0, parseFloat(callsPerWeek)  || 0);
  const custVal = Math.max(0, parseFloat(customerValue) || 0);

  const lostBookingsPerMonth  = calls * (missedPct / 100) * 4;
  const extraRevenuePerMonth  = lostBookingsPerMonth * custVal * 0.3;
  const annualSavings         = extraRevenuePerMonth * 12;

  const RESULT_ITEMS = [
    { icon: Calendar,   label: c.resultBookings, value: numFmt(lostBookingsPerMonth),  unit: c.resultBookingsUnit },
    { icon: TrendingUp, label: c.resultRevenue,  value: nokFmt(extraRevenuePerMonth),  unit: c.resultRevenueUnit },
  ];

  return (
    <>
      <Navbar />
      <main style={{ background: "#ffffff", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ background: "#ffffff", padding: "100px 24px 56px", textAlign: "center" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <ScrollReveal>
              <a href="/" style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 13, color: "#8a8a98", textDecoration: "none",
                marginBottom: 32,
                transition: "color 0.15s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#b8902e"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#8a8a98"; }}
              >
                {c.backLink}
              </a>
            </ScrollReveal>
            <ScrollReveal delay={60}>
              <h1 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 700, lineHeight: 1.1,
                color: "#1a1a2e", margin: "0 0 18px",
                letterSpacing: "-0.02em",
              }}>
                {c.title}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <p style={{ fontSize: 17, color: "#5a5a6e", lineHeight: 1.7, margin: 0 }}>
                {c.subtitle}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Calculator body */}
        <section style={{ background: "#f7f6f1", padding: "56px 24px 96px" }}>
          <div className="calc-grid wrap">

            {/* ── Left: inputs ─────────────────────────────────────────────── */}
            <ScrollReveal>
              <div style={{
                background: "#ffffff", border: "1px solid #e8e6dc",
                borderRadius: 24, padding: "40px 36px",
              }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

                  {/* Calls per week */}
                  <div>
                    <label style={labelStyle}>{c.labelCalls}</label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="number"
                        min={0}
                        value={callsPerWeek}
                        onChange={e => setCallsPerWeek(e.target.value)}
                        onFocus={e => e.target.select()}
                        onBlur={e => { if (e.target.value === "" || e.target.value === "0") setCallsPerWeek("20"); }}
                        className="calc-input"
                        style={inputStyle}
                      />
                      <span style={inputSuffixStyle}>/ uke</span>
                    </div>
                  </div>

                  {/* Missed % — slider */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                      <label style={labelStyle}>{c.labelMissed}</label>
                      <span style={{ fontSize: 22, fontWeight: 700, color: "#b8902e", fontFamily: "'DM Sans', -apple-system, sans-serif", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em", lineHeight: 1 }}>
                        {missedPct}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0} max={100} step={1}
                      value={missedPct}
                      onChange={e => setMissedPct(Number(e.target.value))}
                      className="calc-slider"
                      style={{
                        width: "100%",
                        background: `linear-gradient(to right, #b8902e 0%, #b8902e ${missedPct}%, #e8e6dc ${missedPct}%, #e8e6dc 100%)`,
                      }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 12, color: "#8a8a98" }}>
                      <span>0%</span><span>50%</span><span>100%</span>
                    </div>
                  </div>

                  {/* Customer value */}
                  <div>
                    <label style={labelStyle}>{c.labelValue}</label>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#8a8a98", pointerEvents: "none" }}>kr</span>
                      <input
                        type="number"
                        min={0}
                        value={customerValue}
                        onChange={e => setCustomerValue(e.target.value)}
                        onFocus={e => e.target.select()}
                        onBlur={e => { if (e.target.value === "" || e.target.value === "0") setCustomerValue("1500"); }}
                        className="calc-input"
                        style={{ ...inputStyle, paddingLeft: 36 }}
                      />
                    </div>
                  </div>

                </div>
              </div>
            </ScrollReveal>

            {/* ── Right: results ───────────────────────────────────────────── */}
            <ScrollReveal delay={100}>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                {/* Annual savings hero */}
                <div style={{
                  background: "#fdf9ed", border: "1px solid #f5ebd0",
                  borderRadius: 24, padding: "36px 32px", textAlign: "center",
                }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#b8902e", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 12 }}>
                    {c.resultsTitle}
                  </div>
                  <div style={{ fontSize: 16, color: "#5a5a6e", marginBottom: 8 }}>{c.resultHeading}</div>
                  <div style={{
                    fontFamily: "'DM Sans', -apple-system, sans-serif",
                    fontSize: "clamp(36px, 5vw, 52px)",
                    fontWeight: 800,
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "-0.03em",
                    background: "linear-gradient(135deg, #b8902e, #8a6d22)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1.1,
                    margin: "0 0 8px",
                  }}>
                    {nokFmt(annualSavings)}
                  </div>
                  <div style={{ fontSize: 15, color: "#8a8070" }}>{c.resultSuffix}</div>
                </div>

                {/* Breakdown cards */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {RESULT_ITEMS.map(({ icon: Icon, label, value, unit }) => (
                    <div key={label} style={{
                      background: "#ffffff", border: "1px solid #e8e6dc",
                      borderRadius: 16, padding: "18px 22px",
                      display: "flex", alignItems: "center", gap: 16,
                    }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 10,
                        background: "#fdf9ed", border: "1px solid #f5ebd0",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#b8902e", flexShrink: 0,
                      }}>
                        <Icon size={18} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, color: "#8a8a98", marginBottom: 2 }}>{label}</div>
                        <div style={{
                          fontFamily: "'DM Sans', -apple-system, sans-serif",
                          fontSize: 22, fontWeight: 700,
                          fontVariantNumeric: "tabular-nums",
                          letterSpacing: "-0.03em",
                          color: "#1a1a2e", lineHeight: 1,
                        }}>
                          {value}{" "}
                          <span style={{ fontSize: 13, fontFamily: "inherit", fontWeight: 400, color: "#8a8a98" }}>
                            {unit}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Total annual */}
                  <div style={{
                    background: "#1a1a2e", borderRadius: 16, padding: "18px 22px",
                    display: "flex", alignItems: "center", gap: 16,
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: "rgba(184,144,46,0.15)", border: "1px solid rgba(184,144,46,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#b8902e", flexShrink: 0,
                    }}>
                      <DollarSign size={18} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 2 }}>{c.resultTotal}</div>
                      <div style={{
                        fontFamily: "'DM Sans', -apple-system, sans-serif",
                        fontSize: 24, fontWeight: 800,
                        fontVariantNumeric: "tabular-nums",
                        letterSpacing: "-0.03em",
                        background: "linear-gradient(135deg, #b8902e, #f5d87e)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        lineHeight: 1,
                      }}>
                        {nokFmt(annualSavings)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="https://calendly.com/smartcoreaimeeting/new-meeting"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: 8, padding: "16px 24px", borderRadius: 12,
                    background: "#1a1a2e", color: "#ffffff",
                    fontSize: 15, fontWeight: 600, textDecoration: "none",
                    transition: "background 0.2s, transform 0.2s",
                    boxShadow: "0 4px 20px rgba(26,26,46,0.15)",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "#2a2a4e";
                    el.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "#1a1a2e";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  {c.cta}
                </a>

                <p style={{ textAlign: "center", fontSize: 12, color: "#8a8a98", margin: 0 }}>
                  * Estimater basert på bransjedata. Faktiske resultater varierer.
                </p>
              </div>
            </ScrollReveal>

          </div>
        </section>

      </main>
      <Footer />
      <ChatWidget />

      <style>{`
        .calc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          max-width: 1020px;
          margin: 0 auto;
          align-items: start;
        }
        .calc-input {
          width: 100%;
          background: #ffffff;
          border: 1px solid #e8e6dc;
          border-radius: 12px;
          padding: 12px 16px;
          color: #1a1a2e;
          font-size: 16px;
          font-weight: 500;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
          -moz-appearance: textfield;
        }
        .calc-input::-webkit-outer-spin-button,
        .calc-input::-webkit-inner-spin-button { -webkit-appearance: none; }
        .calc-input:focus {
          border-color: #b8902e;
          box-shadow: 0 0 0 3px rgba(184,144,46,0.12);
        }

        /* Gold slider */
        .calc-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 5px;
          border-radius: 999px;
          outline: none;
          cursor: pointer;
        }
        .calc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #b8902e;
          border: 3px solid #ffffff;
          box-shadow: 0 1px 6px rgba(184,144,46,0.4);
          cursor: pointer;
        }
        .calc-slider::-moz-range-thumb {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #b8902e;
          border: 3px solid #ffffff;
          box-shadow: 0 1px 6px rgba(184,144,46,0.4);
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .calc-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </>
  );
}

// ── Style constants ────────────────────────────────────────────────────────────
const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 14, fontWeight: 500,
  color: "#1a1a2e", marginBottom: 10,
  lineHeight: 1.4,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#ffffff",
  border: "1px solid #e8e6dc",
  borderRadius: 12,
  padding: "12px 16px",
  color: "#1a1a2e",
  fontSize: 16,
  fontWeight: 500,
  fontFamily: "inherit",
  outline: "none",
  boxSizing: "border-box",
};

const inputSuffixStyle: React.CSSProperties = {
  position: "absolute",
  right: 14, top: "50%",
  transform: "translateY(-50%)",
  fontSize: 13, color: "#8a8a98",
  pointerEvents: "none",
};
