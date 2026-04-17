export const dynamic = 'force-dynamic';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CookiesPage() {
  return (
    <div style={{ background: "#1A1A1A", minHeight: "100vh", color: "#F5F0E8" }}>
      <Navbar />
      <main style={{ paddingTop: 140, paddingBottom: 120, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <a href="/" style={{ display: "inline-block", color: "#8A8070", fontSize: 14, textDecoration: "none", marginBottom: 40, transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#D4AF37")}
            onMouseLeave={e => (e.currentTarget.style.color = "#8A8070")}
          >
            ← Back
          </a>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px,5vw,48px)", letterSpacing: "-0.03em", marginBottom: 12, lineHeight: 1.1 }}>
            Cookie Policy
          </h1>
          <p style={{ fontSize: 14, color: "#8A8070", marginBottom: 48 }}>Last updated: March 2026</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {[
              { title: "What are cookies?", body: "Cookies are small text files stored on your device when you visit a website. They help us provide a better experience by remembering your preferences and understanding how you use our site." },
              { title: "Cookies we use", body: "We use essential cookies required for the site to function (such as language preference), and analytics cookies to understand visitor behaviour. We do not use advertising or tracking cookies." },
              { title: "Language preference", body: "We store your language selection (English or Norwegian) in your browser's localStorage so it persists across visits. This is not a cookie but serves a similar purpose." },
              { title: "Third-party cookies", body: "Calendly (our booking tool) and Stripe (our payment processor) may set their own cookies when you interact with their embedded services. Please refer to their respective privacy policies." },
              { title: "Managing cookies", body: "You can control and delete cookies through your browser settings. Disabling cookies may affect some functionality of the site." },
              { title: "Contact", body: "Questions about our cookie use? Contact us at aleksander@ekspedenten.no or henrik@ekspedenten.no." },
            ].map(({ title, body }) => (
              <div key={title} style={{ borderTop: "1px solid rgba(212,175,55,0.08)", paddingTop: 32 }}>
                <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 20, color: "#F5F0E8", marginBottom: 12, letterSpacing: "-0.01em" }}>{title}</h2>
                <p style={{ fontSize: 15, color: "#8A8070", lineHeight: 1.8, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
