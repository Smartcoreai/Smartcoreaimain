"use client";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/i18n";

export default function FinalCTA() {
  const { t } = useLanguage();
  const s = t.finalCta;

  return (
    <section style={{ background: "#f7f6f1", padding: "108px 24px" }}>
      <div className="wrap">
        <ScrollReveal>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>

            <h2 style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
              fontSize: "clamp(28px, 3.8vw, 46px)", fontWeight: 600,
              lineHeight: 1.12, letterSpacing: "-0.02em",
              color: "#1a1a2e", margin: "0 0 20px",
            }}>
              {s.headline}
            </h2>

            <p style={{
              fontSize: 17, color: "#5a5a6e",
              lineHeight: 1.7, margin: "0 0 40px",
            }}>
              {s.subtitle}
            </p>

            <a
              href="#booking"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "16px 32px", borderRadius: 11,
                background: "#1a1a2e", color: "#ffffff",
                fontSize: 16, fontWeight: 600, textDecoration: "none",
                boxShadow: "0 6px 24px rgba(26,26,46,0.18)",
                transition: "background 0.2s, transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#2d2d4e";
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 10px 32px rgba(26,26,46,0.24)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#1a1a2e";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 6px 24px rgba(26,26,46,0.18)";
              }}
            >
              {s.cta} <ArrowRight size={17} />
            </a>

            <p style={{
              marginTop: 18, fontSize: 13, color: "#8a8a98",
              lineHeight: 1.5,
            }}>
              {s.trustLine}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
