"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ScrollReveal from "@/components/ScrollReveal";

const SERIF = "'Playfair Display', Georgia, serif";
const SANS = "var(--font-inter), -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif";
const NUM_FONT = "var(--font-dm-sans), -apple-system, sans-serif";

const nokFmt = (n: number) =>
  "kr " + Math.round(n).toLocaleString("nb-NO").replace(/ /g, " ");
const roiFmt = (n: number) => `${(Math.round(n * 10) / 10).toFixed(1)}x`;

export default function CalculatorPage() {
  const [callsPerDay, setCallsPerDay] = useState<string>("50");
  const [missedPct, setMissedPct] = useState(30);
  const [patientBase, setPatientBase] = useState<string>("3000");
  const [noShowPct, setNoShowPct] = useState(12);
  const [bookingValue, setBookingValue] = useState<string>("2500");
  const [showExplanation, setShowExplanation] = useState(false);

  const ad = Math.max(0, parseFloat(callsPerDay) || 0);
  const pb = Math.max(0, parseFloat(patientBase) || 0);
  const sp = Math.max(0, parseFloat(bookingValue) || 0);
  const mu = missedPct / 100;
  const ns = noShowPct / 100;

  const savedCalls = ad * 30 * mu * 0.5 * 0.225 * sp;
  const reactivation = pb * 0.005 * 0.7 * sp * 0.5;
  const reducedNoShows = ad * 30 * 0.225 * ns * 0.4 * sp;
  const webLeads = 24 * 0.5 * sp;
  const totalValue = savedCalls + reactivation + reducedNoShows + webLeads;

  const roiPilot = totalValue / 10000;
  const roiStandard = totalValue / 25000;

  return (
    <>
      <Navbar />
      <main className="calc-page">
        <section className="calc-section">
          <div className="calc-back-wrap">
            <a href="/" className="calc-back-link">← Tilbake</a>
          </div>

          <div className="calc-header">
            <h1 className="calc-title">Hva kan AI-resepsjonisten generere for din klinikk?</h1>
            <p className="calc-subtitle">
              Juster tallene som matcher din praksis. Estimatet oppdateres i sanntid.
            </p>
          </div>

          <div className="calc-pill-row">
            <button
              type="button"
              className="calc-pill"
              aria-pressed={showExplanation}
              onClick={() => setShowExplanation((v) => !v)}
            >
              {showExplanation ? "Skjul forklaring" : "Vis forklaring"}
            </button>
          </div>

          <div className={`calc-grid ${showExplanation ? "with-explanation" : ""}`}>
            {/* ── Left: inputs ───────────────────────────────────────────── */}
            <ScrollReveal>
              <div className="calc-card calc-inputs">
                <h2 className="calc-card-title">Din klinikk</h2>

                {/* Innkommende anrop per dag */}
                <div className="calc-field">
                  <label className="calc-label">Innkommende anrop per dag</label>
                  <div className="calc-input-wrap">
                    <input
                      type="number"
                      min={0}
                      value={callsPerDay}
                      onChange={(e) => setCallsPerDay(e.target.value)}
                      onFocus={(e) => e.target.select()}
                      onBlur={(e) => { if (!e.target.value || e.target.value === "0") setCallsPerDay("50"); }}
                      className="calc-input"
                    />
                    <span className="calc-input-suffix">/ dag</span>
                  </div>
                </div>

                {/* Andel anrop som ikke besvares */}
                <div className="calc-field">
                  <div className="calc-label-row">
                    <label className="calc-label">Andel anrop som ikke besvares</label>
                    <span className="calc-value-pill">{missedPct}%</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={50}
                    step={1}
                    value={missedPct}
                    onChange={(e) => setMissedPct(Number(e.target.value))}
                    className="calc-slider"
                    style={{
                      background: `linear-gradient(to right, var(--gold) 0%, var(--gold) ${((missedPct - 10) / 40) * 100}%, var(--border) ${((missedPct - 10) / 40) * 100}%, var(--border) 100%)`,
                    }}
                  />
                  <div className="calc-slider-ticks">
                    <span>10%</span>
                    <span>30%</span>
                    <span>50%</span>
                  </div>
                </div>

                {/* Antall pasienter i basen */}
                <div className="calc-field">
                  <label className="calc-label">Antall pasienter i basen</label>
                  <div className="calc-input-wrap">
                    <input
                      type="number"
                      min={0}
                      value={patientBase}
                      onChange={(e) => setPatientBase(e.target.value)}
                      onFocus={(e) => e.target.select()}
                      onBlur={(e) => { if (!e.target.value || e.target.value === "0") setPatientBase("3000"); }}
                      className="calc-input"
                    />
                    <span className="calc-input-suffix">pasienter</span>
                  </div>
                </div>

                {/* No-show-rate */}
                <div className="calc-field">
                  <div className="calc-label-row">
                    <label className="calc-label">No-show-rate i dag</label>
                    <span className="calc-value-pill">{noShowPct}%</span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={30}
                    step={1}
                    value={noShowPct}
                    onChange={(e) => setNoShowPct(Number(e.target.value))}
                    className="calc-slider"
                    style={{
                      background: `linear-gradient(to right, var(--gold) 0%, var(--gold) ${((noShowPct - 3) / 27) * 100}%, var(--border) ${((noShowPct - 3) / 27) * 100}%, var(--border) 100%)`,
                    }}
                  />
                  <div className="calc-slider-ticks">
                    <span>3%</span>
                    <span>15%</span>
                    <span>30%</span>
                  </div>
                </div>

                {/* Snittpris per booking */}
                <div className="calc-field">
                  <label className="calc-label">Snittpris per booking</label>
                  <div className="calc-input-wrap">
                    <span className="calc-input-prefix">kr</span>
                    <input
                      type="number"
                      min={0}
                      value={bookingValue}
                      onChange={(e) => setBookingValue(e.target.value)}
                      onFocus={(e) => e.target.select()}
                      onBlur={(e) => { if (!e.target.value || e.target.value === "0") setBookingValue("2500"); }}
                      className="calc-input calc-input--prefixed"
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* ── Mid: outputs ───────────────────────────────────────────── */}
            <ScrollReveal delay={100}>
              <div className="calc-results">
                {/* A — total value */}
                <div className="calc-total-card">
                  <div className="calc-eyebrow">Total verdi generert per måned</div>
                  <div className="calc-total-number">{nokFmt(totalValue)}</div>
                  <div className="calc-eyebrow-sub">Estimert merverdi med AI-resepsjonisten</div>
                </div>

                {/* B — breakdown */}
                <div className="calc-breakdown-card">
                  <div className="calc-card-title-sm">Verdi fordelt på funksjon</div>

                  <div className="calc-row">
                    <div className="calc-row-label">Ubesvarte anrop reddet</div>
                    <div className="calc-row-value">{nokFmt(savedCalls)}</div>
                  </div>
                  <div className="calc-row">
                    <div className="calc-row-label">Reaktivering av sovende pasienter</div>
                    <div className="calc-row-value">{nokFmt(reactivation)}</div>
                  </div>
                  <div className="calc-row">
                    <div className="calc-row-label">Reduserte no-shows</div>
                    <div className="calc-row-value">{nokFmt(reducedNoShows)}</div>
                  </div>
                  <div className="calc-row calc-row--last">
                    <div className="calc-row-label">Webleads utenom åpningstid</div>
                    <div className="calc-row-value">{nokFmt(webLeads)}</div>
                  </div>
                </div>

                {/* C — ROI */}
                <div className="calc-roi-card">
                  <div className="calc-eyebrow calc-eyebrow--gold">Avkastning på investering</div>
                  <div className="calc-roi-rows">
                    <div className="calc-roi-row">
                      <div className="calc-roi-label">
                        Pilotpris
                        <span className="calc-roi-sub">10 000 kr</span>
                      </div>
                      <div className="calc-roi-value">{roiFmt(roiPilot)}</div>
                    </div>
                    <div className="calc-roi-row">
                      <div className="calc-roi-label">
                        Standardpris
                        <span className="calc-roi-sub">25 000 kr</span>
                      </div>
                      <div className="calc-roi-value">{roiFmt(roiStandard)}</div>
                    </div>
                  </div>
                </div>

                {/* D — CTA */}
                <a
                  href="https://calendly.com/smartcoreaimeeting/new-meeting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="calc-cta"
                >
                  Book gratis samtale
                </a>

                {/* E — disclaimer */}
                <p className="calc-disclaimer">
                  * Estimater basert på bransjedata. Faktiske resultater varierer.
                </p>
              </div>
            </ScrollReveal>

            {/* ── Right: explanation panel ───────────────────────────────── */}
            <aside className="calc-explanation" aria-hidden={!showExplanation}>
              <div className="calc-explanation-inner">
                <div className="calc-card-title-sm">Hvor kommer tallene fra?</div>

                <div className="calc-expl-block">
                  <h4 className="calc-expl-h">Reduserte no-shows</h4>
                  <p className="calc-expl-formula">
                    anrop/dag × 30 × 22,5% booking-rate × no-show-rate × 40% reduksjon × snittpris
                  </p>
                  <p className="calc-expl-note">
                    AI-bekreftelser og påminnelser kutter typisk no-shows med 30–50%.
                  </p>
                  <p className="calc-expl-source">
                    Kilde: Imperial College London, 2025
                  </p>
                </div>

                <div className="calc-expl-block">
                  <h4 className="calc-expl-h">Webleads utenom åpningstid</h4>
                  <p className="calc-expl-formula">
                    ~24 webleads/mnd × 50% reddes med AI × snittpris
                  </p>
                  <p className="calc-expl-note">
                    Mer enn halvparten av tannlege-leads kommer etter stengetid og forsvinner uten 24/7-respons.
                  </p>
                  <p className="calc-expl-source">
                    Kilde: TrueLark, 2025
                  </p>
                </div>

                <div className="calc-expl-block">
                  <h4 className="calc-expl-h">Customer Lifetime Value</h4>
                  <p className="calc-expl-note">
                    En norsk pasient er typisk verdt mellom 15 000 og 25 000 kr over 5 år. Vi bruker bevisst en konservativ snittpris per booking i kalkulatoren — full LTV gir betydelig høyere tall.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />

      <style jsx global>{`
        .calc-page {
          --bg-page: #f5f3ee;
          --bg-card: #ffffff;
          --bg-card-accent: #fbf6ec;
          --ink-primary: #1a1f3a;
          --ink-secondary: #6b6f7d;
          --gold: #c9a24a;
          --gold-soft: #e8d5a1;
          --gold-bg: #faf3e2;
          --border: #e8e3d6;

          background: var(--bg-page);
          min-height: 100vh;
          font-family: ${SANS};
          color: var(--ink-primary);
        }

        .calc-section {
          padding: 48px 24px 96px;
          max-width: 1280px;
          margin: 0 auto;
        }

        .calc-back-wrap {
          margin-bottom: 28px;
        }
        .calc-back-link {
          font-size: 13px;
          color: var(--ink-secondary);
          text-decoration: none;
          transition: color 0.15s;
        }
        .calc-back-link:hover { color: var(--gold); }

        .calc-header {
          max-width: 720px;
          margin-bottom: 28px;
        }
        .calc-title {
          font-family: ${SERIF};
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 600;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--ink-primary);
          margin: 0 0 12px;
        }
        .calc-subtitle {
          font-size: 16px;
          color: var(--ink-secondary);
          line-height: 1.55;
          margin: 0;
        }

        .calc-pill-row {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 20px;
        }
        .calc-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 999px;
          background: var(--gold-bg);
          color: var(--ink-primary);
          border: 1px solid var(--gold-soft);
          font-family: ${SANS};
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
        }
        .calc-pill:hover {
          background: var(--gold-soft);
          transform: translateY(-1px);
        }
        .calc-pill[aria-pressed="true"] {
          background: var(--gold);
          color: #ffffff;
          border-color: var(--gold);
        }

        /* Grid: flex-based for smooth animation of explanation panel */
        .calc-grid {
          display: flex;
          gap: 24px;
          align-items: stretch;
        }
        .calc-grid > :nth-child(1) { flex: 0 0 340px; }
        .calc-grid > :nth-child(2) { flex: 1 1 0; min-width: 0; }
        .calc-explanation {
          flex: 0 0 0;
          width: 0;
          opacity: 0;
          overflow: hidden;
          transform: translateX(20px);
          pointer-events: none;
          transition:
            flex-basis 0.4s ease,
            width 0.4s ease,
            opacity 0.4s ease,
            transform 0.4s ease,
            margin 0.4s ease;
        }
        .calc-grid.with-explanation .calc-explanation {
          flex: 0 0 340px;
          width: 340px;
          opacity: 1;
          transform: translateX(0);
          pointer-events: auto;
        }

        /* Cards */
        .calc-card,
        .calc-breakdown-card,
        .calc-explanation-inner {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 28px;
        }
        .calc-inputs {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .calc-card-title {
          font-family: ${SERIF};
          font-size: 20px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--ink-primary);
          margin: 0 0 4px;
        }
        .calc-card-title-sm {
          font-size: 12px;
          font-weight: 700;
          color: var(--ink-secondary);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 16px;
        }

        /* Fields */
        .calc-field { display: flex; flex-direction: column; gap: 10px; }
        .calc-label {
          font-size: 14px;
          font-weight: 500;
          color: var(--ink-primary);
          line-height: 1.4;
        }
        .calc-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .calc-value-pill {
          font-family: ${NUM_FONT};
          font-size: 18px;
          font-weight: 700;
          color: var(--gold);
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.02em;
          line-height: 1;
        }

        .calc-input-wrap { position: relative; }
        .calc-input {
          width: 100%;
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 12px 14px;
          color: var(--ink-primary);
          font-size: 16px;
          font-weight: 500;
          font-family: ${SANS};
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s;
          -moz-appearance: textfield;
        }
        .calc-input::-webkit-outer-spin-button,
        .calc-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        .calc-input:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(201,162,74,0.14);
        }
        .calc-input--prefixed { padding-left: 36px; }
        .calc-input-prefix {
          position: absolute; left: 14px; top: 50%;
          transform: translateY(-50%);
          font-size: 14px; color: var(--ink-secondary);
          pointer-events: none;
        }
        .calc-input-suffix {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%);
          font-size: 13px; color: var(--ink-secondary);
          pointer-events: none;
        }

        /* Slider */
        .calc-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 999px;
          outline: none;
          cursor: pointer;
        }
        .calc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: var(--gold);
          border: 3px solid #ffffff;
          box-shadow: 0 1px 6px rgba(201,162,74,0.45);
          cursor: pointer;
        }
        .calc-slider::-moz-range-thumb {
          width: 22px; height: 22px;
          border-radius: 50%;
          background: var(--gold);
          border: 3px solid #ffffff;
          box-shadow: 0 1px 6px rgba(201,162,74,0.45);
          cursor: pointer;
        }
        .calc-slider-ticks {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: var(--ink-secondary);
          margin-top: 4px;
        }

        /* Results column */
        .calc-results {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .calc-eyebrow {
          font-size: 11px;
          font-weight: 700;
          color: var(--gold);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 10px;
        }
        .calc-eyebrow-sub {
          font-size: 13px;
          color: var(--ink-secondary);
        }
        .calc-eyebrow--gold {
          color: var(--gold-soft);
          margin-bottom: 14px;
        }

        .calc-total-card {
          background: var(--gold-bg);
          border: 1px solid var(--gold-soft);
          border-radius: 20px;
          padding: 32px 28px;
        }
        .calc-total-number {
          font-family: ${NUM_FONT};
          font-size: clamp(40px, 6vw, 56px);
          font-weight: 800;
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: var(--ink-primary);
          margin: 0 0 6px;
        }

        .calc-breakdown-card {
          padding: 24px 28px;
        }
        .calc-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 0;
          border-bottom: 1px solid var(--border);
          gap: 16px;
        }
        .calc-row--last { border-bottom: none; padding-bottom: 4px; }
        .calc-row-label {
          font-size: 14px;
          color: var(--ink-secondary);
          line-height: 1.4;
        }
        .calc-row-value {
          font-family: ${NUM_FONT};
          font-size: 17px;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.02em;
          color: var(--ink-primary);
          white-space: nowrap;
        }

        .calc-roi-card {
          background: var(--ink-primary);
          color: #ffffff;
          border-radius: 20px;
          padding: 24px 28px;
        }
        .calc-roi-rows {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .calc-roi-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }
        .calc-roi-label {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
        }
        .calc-roi-sub {
          font-size: 12px;
          color: rgba(255,255,255,0.55);
          font-weight: 400;
        }
        .calc-roi-value {
          font-family: ${NUM_FONT};
          font-size: 26px;
          font-weight: 800;
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.03em;
          color: var(--gold-soft);
        }

        .calc-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px 24px;
          border-radius: 12px;
          background: var(--ink-primary);
          color: #ffffff;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          width: 100%;
          box-sizing: border-box;
          box-shadow: 0 4px 20px rgba(10,10,10,0.15);
          transition: background 0.2s, transform 0.15s;
        }
        .calc-cta:hover { background: #2d2d4e; transform: translateY(-1px); }

        .calc-disclaimer {
          text-align: center;
          font-size: 12px;
          color: var(--ink-secondary);
          margin: 0;
        }

        /* Explanation panel */
        .calc-explanation-inner {
          padding: 24px 24px;
          height: 100%;
          box-sizing: border-box;
          background: var(--bg-card-accent);
        }
        .calc-expl-block {
          padding: 14px 0;
          border-bottom: 1px solid var(--border);
        }
        .calc-expl-block:last-child { border-bottom: none; padding-bottom: 0; }
        .calc-expl-block:first-of-type { padding-top: 0; }
        .calc-expl-h {
          font-family: ${SERIF};
          font-size: 16px;
          font-weight: 600;
          color: var(--ink-primary);
          margin: 0 0 8px;
        }
        .calc-expl-formula {
          font-family: ${NUM_FONT};
          font-size: 12px;
          font-weight: 500;
          color: var(--ink-primary);
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 8px 10px;
          margin: 0 0 8px;
          line-height: 1.45;
        }
        .calc-expl-note {
          font-size: 13px;
          color: var(--ink-secondary);
          line-height: 1.55;
          margin: 0 0 6px;
        }
        .calc-expl-source {
          font-size: 11px;
          color: var(--gold);
          font-weight: 600;
          letter-spacing: 0.02em;
          margin: 0;
        }

        /* Mobile */
        @media (max-width: 980px) {
          .calc-grid {
            flex-direction: column;
          }
          .calc-grid > :nth-child(1),
          .calc-grid > :nth-child(2) {
            flex: 1 1 auto;
          }
          .calc-explanation {
            flex: 1 1 auto;
            width: auto;
          }
          .calc-grid:not(.with-explanation) .calc-explanation {
            display: none;
          }
          .calc-grid.with-explanation .calc-explanation {
            width: auto;
          }
        }
        @media (max-width: 640px) {
          .calc-section { padding: 32px 16px 64px; }
          .calc-pill-row { display: none; }
          .calc-card,
          .calc-breakdown-card,
          .calc-roi-card,
          .calc-total-card,
          .calc-explanation-inner { padding: 22px 20px; }
        }
      `}</style>
    </>
  );
}
