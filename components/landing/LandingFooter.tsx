import Link from "next/link";

export default function LandingFooter() {
  return (
    <footer className="lp-footer">
      <div className="lp-container">
        <div className="lp-footer-grid">
          <div>
            <div className="lp-footer-logo">Ekspedenten</div>
            <p className="lp-footer-tagline">AI-resepsjonist for nordiske klinikker. Bygget i Bergen.</p>
          </div>
          <div>
            <h5>Produkt</h5>
            <ul>
              <li><a href="#how">Slik funker det</a></li>
              <li><Link href="/pricing">Priser</Link></li>
              <li><Link href="/pakke">Pakke</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h5>Selskap</h5>
            <ul>
              <li><Link href="/about">Om oss</Link></li>
              <li><Link href="/contact">Kontakt</Link></li>
            </ul>
          </div>
          <div>
            <h5>Sikkerhet</h5>
            <ul>
              <li><Link href="/personvern">Personvern</Link></li>
              <li><Link href="/cookies">Cookies</Link></li>
              <li><Link href="/terms">Vilkår</Link></li>
            </ul>
          </div>
        </div>
        <div className="lp-footer-bottom">
          © 2026 Ekspedenten AS · Org.nr: under registrering · Data lagret i Frankfurt
        </div>
      </div>
    </footer>
  );
}
