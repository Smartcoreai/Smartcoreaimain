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
        background: "linear-gradient(135deg, #6d28d9, #a855f7, #7c3aed)",
        padding: "10px 48px 10px 16px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: 14,
          color: "white",
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
          color: "rgba(255,255,255,0.85)",
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
          background: "rgba(255,255,255,0.15)",
          border: "none",
          borderRadius: 6,
          color: "white",
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
