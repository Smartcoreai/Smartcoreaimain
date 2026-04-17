"use client";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";

// ── Chat messages (hardcoded Norwegian — dental clinic demo) ──────────────────
const CHAT_MSGS = [
  { from: "user",  time: "21:34", text: "Hei, har dere ledig time for tannrens i denne uken?" },
  { from: "aria",  time: "21:34", text: "Hei Anders! Vi har ledig torsdag kl 14:00 eller fredag kl 10:30. Hvilken passer best?" },
  { from: "user",  time: "21:35", text: "Torsdag kl 14 fungerer fint, takk!" },
  { from: "aria",  time: "21:35", text: "Perfekt — jeg har booket deg inn. Du får en SMS-bekreftelse nå. Vi ses torsdag! 🎉" },
];

// ── Phase system ──────────────────────────────────────────────────────────────
// 0  → 1   initial pause             600ms
// 1  → 2   after user msg 1          900ms
// 2  → 3   aria typing indicator    1300ms
// 3  → 4   after aria msg 1          900ms
// 4  → 5   after user msg 2          900ms
// 5  → 6   aria typing indicator    1300ms
// 6  → 7   after aria msg 2          700ms
// 7  → 8   booking card visible     4000ms
// 8          fade-out → reset
const DURATIONS = [600, 900, 1300, 900, 900, 1300, 700, 4000];

// ── Sub-components ────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "10px 14px" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: 6, height: 6, borderRadius: "50%",
            background: "#b8902e", opacity: 0.5,
            animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function ChatBubble({ msg, visible }: { msg: typeof CHAT_MSGS[0]; visible: boolean }) {
  const isUser = msg.from === "user";
  return (
    <div style={{
      alignSelf: isUser ? "flex-end" : "flex-start",
      maxWidth: "86%",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(8px)",
      transition: "opacity 0.35s cubic-bezier(0.22,1,0.36,1), transform 0.35s cubic-bezier(0.22,1,0.36,1)",
    }}>
      <div style={{
        padding: "9px 12px",
        borderRadius: isUser ? "14px 4px 14px 14px" : "4px 14px 14px 14px",
        background: isUser ? "#1a1a2e" : "#ffffff",
        color: isUser ? "#ffffff" : "#1a1a2e",
        fontSize: 12,
        lineHeight: 1.5,
        boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
      }}>
        {!isUser && (
          <div style={{ fontSize: 9.5, fontWeight: 700, color: "#b8902e", marginBottom: 3, letterSpacing: "0.02em" }}>
            Aria ✨
          </div>
        )}
        {msg.text}
      </div>
      <div style={{
        fontSize: 9.5, color: "#8a8a98", marginTop: 2,
        textAlign: isUser ? "right" : "left",
        paddingLeft: 2, paddingRight: 2,
      }}>
        {msg.time}
      </div>
    </div>
  );
}

function BookingCard({ visible }: { visible: boolean }) {
  return (
    <div style={{
      background: "#ffffff",
      border: "1px solid #e8e6dc",
      borderRadius: 12,
      padding: "10px 12px",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.97)",
      transition: "opacity 0.4s cubic-bezier(0.22,1,0.36,1), transform 0.4s cubic-bezier(0.22,1,0.36,1)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <div style={{
          width: 26, height: 26, borderRadius: "50%",
          background: "rgba(45,122,79,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, fontSize: 13,
        }}>
          ✓
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#2d7a4f" }}>Booking bekreftet</div>
          <div style={{ fontSize: 10, color: "#5a5a6e" }}>Torsdag kl 14:00 · Tannrens</div>
        </div>
      </div>
      <div style={{
        fontSize: 10, color: "#8a8a98",
        borderTop: "1px solid #f0eee5",
        paddingTop: 6,
      }}>
        SMS-bekreftelse sendt til Anders ✓
      </div>
    </div>
  );
}

