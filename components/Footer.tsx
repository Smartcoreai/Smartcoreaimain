"use client";
import { Twitter, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLanguage();

  const LINK_COLS = ["Services", "Company", "Legal"] as const;

  return (
    <footer style={{
      background: "#ffffff",
      borderTop: "1px solid #e8e6dc",
      padding: "64px 24px 32px",
    }}>
      <div className="wrap">

        {/* Top grid: brand + 3 link columns */}
        <div className="footer-grid" style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 40,
          marginBottom: 56,
        }}>

          {/* Brand column */}
          <div>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", marginBottom: 16 }}>
              <Image
                src="/logo-transparent.png"
                alt="SmartcoreAI logo"
                height={36} width={36}
                style={{ width: "auto", height: 36, objectFit: "contain" }}
              />
              <span style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                fontWeight: 700, fontSize: 17, color: "#1a1a2e", letterSpacing: "-0.02em",
              }}>
                Smartcore<span style={{ color: "#b8902e" }}>AI</span>
              </span>
            </a>

            <p style={{
              fontSize: 14, color: "#5a5a6e", lineHeight: 1.7,
              maxWidth: 240, margin: "0 0 22px",
            }}>
              {t.footer.tagline}
            </p>

            {/* Social links */}
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { icon: <Twitter size={13} />, href: "#", target: undefined },
                { icon: <Linkedin size={13} />, href: "https://www.linkedin.com/company/smartcoreai", target: "_blank" },
                { icon: <Instagram size={13} />, href: "#", target: undefined },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target={s.target}
                  rel={s.target === "_blank" ? "noopener noreferrer" : undefined}
                  style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: "#f7f6f1", border: "1px solid #e8e6dc",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#8a8a98", textDecoration: "none", transition: "all 0.15s",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "#b8902e";
                    el.style.borderColor = "#f5ebd0";
                    el.style.background = "#fdf9ed";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "#8a8a98";
                    el.style.borderColor = "#e8e6dc";
                    el.style.background = "#f7f6f1";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {LINK_COLS.map((cat) => (
            <div key={cat}>
              <div style={{
                fontSize: 11, fontWeight: 700, color: "#1a1a2e",
                textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16,
              }}>
                {t.footer.categories[cat]}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {(t.footer.links[cat] as { label: string; href: string; target?: string }[]).map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.target}
                      rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                      style={{
                        fontSize: 13, color: "#5a5a6e", textDecoration: "none", transition: "color 0.15s",
                      }}
                      onMouseEnter={e => { (e.target as HTMLElement).style.color = "#1a1a2e"; }}
                      onMouseLeave={e => { (e.target as HTMLElement).style.color = "#5a5a6e"; }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#e8e6dc", marginBottom: 24 }} />

        {/* Bottom strip */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12,
        }}>
          <div style={{ fontSize: 12, color: "#8a8a98" }}>
            © {new Date().getFullYear()} SmartcoreAI. {t.footer.rights}
          </div>
          <div style={{ fontSize: 12, color: "#8a8a98" }}>
            {t.footer.builtWith}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 520px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
