"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const NAV_LINKS = [
    { label: t.nav.services, href: "/#services" },
    { label: t.nav.pricing,  href: "/#pricing" },
    { label: t.nav.faq,      href: "/faq" },
    { label: t.nav.about,    href: "/about" },
    { label: t.nav.contact,  href: "/#contact" },
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
        position: "sticky",
        top: 0,
        width: "100%",
        zIndex: 200,
        transition: "all 0.4s ease",
        background: "#000000",
        backdropFilter: "none",
        borderBottom: scrolled ? "1px solid rgba(212,175,55,0.10)" : "1px solid transparent",
      }}
    >
      <div className="wrap" style={{ padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          {/* Logo */}
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <Image src="/logo.png" alt="SmartcoreAI logo" height={40} width={40} style={{ width: "auto", height: 40, objectFit: "contain" }} />
            <span style={{
              fontFamily: "Syne, system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 18,
              color: "#F5F0E8",
              letterSpacing: "-0.02em"
            }}>
              Smartcore<span style={{ color: "#D4AF37" }}>AI</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="nav-desktop" style={{ alignItems: "center", gap: 4 }}>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} style={{
                padding: "8px 14px", borderRadius: 8, fontSize: 14, fontWeight: 500,
                color: "#8A8070", textDecoration: "none", transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = "#F5F0E8"; (e.target as HTMLElement).style.background = "rgba(212,175,55,0.06)"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = "#8A8070"; (e.target as HTMLElement).style.background = "transparent"; }}
              >{l.label}</a>
            ))}
          </nav>

          {/* Desktop CTA + Language toggle */}
          <div className="nav-desktop" style={{ alignItems: "center", gap: 10 }}>
            <button onClick={toggleLang} style={{
              padding: "7px 12px", borderRadius: 8,
              background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.12)",
              color: "#8A8070", fontSize: 12, fontWeight: 700,
              cursor: "pointer", letterSpacing: "0.05em", fontFamily: "inherit", transition: "all 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#D4AF37"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.4)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#8A8070"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.12)"; }}
            >{lang === "en" ? "NO" : "EN"}</button>
            <a href="/#contact" className="btn-outline" style={{ padding: "9px 20px", fontSize: 13 }}>{t.nav.getStarted}</a>
            <div style={{ position: "relative", display: "inline-flex" }}>
              <div style={{ position: "absolute", inset: -5, borderRadius: 16, border: "1.5px solid rgba(212,175,55,0.45)", animation: "pulseRing 2s ease-out infinite", pointerEvents: "none" }} />
              <div style={{ position: "absolute", inset: -10, borderRadius: 20, border: "1.5px solid rgba(212,175,55,0.18)", animation: "pulseRing 2s ease-out 0.7s infinite", pointerEvents: "none" }} />
              <a href="/#booking" className="btn-primary" style={{ padding: "9px 20px", fontSize: 13, position: "relative", zIndex: 1 }}>{t.nav.bookCall}</a>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button className="nav-mobile" onClick={() => setMobileOpen(!mobileOpen)} style={{
            background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.12)",
            borderRadius: 8, padding: 8, color: "#F5F0E8", cursor: "pointer",
            alignItems: "center", justifyContent: "center",
          }}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div style={{
          background: "#000000",
          borderTop: "1px solid rgba(212,175,55,0.08)",
          padding: "20px 24px 28px",
          backdropFilter: "blur(20px)",
        }}>
          <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
                padding: "12px 16px", borderRadius: 10, fontSize: 15, fontWeight: 500,
                color: "#8A8070", textDecoration: "none", background: "rgba(212,175,55,0.02)", marginBottom: 2,
              }}>{l.label}</a>
            ))}

            {/* Language toggle row */}
            <button onClick={() => { toggleLang(); setMobileOpen(false); }} style={{
              padding: "12px 16px", borderRadius: 10, marginBottom: 2,
              background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.15)",
              color: "#D4AF37", fontSize: 14, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit", textAlign: "left",
            }}>
              {lang === "en" ? "🌐 Switch to Norwegian (NO)" : "🌐 Switch to English (EN)"}
            </button>

            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="/#booking" className="btn-primary" onClick={() => setMobileOpen(false)} style={{ textAlign: "center" }}>{t.nav.bookCall}</a>
              <a href="/#contact" className="btn-outline" onClick={() => setMobileOpen(false)} style={{ textAlign: "center" }}>{t.nav.getStarted}</a>
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
