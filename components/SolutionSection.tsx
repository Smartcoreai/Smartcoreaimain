"use client";
import { Phone, MessageSquare, Target, Check } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/i18n";

const MODULE_ICONS = [Phone, MessageSquare, Target];

// ── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target: number, duration: number, triggered: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!triggered) { setValue(0); return; }
    let current = 0;
    const increment = target / (duration / 16);
    const id = setInterval(() => {
      current = Math.min(current + increment, target);
      setValue(Math.floor(current));
      if (current >= target) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [triggered, target, duration]);
  return value;
}

// ── Mini-visuals ──────────────────────────────────────────────────────────────
function CallVisual() {
  return (
    <div style={{
      background: "#fafaf8", border: "1px solid #e8e6dc",
      borderRadius: 12, padding: "12px 14px", marginBottom: 24,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(220,38,38,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Phone size={15} color="#dc2626" />
          </div>
          <div style={{
            position: "absolute", top: 1, right: 1,
            width: 9, height: 9, borderRadius: "50%",
            background: "#dc2626",
            animation: "pulseDot 1.5s ease-in-out infinite",
          }} />
        </div>
        <div>
          <div style={{ fontSize: 10, color: "#8a8a98", marginBottom: 1 }}>Innkommende anrop</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>+47 923 45 678</div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <div style={{
            fontSize: 10, fontWeight: 600, color: "#2d7a4f",
            background: "rgba(45,122,79,0.08)",
            padding: "3px 9px", borderRadius: 999,
          }}>
            Aria svarer...
          </div>
        </div>
      </div>
    </div>
  );
}

function ConversionVisual({ triggered }: { triggered: boolean }) {
  const count = useCountUp(47, 1400, triggered);
  return (
    <div style={{
      background: "#fafaf8", border: "1px solid #e8e6dc",
      borderRadius: 12, padding: "12px 14px", marginBottom: 24,
    }}>
      <div style={{ fontSize: 10, color: "#8a8a98", marginBottom: 8 }}>Konverteringsrate</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 10 }}>
        <span style={{
          fontSize: 28, fontWeight: 700, color: "#b8902e",
          lineHeight: 1, letterSpacing: "-0.02em",
        }}>{count}</span>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#b8902e" }}>%</span>
      </div>
      <div style={{ background: "#e8e6dc", borderRadius: 999, height: 5, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${(count / 47) * 100}%`,
          background: "linear-gradient(90deg, #b8902e, #d4af37)",
          borderRadius: 999,
          transition: "width 0.12s linear",
        }} />
      </div>
    </div>
  );
}

function ResponseVisual({ triggered }: { triggered: boolean }) {
  const count = useCountUp(38, 1200, triggered);
  return (
    <div style={{
      background: "#fafaf8", border: "1px solid #e8e6dc",
      borderRadius: 12, padding: "12px 14px", marginBottom: 24,
    }}>
      <div style={{ fontSize: 10, color: "#8a8a98", marginBottom: 6 }}>Gjennomsnittlig responstid</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span style={{
          fontSize: 28, fontWeight: 700, color: "#b8902e",
          lineHeight: 1, letterSpacing: "-0.02em",
        }}>{count}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#5a5a6e" }}>sek</span>
      </div>
    </div>
  );
}

// ── Module card ───────────────────────────────────────────────────────────────
function ModuleCard({ module, index }: {
  module: { label: string; desc: string; features: readonly string[] };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const Icon = MODULE_ICONS[index];

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.25 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        background: "#ffffff", border: "1px solid #e8e6dc",
        borderRadius: 18, padding: "28px 24px",
        height: "100%", display: "flex", flexDirection: "column",
        transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.transform = "translateY(-5px)";
        el.style.boxShadow = "0 14px 48px rgba(184,144,46,0.1)";
        el.style.borderColor = "#f5ebd0";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
        el.style.borderColor = "#e8e6dc";
      }}
    >
      {/* Icon */}
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: "#fdf9ed", border: "1px solid #f5ebd0",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#b8902e", marginBottom: 16, flexShrink: 0,
      }}>
        <Icon size={20} />
      </div>

      {/* Label */}
      <div style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
        fontSize: 18, fontWeight: 700, color: "#1a1a2e",
        marginBottom: 10, letterSpacing: "-0.01em",
      }}>
        {module.label}
      </div>

      {/* Description */}
      <p style={{ fontSize: 14, color: "#5a5a6e", lineHeight: 1.7, margin: "0 0 20px" }}>
        {module.desc}
      </p>

      {/* Mini-visual */}
      {index === 0 && <CallVisual />}
      {index === 1 && <ConversionVisual triggered={inView} />}
      {index === 2 && <ResponseVisual triggered={inView} />}

      {/* Features */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: "auto" }}>
        {module.features.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 18, height: 18, borderRadius: "50%",
              background: "#fdf9ed", border: "1px solid #f5ebd0",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <Check size={10} color="#b8902e" />
            </div>
            <span style={{ fontSize: 13, color: "#5a5a6e" }}>{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function SolutionSection() {
  const { t } = useLanguage();
  const s = t.solution;

  return (
    <section style={{ background: "#ffffff", padding: "96px 24px" }}>
      <div className="wrap">
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{
              fontSize: 13, fontWeight: 600, letterSpacing: "0.06em",
              textTransform: "uppercase", color: "#b8902e", marginBottom: 18,
            }}>
              {s.eyebrow}
            </div>
            <h2 style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
              fontSize: "clamp(26px, 3.2vw, 40px)", fontWeight: 600,
              lineHeight: 1.15, letterSpacing: "-0.015em",
              color: "#1a1a2e", margin: 0,
            }}>
              {s.headline}
            </h2>
          </div>
        </ScrollReveal>

        <div className="sol-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
          maxWidth: 1020,
          margin: "0 auto",
          alignItems: "stretch",
        }}>
          {s.modules.map((mod, i) => (
            <ScrollReveal key={i} delay={i * 100} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <ModuleCard module={mod} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.5); opacity: 0.6; }
        }
        .sol-grid > .reveal {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 767px) {
          .sol-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 768px) and (max-width: 1000px) {
          .sol-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
