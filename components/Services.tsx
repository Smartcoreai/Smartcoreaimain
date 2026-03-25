"use client";
import { useState, useEffect, useRef } from "react";
import { MessageCircle, Calendar, BarChart3, Cpu, Send, ChevronRight, Check, Bot, User } from "lucide-react";

/* ─── Chatbot Demo ─── */
const CHAT_SCRIPT = [
  { role: "bot", text: "Hey! I'm Aria 👋 How can I help your business today?" },
  { role: "user", text: "I need help booking appointments" },
  { role: "bot", text: "Perfect! I can collect their details and book them straight into your calendar. Want me to demo that?" },
  { role: "user", text: "Yes please!" },
  { role: "bot", text: "Great! I've set up your booking flow. You'll get notified instantly for every new booking. ✅" },
];

function ChatbotDemo() {
  const [messages, setMessages] = useState<typeof CHAT_SCRIPT>([]);
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step >= CHAT_SCRIPT.length) return;
    const msg = CHAT_SCRIPT[step];
    const delay = step === 0 ? 600 : msg.role === "bot" ? 1000 : 500;

    if (msg.role === "bot") setTyping(true);

    const t = setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, msg]);
      setStep((s) => s + 1);
    }, delay);

    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <div style={{
      background: "#0a0a10", border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 16, overflow: "hidden", height: 340,
      display: "flex", flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        padding: "12px 16px", display: "flex", alignItems: "center", gap: 10,
        background: "linear-gradient(135deg, #7c3aed, #a855f7)",
      }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Bot size={16} color="white" />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "white" }}>Aria — AI Assistant</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>Online · replying instantly</span>
          </div>
        </div>
      </div>
      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: 8, alignItems: "flex-end" }}>
            {m.role === "bot" && (
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(168,85,247,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Bot size={12} color="#a855f7" />
              </div>
            )}
            <div style={{
              padding: "8px 14px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              background: m.role === "user" ? "linear-gradient(135deg,#7c3aed,#a855f7)" : "rgba(30,30,42,0.9)",
              border: m.role === "bot" ? "1px solid rgba(255,255,255,0.07)" : "none",
              fontSize: 13, color: "#f4f4f8", maxWidth: "75%", lineHeight: 1.5,
            }}>{m.text}</div>
          </div>
        ))}
        {typing && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(168,85,247,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Bot size={12} color="#a855f7" />
            </div>
            <div style={{ padding: "10px 14px", borderRadius: "18px 18px 18px 4px", background: "rgba(30,30,42,0.9)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: 4 }}>
              {[0,1,2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "#a855f7", animation: `blink 1.2s ${i*0.2}s step-end infinite` }} />)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      {/* Input */}
      <div style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 8 }}>
        <input
          value={input} onChange={e => setInput(e.target.value)}
          placeholder="Try typing something..."
          style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "8px 12px", fontSize: 12, color: "#f4f4f8", outline: "none", fontFamily: "inherit" }}
        />
        <button style={{ padding: "8px 12px", background: "linear-gradient(135deg,#7c3aed,#a855f7)", border: "none", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Send size={14} color="white" />
        </button>
      </div>
    </div>
  );
}

/* ─── Booking Demo ─── */
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const TIMES = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"];
const DATES = [24, 25, 26, 27, 28];

