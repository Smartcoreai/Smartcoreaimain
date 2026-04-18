"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/i18n";
import { Mail, MapPin, Target, BarChart2, Users } from "lucide-react";

const TEAM_META = [
  { image: "/team/henrik.png" },
  { image: "/team/aleksander.png" },
];

const VALUE_ICONS = [Target, BarChart2, Users];

export default function AboutPage() {
  const { t } = useLanguage();
  const a = t.about;

  const members = (a.team.members as readonly { name: string; role: string; bio: string; email: string; linkedin: string }[]).map(
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
                <span style={{ color: "#b8902e" }}>{a.hero.headline2}</span>
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

                    {/* Contact row: email + LinkedIn */}
                    <div className="contact-row" style={{ marginTop: 28 }}>
                      <a href={`mailto:${member.email}`} className="contact-email">
                        <Mail size={14} />
                        {member.email}
                      </a>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-linkedin"
                        aria-label="LinkedIn"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    </div>
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

            <div style={{ maxWidth: "700px", margin: "0 auto" }}>
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/smartcoreaimeeting/30min"
                style={{ minWidth: "320px", height: "700px", width: "100%" }}
              />
            </div>

            <p style={{ fontSize: 13, color: "#8a8a98", marginTop: 20 }}>
              {a.cta.trustLine}
            </p>
          </div>
        </section>

      </main>

      <Footer />

      <ChatWidget />

      <style>{`
        .contact-row {
          display: flex;
          gap: 8px;
          align-items: stretch;
          width: 100%;
        }
        .contact-email {
          flex: 1;
          background: #f7f6f1;
          border-radius: 10px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #5a5a6e;
          font-size: 13px;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
          font-family: inherit;
          font-weight: 500;
          min-width: 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .contact-email:hover { background: #f0eee5; color: #b8902e; }
        .contact-linkedin {
          width: 44px;
          flex-shrink: 0;
          background: #f7f6f1;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #5a5a6e;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .contact-linkedin:hover { background: #f0eee5; color: #1a1a2e; }

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
