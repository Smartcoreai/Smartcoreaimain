"use client";
import Link from "next/link";
import { DemoPopup } from "@/components/DemoPopup";

export default function LandingNavbar() {
  return (
    <nav className="lp-nav">
      <div className="lp-container lp-nav-inner">
        <Link href="/" className="lp-logo">Ekspedenten</Link>

        <ul className="lp-nav-links">
          <li><Link href="/#problem">Problem</Link></li>
          <li><Link href="/#solution">Løsning</Link></li>
          <li><Link href="/#how">Slik funker det</Link></li>
          <li><Link href="/pricing">Priser</Link></li>
          <li><Link href="/about">Om oss</Link></li>
        </ul>

        <div className="lp-nav-cta">
          <a href="https://app.ekspedenten.no" className="lp-nav-signin">Logg inn</a>
          <Link href="/diagnose" className="lp-btn-secondary">
            Beregn lekkasje <span className="lp-arrow">→</span>
          </Link>
          <DemoPopup triggerText="Bestill demo" className="lp-btn-primary" />
        </div>
      </div>
    </nav>
  );
}
