"use client";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/i18n";

export default function TestimonialSection() {
  const { t } = useLanguage();
  const s = t.testimonial;

  return (
    <section style={{ background: "#ffffff", padding: "96px 24px" }}>
      <div className="wrap">

        {/* Eyebrow */}
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{
              fontSize: 13, fontWeight: 600, letterSpacing: "0.06em",
              textTransform: "uppercase", color: "#b8902e",
            }}>
              {s.eyebrow}
            </div>
          </div>
        </ScrollReveal>

        {/* Quote card */}
        <ScrollReveal delay={80}>
          <div style={{
            maxWidth: 700, margin: "0 auto",
            background: "#fafaf8",
            border: "1px solid #e8e6dc",
            borderRadius: 20,
            padding: "44px 48px",
          }}>
            {/* Opening quote mark */}
            <div style={{
              fontSize: 72, lineHeight: 0.75,
              color: "#f5ebd0",
              fontFamily: "Georgia, 'Times New Roman', serif",
              marginBottom: 22,
              userSelect: "none",
              letterSpacing: "-0.02em",
            }}>
              &ldquo;
            </div>

            {/* Star rating */}
            <div style={{ display: "flex", gap: 3, marginBottom: 22 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} style={{ fontSize: 16, color: "#d4af37" }}>★</span>
              ))}
            </div>

            {/* Quote text */}
            <blockquote style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
              fontSize: 19, fontWeight: 400, lineHeight: 1.65,
              color: "#1a1a2e", margin: "0 0 36px",
              fontStyle: "italic",
            }}>
              {s.quote}
            </blockquote>

            {/* Author row */}
            <div style={{
              display: "flex", alignItems: "center",
              gap: 16, flexWrap: "wrap",
            }}>
              {/* Photo placeholder */}
              <div style={{
                width: 52, height: 52, borderRadius: "50%",
                background: "#e8e6dc",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                fontSize: 10, color: "#8a8a98", fontWeight: 600,
                textAlign: "center", lineHeight: 1.2,
                border: "2px dashed #d4d0c8",
              }}>
                FOTO
              </div>

              {/* Name + role */}
              <div style={{ flex: 1, minWidth: 120 }}>
                <div style={{
                  fontSize: 15, fontWeight: 700, color: "#1a1a2e", marginBottom: 2,
                  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                }}>
                  {s.name}
                </div>
                <div style={{ fontSize: 13, color: "#5a5a6e" }}>{s.role}</div>
              </div>

              {/* Metric badge */}
              <div style={{
                background: "#fdf9ed",
                border: "1px solid #f5ebd0",
                borderRadius: 12,
                padding: "12px 18px",
                textAlign: "center",
                flexShrink: 0,
              }}>
                <div style={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: 20, fontWeight: 700, color: "#b8902e",
                  lineHeight: 1, letterSpacing: "-0.01em",
                }}>
                  {s.stat}
                </div>
                <div style={{ fontSize: 11, color: "#8a8a98", marginTop: 4 }}>
                  {s.statLabel}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
