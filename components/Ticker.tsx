"use client";
import { useLanguage } from "@/lib/i18n";

export default function Ticker() {
  const { t } = useLanguage();
  const doubled = [...t.ticker, ...t.ticker];

  return (
    <div style={{
      borderTop: "1px solid rgba(212,175,55,0.08)",
      borderBottom: "1px solid rgba(212,175,55,0.08)",
      background: "rgba(212,175,55,0.02)",
      overflow: "hidden",
      padding: "14px 0",
      position: "relative",
      zIndex: 10,
    }}>
      {/* Fade edges */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(90deg, #080808 0%, transparent 8%, transparent 92%, #080808 100%)",
      }} />
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
      <div style={{
        display: "flex",
        width: "max-content",
        animation: "ticker 30s linear infinite",
      }}>
        {doubled.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 16, paddingRight: 40,
            whiteSpace: "nowrap",
          }}>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#D4AF37", display: "inline-block", opacity: 0.7 }} />
            <span style={{ fontSize: 13, fontWeight: 500, color: "#8A8070", letterSpacing: "0.02em" }}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
