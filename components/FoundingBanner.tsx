"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const SPOTS_REMAINING = 5;

export default function FoundingBanner() {
  const { lang } = useLanguage();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("founding-banner-dismissed");
    if (!saved) setDismissed(false);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    localStorage.setItem("founding-banner-dismissed", "1");
  };

  if (dismissed) return null;

  const text =
    lang === "en"
      ? "🔥 Founding Client Offer — Only 5 spots at special price. Lock in your rate before it's gone."
      : "🔥 Founding Client-tilbud — Kun 5 plasser til spesialpris. Sikre din pris før det er for sent.";

  const spotsLabel =
    lang === "en"
      ? `${SPOTS_REMAINING} spots remaining`
      : `${SPOTS_REMAINING} plasser igjen`;

  return (
    <div
      style={{
        position: "relative",
        background: "linear-gradient(135deg, #1a1408, #2a1f08, #1a1408)",
        borderBottom: "1px solid rgba(212,175,55,0.25)",
        padding: "10px 48px 10px 16px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: 14,
          color: "#F5D87E",
          fontWeight: 500,
          lineHeight: 1.5,
        }}
      >
        {text}
      </p>
      <div
        style={{
          marginTop: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          fontSize: 12,
          color: "rgba(212,175,55,0.7)",
        }}
      >
        {"⬛".repeat(SPOTS_REMAINING)}&nbsp;{spotsLabel}
      </div>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        style={{
          position: "absolute",
          top: "50%",
          right: 12,
          transform: "translateY(-50%)",
          background: "rgba(212,175,55,0.12)",
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
