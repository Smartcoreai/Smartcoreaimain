"use client";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/i18n";

type Stat = {
  value: string;
  countTo: number;
  suffix: string;
  prefix?: string;
  text: string;
  context: string;
};

function useCountUp(target: number, duration: number, triggered: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!triggered) { setVal(0); return; }
    let current = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      current = Math.min(current + step, target);
      setVal(Math.floor(current));
      if (current >= target) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [triggered, target, duration]);
  return val;
}

function StatCard({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const count = useCountUp(stat.countTo, 1200, inView);

  return (
    <ScrollReveal delay={delay} style={{ height: "100%" }}>
      <div
        ref={ref}
        style={{
          background: "#ffffff",
          border: "1px solid #e8e6dc",
          borderRadius: 16,
          padding: "32px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "#f5ebd0";
          el.style.boxShadow = "0 8px 32px rgba(184,144,46,0.10)";
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "#e8e6dc";
          el.style.boxShadow = "none";
        }}
      >
        {/* Big number */}
        <div style={{
          fontFamily: "'DM Sans', -apple-system, sans-serif",
          fontSize: 48,
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          background: "linear-gradient(135deg, #b8902e, #8a6d22)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          {stat.prefix ?? ""}{count}{stat.suffix}
        </div>

        {/* Description */}
        <p style={{
          fontSize: 15,
          color: "#5a5a6e",
          lineHeight: 1.6,
          margin: 0,
          flexGrow: 1,
        }}>
          {stat.text}
        </p>

        {/* Context */}
        <p style={{
          fontSize: 12,
          color: "#8a8a98",
          fontStyle: "italic",
          margin: 0,
          lineHeight: 1.5,
        }}>
          {stat.context}
        </p>
      </div>
    </ScrollReveal>
  );
}

export default function TestimonialSection() {
  const { t } = useLanguage();
  const s = t.aiStats as unknown as {
    eyebrow: string;
    headline: string;
    subtitle: string;
    stats: Stat[];
  };

  return (
    <section style={{ background: "#f7f6f1", padding: "96px 24px" }}>
      <div className="wrap">

        {/* Header */}
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{
              fontSize: 13, fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: "#b8902e", marginBottom: 16,
            }}>
              {s.eyebrow}
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 700, color: "#1a1a2e",
              margin: "0 0 16px", letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}>
              {s.headline}
            </h2>
            <p style={{
              fontSize: 16, color: "#5a5a6e",
              lineHeight: 1.7, margin: 0,
              maxWidth: 520, marginLeft: "auto", marginRight: "auto",
            }}>
              {s.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* 2×2 grid */}
        <div className="ai-stats-grid">
          {s.stats.map((stat, i) => (
            <StatCard key={i} stat={stat} delay={i * 80} />
          ))}
        </div>
      </div>

      <style>{`
        .ai-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          max-width: 860px;
          margin: 0 auto;
          align-items: stretch;
        }
        .ai-stats-grid > .reveal {
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 640px) {
          .ai-stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
