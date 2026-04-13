import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { ArrowRight } from "lucide-react";

const OBJECTIONS = [
  {
    q: "It's too expensive.",
    a: "Consider what it costs you NOT to automate: missed leads, wasted admin hours, inconsistent follow-up. Most clients recoup the investment within their first month. If they don't, we offer a 14-day money-back guarantee — no questions asked.",
  },
  {
    q: "I don't need AI yet.",
    a: "Your competitors are already using it. Every day you delay is a day they're capturing your leads, filling their calendars, and closing your deals on autopilot. AI isn't coming — it's here. The only question is whether you're using it or losing to those who are.",
  },
  {
    q: "I can do this myself.",
    a: "Probably. It'll take you 3–6 months to learn the tools, build the integrations, fix the bugs, and maintain it all. We deliver it in 12 hours. Your time has a value — spend it on your clients, not on tech setup.",
  },
  {
    q: "I'm not sure if it will work for my business.",
    a: "We've built systems for clinics, gyms, consultants, agencies, real estate agents, and service businesses of every shape. Book a free 30-min call — we'll tell you exactly what's possible for your business, and if we can't help, we'll say so upfront.",
  },
  {
    q: "I need to think about it.",
    a: "Fair. But what's unclear? If it's the price — we have flexible plans. If it's the fit — let's map it out. Thinking without more information rarely leads to a decision. A 30-minute call will give you everything you need to decide.",
  },
];

export default function ObjectionsPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#1A1A1A", minHeight: "100vh" }}>
        {/* Hero */}
        <section style={{ padding: "140px 24px 80px", textAlign: "center", position: "relative" }}>
          <div style={{
            position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
            width: 600, height: 400, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="tag" style={{ display: "inline-flex", marginBottom: 20 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#D4AF37", boxShadow: "0 0 6px #D4AF37" }} />
              Common objections
            </div>
            <h1 style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(32px,5vw,68px)",
              fontWeight: 800,
              color: "#F5F0E8",
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              marginBottom: 20,
              maxWidth: 800,
              margin: "0 auto 20px",
            }}>
              We've heard every{" "}
              <span style={{
                background: "linear-gradient(135deg,#D4AF37,#F5D87E)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                objection.
              </span>
            </h1>
            <p style={{ fontSize: "clamp(15px,2vw,18px)", color: "#8A8070", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              Here are the most common reasons businesses hesitate — and the honest answers.
            </p>
          </div>
        </section>

        {/* Objections list */}
        <section style={{ padding: "0 24px 80px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
            {OBJECTIONS.map((item, i) => (
              <div key={i} style={{
                background: "rgba(10,15,30,0.5)",
                border: "1px solid rgba(212,175,55,0.08)",
                borderRadius: 20,
                padding: "32px 36px",
                transition: "border-color 0.2s",
              }}
              className="objection-card"
              >
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{
                    minWidth: 32, height: 32, borderRadius: 10,
                    background: "rgba(212,175,55,0.10)",
                    border: "1px solid rgba(212,175,55,0.20)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700, color: "#D4AF37",
                    marginTop: 2,
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: "Syne, sans-serif",
                      fontSize: "clamp(16px,2vw,20px)",
                      fontWeight: 700,
                      color: "#F5F0E8",
                      marginBottom: 12,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.3,
                    }}>
                      "{item.q}"
                    </h3>
                    <p style={{ fontSize: 15, color: "#8A8070", lineHeight: 1.75, margin: 0 }}>
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "20px 24px 120px", textAlign: "center" }}>
          <div style={{
            maxWidth: 600, margin: "0 auto",
            background: "rgba(212,175,55,0.05)",
            border: "1px solid rgba(212,175,55,0.18)",
            borderRadius: 24,
            padding: "48px 40px",
          }}>
            <h2 style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(22px,3vw,32px)",
              fontWeight: 800,
              color: "#F5F0E8",
              marginBottom: 12,
              letterSpacing: "-0.02em",
            }}>
              Still on the fence?
            </h2>
            <p style={{ fontSize: 15, color: "#8A8070", lineHeight: 1.7, marginBottom: 28 }}>
              Book a free 30-minute call. No pitch, no pressure. Just a straight conversation about what we can build for you.
            </p>
            <a href="/#booking" className="btn-primary" style={{ fontSize: 15, padding: "14px 32px" }}>
              Book a free call <ArrowRight size={16} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />

      <style>{`
        .objection-card:hover {
          border-color: rgba(212,175,55,0.25) !important;
        }
        @media (max-width: 480px) {
          .objection-card { padding: 24px 20px !important; }
        }
      `}</style>
    </>
  );
}