function PhoneMockup() {
  const [phase, setPhase] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (phase >= DURATIONS.length) {
      setFading(true);
      const id = setTimeout(() => {
        setPhase(0);
        setFading(false);
      }, 850);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setPhase((p) => p + 1), DURATIONS[phase]);
    return () => clearTimeout(id);
  }, [phase]);

  return (
    <div style={{
      width: "100%",
      maxWidth: 278,
      margin: "0 auto",
      filter: "drop-shadow(0 28px 56px rgba(26,26,46,0.16)) drop-shadow(0 8px 16px rgba(0,0,0,0.08))",
    }}>
      {/* Phone shell — always stationary */}
      <div style={{
        background: "#0f0f1a",
        borderRadius: 40,
        padding: "10px 10px 16px",
        border: "1px solid rgba(255,255,255,0.06)",
        maxHeight: 520,
        overflow: "hidden",
      }}>
        {/* Status bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "6px 20px 8px",
        }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.65)" }}>21:34</span>
          <div style={{
            width: 56, height: 9,
            background: "#0f0f1a",
            borderRadius: 5,
            border: "1px solid rgba(255,255,255,0.08)",
          }} />
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{
              width: 13, height: 7, borderRadius: 2,
              border: "1.5px solid rgba(255,255,255,0.45)",
              position: "relative",
            }}>
              <div style={{
                position: "absolute", top: 1, left: 1,
                width: "60%", height: "calc(100% - 2px)",
                background: "#4ade80", borderRadius: 1,
              }} />
            </div>
          </div>
        </div>

        {/* Chat window — fades between cycles, shell stays visible */}
        <div style={{
          background: "#f7f6f1", borderRadius: 28, overflow: "hidden",
          opacity: fading ? 0 : 1,
          transition: "opacity 0.85s ease",
        }}>
          {/* Chat header */}
          <div style={{
            background: "#1a1a2e",
            padding: "11px 14px",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "linear-gradient(135deg, #b8902e, #d4af37)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 800, color: "#fff", flexShrink: 0,
            }}>
              A
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#ffffff" }}>Aria — AI Resepsjonist</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 4px #4ade80" }} />
                <span style={{ fontSize: 9.5, color: "#4ade80", fontWeight: 600 }}>Online</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            padding: "12px 10px",
            display: "flex",
            flexDirection: "column",
            gap: 7,
            minHeight: 220,
            overflow: "hidden",
          }}>
            <ChatBubble msg={CHAT_MSGS[0]} visible={phase >= 1} />

            {/* Aria typing 1 — scaleY so layout height never changes */}
            <div style={{
              alignSelf: "flex-start",
              background: "#ffffff",
              borderRadius: "4px 14px 14px 14px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
              opacity: phase === 2 ? 1 : 0,
              transform: phase === 2 ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "top left",
              transition: "opacity 0.25s ease, transform 0.25s ease",
            }}>
              <TypingDots />
            </div>

            <ChatBubble msg={CHAT_MSGS[1]} visible={phase >= 3} />
            <ChatBubble msg={CHAT_MSGS[2]} visible={phase >= 4} />

            {/* Aria typing 2 — scaleY so layout height never changes */}
            <div style={{
              alignSelf: "flex-start",
              background: "#ffffff",
              borderRadius: "4px 14px 14px 14px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
              opacity: phase === 5 ? 1 : 0,
              transform: phase === 5 ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "top left",
              transition: "opacity 0.25s ease, transform 0.25s ease",
            }}>
              <TypingDots />
            </div>

            <ChatBubble msg={CHAT_MSGS[3]} visible={phase >= 6} />
            <BookingCard visible={phase >= 7} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Hero ─────────────────────────────────────────────────────────────────
export default function Hero() {
  const { t } = useLanguage();

  return (
    <section style={{ background: "#ffffff", padding: "72px 24px 96px", overflow: "hidden" }}>
      <div className="wrap">
        <div className="hero-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "56px 80px",
          alignItems: "center",
          maxWidth: 1080,
          margin: "0 auto",
        }}>
          {/* ── Left: text ── */}
          <div>
            {/* Eyebrow */}
            <div style={{
              fontSize: 13, fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#b8902e",
              marginBottom: 20,
            }}>
              {t.hero.tag}
            </div>

            {/* H1 */}
            <h1 style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
              fontSize: "clamp(34px, 4.2vw, 54px)",
              fontWeight: 600,
              lineHeight: 1.09,
              letterSpacing: "-0.02em",
              color: "#1a1a2e",
              margin: "0 0 22px",
            }}>
              {t.hero.headlineNew}
            </h1>

            {/* Sub */}
            <p style={{
              fontSize: 17,
              color: "#5a5a6e",
              lineHeight: 1.65,
              margin: "0 0 36px",
              maxWidth: 470,
            }}>
              {t.hero.subNew}
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 22 }}>
              <a
                href="#booking"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  padding: "14px 26px", borderRadius: 11,
                  background: "#1a1a2e", color: "#ffffff",
                  fontSize: 15, fontWeight: 600, textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(26,26,46,0.18)",
                  transition: "background 0.2s, transform 0.2s",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#2d2d4e";
                  el.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#1a1a2e";
                  el.style.transform = "translateY(0)";
                }}
              >
                {t.hero.ctaPrimary} <ArrowRight size={16} />
              </a>

              <a
                href="#services"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  padding: "14px 26px", borderRadius: 11,
                  background: "transparent", color: "#1a1a2e",
                  border: "1.5px solid #e8e6dc",
                  fontSize: 15, fontWeight: 600, textDecoration: "none",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#b8902e";
                  el.style.color = "#b8902e";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#e8e6dc";
                  el.style.color = "#1a1a2e";
                }}
              >
                {t.hero.ctaSecondary}
              </a>
            </div>

            {/* Trust line */}
            <p style={{
              fontSize: 13, color: "#8a8a98",
              margin: 0, lineHeight: 1.5,
            }}>
              {t.hero.trustLine}
            </p>
          </div>

          {/* ── Right: phone mockup ── */}
          <div className="hero-phone" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <PhoneMockup />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .hero-phone { display: none !important; }
        }
      `}</style>
    </section>
  );
}
