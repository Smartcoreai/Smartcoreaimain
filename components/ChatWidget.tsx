"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatWidget() {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [pulseCount, setPulseCount] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset messages when language changes so the welcome is in the right language
  useEffect(() => {
    setMessages([{ role: "assistant", content: t.chat.welcome }]);
    setShowQuickReplies(true);
  }, [lang, t.chat.welcome]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    if (open) return;
    const timer = setTimeout(() => setPulseCount(1), 6000);
    return () => clearTimeout(timer);
  }, [open]);

  async function send(text?: string) {
    const msgText = (text || input).trim();
    if (!msgText || loading) return;
    setInput("");
    setShowQuickReplies(false);

    const newMessages: Message[] = [...messages, { role: "user", content: msgText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, lang }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Sorry, something went wrong. Please try again or email us at hei@smartcoreai.no" }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => { setOpen(true); setPulseCount(0); }}
        aria-label="Open AI chat"
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 9998,
          width: 56, height: 56,
          background: "linear-gradient(135deg, #D4AF37, #B8960C)",
          border: "none", borderRadius: "50%", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 24px rgba(212,175,55,0.45)",
          transition: "all 0.3s ease",
          transform: open ? "scale(0) rotate(90deg)" : "scale(1) rotate(0deg)",
          opacity: open ? 0 : 1,
          pointerEvents: open ? "none" : "auto",
        }}
      >
        <MessageCircle size={24} color="#1A1A1A" />
        <div style={{
          position: "absolute", top: -1, right: -1,
          width: 14, height: 14, background: "#4ade80", borderRadius: "50%",
          border: "2px solid #1A1A1A", boxShadow: "0 0 8px #4ade80",
        }} />
        {pulseCount > 0 && (
          <div style={{
            position: "absolute", inset: -8, borderRadius: "50%",
            border: "2px solid rgba(212,175,55,0.5)",
            animation: "pulseRing 1.5s ease-out 3",
          }} />
        )}
      </button>

      {/* Chat window */}
      <div className="chat-window" style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 9999,
        width: 360, display: "flex", flexDirection: "column",
        background: "#0a0808", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 22, boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
        overflow: "hidden", height: 520,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: open ? "scale(1) translateY(0)" : "scale(0.85) translateY(20px)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transformOrigin: "bottom right",
      }}>
        {/* Header */}
        <div style={{
          padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "linear-gradient(135deg, #1a1408, #0d0c08)",
          borderBottom: "1px solid rgba(212,175,55,0.10)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative" }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: "linear-gradient(135deg,#B8960C,#D4AF37)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Bot size={20} color="white" />
              </div>
              <div style={{ position: "absolute", bottom: -1, right: -1, width: 10, height: 10, background: "#4ade80", borderRadius: "50%", border: "2px solid #0a0808", boxShadow: "0 0 6px #4ade80" }} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#F5F0E8", display: "flex", alignItems: "center", gap: 6 }}>
                Aria <Sparkles size={12} color="#D4AF37" />
              </div>
              <div style={{ fontSize: 11, color: "#8A8070" }}>SmartcoreAI · Always online</div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 8, padding: "6px", color: "#8A8070", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages" style={{ flex: 1, overflowY: "auto", padding: "16px 14px", display: "flex", flexDirection: "column", gap: 12 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: 8, alignItems: "flex-end" }}>
              {m.role === "assistant" && (
                <div style={{ width: 28, height: 28, borderRadius: 9, background: "linear-gradient(135deg,#B8960C,#D4AF37)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Bot size={14} color="white" />
                </div>
              )}
              <div className="chat-bubble" style={{
                padding: "10px 14px",
                borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                background: m.role === "user" ? "linear-gradient(135deg,#B8960C,#D4AF37)" : "rgba(10,15,30,0.9)",
                border: m.role === "assistant" ? "1px solid rgba(212,175,55,0.12)" : "none",
                fontSize: 13, color: m.role === "user" ? "#1A1A1A" : "#F5F0E8", maxWidth: "78%", lineHeight: 1.6,
                whiteSpace: "pre-wrap", wordBreak: "break-word", overflowWrap: "break-word",
              }}>{m.content}</div>
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 9, background: "linear-gradient(135deg,#B8960C,#D4AF37)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Bot size={14} color="white" />
              </div>
              <div style={{ padding: "12px 16px", borderRadius: "18px 18px 18px 4px", background: "rgba(10,15,30,0.9)", border: "1px solid rgba(212,175,55,0.12)", display: "flex", gap: 4, alignItems: "center" }}>
                {[0, 1, 2].map(j => (
                  <div key={j} style={{ width: 5, height: 5, borderRadius: "50%", background: "#D4AF37", animation: `blink 1.2s ${j * 0.2}s step-end infinite` }} />
                ))}
              </div>
            </div>
          )}

          {showQuickReplies && messages.length === 1 && !loading && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
              {t.chat.quickReplies.map(q => (
                <button key={q} onClick={() => send(q)} style={{
                  padding: "8px 14px", textAlign: "left", fontSize: 12, color: "#D4AF37",
                  background: "rgba(212,175,55,0.07)", border: "1px solid rgba(212,175,55,0.18)",
                  borderRadius: 12, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,0.14)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,0.07)"; }}
                >{q}</button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ padding: "12px 14px", borderTop: "1px solid rgba(212,175,55,0.08)", background: "rgba(212,175,55,0.01)" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.10)", borderRadius: 14, padding: "6px 8px 6px 14px" }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
              placeholder={t.chat.placeholder}
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 13, color: "#F5F0E8", fontFamily: "inherit" }}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              style={{
                width: 34, height: 34, borderRadius: 10, border: "none", cursor: input.trim() ? "pointer" : "not-allowed",
                background: input.trim() ? "linear-gradient(135deg,#B8960C,#D4AF37)" : "rgba(212,175,55,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s", flexShrink: 0,
              }}>
              <Send size={14} color={input.trim() ? "#1A1A1A" : "#5A5248"} />
            </button>
          </div>
          <div style={{ textAlign: "center", marginTop: 8, fontSize: 10, color: "#5A5248" }}>
            {t.chat.poweredBy}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
        @keyframes pulseRing { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }
        @media (max-width: 480px) {
          .chat-window { width: calc(100vw - 16px) !important; right: 8px !important; left: 8px !important; }
          .chat-messages { overflow-x: hidden; width: 100%; }
          .chat-bubble { max-width: 85% !important; white-space: normal !important; }
        }
        @media (min-width: 481px) and (max-width: 768px) {
          .chat-window { width: calc(100vw - 32px) !important; }
          .chat-messages { overflow-x: hidden; width: 100%; }
          .chat-bubble { max-width: 85% !important; white-space: normal !important; }
        }
      `}</style>
    </>
  );
}
