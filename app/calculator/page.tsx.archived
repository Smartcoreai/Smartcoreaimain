"use client";
import "../landing.css";
import { useState, useMemo } from "react";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";
import ChatWidget from "@/components/ChatWidget";
import { DemoPopup } from "@/components/DemoPopup";

const fmtKr = (n: number) =>
  "kr " + Math.round(n).toLocaleString("nb-NO").replace(/[,  ]/g, " ");
const fmtNum = (n: number) =>
  Math.round(n).toLocaleString("nb-NO").replace(/[,  ]/g, " ");
const fmtRoi = (n: number) => `${(Math.round(n * 10) / 10).toFixed(1)}x`;

export default function CalculatorPage() {
  const [callsPerDay, setCallsPerDay] = useState<string>("50");
  const [missedPct, setMissedPct] = useState(30);
  const [patientBase, setPatientBase] = useState<string>("3000");
  const [noShowPct, setNoShowPct] = useState(12);
  const [bookingValue, setBookingValue] = useState<string>("2500");
  const [showExplanation, setShowExplanation] = useState(true);

  const result = useMemo(() => {
    const ad = Math.max(0, parseFloat(callsPerDay) || 0);
    const pb = Math.max(0, parseFloat(patientBase) || 0);
    const sp = Math.max(0, parseFloat(bookingValue) || 0);
    const mu = missedPct / 100;
    const ns = noShowPct / 100;

    const ubesvarte = ad * 30 * mu * 0.113 * sp;
    const reaktivering = pb * 0.00389 * sp;
    const noShowsVerdi = ns * pb * 0.022 * sp * 0.4;
    const webleads = 24 * 0.5 * sp;
    const total = ubesvarte + reaktivering + noShowsVerdi + webleads;

    return {
      ubesvarte,
      reaktivering,
      noShowsVerdi,
      webleads,
      total,
      pilotRoi: total / 10000,
      standardRoi: total / 25000,
      reddedeStoltimer: sp > 0 ? noShowsVerdi / sp : 0,
      snittpris: sp,
    };
  }, [callsPerDay, missedPct, patientBase, noShowPct, bookingValue]);

  const missedFill = ((missedPct - 10) / 40) * 100;
  const noShowFill = ((noShowPct - 3) / 27) * 100;

  return (
    <div className="lp-root calc-page">
      <LandingNavbar />
      <main className="calc-main">
        <div className="calc-container">
          <div className="calc-topbar">
            <a href="/" className="calc-back">← Tilbake</a>
            <button
              type="button"
              className="calc-toggle"
              onClick={() => setShowExplanation((v) => !v)}
              aria-pressed={showExplanation}
            >
              {showExplanation ? "× Skjul forklaring" : "+ Vis forklaring"}
            </button>
          </div>

          <div className={`calc-layout ${showExplanation ? "" : "no-explanation"}`}>
            {/* COL 1: Inputs */}
            <div className="calc-panel">
              <div className="calc-panel-label">Klinikkens situasjon</div>

              <div className="calc-field">
                <div className="calc-field-head">
                  <label className="calc-field-label">Innkommende anrop per dag</label>
                </div>
                <div className="calc-input-wrap">
                  <input
                    type="number"
                    min={0}
                    max={500}
                    className="calc-input"
                    value={callsPerDay}
                    onChange={(e) => setCallsPerDay(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    onBlur={(e) => { if (!e.target.value) setCallsPerDay("50"); }}
                  />
                </div>
              </div>

              <div className="calc-field">
                <div className="calc-field-head">
                  <label className="calc-field-label">Andel anrop som ikke besvares</label>
                  <span className="calc-field-value">{missedPct}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={50}
                  step={1}
                  className="calc-slider"
                  value={missedPct}
                  onChange={(e) => setMissedPct(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, var(--calc-gold) 0%, var(--calc-gold) ${missedFill}%, var(--calc-border) ${missedFill}%, var(--calc-border) 100%)`,
                  }}
                />
                <div className="calc-slider-marks">
                  <span>10%</span><span>30%</span><span>50%</span>
                </div>
              </div>

              <div className="calc-field">
                <div className="calc-field-head">
                  <label className="calc-field-label">Antall pasienter i basen</label>
                </div>
                <div className="calc-input-wrap">
                  <input
                    type="number"
                    min={0}
                    max={50000}
                    className="calc-input"
                    value={patientBase}
                    onChange={(e) => setPatientBase(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    onBlur={(e) => { if (!e.target.value) setPatientBase("3000"); }}
                  />
                </div>
              </div>

              <div className="calc-field">
                <div className="calc-field-head">
                  <label className="calc-field-label">No-show-rate i dag</label>
                  <span className="calc-field-value">{noShowPct}%</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={30}
                  step={1}
                  className="calc-slider"
                  value={noShowPct}
                  onChange={(e) => setNoShowPct(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, var(--calc-gold) 0%, var(--calc-gold) ${noShowFill}%, var(--calc-border) ${noShowFill}%, var(--calc-border) 100%)`,
                  }}
                />
                <div className="calc-slider-marks">
                  <span>3%</span><span>15%</span><span>30%</span>
                </div>
              </div>

              <div className="calc-field calc-field--last">
                <div className="calc-field-head">
                  <label className="calc-field-label">Snittpris per booking</label>
                </div>
                <div className="calc-input-wrap">
                  <span className="calc-prefix">kr</span>
                  <input
                    type="number"
                    min={0}
                    max={100000}
                    className="calc-input with-prefix"
                    value={bookingValue}
                    onChange={(e) => setBookingValue(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    onBlur={(e) => { if (!e.target.value) setBookingValue("2500"); }}
                  />
                </div>
              </div>
            </div>

            {/* COL 2: Results */}
            <div className="calc-center-col">
              <div className="calc-panel cream">
                <div className="calc-panel-label">Total verdi generert per måned</div>
                <div className="calc-total-value">{fmtKr(result.total)}</div>
                <div className="calc-total-sub">På tvers av alle fire funksjonene i Ekspedenten</div>
              </div>

              <div className="calc-panel">
                <div className="calc-panel-label">Verdi fordelt på funksjon</div>
                <div className="calc-row">
                  <span>Ubesvarte anrop reddet</span>
                  <span className="calc-amount">{fmtKr(result.ubesvarte)}</span>
                </div>
                <div className="calc-row">
                  <span>Reaktivering av sovende pasienter</span>
                  <span className="calc-amount">{fmtKr(result.reaktivering)}</span>
                </div>
                <div className="calc-row">
                  <span>Reduserte no-shows</span>
                  <span className="calc-amount">{fmtKr(result.noShowsVerdi)}</span>
                </div>
                <div className="calc-row">
                  <span>Webleads utenom åpningstid</span>
                  <span className="calc-amount">{fmtKr(result.webleads)}</span>
                </div>
              </div>

              <div className="calc-panel dark">
                <div className="calc-panel-label">Avkastning på investering</div>
                <div className="calc-roi-grid">
                  <div className="calc-roi-cell">
                    <div className="calc-roi-label">Pilotpris</div>
                    <div className="calc-roi-value">{fmtRoi(result.pilotRoi)}</div>
                  </div>
                  <div className="calc-roi-cell">
                    <div className="calc-roi-label">Standardpris</div>
                    <div className="calc-roi-value">{fmtRoi(result.standardRoi)}</div>
                  </div>
                </div>
              </div>

              <DemoPopup
                triggerText="Book en gratis samtale for å komme i gang →"
                className="calc-cta"
              />
              <p className="calc-disclaimer">* Estimater basert på bransjedata. Faktiske resultater varierer.</p>
            </div>

            {/* COL 3: Explanation */}
            {showExplanation && (
              <div className="calc-panel calc-explanation">
                <div className="calc-expl-section">
                  <h4>Reduserte no-shows</h4>
                  <div className="calc-formula">
                    Baseline no-show: <span className="calc-hl">{noShowPct}%</span><br />
                    Ekspedenten reduserer med <span className="calc-hl">40%</span><br />
                    = ~<span>{result.reddedeStoltimer.toFixed(1)}</span> reddede stoltimer/mnd<br />
                    × <span className="calc-hl">{fmtNum(result.snittpris)} kr</span><br />
                    = <span className="calc-hl">{fmtNum(result.noShowsVerdi)} kr</span>
                  </div>
                  <p className="calc-expl-text">
                    SMS-påminnelser + bekreftelsesflyt reduserer no-shows med 38–40%. <em>Imperial College London, 2025</em>
                  </p>
                </div>

                <div className="calc-expl-divider" />

                <div className="calc-expl-section">
                  <h4>Webleads utenom åpningstid</h4>
                  <div className="calc-formula">
                    ~<span className="calc-hl">24 webleads/mnd</span><br />
                    × <span className="calc-hl">50%</span> reddes med AI-respons<br />
                    = 12 ekstra bookinger<br />
                    × <span className="calc-hl">{fmtNum(result.snittpris)} kr</span><br />
                    = <span className="calc-hl">{fmtNum(result.webleads)} kr</span>
                  </div>
                  <p className="calc-expl-text">
                    60% av webhenvendelser utenom åpningstid har booket et annet sted før klinikken rekker å svare. <em>TrueLark, 2025. 8 mill. samtaler</em>
                  </p>
                </div>

                <div className="calc-expl-divider" />

                <div className="calc-expl-section">
                  <h4>Customer Lifetime Value</h4>
                  <p className="calc-expl-text">
                    En typisk norsk tannpasient genererer 15 000–25 000 kr over 5 år. 20% av reddede bookinger er nye pasienter, så CLV-effekten kommer i tillegg til månedstallene over.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <LandingFooter />
      <ChatWidget />

      <style jsx global>{`
        .calc-page {
          --calc-bg-page: #f5f3ee;
          --calc-bg-card: #ffffff;
          --calc-bg-card-accent: #fbf6ec;
          --calc-bg-dark: #1a1f3a;
          --calc-ink: #1a1f3a;
          --calc-ink-secondary: #5a5f73;
          --calc-ink-tertiary: #9a9ca6;
          --calc-gold: #c9a24a;
          --calc-gold-soft: #e8d5a1;
          --calc-gold-bg: #faf3e2;
          --calc-border: #e8e3d6;

          background: var(--calc-bg-page);
          color: var(--calc-ink);
        }
        .calc-page,
        .calc-page input,
        .calc-page button {
          font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
        }
        .calc-page * { box-sizing: border-box; }

        .calc-main {
          padding: 32px 24px 80px;
        }
        .calc-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        /* Top bar */
        .calc-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding: 0 8px;
          gap: 16px;
        }
        .calc-back {
          color: var(--calc-ink-secondary);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s;
        }
        .calc-back:hover { color: var(--calc-ink); }
        .calc-toggle {
          background: var(--calc-bg-card);
          color: var(--calc-gold);
          border: 1px solid var(--calc-border);
          padding: 10px 18px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .calc-toggle:hover {
          border-color: var(--calc-gold-soft);
          background: var(--calc-gold-bg);
        }

        /* Layout */
        .calc-layout {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 24px;
        }
        .calc-layout.no-explanation {
          grid-template-columns: 1fr 1fr;
        }

        /* Panels */
        .calc-panel {
          background: var(--calc-bg-card);
          border-radius: 16px;
          padding: 24px 22px;
          box-shadow: 0 1px 3px rgba(26, 31, 58, 0.04);
        }
        .calc-panel.cream {
          background: var(--calc-bg-card-accent);
          border: 1px solid var(--calc-gold-soft);
        }
        .calc-panel.dark {
          background: var(--calc-bg-dark);
          color: white;
        }
        .calc-panel-label {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--calc-gold);
          margin-bottom: 16px;
        }
        .calc-panel.dark .calc-panel-label {
          color: var(--calc-gold-soft);
        }

        /* Center column */
        .calc-center-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        /* Fields */
        .calc-field { margin-bottom: 20px; }
        .calc-field--last { margin-bottom: 0; }
        .calc-field-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 8px;
        }
        .calc-field-label {
          font-size: 13px;
          color: var(--calc-ink);
          font-weight: 500;
        }
        .calc-field-value {
          font-size: 13px;
          color: var(--calc-gold);
          font-weight: 700;
          font-feature-settings: "tnum" 1;
        }
        .calc-input-wrap { position: relative; }
        .calc-input {
          width: 100%;
          padding: 11px 14px;
          border: 1px solid var(--calc-border);
          border-radius: 8px;
          background: #ffffff;
          font-size: 14px;
          color: var(--calc-ink);
          font-weight: 500;
          font-family: inherit;
          transition: border-color 0.2s, box-shadow 0.2s;
          -moz-appearance: textfield;
          font-feature-settings: "tnum" 1;
        }
        .calc-input::-webkit-outer-spin-button,
        .calc-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        .calc-input:focus {
          outline: none;
          border-color: var(--calc-gold);
          box-shadow: 0 0 0 3px rgba(201, 162, 74, 0.12);
        }
        .calc-input.with-prefix { padding-left: 36px; }
        .calc-prefix {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--calc-ink-tertiary);
          font-size: 13px;
          pointer-events: none;
        }

        /* Slider */
        .calc-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          outline: none;
          cursor: pointer;
        }
        .calc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--calc-gold);
          border: 2px solid white;
          box-shadow: 0 2px 5px rgba(201, 162, 74, 0.35);
          cursor: pointer;
        }
        .calc-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--calc-gold);
          border: 2px solid white;
          box-shadow: 0 2px 5px rgba(201, 162, 74, 0.35);
          cursor: pointer;
        }
        .calc-slider-marks {
          display: flex;
          justify-content: space-between;
          margin-top: 6px;
          font-size: 11px;
          color: var(--calc-ink-tertiary);
        }

        /* Total / breakdown / ROI */
        .calc-total-value {
          font-family: var(--font-inter), -apple-system, system-ui, sans-serif;
          font-size: 40px;
          font-weight: 700;
          color: var(--calc-ink);
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 8px;
          font-feature-settings: "tnum" 1;
        }
        .calc-total-sub {
          font-size: 12px;
          color: var(--calc-ink-secondary);
        }

        .calc-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid var(--calc-border);
          font-size: 13px;
          gap: 12px;
        }
        .calc-row:last-child { border-bottom: none; }
        .calc-amount {
          font-weight: 700;
          color: var(--calc-ink);
          font-feature-settings: "tnum" 1;
          letter-spacing: -0.01em;
          white-space: nowrap;
        }

        .calc-roi-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 4px;
        }
        .calc-roi-cell {
          text-align: center;
          padding: 2px 0;
        }
        .calc-roi-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--calc-gold-soft);
          margin-bottom: 8px;
          font-weight: 600;
        }
        .calc-roi-value {
          font-family: var(--font-inter), -apple-system, system-ui, sans-serif;
          font-size: 32px;
          font-weight: 700;
          color: white;
          line-height: 1;
          letter-spacing: -0.04em;
          font-feature-settings: "tnum" 1;
        }

        /* CTA */
        .calc-cta {
          background: var(--calc-bg-dark);
          color: white;
          border: none;
          padding: 14px 20px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          width: 100%;
          text-align: center;
          transition: transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .calc-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(26, 31, 58, 0.2);
        }
        .calc-disclaimer {
          font-size: 11px;
          color: var(--calc-ink-tertiary);
          text-align: center;
          margin: 4px 0 0;
          font-style: italic;
        }

        /* Explanation */
        .calc-expl-section { margin-bottom: 20px; }
        .calc-expl-section:last-child { margin-bottom: 0; }
        .calc-expl-section h4 {
          font-size: 14px;
          font-weight: 700;
          margin: 0 0 10px;
          color: var(--calc-ink);
          letter-spacing: -0.01em;
        }
        .calc-formula {
          background: var(--calc-gold-bg);
          border: 1px solid var(--calc-gold-soft);
          border-radius: 8px;
          padding: 12px 14px;
          font-family: "SF Mono", "Menlo", "JetBrains Mono", monospace;
          font-size: 12px;
          line-height: 1.6;
          color: var(--calc-ink);
          margin-bottom: 10px;
          font-feature-settings: "tnum" 1;
        }
        .calc-formula .calc-hl {
          color: var(--calc-gold);
          font-weight: 700;
        }
        .calc-expl-text {
          font-size: 12px;
          color: var(--calc-ink-secondary);
          line-height: 1.55;
          margin: 0;
        }
        .calc-expl-text em {
          color: var(--calc-gold);
          font-style: normal;
          font-weight: 600;
        }
        .calc-expl-divider {
          height: 1px;
          background: var(--calc-border);
          margin: 18px 0;
        }

        /* Mobile / tablet */
        @media (max-width: 1024px) {
          .calc-layout,
          .calc-layout.no-explanation { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .calc-main { padding: 24px 16px 64px; }
          .calc-panel { padding: 20px 18px; }
          .calc-total-value { font-size: 32px; }
          .calc-roi-value { font-size: 26px; }
          .calc-toggle { padding: 8px 14px; font-size: 12px; }
        }
      `}</style>
    </div>
  );
}
