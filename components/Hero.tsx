"use client";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// ── Chat messages ─────────────────────────────────────────────────────────────
const CHAT_MSGS = [
  { from: "user", time: "21:34", text: "Hei, har dere ledig time for tannrens i denne uken?" },
  { from: "aria", time: "21:34", text: "Hei Anders! Vi har ledig torsdag kl 14:00 eller fredag kl 10:30. Hvilken passer best?" },
  { from: "user", time: "21:35", text: "Torsdag kl 14 fungerer fint, takk!" },
  { from: "aria", time: "21:35", text: "Perfekt — booket! SMS-bekreftelse sendt ✓" },
];

// Animation timing (ms from IntersectionObserver trigger)
const SEQUENCE = [
  { at: 500,  typing: 0 },
  { at: 2000, show: 0 },
  { at: 2800, typing: 1 },
  { at: 4500, show: 1 },
  { at: 5300, typing: 2 },
  { at: 6800, show: 2 },
  { at: 7600, typing: 3 },
  { at: 9200, show: 3 },
];

// ── Typing indicator ──────────────────────────────────────────────────────────
function TypingIndicator({ isUser }: { isUser: boolean }) {
  const dotColor = isUser ? "rgba(255,255,255,0.65)" : "#9a9aaa";
  return (
    <div style={{
      alignSelf: isUser ? "flex-end" : "flex-start",
      animation: "msgFadeIn 0.2s ease both",
    }}>
      <div style={{
        padding: "8px 12px",
        borderRadius: isUser ? "14px 4px 14px 14px" : "4px 14px 14px 14px",
        background: isUser ? "#1a1a2e" : "#ffffff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
        display: "flex",
        gap: 4,
        alignItems: "center",
        minWidth: 44,
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 5, height: 5, borderRadius: "50%",
            background: dotColor,
            animation: `typing-pulse 1.2s ${i * 0.2}s ease-in-out infinite`,
          }} />
        ))}
      </div>
    </div>
  );
}

