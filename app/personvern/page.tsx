"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";

const GOLD = "#c8a04a";
const MUTED = "#8A8070";
const TEXT = "#F5F0E8";
const BG = "#0a0a0a";
const CARD_BG = "rgba(200,160,74,0.05)";
const CARD_BORDER = "rgba(200,160,74,0.14)";

export default function PersonvernPage() {
  const { t } = useLanguage();
  const p = t.personvern;

  return (
    <div style={{ background: BG, minHeight: "100vh", color: TEXT }}>
      <Navbar />

      <main style={{ paddingTop: 140, paddingBottom: 120, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>

          {/* Back link */}
          <a
            href="/"
            style={{ display: "inline-block", color: MUTED, fontSize: 14, textDecoration: "none", marginBottom: 48, transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
            onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
          >
            {p.back}
          </a>

          {/* Heading */}
          <h1 style={{
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 5vw, 44px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            marginBottom: 10,
            color: TEXT,
          }}>
            {p.headline}
          </h1>

          {/* Date */}
          <p style={{ fontSize: 13, color: MUTED, marginBottom: 40 }}>{p.updated}</p>

          {/* Gold rule */}
          <div style={{ width: 40, height: 2, background: `linear-gradient(90deg, ${GOLD}, transparent)`, borderRadius: 2, marginBottom: 40 }} />

          {/* Intro notice */}
          <div style={{
            background: CARD_BG,
            border: `1px solid ${CARD_BORDER}`,
            borderRadius: 12,
            padding: "20px 24px",
            marginBottom: 48,
          }}>
            <p style={{ fontSize: 15, color: TEXT, lineHeight: 1.75, margin: 0 }}>
              {p.intro}
            </p>
          </div>

          {/* Data processors */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
              fontSize: 18, fontWeight: 600, color: TEXT,
              letterSpacing: "-0.01em", marginBottom: 20,
            }}>
              {p.processorsHeadline}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {(p.processors as readonly { name: string; desc: string }[]).map((proc) => (
                <div
                  key={proc.name}
                  style={{
                    display: "flex", gap: 16, alignItems: "flex-start",
                    padding: "14px 18px", borderRadius: 10,
                    background: CARD_BG, border: `1px solid ${CARD_BORDER}`,
                  }}
                >
                  <span style={{
                    minWidth: 120, fontSize: 13, fontWeight: 700,
                    color: GOLD, fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                    paddingTop: 1,
                  }}>
                    {proc.name}
                  </span>
                  <span style={{ fontSize: 14, color: MUTED, lineHeight: 1.6 }}>
                    {proc.desc}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 style={{
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
              fontSize: 18, fontWeight: 600, color: TEXT,
              letterSpacing: "-0.01em", marginBottom: 12,
            }}>
              {p.contactHeadline}
            </h2>
            <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, margin: 0 }}>
              {p.contactDesc}{" "}
              <a
                href="mailto:hei@ekspedenten.no"
                style={{ color: GOLD, textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                hei@ekspedenten.no
              </a>
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
