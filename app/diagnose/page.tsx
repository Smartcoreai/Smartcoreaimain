"use client";
import "../landing.css";
import { useState, useMemo, useEffect, useRef } from "react";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";
import ChatWidget from "@/components/ChatWidget";
import { track } from "@/lib/track";

const fmtKr = (n: number) =>
  "kr " + Math.round(n).toLocaleString("nb-NO").replace(/[,  ]/g, " ");
const fmtRoi = (n: number) => `${(Math.round(n * 10) / 10).toFixed(1)}x`;

// Pricing tiers — both are MONTHLY costs. Annual cost = ×12 in the ROI denominator.
const PILOT_PRIS_MND = 10_000;
const STANDARD_PRIS_MND = 11_000;
const PILOT_PRIS_AAR = PILOT_PRIS_MND * 12;       // 120 000
const STANDARD_PRIS_AAR = STANDARD_PRIS_MND * 12; // 132 000

const CALENDLY_URL = "https://calendly.com/smartcoreaimeeting/new-meeting";
const SESSION_KEY = "diagnose_unlocked";

export default function DiagnosePage() {
  const [callsPerDay, setCallsPerDay] = useState<string>("50");
  const [missedPct, setMissedPct] = useState(30);
  const [patientBase, setPatientBase] = useState<string>("3000");
  const [noShowPct, setNoShowPct] = useState(12);
  const [bookingValue, setBookingValue] = useState<string>("2500");

  const [revealed, setRevealed] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const [name, setName] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const summaryRef = useRef<HTMLDivElement | null>(null);

  // Restore unlocked state across slider changes within the same session so
  // the user doesn't have to re-submit their email after tweaking inputs.
  useEffect(() => {
    track("diagnose_started");
    try {
      if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "true") {
        setUnlocked(true);
        setRevealed(true);
      }
    } catch { /* sessionStorage unavailable (e.g. privacy mode) */ }
  }, []);

  // Per-month source values feed the totals; per-year totals are × 12.
  const result = useMemo(() => {
    const ad = Math.max(0, parseFloat(callsPerDay) || 0);
    const pb = Math.max(0, parseFloat(patientBase) || 0);
    const sp = Math.max(0, parseFloat(bookingValue) || 0);
    const mu = missedPct / 100;
    const ns = noShowPct / 100;

    const callsPerMonth = ad * 22;
    const ubesvarteM    = callsPerMonth * mu * 0.55 * 0.40 * 0.70 * sp;
    const reaktiveringM = pb * 0.35 * 0.20 / 18 * sp;
    const noShowsM      = callsPerMonth * 0.7 * ns * 0.4 * sp;
    const hasActivity   = ad > 0 || pb > 0;
    const webleadsBase  = hasActivity ? Math.max(2, pb * 0.008) : 0;
    const webleadsM     = webleadsBase * 0.5 * sp;
    const totalM        = ubesvarteM + reaktiveringM + noShowsM + webleadsM;
    const totalAnnual   = totalM * 12;

    return {
      ubesvarte:    ubesvarteM * 12,
      reaktivering: reaktiveringM * 12,
      noShowsVerdi: noShowsM * 12,
      webleads:     webleadsM * 12,
      total:        totalAnnual,
      pilotRoi:     totalAnnual / PILOT_PRIS_AAR,
      standardRoi:  totalAnnual / STANDARD_PRIS_AAR,
    };
  }, [callsPerDay, missedPct, patientBase, noShowPct, bookingValue]);

  const missedFill = ((missedPct - 10) / 40) * 100;
  const noShowFill = ((noShowPct - 3) / 27) * 100;

  function runDiagnose() {
    if (revealed) return;
    setRevealed(true);
    track("diagnose_inputs_completed", {
      calls_per_day: parseFloat(callsPerDay) || 0,
      missed_pct: missedPct,
      patient_base: parseFloat(patientBase) || 0,
      no_show_pct: noShowPct,
      booking_value: parseFloat(bookingValue) || 0,
    });
    track("diagnose_summary_shown", { total_annual: Math.round(result.total) });
    requestAnimationFrame(() => {
      summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || undefined,
          clinicName: clinicName.trim() || undefined,
          inputs: {
            callsPerDay:  parseFloat(callsPerDay) || 0,
            missedPct,
            patientBase:  parseFloat(patientBase) || 0,
            noShowPct,
            bookingValue: parseFloat(bookingValue) || 0,
          },
          meta: {
            userAgent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : undefined,
            referrer:  typeof document !== "undefined" ? document.referrer.slice(0, 500) : undefined,
          },
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "Noe gikk galt");
      }
      setUnlocked(true);
      try { sessionStorage.setItem(SESSION_KEY, "true"); } catch { /* noop */ }
      track("diagnose_email_submitted", { total_annual: Math.round(result.total) });
      track("diagnose_full_report_shown", { total_annual: Math.round(result.total) });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Noe gikk galt. Prøv igjen.");
    } finally {
      setSubmitting(false);
    }
  }

  const titleClinic = clinicName.trim() ? clinicName.trim() : "klinikken din";

  return (
    <div className="lp-root calc-page">
      <LandingNavbar />
      <main className="calc-main">
        <div className="calc-container">
          <div className="calc-topbar">
            <a href="/" className="calc-back">← Tilbake</a>
          </div>

          <header className="calc-hero">
            <h1 className="calc-h1">Hvor mye omsetning lekker klinikken din?</h1>
            <p className="calc-sub">
              Svar på 5 spørsmål om driften deres. Få tallet på hva ubesvarte anrop, sovende pasienter, no-shows og webleads utenom åpningstid faktisk koster dere i året.
            </p>
          </header>

          <div className="calc-layout">
            {/* COL 1: Inputs */}
            <div className="calc-col calc-col-input">
              <div className="calc-panel calc-panel-fill">
                <div className="calc-panel-label">Klinikkens situasjon</div>

                <div className="calc-field">
                  <div className="calc-field-head">
                    <label className="calc-field-label">Innkommende anrop per dag</label>
                  </div>
                  <div className="calc-input-wrap">
                    <input
                      type="number" min={0} max={500}
                      className="calc-input"
                      value={callsPerDay}
                      onChange={(e) => setCallsPerDay(e.target.value)}
                      onFocus={(e) => e.target.select()}
                    />
                  </div>
                </div>

                <div className="calc-field">
                  <div className="calc-field-head">
                    <label className="calc-field-label">Andel anrop som ikke besvares</label>
                    <span className="calc-field-value">{missedPct}%</span>
                  </div>
                  <input
                    type="range" min={10} max={50} step={1}
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
                      type="number" min={0} max={50000}
                      className="calc-input"
                      value={patientBase}
                      onChange={(e) => setPatientBase(e.target.value)}
                      onFocus={(e) => e.target.select()}
                    />
                  </div>
                </div>

                <div className="calc-field">
                  <div className="calc-field-head">
                    <label className="calc-field-label">No-show-rate i dag</label>
                    <span className="calc-field-value">{noShowPct}%</span>
                  </div>
                  <input
                    type="range" min={3} max={30} step={1}
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

                <div className="calc-field">
                  <div className="calc-field-head">
                    <label className="calc-field-label">Snittpris per booking</label>
                  </div>
                  <div className="calc-input-wrap">
                    <span className="calc-prefix">kr</span>
                    <input
                      type="number" min={0} max={100000}
                      className="calc-input with-prefix"
                      value={bookingValue}
                      onChange={(e) => setBookingValue(e.target.value)}
                      onFocus={(e) => e.target.select()}
                    />
                  </div>
                </div>

                {!revealed && (
                  <button type="button" className="calc-run" onClick={runDiagnose}>
                    Kjør diagnosen →
                  </button>
                )}
              </div>
            </div>

            {/* COL 2: Result + gate/CTA */}
            <div
              className="calc-col calc-col-result"
              data-locked={revealed && !unlocked ? "true" : "false"}
              ref={summaryRef}
            >
              {!revealed ? (
                <div className="calc-panel calc-teaser calc-panel-fill">
                  <div className="calc-panel-label">Klar når du er</div>
                  <p className="calc-teaser-text">
                    Vi regner ut ubesvarte anrop, sovende pasienter, no-shows og webleads utenom åpningstid, og legger sammen til ett årstall. Trykk «Kjør diagnosen» når du er klar.
                  </p>
                </div>
              ) : (
                <>
                  <div className="calc-panel cream">
                    <div className="calc-panel-label">Total verdi generert per år</div>
                    <div className="calc-total-value">{fmtKr(result.total)}</div>
                    <div className="calc-total-sub">
                      Diagnose for {titleClinic}. Sum av de fire lekkasjekildene.
                    </div>
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
                    <div className="calc-panel-label">Avkastning på Ekspedenten</div>
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

                  {!unlocked ? (
                    <form className="calc-panel calc-gate" onSubmit={submitEmail}>
                      <div className="calc-gate-title">Få den fulle diagnosen</div>
                      <p className="calc-gate-body">
                        Detaljert rapport med fordeling, hvilken kilde har størst potensial, og hva som kreves for å tette hullet. Sendes på e-post.
                      </p>
                      <div className="calc-gate-row">
                        <input
                          type="text" className="calc-gate-input"
                          placeholder="Navn (valgfritt)"
                          value={name} onChange={(e) => setName(e.target.value)}
                          maxLength={100} autoComplete="name"
                        />
                      </div>
                      <div className="calc-gate-row">
                        <input
                          type="text" className="calc-gate-input"
                          placeholder="Klinikknavn (valgfritt)"
                          value={clinicName} onChange={(e) => setClinicName(e.target.value)}
                          maxLength={200} autoComplete="organization"
                        />
                      </div>
                      <div className="calc-gate-row">
                        <input
                          type="email" className="calc-gate-input"
                          placeholder="E-post*"
                          value={email} onChange={(e) => setEmail(e.target.value)}
                          required maxLength={254} autoComplete="email"
                        />
                      </div>
                      <button type="submit" className="calc-gate-submit" disabled={submitting || !email}>
                        {submitting ? "Sender..." : "Send meg diagnosen"}
                      </button>
                      {submitError && <p className="calc-gate-error">{submitError}</p>}
                      <p className="calc-gate-micro">Vi sender én e-post. Ingen nyhetsbrev-spam.</p>
                    </form>
                  ) : (
                    <>
                      <a
                        href={CALENDLY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="calc-cta"
                      >
                        Book en gratis samtale →
                      </a>
                      <p className="calc-disclaimer">
                        * Estimater basert på bransjedata. Faktiske resultater varierer.
                      </p>
                    </>
                  )}
                </>
              )}
            </div>

            {/* COL 3: Explanation (always visible, fixed example values) */}
            <div className="calc-col calc-col-explanation">
              <div className="calc-panel calc-explanation calc-panel-fill">
                <div className="calc-panel-label">Hvordan vi regner</div>

                <div className="calc-expl-section">
                  <h4>1. Ubesvarte anrop reddet</h4>
                  <div className="calc-formula">
                    20 anrop/dag × <span className="calc-hl">22 dager</span> = 440 anrop/mnd<br />
                    × <span className="calc-hl">38%</span> ubesvart = 167<br />
                    × <span className="calc-hl">55%</span> ringer ikke tilbake = 92<br />
                    × <span className="calc-hl">40%</span> reelle = 37<br />
                    × <span className="calc-hl">70%</span> bookingrate = 26 reddede<br />
                    × <span className="calc-hl">3 000 kr</span> = <span className="calc-hl">78 000 kr/mnd</span><br />
                    × 12 = <span className="calc-hl">~936 000 kr/år</span>
                  </div>
                  <p className="calc-expl-text">
                    Pasienter som ringer og ikke får svar booker hos den klinikken som svarer først. Ekspedenten tar telefonen 24/7.
                  </p>
                </div>

                <div className="calc-expl-divider" />

                <div className="calc-expl-section">
                  <h4>2. Reaktivering av sovende pasienter</h4>
                  <div className="calc-formula">
                    2 000 pasienter × <span className="calc-hl">35%</span> sovende = 700<br />
                    × <span className="calc-hl">20%</span> reaktiverbare = 140<br />
                    ÷ <span className="calc-hl">18 mnd</span> horisont = ~8/mnd<br />
                    × <span className="calc-hl">3 000 kr</span> = <span className="calc-hl">24 000 kr/mnd</span><br />
                    × 12 = <span className="calc-hl">~288 000 kr/år</span>
                  </div>
                  <p className="calc-expl-text">
                    Sovende pasienter (18+ mnd) hentes tilbake med målrettede SMS-innkallinger.
                  </p>
                </div>

                <div className="calc-expl-divider" />

                <div className="calc-expl-section">
                  <h4>3. Reduserte no-shows</h4>
                  <div className="calc-formula">
                    440 anrop/mnd × <span className="calc-hl">70%</span> bookingrate = 308 pasienter/mnd<br />
                    × <span className="calc-hl">10%</span> no-show = ~31 baseline<br />
                    × <span className="calc-hl">40%</span> reduksjon = ~12 reddede stoltimer/mnd<br />
                    × <span className="calc-hl">3 000 kr</span> = <span className="calc-hl">37 000 kr/mnd</span><br />
                    × 12 = <span className="calc-hl">~444 000 kr/år</span>
                  </div>
                  <p className="calc-expl-text">
                    SMS-innkalling og bekreftelsesflyt reduserer no-shows med 38–40%. <em>Imperial College London, 2025</em>
                  </p>
                </div>

                <div className="calc-expl-divider" />

                <div className="calc-expl-section">
                  <h4>4. Webleads utenom åpningstid</h4>
                  <div className="calc-formula">
                    2 000 pasienter × <span className="calc-hl">0,8%</span> = 16 webleads/mnd<br />
                    × <span className="calc-hl">50%</span> reddes med Ekspedenten = 8 ekstra bookinger<br />
                    × <span className="calc-hl">3 000 kr</span> = <span className="calc-hl">24 000 kr/mnd</span><br />
                    × 12 = <span className="calc-hl">288 000 kr/år</span>
                  </div>
                  <p className="calc-expl-text">
                    60% av webhenvendelser utenom åpningstid har booket et annet sted før klinikken rekker å svare. <em>TrueLark, 2025. 8 mill. samtaler</em>
                  </p>
                </div>

                <div className="calc-expl-divider" />

                <div className="calc-expl-section">
                  <h4>5. Customer Lifetime Value</h4>
                  <p className="calc-expl-text">
                    En typisk norsk tannpasient genererer 15 000–25 000 kr over 5 år. 20% av reddede bookinger er nye pasienter, så CLV-effekten kommer i tillegg til månedstallene over.
                  </p>
                </div>

                <div className="calc-expl-divider" />

                <p className="calc-expl-note">
                  Eksempel-klinikk for å vise utregningen. Dine faktiske tall sendes på e-post når du trykker «Send meg diagnosen».
                </p>
              </div>
            </div>
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

        .calc-main { padding: 32px 24px 80px; }
        .calc-container { max-width: 1280px; margin: 0 auto; }

        .calc-topbar {
          display: flex; justify-content: flex-start; align-items: center;
          margin-bottom: 24px; padding: 0 8px;
        }
        .calc-back {
          color: var(--calc-ink-secondary); text-decoration: none;
          font-size: 14px; font-weight: 500; transition: color 0.2s;
        }
        .calc-back:hover { color: var(--calc-ink); }

        .calc-hero { padding: 8px 8px 28px; max-width: 720px; }
        .calc-h1 {
          font-size: clamp(28px, 4vw, 38px);
          font-weight: 800; letter-spacing: -0.035em;
          line-height: 1.08; color: var(--calc-ink);
          margin: 0 0 12px;
        }
        .calc-sub {
          font-size: 15px; color: var(--calc-ink-secondary);
          line-height: 1.6; margin: 0;
        }

        /* Three-column grid with stretched columns */
        .calc-layout {
          display: grid;
          grid-template-columns: 1fr 1.2fr 1fr;
          gap: 24px;
          align-items: stretch;
        }
        .calc-col {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .calc-panel-fill { height: 100%; }

        .calc-panel {
          background: var(--calc-bg-card); border-radius: 16px;
          padding: 24px 22px;
          box-shadow: 0 1px 3px rgba(26, 31, 58, 0.04);
        }
        .calc-panel.cream {
          background: var(--calc-bg-card-accent);
          border: 1px solid var(--calc-gold-soft);
        }
        .calc-panel.dark { background: var(--calc-bg-dark); color: white; }
        .calc-panel-label {
          font-size: 10px; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.12em; color: var(--calc-gold); margin-bottom: 16px;
        }
        .calc-panel.dark .calc-panel-label { color: var(--calc-gold-soft); }

        /* Blur lock — only the breakdown amounts (.calc-amount) are gated.
           Total leak number and the ROI multipliers are always visible: total
           is the headline shock value, ROI is the value prop. The user must
           submit email to see WHICH leak source is largest. */
        .calc-col-result[data-locked="true"] .calc-amount {
          filter: blur(8px);
          user-select: none;
          pointer-events: none;
          transition: filter 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .calc-col-result[data-locked="false"] .calc-amount {
          filter: blur(0);
          transition: filter 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .calc-teaser-text {
          font-size: 14px; color: var(--calc-ink-secondary);
          line-height: 1.6; margin: 0;
        }

        /* Inputs */
        .calc-field { margin-bottom: 20px; }
        .calc-field:last-of-type { margin-bottom: 0; }
        .calc-field-head {
          display: flex; justify-content: space-between; align-items: baseline;
          margin-bottom: 8px;
        }
        .calc-field-label {
          font-size: 13px; color: var(--calc-ink); font-weight: 500;
        }
        .calc-field-value {
          font-size: 13px; color: var(--calc-gold); font-weight: 700;
          font-feature-settings: "tnum" 1;
        }
        .calc-input-wrap { position: relative; }
        .calc-input {
          width: 100%; padding: 11px 14px;
          border: 1px solid var(--calc-border); border-radius: 8px;
          background: #fff; font-size: 14px; color: var(--calc-ink);
          font-weight: 500; font-family: inherit;
          transition: border-color 0.2s, box-shadow 0.2s;
          -moz-appearance: textfield;
          font-feature-settings: "tnum" 1;
        }
        .calc-input::-webkit-outer-spin-button,
        .calc-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        .calc-input:focus {
          outline: none; border-color: var(--calc-gold);
          box-shadow: 0 0 0 3px rgba(201, 162, 74, 0.12);
        }
        .calc-input.with-prefix { padding-left: 36px; }
        .calc-prefix {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          color: var(--calc-ink-tertiary); font-size: 13px; pointer-events: none;
        }

        .calc-slider {
          -webkit-appearance: none; appearance: none;
          width: 100%; height: 6px; border-radius: 3px;
          outline: none; cursor: pointer;
        }
        .calc-slider::-webkit-slider-thumb {
          -webkit-appearance: none; width: 18px; height: 18px;
          border-radius: 50%; background: var(--calc-gold);
          border: 2px solid white;
          box-shadow: 0 2px 5px rgba(201, 162, 74, 0.35);
          cursor: pointer;
        }
        .calc-slider::-moz-range-thumb {
          width: 18px; height: 18px; border-radius: 50%;
          background: var(--calc-gold); border: 2px solid white;
          box-shadow: 0 2px 5px rgba(201, 162, 74, 0.35);
          cursor: pointer;
        }
        .calc-slider-marks {
          display: flex; justify-content: space-between; margin-top: 6px;
          font-size: 11px; color: var(--calc-ink-tertiary);
        }

        .calc-run {
          width: 100%; margin-top: 20px;
          background: var(--calc-bg-dark); color: white;
          border: none; padding: 14px 20px; border-radius: 12px;
          font-size: 14px; font-weight: 600; font-family: inherit;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .calc-run:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(26, 31, 58, 0.2);
        }

        /* Result panels */
        .calc-total-value {
          font-family: var(--font-inter), -apple-system, system-ui, sans-serif;
          font-size: clamp(32px, 3.6vw, 40px); font-weight: 700;
          color: var(--calc-gold); letter-spacing: -0.03em; line-height: 1;
          margin-bottom: 8px;
          font-feature-settings: "tnum" 1;
        }
        .calc-total-sub {
          font-size: 12px; color: var(--calc-ink-secondary);
        }
        .calc-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 10px 0; border-bottom: 1px solid var(--calc-border);
          font-size: 13px; gap: 12px;
        }
        .calc-row:last-child { border-bottom: none; }
        .calc-amount {
          font-weight: 700; color: var(--calc-ink);
          font-feature-settings: "tnum" 1; letter-spacing: -0.01em;
          white-space: nowrap;
        }
        .calc-roi-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 12px; margin-top: 4px;
        }
        .calc-roi-cell { text-align: center; padding: 2px 0; }
        .calc-roi-label {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em;
          color: var(--calc-gold-soft); margin-bottom: 8px; font-weight: 600;
        }
        .calc-roi-value {
          font-family: var(--font-inter), -apple-system, system-ui, sans-serif;
          font-size: 32px; font-weight: 700; color: white;
          line-height: 1; letter-spacing: -0.04em;
          font-feature-settings: "tnum" 1;
        }

        /* Email gate */
        .calc-gate {
          background: var(--calc-bg-card-accent);
          border: 1px solid var(--calc-gold-soft);
        }
        .calc-gate-title {
          font-size: 18px; font-weight: 800; letter-spacing: -0.025em;
          color: var(--calc-ink); margin: 0 0 10px;
        }
        .calc-gate-body {
          font-size: 13px; color: var(--calc-ink-secondary);
          line-height: 1.55; margin: 0 0 16px;
        }
        .calc-gate-row { margin-bottom: 10px; }
        .calc-gate-input {
          width: 100%; padding: 11px 14px;
          border: 1px solid var(--calc-border); border-radius: 8px;
          background: #fff; font-size: 14px; color: var(--calc-ink);
          font-weight: 500; font-family: inherit;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .calc-gate-input:focus {
          outline: none; border-color: var(--calc-gold);
          box-shadow: 0 0 0 3px rgba(201, 162, 74, 0.12);
        }
        .calc-gate-submit {
          width: 100%; margin-top: 6px;
          background: var(--calc-bg-dark); color: white;
          border: none; padding: 13px 20px; border-radius: 10px;
          font-size: 14px; font-weight: 600; font-family: inherit;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
        }
        .calc-gate-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(26, 31, 58, 0.2);
        }
        .calc-gate-submit:disabled { opacity: 0.55; cursor: not-allowed; }
        .calc-gate-error {
          font-size: 12px; color: #b54a3a; margin: 8px 0 0;
        }
        .calc-gate-micro {
          font-size: 11px; color: var(--calc-ink-tertiary);
          font-style: italic; margin: 10px 0 0;
        }

        .calc-cta {
          background: var(--calc-bg-dark); color: white;
          border: none; padding: 14px 20px; border-radius: 12px;
          font-size: 14px; font-weight: 600; font-family: inherit;
          cursor: pointer; width: 100%; text-align: center;
          transition: transform 0.2s, box-shadow 0.2s;
          text-decoration: none; display: inline-block;
        }
        .calc-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(26, 31, 58, 0.2);
        }
        .calc-disclaimer {
          font-size: 11px; color: var(--calc-ink-tertiary);
          text-align: center; margin: 4px 0 0; font-style: italic;
        }

        /* Explanation panel */
        .calc-expl-section { margin-bottom: 18px; }
        .calc-expl-section:last-of-type { margin-bottom: 0; }
        .calc-expl-section h4 {
          font-size: 14px; font-weight: 700; margin: 0 0 10px;
          color: var(--calc-ink); letter-spacing: -0.01em;
        }
        .calc-formula {
          background: var(--calc-gold-bg);
          border: 1px solid var(--calc-gold-soft);
          border-radius: 8px; padding: 12px 14px;
          font-family: "SF Mono", "Menlo", "JetBrains Mono", monospace;
          font-size: 12px; line-height: 1.6; color: var(--calc-ink);
          margin-bottom: 10px;
          font-feature-settings: "tnum" 1;
        }
        .calc-formula .calc-hl { color: var(--calc-gold); font-weight: 700; }
        .calc-expl-text {
          font-size: 12px; color: var(--calc-ink-secondary);
          line-height: 1.55; margin: 0;
        }
        .calc-expl-text em {
          color: var(--calc-gold); font-style: normal; font-weight: 600;
        }
        .calc-expl-divider {
          height: 1px; background: var(--calc-border); margin: 16px 0;
        }
        .calc-expl-note {
          font-size: 11px; color: var(--calc-ink-tertiary);
          font-style: italic; line-height: 1.55; margin: 0;
        }

        /* Tablet: 2-col with explanation below */
        @media (max-width: 1100px) {
          .calc-layout {
            grid-template-columns: 1fr 1.2fr;
          }
          .calc-col-explanation { grid-column: 1 / -1; }
        }
        /* Mobile: full stack */
        @media (max-width: 768px) {
          .calc-layout { grid-template-columns: 1fr; }
          .calc-col-explanation { grid-column: auto; }
        }
        @media (max-width: 640px) {
          .calc-main { padding: 24px 16px 64px; }
          .calc-panel { padding: 20px 18px; }
          .calc-roi-value { font-size: 26px; }
          .calc-h1 { font-size: 26px; }
        }
      `}</style>
    </div>
  );
}
