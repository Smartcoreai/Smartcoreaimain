"use client";
import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "How It Works", href: "#pipeline" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

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
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden md:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} style={{
                padding: "8px 14px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                color: "#8888a0",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = "#f4f4f8"; (e.target as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = "#8888a0"; (e.target as HTMLElement).style.background = "transparent"; }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }} className="hidden md:flex">
            <a href="#contact" className="btn-outline" style={{ padding: "9px 20px", fontSize: 13 }}>
              Get started
            </a>
            <a href="#booking" className="btn-primary" style={{ padding: "9px 20px", fontSize: 13 }}>
              Book a call
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: 8, color: "#f4f4f8", cursor: "pointer" }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          background: "rgba(8,8,12,0.97)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "20px 24px 28px",
        }}>
          <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  padding: "12px 16px",
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#8888a0",
                  textDecoration: "none",
                  background: "rgba(255,255,255,0.02)",
                  marginBottom: 2,
                }}
              >
                {l.label}
              </a>
            ))}
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="#booking" className="btn-primary" style={{ textAlign: "center" }}>Book a call</a>
              <a href="#contact" className="btn-outline" style={{ textAlign: "center" }}>Get started</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
