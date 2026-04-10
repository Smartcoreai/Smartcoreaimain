"use client";
import { useState } from "react";
import { ArrowRight, Mail, MessageSquare, Send, CheckCircle, AlertCircle, Zap, Shield, Clock } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const PERK_ICONS = [<Clock size={16} />, <Shield size={16} />, <Zap size={16} />];

export default function ContactSection() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", phone: "", business: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("API error");
      setSent(true);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ background: "#080808", padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 800, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="tag" style={{ display: "inline-flex", marginBottom: 16 }}>{t.contact.tag}</div>
          <h2 className="text-[22px] sm:text-4xl lg:text-[56px]" style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800, color: "#F5F0E8", letterSpacing: "-0.03em", marginBottom: 14, lineHeight: 1.05,
          }}>
            {t.contact.headline1}{" "}
            <span style={{ background: "linear-gradient(135deg,#D4AF37,#F5D87E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {t.contact.headline2}
            </span>
          </h2>
          <p style={{ fontSize: 16, color: "#8A8070", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
            {t.contact.subtext}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 920, margin: "0 auto" }} className="contact-grid">
          {/* Left: info */}
          <div style={{
            background: "rgba(212,175,55,0.04)",
            border: "1px solid rgba(212,175,55,0.18)", borderRadius: 24, padding: 36,
            display: "flex", flexDirection: "column", gap: 28,
          }}>
            <div>
              <h3 className="text-lg md:text-[22px]" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, color: "#F5F0E8", marginBottom: 8, letterSpacing: "-0.02em" }}>
                {t.contact.leftHeadline}
              </h3>
              <p style={{ fontSize: 14, color: "#8A8070", lineHeight: 1.7, margin: 0 }}>
                {t.contact.leftDesc}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {t.contact.perks.map((perk, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(212,175,55,0.10)", display: "flex", alignItems: "center", justifyContent: "center", color: "#D4AF37", flexShrink: 0 }}>
                    {PERK_ICONS[i]}
                  </div>
                  <span style={{ fontSize: 14, color: "#D0CABC" }}>{perk}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#8A8070", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>{t.contact.directTitle}</div>
              <a href="mailto:aleksander@smartcoreai.no" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 10 }}>
                <Mail size={16} color="#D4AF37" />
                <span style={{ fontSize: 14, color: "#F5F0E8" }}>aleksander@smartcoreai.no</span>
              </a>
              <a href="mailto:henrik@smartcoreai.no" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 10 }}>
                <Mail size={16} color="#D4AF37" />
                <span style={{ fontSize: 14, color: "#F5F0E8" }}>henrik@smartcoreai.no</span>
              </a>
              <a href="#booking" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                <MessageSquare size={16} color="#F5D87E" />
                <span style={{ fontSize: 14, color: "#F5F0E8" }}>{t.contact.bookCallLink}</span>
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div style={{ background: "rgba(15,15,20,0.7)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 24, padding: 36 }}>
            {sent ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16, textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(74,222,128,0.12)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(74,222,128,0.3)" }}>
                  <CheckCircle size={32} color="#4ade80" />
                </div>
                <div style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 700, color: "#F5F0E8" }}>{t.contact.successTitle}</div>
                <div style={{ fontSize: 14, color: "#8A8070", lineHeight: 1.7 }}>{t.contact.successDesc}</div>
                <button onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", business: "", message: "" }); }}
                  style={{ padding: "10px 20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "#8A8070", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                  {t.contact.sendAnother}
                </button>
              </div>
            ) : error ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16, textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(239,68,68,0.12)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(239,68,68,0.3)" }}>
                  <AlertCircle size={32} color="#ef4444" />
                </div>
                <div style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 700, color: "#F5F0E8" }}>{t.contact.errorTitle}</div>
                <div style={{ fontSize: 14, color: "#8A8070", lineHeight: 1.7 }}>{t.contact.errorDesc}</div>
                <button onClick={() => setError(false)}
                  style={{ padding: "10px 20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "#8A8070", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                  {t.contact.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="contact-name-email" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#8A8070", marginBottom: 6 }}>{t.contact.labels.name}</label>
                    <input className="input-dark" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder={t.contact.placeholders.name} required />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#8A8070", marginBottom: 6 }}>{t.contact.labels.email}</label>
                    <input className="input-dark" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder={t.contact.placeholders.email} required />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#8A8070", marginBottom: 6 }}>{t.contact.labels.phone}</label>
                  <input className="input-dark" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder={t.contact.placeholders.phone} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#8A8070", marginBottom: 6 }}>{t.contact.labels.business}</label>
                  <input className="input-dark" value={form.business} onChange={e => setForm({ ...form, business: e.target.value })} placeholder={t.contact.placeholders.business} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#8A8070", marginBottom: 6 }}>{t.contact.labels.message}</label>
                  <textarea className="input-dark" rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder={t.contact.placeholders.message} required style={{ resize: "none" }} />
                </div>
                <button type="submit" disabled={loading} className="btn-primary" style={{ width: "100%", padding: "14px", opacity: loading ? 0.7 : 1 }}>
                  {loading ? (
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                      {t.contact.sending}
                    </span>
                  ) : (
                    <>{t.contact.submit} <Send size={16} /></>
                  )}
                </button>
                <p style={{ fontSize: 12, color: "#44444e", textAlign: "center", margin: 0 }}>
                  {t.contact.responseNote}
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
          .contact-grid > div { padding: 20px !important; box-sizing: border-box; width: 100%; }
          .contact-name-email { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
