"use client";
import { useState, useEffect, useRef } from "react";
import { hasConsent } from "@/lib/consent";
import { useLanguage } from "@/lib/i18n";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: { url: string; parentElement: HTMLElement; prefill?: object; utm?: object }) => void;
    };
  }
}

interface CalendlyEmbedProps {
  url: string;
  height?: number;
}

function loadCalendlyAssets() {
  if (!document.querySelector('link[href*="calendly.com"]')) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);
  }
  if (!document.getElementById("calendly-js")) {
    const script = document.createElement("script");
    script.id = "calendly-js";
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
  }
}

export default function CalendlyEmbed({ url, height = 700 }: CalendlyEmbedProps) {
  const { t } = useLanguage();
  const c = t.cookies;
  const containerRef = useRef<HTMLDivElement>(null);
  const [canLoad, setCanLoad] = useState(false);

  useEffect(() => {
    setCanLoad(hasConsent("functional"));
    const handler = () => setCanLoad(hasConsent("functional"));
    window.addEventListener("ekspedenten-consent-updated", handler);
    return () => window.removeEventListener("ekspedenten-consent-updated", handler);
  }, []);

  useEffect(() => {
    if (!canLoad || !containerRef.current) return;
    loadCalendlyAssets();
    if (window.Calendly) {
      window.Calendly.initInlineWidget({ url, parentElement: containerRef.current });
    }
  }, [canLoad, url]);

  if (!canLoad) {
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", textAlign: "center",
        gap: 20, padding: "56px 32px",
        background: "#0a0a0a",
        border: "1px solid rgba(200,160,74,0.22)",
        borderRadius: 20,
        minHeight: 280,
      }}>
        {/* Calendar icon */}
        <div style={{
          width: 52, height: 52, borderRadius: 14, flexShrink: 0,
          background: "rgba(200,160,74,0.1)", border: "1px solid rgba(200,160,74,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8a04a" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </div>

        {/* Title */}
        <div>
          <h3 style={{
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            fontSize: 20, fontWeight: 700, color: "#faf7f0",
            margin: "0 0 10px", letterSpacing: "-0.01em",
          }}>
            {c.fallbackTitle}
          </h3>
          <p style={{
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            fontSize: 14, color: "rgba(250,247,240,0.6)",
            lineHeight: 1.65, margin: 0, maxWidth: 380,
          }}>
            {c.fallbackText}
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={() => window.dispatchEvent(new Event("ekspedenten-open-consent"))}
            style={{
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
              fontSize: 14, fontWeight: 600,
              padding: "11px 22px", borderRadius: 10,
              background: "#c8a04a", color: "#0a0a0a",
              border: "none", cursor: "pointer",
              transition: "opacity 0.18s ease",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
          >
            {c.fallbackAcceptBtn}
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
              fontSize: 14, fontWeight: 600,
              padding: "11px 22px", borderRadius: 10,
              background: "transparent",
              color: "#faf7f0",
              border: "1px solid rgba(250,247,240,0.2)",
              textDecoration: "none",
              transition: "border-color 0.18s ease",
              display: "inline-block",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(250,247,240,0.45)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(250,247,240,0.2)"; }}
          >
            {c.fallbackDirectLink}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="calendly-inline-widget"
      data-url={url}
      style={{ minWidth: 320, height, width: "100%" }}
    />
  );
}
