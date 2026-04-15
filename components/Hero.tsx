"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const BADGE_POSITIONS = [
  { x: "8%",  y: "35%", delay: "0s" },
  { x: "80%", y: "25%", delay: "1.5s" },
  { x: "5%",  y: "68%", delay: "2s" },
];

export default function Hero() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Typewriter ──────────────────────────────────────────────────────────────
  const fullText = t.hero.headline1 + " " + t.hero.headline2;
  const splitAt = t.hero.headline1.length + 1; // after "headline1 "
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    setTyped(0); // reset when language changes
  }, [fullText]);

  useEffect(() => {
    const delay = typed < fullText.length ? 80 : 3000;
    const id = setTimeout(
      () => setTyped((c) => (c < fullText.length ? c + 1 : 0)),
      delay
    );
    return () => clearTimeout(id);
  }, [typed, fullText.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number; maxOpacity: number; life: number; color: string }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Gold and warm-navy dust
    const colors = ["rgba(212,175,55", "rgba(245,216,126", "rgba(184,150,12", "rgba(10,15,30"];

    const spawnParticle = () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 40,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 0.5 + 0.2),
      size: Math.random() * 2 + 0.5,
      life: Math.random(),
      maxOpacity: Math.random() * 0.4 + 0.1,
      opacity: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    for (let i = 0; i < 60; i++) {
      const p = spawnParticle();
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.life += 0.0018;
        p.opacity = p.maxOpacity * Math.sin(Math.PI * Math.min(p.life, 1));
        p.x += p.vx;
        p.y += p.vy;

        if (p.life >= 1 || p.y < -10) {
          Object.assign(p, spawnParticle());
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color},${p.opacity})`;
        ctx.fill();
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
      background: "#0A0806",
    }}>
      {/* Bergen city photo background */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "url('/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
        backgroundRepeat: "no-repeat",
      }} />

      {/* Dark overlay — keeps text readable over the photo */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(180deg, rgba(8,6,4,0.72) 0%, rgba(8,6,4,0.55) 45%, rgba(8,6,4,0.80) 100%)",
      }} />

      {/* Gold radial glow on top of overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.10) 0%, transparent 55%)",
        pointerEvents: "none",
      }} />

      {/* Canvas particles */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 3 }} />

      {/* Hairline top border */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.4) 30%, rgba(245,216,126,0.6) 50%, rgba(212,175,55,0.4) 70%, transparent 100%)",
        zIndex: 10,
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
            background: "rgba(10,15,30,0.9)",
            border: "1px solid rgba(212,175,55,0.18)",
            backdropFilter: "blur(12px)",
            borderRadius: 14,
            padding: "10px 14px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            whiteSpace: "nowrap",
          }}>
            <span style={{ fontSize: 20 }}>{b.icon}</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#F5F0E8" }}>{b.text}</div>
              <div style={{ fontSize: 11, color: "#8A8070" }}>{b.sub}</div>
            </div>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#D4AF37", boxShadow: "0 0 7px #D4AF37", marginLeft: 4 }} />
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

        {/* Headline — typewriter */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[80px]" style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
          color: "#F5F0E8",
          maxWidth: "min(900px, 100%)",
          margin: "0 auto 24px",
          animation: "slideUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both",
          overflowWrap: "break-word",
          wordBreak: "break-word",
          minHeight: "2.2em",
          textShadow: "0 2px 40px rgba(0,0,0,0.6)",
        }}>
          {fullText.slice(0, Math.min(typed, splitAt))}
          {typed > splitAt && (
            <span style={{
              background: "linear-gradient(135deg, #D4AF37 0%, #F5D87E 60%, #D4AF37 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 3s linear infinite",
            }}>
              {fullText.slice(splitAt, typed)}
            </span>
          )}
          <span style={{
            display: "inline-block",
            width: "3px",
            height: "0.85em",
            background: "#D4AF37",
            marginLeft: "3px",
            verticalAlign: "middle",
            animation: "blink 1s step-end infinite",
          }} />
        </h1>

        {/* Subtext */}
        <p style={{
          fontSize: 16,
          color: "#C8BFB0",
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

        {/* Single primary CTA */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          marginBottom: 80,
          animation: "slideUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s both",
        }}>
          <div style={{ position: "relative", display: "inline-flex" }}>
            <div style={{
              position: "absolute", inset: -6, borderRadius: 18,
              border: "2px solid rgba(212,175,55,0.5)",
              animation: "pulseRing 2s ease-out infinite",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", inset: -12, borderRadius: 22,
              border: "2px solid rgba(212,175,55,0.22)",
              animation: "pulseRing 2s ease-out 0.6s infinite",
              pointerEvents: "none",
            }} />
            <a href="#booking" className="btn-primary" style={{ fontSize: 15, padding: "14px 32px", position: "relative", zIndex: 1 }}>
              {t.hero.ctaPrimary} <ArrowRight size={16} />
            </a>
          </div>
          {/* Trust line */}
          <p style={{
            fontSize: 13,
            color: "rgba(212,175,55,0.65)",
            margin: 0,
            fontWeight: 500,
            letterSpacing: "0.01em",
          }}>
            {t.hero.trustLine}
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 hero-stats" style={{
          maxWidth: 700,
          margin: "0 auto",
          background: "rgba(212,175,55,0.02)",
          border: "1px solid rgba(212,175,55,0.08)",
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
                background: "linear-gradient(135deg, #D4AF37, #F5D87E)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1.1,
              }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#8A8070", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
