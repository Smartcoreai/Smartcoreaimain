"use client";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { MessageCircle, Calendar, Phone, Cpu, Send, ChevronRight, Check, Bot } from "lucide-react";

const SplineBoxes = dynamic(() => import("@/components/SplineBoxes"), {
  ssr: false,
  loading: () => <div style={{ width: "100%", height: "100%", background: "transparent" }} />,
});
import { useLanguage, formatPrice, formatPriceWithPeriod } from "@/lib/i18n";

/* ─── Chatbot Demo ─── */
const CHATBOT_UI = {
  en: {
    greeting:    "Hey! I'm Aria 👋 How can I help your business today?",
    msg1:        "I need help booking appointments",
    msg2:        "Perfect! I can collect their details and book them straight into your calendar. Want me to demo that?",
    msg3:        "Yes please!",
    msg4:        "Great! I've set up your booking flow. You'll get notified instantly for every new booking. ✅",
    name:        "Aria — AI Assistant",
    status:      "Online · replying instantly",
    placeholder: "Try typing something...",
    freeReply:   "Great question! Book a free discovery call and I'll show you exactly what's possible for your business. 🚀",
  },
  no: {
    greeting:    "Hei! Jeg er Aria 👋 Hvordan kan jeg hjelpe bedriften din i dag?",
    msg1:        "Jeg trenger hjelp med å booke avtaler",
    msg2:        "Perfekt! Jeg kan samle inn detaljene deres og booke dem rett inn i kalenderen din. Vil du at jeg demonstrerer det?",
    msg3:        "Ja takk!",
    msg4:        "Supert! Jeg har satt opp bookingflyten din. Du blir varslet umiddelbart for hver ny booking. ✅",
    name:        "Aria — AI-assistent",
    status:      "Online · svarer umiddelbart",
    placeholder: "Prøv å skriv noe...",
    freeReply:   "Godt spørsmål! Book en gratis oppdagelsessamtale, så viser jeg deg nøyaktig hva som er mulig for din bedrift. 🚀",
  },
};

