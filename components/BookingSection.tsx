"use client";
import { Video, Zap, Calendar } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";

const CALL_ICONS = [<Video size={20} />, <Zap size={20} />, <Calendar size={20} />];

const CALL_URLS = [
  "https://calendly.com/aleksanderb2006/new-meeting",
  "https://calendly.com/aleksanderb2006/30min",
  "https://calendly.com/aleksanderb2006/strategiokt",
];

const CARD_COLORS = ["#a855f7", "#22d3ee", "#f472b6"];
const GLOW_ANIMS  = ["glowPurple", "glowCyan", "glowPink"];

export default function BookingSection() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="booking" style={{ background: "#08080c", padding: "100px 24px" }}>
      <div className="wrap">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="tag" style={{ display: "inline-flex", marginBottom: 16 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
            {t.booking.tag}
          </div>
          <h2 className="text-[22px] sm:text-4xl lg:text-[52px]" style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800, color: "#f4f4f8", letterSpacing: "-0.03em", marginBottom: 14, lineHeight: 1.1,
          }}>
            {t.booking.headline1}{" "}
            <span style={{ background: "linear-gradient(135deg,#a855f7,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {t.booking.headline2}
            </span>
          </h2>
          <p style={{ fontSize: 16, color: "#8888a0", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
            {t.booking.subtext}
          </p>
        </div>

        {/* Cards */}
        <div className="booking-cards" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
          {t.booking.callTypes.map((ct, i) => {
            const color = CARD_COLORS[i];
            const anim  = GLOW_ANIMS[i];
            const isPrimary = i === 0;
            return (
              <div
                key={i}
                style={{
                  position: "relative",
                  background: isPrimary
                    ? "linear-gradient(145deg, rgba(168,85,247,0.08), rgba(124,58,237,0.03))"
                    : "rgba(12,12,18,0.95)",
                  border: `1px solid ${color}${isPrimary ? "45" : "28"}`,
                  borderRadius: 22,
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(32px)",
                  transition: `opacity 0.65s ease ${i * 0.15}s, transform 0.65s ease ${i * 0.15}s, border-color 0.3s ease, box-shadow 0.3s ease`,
                  animation: visible ? `${anim} 4s ease-in-out ${i * 0.9}s infinite` : undefined,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-6px)";
                  el.style.borderColor = color + "75";
                  el.style.boxShadow = `0 20px 60px ${color}22, 0 0 40px ${color}10`;
                  el.style.animation = "none";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.borderColor = color + (isPrimary ? "45" : "28");
                  el.style.boxShadow = "";
                  el.style.animation = `${anim} 4s ease-in-out ${i * 0.9}s infinite`;
                }}
              >
                {/* Icon + duration pill */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 13, flexShrink: 0,
                    background: `${color}18`, border: `1px solid ${color}35`,
                    display: "flex", alignItems: "center", justifyContent: "center", color,
                  }}>
                    {CALL_ICONS[i]}
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color,
                    background: `${color}12`, border: `1px solid ${color}30`,
                    padding: "4px 13px", borderRadius: 999, whiteSpace: "nowrap",
                  }}>
                    {ct.duration}
                  </span>
                </div>

                {/* Title */}
                <div style={{
                  fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 800,
                  color: "#f4f4f8", letterSpacing: "-0.02em", marginBottom: 10,
                }}>
                  {ct.label}
                </div>

                {/* Description */}
                <div style={{ fontSize: 14, color: "#8888a0", lineHeight: 1.65, marginBottom: 24, flexGrow: 1 }}>
                  {ct.desc}
                </div>

                {/* Free tag */}
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "flex-start",
                  fontSize: 11, fontWeight: 600, color: "#4ade80",
                  background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.18)",
                  padding: "5px 12px", borderRadius: 999, marginBottom: 20,
                }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 5px #4ade80", flexShrink: 0 }} />
                  {t.booking.freeNote}
                </div>

                {/* Book now button */}
                <a
                  href={CALL_URLS[i]}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block", textAlign: "center",
                    padding: "13px 20px", borderRadius: 12,
                    fontWeight: 700, fontSize: 14,
                    textDecoration: "none",
                    transition: "all 0.25s ease",
                    ...(isPrimary ? {
                      background: "linear-gradient(135deg,#a855f7,#7c3aed)",
                      color: "white",
                      boxShadow: "0 4px 20px rgba(168,85,247,0.35)",
                    } : {
                      background: `${color}15`,
                      color,
                      border: `1px solid ${color}35`,
                    }),
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-2px)";
                    if (isPrimary) {
                      el.style.boxShadow = "0 8px 32px rgba(168,85,247,0.55)";
                    } else {
                      el.style.background = `${color}28`;
                    }
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(0)";
                    if (isPrimary) {
                      el.style.boxShadow = "0 4px 20px rgba(168,85,247,0.35)";
                    } else {
                      el.style.background = `${color}15`;
                    }
                  }}
                >
                  {t.booking.bookNow}
                </a>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div style={{ marginTop: 44, textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "#8888a0" }}>{t.booking.freeDesc}</p>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px)  { .booking-cards { grid-template-columns: 1fr !important; } }
        @media (min-width: 901px) and (max-width: 1100px) { .booking-cards { grid-template-columns: repeat(2, 1fr) !important; } }
        @keyframes glowPurple {
          0%, 100% { box-shadow: 0 0 18px rgba(168,85,247,0.08); }
          50%       { box-shadow: 0 0 38px rgba(168,85,247,0.22), 0 0 70px rgba(168,85,247,0.05); }
        }
        @keyframes glowCyan {
          0%, 100% { box-shadow: 0 0 18px rgba(34,211,238,0.08); }
          50%       { box-shadow: 0 0 38px rgba(34,211,238,0.22), 0 0 70px rgba(34,211,238,0.05); }
        }
        @keyframes glowPink {
          0%, 100% { box-shadow: 0 0 18px rgba(244,114,182,0.08); }
          50%       { box-shadow: 0 0 38px rgba(244,114,182,0.22), 0 0 70px rgba(244,114,182,0.05); }
        }
      `}</style>
    </section>
  );
}
