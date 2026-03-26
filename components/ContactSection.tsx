"use client";
import { useState } from "react";
import { ArrowRight, Mail, MessageSquare, Send, CheckCircle, Zap, Shield, Clock } from "lucide-react";

const PERKS = [
  { icon: <Clock size={16} />, text: "Response within 4 hours" },
  { icon: <Shield size={16} />, text: "No spam, ever" },
  { icon: <Zap size={16} />, text: "Strategy call included" },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", business: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    setSent(true);
  };

  return (
    <section id="contact" style={{ background: "#08080c", padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      {/* Glow */}
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 800, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(168,85,247,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="wrap">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="tag" style={{ display: "inline-flex", marginBottom: 16 }}>Get in touch</div>
          <h2 className="text-[22px] sm:text-4xl lg:text-[56px]" style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800, color: "#f4f4f8", letterSpacing: "-0.03em", marginBottom: 14, lineHeight: 1.05,
          }}>
            Ready to automate{" "}
            <span style={{ background: "linear-gradient(135deg,#a855f7,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              your business?
            </span>
          </h2>
          <p style={{ fontSize: 16, color: "#8888a0", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
            Tell us what you need. We'll map out exactly how we can help.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 920, margin: "0 auto" }} className="contact-grid">
          {/* Left: info */}
          <div style={{
            background: "linear-gradient(145deg, rgba(168,85,247,0.08), rgba(34,211,238,0.03))",
            border: "1px solid rgba(168,85,247,0.2)", borderRadius: 24, padding: 36,
            display: "flex", flexDirection: "column", gap: 28,
          }}>
            <div>
              <h3 className="text-lg md:text-[22px]" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, color: "#f4f4f8", marginBottom: 8, letterSpacing: "-0.02em" }}>
                Let's build something that works
              </h3>
              <p style={{ fontSize: 14, color: "#8888a0", lineHeight: 1.7, margin: 0 }}>
                Whether you need one tool or a complete AI transformation — we start with a conversation, not a contract.
              </p>
            </div>

            {/* Perks */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {PERKS.map(p => (
                <div key={p.text} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(168,85,247,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#a855f7", flexShrink: 0 }}>
                    {p.icon}
                  </div>
                  <span style={{ fontSize: 14, color: "#c4c4d0" }}>{p.text}</span>
                </div>
              ))}
            </div>

            {/* Email / Social */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#8888a0", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Or reach us directly</div>
              <a href="mailto:hello@smartcoreai.com" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 10 }}>
                <Mail size={16} color="#a855f7" />
                <span style={{ fontSize: 14, color: "#f4f4f8" }}>hello@smartcoreai.com</span>
              </a>
              <a href="#booking" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                <MessageSquare size={16} color="#22d3ee" />
                <span style={{ fontSize: 14, color: "#f4f4f8" }}>Book a discovery call →</span>
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div style={{
            background: "rgba(15,15,20,0.7)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 24, padding: 36,
          }}>
            {sent ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16, textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(74,222,128,0.12)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(74,222,128,0.3)" }}>
                  <CheckCircle size={32} color="#4ade80" />
                </div>
                <div style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 700, color: "#f4f4f8" }}>Message sent!</div>
                <div style={{ fontSize: 14, color: "#8888a0", lineHeight: 1.7 }}>
                  We'll be in touch within 4 hours. Check your inbox.
                </div>
                <button onClick={() => { setSent(false); setForm({ name: "", email: "", business: "", message: "" }); }}
                  style={{ padding: "10px 20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "#8888a0", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#8888a0", marginBottom: 6 }}>Name *</label>
                    <input className="input-dark" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" required />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#8888a0", marginBottom: 6 }}>Email *</label>
                    <input className="input-dark" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" required />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#8888a0", marginBottom: 6 }}>Business name</label>
                  <input className="input-dark" value={form.business} onChange={e => setForm({ ...form, business: e.target.value })} placeholder="Your company" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#8888a0", marginBottom: 6 }}>What do you need? *</label>
                  <textarea className="input-dark" rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your business and what you're trying to achieve..." required style={{ resize: "none" }} />
                </div>
                <button type="submit" disabled={loading} className="btn-primary" style={{ width: "100%", padding: "14px", opacity: loading ? 0.7 : 1 }}>
                  {loading ? (
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                      Sending...
                    </span>
                  ) : (
                    <>Send message <Send size={16} /></>
                  )}
                </button>
                <p style={{ fontSize: 12, color: "#44444e", textAlign: "center", margin: 0 }}>
                  We respond within 4 hours during business hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
