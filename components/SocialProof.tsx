"use client";

/*
 * ─── SOCIAL PROOF SECTION ────────────────────────────────────────────────────
 *
 * STATUS: Disabled — no verified client data yet.
 *
 * TODO before enabling:
 *   1. Add real client logo files to /public/logos/ and replace the 5 slots below
 *   2. Replace the quote text and author with a real, approved testimonial
 *   3. Confirm the "+212 qualified leads" metric with the client
 *   4. Change SOCIAL_PROOF_ENABLED to true
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

const SOCIAL_PROOF_ENABLED = false; // TODO: set to true when client data is verified

export default function SocialProof() {
  if (!SOCIAL_PROOF_ENABLED) return null;

  return (
    <section style={{ padding: "64px 24px 80px", background: "#080604", borderTop: "1px solid rgba(212,175,55,0.06)" }}>
      <div className="wrap" style={{ textAlign: "center" }}>

        {/* ── Logo strip ── */}
        <p style={{
          fontSize: 11, fontWeight: 700, letterSpacing: "0.14em",
          color: "#5A5248", textTransform: "uppercase", marginBottom: 28,
        }}>
          {/* TODO: "Trusted by" in both EN + NO via i18n */}
          Trusted by
        </p>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 32, flexWrap: "wrap", marginBottom: 72, opacity: 0.55,
        }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} style={{
              width: 120, height: 40,
              background: "rgba(212,175,55,0.06)",
              border: "1px dashed rgba(212,175,55,0.18)",
              borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 11, color: "#5A5248" }}>
                {/* TODO: replace with <img src="/logos/client-{n}.svg" /> */}
                LOGO {n}
              </span>
            </div>
          ))}
        </div>

        {/* ── Headline metric ── */}
        {/* TODO: confirm "+212 qualified leads in 90 days" number with client */}
        <div style={{ marginBottom: 56 }}>
          <div style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(40px, 7vw, 80px)",
            fontWeight: 800,
            background: "linear-gradient(135deg, #D4AF37, #F5D87E)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1.05,
            marginBottom: 10,
          }}>
            +212 qualified leads {/* TODO: confirm number */}
          </div>
          <p style={{ fontSize: 15, color: "#8A8070", margin: 0 }}>
            in 90 days from a single AI chatbot {/* TODO: confirm copy */}
          </p>
        </div>

        {/* ── Quote ── */}
        <div style={{
          maxWidth: 560, margin: "0 auto",
          padding: "36px 40px",
          background: "rgba(212,175,55,0.03)",
          border: "1px solid rgba(212,175,55,0.12)",
          borderRadius: 20,
        }}>
          {/* TODO: replace with real client photo */}
          <div style={{
            width: 52, height: 52, borderRadius: "50%",
            background: "rgba(212,175,55,0.07)",
            border: "1px dashed rgba(212,175,55,0.2)",
            margin: "0 auto 20px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 10, color: "#5A5248" }}>PHOTO</span>
          </div>

          {/* TODO: replace with real client quote (approved in writing) */}
          <p style={{
            fontSize: 16, fontStyle: "italic",
            color: "#8A8070", marginBottom: 16, lineHeight: 1.75,
          }}>
            &ldquo;TODO: Replace with real approved client testimonial.&rdquo;
          </p>

          {/* TODO: replace with real client name and company */}
          <p style={{ fontSize: 13, fontWeight: 600, color: "#D4AF37", margin: 0 }}>
            TODO: Client Name, Company
          </p>
        </div>

      </div>
    </section>
  );
}
