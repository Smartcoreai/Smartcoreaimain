export const dynamic = 'force-dynamic';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p style={{ fontSize: 14, color: "#8A8070", marginBottom: 48 }}>Last updated: March 2026</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {[
              { title: "Agreement", body: "By using SmartcoreAI's services, you agree to these terms. If you do not agree, please do not use our services." },
              { title: "Services", body: "SmartcoreAI provides AI-powered automation systems including chatbots, lead generation tools, voice agents, and custom integrations. Service scope is defined in your individual agreement." },
              { title: "Payment", body: "Services are billed monthly. All prices are in EUR. You may cancel at any time. Refunds are available within 14 days of purchase if you are not satisfied." },
              { title: "Intellectual property", body: "All AI systems, code, and deliverables built by SmartcoreAI for your business are yours upon full payment. We retain the right to use anonymized case studies for marketing purposes unless agreed otherwise." },
              { title: "Limitation of liability", body: "SmartcoreAI is not liable for indirect, incidental, or consequential damages arising from use of our services. Our total liability is limited to the amount paid in the preceding 3 months." },
              { title: "Contact", body: "Questions about these terms? Contact us at aleksander@smartcoreai.no or henrik@smartcoreai.no." },
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
