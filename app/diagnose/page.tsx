"use client";
import "../landing.css";
import { useState, useMemo, useEffect, useRef } from "react";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";
import ChatWidget from "@/components/ChatWidget";
import { DemoPopup } from "@/components/DemoPopup";
import { track } from "@/lib/track";

const fmtKr = (n: number) =>
  "kr " + Math.round(n).toLocaleString("nb-NO").replace(/[,  ]/g, " ");
const fmtNum = (n: number) =>
  Math.round(n).toLocaleString("nb-NO").replace(/[,  ]/g, " ");
const fmtRoi = (n: number) => `${(Math.round(n * 10) / 10).toFixed(1)}x`;

// Pricing tiers used for ROI denominators. Pilot: pilot price (one-time).
// Standard: kr 11 000/mnd × 12 = 132 000 annual standard contract.
const PILOT_DENOM = 10_000;
const STANDARD_DENOM = 132_000;

export default function DiagnosePage() {
  const [callsPerDay, setCallsPerDay] = useState<string>("50");
  const [missedPct, setMissedPct] = useState(30);
  const [patientBase, setPatientBase] = useState<string>("3000");
  const [noShowPct, setNoShowPct] = useState(12);
  const [bookingValue, setBookingValue] = useState<string>("2500");
  const [showExplanation, setShowExplanation] = useState(false);

  const [revealed, setRevealed] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const [name, setName] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const summaryRef = useRef<HTMLDivElement | null>(null);
  const fullRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { track("diagnose_started"); }, []);

  // Per-month source values feed the totals AND the explanation panel.
  // Per-year totals are × 12 (the leak-framing surface).
  const result = useMemo(() => {
    const ad = Math.max(0, parseFloat(callsPerDay) || 0);
    const pb = Math.max(0, parseFloat(patientBase) || 0);
    const sp = Math.max(0, parseFloat(bookingValue) || 0);
    const mu = missedPct / 100;
    const ns = noShowPct / 100;

    // Derived intermediates (used in explanation panel)
    const callsPerMonth   = ad * 22;            // 22 working days/mo
    const missedCalls     = callsPerMonth * mu;
    const noCallback      = missedCalls * 0.55;  // ringer ikke tilbake
    const realRequests    = noCallback * 0.40;   // reelle forespørsler
    const recoveredBookings = realRequests * 0.70; // bookingrate

    const sleepingTotal     = pb * 0.35;             // 35% sovende (18+ mnd)
    const reactivatablePool = sleepingTotal * 0.20;  // 20% reaktiverbare
    const reactivationsM    = reactivatablePool / 18; // spread over 18 mnd

    const patientsBookedFromCalls = callsPerMonth * 0.7; // 70% booking rate
    const baselineNoShows = patientsBookedFromCalls * ns;
    const recoveredNoShows = baselineNoShows * 0.4;

    const webleadsBaseline = pb * 0.008;        // ~0.8% av pasientbase/mnd
    const recoveredWebleads = webleadsBaseline * 0.5;

    // Per-month value sources
    const ubesvarteM    = recoveredBookings * sp;
    const reaktiveringM = reactivationsM * sp;
    const noShowsM      = recoveredNoShows * sp;
    const webleadsM     = recoveredWebleads * sp;
    const totalM        = ubesvarteM + reaktiveringM + noShowsM + webleadsM;

    return {
      // intermediates for explanation panel
      callsPerMonth, missedCalls, noCallback, realRequests, recoveredBookings,
      sleepingTotal, reactivatablePool, reactivationsM,
      patientsBookedFromCalls, baselineNoShows, recoveredNoShows,
      webleadsBaseline, recoveredWebleads,
      // per-month
      ubesvarteM, reaktiveringM, noShowsM, webleadsM, totalM,
      // annual
      ubesvarte:    ubesvarteM * 12,
      reaktivering: reaktiveringM * 12,
      noShowsVerdi: noShowsM * 12,
      webleads:     webleadsM * 12,
      total:        totalM * 12,
      // ROI vs pricing tiers (annual / annual = dimensionless ratio)
      pilotRoi:     totalM * 12 / PILOT_DENOM,
      standardRoi:  totalM * 12 / STANDARD_DENOM,
      snittpris:    sp,
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
      track("diagnose_email_submitted", { total_annual: Math.round(result.total) });
      track("diagnose_full_report_shown", { total_annual: Math.round(result.total) });
      requestAnimationFrame(() => {
        fullRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
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
            <div className="calc-panel calc-col">
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

              <div className="calc-field calc-field--last">
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

            {/* COL 2: Results / Gate / Explanation */}
            <div className="calc-col calc-center-col" ref={summaryRef}>
              {!revealed && (
                <div className="calc-panel calc-teaser">
                  <div className="calc-panel-label">Klar når du er</div>
                  <p className="calc-teaser-text">
                    Vi regner ut ubesvarte anrop, sovende pasienter, no-shows og webleads utenom åpningstid, og legger sammen til ett årstall. Trykk «Kjør diagnosen» når du er klar.
                  </p>
                </div>
              )}

              {revealed && (
                <>
                  <div className="calc-panel cream">
                    <div className="calc-panel-label">Total lekkasje per år</div>
                    <div className="calc-total-value">{fmtKr(result.total)}</div>
                    <div className="calc-total-sub">
                      Diagnose for {titleClinic}. Sum av de fire lekkasjekildene.
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
                </>
              )}

              {revealed && !unlocked && (
                <form className="calc-panel calc-gate" onSubmit={submitEmail}>
                  <div className="calc-gate-title">Få den fulle diagnosen</div>
                  <p className="calc-gate-body">
                    Detaljert rapport med fordeling på de fire lekkasjekildene, hvilken som har størst potensial for klinikken din, og hva som kreves for å tette hullet. Sendes på epost.
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
                  <p className="calc-gate-micro">Vi sender én epost. Ingen nyhetsbrev-spam.</p>
                </form>
              )}

              {unlocked && (
                <>
                  <div className="calc-panel" ref={fullRef}>
                    <div className="calc-panel-label">Verdi fordelt på funksjon</div>
                    <div className="calc-row">
                      <span>Ubesvarte anrop</span>
                      <span className="calc-amount">{fmtKr(result.ubesvarte)}</span>
                    </div>
                    <div className="calc-row">
                      <span>Sovende pasienter (reaktivering)</span>
                      <span className="calc-amount">{fmtKr(result.reaktivering)}</span>
                    </div>
                    <div className="calc-row">
                      <span>No-shows</span>
                      <span className="calc-amount">{fmtKr(result.noShowsVerdi)}</span>
                    </div>
                    <div className="calc-row">
                      <span>Webleads utenom åpningstid</span>
                      <span className="calc-amount">{fmtKr(result.webleads)}</span>
                    </div>
                  </div>

                  <DemoPopup
                    triggerText="Book kartlegging for å tette hullet →"
                    className="calc-cta"
                  />
                  <p className="calc-disclaimer">
                    * Estimater basert på bransjedata. Faktiske resultater varierer.
                  </p>
                </>
              )}

              {/* Vis/Skjul forklaring toggle — only relevant once revealed */}
              {revealed && (
                <button
                  type="button"
                  className="calc-expl-toggle"
                  onClick={() => setShowExplanation((v) => !v)}
                  aria-pressed={showExplanation}
                >
                  {showExplanation ? "− Skjul forklaring" : "+ Vis forklaring"}
                </button>
              )}

              {revealed && showExplanation && (
                <div className="calc-panel calc-explanation">
                  <div className="calc-expl-section">
                    <h4>1. Ubesvarte anrop reddet</h4>
                    <div className="calc-formula">
                      {fmtNum(parseFloat(callsPerDay) || 0)} anrop/dag × <span className="calc-hl">22 dager</span> = {fmtNum(result.callsPerMonth)} anrop/mnd<br />
                      × <span className="calc-hl">{missedPct}%</span> ubesvart = {fmtNum(result.missedCalls)} ubesvart<br />
                      × <span className="calc-hl">55%</span> ringer ikke tilbake = {fmtNum(result.noCallback)}<br />
                      × <span className="calc-hl">40%</span> reelle forespørsler = {fmtNum(result.realRequests)}<br />
                      × <span className="calc-hl">70%</span> bookingrate = {fmtNum(result.recoveredBookings)} reddede<br />
                      × <span className="calc-hl">{fmtNum(result.snittpris)} kr</span> = <span className="calc-hl">{fmtKr(result.ubesvarteM)}/mnd</span>
                    </div>
                    <p className="calc-expl-text">
                      Pasienter som ringer og ikke får svar booker hos den klinikken som svarer først. Ekspedenten tar telefonen 24/7 og fanger opp kjøpsintensjonen før den forsvinner.
                    </p>
                  </div>

                  <div className="calc-expl-divider" />

                  <div className="calc-expl-section">
                    <h4>2. Reaktivering av sovende pasienter</h4>
                    <div className="calc-formula">
                      {fmtNum(parseFloat(patientBase) || 0)} pasienter × <span className="calc-hl">35%</span> sovende (18+ mnd) = {fmtNum(result.sleepingTotal)}<br />
                      × <span className="calc-hl">20%</span> reaktiverbare = {fmtNum(result.reactivatablePool)}<br />
                      ÷ <span className="calc-hl">18 mnd</span> horisont = {result.reactivationsM.toFixed(1)} per mnd<br />
                      × <span className="calc-hl">{fmtNum(result.snittpris)} kr</span> = <span className="calc-hl">{fmtKr(result.reaktiveringM)}/mnd</span>
                    </div>
                    <p className="calc-expl-text">
                      Sovende pasienter som ikke har vært inne på 18+ mnd hentes tilbake med målrettede SMS-innkallinger. Ekspedenten kjører dem i bakgrunnen.
                    </p>
                  </div>

                  <div className="calc-expl-divider" />

                  <div className="calc-expl-section">
                    <h4>3. Reduserte no-shows</h4>
                    <div className="calc-formula">
                      {fmtNum(result.callsPerMonth)} anrop/mnd × <span className="calc-hl">70%</span> bookingrate = {fmtNum(result.patientsBookedFromCalls)} pasienter/mnd<br />
                      × <span className="calc-hl">{noShowPct}%</span> no-show = {result.baselineNoShows.toFixed(1)} baseline<br />
                      × <span className="calc-hl">40%</span> reduksjon = {result.recoveredNoShows.toFixed(1)} reddede stoltimer/mnd<br />
                      × <span className="calc-hl">{fmtNum(result.snittpris)} kr</span> = <span className="calc-hl">{fmtKr(result.noShowsM)}/mnd</span>
                    </div>
                    <p className="calc-expl-text">
                      SMS-innkalling og bekreftelsesflyt reduserer no-shows med 38–40%. <em>Imperial College London, 2025</em>
                    </p>
                  </div>

                  <div className="calc-expl-divider" />

                  <div className="calc-expl-section">
                    <h4>4. Webleads utenom åpningstid</h4>
                    <div className="calc-formula">
                      {fmtNum(parseFloat(patientBase) || 0)} pasienter × <span className="calc-hl">0,8%</span> = {result.webleadsBaseline.toFixed(1)} webleads/mnd<br />
                      × <span className="calc-hl">50%</span> reddes med Ekspedenten = {result.recoveredWebleads.toFixed(1)} bookinger<br />
                      × <span className="calc-hl">{fmtNum(result.snittpris)} kr</span> = <span className="calc-hl">{fmtKr(result.webleadsM)}/mnd</span>
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
                </div>
              )}
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
        .calc-container { max-width: 1100px; margin: 0 auto; }

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

        /* Two-column grid with equal-height columns */
        .calc-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: stretch;
        }
        .calc-col { min-width: 0; }

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

        /* Right column. Stretches to row height; teaser sits at top via flex-start. */
        .calc-center-col {
          display: flex; flex-direction: column; gap: 14px;
          background: transparent; box-shadow: none; padding: 0;
          scroll-margin-top: 24px;
        }
        .calc-center-col > .calc-panel { padding: 24px 22px; }

        /* Teaser pre-Kjør state */
        .calc-teaser-text {
          font-size: 14px; color: var(--calc-ink-secondary);
          line-height: 1.6; margin: 0;
        }

        /* Inputs */
        .calc-field { margin-bottom: 20px; }
        .calc-field--last { margin-bottom: 0; }
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
          font-size: 40px; font-weight: 700;
          color: var(--calc-ink); letter-spacing: -0.03em; line-height: 1;
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

        /* Vis/Skjul forklaring toggle */
        .calc-expl-toggle {
          align-self: center;
          margin-top: 8px;
          background: var(--calc-bg-card);
          color: var(--calc-gold);
          border: 1px solid var(--calc-border);
          padding: 10px 18px; border-radius: 999px;
          font-size: 13px; font-weight: 500; font-family: inherit;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .calc-expl-toggle:hover {
          border-color: var(--calc-gold-soft);
          background: var(--calc-gold-bg);
        }

        /* Explanation panel */
        .calc-expl-section { margin-bottom: 20px; }
        .calc-expl-section:last-child { margin-bottom: 0; }
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
          height: 1px; background: var(--calc-border); margin: 18px 0;
        }

        /* Mobile */
        @media (max-width: 880px) {
          .calc-layout { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .calc-main { padding: 24px 16px 64px; }
          .calc-panel { padding: 20px 18px; }
          .calc-total-value { font-size: 32px; }
          .calc-roi-value { font-size: 26px; }
          .calc-h1 { font-size: 26px; }
        }
      `}</style>
    </div>
  );
}
