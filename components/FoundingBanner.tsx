"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { FOUNDING_SPOTS } from "@/lib/constants";

export default function FoundingBanner() {
  const { lang } = useLanguage();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    // Per-session: banner reappears on every new browser session
    const saved = sessionStorage.getItem("urgency-bar-dismissed");
    if (!saved) setDismissed(false);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("urgency-bar-dismissed", "1");
  };

  if (dismissed) return null;

  const text =
    lang === "en"
      ? `Only ${FOUNDING_SPOTS} founding-client spots available. Prices revert to standard pricing once filled.`
      : `Kun ${FOUNDING_SPOTS} grunnleggerplasser tilgjengelig. Prisene går tilbake til standardpris når de er fylt.`;

  return (
    <div
      style={{
        position: "relative",
        background: "linear-gradient(135deg, #1a1408, #221a06, #1a1408)",
        borderBottom: "1px solid rgba(212,175,55,0.22)",
        padding: "10px 48px 10px 16px",
        textAlign: "center",
        zIndex: 300,
      }}
    >
      {/* Subtle shimmer line at top */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5) 50%, transparent)",
        pointerEvents: "none",
      }} />

      <p style={{ margin: 0, fontSize: 13, color: "#F5D87E", fontWeight: 500, lineHeight: 1.5 }}>
        🔥 {text}
      </p>

      <button
        onClick={dismiss}
        aria-label="Dismiss"
        style={{
          position: "absolute",
          top: "50%",
          right: 12,
          transform: "translateY(-50%)",
          background: "rgba(212,175,55,0.10)",
          border: "none",
          borderRadius: 6,
          color: "#D4AF37",
          cursor: "pointer",
          padding: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
}
