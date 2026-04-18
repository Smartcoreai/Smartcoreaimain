"use client";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer as unknown as {
    tagline: string;
    rights: string;
    followUs: string;
    categories: { Company: string };
    links: { Company: { label: string; href: string; target?: string }[] };
  };

  return (
    <>
    <footer style={{
      background: "#ffffff",
      borderTop: "1px solid #e8e6dc",
      padding: "64px 24px 32px",
    }}>
      <div className="wrap">

        {/* Top grid: brand + company links + follow us */}
        <div className="footer-grid" style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr",
          gap: 40,
          marginBottom: 56,
        }}>

          {/* Brand column */}
          <div>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", marginBottom: 16 }}>
              <Image
                src="/ekspedenten-logo.png"
                alt="Ekspedenten logo"
                height={40} width={40}
                style={{ width: "auto", height: 40, objectFit: "contain" }}
              />
              <span style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                fontWeight: 700, fontSize: 17, color: "#1a1a2e", letterSpacing: "-0.02em",
              }}>
                Ekspedenten
              </span>
            </a>

            <p style={{
              fontSize: 14, color: "#5a5a6e", lineHeight: 1.7,
              maxWidth: 240, margin: "0 0 16px",
            }}>
              {f.tagline}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                { label: "📞", text: "+47 XXX XX XXX", href: "tel:+47XXXXXXXXX" },
                { label: "✉️", text: "hei@ekspedenten.no", href: "mailto:hei@ekspedenten.no" },
                { label: "📍", text: "Bergen, Norge", href: undefined },
              ].map(({ label, text, href }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#5a5a6e" }}>
                  <span style={{ fontSize: 12 }}>{label}</span>
                  {href
                    ? <a href={href} style={{ color: "#5a5a6e", textDecoration: "none", transition: "color 0.15s" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#1a1a2e"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#5a5a6e"; }}
                      >{text}</a>
                    : <span>{text}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Company links column */}
          <div>
            <div style={{
              fontSize: 11, fontWeight: 700, color: "#1a1a2e",
              textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16,
            }}>
              {f.categories.Company}
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {f.links.Company.map((link) => (
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

          {/* Follow us column */}
          <div>
            <div style={{
              fontSize: 11, fontWeight: 700, color: "#1a1a2e",
              textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16,
            }}>
              {f.followUs}
            </div>
            <a
              href="https://www.linkedin.com/company/smart-coreai/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ekspedenten on LinkedIn"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 44, height: 44, borderRadius: 12,
                background: "#f7f6f1", border: "1px solid #e8e6dc",
                color: "#5a5a6e", textDecoration: "none", transition: "all 0.15s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "#b8902e";
                el.style.borderColor = "#b8902e";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "#5a5a6e";
                el.style.borderColor = "#e8e6dc";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
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
        @media (max-width: 600px) {
          .bottom-bar { flex-direction: column !important; gap: 8px !important; text-align: center !important; }
        }
      `}</style>
    </footer>

    {/* Navy bottom bar */}
    <div
      className="bottom-bar"
      style={{
        background: "#1a1a2e",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "16px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
        © {new Date().getFullYear()} Ekspedenten. {f.rights}
      </span>
      <a
        href="/privacy"
        style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.15s" }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#b8902e"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
      >
        Privacy Policy
      </a>
    </div>
    </>
  );
}
