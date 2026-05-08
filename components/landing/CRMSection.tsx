export default function CRMSection() {
  return (
    <section className="lp-section" id="crm">
      <div className="lp-container">
        <div className="lp-section-header">
          <span className="lp-pill lavender">CRM for klinikker</span>
          <h2>All aktivitet samlet<br />på ett sted.</h2>
          <p>Logg inn på dashbordet ditt og se eksakt hva Ária gjorde i dag — samtaler, bookinger, missed calls og hvilke pasienter som trenger oppfølging fra teamet.</p>
          <p className="lp-section-header-note">Eksempel-data nedenfor viser hvordan dashbordet ser ut etter første uke i drift.</p>
        </div>

        <div className="lp-crm-mockup">
          <div className="lp-crm-bar">
            <div className="lp-dot red" />
            <div className="lp-dot yellow" />
            <div className="lp-dot green" />
            <div className="lp-url">app.ekspedenten.no/dashboard</div>
          </div>
          <div className="lp-crm-content">
            <div className="lp-crm-greeting">
              <h3>God morgen, Henrik</h3>
              <p>Bergen Tannklinikk · Mandag 5. mai · Ária har vært i drift i 247 timer</p>
            </div>

            <div className="lp-crm-stats">
              <div className="lp-crm-stat">
                <div className="lp-stat-label">Samtaler i dag</div>
                <div className="lp-stat-value">47</div>
                <div className="lp-stat-trend up">12% vs. i går</div>
              </div>
              <div className="lp-crm-stat">
                <div className="lp-stat-label">Bookinger</div>
                <div className="lp-stat-value">31</div>
                <div className="lp-stat-trend up">66% konvertering</div>
              </div>
              <div className="lp-crm-stat">
                <div className="lp-stat-label">Akutt-timer</div>
                <div className="lp-stat-value">4</div>
                <div className="lp-stat-trend">Alle bekreftet</div>
              </div>
              <div className="lp-crm-stat highlight">
                <div className="lp-stat-label">Verdi denne uka</div>
                <div className="lp-stat-value">kr 78 250</div>
                <div className="lp-stat-trend up">+18%</div>
              </div>
            </div>

            <div className="lp-crm-grid">
              <div className="lp-crm-section">
                <h4>Sanntids-aktivitet</h4>
                <div className="lp-activity-item">
                  <div className="lp-activity-dot success" />
                  <div className="lp-activity-text">
                    <strong>Akutt-time booket</strong>
                    <span>Anonym pasient · I dag 15:00</span>
                  </div>
                  <div className="lp-activity-time">akkurat nå</div>
                </div>
                <div className="lp-activity-item">
                  <div className="lp-activity-dot" />
                  <div className="lp-activity-text">
                    <strong>Tannrens booket</strong>
                    <span>Lars Olsen · Tor. 7. mai 10:00</span>
                  </div>
                  <div className="lp-activity-time">2 min</div>
                </div>
                <div className="lp-activity-item">
                  <div className="lp-activity-dot alert" />
                  <div className="lp-activity-text">
                    <strong>Trenger oppfølging</strong>
                    <span>Spørsmål om implantat — sendt til Henrik</span>
                  </div>
                  <div className="lp-activity-time">8 min</div>
                </div>
                <div className="lp-activity-item">
                  <div className="lp-activity-dot success" />
                  <div className="lp-activity-text">
                    <strong>Kontroll booket</strong>
                    <span>Kari Nordmann · Fre. 8. mai 14:30</span>
                  </div>
                  <div className="lp-activity-time">14 min</div>
                </div>
                <div className="lp-activity-item">
                  <div className="lp-activity-dot" />
                  <div className="lp-activity-text">
                    <strong>Ária svarte utenom åpningstid</strong>
                    <span>Bookinger spurt 22:14 · besvart 22:14</span>
                  </div>
                  <div className="lp-activity-time">i går</div>
                </div>
              </div>

              <div className="lp-crm-section">
                <h4>Salgs-pipeline</h4>
                <div className="lp-leads-card">
                  <div className="lp-leads-bar">
                    <div className="lp-lead-bucket"><div className="lp-num">8</div><div className="lp-label">Ny</div></div>
                    <div className="lp-lead-bucket"><div className="lp-num">5</div><div className="lp-label">Kontakt</div></div>
                    <div className="lp-lead-bucket gold"><div className="lp-num">3</div><div className="lp-label">Demo</div></div>
                    <div className="lp-lead-bucket"><div className="lp-num">2</div><div className="lp-label">Tilbud</div></div>
                  </div>
                  <div className="lp-lead-list">
                    <div className="lp-lead-row">
                      <span className="lp-name">Danmarksplass Tannklinikk</span>
                      <span className="lp-lead-tag demo">DEMO BOOKET</span>
                    </div>
                    <div className="lp-lead-row">
                      <span className="lp-name">Solli Klinikk</span>
                      <span className="lp-lead-tag tilbud">TILBUD</span>
                    </div>
                    <div className="lp-lead-row">
                      <span className="lp-name">Nordlys Dental</span>
                      <span className="lp-lead-tag demo">DEMO BOOKET</span>
                    </div>
                    <div className="lp-lead-row">
                      <span className="lp-name">Fjord Medica</span>
                      <span className="lp-lead-tag ny">NY</span>
                    </div>
                    <div className="lp-lead-row">
                      <span className="lp-name">Trondheim Tannhelse</span>
                      <span className="lp-lead-tag ny">NY</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
