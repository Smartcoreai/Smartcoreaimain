"use client";

import "../landing.css";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";
import { useLanguage } from "@/lib/i18n";

const FONT = "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";
const INK = "var(--lp-ink)";
const INK_SECONDARY = "var(--lp-ink-secondary)";
const INK_TERTIARY = "var(--lp-ink-tertiary)";
const GOLD = "var(--lp-gold)";
const LAVENDER_BG = "var(--lp-lavender-bg)";
const LAVENDER_SOFT = "var(--lp-lavender-soft)";
const BORDER = "var(--lp-border)";
const CARD_BG = "var(--lp-bg-card)";

function MailtoLink({ email }: { email: string }) {
  return (
    <a
      href={`mailto:${email}`}
      style={{ color: GOLD, textDecoration: "underline", textUnderlineOffset: 3 }}
    >
      {email}
    </a>
  );
}

export default function PersonvernPage() {
  const { t } = useLanguage();
  const p = t.personvern;

  const sectionStyle: React.CSSProperties = {
    scrollMarginTop: 112,
    borderTop: `1px solid ${BORDER}`,
    paddingTop: 40,
    paddingBottom: 8,
    marginTop: 40,
  };
  const h2Style: React.CSSProperties = {
    fontFamily: FONT,
    fontSize: 24,
    fontWeight: 700,
    color: INK,
    letterSpacing: "-0.01em",
    margin: "0 0 16px",
    lineHeight: 1.25,
  };
  const h3Style: React.CSSProperties = {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 700,
    color: INK,
    margin: "20px 0 8px",
    letterSpacing: "-0.005em",
  };
  const pStyle: React.CSSProperties = {
    fontSize: 15.5,
    color: INK_SECONDARY,
    lineHeight: 1.75,
    margin: "0 0 12px",
  };
  const bulletListStyle: React.CSSProperties = {
    margin: "8px 0 16px",
    padding: 0,
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  };
  const bulletStyle: React.CSSProperties = {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    fontSize: 15.5,
    color: INK_SECONDARY,
    lineHeight: 1.7,
  };
  const dotStyle: React.CSSProperties = {
    color: GOLD,
    fontWeight: 700,
    flexShrink: 0,
    marginTop: 1,
    fontSize: 18,
    lineHeight: 1,
  };

  return (
    <div className="lp-root" style={{ background: "var(--lp-bg-page)", minHeight: "100vh" }}>
      <LandingNavbar />

      <main style={{ paddingTop: 112, paddingBottom: 96, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>

          {/* Eyebrow */}
          <div style={{
            fontSize: 12, fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", color: GOLD, marginBottom: 14,
            fontFamily: FONT,
          }}>
            {p.eyebrow}
          </div>

          {/* H1 */}
          <h1 style={{
            fontFamily: FONT,
            fontSize: "clamp(34px, 5vw, 52px)",
            fontWeight: 800,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            color: INK,
            margin: "0 0 18px",
          }}>
            {p.headline}
          </h1>

          {/* Meta */}
          <p style={{ fontSize: 14, color: INK_TERTIARY, margin: "0 0 4px", fontFamily: FONT }}>
            {p.updated}
          </p>
          <p style={{ fontSize: 14, color: INK_TERTIARY, margin: "0 0 4px", fontFamily: FONT }}>
            {p.reviewed}
          </p>
          <p style={{ fontSize: 14, color: INK_TERTIARY, margin: "0 0 40px", fontFamily: FONT }}>
            {p.scope}
          </p>

          {/* TOC */}
          <nav
            aria-label={p.tocLabel}
            style={{
              background: LAVENDER_BG,
              border: `1px solid ${LAVENDER_SOFT}`,
              borderRadius: 14,
              padding: "20px 24px",
              marginBottom: 8,
            }}
          >
            <div style={{
              fontSize: 12, fontWeight: 700, letterSpacing: "0.08em",
              textTransform: "uppercase", color: INK, marginBottom: 12,
              fontFamily: FONT,
            }}>
              {p.tocLabel}
            </div>
            <ol style={{
              margin: 0, padding: 0, listStyle: "none",
              display: "grid", gap: 6,
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            }}>
              {p.toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    style={{
                      fontSize: 14, color: INK, textDecoration: "none",
                      display: "inline-block", padding: "2px 0",
                      fontFamily: FONT,
                      borderBottom: "1px solid transparent",
                      transition: "border-color 0.15s, color 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = GOLD;
                      e.currentTarget.style.borderBottomColor = GOLD;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = INK;
                      e.currentTarget.style.borderBottomColor = "transparent";
                    }}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* 1. Innledning */}
          <section id="innledning" style={sectionStyle}>
            <h2 style={h2Style}>{p.intro.title}</h2>
            {p.intro.paragraphs.map((para, i) => (
              <p key={i} style={pStyle}>{para}</p>
            ))}
            <p style={{ ...pStyle, margin: "12px 0 4px", fontWeight: 600, color: INK }}>
              {p.intro.contactLabel}
            </p>
            <ul style={bulletListStyle}>
              {p.intro.contacts.map((c) => (
                <li key={c.label} style={bulletStyle}>
                  <span style={dotStyle}>·</span>
                  <span>
                    <strong style={{ color: INK, fontWeight: 600 }}>{c.label}:</strong>{" "}
                    {c.emails.map((email, i) => (
                      <span key={email}>
                        <MailtoLink email={email} />
                        {i < c.emails.length - 1 && ", "}
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* 2. Data */}
          <section id="data" style={sectionStyle}>
            <h2 style={h2Style}>{p.data.title}</h2>
            {p.data.groups.map((g) => (
              <div key={g.heading}>
                <h3 style={h3Style}>{g.heading}</h3>
                <ul style={bulletListStyle}>
                  {g.bullets.map((b) => (
                    <li key={b} style={bulletStyle}>
                      <span style={dotStyle}>·</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div style={{
              marginTop: 16,
              background: CARD_BG,
              border: `1px solid ${BORDER}`,
              borderRadius: 12,
              padding: "16px 18px",
            }}>
              <p style={{ ...pStyle, margin: 0, color: INK }}>{p.data.role}</p>
            </div>
          </section>

          {/* 3. Storage / sub-processors */}
          <section id="lagring" style={sectionStyle}>
            <h2 style={h2Style}>{p.storage.title}</h2>
            <p style={pStyle}>{p.storage.intro}</p>

            <div style={{
              marginTop: 8,
              border: `1px solid ${BORDER}`,
              borderRadius: 12,
              overflow: "hidden",
              background: CARD_BG,
            }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 14.5,
                  fontFamily: FONT,
                  minWidth: 560,
                }}>
                  <thead>
                    <tr style={{ background: "var(--lp-gold-bg)" }}>
                      {p.storage.headers.map((h) => (
                        <th
                          key={h}
                          scope="col"
                          style={{
                            textAlign: "left",
                            padding: "12px 16px",
                            fontWeight: 700,
                            color: INK,
                            letterSpacing: "-0.005em",
                            borderBottom: `1px solid ${BORDER}`,
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {p.storage.rows.map((row, i) => (
                      <tr key={row.provider} style={{
                        borderTop: i === 0 ? "none" : `1px solid ${BORDER}`,
                      }}>
                        <td style={{
                          padding: "12px 16px",
                          color: INK,
                          fontWeight: 600,
                          verticalAlign: "top",
                          whiteSpace: "nowrap",
                        }}>
                          {row.provider}
                        </td>
                        <td style={{
                          padding: "12px 16px",
                          color: INK_SECONDARY,
                          verticalAlign: "top",
                          whiteSpace: "nowrap",
                        }}>
                          {row.location}
                        </td>
                        <td style={{
                          padding: "12px 16px",
                          color: INK_SECONDARY,
                          verticalAlign: "top",
                          lineHeight: 1.55,
                        }}>
                          {row.purpose}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 4. Legal */}
          <section id="grunnlag" style={sectionStyle}>
            <h2 style={h2Style}>{p.legal.title}</h2>
            <p style={pStyle}>{p.legal.intro}</p>
            <ul style={bulletListStyle}>
              {p.legal.items.map((it) => (
                <li key={it.label} style={{ ...bulletStyle, alignItems: "flex-start" }}>
                  <span style={dotStyle}>·</span>
                  <span>
                    <strong style={{ color: INK, fontWeight: 600 }}>{it.label}:</strong>{" "}
                    {it.basis} <span style={{ color: INK_TERTIARY }}>({it.article})</span>: {it.desc}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* 5. Retention */}
          <section id="lagringstid" style={sectionStyle}>
            <h2 style={h2Style}>{p.retention.title}</h2>
            <ul style={bulletListStyle}>
              {p.retention.bullets.map((b) => (
                <li key={b} style={bulletStyle}>
                  <span style={dotStyle}>·</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 6. Rights */}
          <section id="rettigheter" style={sectionStyle}>
            <h2 style={h2Style}>{p.rights.title}</h2>
            <p style={pStyle}>{p.rights.intro}</p>
            <ul style={bulletListStyle}>
              {p.rights.bullets.map((b) => (
                <li key={b} style={bulletStyle}>
                  <span style={dotStyle}>·</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p style={pStyle}>
              {p.rights.howBefore}
              <MailtoLink email={p.rights.email} />
              {p.rights.howAfter}
            </p>
            <p style={pStyle}>{p.rights.complaint}</p>
          </section>

          {/* 7. Cookies */}
          <section id="cookies" style={sectionStyle}>
            <h2 style={h2Style}>{p.cookies.title}</h2>
            <p style={pStyle}>{p.cookies.body}</p>
          </section>

          {/* 8. Changes */}
          <section id="endringer" style={sectionStyle}>
            <h2 style={h2Style}>{p.changes.title}</h2>
            <p style={pStyle}>{p.changes.body}</p>
          </section>

          {/* 9. Authority */}
          <section id="datatilsynet" style={sectionStyle}>
            <h2 style={h2Style}>{p.authority.title}</h2>
            <p style={pStyle}>{p.authority.body}</p>
            <p style={pStyle}>
              <a
                href={p.authority.linkHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: GOLD, textDecoration: "underline", textUnderlineOffset: 3, fontWeight: 600 }}
              >
                {p.authority.linkLabel} ↗
              </a>
            </p>
          </section>

          {/* Final divider */}
          <div style={{ borderTop: `1px solid ${BORDER}`, marginTop: 40 }} />

        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
