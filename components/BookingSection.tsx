"use client";
import { Video, Zap, Calendar } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const CALL_ICONS = [<Video size={16} />, <Zap size={16} />, <Calendar size={16} />];

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/aleksanderb2006/30min";

const CALL_URLS = [
  "https://calendly.com/aleksanderb2006/new-meeting",
  "https://calendly.com/aleksanderb2006/30min",
  "https://calendly.com/aleksanderb2006/strategiokt",
];

const CALENDLY_EMBED = `${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1&background_color=0f0f14&text_color=f4f4f8&primary_color=a855f7`;

export default function BookingSection() {
  const { t } = useLanguage();

  return (
    <section id="booking" style={{ background: "#08080c", padding: "100px 24px" }}>
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 52 }}>
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

        <div style={{
          display: "grid", gridTemplateColumns: "300px 1fr", gap: 0,
          background: "rgba(15,15,20,0.7)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 26, overflow: "hidden",
        }} className="booking-grid">
          {/* Left: Call type info */}
          <div style={{ padding: 32, borderRight: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#8888a0", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
                {t.booking.available}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {t.booking.callTypes.map((ct, i) => (
                  <a key={i} href={CALL_URLS[i]} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block", padding: "14px 16px", borderRadius: 14, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer", transition: "border-color 0.2s, background 0.2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.4)"; (e.currentTarget as HTMLElement).style.background = "rgba(168,85,247,0.05)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"; }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <div style={{ color: "#a855f7" }}>{CALL_ICONS[i]}</div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#f4f4f8" }}>{ct.label}</span>
                      <span style={{ marginLeft: "auto", fontSize: 11, color: "#44444e" }}>{ct.duration}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#44444e" }}>{ct.desc}</div>
                  </a>
                ))}
              </div>
            </div>
            <div style={{ marginTop: "auto", padding: "16px", background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.15)", borderRadius: 14 }}>
              <div style={{ fontSize: 12, color: "#4ade80", fontWeight: 600, marginBottom: 4 }}>{t.booking.freeNote}</div>
              <div style={{ fontSize: 12, color: "#8888a0", lineHeight: 1.6 }}>{t.booking.freeDesc}</div>
            </div>
          </div>

          {/* Right: Calendly iframe */}
          <div style={{ minWidth: 0 }}>
            <iframe
              src={CALENDLY_EMBED}
              width="100%"
              height="660"
              frameBorder="0"
              title="Book a call"
              style={{ display: "block", border: "none" }}
              className="calendly-frame"
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .booking-grid { grid-template-columns: 1fr !important; }
          .booking-grid > div:first-child { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.05); }
          .calendly-frame { height: 800px !important; }
        }
      `}</style>
    </section>
  );
}
