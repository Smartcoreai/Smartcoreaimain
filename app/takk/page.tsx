"use client";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";

export default function TakkPage() {
  const { t } = useLanguage();
  const ty = t.thankYou;

  return (
    <div style={{ background: "#1A1A1A", minHeight: "100vh", color: "#F5F0E8" }}>
      <Navbar />

      <main style={{ paddingTop: 160, paddingBottom: 120, paddingLeft: 24, paddingRight: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: 520 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: "rgba(74,222,128,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 40px rgba(74,222,128,0.2)",
            }}>
              <CheckCircle size={40} color="#4ade80" />
            </div>
          </div>

          <h1 style={{
            fontFamily: "Syne, sans-serif", fontWeight: 800,
            fontSize: "clamp(28px, 6vw, 48px)", letterSpacing: "-0.03em",
            color: "#F5F0E8", marginBottom: 16, lineHeight: 1.15,
          }}>
            {ty.title}
          </h1>

          <p style={{ fontSize: 17, color: "#8A8070", lineHeight: 1.7, marginBottom: 48 }}>
            {ty.subtitle}
          </p>

          <a href="/" style={{
            display: "inline-block", padding: "13px 32px",
            borderRadius: 12, fontWeight: 600, fontSize: 15,
            background: "linear-gradient(135deg,#D4AF37,#B8960C)",
            color: "#1A1A1A", textDecoration: "none",
            boxShadow: "0 4px 20px rgba(212,175,55,0.25)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(212,175,55,0.45)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(212,175,55,0.25)"}
          >
            {ty.backButton}
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
