"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { DemoPopup } from "@/components/DemoPopup";

const NAV_LINKS = [
  { href: "/#problem", label: "Problem" },
  { href: "/#solution", label: "Løsning" },
  { href: "/#how", label: "Slik funker det" },
  { href: "/pricing", label: "Priser" },
  { href: "/about", label: "Om oss" },
];

export default function LandingNavbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, [open]);

  return (
    <>
      <nav className="lp-nav">
        <div className="lp-container lp-nav-inner">
          <Link href="/" className="lp-logo">Ekspedenten</Link>

          <ul className="lp-nav-links">
            {NAV_LINKS.map(l => (
              <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
            ))}
          </ul>

          <div className="lp-nav-cta">
            <a href="https://app.ekspedenten.no" className="lp-nav-signin">Logg inn</a>
            <Link href="/diagnose" className="lp-btn-secondary">
              Beregn lekkasje <span className="lp-arrow">→</span>
            </Link>
            <DemoPopup triggerText="Bestill demo" className="lp-btn-primary" />
          </div>

          <button
            type="button"
            className="lp-burger"
            aria-label={open ? "Lukk meny" : "Åpne meny"}
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="lp-mobile-menu" role="dialog" aria-modal="true" aria-label="Hovedmeny">
          <ul className="lp-mobile-links">
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <Link href={l.href} onClick={close}>{l.label}</Link>
              </li>
            ))}
          </ul>

          <div className="lp-mobile-footer">
            <div className="lp-mobile-row">
              <a
                href="https://app.ekspedenten.no"
                className="lp-mobile-secondary"
                onClick={close}
              >
                Logg inn
              </a>
              <Link
                href="/diagnose"
                className="lp-mobile-secondary"
                onClick={close}
              >
                Beregn lekkasje
              </Link>
            </div>
            <div className="lp-mobile-primary-wrap" onClick={close}>
              <DemoPopup triggerText="Bestill demo" className="lp-mobile-primary" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
