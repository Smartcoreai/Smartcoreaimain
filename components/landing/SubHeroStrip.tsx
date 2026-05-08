export default function SubHeroStrip() {
  return (
    <div className="lp-sub-hero">
      <div className="lp-container">
        <div className="lp-sub-hero-inner">
          <div className="lp-live-badge">
            <div className="lp-live-dot" />
            <span>Ária er live nå</span>
          </div>
          <div className="lp-strip-divider" />
          <div className="lp-strip-items">
            <div className="lp-strip-item"><span className="lp-check">✓</span> Live på 7 dager</div>
            <div className="lp-strip-item"><span className="lp-check">✓</span> 14 dagers gratis prøve</div>
            <div className="lp-strip-item"><span className="lp-check">✓</span> GDPR. Data i Frankfurt</div>
            <div className="lp-strip-item"><span className="lp-check">✓</span> Avbestill når som helst</div>
          </div>
        </div>
      </div>
    </div>
  );
}
