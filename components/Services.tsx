"use client";
import { useState, useEffect, useRef } from "react";
import { MessageCircle, Calendar, Phone, Cpu, Send, ChevronRight, Check, Bot } from "lucide-react";
import { useLanguage, formatPriceWithPeriod } from "@/lib/i18n";

/* ─── Chatbot Demo ─── */
const CHAT_SCRIPT = [
  { role: "bot",  text: "Hey! I'm Aria 👋 How can I help your business today?" },
  { role: "user", text: "I need help booking appointments" },
  { role: "bot",  text: "Perfect! I can collect their details and book them straight into your calendar. Want me to demo that?" },
  { role: "user", text: "Yes please!" },
  { role: "bot",  text: "Great! I've set up your booking flow. You'll get notified instantly for every new booking. ✅" },
];

function ChatbotDemo() {
  const [messages, setMessages] = useState<typeof CHAT_SCRIPT>([]);
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user" as const, text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { role: "bot" as const, text: "Great question! Book a free discovery call and I'll show you exactly what's possible for your business. 🚀" }]);
    }, 1200);
  };

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
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  return (
    <div style={{ background: "#0a0a10", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden", height: 340, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}>
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
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "16px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
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
      </div>
      <div style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()} placeholder="Try typing something..."
          style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "8px 12px", fontSize: 12, color: "#f4f4f8", outline: "none", fontFamily: "inherit" }} />
        <button onClick={handleSend} style={{ padding: "8px 12px", background: "linear-gradient(135deg,#7c3aed,#a855f7)", border: "none", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Send size={14} color="white" />
        </button>
      </div>
    </div>
  );
}

/* ─── Leadgen Demo ─── */
const LEADGEN_STEPS = [
  { icon: "📥", label: "Lead captured",       detail: "Alex Johnson · alex@company.com", color: "#a855f7" },
  { icon: "🤖", label: "AI qualifies lead",   detail: "High value · 92%",               color: "#22d3ee" },
  { icon: "📅", label: "Booked in calendar",  detail: "Meeting confirmed · Thu 14:00",  color: "#4ade80" },
];

