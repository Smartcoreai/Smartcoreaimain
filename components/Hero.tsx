"use client";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

// ── Chat messages — static, short ────────────────────────────────────────────
const CHAT_MSGS = [
  { from: "user", time: "21:34", text: "Hei, har dere ledig time for tannrens i denne uken?" },
  { from: "aria", time: "21:34", text: "Hei Anders! Vi har ledig torsdag kl 14:00 eller fredag kl 10:30. Hvilken passer best?" },
  { from: "user", time: "21:35", text: "Torsdag kl 14 fungerer fint, takk!" },
  { from: "aria", time: "21:35", text: "Perfekt — booket! SMS-bekreftelse sendt ✓" },
];

// ── Chat bubble ───────────────────────────────────────────────────────────────
function ChatBubble({ msg, delay }: { msg: typeof CHAT_MSGS[0]; delay: number }) {
  const isUser = msg.from === "user";
  return (
    <div style={{
      alignSelf: isUser ? "flex-end" : "flex-start",
      maxWidth: "86%",
      animation: `msgFadeIn 0.25s ease both`,
      animationDelay: `${delay}ms`,
    }}>
      <div style={{
        padding: "8px 12px",
        borderRadius: isUser ? "14px 4px 14px 14px" : "4px 14px 14px 14px",
        background: isUser ? "#1a1a2e" : "#ffffff",
        color: isUser ? "#ffffff" : "#1a1a2e",
        fontSize: 12.5,
        lineHeight: 1.45,
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

// ── Phone mockup — static ─────────────────────────────────────────────────────
function PhoneMockup() {
  return (
    <div style={{
      width: "100%",
      maxWidth: 300,
      margin: "0 auto",
      filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.2)) drop-shadow(0 8px 16px rgba(0,0,0,0.08))",
    }}>
      {/* Phone shell */}
      <div style={{
        background: "#0f0f1a",
        borderRadius: 44,
        border: "8px solid #1a1a2e",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        maxHeight: 480,
      }}>
        {/* Dynamic Island */}
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 10, paddingBottom: 2, background: "#0f0f1a", flexShrink: 0 }}>
          <div style={{ width: 120, height: 26, borderRadius: 13, background: "#000" }} />
        </div>

        {/* Status bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "3px 20px 6px", background: "#0f0f1a", flexShrink: 0,
        }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.65)" }}>21:34</span>
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

        {/* Chat window */}
        <div style={{
          background: "#f7f6f1",
          borderRadius: "20px 20px 0 0",
          overflow: "hidden",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}>
          {/* Chat header */}
          <div style={{
            background: "#1a1a2e",
            padding: "10px 14px",
            display: "flex", alignItems: "center", gap: 10,
            flexShrink: 0,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "linear-gradient(135deg, #b8902e, #d4af37)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 800, color: "#fff", flexShrink: 0,
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

          {/* Messages — all static */}
          <div style={{
            padding: "10px 10px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            overflow: "hidden",
          }}>
            {CHAT_MSGS.map((msg, i) => (
              <ChatBubble key={i} msg={msg} delay={i * 200} />
            ))}
          </div>
        </div>

        {/* Home indicator */}
        <div style={{
          display: "flex", justifyContent: "center",
          paddingTop: 8, paddingBottom: 8,
          background: "#0f0f1a", flexShrink: 0,
        }}>
          <div style={{ width: 134, height: 5, borderRadius: 3, background: "rgba(255,255,255,0.3)" }} />
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
        @keyframes msgFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .hero-phone { display: none !important; }
        }
      `}</style>
    </section>
  );
}
