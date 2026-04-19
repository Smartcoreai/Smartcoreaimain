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

  // Allow any component to open the widget via a custom event
  useEffect(() => {
    const handler = () => { setOpen(true); setPulseCount(0); };
    window.addEventListener("openAriaChat", handler);
    return () => window.removeEventListener("openAriaChat", handler);
  }, []);

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
      setMessages([...newMessages, { role: "assistant", content: "Sorry, something went wrong. Please try again or email us at hei@ekspedenten.no" }]);
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
        className="aria-chat-btn"
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 9998,
          width: 68, height: 68,
          background: "linear-gradient(135deg, #1a1a2e 0%, #2a2a4a 50%, #1a1a2e 100%)",
          borderRadius: "50%", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3), 0 0 12px 2px rgba(212,175,55,0.4), 0 0 30px 6px rgba(212,175,55,0.25), 0 0 60px 12px rgba(212,175,55,0.15)",
          transition: "transform 0.3s ease, box-shadow 0.4s ease, opacity 0.3s",
          transform: open ? "scale(0) rotate(90deg)" : "scale(1) rotate(0deg)",
          opacity: open ? 0 : 1,
          pointerEvents: open ? "none" : "auto",
          overflow: "visible",
          padding: 0,
        }}
      >
        {/* Inner wrapper for shimmer (overflow: hidden scoped here) */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          overflow: "hidden", pointerEvents: "none",
        }}>
          <div className="aria-btn-shimmer" />
        </div>

        <MessageCircle size={28} color="#D4AF37" style={{ position: "relative", zIndex: 2 }} />

        {/* Green online dot — outside the overflow:hidden wrapper */}
        <div style={{
          position: "absolute", top: -2, right: -2,
          width: 16, height: 16, background: "#22c55e", borderRadius: "50%",
          border: "2.5px solid #f7f6f1",
          zIndex: 10,
          animation: "dot-pulse 2.5s ease-in-out infinite",
        }} />

        {pulseCount > 0 && (
          <div style={{
            position: "absolute", inset: -8, borderRadius: "50%",
            border: "2px solid rgba(212,175,55,0.5)",
            animation: "pulseRing 1.5s ease-out 3",
            zIndex: 1,
          }} />
        )}
      </button>

      {/* Chat window */}
      <div className="chat-window" style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 9999,
        width: 368, display: "flex", flexDirection: "column",
        background: "linear-gradient(180deg, #1a1a2e 0%, #242442 50%, #1a1a2e 100%)",
        border: "1.5px solid #b8902e",
        borderRadius: 22,
        boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(184,144,46,0.1)",
        overflow: "hidden", height: 540,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: open ? "scale(1) translateY(0)" : "scale(0.85) translateY(20px)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transformOrigin: "bottom right",
      }}>
        {/* Shimmer stripe at top of widget */}
        <div className="aria-widget-shimmer-stripe" />

        {/* Header */}
        <div style={{
          padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(0,0,0,0.25)",
          borderBottom: "1px solid rgba(184,144,46,0.15)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative" }}>
              {/* Header avatar */}
              <div style={{
                width: 44, height: 44, borderRadius: 14,
                background: "linear-gradient(135deg, #0f0f1f, #2a2a4a)",
                border: "1.5px solid #b8902e",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 12px rgba(184,144,46,0.2)",
              }}>
                <Bot size={22} color="#b8902e" />
              </div>
              {/* Green dot outside avatar */}
              <div style={{
                position: "absolute", top: -3, right: -3,
                width: 13, height: 13, background: "#22c55e", borderRadius: "50%",
                border: "2.5px solid #1a1a2e",
                boxShadow: "0 0 6px rgba(34,197,94,0.8)",
              }} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#F5F0E8", display: "flex", alignItems: "center", gap: 6 }}>
                Aria <Sparkles size={12} color="#D4AF37" />
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.40)" }}>Ekspedenten · Always online</div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 8, padding: "6px", color: "rgba(255,255,255,0.50)",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.14)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages" style={{ flex: 1, overflowY: "auto", padding: "16px 14px", display: "flex", flexDirection: "column", gap: 12 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: 8, alignItems: "flex-end" }}>
              {m.role === "assistant" && (
                <div style={{
                  width: 32, height: 32, borderRadius: 10,
                  background: "linear-gradient(135deg, #0f0f1f, #2a2a4a)",
                  border: "1.5px solid rgba(184,144,46,0.5)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Bot size={16} color="#b8902e" />
                </div>
              )}
              <div className="chat-bubble" style={{
                padding: "10px 14px",
                borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                background: m.role === "user"
                  ? "linear-gradient(135deg, #B8960C, #D4AF37)"
                  : "linear-gradient(135deg, #242442, #2e2e54)",
                border: m.role === "assistant" ? "1px solid rgba(184,144,46,0.18)" : "none",
                fontSize: 13, color: m.role === "user" ? "#1A1A1A" : "#F0EDE8",
                maxWidth: "78%", lineHeight: 1.6,
                whiteSpace: "pre-wrap", wordBreak: "break-word", overflowWrap: "break-word",
              }}>{m.content}</div>
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10,
                background: "linear-gradient(135deg, #0f0f1f, #2a2a4a)",
                border: "1.5px solid rgba(184,144,46,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Bot size={16} color="#b8902e" />
              </div>
              <div style={{
                padding: "12px 16px", borderRadius: "18px 18px 18px 4px",
                background: "linear-gradient(135deg, #242442, #2e2e54)",
                border: "1px solid rgba(184,144,46,0.18)",
                display: "flex", gap: 4, alignItems: "center",
              }}>
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
                  background: "rgba(212,175,55,0.07)", border: "1px solid rgba(212,175,55,0.20)",
                  borderRadius: 12, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,0.15)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,0.07)"; }}
                >{q}</button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: "12px 14px",
          borderTop: "1px solid rgba(184,144,46,0.12)",
          background: "rgba(0,0,0,0.20)",
        }}>
          <div style={{
            display: "flex", gap: 8, alignItems: "center",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(184,144,46,0.18)",
            borderRadius: 14, padding: "6px 8px 6px 14px",
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
              placeholder={t.chat.placeholder}
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                fontSize: 13, color: "#F5F0E8", fontFamily: "inherit",
              }}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              style={{
                width: 34, height: 34, borderRadius: 10, border: "none",
                cursor: input.trim() ? "pointer" : "not-allowed",
                background: input.trim()
                  ? "linear-gradient(135deg, #B8960C, #D4AF37)"
                  : "rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s", flexShrink: 0,
              }}>
              <Send size={14} color={input.trim() ? "#1A1A1A" : "rgba(255,255,255,0.25)"} />
            </button>
          </div>
          <div style={{ textAlign: "center", marginTop: 8, fontSize: 10, color: "rgba(255,255,255,0.35)" }}>
            {t.chat.poweredBy}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
        @keyframes pulseRing { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }

        @keyframes dot-pulse {
          0%   { box-shadow: 0 0 0 0   rgba(34,197,94,0.7); }
          70%  { box-shadow: 0 0 0 6px rgba(34,197,94,0);   }
          100% { box-shadow: 0 0 0 0   rgba(34,197,94,0);   }
        }
        @keyframes aria-shimmer { 0% { left: -100%; } 100% { left: 100%; } }
        @keyframes aria-widget-shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }

        /* Shimmer stripe on the floating button (inside inner wrapper) */
        .aria-btn-shimmer {
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(212,175,55,0.45), transparent);
          animation: aria-shimmer 3.5s infinite;
          pointer-events: none;
        }

        /* Gold shimmer stripe at top of widget */
        .aria-widget-shimmer-stripe {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, #b8902e 30%, #D4AF37 50%, #b8902e 70%, transparent 100%);
          overflow: hidden;
          z-index: 5;
        }
        .aria-widget-shimmer-stripe::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 25%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          animation: aria-widget-shimmer 3s 1s ease-in-out infinite;
        }


        .aria-chat-btn:hover {
          transform: scale(1.05) !important;
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.3), 0 0 16px 4px rgba(212,175,55,0.5), 0 0 40px 10px rgba(212,175,55,0.35), 0 0 80px 16px rgba(212,175,55,0.2) !important;
        }

        /* Scrollbar styling for messages */
        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-track { background: transparent; }
        .chat-messages::-webkit-scrollbar-thumb { background: rgba(184,144,46,0.3); border-radius: 2px; }

        @media (prefers-reduced-motion: reduce) {
          .aria-btn-shimmer { animation: none; }

          .aria-widget-shimmer-stripe::after { animation: none; }
          @keyframes dot-pulse { 0%, 100% { box-shadow: none; } }
        }
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
