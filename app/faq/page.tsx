"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { useLanguage } from "@/lib/i18n";

export default function FAQPage() {
  const { t } = useLanguage();
  const faq = t.faq;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ padding: "140px 24px 80px", textAlign: "center", position: "relative" }}>
          <div style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: 700, height: 400, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto" }}>
            <div className="tag" style={{ display: "inline-flex", marginBottom: 20 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#D4AF37", boxShadow: "0 0 6px #D4AF37" }} />
              FAQ
            </div>
            <h1 style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontSize: "clamp(32px,5vw,62px)",
              fontWeight: 700,
              fontStyle: "italic",
              color: "#F5F0E8",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: 20,
            }}>
              {faq.title}
            </h1>
            <p style={{ fontSize: 17, color: "#8A8070", lineHeight: 1.7, margin: 0 }}>
              {faq.subtitle}
            </p>
          </div>
        </section>

        {/* Accordion */}
        <section style={{ padding: "0 24px 120px" }}>
          <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
            {faq.sections.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    background: isOpen ? "rgba(212,175,55,0.05)" : "rgba(10,15,30,0.5)",
                    border: `1px solid ${isOpen ? "rgba(212,175,55,0.30)" : "rgba(212,175,55,0.08)"}`,
                    borderRadius: 18,
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 28px", gap: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{
                        minWidth: 32, height: 32, borderRadius: 10,
                        background: isOpen ? "rgba(212,175,55,0.15)" : "rgba(212,175,55,0.04)",
                        border: `1px solid ${isOpen ? "rgba(212,175,55,0.35)" : "rgba(212,175,55,0.10)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 12, fontWeight: 700,
                        color: isOpen ? "#D4AF37" : "#5A5248",
                        transition: "all 0.25s",
                        flexShrink: 0,
                      }}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <span style={{
                        fontFamily: "Syne, sans-serif",
                        fontSize: "clamp(14px,1.8vw,17px)",
                        fontWeight: 600,
                        color: isOpen ? "#F5F0E8" : "#D0CABC",
                        transition: "color 0.2s",
                        lineHeight: 1.4,
                      }}>
                        {item.q}
                      </span>
                    </div>
                    <div style={{
                      color: isOpen ? "#D4AF37" : "#5A5248",
                      transition: "transform 0.25s, color 0.25s",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      flexShrink: 0,
                    }}>
                      <ChevronDown size={20} />
                    </div>
                  </div>
                  {isOpen && (
                    <div style={{ padding: "0 28px 24px 76px", fontSize: 15, color: "#8A8070", lineHeight: 1.8 }}>
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