function BookingDemo() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const bookedSlots = new Set([0, 2, 6, 9, 11]);

  const handleBook = () => {
    if (selectedDate !== null && selectedTime) setBooked(true);
  };

  if (booked) return (
    <div style={{ background: "#0a0a10", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, height: 340, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
      <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(74,222,128,0.15)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(74,222,128,0.3)" }}>
        <Check size={28} color="#4ade80" />
      </div>
      <div style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 700, color: "#f4f4f8" }}>Booking Confirmed!</div>
      <div style={{ fontSize: 13, color: "#8888a0" }}>{DAYS[selectedDate!]} Mar {DATES[selectedDate!]} · {selectedTime}</div>
      <div style={{ marginTop: 4, fontSize: 12, color: "#4ade80" }}>Calendar invite sent ✓</div>
      <button onClick={() => { setBooked(false); setSelectedDate(null); setSelectedTime(null); }}
        style={{ marginTop: 12, padding: "8px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#8888a0", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
        Try again
      </button>
    </div>
  );

  return (
    <div style={{ background: "#0a0a10", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden", height: 340, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#f4f4f8" }}>Book a Discovery Call</div>
        <div style={{ fontSize: 11, color: "#8888a0" }}>March 2025 · 30 min</div>
      </div>
      <div style={{ flex: 1, padding: "12px 14px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Days */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6 }}>
          {DAYS.map((d, i) => (
            <button key={d} onClick={() => setSelectedDate(i)} style={{
              padding: "8px 4px", borderRadius: 10, border: "1px solid",
              borderColor: selectedDate === i ? "#a855f7" : "rgba(255,255,255,0.07)",
              background: selectedDate === i ? "rgba(168,85,247,0.15)" : "rgba(255,255,255,0.02)",
              cursor: "pointer", textAlign: "center", fontFamily: "inherit",
            }}>
              <div style={{ fontSize: 10, color: "#8888a0", marginBottom: 2 }}>{d}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: selectedDate === i ? "#a855f7" : "#f4f4f8" }}>{DATES[i]}</div>
            </button>
          ))}
        </div>
        {/* Times */}
        {selectedDate !== null && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {TIMES.map((t, ti) => {
              const slotIdx = selectedDate * TIMES.length + ti;
              const taken = bookedSlots.has(slotIdx);
              return (
                <button key={t} disabled={taken} onClick={() => !taken && setSelectedTime(t)} style={{
                  padding: "8px 10px", borderRadius: 10, border: "1px solid",
                  borderColor: selectedTime === t ? "#a855f7" : taken ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.07)",
                  background: selectedTime === t ? "rgba(168,85,247,0.15)" : taken ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.02)",
                  cursor: taken ? "not-allowed" : "pointer",
                  fontSize: 12, color: taken ? "#44444e" : selectedTime === t ? "#a855f7" : "#f4f4f8",
                  fontFamily: "inherit", textAlign: "center",
                }}>
                  {taken ? <s>{t}</s> : t}
                </button>
              );
            })}
          </div>
        )}
      </div>
      {/* Book button */}
      <div style={{ padding: "12px 14px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <button onClick={handleBook} disabled={!selectedDate === null || !selectedTime}
          style={{
            width: "100%", padding: "10px", borderRadius: 10,
            background: (selectedDate !== null && selectedTime) ? "linear-gradient(135deg,#7c3aed,#a855f7)" : "rgba(255,255,255,0.04)",
            border: "none", cursor: (selectedDate !== null && selectedTime) ? "pointer" : "not-allowed",
            fontSize: 13, fontWeight: 600, color: (selectedDate !== null && selectedTime) ? "white" : "#44444e",
            fontFamily: "inherit", transition: "all 0.2s",
          }}>
          {selectedDate !== null && selectedTime ? `Confirm · ${DAYS[selectedDate]} ${TIMES.indexOf(selectedTime) >= 0 ? selectedTime : ""}` : "Select a slot"}
        </button>
      </div>
    </div>
  );
}

/* ─── CRM Demo ─── */
const CRM_LEADS = [
  { name: "James Carter", company: "Carter & Co", value: "$8,400", stage: "Proposal", prob: 85, avatar: "JC", color: "#a855f7" },
  { name: "Sarah Mitchell", company: "Bloom Studio", value: "$3,200", stage: "Discovery", prob: 60, avatar: "SM", color: "#22d3ee" },
  { name: "Daniel Park", company: "NovaBuild", value: "$14,500", stage: "Negotiation", prob: 90, avatar: "DP", color: "#f472b6" },
  { name: "Lily Torres", company: "Torres Media", value: "$2,100", stage: "Qualified", prob: 40, avatar: "LT", color: "#facc15" },
];

