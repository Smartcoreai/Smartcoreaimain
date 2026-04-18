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
    { label: t.nav.pricing,  href: "/pricing" },
    { label: t.nav.faq,      href: "/faq" },
    { label: t.nav.about,    href: "/about" },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const toggleLang = () => setLang(lang === "en" ? "no" : "en");

  return (
    <header style={{
      position: "sticky",
      top: 0,
      width: "100%",
      zIndex: 200,
      backgroundColor: "#ffffff",
      borderBottom: scrolled ? "1px solid #e8e6dc" : "1px solid #f0eee5",
      boxShadow: scrolled ? "0 1px 14px rgba(0,0,0,0.06)" : "none",
      transition: "box-shadow 0.25s, border-color 0.25s",
    }}>
      <div className="wrap" style={{ padding: "0 32px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>

          {/* Logo */}
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
            <Image
              src="/logo-transparent.png"
              alt="Ekspedenten logo"
              height={40} width={40}
              style={{ width: "auto", height: 40, objectFit: "contain" }}
            />
            <span style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
              fontWeight: 700,
              fontSize: 17,
              color: "#1a1a2e",
              letterSpacing: "-0.02em",
            }}>
              Ekspedenten
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="nav-desktop" style={{ alignItems: "center", gap: 2 }}>
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  padding: "8px 14px", borderRadius: 8,
                  fontSize: 14, fontWeight: 500,
                  color: "#5a5a6e", textDecoration: "none",
                  transition: "color 0.15s, background 0.15s",
                }}
                onMouseEnter={e => {
                  const el = e.target as HTMLElement;
                  el.style.color = "#1a1a2e";
                  el.style.background = "#f7f6f1";
                }}
                onMouseLeave={e => {
                  const el = e.target as HTMLElement;
                  el.style.color = "#5a5a6e";
                  el.style.background = "transparent";
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="nav-desktop" style={{ alignItems: "center", gap: 10 }}>
            <button
              onClick={toggleLang}
              style={{
                padding: "6px 11px", borderRadius: 7,
                background: "#f7f6f1", border: "1px solid #e8e6dc",
                color: "#5a5a6e", fontSize: 11, fontWeight: 700,
                cursor: "pointer", letterSpacing: "0.05em",
                fontFamily: "inherit", transition: "all 0.15s",
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
              {lang === "en" ? "NO" : "EN"}
            </button>

            <a
              href="/#booking"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "9px 22px", borderRadius: 10,
                background: "#1a1a2e", color: "#ffffff",
                fontSize: 13, fontWeight: 600, textDecoration: "none",
                transition: "background 0.2s, transform 0.2s",
                boxShadow: "0 2px 10px rgba(26,26,46,0.15)",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#2d2d4e";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#1a1a2e";
                el.style.transform = "translateY(0)";
              }}
            >
              {t.nav.bookCall}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-mobile"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "#f7f6f1", border: "1px solid #e8e6dc",
              borderRadius: 8, padding: 8, color: "#1a1a2e", cursor: "pointer",
              alignItems: "center", justifyContent: "center",
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          backgroundColor: "#ffffff",
          borderTop: "1px solid #e8e6dc",
          padding: "16px 24px 28px",
        }}>
          <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  padding: "12px 14px", borderRadius: 9,
                  fontSize: 15, fontWeight: 500,
                  color: "#5a5a6e", textDecoration: "none",
                }}
              >
                {l.label}
              </a>
            ))}

            <button
              onClick={() => { toggleLang(); setMobileOpen(false); }}
              style={{
                padding: "12px 14px", borderRadius: 9, marginTop: 4,
                background: "#f7f6f1", border: "1px solid #e8e6dc",
                color: "#5a5a6e", fontSize: 14, fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit", textAlign: "left",
              }}
            >
              {lang === "en" ? "🌐 Switch to Norwegian (NO)" : "🌐 Switch to English (EN)"}
            </button>

            <a
              href="/#booking"
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block", textAlign: "center", marginTop: 12,
                padding: "14px 20px", borderRadius: 10,
                background: "#1a1a2e", color: "#ffffff",
                fontSize: 14, fontWeight: 600, textDecoration: "none",
              }}
            >
              {t.nav.bookCall}
            </a>
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
