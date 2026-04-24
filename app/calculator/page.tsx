"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/i18n";

const GOLD = "#c8a04a";
const NAVY = "#0a0a0a";
const CREAM = "#faf7f0";

function nokFmt(n: number): string {
  return "kr\u00A0" + Math.round(n).toLocaleString("nb-NO").replace(/\u00A0/g, "\u202F");
}
function numFmt(n: number): string {
  return Math.round(n).toLocaleString("nb-NO").replace(/\u00A0/g, "\u202F");
}

export default function CalculatorPage() {
  const { t } = useLanguage();
  const c = t.calculator;

  const [callsPerWeek,  setCallsPerWeek]  = useState<string>("200");
  const [missedPct,     setMissedPct]     = useState(38);
  const [customerValue, setCustomerValue] = useState<string>("1500");
  const [showBreakdown, setShowBreakdown] = useState(false);

  // ── Calculations ──────────────────────────────────────────────────────────────
  const calls   = Math.max(0, parseFloat(callsPerWeek)  || 0);
  const custVal = Math.max(0, parseFloat(customerValue) || 0);

  const tapteAnrop           = calls * (missedPct / 100);                  // per week
  const tapteNyePasienter    = tapteAnrop * 0.65;                          // per week
  const taptInntektPerMåned  = tapteNyePasienter * custVal * 4.33;
  const tapteNyePerMåned     = tapteNyePasienter * 4.33;                  // for LTV
  const ltvLow               = tapteNyePerMåned * 15_000;
  const ltvHigh              = tapteNyePerMåned * 25_000;

  return (
    <>
      <Navbar />
      <main style={{ background: "#ffffff", minHeight: "100vh" }}>

        {/* Hero — dark two-column */}
        <section style={{ background: NAVY, padding: "100px 24px 72px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>

            {/* Back link */}
            <a href="/" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 13, color: "rgba(250,247,240,0.4)", textDecoration: "none",
              marginBottom: 48, transition: "color 0.15s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GOLD; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(250,247,240,0.4)"; }}
            >
              {c.backLink}
            </a>

            {/* Two-column layout */}
            <div className="calc-hero-grid">

              {/* ── Left: hook text ── */}
              <div style={{ flex: "1.15" }}>
                <h2 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(28px, 3.6vw, 48px)",
                  fontWeight: 700, fontStyle: "normal",
                  lineHeight: 1.12, letterSpacing: "-0.02em",
                  color: CREAM, margin: "0 0 24px",
                }}>
                  {c.heroHook}
                </h2>
                <p style={{
                  fontSize: "clamp(15px, 1.6vw, 17px)",
                  color: "rgba(250,247,240,0.6)",
                  lineHeight: 1.7, margin: "0 0 36px",
                  maxWidth: 480,
                }}>
                  {c.heroParagraph}
                </p>
                <a
                  href="#calculator-inputs"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "14px 28px", borderRadius: 11,
                    background: GOLD, color: NAVY,
                    fontSize: 15, fontWeight: 700, textDecoration: "none",
                    transition: "opacity 0.18s ease",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                >
                  {c.heroCta}
                </a>
              </div>

              {/* ── Right: static stat boxes ── */}
              <div style={{
                flex: "0.85",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(200,160,74,0.18)",
                borderRadius: 12,
                padding: "32px 36px",
                display: "flex", flexDirection: "column",
              }}>
                {/* Box 1 — hours saved */}
                <div style={{ paddingBottom: 28 }}>
                  <div style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                    textTransform: "uppercase", color: "rgba(250,247,240,0.45)",
                    marginBottom: 10,
                  }}>
                    {c.heroBox1Label}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "clamp(32px, 4vw, 48px)",
                    fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1,
                    color: GOLD, marginBottom: 8,
                  }}>
                    {c.heroBox1Value}
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(250,247,240,0.45)" }}>
                    {c.heroBox1Sub}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 28 }} />

                {/* Box 2 — extra bookings */}
                <div>
                  <div style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                    textTransform: "uppercase", color: "rgba(250,247,240,0.45)",
                    marginBottom: 10,
                  }}>
                    {c.heroBox2Label}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "clamp(32px, 4vw, 48px)",
                    fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1,
                    color: GOLD, marginBottom: 8,
                  }}>
                    {c.heroBox2Value}
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(250,247,240,0.45)" }}>
                    {c.heroBox2Sub}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Calculator body */}
        <section id="calculator-inputs" style={{ background: "#f7f6f1", padding: "56px 24px 96px" }}>
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
                        type="number" min={0}
                        value={callsPerWeek}
                        onChange={e => setCallsPerWeek(e.target.value)}
                        onFocus={e => e.target.select()}
                        onBlur={e => { if (!e.target.value || e.target.value === "0") setCallsPerWeek("200"); }}
                        className="calc-input"
                        style={inputStyle}
                      />
                      <span style={inputSuffixStyle}>/ uke</span>
                    </div>
                  </div>

                  {/* Missed % slider */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                      <label style={labelStyle}>{c.labelMissed}</label>
                      <span style={{ fontSize: 22, fontWeight: 700, color: GOLD, fontFamily: "'DM Sans', -apple-system, sans-serif", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em", lineHeight: 1 }}>
                        {missedPct}%
                      </span>
                    </div>
                    <input
                      type="range" min={0} max={100} step={1}
                      value={missedPct}
                      onChange={e => setMissedPct(Number(e.target.value))}
                      className="calc-slider"
                      style={{
                        width: "100%",
                        background: `linear-gradient(to right, ${GOLD} 0%, ${GOLD} ${missedPct}%, #e8e6dc ${missedPct}%, #e8e6dc 100%)`,
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
                        type="number" min={0}
                        value={customerValue}
                        onChange={e => setCustomerValue(e.target.value)}
                        onFocus={e => e.target.select()}
                        onBlur={e => { if (!e.target.value || e.target.value === "0") setCustomerValue("1500"); }}
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
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Main result box */}
                <div style={{
                  background: CREAM,
                  border: `1px solid rgba(200,160,74,0.3)`,
                  borderRadius: 20, padding: "32px 28px",
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
                    {c.resultMainLabel}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', -apple-system, sans-serif",
                    fontSize: "clamp(36px, 5vw, 52px)",
                    fontWeight: 800, fontVariantNumeric: "tabular-nums",
                    letterSpacing: "-0.03em", lineHeight: 1.05,
                    color: NAVY, margin: "0 0 8px",
                  }}>
                    {nokFmt(taptInntektPerMåned)}
                  </div>
                  <div style={{ fontSize: 13, color: "#8a8a98" }}>{c.resultMainSub}</div>
                </div>

                {/* LTV box */}
                <div style={{
                  background: "#ffffff",
                  border: `1px solid rgba(200,160,74,0.18)`,
                  borderRadius: 20, padding: "28px",
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
                    {c.resultLtvLabel}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 13, color: "#8a8a98", minWidth: 110 }}>{c.resultLtvLowLabel}</span>
                      <span style={{
                        fontFamily: "'DM Sans', -apple-system, sans-serif",
                        fontSize: 24, fontWeight: 700, fontVariantNumeric: "tabular-nums",
                        letterSpacing: "-0.02em", color: NAVY,
                      }}>
                        {nokFmt(ltvLow)}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 13, color: "#8a8a98", minWidth: 110 }}>{c.resultLtvHighLabel}</span>
                      <span style={{
                        fontFamily: "'DM Sans', -apple-system, sans-serif",
                        fontSize: 24, fontWeight: 700, fontVariantNumeric: "tabular-nums",
                        letterSpacing: "-0.02em",
                        background: `linear-gradient(135deg, ${GOLD}, #d4af37)`,
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                      }}>
                        {nokFmt(ltvHigh)}
                      </span>
                    </div>
                  </div>
                  <div style={{
                    marginTop: 14, paddingTop: 14,
                    borderTop: "1px solid rgba(200,160,74,0.12)",
                    fontSize: 11, color: "#aaa", lineHeight: 1.55,
                  }}>
                    {c.resultLtvSub}
                  </div>
                </div>

                {/* Expandable breakdown */}
                <div style={{ padding: "0 4px" }}>
                  <button
                    onClick={() => setShowBreakdown(v => !v)}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      fontSize: 13, fontWeight: 600, color: GOLD,
                      fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                      padding: 0, display: "flex", alignItems: "center", gap: 6,
                      transition: "opacity 0.15s",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.75"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                  >
                    {c.breakdownTitle}
                    <span style={{
                      display: "inline-block",
                      transform: showBreakdown ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.22s ease",
                      fontSize: 10,
                    }}>▼</span>
                  </button>

                  {showBreakdown && (
                    <div style={{
                      marginTop: 14, fontSize: 13, color: "#5a5a6e",
                      lineHeight: 1.75, background: "#f7f6f1",
                      border: "1px solid #e8e6dc", borderRadius: 12,
                      padding: "18px 20px",
                    }}>
                      <ol style={{ margin: 0, padding: "0 0 0 18px", display: "flex", flexDirection: "column", gap: 12 }}>
                        <li>
                          <strong style={{ color: "#1a1a2e" }}>
                            {c.breakdownLine1
                              .replace("{calls}", numFmt(calls))
                              .replace("{pct}", String(missedPct))
                              .replace("{missed}", numFmt(tapteAnrop))}
                          </strong>
                        </li>
                        <li>
                          <strong style={{ color: "#1a1a2e" }}>
                            {c.breakdownLine2
                              .replace("{missed}", numFmt(tapteAnrop))
                              .replace("{newPat}", numFmt(tapteNyePasienter))}
                          </strong>
                          <br />
                          <span style={{ fontSize: 12, color: "#8a8a98" }}>{c.breakdownLine2note}</span>
                        </li>
                        <li>
                          <strong style={{ color: "#1a1a2e" }}>
                            {c.breakdownLine3
                              .replace("{newPat}", numFmt(tapteNyePasienter))
                              .replace("{val}", nokFmt(custVal))
                              .replace("{monthly}", nokFmt(taptInntektPerMåned))}
                          </strong>
                        </li>
                        <li>
                          <strong style={{ color: "#1a1a2e" }}>
                            {c.breakdownLine4a
                              .replace("{monthly_new}", numFmt(tapteNyePerMåned))
                              .replace("{ltvLow}", nokFmt(ltvLow))}
                          </strong>
                          <br />
                          <strong style={{ color: "#1a1a2e" }}>
                            {c.breakdownLine4b
                              .replace("{monthly_new}", numFmt(tapteNyePerMåned))
                              .replace("{ltvHigh}", nokFmt(ltvHigh))}
                          </strong>
                          <br />
                          <span style={{ fontSize: 12, color: "#8a8a98" }}>{c.breakdownLine4note}</span>
                        </li>
                      </ol>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <a
                  href="https://calendly.com/smartcoreaimeeting/new-meeting"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: 8, padding: "16px 24px", borderRadius: 12,
                    background: NAVY, color: "#ffffff",
                    fontSize: 15, fontWeight: 600, textDecoration: "none",
                    transition: "background 0.2s, transform 0.2s",
                    boxShadow: "0 4px 20px rgba(10,10,10,0.15)",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "#1a1a2e";
                    el.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = NAVY;
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
        .calc-hero-grid {
          display: flex;
          gap: 56px;
          align-items: center;
        }
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
          border-color: #c8a04a;
          box-shadow: 0 0 0 3px rgba(200,160,74,0.12);
        }
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
          background: #c8a04a;
          border: 3px solid #ffffff;
          box-shadow: 0 1px 6px rgba(200,160,74,0.4);
          cursor: pointer;
        }
        .calc-slider::-moz-range-thumb {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #c8a04a;
          border: 3px solid #ffffff;
          box-shadow: 0 1px 6px rgba(200,160,74,0.4);
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .calc-hero-grid {
            flex-direction: column !important;
            gap: 32px !important;
          }
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
