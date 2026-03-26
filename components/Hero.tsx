"use client";
import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const BADGE_POSITIONS = [
  { x: "8%",  y: "35%", delay: "0s" },
  { x: "78%", y: "25%", delay: "1.5s" },
  { x: "82%", y: "65%", delay: "0.8s" },
  { x: "5%",  y: "68%", delay: "2s" },
];

export default function Hero() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["rgba(168,85,247", "rgba(34,211,238", "rgba(124,58,237"];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color},${p.opacity})`;
        ctx.fill();
      });

      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(168,85,247,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      background: "#08080c",
    }}>
      {/* Canvas particles */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }} />

      {/* Grid background */}
      <div className="bg-grid" style={{ position: "absolute", inset: 0, zIndex: 0 }} />

      {/* Glow orbs */}
      <div style={{
        position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
        zIndex: 1, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "20%", right: "-10%",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)",
        zIndex: 1, pointerEvents: "none",
      }} />

      {/* Floating badges — desktop only */}
      {t.hero.floatingBadges.map((b, i) => (
        <div key={i} className="hidden lg:flex" style={{
          position: "absolute",
          left: BADGE_POSITIONS[i].x,
          top: BADGE_POSITIONS[i].y,
          zIndex: 10,
          animation: `float 6s ease-in-out ${BADGE_POSITIONS[i].delay} infinite`,
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "rgba(20,20,27,0.85)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
            borderRadius: 14,
            padding: "10px 14px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            whiteSpace: "nowrap",
          }}>
            <span style={{ fontSize: 20 }}>{b.icon}</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#f4f4f8" }}>{b.text}</div>
              <div style={{ fontSize: 11, color: "#8888a0" }}>{b.sub}</div>
            </div>
            <div className="dot-glow" style={{ marginLeft: 4 }} />
          </div>
        </div>
      ))}

      {/* Main content */}
      <div className="wrap" style={{
        position: "relative", zIndex: 10,
        padding: "140px 24px 80px",
        textAlign: "center",
      }}>
        {/* Badge */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <div className="tag" style={{ animation: "fadeIn 0.6s ease forwards" }}>
            <Sparkles size={12} />
            {t.hero.tag}
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[80px]" style={{
          fontFamily: "Syne, system-ui, sans-serif",
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          color: "#f4f4f8",
          maxWidth: "min(900px, 100%)",
          margin: "0 auto 24px",
          animation: "slideUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both",
          overflowWrap: "break-word",
          wordBreak: "break-word",
        }}>
          {t.hero.headline1}{" "}
          <span style={{
            background: "linear-gradient(135deg, #a855f7 0%, #22d3ee 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            {t.hero.headline2}
          </span>
        </h1>

        {/* Subtext */}
        <p style={{
          fontSize: 16,
          color: "#8888a0",
          maxWidth: "min(560px, 100%)",
          width: "100%",
          margin: "0 auto 48px",
          lineHeight: 1.7,
          fontWeight: 400,
          animation: "slideUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both",
          overflowWrap: "break-word",
        }}>
          {t.hero.subtext}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center" style={{
          gap: 14,
          marginBottom: 80,
          animation: "slideUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s both",
        }}>
          <div style={{ position: "relative", display: "inline-flex" }}>
            <div style={{
              position: "absolute", inset: -6, borderRadius: 18,
              border: "2px solid rgba(168,85,247,0.5)",
              animation: "pulseRing 2s ease-out infinite",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", inset: -12, borderRadius: 22,
              border: "2px solid rgba(168,85,247,0.25)",
              animation: "pulseRing 2s ease-out 0.6s infinite",
              pointerEvents: "none",
            }} />
            <a href="#booking" className="btn-primary" style={{ fontSize: 15, padding: "14px 28px", position: "relative", zIndex: 1 }}>
              {t.hero.ctaPrimary} <ArrowRight size={16} />
            </a>
          </div>
          <a href="#services" className="btn-outline" style={{ fontSize: 15, padding: "14px 28px" }}>
            {t.hero.ctaSecondary}
          </a>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 hero-stats" style={{
          maxWidth: 700,
          margin: "0 auto",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: 18,
          overflow: "hidden",
          animation: "slideUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s both",
        }}>
          {t.hero.stats.map((s) => (
            <div key={s.label} className="hero-stat-cell" style={{
              padding: "20px 16px",
              textAlign: "center",
            }}>
              <div style={{
                fontFamily: "Syne, system-ui, sans-serif",
                fontSize: 28,
                fontWeight: 800,
                background: "linear-gradient(135deg, #a855f7, #22d3ee)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1.1,
              }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#8888a0", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
