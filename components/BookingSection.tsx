"use client";
import { Video, Zap, Calendar, Star } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";

const CALL_ICONS = [<Video size={20} />, <Zap size={20} />, <Calendar size={20} />];

const CALL_URLS = [
  "https://calendly.com/smartcoreaimeeting/new-meeting",
  "https://calendly.com/smartcoreaimeeting/30min",
  "https://calendly.com/smartcoreaimeeting/strategiokt",
];

const CARD_COLORS = ["#D4AF37", "#F5D87E", "#C9A84C"];
const GLOW_ANIMS  = ["glowGold1", "glowGold2", "glowGold3"];

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
    <section ref={sectionRef} id="booking" style={{ background: "#1A1A1A", padding: "100px 24px" }}>
      <div className="wrap">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="tag" style={{ display: "inline-flex", marginBottom: 16 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
            {t.booking.tag}
          </div>
          <h2 className="text-[22px] sm:text-4xl lg:text-[52px]" style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700, color: "#F5F0E8", letterSpacing: "-0.01em", marginBottom: 14, lineHeight: 1.1,
          }}>
            {t.booking.headline1}{" "}
            <span style={{ background: "linear-gradient(135deg,#D4AF37,#F5D87E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {t.booking.headline2}
            </span>
          </h2>
          <p style={{ fontSize: 16, color: "#8A8070", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
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
                    ? "linear-gradient(145deg, rgba(212,175,55,0.08), rgba(10,15,30,0.3))"
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
                {i === 0 && (
                  <div style={{
                    position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                    padding: "4px 16px", borderRadius: 999,
                    background: "linear-gradient(135deg,#D4AF37,#B8960C)",
                    fontSize: 11, fontWeight: 700, color: "#1A1A1A",
                    display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap",
                    boxShadow: "0 4px 20px rgba(212,175,55,0.35)", zIndex: 1,
                  }}>
                    <Star size={10} fill="currentColor" /> {t.booking.popular}
                  </div>
                )}
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
                  fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 800,
                  color: "#F5F0E8", letterSpacing: "-0.02em", marginBottom: 10,
                }}>
                  {ct.label}
                </div>

                {/* Description */}
                <div style={{ fontSize: 14, color: "#8A8070", lineHeight: 1.65, marginBottom: 24, flexGrow: 1 }}>
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
                      background: "linear-gradient(135deg,#D4AF37,#B8960C)",
                      color: "#1A1A1A",
                      boxShadow: "0 4px 20px rgba(212,175,55,0.25)",
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
                      el.style.boxShadow = "0 8px 32px rgba(212,175,55,0.45)";
                    } else {
                      el.style.background = `${color}28`;
                    }
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(0)";
                    if (isPrimary) {
                      el.style.boxShadow = "0 4px 20px rgba(212,175,55,0.25)";
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
          <p style={{ fontSize: 13, color: "#8A8070" }}>{t.booking.freeDesc}</p>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px)  { .booking-cards { grid-template-columns: 1fr !important; } }
        @media (min-width: 901px) and (max-width: 1100px) { .booking-cards { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 768px) {
          .booking-cards > div { padding: 24px 20px !important; box-sizing: border-box; width: 100%; }
        }
        @keyframes glowGold1 {
          0%, 100% { box-shadow: 0 0 18px rgba(212,175,55,0.06); }
          50%       { box-shadow: 0 0 38px rgba(212,175,55,0.18), 0 0 70px rgba(212,175,55,0.04); }
        }
        @keyframes glowGold2 {
          0%, 100% { box-shadow: 0 0 18px rgba(245,216,126,0.06); }
          50%       { box-shadow: 0 0 38px rgba(245,216,126,0.16), 0 0 70px rgba(245,216,126,0.04); }
        }
        @keyframes glowGold3 {
          0%, 100% { box-shadow: 0 0 18px rgba(201,168,76,0.06); }
          50%       { box-shadow: 0 0 38px rgba(201,168,76,0.16), 0 0 70px rgba(201,168,76,0.04); }
        }
      `}</style>
    </section>
  );
}
