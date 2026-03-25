"use client";
import { useState } from "react";
import { Calendar, Clock, Video, ArrowRight, CheckCircle, Zap } from "lucide-react";

const CALL_TYPES = [
  { id: "discovery", label: "Discovery Call", duration: "30 min", icon: <Video size={16} />, desc: "Learn what we can build for you" },
  { id: "demo", label: "Product Demo", duration: "45 min", icon: <Zap size={16} />, desc: "See your system in action" },
  { id: "strategy", label: "Strategy Session", duration: "60 min", icon: <Calendar size={16} />, desc: "Full roadmap for your business" },
];

const TIMES_AM = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"];
const TIMES_PM = ["1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"];
const WEEK = [
  { day: "Mon", date: 24, avail: true },
  { day: "Tue", date: 25, avail: true },
  { day: "Wed", date: 26, avail: false },
  { day: "Thu", date: 27, avail: true },
  { day: "Fri", date: 28, avail: true },
  { day: "Mon", date: 31, avail: true },
  { day: "Tue", date: 1, avail: true },
];
const TAKEN = new Set(["9:30 AM", "10:30 AM", "1:00 PM", "2:30 PM"]);

export default function BookingSection() {
  const [callType, setCallType] = useState("discovery");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<"select" | "details" | "confirmed">("select");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [biz, setBiz] = useState("");

  const dayData = selectedDay !== null ? WEEK[selectedDay] : null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setStep("confirmed");
  };

  if (step === "confirmed") return (
    <section id="booking" style={{ background: "#08080c", padding: "100px 24px" }}>
      <div className="wrap-narrow" style={{ textAlign: "center" }}>
        <div style={{
          background: "rgba(15,15,20,0.8)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 28, padding: "64px 40px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
        }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(74,222,128,0.12)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(74,222,128,0.3)", marginBottom: 8 }}>
            <CheckCircle size={36} color="#4ade80" />
          </div>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 32, fontWeight: 800, color: "#f4f4f8", margin: 0 }}>You're booked!</h2>
          <p style={{ fontSize: 15, color: "#8888a0", margin: 0, lineHeight: 1.7 }}>
            {dayData && `${dayData.day}, Mar ${dayData.date}`} at {selectedTime} — {CALL_TYPES.find(c => c.id === callType)?.label}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
            {["Calendar invite sent to " + email, "Video link included in invite", "Reminder 24h before your call"].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#4ade80" }}>
                <CheckCircle size={14} />
                {item}
              </div>
            ))}
          </div>
          <button onClick={() => { setStep("select"); setSelectedDay(null); setSelectedTime(null); setName(""); setEmail(""); setBiz(""); }}
            style={{ marginTop: 16, padding: "10px 24px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#8888a0", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
            Book another call
          </button>
        </div>
      </div>
    </section>
  );

  return (
    <section id="booking" style={{ background: "#08080c", padding: "100px 24px" }}>
      <div className="wrap">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div className="tag" style={{ display: "inline-flex", marginBottom: 16 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
            Book a call
          </div>
          <h2 style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(32px,4vw,52px)",
            fontWeight: 800, color: "#f4f4f8", letterSpacing: "-0.03em", marginBottom: 14, lineHeight: 1.1,
          }}>
            Let's talk{" "}
            <span style={{ background: "linear-gradient(135deg,#a855f7,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              about your business
            </span>
          </h2>
          <p style={{ fontSize: 16, color: "#8888a0", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
            Pick a time that works. No pressure — just a conversation about what's possible.
          </p>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "360px 1fr", gap: 24,
          background: "rgba(15,15,20,0.7)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 26, overflow: "hidden",
        }} className="booking-grid">
          {/* Left: Call type & info */}
          <div style={{ padding: 32, borderRight: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#8888a0", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Select call type</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {CALL_TYPES.map(ct => (
                  <button key={ct.id} onClick={() => setCallType(ct.id)} style={{
                    padding: "14px 16px", borderRadius: 14, textAlign: "left", cursor: "pointer",
                    background: callType === ct.id ? "rgba(168,85,247,0.1)" : "rgba(255,255,255,0.02)",
                    border: `1px solid ${callType === ct.id ? "rgba(168,85,247,0.4)" : "rgba(255,255,255,0.06)"}`,
                    fontFamily: "inherit", transition: "all 0.2s",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <div style={{ color: callType === ct.id ? "#a855f7" : "#8888a0" }}>{ct.icon}</div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: callType === ct.id ? "#f4f4f8" : "#8888a0" }}>{ct.label}</span>
                      <span style={{ marginLeft: "auto", fontSize: 11, color: "#44444e", display: "flex", alignItems: "center", gap: 3 }}>
                        <Clock size={10} /> {ct.duration}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: "#44444e" }}>{ct.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected summary */}
            {selectedDay !== null && selectedTime && (
              <div style={{ padding: "16px", background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.2)", borderRadius: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#c084fc", marginBottom: 8 }}>Your selection</div>
                <div style={{ fontSize: 13, color: "#f4f4f8", marginBottom: 4 }}>{dayData?.day} Mar {dayData?.date} · {selectedTime}</div>
                <div style={{ fontSize: 12, color: "#8888a0" }}>{CALL_TYPES.find(c => c.id === callType)?.label} · {CALL_TYPES.find(c => c.id === callType)?.duration}</div>
              </div>
            )}
          </div>

          {/* Right: Calendar */}
          <div style={{ padding: 32 }}>
            {step === "select" ? (
              <>
                {/* Days */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#8888a0", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>March 2025</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
                    {WEEK.map((d, i) => (
                      <button key={i} disabled={!d.avail} onClick={() => { setSelectedDay(i); setSelectedTime(null); }} style={{
                        padding: "10px 4px", borderRadius: 12, textAlign: "center",
                        background: selectedDay === i ? "rgba(168,85,247,0.15)" : d.avail ? "rgba(255,255,255,0.02)" : "transparent",
                        border: `1px solid ${selectedDay === i ? "rgba(168,85,247,0.5)" : d.avail ? "rgba(255,255,255,0.06)" : "transparent"}`,
                        cursor: d.avail ? "pointer" : "not-allowed", fontFamily: "inherit", opacity: d.avail ? 1 : 0.3,
                        transition: "all 0.2s",
                      }}>
                        <div style={{ fontSize: 10, color: "#8888a0", marginBottom: 4 }}>{d.day}</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: selectedDay === i ? "#a855f7" : "#f4f4f8" }}>{d.date}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Times */}
                {selectedDay !== null && (
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#8888a0", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Available times (GMT+0)</div>
                    <div>
                      <div style={{ fontSize: 11, color: "#44444e", marginBottom: 8 }}>Morning</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 16 }}>
                        {TIMES_AM.map(t => {
                          const taken = TAKEN.has(t);
                          return (
                            <button key={t} disabled={taken} onClick={() => !taken && setSelectedTime(t)} style={{
                              padding: "9px", borderRadius: 10, fontSize: 12, fontFamily: "inherit",
                              background: selectedTime === t ? "rgba(168,85,247,0.15)" : taken ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.03)",
                              border: `1px solid ${selectedTime === t ? "rgba(168,85,247,0.5)" : taken ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.07)"}`,
                              color: taken ? "#44444e" : selectedTime === t ? "#a855f7" : "#f4f4f8",
                              cursor: taken ? "not-allowed" : "pointer", transition: "all 0.2s",
                              textDecoration: taken ? "line-through" : "none",
                            }}>{t}</button>
                          );
                        })}
                      </div>
                      <div style={{ fontSize: 11, color: "#44444e", marginBottom: 8 }}>Afternoon</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 20 }}>
                        {TIMES_PM.map(t => {
                          const taken = TAKEN.has(t);
                          return (
                            <button key={t} disabled={taken} onClick={() => !taken && setSelectedTime(t)} style={{
                              padding: "9px", borderRadius: 10, fontSize: 12, fontFamily: "inherit",
                              background: selectedTime === t ? "rgba(168,85,247,0.15)" : taken ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.03)",
                              border: `1px solid ${selectedTime === t ? "rgba(168,85,247,0.5)" : taken ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.07)"}`,
                              color: taken ? "#44444e" : selectedTime === t ? "#a855f7" : "#f4f4f8",
                              cursor: taken ? "not-allowed" : "pointer", transition: "all 0.2s",
                              textDecoration: taken ? "line-through" : "none",
                            }}>{t}</button>
                          );
                        })}
                      </div>
                      {selectedTime && (
                        <button onClick={() => setStep("details")} className="btn-primary" style={{ width: "100%" }}>
                          Continue <ArrowRight size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {selectedDay === null && (
                  <div style={{ textAlign: "center", padding: "40px 20px", color: "#44444e", fontSize: 14 }}>
                    Select a date above to see available times
                  </div>
                )}
              </>
            ) : (
              /* Details form */
              <form onSubmit={handleConfirm} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <div style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 700, color: "#f4f4f8", marginBottom: 4 }}>Your details</div>
                  <div style={{ fontSize: 13, color: "#8888a0" }}>Just a few quick details before we confirm.</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#8888a0", marginBottom: 6 }}>Full name *</label>
                    <input className="input-dark" value={name} onChange={e => setName(e.target.value)} placeholder="Alex Johnson" required />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#8888a0", marginBottom: 6 }}>Email *</label>
                    <input className="input-dark" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="alex@company.com" required />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#8888a0", marginBottom: 6 }}>Business name (optional)</label>
                  <input className="input-dark" value={biz} onChange={e => setBiz(e.target.value)} placeholder="My Business LLC" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#8888a0", marginBottom: 6 }}>What do you want to achieve?</label>
                  <textarea className="input-dark" rows={3} placeholder="Tell us a bit about your business goals..." style={{ resize: "none" }} />
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button type="button" onClick={() => setStep("select")} style={{ flex: "none", padding: "13px 20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, color: "#8888a0", fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
                    Back
                  </button>
                  <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                    Confirm booking <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .booking-grid { grid-template-columns: 1fr !important; }
          .booking-grid > div:first-child { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.05); }
        }
      `}</style>
    </section>
  );
}
