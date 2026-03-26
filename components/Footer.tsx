"use client";
import { Zap, Twitter, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{ background: "#08080c", borderTop: "1px solid rgba(255,255,255,0.04)", padding: "64px 24px 32px" }}>
      <div className="wrap">
        {/* Top row */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr repeat(4, 1fr)", gap: 40, marginBottom: 56 }} className="footer-grid">
          {/* Brand */}
          <div>
            <a href="#" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", marginBottom: 16 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#a855f7,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(168,85,247,0.3)" }}>
                <Zap size={18} color="white" fill="white" />
              </div>
              <span style={{ fontFamily: "Syne, system-ui, sans-serif", fontWeight: 700, fontSize: 18, color: "#f4f4f8", letterSpacing: "-0.02em" }}>
                Smartcore<span style={{ color: "#a855f7" }}>AI</span>
              </span>
            </a>
            <p style={{ fontSize: 14, color: "#8888a0", lineHeight: 1.7, maxWidth: 240, margin: "0 0 20px" }}>
              {t.footer.tagline}
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[{ icon: <Twitter size={14} />, href: "#" }, { icon: <Linkedin size={14} />, href: "#" }, { icon: <Instagram size={14} />, href: "#" }].map((s, i) => (
                <a key={i} href={s.href} style={{
                  width: 34, height: 34, borderRadius: 10,
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#8888a0", textDecoration: "none", transition: "all 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#a855f7"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.4)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#8888a0"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {(["Services", "Company", "Resources", "Legal"] as const).map((cat) => (
            <div key={cat}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#f4f4f8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
                {t.footer.categories[cat]}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {t.footer.links[cat].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} style={{ fontSize: 13, color: "#8888a0", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.color = "#f4f4f8"; }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.color = "#8888a0"; }}
                    >{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA band */}
        <div style={{
          background: "linear-gradient(135deg, rgba(168,85,247,0.1), rgba(34,211,238,0.05))",
          border: "1px solid rgba(168,85,247,0.2)", borderRadius: 18,
          padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20,
          marginBottom: 40,
        }}>
          <div>
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 700, color: "#f4f4f8", letterSpacing: "-0.02em" }}>
              {t.footer.ctaHeadline}
            </div>
            <div style={{ fontSize: 13, color: "#8888a0", marginTop: 4 }}>{t.footer.ctaSub}</div>
          </div>
          <a href="#booking" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 24px", borderRadius: 12, fontWeight: 600, fontSize: 14,
            background: "linear-gradient(135deg,#a855f7,#7c3aed)", color: "white", textDecoration: "none",
            boxShadow: "0 4px 20px rgba(168,85,247,0.3)", transition: "all 0.3s ease",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(168,85,247,0.4)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(168,85,247,0.3)"; }}
          >
            {t.footer.ctaButton} <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 12, color: "#44444e" }}>
            © {new Date().getFullYear()} SmartcoreAI. {t.footer.rights}
          </div>
          <div style={{ fontSize: 12, color: "#44444e" }}>
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
