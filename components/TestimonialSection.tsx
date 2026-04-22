"use client";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";

type Module = {
  label: string;
  title: string;
  desc: string;
  features: readonly string[];
};

// ── Count-up ──────────────────────────────────────────────────────────────────
function useCountUp(target: number, duration: number, triggered: boolean) {
  const [val, setVal] = useState(target);
  useEffect(() => {
    if (!triggered) return;
    let cur = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      cur = Math.min(cur + step, target);
      setVal(Math.floor(cur));
      if (cur >= target) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [triggered, target, duration]);
  return val;
}

// ── IntersectionObserver hook ─────────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Block 1 visual: phone chat ────────────────────────────────────────────────
function PhoneChatVisual() {
  const MSGS = [
    { from: "user", time: "21:34", text: "Hei, har dere ledig time i morgen?" },
    { from: "aria", time: "21:34", text: "Hei! Vi har ledig kl 14:00 eller 16:30. Hvilken passer best?" },
    { from: "user", time: "21:35", text: "Kl 14 passer perfekt!" },
    { from: "aria", time: "21:35", text: "Booket! Du får bekreftelse på SMS nå ✓" },
  ];
  return (
    <div style={{
      background: "#0f0f1f", borderRadius: 24,
      border: "2px solid rgba(184,144,46,0.3)", padding: 12,
      maxWidth: 300, margin: "0 auto",
      boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
    }}>
      <div style={{
        background: "#1a1a2e", borderRadius: "14px 14px 0 0",
        padding: "10px 14px", display: "flex", alignItems: "center", gap: 10,
        borderBottom: "1px solid rgba(184,144,46,0.15)",
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "linear-gradient(135deg, #b8902e, #d4af37)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 800, color: "#fff", flexShrink: 0,
        }}>A</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>Aria</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 4px #4ade80" }} />
            <span style={{ fontSize: 9.5, color: "#4ade80", fontWeight: 600 }}>Online</span>
          </div>
        </div>
      </div>
      <div style={{
        background: "#f7f6f1", borderRadius: "0 0 14px 14px",
        padding: "12px 10px", display: "flex", flexDirection: "column", gap: 6,
      }}>
        {MSGS.map((msg, i) => {
          const isUser = msg.from === "user";
          return (
            <div key={i} style={{ alignSelf: isUser ? "flex-end" : "flex-start", maxWidth: "86%" }}>
              <div style={{
                padding: "8px 11px",
                borderRadius: isUser ? "12px 4px 12px 12px" : "4px 12px 12px 12px",
                background: isUser ? "#1a1a2e" : "#ffffff",
                color: isUser ? "#ffffff" : "#1a1a2e",
                fontSize: 11.5, lineHeight: 1.5,
                boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
              }}>
                {!isUser && <div style={{ fontSize: 9, fontWeight: 700, color: "#b8902e", marginBottom: 2 }}>Aria ✨</div>}
                {msg.text}
              </div>
              <div style={{ fontSize: 9, color: "#8a8a98", marginTop: 2, textAlign: isUser ? "right" : "left", paddingInline: 2 }}>
                {msg.time}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Block 2 visual: stat card ─────────────────────────────────────────────────
function StatVisual({ triggered }: { triggered: boolean }) {
  const count = useCountUp(47, 1400, triggered);
  return (
    <div style={{
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(184,144,46,0.2)",
      borderRadius: 16, padding: 24, textAlign: "center",
      maxWidth: 260, margin: "0 auto",
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
        KONVERTERINGSRATE
      </div>
      <div style={{
        fontFamily: "'DM Sans', -apple-system, sans-serif",
        fontSize: 52, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.03em",
        background: "linear-gradient(135deg, #b8902e, #d4af37)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        marginBottom: 10,
      }}>
        {count}%
      </div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 18 }}>av besøkende blir leads</div>
      <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 999, height: 6, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${(count / 47) * 100}%`,
          background: "linear-gradient(90deg, #b8902e, #d4a84d)",
          borderRadius: 999, transition: "width 0.12s linear",
        }} />
      </div>
    </div>
  );
}

// ── Block 3 visual: pipeline card ─────────────────────────────────────────────
function PipelineVisual() {
  const rows = [
    {
      iconBg: "rgba(34,197,94,0.15)", iconColor: "#22c55e",
      name: "Maria Olsen", sub: "Tannrens · Kontaktet i dag",
      badgeBg: "rgba(34,197,94,0.15)", badgeColor: "#22c55e", badge: "Booket",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M5 13l4 4L19 7" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      iconBg: "rgba(184,144,46,0.15)", iconColor: "#b8902e",
      name: "Erik Hansen", sub: "Konsultasjon · SMS sendt",
      badgeBg: "rgba(184,144,46,0.15)", badgeColor: "#d4a84d", badge: "Oppfølging",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#b8902e" strokeWidth="2"/>
          <path d="M12 6v6l4 2" stroke="#b8902e" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      iconBg: "rgba(34,197,94,0.15)", iconColor: "#22c55e",
      name: "Lise Berg", sub: "Hudpleie · Automatisk booket",
      badgeBg: "rgba(34,197,94,0.15)", badgeColor: "#22c55e", badge: "Booket",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M5 13l4 4L19 7" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  return (
    <div style={{
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(184,144,46,0.2)",
      borderRadius: 16, padding: 20, width: "100%", maxWidth: 300, margin: "0 auto",
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
        LEAD-PIPELINE
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 0",
          borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8, flexShrink: 0,
            background: row.iconBg,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {row.icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, color: "#ffffff", fontWeight: 500 }}>{row.name}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 1 }}>{row.sub}</div>
          </div>
          <div style={{
            fontSize: 11, fontWeight: 500,
            color: row.badgeColor, background: row.badgeBg,
            padding: "3px 8px", borderRadius: 6, flexShrink: 0,
          }}>
            {row.badge}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Feature list ──────────────────────────────────────────────────────────────
function FeatureList({ features }: { features: readonly string[] }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
      {features.map((f, i) => (
        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#5a5a6e" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
            <circle cx="9" cy="9" r="9" fill="#fdf9ed" />
            <path d="M5.5 9l2.5 2.5 4.5-5" stroke="#b8902e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {f}
        </li>
      ))}
    </ul>
  );
}

// ── Animated block wrapper ────────────────────────────────────────────────────
function AnimatedBlock({ children, delay }: { children: React.ReactNode; delay: number }) {
  const { ref, inView } = useInView(0.15);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 700ms ease ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function TestimonialSection() {
  const { t } = useLanguage();
  const s = t.solution as unknown as {
    eyebrow: string;
    headline1: string;
    headline2: string;
    subtitle: string;
    modules: Module[];
  };

  const { ref: headerRef, inView: headerInView } = useInView(0.3);
  const { ref: b2Ref, inView: b2InView } = useInView(0.25);

  const m0 = s.modules[0];
  const m1 = s.modules[1];

  return (
    <section style={{ background: "#ffffff", padding: "96px 24px" }}>
      <div className="wrap" style={{ maxWidth: 1020, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center", marginBottom: 64,
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 700ms ease, transform 700ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(30px, 4vw, 42px)",
            fontWeight: 700, lineHeight: 1.15, fontStyle: "normal", color: "#1a1a2e",
            margin: "0 0 18px", letterSpacing: "-0.02em",
          }}>
            <span style={{ color: "#D4AF37" }}>Null</span>{s.headline1.slice(4)}{" "}
            <span style={{ color: "#D4AF37" }}>Null</span>{s.headline2.slice(4)}
          </h2>
          <p style={{
            fontSize: 17, color: "#5a5a6e", lineHeight: 1.7, margin: 0,
            maxWidth: 520, marginLeft: "auto", marginRight: "auto",
          }}>
            {s.subtitle}
          </p>
        </div>

        {/* ── Blocks ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* BLOCK 1 — text left, visual right */}
          <AnimatedBlock delay={0}>
            <div className="sol-block sol-block--normal">
              <div className="sol-block-text">
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#b8902e", flexShrink: 0 }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#b8902e", letterSpacing: "0.08em", textTransform: "uppercase" }}>{m0.label}</span>
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(20px, 2.2vw, 26px)",
                  fontWeight: 700, fontStyle: "normal", color: "#1a1a2e",
                  margin: "0 0 14px", lineHeight: 1.25, letterSpacing: "-0.01em",
                }}>{m0.title}</h3>
                <p style={{ fontSize: 15, color: "#5a5a6e", lineHeight: 1.7, margin: "0 0 24px" }}>{m0.desc}</p>
                <FeatureList features={m0.features} />
              </div>
              <div className="sol-block-visual"><PhoneChatVisual /></div>
            </div>
          </AnimatedBlock>

          {/* BLOCK 2 — reversed: visual left, text right */}
          <AnimatedBlock delay={120}>
            <div className="sol-block sol-block--reversed" ref={b2Ref}>
              <div className="sol-block-text">
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#b8902e", flexShrink: 0 }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#b8902e", letterSpacing: "0.08em", textTransform: "uppercase" }}>{m1.label}</span>
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(20px, 2.2vw, 26px)",
                  fontWeight: 700, fontStyle: "normal", color: "#1a1a2e",
                  margin: "0 0 14px", lineHeight: 1.25, letterSpacing: "-0.01em",
                }}>{m1.title}</h3>
                <p style={{ fontSize: 15, color: "#5a5a6e", lineHeight: 1.7, margin: "0 0 24px" }}>{m1.desc}</p>
                <FeatureList features={m1.features} />
              </div>
              <div className="sol-block-visual"><StatVisual triggered={b2InView} /></div>
            </div>
          </AnimatedBlock>

        </div>
      </div>

      <style>{`
        .sol-block {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-radius: 20px;
          border: 1px solid #e8e6dc;
          background: #fafaf8;
          overflow: hidden;
          position: relative;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .sol-block::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 30%, rgba(184,144,46,0.12) 50%, transparent 70%);
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
          border-radius: 20px;
        }
        .sol-block:hover {
          border-color: #b8902e;
          box-shadow: 0 0 40px rgba(184,144,46,0.08), 0 16px 48px rgba(26,26,46,0.08);
        }
        .sol-block:hover::after { opacity: 1; }

        .sol-block-text {
          padding: 48px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .sol-block-visual {
          background: linear-gradient(135deg, #1a1a2e 0%, #242442 100%);
          padding: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 340px;
        }

        .sol-block--reversed {
          direction: rtl;
        }
        .sol-block--reversed > * {
          direction: ltr;
        }

        @media (prefers-reduced-motion: reduce) {
          .sol-block, .sol-block::after { transition: none; }
        }

        @media (max-width: 768px) {
          .sol-block {
            grid-template-columns: 1fr !important;
            direction: ltr !important;
          }
          .sol-block-visual { min-height: 260px; }
          .sol-block-text { padding: 32px 24px; }
        }
      `}</style>
    </section>
  );
}
