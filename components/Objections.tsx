"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function Objections() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="objections" style={{ background: "#1A1A1A", padding: "100px 24px" }}>
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="tag" style={{ display: "inline-flex", marginBottom: 16 }}>{t.objections.tag}</div>
          <h2 className="text-[22px] sm:text-4xl lg:text-[52px]" style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800, color: "#F5F0E8", letterSpacing: "-0.03em", marginBottom: 14, lineHeight: 1.1,
          }}>
            {t.objections.headline1}{" "}
            <span style={{ background: "linear-gradient(135deg,#D4AF37,#F5D87E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {t.objections.headline2}
            </span>
          </h2>
          <p style={{ fontSize: 16, color: "#8A8070", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
            {t.objections.subtext}
          </p>
        </div>

        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
          {t.objections.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} onClick={() => setOpen(isOpen ? null : i)} style={{
                background: isOpen ? "rgba(212,175,55,0.05)" : "rgba(10,15,30,0.5)",
                border: `1px solid ${isOpen ? "rgba(212,175,55,0.30)" : "rgba(212,175,55,0.08)"}`,
                borderRadius: 18, cursor: "pointer", transition: "all 0.25s ease", overflow: "hidden",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 28px", gap: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{
                      minWidth: 32, height: 32, borderRadius: 10,
                      background: isOpen ? "rgba(212,175,55,0.15)" : "rgba(212,175,55,0.04)",
                      border: `1px solid ${isOpen ? "rgba(212,175,55,0.35)" : "rgba(212,175,55,0.10)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 700,
                      color: isOpen ? "#D4AF37" : "#5A5248", transition: "all 0.25s",
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <span style={{
                      fontFamily: "Syne, sans-serif",
                      fontSize: "clamp(15px,2vw,18px)", fontWeight: 700,
                      color: isOpen ? "#F5F0E8" : "#D0CABC", transition: "color 0.2s",
                    }}>
                      &ldquo;{item.q}&rdquo;
                    </span>
                  </div>
                  <div style={{ color: isOpen ? "#D4AF37" : "#5A5248", transition: "transform 0.25s, color 0.25s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}>
                    <ChevronDown size={20} />
                  </div>
                </div>
                {isOpen && (
                  <div style={{ padding: "0 28px 24px 76px", fontSize: 15, color: "#8A8070", lineHeight: 1.75 }}>
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
