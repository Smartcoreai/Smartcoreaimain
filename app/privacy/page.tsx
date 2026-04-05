export const dynamic = 'force-dynamic';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div style={{ background: "#080812", minHeight: "100vh", color: "#f4f4f8" }}>
      <Navbar />
      <main style={{ paddingTop: 140, paddingBottom: 120, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <a href="/" style={{ display: "inline-block", color: "#8888a0", fontSize: 14, textDecoration: "none", marginBottom: 40, transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#a855f7")}
            onMouseLeave={e => (e.currentTarget.style.color = "#8888a0")}
          >
            ← Back
          </a>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px,5vw,48px)", letterSpacing: "-0.03em", marginBottom: 12, lineHeight: 1.1 }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: 14, color: "#8888a0", marginBottom: 48 }}>Last updated: March 2026</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {[
              { title: "What we collect", body: "We collect information you provide directly to us, such as your name, email address, phone number, and business name when you fill out our contact form. We also collect usage data and analytics to improve our services." },
              { title: "How we use your data", body: "We use the information we collect to respond to your inquiries, provide our services, send relevant communications, and improve our platform. We do not sell your personal data to third parties." },
              { title: "Data storage", body: "Your data is stored securely on our servers and in our CRM system (GoHighLevel). We retain your data for as long as necessary to provide our services and comply with legal obligations." },
              { title: "Your rights", body: "You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us at aleksander@smartcoreai.no or henrik@smartcoreai.no." },
              { title: "Cookies", body: "We use cookies to improve your experience on our website. You can control cookie settings through your browser. See our Cookie Policy for more details." },
              { title: "Contact", body: "If you have questions about this privacy policy, please contact us at aleksander@smartcoreai.no or henrik@smartcoreai.no." },
            ].map(({ title, body }) => (
              <div key={title} style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 32 }}>
                <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 20, color: "#f4f4f8", marginBottom: 12, letterSpacing: "-0.01em" }}>{title}</h2>
                <p style={{ fontSize: 15, color: "#8888a0", lineHeight: 1.8, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
