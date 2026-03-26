"use client";
import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";
import { useLanguage, type Lang } from "@/lib/i18n";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const NAV_LINKS = [
    { label: t.nav.services, href: "#services" },
    { label: t.nav.pricing,  href: "#pricing" },
    { label: t.nav.faq,      href: "#objections" },
    { label: t.nav.contact,  href: "#contact" },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const toggleLang = () => setLang(lang === "en" ? "no" : "en");

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.4s ease",
        background: scrolled ? "rgba(8,8,12,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
      }}
    >
      <div className="wrap" style={{ padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          {/* Logo */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: "linear-gradient(135deg, #a855f7, #7c3aed)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 20px rgba(168,85,247,0.4)"
            }}>
              <Zap size={18} color="white" fill="white" />
            </div>
            <span style={{
              fontFamily: "Syne, system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 18,
              color: "#f4f4f8",
              letterSpacing: "-0.02em"
            }}>
              Smartcore<span style={{ color: "#a855f7" }}>AI</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="nav-desktop" style={{ alignItems: "center", gap: 4 }}>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} style={{
                padding: "8px 14px", borderRadius: 8, fontSize: 14, fontWeight: 500,
                color: "#8888a0", textDecoration: "none", transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = "#f4f4f8"; (e.target as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = "#8888a0"; (e.target as HTMLElement).style.background = "transparent"; }}
              >{l.label}</a>
            ))}
          </nav>

          {/* Desktop CTA + Language toggle */}
          <div className="nav-desktop" style={{ alignItems: "center", gap: 10 }}>
            <button onClick={toggleLang} style={{
              padding: "7px 12px", borderRadius: 8,
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              color: "#8888a0", fontSize: 12, fontWeight: 700,
              cursor: "pointer", letterSpacing: "0.05em", fontFamily: "inherit", transition: "all 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#a855f7"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.4)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#8888a0"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
            >{lang === "en" ? "NO" : "EN"}</button>
            <a href="#contact" className="btn-outline" style={{ padding: "9px 20px", fontSize: 13 }}>{t.nav.getStarted}</a>
            <div style={{ position: "relative", display: "inline-flex" }}>
              <div style={{ position: "absolute", inset: -5, borderRadius: 16, border: "1.5px solid rgba(168,85,247,0.5)", animation: "pulseRing 2s ease-out infinite", pointerEvents: "none" }} />
              <div style={{ position: "absolute", inset: -10, borderRadius: 20, border: "1.5px solid rgba(168,85,247,0.2)", animation: "pulseRing 2s ease-out 0.7s infinite", pointerEvents: "none" }} />
              <a href="#booking" className="btn-primary" style={{ padding: "9px 20px", fontSize: 13, position: "relative", zIndex: 1 }}>{t.nav.bookCall}</a>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button className="nav-mobile" onClick={() => setMobileOpen(!mobileOpen)} style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 8, padding: 8, color: "#f4f4f8", cursor: "pointer",
            alignItems: "center", justifyContent: "center",
          }}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div style={{
          background: "rgba(8,8,12,0.97)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "20px 24px 28px",
          backdropFilter: "blur(20px)",
        }}>
          <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
                padding: "12px 16px", borderRadius: 10, fontSize: 15, fontWeight: 500,
                color: "#8888a0", textDecoration: "none", background: "rgba(255,255,255,0.02)", marginBottom: 2,
              }}>{l.label}</a>
            ))}

            {/* Language toggle row */}
            <button onClick={() => { toggleLang(); setMobileOpen(false); }} style={{
              padding: "12px 16px", borderRadius: 10, marginBottom: 2,
              background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.2)",
              color: "#c084fc", fontSize: 14, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit", textAlign: "left",
            }}>
              {lang === "en" ? "🌐 Switch to Norwegian (NO)" : "🌐 Switch to English (EN)"}
            </button>

            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="#booking" className="btn-primary" onClick={() => setMobileOpen(false)} style={{ textAlign: "center" }}>{t.nav.bookCall}</a>
              <a href="#contact" className="btn-outline" onClick={() => setMobileOpen(false)} style={{ textAlign: "center" }}>{t.nav.getStarted}</a>
            </div>
          </nav>
        </div>
      )}

      <style>{`
        .nav-desktop { display: none; }
        .nav-mobile  { display: flex; }
        @media (min-width: 768px) {
          .nav-desktop { display: flex; }
          .nav-mobile  { display: none; }
        }
      `}</style>
    </header>
  );
}