function CRMDemo() {
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const total = CRM_LEADS.reduce((sum, l) => sum + parseInt(l.value.replace(/\D/g, "")), 0);
  const stageColors: Record<string, string> = {
    "Proposal": "#a855f7", "Discovery": "#22d3ee", "Negotiation": "#4ade80", "Qualified": "#facc15"
  };

  return (
    <div style={{ background: "#0a0a10", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden", height: 340, display: "flex", flexDirection: "column" }}>
      {/* Top stats */}
      <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {[
          { label: "Pipeline", value: `$${(total/1000).toFixed(0)}K` },
          { label: "Active Leads", value: "4" },
          { label: "Win Rate", value: "68%" },
        ].map(s => (
          <div key={s.label} style={{ textAlign: "center", padding: "6px" }}>
            <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "Syne, sans-serif", background: "linear-gradient(135deg,#a855f7,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.value}</div>
            <div style={{ fontSize: 10, color: "#8888a0", marginTop: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>
      {/* Table */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              {["Contact", "Value", "Stage", "Prob."].map(h => (
                <th key={h} style={{ padding: "7px 10px", fontSize: 10, color: "#44444e", fontWeight: 600, textAlign: "left", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CRM_LEADS.map((l, i) => (
              <tr key={i} onClick={() => setActiveRow(activeRow === i ? null : i)}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.03)",
                  background: activeRow === i ? "rgba(168,85,247,0.05)" : "transparent",
                  cursor: "pointer", transition: "background 0.2s",
                }}>
                <td style={{ padding: "8px 10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: l.color + "30", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: l.color, flexShrink: 0 }}>{l.avatar}</div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#f4f4f8", lineHeight: 1.2 }}>{l.name}</div>
                      <div style={{ fontSize: 10, color: "#44444e" }}>{l.company}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "8px 10px", fontSize: 12, fontWeight: 600, color: "#4ade80" }}>{l.value}</td>
                <td style={{ padding: "8px 10px" }}>
                  <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 999, background: stageColors[l.stage] + "20", color: stageColors[l.stage], fontWeight: 600 }}>{l.stage}</span>
                </td>
                <td style={{ padding: "8px 10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ width: `${l.prob}%`, height: "100%", background: stageColors[l.stage], borderRadius: 2 }} />
                    </div>
                    <span style={{ fontSize: 10, color: "#8888a0" }}>{l.prob}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── AI Integration Demo ─── */
const FLOW_NODES = [
  { label: "Trigger", sub: "New lead from form", icon: "⚡", color: "#a855f7" },
  { label: "AI Qualify", sub: "Score & segment lead", icon: "🤖", color: "#22d3ee" },
  { label: "CRM Update", sub: "Auto-add to pipeline", icon: "📊", color: "#f472b6" },
  { label: "Send Email", sub: "Personalized outreach", icon: "📧", color: "#facc15" },
  { label: "Book Call", sub: "AI schedules meeting", icon: "📅", color: "#4ade80" },
];

function AIIntegrationDemo() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % FLOW_NODES.length), 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: "#0a0a10", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, height: 340, padding: "20px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: "#8888a0", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Live workflow · running</div>
      {FLOW_NODES.map((node, i) => (
        <div key={node.label}>
          <div style={{
            display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
            borderRadius: 12,
            background: active === i ? `${node.color}15` : "rgba(255,255,255,0.02)",
            border: `1px solid ${active === i ? node.color + "40" : "rgba(255,255,255,0.05)"}`,
            transition: "all 0.4s ease",
            position: "relative", overflow: "hidden",
          }}>
            {active === i && (
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(90deg, transparent, ${node.color}08, transparent)`,
                animation: "shimmer 1.5s ease infinite",
                backgroundSize: "200% 100%",
              }} />
            )}
            <div style={{ width: 32, height: 32, borderRadius: 10, background: `${node.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{node.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: active === i ? node.color : "#f4f4f8", transition: "color 0.3s" }}>{node.label}</div>
              <div style={{ fontSize: 11, color: "#8888a0" }}>{node.sub}</div>
            </div>
            {active === i ? (
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: node.color, boxShadow: `0 0 8px ${node.color}`, animation: "blink 1s infinite" }} />
            ) : i < active ? (
              <Check size={14} color="#4ade80" />
            ) : (
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
            )}
          </div>
          {i < FLOW_NODES.length - 1 && (
            <div style={{ width: 1, height: 10, background: "linear-gradient(180deg,rgba(168,85,247,0.4),transparent)", marginLeft: 30 }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Main Services Section ─── */
const SERVICES = [
  {
    id: "chatbot",
    icon: <MessageCircle size={20} />,
    color: "#a855f7",
    label: "AI Chatbot",
    price: "$399/mo",
    tag: "Most Popular",
    headline: "Convert visitors to clients while you sleep",
    desc: "A trained AI assistant that handles leads, FAQs, bookings, and follow-ups — 24/7. No scripts, no delays.",
    features: ["Instant lead capture", "Custom AI training", "CRM integration", "Multi-channel (web, SMS, IG)"],
    demo: <ChatbotDemo />,
  },
  {
    id: "booking",
    icon: <Calendar size={20} />,
    color: "#22d3ee",
    label: "Booking System",
    price: "$499/mo",
    tag: "Time-saver",
    headline: "Zero back-and-forth. Instant bookings.",
    desc: "Automated scheduling with confirmations, reminders, and calendar sync. Your clients book, you just show up.",
    features: ["Real-time availability", "Auto SMS/email reminders", "Payment integration", "Google & Outlook sync"],
    demo: <BookingDemo />,
  },
  {
    id: "crm",
    icon: <BarChart3 size={20} />,
    color: "#f472b6",
    label: "CRM System",
    price: "$899/mo",
    tag: "Revenue driver",
    headline: "Track every deal. Close more clients.",
    desc: "A full CRM dashboard tailored to your pipeline — with AI scoring, automated follow-ups, and revenue tracking.",
    features: ["AI lead scoring", "Pipeline automation", "Revenue forecasting", "Team collaboration"],
    demo: <CRMDemo />,
  },
  {
    id: "ai-integration",
    icon: <Cpu size={20} />,
    color: "#facc15",
    label: "Custom AI Integration",
    price: "$1,500/mo",
    tag: "Enterprise",
    headline: "Your entire workflow, automated.",
    desc: "We design and build a custom AI layer that plugs into your existing tools — turning hours of manual work into seconds.",
    features: ["Custom workflow design", "API integrations", "AI model training", "Dedicated support"],
    demo: <AIIntegrationDemo />,
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const svc = SERVICES[active];

  return (
    <section id="services" style={{ background: "#08080c", padding: "100px 24px" }}>
      <div className="wrap">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="tag" style={{ display: "inline-flex", marginBottom: 16 }}>What we build</div>
          <h2 style={{
            fontFamily: "Syne, sans-serif", fontSize: "clamp(32px,4vw,52px)",
            fontWeight: 800, color: "#f4f4f8", letterSpacing: "-0.03em", marginBottom: 14, lineHeight: 1.1,
          }}>
            Tools that{" "}
            <span style={{ background: "linear-gradient(135deg,#a855f7,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              pay for themselves
            </span>
          </h2>
          <p style={{ fontSize: 16, color: "#8888a0", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Each product is built to generate revenue, not just look good. Try the live demos below.
          </p>
        </div>

        {/* Tab selector */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 10, marginBottom: 36,
          background: "rgba(255,255,255,0.02)",
          padding: 8, borderRadius: 18,
          border: "1px solid rgba(255,255,255,0.05)",
        }}>
          {SERVICES.map((s, i) => (
            <button key={s.id} onClick={() => setActive(i)} style={{
              padding: "12px 16px", borderRadius: 12, border: "1px solid",
              borderColor: active === i ? s.color + "50" : "transparent",
              background: active === i ? s.color + "12" : "transparent",
              cursor: "pointer", textAlign: "left", transition: "all 0.25s", fontFamily: "inherit",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <div style={{ color: active === i ? s.color : "#8888a0", transition: "color 0.25s" }}>{s.icon}</div>
                <span style={{ fontSize: 13, fontWeight: 600, color: active === i ? "#f4f4f8" : "#8888a0", transition: "color 0.25s" }}>{s.label}</span>
              </div>
              <div style={{ fontSize: 12, color: active === i ? s.color : "#44444e", fontWeight: 600, transition: "color 0.25s" }}>{s.price}</div>
            </button>
          ))}
        </div>

        {/* Main panel */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28,
          background: "rgba(20,20,27,0.6)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 24, padding: 28, backdropFilter: "blur(12px)",
        }} className="services-grid">
          {/* Left: Info */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 24 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{
                  padding: "6px", borderRadius: 10,
                  background: svc.color + "20", color: svc.color, border: `1px solid ${svc.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>{svc.icon}</div>
                <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 999, background: svc.color + "18", color: svc.color, fontWeight: 600, border: `1px solid ${svc.color}30` }}>{svc.tag}</span>
              </div>
              <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 26, fontWeight: 800, color: "#f4f4f8", letterSpacing: "-0.02em", marginBottom: 10, lineHeight: 1.2 }}>
                {svc.headline}
              </h3>
              <p style={{ fontSize: 14, color: "#8888a0", lineHeight: 1.7, marginBottom: 24 }}>{svc.desc}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {svc.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#f4f4f8" }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: svc.color + "20", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Check size={10} color={svc.color} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div>
                <div style={{ fontFamily: "Syne, sans-serif", fontSize: 28, fontWeight: 800, color: "#f4f4f8" }}>{svc.price}</div>
                <div style={{ fontSize: 11, color: "#8888a0" }}>month · no long-term contract</div>
              </div>
              <a href="#booking" className="btn-primary" style={{ marginLeft: "auto" }}>
                Get started <ChevronRight size={16} />
              </a>
            </div>
          </div>

          {/* Right: Live Demo */}
          <div>
            <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
              <span style={{ fontSize: 11, color: "#8888a0", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Live interactive demo
              </span>
            </div>
            {svc.demo}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes shimmer {
          from { background-position: -200% 0; }
          to { background-position: 200% 0; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
