"use client";
import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

type Message = { role: "user" | "assistant"; content: string };

// Soft pastels for the halo + accents (kept literal because the demo specifies
// these exact tones — they read calmer than the more saturated --lp-lavender
// once filtered through opacity/blur).
const LAVENDER = "#ebe4f7";
const PEACH = "#fce4d3";

export default function ChatWidget() {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, [open]);

  // External components can pop the widget via a custom event (legacy hook,
  // kept for the openAriaChat dispatcher in older components).
  useEffect(() => {
    const handler = () => { setOpen(true); };
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
      if (res.status === 429) {
        const data = await res.json();
        setMessages([...newMessages, { role: "assistant", content: data.error ?? "Du har sendt for mange meldinger. Prøv igjen om en time." }]);
        setLoading(false);
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setMessages([...newMessages, { role: "assistant", content: data.error ?? "Noe gikk galt. Prøv en kortere melding." }]);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Noe gikk galt. Prøv igjen eller book en gratis samtale: https://calendly.com/smartcoreaimeeting/new-meeting" }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating pill: compact → expanded once after 5s, then resting */}
      <div
        className="chatbot-widget"
        style={{
          position: "fixed", bottom: 32, right: 32, zIndex: 9998,
          opacity: open ? 0 : 1,
          transform: open ? "scale(0.85) translateY(8px)" : "scale(1) translateY(0)",
          pointerEvents: open ? "none" : "auto",
          transition: "opacity 0.25s ease, transform 0.3s ease",
        }}
      >
        <button
          type="button"
          className="chatbot-pill"
          onClick={() => setOpen(true)}
          aria-label={t.chat.openLabel}
        >
          <span className="chatbot-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <circle cx="8" cy="10" r="0.8" fill="currentColor" />
              <circle cx="12" cy="10" r="0.8" fill="currentColor" />
              <circle cx="16" cy="10" r="0.8" fill="currentColor" />
            </svg>
          </span>
          <span className="chatbot-message">
            {t.chat.teaserPre} <em>{t.chat.teaserEm}</em>{t.chat.teaserPost}{" "}
            <span className="chatbot-arrow" aria-hidden="true">→</span>
          </span>
        </button>
        <span className="chatbot-status" aria-hidden="true" />
      </div>

      {/* Mobile backdrop — only visible under 640px when chat is open */}
      <div
        className="chat-backdrop"
        onClick={() => setOpen(false)}
        aria-hidden="true"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      />

      {/* Chat window */}
      <div className="chat-window" style={{
        position: "fixed", bottom: 32, right: 32, zIndex: 9999,
        width: 368, display: "flex", flexDirection: "column",
        background: "linear-gradient(180deg, #1a1a2e 0%, #242442 50%, #1a1a2e 100%)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 22,
        boxShadow: "0 24px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(184,168,232,0.08)",
        overflow: "hidden", height: 540,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: open ? "scale(1) translateY(0)" : "scale(0.85) translateY(20px)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transformOrigin: "bottom right",
      }}>
        {/* Header */}
        <div style={{
          padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(0,0,0,0.22)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative" }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14,
                background: "linear-gradient(135deg, #0f0f1f, #2a2a4a)",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 12px rgba(26,26,46,0.4)",
              }}>
                <Bot size={22} color={LAVENDER} />
              </div>
              <div style={{
                position: "absolute", top: -3, right: -3,
                width: 13, height: 13, background: "#22c55e", borderRadius: "50%",
                border: "2.5px solid #1a1a2e",
                boxShadow: "0 0 6px rgba(34,197,94,0.7)",
              }} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#F5F0E8", display: "flex", alignItems: "center", gap: 6 }}>
                Ekspedenten <Sparkles size={12} color={LAVENDER} />
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.40)" }}>Always online</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t.chat.closeLabel}
            style={{
              width: 44, height: 44,
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 10, padding: 0, color: "rgba(255,255,255,0.55)",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.14)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
          >
            <X size={18} />
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
                  border: "1px solid rgba(255,255,255,0.10)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Bot size={16} color={LAVENDER} />
                </div>
              )}
              <div className="chat-bubble" style={{
                padding: "10px 14px",
                borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                background: m.role === "user"
                  ? `linear-gradient(135deg, ${LAVENDER}, ${PEACH})`
                  : "linear-gradient(135deg, #242442, #2e2e54)",
                border: m.role === "assistant" ? "1px solid rgba(255,255,255,0.08)" : "none",
                fontSize: 13, color: m.role === "user" ? "#1a1a2e" : "#F0EDE8",
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
                border: "1px solid rgba(255,255,255,0.10)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Bot size={16} color={LAVENDER} />
              </div>
              <div style={{
                padding: "12px 16px", borderRadius: "18px 18px 18px 4px",
                background: "linear-gradient(135deg, #242442, #2e2e54)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex", gap: 4, alignItems: "center",
              }}>
                {[0, 1, 2].map(j => (
                  <div key={j} style={{ width: 5, height: 5, borderRadius: "50%", background: LAVENDER, animation: `blink 1.2s ${j * 0.2}s step-end infinite` }} />
                ))}
              </div>
            </div>
          )}

          {showQuickReplies && messages.length === 1 && !loading && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
              {t.chat.quickReplies.map(q => (
                <button key={q} onClick={() => send(q)} style={{
                  padding: "8px 14px", textAlign: "left", fontSize: 12,
                  color: LAVENDER,
                  background: "rgba(216,201,237,0.08)",
                  border: "1px solid rgba(216,201,237,0.22)",
                  borderRadius: 12, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(216,201,237,0.16)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(216,201,237,0.08)"; }}
                >{q}</button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: "12px 14px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(0,0,0,0.20)",
        }}>
          <div style={{
            display: "flex", gap: 8, alignItems: "center",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
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
              type="button"
              onClick={() => send()}
              disabled={!input.trim() || loading}
              aria-label="Send"
              style={{
                width: 34, height: 34, borderRadius: 10, border: "none",
                cursor: input.trim() ? "pointer" : "not-allowed",
                background: input.trim()
                  ? `linear-gradient(135deg, ${LAVENDER}, ${PEACH})`
                  : "rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s", flexShrink: 0,
              }}>
              <Send size={14} color={input.trim() ? "#1a1a2e" : "rgba(255,255,255,0.25)"} />
            </button>
          </div>
          <div style={{ textAlign: "center", marginTop: 8, fontSize: 10, color: "rgba(255,255,255,0.35)" }}>
            {t.chat.poweredBy}
          </div>
        </div>
      </div>

      <style>{`
        /* ── New pill widget ───────────────────────────────────────────── */
        .chatbot-pill {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0;
          height: 64px;
          width: 64px;
          background: #1a1a2e;
          border: none;
          border-radius: 999px;
          padding: 0;
          margin: 0;
          color: white;
          cursor: pointer;
          overflow: hidden;
          font-family: inherit;
          box-shadow:
            0 12px 32px -8px rgba(26, 26, 46, 0.32),
            0 4px 12px -2px rgba(26, 26, 46, 0.18);
          transition:
            width 700ms cubic-bezier(0.22, 1, 0.36, 1),
            background 700ms ease;
          animation: chatbot-once 7s ease-in-out 5s 1 forwards;
        }
        .chatbot-pill::before {
          content: "";
          position: absolute;
          inset: -8px;
          border-radius: 999px;
          background: conic-gradient(
            from 0deg,
            ${LAVENDER} 0%,
            ${PEACH} 25%,
            ${LAVENDER} 50%,
            ${PEACH} 75%,
            ${LAVENDER} 100%
          );
          z-index: -1;
          opacity: 0.55;
          filter: blur(14px);
          animation:
            chatbot-halo-rotate 8s linear infinite,
            chatbot-halo-breathe 3s ease-in-out infinite;
        }
        .chatbot-pill::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 999px;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(216, 201, 237, 0.18) 0%,
            transparent 60%
          );
          pointer-events: none;
        }

        .chatbot-icon {
          position: relative;
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          z-index: 2;
        }
        .chatbot-icon svg {
          width: 26px;
          height: 26px;
          color: white;
          animation: chatbot-icon-float 3s ease-in-out infinite;
        }

        .chatbot-message {
          flex-shrink: 0;
          padding: 0 22px 0 4px;
          color: white;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.005em;
          white-space: nowrap;
          opacity: 0;
          transform: translateX(8px);
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 8px;
          animation: chatbot-message-once 7s ease-in-out 5s 1 forwards;
        }
        .chatbot-message em {
          font-style: italic;
          font-weight: 500;
          color: ${LAVENDER};
        }
        .chatbot-arrow {
          color: ${PEACH};
          font-size: 18px;
          margin-top: -2px;
        }

        /* Hover: pause the one-shot animation, hold expanded */
        .chatbot-widget:hover .chatbot-pill {
          width: 320px;
          animation-play-state: paused;
        }
        .chatbot-widget:hover .chatbot-message {
          opacity: 1;
          transform: translateX(0);
          animation-play-state: paused;
        }

        .chatbot-status {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 14px;
          height: 14px;
          background: #4ade80;
          border: 2px solid #1a1a2e;
          border-radius: 50%;
          z-index: 5;
          animation: chatbot-status-pulse 2s ease-in-out infinite;
        }

        @keyframes chatbot-once {
          0%   { width: 64px; }
          25%  { width: 320px; }
          75%  { width: 320px; }
          100% { width: 64px; }
        }
        @keyframes chatbot-message-once {
          0%, 25%   { opacity: 0; transform: translateX(8px); }
          35%, 70%  { opacity: 1; transform: translateX(0); }
          80%, 100% { opacity: 0; transform: translateX(8px); }
        }
        @keyframes chatbot-halo-rotate {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes chatbot-halo-breathe {
          0%, 100% { opacity: 0.4; }
          50%      { opacity: 0.65; }
        }
        @keyframes chatbot-icon-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-2px); }
        }
        @keyframes chatbot-status-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.5); }
          50%      { box-shadow: 0 0 0 6px rgba(74, 222, 128, 0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.2; }
        }

        /* Scrollbar — soft lavender thumb on transparent track */
        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-track { background: transparent; }
        .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(216, 201, 237, 0.28);
          border-radius: 2px;
        }

        /* Respect prefers-reduced-motion: kill all looping/teaser animations */
        @media (prefers-reduced-motion: reduce) {
          .chatbot-pill,
          .chatbot-pill::before,
          .chatbot-message,
          .chatbot-icon svg,
          .chatbot-status {
            animation: none !important;
          }
        }

        /* Backdrop only exists on mobile. Hidden on desktop. */
        .chat-backdrop { display: none; }

        /* Mobile: chat becomes a bottom-anchored panel (85dvh) with a
           dimmed backdrop behind so the page is still partly visible
           through the top ~15% — tap there to close. */
        @media (max-width: 640px) {
          .chat-backdrop {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(10, 12, 24, 0.45);
            z-index: 9997;
            transition: opacity 0.3s ease;
          }
          .chat-window {
            top: auto !important;
            right: 0 !important;
            bottom: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 85dvh !important;
            max-height: 85dvh !important;
            border-radius: 20px 20px 0 0 !important;
            border: none !important;
            transform-origin: bottom center !important;
          }
          .chat-messages { overflow-x: hidden; width: 100%; }
          .chat-bubble { max-width: 85% !important; white-space: normal !important; }
        }
        @media (min-width: 641px) and (max-width: 768px) {
          .chat-window { width: calc(100vw - 32px) !important; }
          .chat-messages { overflow-x: hidden; width: 100%; }
          .chat-bubble { max-width: 85% !important; white-space: normal !important; }
        }
      `}</style>
    </>
  );
}
