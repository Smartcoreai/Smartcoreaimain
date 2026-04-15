"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/i18n";
import { Mail, MapPin, Target, BarChart2, Users, ArrowRight } from "lucide-react";

const TEAM_META = [
  { image: "/team/aleksander.png" },
  { image: "/team/henrik.png" },
];

const VALUE_ICONS = [Target, BarChart2, Users];

export default function AboutPage() {
  const { t } = useLanguage();
  const a = t.about;

  const members = (a.team.members as readonly { name: string; role: string; bio: string; email: string }[]).map(
    (m, i) => ({ ...m, ...TEAM_META[i] }),
  );

  return (
    <>
      <Navbar />

      <main style={{ background: "#ffffff" }}>

        {/* ── 1. Hero ──────────────────────────────────────────────────────── */}
        <section style={{ background: "#ffffff", padding: "140px 24px 96px", textAlign: "center" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <ScrollReveal>
              <div style={{
                fontSize: 13, fontWeight: 600,
                letterSpacing: "0.06em", textTransform: "uppercase",
                color: "#b8902e", marginBottom: 20,
              }}>
                {a.hero.tag}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(44px, 7vw, 80px)",
                fontWeight: 700, lineHeight: 1.1,
                color: "#1a1a2e",
                margin: "0 0 24px",
                letterSpacing: "-0.02em",
              }}>
                {a.hero.headline1}
                <br />
                <span style={{ fontStyle: "italic", color: "#b8902e" }}>{a.hero.headline2}</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p style={{
                fontSize: 18, color: "#5a5a6e", lineHeight: 1.75,
                maxWidth: 600, margin: "0 auto 32px",
              }}>
                {a.hero.subtext}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "8px 16px", borderRadius: 999,
                background: "#fafaf8", border: "1px solid #e8e6dc",
                fontSize: 13, color: "#5a5a6e", fontWeight: 500,
              }}>
                <MapPin size={13} style={{ color: "#b8902e" }} />
                Bergen, Norway · Grunnlagt 2026
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── 2. Gold divider ──────────────────────────────────────────────── */}
        <div style={{ display: "flex", justifyContent: "center", padding: "0 0 0" }}>
          <div style={{
            width: 48, height: 2,
            background: "linear-gradient(90deg, #b8902e, #f5d87e, #b8902e)",
            borderRadius: 2,
          }} />
        </div>

        {/* ── 3. Team ──────────────────────────────────────────────────────── */}
        <section style={{ background: "#ffffff", padding: "96px 24px" }}>
          <div className="wrap">
            <ScrollReveal>
              <div style={{ textAlign: "center", marginBottom: 64 }}>
                <div style={{
                  fontSize: 13, fontWeight: 600,
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  color: "#b8902e", marginBottom: 16,
                }}>
                  {a.team.tag}
                </div>
                <h2 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(28px, 4vw, 46px)",
                  fontWeight: 700, color: "#1a1a2e",
                  margin: 0, letterSpacing: "-0.02em",
                }}>
                  {a.team.headline}
                </h2>
              </div>
            </ScrollReveal>

            <div className="about-team-grid">
              {members.map((member, i) => (
                <ScrollReveal key={member.name} delay={i * 80} style={{ height: "100%" }}>
                  <div
                    style={{
                      background: "#ffffff", border: "1px solid #e8e6dc",
                      borderRadius: 24, padding: "48px 36px",
                      textAlign: "center", height: "100%",
                      display: "flex", flexDirection: "column",
                      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "#f5ebd0";
                      el.style.boxShadow = "0 8px 40px rgba(184,144,46,0.10)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "#e8e6dc";
                      el.style.boxShadow = "none";
                    }}
                  >
                    {/* Photo */}
                    <div style={{
                      width: 160, height: 160, borderRadius: "50%",
                      overflow: "hidden", margin: "0 auto 28px",
                      border: "3px solid #f5ebd0", flexShrink: 0,
                    }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={member.image}
                        alt={member.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>

                    {/* Name */}
                    <h3 style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: 22, fontWeight: 700, color: "#1a1a2e",
                      margin: "0 0 6px", letterSpacing: "-0.01em",
                    }}>
                      {member.name}
                    </h3>

                    {/* Role */}
                    <div style={{
                      fontSize: 13, fontWeight: 700, color: "#b8902e",
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      marginBottom: 20,
                    }}>
                      {member.role}
                    </div>

                    {/* Divider */}
                    <div style={{
                      width: 36, height: 1,
                      background: "#f5ebd0",
                      margin: "0 auto 20px",
                    }} />

                    {/* Bio */}
                    <p style={{
                      fontSize: 15, color: "#5a5a6e", lineHeight: 1.8,
                      margin: 0, flexGrow: 1,
                    }}>
                      {member.bio}
                    </p>

                    {/* Email */}
                    <a
                      href={`mailto:${member.email}`}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        marginTop: 28, fontSize: 13, color: "#1a1a2e",
                        textDecoration: "none", padding: "9px 18px",
                        borderRadius: 10, border: "1px solid #e8e6dc",
                        background: "#fafaf8", transition: "all 0.2s ease",
                        fontFamily: "inherit", fontWeight: 500,
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "#f5ebd0";
                        el.style.background = "#fdf9ed";
                        el.style.color = "#b8902e";
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "#e8e6dc";
                        el.style.background = "#fafaf8";
                        el.style.color = "#1a1a2e";
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

        {/* ── 4+5. Story + Values ───────────────────────────────────────────── */}
        <section style={{ background: "#f7f6f1", padding: "96px 24px" }}>
          {/* Story text */}
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <ScrollReveal>
              <div style={{ marginBottom: 48 }}>
                <div style={{
                  fontSize: 13, fontWeight: 600,
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  color: "#b8902e", marginBottom: 16,
                }}>
                  {a.story.tag}
                </div>
                <h2 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(28px, 4vw, 46px)",
                  fontWeight: 700, color: "#1a1a2e",
                  margin: 0, letterSpacing: "-0.02em",
                }}>
                  {a.story.headline}
                </h2>
              </div>
            </ScrollReveal>

            {(a.story.paragraphs as readonly string[]).map((para, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <p style={{
                  fontSize: i === 0 ? 17 : 15,
                  color: i === 0 ? "#1a1a2e" : "#5a5a6e",
                  lineHeight: 1.85, marginBottom: 20,
                  fontFamily: "Georgia, serif",
                }}>
                  {i === 0 && (
                    <span style={{
                      float: "left",
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "4.2em", lineHeight: 0.75,
                      paddingRight: "0.09em", paddingTop: "0.1em",
                      color: "#b8902e", fontStyle: "normal",
                    }}>
                      {para[0]}
                    </span>
                  )}
                  {i === 0 ? para.slice(1) : para}
                </p>
              </ScrollReveal>
            ))}
          </div>

          {/* Values grid */}
          <div className="wrap" style={{ marginTop: 64 }}>
            <div className="about-values-grid">
              {(a.values as readonly { title: string; desc: string }[]).map((val, i) => {
                const Icon = VALUE_ICONS[i];
                return (
                  <ScrollReveal key={i} delay={i * 80}>
                    <div
                      style={{
                        background: "#ffffff", border: "1px solid #e8e6dc",
                        borderRadius: 16, padding: "28px 24px",
                        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "#f5ebd0";
                        el.style.boxShadow = "0 4px 20px rgba(184,144,46,0.08)";
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "#e8e6dc";
                        el.style.boxShadow = "none";
                      }}
                    >
                      <div style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: "#fdf9ed", border: "1px solid #f5ebd0",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#b8902e", marginBottom: 16, flexShrink: 0,
                      }}>
                        <Icon size={20} />
                      </div>
                      <h3 style={{
                        fontSize: 16, fontWeight: 600, color: "#1a1a2e",
                        margin: "0 0 8px", letterSpacing: "-0.01em",
                      }}>
                        {val.title}
                      </h3>
                      <p style={{ fontSize: 14, color: "#5a5a6e", lineHeight: 1.7, margin: 0 }}>
                        {val.desc}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 6. CTA ───────────────────────────────────────────────────────── */}
        <section style={{ background: "#ffffff", padding: "96px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <ScrollReveal>
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(32px, 4.5vw, 52px)",
                fontWeight: 700, color: "#1a1a2e",
                margin: "0 0 20px", letterSpacing: "-0.02em",
              }}>
                {a.cta.headline}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <p style={{ fontSize: 17, color: "#5a5a6e", lineHeight: 1.7, margin: "0 0 36px" }}>
                {a.cta.subtitle}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <a href="#booking" className="btn-primary" style={{ fontSize: 16, padding: "16px 32px" }}>
                {a.cta.button} <ArrowRight size={16} />
              </a>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <p style={{ fontSize: 13, color: "#8a8a98", marginTop: 20 }}>
                {a.cta.trustLine}
              </p>
            </ScrollReveal>
          </div>
        </section>

      </main>

      <Footer />
      <ChatWidget />

      <style>{`
        .about-team-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          max-width: 960px;
          margin: 0 auto;
          align-items: stretch;
        }
        .about-team-grid > .reveal {
          display: flex;
          flex-direction: column;
        }
        .about-values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 960px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .about-team-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .about-values-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