function LeadgenDemo() {
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveStep(s => (s + 1) % LEADGEN_STEPS.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: "#0a0a10", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, height: 340, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: "#8888a0", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 7 }}>Lead capture form</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, marginBottom: 5 }}>
          {["Name", "Email", "Phone", "What do you need?"].map((p, i) => (
            <div key={p} style={{ gridColumn: i === 3 ? "1 / -1" : undefined, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 7, padding: "5px 9px", fontSize: 11, color: "#44444e" }}>{p}</div>
          ))}
        </div>
        <div style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)", borderRadius: 7, padding: "5px 10px", fontSize: 11, fontWeight: 600, color: "white", textAlign: "center" }}>Submit →</div>
      </div>
      <div style={{ flex: 1, padding: "12px 14px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 0 }}>
        {LEADGEN_STEPS.map((step, i) => (
          <div key={i}>
            <div style={{
              display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10,
              background: activeStep === i ? `${step.color}12` : activeStep > i ? "rgba(74,222,128,0.04)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${activeStep === i ? step.color + "40" : activeStep > i ? "rgba(74,222,128,0.2)" : "rgba(255,255,255,0.05)"}`,
              transition: "all 0.5s ease",
            }}>
              <span style={{ fontSize: 15, flexShrink: 0 }}>{step.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: activeStep === i ? step.color : activeStep > i ? "#4ade80" : "#8888a0", transition: "color 0.3s" }}>{step.label}</div>
                <div style={{ fontSize: 10, color: "#44444e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{step.detail}</div>
              </div>
              {activeStep === i
                ? <div style={{ width: 7, height: 7, borderRadius: "50%", background: step.color, boxShadow: `0 0 8px ${step.color}`, animation: "blink 1s infinite", flexShrink: 0 }} />
                : activeStep > i ? <Check size={12} color="#4ade80" />
                : <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />}
            </div>
            {i < LEADGEN_STEPS.length - 1 && (
              <div style={{ width: 1, height: 10, background: activeStep > i ? "rgba(74,222,128,0.5)" : "rgba(168,85,247,0.3)", marginLeft: 22, transition: "background 0.5s" }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Voice Agent Demo ─── */
const TRANSCRIPT = [
  { role: "ai",   text: "Hi, this is Aria from SmartcoreAI — is now a good time?" },
  { role: "lead", text: "Yes, I'm interested in the chatbot service" },
  { role: "ai",   text: "Perfect! I'll book you in for a demo — does Thursday at 2PM work?" },
];

function VoiceAgentDemo() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const delay = visibleLines >= TRANSCRIPT.length ? 3000 : visibleLines === 0 ? 700 : 1900;
    const t = setTimeout(() => setVisibleLines(v => v >= TRANSCRIPT.length ? 0 : v + 1), delay);
    return () => clearTimeout(t);
  }, [visibleLines]);

  const done = visibleLines >= TRANSCRIPT.length;

  return (
    <div style={{ background: "#0a0a10", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, height: 340, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#f4f4f8" }}>Incoming lead</div>
          <div style={{ fontSize: 11, color: "#8888a0" }}>+47 900 12 345</div>
        </div>
        <div style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", animation: "blink 1.2s infinite" }} />
          <span style={{ fontSize: 10, fontWeight: 600, color: "#4ade80" }}>AI answering</span>
        </div>
      </div>
      <div style={{ flex: 1, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10, overflowY: "auto" }}>
        {TRANSCRIPT.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, justifyContent: line.role === "lead" ? "flex-end" : "flex-start", animation: "slideUp 0.3s ease both" }}>
            {line.role === "ai" && (
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(168,85,247,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11 }}>🤖</div>
            )}
            <div style={{
              padding: "7px 12px", borderRadius: line.role === "ai" ? "14px 14px 14px 4px" : "14px 14px 4px 14px",
              background: line.role === "ai" ? "rgba(168,85,247,0.1)" : "rgba(34,211,238,0.08)",
              border: `1px solid ${line.role === "ai" ? "rgba(168,85,247,0.2)" : "rgba(34,211,238,0.2)"}`,
              fontSize: 12, color: "#f4f4f8", maxWidth: "82%", lineHeight: 1.5,
            }}>{line.text}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "10px 16px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: 8, transition: "opacity 0.5s", opacity: done ? 1 : 0.2 }}>
        <Check size={14} color="#4ade80" />
        <span style={{ fontSize: 12, fontWeight: 600, color: "#4ade80" }}>Outcome: Meeting booked ✓</span>
      </div>
    </div>
  );
}

/* ─── Custom AI Demo ─── */
const WORKFLOW_STEPS = [
  { icon: "🔔", label: "New lead from website",      sub: "Trigger",    color: "#a855f7" },
  { icon: "🤖", label: "AI scores & qualifies",       sub: "Processing", color: "#22d3ee" },
  { icon: "📋", label: "Added to CRM pipeline",       sub: "Action",     color: "#06b6d4" },
  { icon: "✉️", label: "Personalized email sent",     sub: "Action",     color: "#06b6d4" },
  { icon: "📅", label: "Meeting booked automatically",sub: "Outcome",    color: "#4ade80" },
];

function CustomAIDemo() {
  const [dotStep, setDotStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setDotStep(s => (s + 1) % WORKFLOW_STEPS.length), 1300);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: "#0a0a10", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, height: 340, padding: "14px 14px 12px", display: "flex", flexDirection: "column" }}>
      <div style={{ fontSize: 10, fontWeight: 600, color: "#8888a0", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Your custom AI workflow</div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {WORKFLOW_STEPS.map((step, i) => (
          <div key={i}>
            <div style={{
              display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", borderRadius: 10,
              background: dotStep === i ? `${step.color}12` : "rgba(255,255,255,0.02)",
              border: `1px solid ${dotStep === i ? step.color + "40" : "rgba(255,255,255,0.05)"}`,
              transition: "all 0.4s ease", position: "relative", overflow: "hidden",
            }}>
              {dotStep === i && (
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, transparent, ${step.color}08, transparent)`, animation: "shimmer 1.5s ease infinite", backgroundSize: "200% 100%" }} />
              )}
              <div style={{ width: 28, height: 28, borderRadius: 8, background: `${step.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{step.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: dotStep === i ? step.color : "#f4f4f8", transition: "color 0.3s", lineHeight: 1.2 }}>{step.label}</div>
                <div style={{ fontSize: 10, color: "#44444e" }}>{step.sub}</div>
              </div>
              {dotStep === i
                ? <div style={{ width: 7, height: 7, borderRadius: "50%", background: step.color, boxShadow: `0 0 8px ${step.color}`, animation: "blink 1s infinite", flexShrink: 0 }} />
                : i < dotStep ? <Check size={11} color="#4ade80" />
                : null}
            </div>
            {i < WORKFLOW_STEPS.length - 1 && (
              <div style={{ position: "relative", width: 1, height: 8, marginLeft: 23 }}>
                <div style={{ position: "absolute", inset: 0, background: "rgba(168,85,247,0.2)" }} />
                {dotStep === i && (
                  <div style={{ position: "absolute", top: 0, left: -2, width: 5, height: 5, borderRadius: "50%", background: step.color, boxShadow: `0 0 6px ${step.color}`, animation: "travelDown 1.3s linear" }} />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Static service data (icons, colors, prices, demos) ─── */
const SERVICE_META = [
  { id: "chatbot",        icon: <MessageCircle size={20} />, color: "#a855f7", usdPrice: 699,  priceCustom: false, demo: <ChatbotDemo /> },
  { id: "leadgen",        icon: <Calendar size={20} />,      color: "#22d3ee", usdPrice: 1099, priceCustom: false, demo: <LeadgenDemo /> },
  { id: "voice-agent",    icon: <Phone size={20} />,         color: "#f472b6", usdPrice: 1599, priceCustom: false, demo: <VoiceAgentDemo /> },
  { id: "ai-integration", icon: <Cpu size={20} />,           color: "#facc15", usdPrice: 1500, priceCustom: true,  demo: <CustomAIDemo /> },
];

export default function Services() {
  const { t, lang } = useLanguage();
  const [active, setActive] = useState(0);

  const SERVICES = SERVICE_META.map((meta, i) => ({
    ...meta,
    ...t.services.items[i],
    price: meta.priceCustom ? t.services.priceCustom : formatPriceWithPeriod(meta.usdPrice, lang),
  }));

  const svc = SERVICES[active];

  return (
    <section id="services" style={{ background: "#08080c", padding: "100px 24px" }}>
      <div className="wrap">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="tag" style={{ display: "inline-flex", marginBottom: 16 }}>{t.services.tag}</div>
          <h2 className="text-[22px] sm:text-4xl lg:text-[52px]" style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800, color: "#f4f4f8", letterSpacing: "-0.03em", marginBottom: 14, lineHeight: 1.1,
          }}>
            {t.services.headline1}{" "}
            <span style={{ background: "linear-gradient(135deg,#a855f7,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {t.services.headline2}
            </span>
          </h2>
          <p style={{ fontSize: 16, color: "#8888a0", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            {t.services.subtext}
          </p>
        </div>

        {/* Tab selector */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 10, marginBottom: 36,
          background: "rgba(255,255,255,0.02)", padding: 8, borderRadius: 18,
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
                <div style={{ padding: "6px", borderRadius: 10, background: svc.color + "20", color: svc.color, border: `1px solid ${svc.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>{svc.icon}</div>
                <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 999, background: svc.color + "18", color: svc.color, fontWeight: 600, border: `1px solid ${svc.color}30` }}>{svc.tag}</span>
              </div>
              <h3 className="text-xl md:text-[26px]" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, color: "#f4f4f8", letterSpacing: "-0.02em", marginBottom: 10, lineHeight: 1.2 }}>
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
                <div style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800, color: "#f4f4f8", whiteSpace: "nowrap" }}>{svc.price}</div>
                <div style={{ fontSize: 11, color: "#8888a0" }}>{t.services.monthNote}</div>
              </div>
              <a href="#booking" className="btn-primary" style={{ marginLeft: "auto" }}>
                {t.services.getStarted} <ChevronRight size={16} />
              </a>
            </div>
          </div>

          {/* Right: Live Demo */}
          <div>
            <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
              <span style={{ fontSize: 11, color: "#8888a0", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {t.services.liveDemo}
              </span>
            </div>
            {svc.demo}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .services-grid { grid-template-columns: 1fr !important; } }
        @keyframes shimmer { from { background-position: -200% 0; } to { background-position: 200% 0; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes travelDown { from { top: 0; opacity: 1; } to { top: 8px; opacity: 0; } }
      `}</style>
    </section>
  );
}