function ChatbotDemo() {
  const { lang } = useLanguage();
  const ui = CHATBOT_UI[lang];
  const CHAT_SCRIPT = [
    { role: "bot",  text: ui.greeting },
    { role: "user", text: ui.msg1 },
    { role: "bot",  text: ui.msg2 },
    { role: "user", text: ui.msg3 },
    { role: "bot",  text: ui.msg4 },
  ];
  const [messages, setMessages] = useState<typeof CHAT_SCRIPT>([]);
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([]);
    setStep(0);
    setTyping(false);
  }, [lang]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user" as const, text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { role: "bot" as const, text: ui.freeReply }]);
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
    <div style={{ background: "#080808", border: "1px solid rgba(212,175,55,0.12)", borderRadius: 16, overflow: "hidden", height: 340, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, background: "linear-gradient(135deg, #1a1408, #2a1f08)" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Bot size={16} color="white" />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "white" }}>{ui.name}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>{ui.status}</span>
          </div>
        </div>
      </div>
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "16px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: 8, alignItems: "flex-end" }}>
            {m.role === "bot" && (
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(212,175,55,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Bot size={12} color="#D4AF37" />
              </div>
            )}
            <div style={{
              padding: "8px 14px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              background: m.role === "user" ? "linear-gradient(135deg,#B8960C,#D4AF37)" : "rgba(10,15,30,0.9)",
              border: m.role === "bot" ? "1px solid rgba(212,175,55,0.12)" : "none",
              fontSize: 13, color: "#F5F0E8", maxWidth: "75%", lineHeight: 1.5,
            }}>{m.text}</div>
          </div>
        ))}
        {typing && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(212,175,55,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Bot size={12} color="#D4AF37" />
            </div>
            <div style={{ padding: "10px 14px", borderRadius: "18px 18px 18px 4px", background: "rgba(10,15,30,0.9)", border: "1px solid rgba(212,175,55,0.12)", display: "flex", gap: 4 }}>
              {[0,1,2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "#D4AF37", animation: `blink 1.2s ${i*0.2}s step-end infinite` }} />)}
            </div>
          </div>
        )}
      </div>
      <div style={{ padding: "10px 12px", borderTop: "1px solid rgba(212,175,55,0.08)", display: "flex", gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()} placeholder={ui.placeholder}
          style={{ flex: 1, background: "rgba(212,175,55,0.03)", border: "1px solid rgba(212,175,55,0.10)", borderRadius: 10, padding: "8px 12px", fontSize: 12, color: "#F5F0E8", outline: "none", fontFamily: "inherit" }} />
        <button onClick={handleSend} style={{ padding: "8px 12px", background: "linear-gradient(135deg,#B8960C,#D4AF37)", border: "none", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Send size={14} color="#080808" />
        </button>
      </div>
    </div>
  );
}

/* ─── Leadgen Demo ─── */
const LEADGEN_STEPS = [
  { icon: "📥", label: "Lead captured",       detail: "Alex Johnson · alex@company.com", color: "#D4AF37" },
  { icon: "🤖", label: "AI qualifies lead",   detail: "High value · 92%",               color: "#F5D87E" },
  { icon: "📅", label: "Booked in calendar",  detail: "Meeting confirmed · Thu 14:00",  color: "#4ade80" },
];

function LeadgenDemo() {
  const { lang } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const steps = lang === "no" ? [
    { icon: "📥", label: "Lead fanget",          detail: "Alex Johnson · alex@company.com", color: "#D4AF37" },
    { icon: "🤖", label: "AI kvalifiserer lead", detail: "Høy verdi · 92%",                color: "#F5D87E" },
    { icon: "📅", label: "Booket i kalender",    detail: "Meeting confirmed · Thu 14:00",  color: "#4ade80" },
  ] : LEADGEN_STEPS;
  useEffect(() => {
    const t = setInterval(() => setActiveStep(s => (s + 1) % LEADGEN_STEPS.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: "#0a0a10", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80", flexShrink: 0 }} />
        <span style={{ fontSize: 12, color: "#F5F0E8", fontWeight: 500 }}>New lead · <span style={{ color: "#8A8070" }}>Alex Johnson · alex@company.com</span></span>
      </div>
      <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: 0 }}>
        {steps.map((step, i) => (
          <div key={i}>
            <div style={{
              display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10,
              background: activeStep === i ? `${step.color}12` : activeStep > i ? "rgba(74,222,128,0.04)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${activeStep === i ? step.color + "40" : activeStep > i ? "rgba(74,222,128,0.2)" : "rgba(255,255,255,0.05)"}`,
              transition: "all 0.5s ease",
            }}>
              <span style={{ fontSize: 15, flexShrink: 0 }}>{step.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: activeStep === i ? step.color : activeStep > i ? "#4ade80" : "#8A8070", transition: "color 0.3s" }}>{step.label}</div>
                <div style={{ fontSize: 10, color: "#5A5248", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{step.detail}</div>
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
  const { lang } = useLanguage();
  const [visibleLines, setVisibleLines] = useState(0);
  const transcript = lang === "no" ? [
    { role: "ai",   text: "Hei, dette er Aria fra SmartcoreAI — passer det nå?" },
    { role: "lead", text: "Ja, jeg er interessert i chatbot-tjenesten" },
    { role: "ai",   text: "Perfekt! Jeg booker deg inn til en demo — passer torsdag kl. 14?" },
  ] : TRANSCRIPT;
  const ui = lang === "no"
    ? { incoming: "Innkommende lead", answering: "AI svarer", outcome: "Resultat: Møte booket ✓" }
    : { incoming: "Incoming lead", answering: "AI answering", outcome: "Outcome: Meeting booked ✓" };

  useEffect(() => {
    const delay = visibleLines >= TRANSCRIPT.length ? 3000 : visibleLines === 0 ? 700 : 1900;
    const t = setTimeout(() => setVisibleLines(v => v >= TRANSCRIPT.length ? 0 : v + 1), delay);
    return () => clearTimeout(t);
  }, [visibleLines]);

  const done = visibleLines >= TRANSCRIPT.length;

  return (
    <div style={{ background: "#080808", border: "1px solid rgba(212,175,55,0.12)", borderRadius: 16, height: 340, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(212,175,55,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#F5F0E8" }}>{ui.incoming}</div>
          <div style={{ fontSize: 11, color: "#8A8070" }}>+47 900 12 345</div>
        </div>
        <div style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", animation: "blink 1.2s infinite" }} />
          <span style={{ fontSize: 10, fontWeight: 600, color: "#4ade80" }}>{ui.answering}</span>
        </div>
      </div>
      <div style={{ flex: 1, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10, overflowY: "auto" }}>
        {transcript.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, justifyContent: line.role === "lead" ? "flex-end" : "flex-start", animation: "slideUp 0.3s ease both" }}>
            {line.role === "ai" && (
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(212,175,55,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11 }}>🤖</div>
            )}
            <div style={{
              padding: "7px 12px", borderRadius: line.role === "ai" ? "14px 14px 14px 4px" : "14px 14px 4px 14px",
              background: line.role === "ai" ? "rgba(212,175,55,0.08)" : "rgba(10,15,30,0.6)",
              border: `1px solid ${line.role === "ai" ? "rgba(212,175,55,0.18)" : "rgba(245,216,126,0.15)"}`,
              fontSize: 12, color: "#F5F0E8", maxWidth: "82%", lineHeight: 1.5,
            }}>{line.text}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "10px 16px", borderTop: "1px solid rgba(212,175,55,0.08)", display: "flex", alignItems: "center", gap: 8, transition: "opacity 0.5s", opacity: done ? 1 : 0.2 }}>
        <Check size={14} color="#4ade80" />
        <span style={{ fontSize: 12, fontWeight: 600, color: "#4ade80" }}>{ui.outcome}</span>
      </div>
    </div>
  );
}

/* ─── Custom AI Demo ─── */
const AI_STACK_NODES = [
  { icon: "🔔", title: "Website / CRM / WhatsApp", sub: "Trigger sources",         color: "#D4AF37", hero: false },
  { icon: "🤖", title: "AI Brain",                  sub: "Scores, routes & decides", color: "#F5D87E", hero: true  },
  { icon: "📋", title: "CRM Pipeline",              sub: "Auto-updated",            color: "#C9A84C", hero: false },
  { icon: "✉️", title: "Email + SMS",               sub: "Personalized outreach",   color: "#C9A84C", hero: false },
  { icon: "📅", title: "Calendar",                  sub: "Meeting booked",          color: "#4ade80", hero: false },
];

function CustomAIDemo() {
  const { lang } = useLanguage();
  const [dotStep, setDotStep] = useState(0);
  const nodes = lang === "no" ? [
    { icon: "🔔", title: "Website / CRM / WhatsApp", sub: "Triggerkilder",              color: "#D4AF37", hero: false },
    { icon: "🤖", title: "AI-hjerne",                sub: "Skårer, ruter og bestemmer", color: "#F5D87E", hero: true  },
    { icon: "📋", title: "CRM-pipeline",             sub: "Automatisk oppdatert",       color: "#C9A84C", hero: false },
    { icon: "✉️", title: "Email + SMS",              sub: "Personlig oppfølging",       color: "#C9A84C", hero: false },
    { icon: "📅", title: "Kalender",                 sub: "Møte booket",                color: "#4ade80", hero: false },
  ] : AI_STACK_NODES;
  useEffect(() => {
    const t = setInterval(() => setDotStep(s => (s + 1) % AI_STACK_NODES.length), 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="custom-ai-demo" style={{
      background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.06) 0%, #080808 65%)",
      border: "1px solid rgba(212,175,55,0.15)", borderRadius: 16, overflow: "hidden",
      display: "flex", flexDirection: "column", position: "relative",
    }}>
      {/* Dot grid background */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "radial-gradient(circle, rgba(212,175,55,0.07) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }} />

      {/* Header */}
      <div className="custom-ai-header" style={{ position: "relative", zIndex: 1, padding: "10px 14px", borderBottom: "1px solid rgba(212,175,55,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ fontSize: 13, display: "inline-block", animation: "spin 5s linear infinite" }}>⚙️</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: "#D4AF37", textTransform: "uppercase", letterSpacing: "0.1em" }}>{lang === "no" ? "Din skreddersydde AI-stack" : "Your custom AI stack"}</span>
        </div>
        <div className="custom-ai-live" style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", animation: "blink 1.5s infinite" }} />
          <span style={{ fontSize: 10, color: "#8A8070" }}>{lang === "no" ? "Live · Bygger din arbeidsflyt" : "Live · Building your workflow"}</span>
        </div>
      </div>

      {/* Nodes */}
      <div className="custom-ai-nodes" style={{ position: "relative", zIndex: 1, padding: "10px 14px 8px", display: "flex", flexDirection: "column" }}>
        {nodes.map((node, i) => (
          <div key={i}>
            <div className="custom-ai-node" style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: node.hero ? "9px 12px" : "6px 12px", borderRadius: 10,
              background: dotStep === i ? `${node.color}14` : node.hero ? "rgba(34,211,238,0.05)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${dotStep === i ? node.color + "55" : node.hero ? "rgba(34,211,238,0.18)" : "rgba(255,255,255,0.05)"}`,
              boxShadow: node.hero ? (dotStep === i ? `0 0 22px rgba(34,211,238,0.25)` : `0 0 10px rgba(34,211,238,0.1)`) : "none",
              transition: "all 0.4s ease", position: "relative", overflow: "hidden",
            }}>
              {dotStep === i && (
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, transparent, ${node.color}08, transparent)`, animation: "shimmer 1.5s ease infinite", backgroundSize: "200% 100%" }} />
              )}
              <div className="custom-ai-icon" style={{
                width: node.hero ? 32 : 26, height: node.hero ? 32 : 26, borderRadius: 9, flexShrink: 0,
                background: `${node.color}20`, border: `1px solid ${node.color}35`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: node.hero ? 16 : 13,
                animation: node.hero ? "breathe 2.5s ease-in-out infinite" : undefined,
              }}>{node.icon}</div>
              <div style={{ flex: 1 }}>
                <div className="custom-ai-title" style={{ fontSize: node.hero ? 13 : 11, fontWeight: 700, color: dotStep === i ? node.color : node.hero ? "#F5F0E8" : "#8A8070", transition: "color 0.3s", lineHeight: 1.2 }}>{node.title}</div>
                <div style={{ fontSize: 10, color: "#5A5248" }}>{node.sub}</div>
              </div>
              {dotStep === i
                ? <div style={{ width: 7, height: 7, borderRadius: "50%", background: node.color, boxShadow: `0 0 10px ${node.color}`, animation: "blink 1s infinite", flexShrink: 0 }} />
                : i < dotStep ? <Check size={11} color="#4ade80" /> : null}
            </div>
            {i < nodes.length - 1 && (
              <div className="custom-ai-connector" style={{ position: "relative", width: 1, height: 8, marginLeft: 22 }}>
                <div style={{ position: "absolute", inset: 0, background: "rgba(212,175,55,0.15)" }} />
                {dotStep === i && (
                  <div className="custom-ai-travel-dot" style={{ position: "absolute", top: 0, left: -2, width: 5, height: 5, borderRadius: "50%", background: node.color, boxShadow: `0 0 6px ${node.color}`, animation: "travelDown 1.4s linear" }} />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ position: "relative", zIndex: 1, padding: "7px 14px 11px", borderTop: "1px solid rgba(212,175,55,0.08)" }}>
        <span className="custom-ai-footer" style={{ fontSize: 10, color: "rgba(250,204,21,0.45)", letterSpacing: "0.02em" }}>{lang === "no" ? "⚡ Bygget spesifikt for din bedrift · Ubegrensede integrasjoner" : "⚡ Built specifically for your business · Unlimited integrations"}</span>
      </div>
    </div>
  );
}

/* ─── Static service data (icons, colors, prices, demos) ─── */
const SERVICE_META = [
  { id: "chatbot",        icon: <MessageCircle size={20} />, color: "#D4AF37", usdPrice: 299,  originalPrice: 599,  priceCustom: false, demo: <ChatbotDemo /> },
  { id: "leadgen",        icon: <Calendar size={20} />,      color: "#F5D87E", usdPrice: 499,  originalPrice: 999,  priceCustom: false, demo: <LeadgenDemo /> },
  { id: "voice-agent",    icon: <Phone size={20} />,         color: "#C9A84C", usdPrice: 799,  originalPrice: 1599, priceCustom: false, demo: <VoiceAgentDemo /> },
  { id: "ai-integration", icon: <Cpu size={20} />,           color: "#D4AF37", usdPrice: 1500, originalPrice: null, priceCustom: true,  demo: <CustomAIDemo /> },
];

export default function Services() {
  const { t, lang } = useLanguage();
  const [active, setActive] = useState(0);

  const SERVICES = SERVICE_META.map((meta, i) => ({
    ...meta,
    ...t.services.items[i],
    price: meta.priceCustom ? t.services.priceCustom : formatPriceWithPeriod(meta.usdPrice, lang),
    originalPriceDisplay: (!meta.priceCustom && meta.originalPrice) ? formatPrice(meta.originalPrice, lang) : null,
  }));

  const svc = SERVICES[active];

  return (
    <section id="services" style={{ background: "#080808", padding: "100px 24px", position: "relative" }}>
      {/* Spline 3D background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden", opacity: 0.4 }}>
        <SplineBoxes />
      </div>
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="tag" style={{ display: "inline-flex", marginBottom: 16 }}>{t.services.tag}</div>
          <h2 className="text-[22px] sm:text-4xl lg:text-[52px]" style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800, color: "#F5F0E8", letterSpacing: "-0.03em", marginBottom: 14, lineHeight: 1.1,
          }}>
            {t.services.headline1}{" "}
            <span style={{ background: "linear-gradient(135deg,#D4AF37,#F5D87E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {t.services.headline2}
            </span>
          </h2>
          <p style={{ fontSize: 16, color: "#8A8070", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            {t.services.subtext}
          </p>
        </div>

        {/* Tab selector */}
        <div className="services-tabs" style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 10, marginBottom: 36,
          background: "rgba(212,175,55,0.02)", padding: 8, borderRadius: 18,
          border: "1px solid rgba(212,175,55,0.08)",
        }}>
          {SERVICES.map((s, i) => (
            <button key={s.id} onClick={() => setActive(i)} style={{
              padding: "12px 16px", borderRadius: 12, border: "1px solid",
              borderColor: active === i ? s.color + "50" : "transparent",
              background: active === i ? s.color + "12" : "transparent",
              cursor: "pointer", textAlign: "left", transition: "all 0.25s", fontFamily: "inherit",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <div style={{ color: active === i ? s.color : "#8A8070", transition: "color 0.25s" }}>{s.icon}</div>
                <span style={{ fontSize: 13, fontWeight: 600, color: active === i ? "#F5F0E8" : "#8A8070", transition: "color 0.25s" }}>{s.label}</span>
              </div>
              {s.originalPriceDisplay && (
                <div style={{ fontSize: 10, color: "#5A5248", textDecoration: "line-through" }}>{s.originalPriceDisplay}</div>
              )}
              <div style={{ fontSize: 12, color: active === i ? s.color : "#44444e", fontWeight: 600, transition: "color 0.25s" }}>{s.price}</div>
            </button>
          ))}
        </div>

        {/* Main panel */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28,
          background: "rgba(10,15,30,0.5)", border: "1px solid rgba(212,175,55,0.10)",
          borderRadius: 24, padding: 28, backdropFilter: "blur(12px)",
          boxSizing: "border-box", width: "100%",
        }} className="services-grid">
          {/* Left: Info */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 24 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ padding: "6px", borderRadius: 10, background: svc.color + "20", color: svc.color, border: `1px solid ${svc.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>{svc.icon}</div>
                <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 999, background: svc.color + "18", color: svc.color, fontWeight: 600, border: `1px solid ${svc.color}30` }}>{svc.tag}</span>
              </div>
              <h3 className="text-xl md:text-[26px]" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, color: "#F5F0E8", letterSpacing: "-0.02em", marginBottom: 10, lineHeight: 1.2 }}>
                {svc.headline}
              </h3>
              <p style={{ fontSize: 14, color: "#8A8070", lineHeight: 1.7, marginBottom: 24 }}>{svc.desc}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {svc.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#F5F0E8" }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: svc.color + "20", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Check size={10} color={svc.color} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="services-price-row" style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <div>
                {svc.originalPriceDisplay && (
                  <div style={{ fontSize: 12, color: "#8A8070", textDecoration: "line-through", marginBottom: 2 }}>{svc.originalPriceDisplay}</div>
                )}
                <div style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800, color: "#F5F0E8" }}>{svc.price}</div>
                <div style={{ fontSize: 11, color: "#8A8070" }}>{t.services.monthNote}</div>
              </div>
              <a href="/#booking" className="btn-primary services-cta" style={{ marginLeft: "auto" }}>
                {t.services.getStarted} <ChevronRight size={16} />
              </a>
            </div>
          </div>

          {/* Right: Live Demo */}
          <div className="services-demo-panel">
            <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
              <span style={{ fontSize: 11, color: "#8A8070", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {t.services.liveDemo}
              </span>
            </div>
            {svc.demo}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr !important; overflow: hidden; width: 100%; max-width: 100%; box-sizing: border-box; padding: 18px !important; }
          .services-tabs { grid-template-columns: 1fr !important; width: 100%; box-sizing: border-box; }
          .services-demo-panel { width: 100%; max-width: 100%; overflow: hidden; box-sizing: border-box; }
          .services-price-row { gap: 8px !important; }
          .services-cta { margin-left: 0 !important; }
          .custom-ai-demo { width: 100%; max-width: 100%; overflow: hidden; box-sizing: border-box; }
          .custom-ai-header { flex-wrap: wrap; gap: 4px; max-width: 100%; overflow: hidden; }
          .custom-ai-live { display: none; }
          .custom-ai-nodes { width: 100%; max-width: 100%; box-sizing: border-box; overflow: hidden; padding: 8px 10px 6px !important; }
          .custom-ai-node { width: 100%; max-width: 100%; box-sizing: border-box; overflow: hidden; padding: 8px 10px !important; flex-wrap: nowrap !important; }
          .custom-ai-icon { flex-shrink: 0; width: 32px !important; height: 32px !important; }
          .custom-ai-title { font-size: 13px !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
          .custom-ai-connector { max-width: 100%; overflow: hidden; }
          .custom-ai-travel-dot { display: none; }
          .custom-ai-footer { word-break: break-word; overflow-wrap: anywhere; white-space: normal; }
        }
        @keyframes shimmer { from { background-position: -200% 0; } to { background-position: 200% 0; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes travelDown { from { top: 0; opacity: 1; } to { top: 8px; opacity: 0; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes breathe { 0%, 100% { box-shadow: 0 0 18px rgba(212,175,55,0.25); } 50% { box-shadow: 0 0 36px rgba(212,175,55,0.45); } }
      `}</style>
    </section>
  );
}
