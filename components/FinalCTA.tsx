"use client";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/i18n";
import BookCallButton from "@/components/BookCallButton";

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
              lineHeight: 1.7, margin: "0 0 0px",
            }}>
              {s.subtitle}
            </p>

          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}>
            <BookCallButton variant="primary" />
          </div>

          <div style={{ textAlign: "center" }}>
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
