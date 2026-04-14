"use client";
import { Twitter, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{ background: "#1A1A1A", borderTop: "1px solid rgba(212,175,55,0.08)", padding: "64px 24px 32px" }}>
      <div className="wrap">
        {/* Top row */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr repeat(4, 1fr)", gap: 40, marginBottom: 56 }} className="footer-grid">
          {/* Brand */}
          <div>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", marginBottom: 16 }}>
              <img src="/logo-transparent.png" alt="SmartcoreAI logo" style={{ height: 40, width: "auto", objectFit: "contain" }} />
              <span style={{ fontFamily: "Syne, system-ui, sans-serif", fontWeight: 700, fontSize: 18, color: "#F5F0E8", letterSpacing: "-0.02em" }}>
                Smartcore<span style={{ color: "#D4AF37" }}>AI</span>
              </span>
            </a>
            <p style={{ fontSize: 14, color: "#8A8070", lineHeight: 1.7, maxWidth: 240, margin: "0 0 20px" }}>
              {t.footer.tagline}
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[{ icon: <Twitter size={14} />, href: "#" }, { icon: <Linkedin size={14} />, href: "#" }, { icon: <Instagram size={14} />, href: "#" }].map((s, i) => (
                <a key={i} href={s.href} style={{
                  width: 34, height: 34, borderRadius: 10,
                  background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.10)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#8A8070", textDecoration: "none", transition: "all 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#D4AF37"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.4)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#8A8070"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.10)"; }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {(["Services", "Company", "Resources", "Legal"] as const).map((cat) => (
            <div key={cat}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#F5F0E8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
                {t.footer.categories[cat]}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {t.footer.links[cat].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} style={{ fontSize: 13, color: "#8A8070", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.color = "#F5F0E8"; }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.color = "#8A8070"; }}
                    >{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA band */}
        <div style={{
          background: "rgba(212,175,55,0.05)",
          border: "1px solid rgba(212,175,55,0.18)", borderRadius: 18,
          padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20,
          marginBottom: 40,
        }}>
          <div>
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 700, color: "#F5F0E8", letterSpacing: "-0.02em" }}>
              {t.footer.ctaHeadline}
            </div>
            <div style={{ fontSize: 13, color: "#8A8070", marginTop: 4 }}>{t.footer.ctaSub}</div>
          </div>
          <a href="#booking" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 24px", borderRadius: 12, fontWeight: 600, fontSize: 14,
            background: "linear-gradient(135deg,#D4AF37,#B8960C)", color: "#1A1A1A", textDecoration: "none",
            boxShadow: "0 4px 20px rgba(212,175,55,0.25)", transition: "all 0.3s ease",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(212,175,55,0.4)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(212,175,55,0.25)"; }}
          >
            {t.footer.ctaButton} <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 12, color: "#5A5248" }}>
            © {new Date().getFullYear()} SmartcoreAI. {t.footer.rights}
          </div>
          <div style={{ fontSize: 12, color: "#5A5248" }}>
            {t.footer.builtWith}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
