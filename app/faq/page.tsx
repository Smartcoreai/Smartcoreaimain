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
      <main style={{ background: "#ffffff", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ padding: "140px 24px 80px", textAlign: "center", background: "#ffffff" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "4px 14px", borderRadius: 999,
              background: "#fdf9ed", border: "1px solid #f5ebd0",
              fontSize: 12, fontWeight: 700,
              letterSpacing: "0.07em", textTransform: "uppercase",
              color: "#b8902e", marginBottom: 24,
            }}>
              FAQ
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(36px, 5vw, 62px)",
              fontWeight: 700,
              color: "#1a1a2e",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: 20,
            }}>
              {faq.title}
            </h1>
            <p style={{ fontSize: 17, color: "#5a5a6e", lineHeight: 1.7, margin: 0 }}>
              {faq.subtitle}
            </p>
          </div>
        </section>

        {/* Accordion */}
        <section style={{ padding: "0 24px 120px", background: "#ffffff" }}>
          <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
            {faq.sections.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    background: "#ffffff",
                    border: `1px solid ${isOpen ? "#f5ebd0" : "#e8e6dc"}`,
                    borderRadius: 16,
                    cursor: "pointer",
                    boxShadow: isOpen ? "0 4px 24px rgba(184,144,46,0.08)" : "none",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    overflow: "hidden",
                  }}
                  onMouseEnter={e => {
                    if (!isOpen) {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "#f5ebd0";
                      el.style.boxShadow = "0 4px 20px rgba(184,144,46,0.06)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isOpen) {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "#e8e6dc";
                      el.style.boxShadow = "none";
                    }
                  }}
                >
                  {/* Question row */}
                  <div style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                    padding: "22px 28px", gap: 16,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      {/* Number badge */}
                      <div style={{
                        minWidth: 36, height: 36, borderRadius: 10,
                        background: "#fdf9ed", border: "1px solid #f5ebd0",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 12, fontWeight: 700,
                        color: "#b8902e",
                        flexShrink: 0,
                      }}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      {/* Question text */}
                      <span style={{
                        fontFamily: "inherit",
                        fontSize: "clamp(14px, 1.8vw, 17px)",
                        fontWeight: 500,
                        color: "#1a1a2e",
                        lineHeight: 1.4,
                      }}>
                        {item.q}
                      </span>
                    </div>
                    {/* Chevron */}
                    <div style={{
                      color: "#8a8a98",
                      transition: "transform 0.25s ease",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      flexShrink: 0,
                    }}>
                      <ChevronDown size={20} />
                    </div>
                  </div>

                  {/* Answer (smooth max-height transition) */}
                  <div style={{
                    maxHeight: isOpen ? "600px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}>
                    <div style={{
                      padding: "0 28px 24px 80px",
                      borderTop: "1px solid #f0ede6",
                      paddingTop: 16,
                    }}>
                      <p style={{
                        fontSize: 15,
                        color: "#5a5a6e",
                        lineHeight: 1.75,
                        margin: 0,
                      }}>
                        {item.a}
                      </p>
                    </div>
                  </div>
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
