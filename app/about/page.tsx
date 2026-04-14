"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/i18n";
import { Mail, MapPin } from "lucide-react";

const TEAM_META = [
  { image: "/team/aleksander.png", initials: "A" },
  { image: "/team/henrik.png",     initials: "H" },
];

export default function AboutPage() {
  const { t } = useLanguage();
  const a = t.about;

  const members = (a.team.members as readonly { name: string; role: string; bio: string; email: string }[]).map(
    (m, i) => ({ ...m, ...TEAM_META[i] }),
  );

  return (
    <>
      <Navbar />

      <main style={{ background: "#0a0a0a" }}>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "140px 24px 100px",
          }}
        >
          {/* Radial gold glow */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 900px 500px at 50% -60px, rgba(212,175,55,0.11) 0%, transparent 70%)",
          }} />
          {/* Subtle grid */}
          <div className="bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />

          {/* Decorative thin gold lines */}
          <div style={{
            position: "absolute", left: "50%", top: 0, transform: "translateX(-50%)",
            width: 1, height: 80, background: "linear-gradient(180deg, transparent, rgba(212,175,55,0.5))",
          }} />

          <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 780, margin: "0 auto" }}>
            <ScrollReveal>
              <span className="tag">{a.hero.tag}</span>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(52px, 9vw, 96px)",
                lineHeight: 1.06,
                color: "#F5F0E8",
                margin: "28px 0 0",
                letterSpacing: "-0.03em",
              }}>
                {a.hero.headline1}
                <br />
                <span className="text-gradient">{a.hero.headline2}</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p style={{
                fontSize: "clamp(16px, 2.2vw, 20px)",
                color: "#8A8070",
                lineHeight: 1.75,
                maxWidth: 600,
                margin: "28px auto 0",
              }}>
                {a.hero.subtext}
              </p>
            </ScrollReveal>

            {/* Location tag */}
            <ScrollReveal delay={300}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginTop: 32,
                padding: "6px 14px",
                borderRadius: 999,
                background: "rgba(212,175,55,0.05)",
                border: "1px solid rgba(212,175,55,0.15)",
                fontSize: 12,
                color: "#8A8070",
                letterSpacing: "0.05em",
              }}>
                <MapPin size={12} style={{ color: "#D4AF37" }} />
                Bergen, Norway · Founded 2026
              </div>
            </ScrollReveal>
          </div>

          {/* Bottom decorative line */}
          <div style={{
            position: "absolute", left: "50%", bottom: 0, transform: "translateX(-50%)",
            width: 1, height: 60, background: "linear-gradient(180deg, rgba(212,175,55,0.4), transparent)",
          }} />
        </section>

        <div className="divider" />

        {/* ── Team ─────────────────────────────────────────────────────────── */}
        <section style={{ padding: "96px 24px" }}>
          <div className="wrap">
            <ScrollReveal>
              <div style={{ textAlign: "center", marginBottom: 64 }}>
                <span className="tag">{a.team.tag}</span>
                <h2 style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: "clamp(28px, 4vw, 46px)",
                  fontWeight: 700,
                  color: "#F5F0E8",
                  margin: "16px 0 0",
                  letterSpacing: "-0.025em",
                }}>
                  {a.team.headline}
                </h2>
              </div>
            </ScrollReveal>

            <div className="team-grid">
              {members.map((member, i) => (
                <ScrollReveal key={member.name} delay={i * 160}>
                  <div
                    className="glass-card-hover"
                    style={{ padding: "52px 44px", textAlign: "center" }}
                  >
                    {/* Photo */}
                    <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-2 border-yellow-600" style={{ marginBottom: 32, boxShadow: "0 0 30px rgba(212,175,55,0.15)" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={member.image}
                        alt={member.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>

                    {/* Name */}
                    <h3 style={{
                      fontFamily: "Syne, sans-serif",
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#F5F0E8",
                      margin: "0 0 6px",
                      letterSpacing: "-0.015em",
                    }}>
                      {member.name}
                    </h3>

                    {/* Role */}
                    <div style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#D4AF37",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: 24,
                    }}>
                      {member.role}
                    </div>

                    {/* Gold divider */}
                    <div style={{
                      width: 36,
                      height: 1,
                      background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)",
                      margin: "0 auto 24px",
                    }} />

                    {/* Bio */}
                    <p style={{
                      fontSize: 15,
                      color: "#8A8070",
                      lineHeight: 1.8,
                      margin: "0 0 28px",
                    }}>
                      {member.bio}
                    </p>

                    {/* Email */}
                    <a
                      href={`mailto:${member.email}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 13,
                        color: "#D4AF37",
                        textDecoration: "none",
                        padding: "8px 18px",
                        borderRadius: 10,
                        border: "1px solid rgba(212,175,55,0.2)",
                        background: "rgba(212,175,55,0.04)",
                        transition: "all 0.2s ease",
                        fontFamily: "inherit",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(212,175,55,0.5)";
                        el.style.background = "rgba(212,175,55,0.1)";
                        el.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(212,175,55,0.2)";
                        el.style.background = "rgba(212,175,55,0.04)";
                        el.style.transform = "translateY(0)";
                      }}
                    >
                      <Mail size={13} />
                      {member.email}
                    </a>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ── Story ────────────────────────────────────────────────────────── */}
        <section style={{ padding: "96px 24px" }}>
          <div className="wrap-narrow">
            <ScrollReveal>
              <span className="tag">{a.story.tag}</span>
              <h2 style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(28px, 4vw, 46px)",
                fontWeight: 700,
                color: "#F5F0E8",
                margin: "16px 0 56px",
                letterSpacing: "-0.025em",
              }}>
                {a.story.headline}
              </h2>
            </ScrollReveal>

            {/* Article-style text with left gold rule */}
            <div style={{
              borderLeft: "2px solid rgba(212,175,55,0.18)",
              paddingLeft: 40,
              display: "flex",
              flexDirection: "column",
              gap: 28,
            }}>
              {(a.story.paragraphs as readonly string[]).map((para, i) => (
                <ScrollReveal key={i} delay={i * 70}>
                  <p style={{
                    fontSize: i === 0 ? 18 : 16,
                    color: i === 0 ? "#C4BAA8" : "#7A7060",
                    lineHeight: 1.9,
                    margin: 0,
                    fontWeight: 400,
                    fontFamily: "Georgia, serif",
                    fontStyle: i === 0 ? "italic" : "normal",
                  }}>
                    {i === 0 && (
                      <span style={{
                        float: "left",
                        fontFamily: "Playfair Display, serif",
                        fontSize: "4em",
                        lineHeight: 0.75,
                        paddingRight: "0.1em",
                        paddingTop: "0.12em",
                        color: "#D4AF37",
                        fontStyle: "normal",
                      }}>
                        {para[0]}
                      </span>
                    )}
                    {i === 0 ? para.slice(1) : para}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section style={{ padding: "80px 24px 96px" }}>
          <div className="wrap">
            <ScrollReveal>
              <div style={{
                position: "relative",
                overflow: "hidden",
                background: "rgba(212,175,55,0.04)",
                border: "1px solid rgba(212,175,55,0.18)",
                borderRadius: 24,
                padding: "72px 40px",
                textAlign: "center",
              }}>
                {/* Glow */}
                <div style={{
                  position: "absolute", inset: 0, pointerEvents: "none",
                  background: "radial-gradient(ellipse 700px 350px at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)",
                }} />
                {/* Corner ornaments */}
                <div style={{
                  position: "absolute", top: 24, left: 24,
                  width: 40, height: 40,
                  borderTop: "1px solid rgba(212,175,55,0.3)",
                  borderLeft: "1px solid rgba(212,175,55,0.3)",
                  borderRadius: "4px 0 0 0",
                }} />
                <div style={{
                  position: "absolute", top: 24, right: 24,
                  width: 40, height: 40,
                  borderTop: "1px solid rgba(212,175,55,0.3)",
                  borderRight: "1px solid rgba(212,175,55,0.3)",
                  borderRadius: "0 4px 0 0",
                }} />
                <div style={{
                  position: "absolute", bottom: 24, left: 24,
                  width: 40, height: 40,
                  borderBottom: "1px solid rgba(212,175,55,0.3)",
                  borderLeft: "1px solid rgba(212,175,55,0.3)",
                  borderRadius: "0 0 0 4px",
                }} />
                <div style={{
                  position: "absolute", bottom: 24, right: 24,
                  width: 40, height: 40,
                  borderBottom: "1px solid rgba(212,175,55,0.3)",
                  borderRight: "1px solid rgba(212,175,55,0.3)",
                  borderRadius: "0 0 4px 0",
                }} />

                <h2 style={{
                  fontFamily: "Playfair Display, Georgia, serif",
                  fontSize: "clamp(28px, 5vw, 52px)",
                  fontWeight: 700,
                  color: "#F5F0E8",
                  margin: "0 0 36px",
                  letterSpacing: "-0.025em",
                  position: "relative",
                  zIndex: 1,
                }}>
                  {a.cta.headline}
                </h2>

                <div style={{ position: "relative", zIndex: 1, display: "inline-flex" }}>
                  {/* Pulse rings around CTA button */}
                  <div style={{
                    position: "absolute", inset: -6, borderRadius: 18,
                    border: "1.5px solid rgba(212,175,55,0.4)",
                    animation: "pulseRing 2s ease-out infinite",
                    pointerEvents: "none",
                  }} />
                  <div style={{
                    position: "absolute", inset: -12, borderRadius: 22,
                    border: "1.5px solid rgba(212,175,55,0.18)",
                    animation: "pulseRing 2s ease-out 0.7s infinite",
                    pointerEvents: "none",
                  }} />
                  <a href="/#booking" className="btn-primary" style={{ padding: "14px 36px", fontSize: 15 }}>
                    {a.cta.button}
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />

      <style>{`
        .team-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          max-width: 960px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .team-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
