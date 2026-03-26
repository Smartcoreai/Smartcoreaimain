"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const OBJECTIONS = [
  {
    q: "It's too expensive.",
    a: "Our clients typically see ROI within the first month. The cost pays for itself.",
  },
  {
    q: "I don't need AI yet.",
    a: "Your competitors are already using it. Every day you wait is revenue left on the table.",
  },
  {
    q: "I can do this myself.",
    a: "You could. But it takes months to build and maintain. We deploy in days.",
  },
  {
    q: "I'm not sure it'll work for my business.",
    a: "We've built systems for all kinds of businesses. Book a free call and we'll tell you honestly if it's a fit.",
  },
  {
    q: "I need to think about it.",
    a: "Totally fair. While you think, your competitors are automating. We're here when you're ready.",
  },
];

export default function Objections() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ background: "#08080c", padding: "100px 24px" }}>
      <div className="wrap">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="tag" style={{ display: "inline-flex", marginBottom: 16 }}>Common objections</div>
          <h2 className="text-[22px] sm:text-4xl lg:text-[52px]" style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800, color: "#f4f4f8", letterSpacing: "-0.03em", marginBottom: 14, lineHeight: 1.1,
          }}>
            We've heard every{" "}
            <span style={{ background: "linear-gradient(135deg,#a855f7,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              reason to wait.
            </span>
          </h2>
          <p style={{ fontSize: 16, color: "#8888a0", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
            Here are the honest answers to the questions we get asked every week.
          </p>
        </div>

        {/* Accordion */}
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
          {OBJECTIONS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} onClick={() => setOpen(isOpen ? null : i)} style={{
                background: isOpen ? "rgba(168,85,247,0.06)" : "rgba(15,15,20,0.8)",
                border: `1px solid ${isOpen ? "rgba(168,85,247,0.35)" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 18,
                cursor: "pointer",
                transition: "all 0.25s ease",
                overflow: "hidden",
              }}>
                {/* Question row */}
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "22px 28px", gap: 16,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{
                      minWidth: 32, height: 32, borderRadius: 10,
                      background: isOpen ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${isOpen ? "rgba(168,85,247,0.4)" : "rgba(255,255,255,0.08)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 700,
                      color: isOpen ? "#a855f7" : "#44444e",
                      transition: "all 0.25s",
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <span style={{
                      fontFamily: "Syne, sans-serif",
                      fontSize: "clamp(15px,2vw,18px)",
                      fontWeight: 700,
                      color: isOpen ? "#f4f4f8" : "#c4c4d0",
                      transition: "color 0.2s",
                    }}>
                      "{item.q}"
                    </span>
                  </div>
                  <div style={{
                    color: isOpen ? "#a855f7" : "#44444e",
                    transition: "transform 0.25s, color 0.25s",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    flexShrink: 0,
                  }}>
                    <ChevronDown size={20} />
                  </div>
                </div>

                {/* Answer */}
                {isOpen && (
                  <div style={{
                    padding: "0 28px 24px 76px",
                    fontSize: 15,
                    color: "#8888a0",
                    lineHeight: 1.75,
                  }}>
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
