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
    // If Calendly script already loaded, init immediately; otherwise it auto-inits on load
    if (window.Calendly) {
      window.Calendly.initInlineWidget({ url, parentElement: containerRef.current });
    }
  }, [canLoad, url]);

  if (!canLoad) {
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 16, padding: "56px 24px",
        border: "1px solid rgba(200,160,74,0.15)", borderRadius: 16,
        background: "rgba(200,160,74,0.04)",
        minHeight: 200,
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(200,160,74,0.6)" strokeWidth="1.5">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <p style={{
          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          fontSize: 15, color: "rgba(250,247,240,0.6)", textAlign: "center", margin: 0,
        }}>
          {c.calendlyFallback}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            fontSize: 13, fontWeight: 600, color: "#c8a04a",
            textDecoration: "underline", textUnderlineOffset: 3,
          }}
        >
          {c.calendlyFallbackLink}
        </a>
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