// ── Chat bubble ───────────────────────────────────────────────────────────────
function ChatBubble({ msg }: { msg: typeof CHAT_MSGS[0] }) {
  const isUser = msg.from === "user";
  return (
    <div style={{
      alignSelf: isUser ? "flex-end" : "flex-start",
      maxWidth: "86%",
      animation: "msgFadeIn 0.3s ease both",
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

// ── Phone mockup — animated ───────────────────────────────────────────────────
function PhoneMockup() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typingIdx, setTypingIdx]       = useState<number | null>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);
  const started  = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisibleCount(CHAT_MSGS.length);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    function startAnimation() {
      if (started.current) return;
      started.current = true;

      for (const step of SEQUENCE) {
        if ("typing" in step) {
          const idx = step.typing as number;
          timers.push(setTimeout(() => setTypingIdx(idx), step.at));
        }
        if ("show" in step) {
          const n = (step.show as number) + 1;
          timers.push(setTimeout(() => {
            setVisibleCount(n);
            setTypingIdx(null);
          }, step.at));
        }
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const el = wrapRef.current;
    if (el) observer.observe(el);

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={wrapRef} className="phone-mockup-wrap" style={{
      width: "100%",
      maxWidth: 260,
      margin: "0 auto",
      filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.2)) drop-shadow(0 8px 16px rgba(0,0,0,0.08))",
    }}>
      {/* Phone shell — fixed iPhone aspect ratio */}
      <div style={{
        background: "#0f0f1a",
        borderRadius: 44,
        border: "8px solid #1a1a2e",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        aspectRatio: "9 / 19.5",
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

        {/* Chat window — flex: 1 fills remaining height inside fixed aspect-ratio shell */}
        <div style={{
          background: "#f7f6f1",
          borderRadius: "20px 20px 0 0",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          flex: 1,
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

          {/* Messages — animated sequentially */}
          <div style={{
            padding: "10px 10px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            flex: 1,
            overflowY: "hidden",
          }}>
            {CHAT_MSGS.map((msg, i) => (
              <div key={i}>
                {i < visibleCount && <ChatBubble msg={msg} />}
                {typingIdx === i && <TypingIndicator isUser={msg.from === "user"} />}
              </div>
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

// ── CTA handlers ──────────────────────────────────────────────────────────────
function openCalendly(e: React.MouseEvent) {
  e.preventDefault();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).Calendly?.initPopupWidget({
    url: "https://calendly.com/smartcoreaimeeting/new-meeting",
  });
}

function openAriaChat(e: React.MouseEvent) {
  e.preventDefault();
  window.dispatchEvent(new Event("openAriaChat"));
}

// ── Main Hero ─────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section style={{ background: "#ffffff", padding: "48px 24px 64px", overflow: "hidden" }}>
      <div className="wrap">
        <div className="hero-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "56px 80px",
          alignItems: "center",
          maxWidth: 1200,
          margin: "0 auto",
        }}>

          {/* ── Left: text ── */}
          <div>
            {/* Eyebrow */}
            <div style={{
              fontSize: 12, fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#b8902e",
              marginBottom: 20,
            }}>
              For nordiske tannklinikker
            </div>

            {/* H1 — desktop (≥ 768px) */}
            <h1 className="hero-title-desktop" style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
              fontSize: "clamp(28px, 3.4vw, 48px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#1a1a2e",
              margin: "0 0 22px",
            }}>
              Tannklinikkens digitale ekspedient — svarer anropet, booker timen, og henter tilbake pasientene som forsvant.
            </h1>

            {/* H1 — mobile (< 768px) */}
            <h1 className="hero-title-mobile" style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
              fontSize: "clamp(28px, 7vw, 40px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#1a1a2e",
              margin: "0 0 20px",
            }}>
              Tannklinikkens digitale ekspedient — henter tilbake pasientene som forsvant.
            </h1>

            {/* Undertittel */}
            <p style={{
              fontSize: 17,
              color: "#5a5a6e",
              lineHeight: 1.65,
              margin: "0 0 36px",
              maxWidth: 480,
            }}>
              Aria svarer anropet og booker timen. Hun sender påminnelser til eksisterende pasienter, og følger opp nettbesøkende som ikke bookte. Live på 7 dager.
            </p>

            {/* CTAs */}
            <div className="hero-ctas" style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
              {/* Primær: Calendly popup */}
              <a
                href="#"
                onClick={openCalendly}
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
                Book gratis samtale <ArrowRight size={16} />
              </a>

              {/* Sekundær: åpner Aria chatbot */}
              <a
                href="#"
                onClick={openAriaChat}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  padding: "14px 26px", borderRadius: 11,
                  background: "#ffffff", color: "#1a1a2e",
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
                Prøv Aria selv
              </a>
            </div>

            {/* Microcopy */}
            <p style={{
              fontSize: 13, color: "#8a8a98",
              margin: 0, lineHeight: 1.5,
            }}>
              Live på 7 dager · 14-dagers pengene-tilbake-garanti · Svar fra oss innen 4 timer
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
        @keyframes typing-pulse {
          0%, 60%, 100% { opacity: 0.3; }
          30%            { opacity: 1; }
        }

        /* Mobile < 768px: stacked, telefon skjult, CTAs fullbredde */
        @media (max-width: 767px) {
          .hero-grid          { grid-template-columns: 1fr !important; gap: 48px !important; }
          .hero-phone         { display: none !important; }
          .hero-title-desktop { display: none !important; }
          .hero-title-mobile  { display: block !important; }
          .hero-ctas          { flex-direction: column !important; }
          .hero-ctas a        { justify-content: center !important; }
        }

        /* Desktop ≥ 768px: skjul kort mobiltittel */
        @media (min-width: 768px) {
          .hero-title-mobile  { display: none !important; }
          .hero-title-desktop { display: block !important; }
        }

        /* Tablet 768–1023px: 2 kolonner, smalere gap og telefon */
        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-grid         { gap: 32px 40px !important; }
          .phone-mockup-wrap { max-width: 220px !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          @keyframes msgFadeIn    { from { opacity: 1; } to { opacity: 1; } }
          @keyframes typing-pulse { from { opacity: 1; } to { opacity: 1; } }
        }
      `}</style>
    </section>
  );
}
