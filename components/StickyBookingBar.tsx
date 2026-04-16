"use client";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function StickyBookingBar() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{
      position: "fixed",
      bottom: 24,
      left: "50%",
      transform: visible
        ? "translateX(-50%) translateY(0)"
        : "translateX(-50%) translateY(120px)",
      transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      gap: 20,
      padding: "12px 20px",
      background: "rgba(26, 26, 46, 0.95)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      border: "1px solid rgba(212,175,55,0.28)",
      borderRadius: 999,
      boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
      whiteSpace: "nowrap",
    }}>
      {/* Live dot + free note */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#4ade80",
          boxShadow: "0 0 7px #4ade80",
          flexShrink: 0,
        }} />
        <span style={{ fontSize: 13, color: "#C8BFB0", fontWeight: 500 }}>
          {t.booking.freeNote}
        </span>
      </div>

      {/* Divider */}
      <div style={{
        width: 1,
        height: 22,
        background: "rgba(212,175,55,0.15)",
        flexShrink: 0,
      }} />

      {/* CTA button */}
      <a
        href="https://calendly.com/smartcoreaimeeting/new-meeting"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-gold"
        style={{ fontSize: 13, padding: "10px 20px" }}
      >
        {t.hero.ctaPrimary} <ArrowRight size={14} />
      </a>
    </div>
  );
}
