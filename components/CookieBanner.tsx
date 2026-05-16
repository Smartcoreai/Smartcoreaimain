"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";

const STORAGE_KEY = "ekspedenten-cookie-consent-v1";

export default function CookieBanner() {
  const { t, lang } = useLanguage();
  const c = t.cookies.banner;
  const policyHref = lang === "no" ? "/personvern#cookies" : "/privacy#cookies";

  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    const reopen = () => {
      setClosing(false);
      setVisible(true);
    };
    window.addEventListener("ekspedenten-open-consent", reopen);
    return () => window.removeEventListener("ekspedenten-open-consent", reopen);
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ accepted: true, ts: new Date().toISOString() }),
      );
    } catch {
      /* no-op: still hide */
    }
    setClosing(true);
    window.setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, 300);
  }

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes ekspBannerSlideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        @keyframes ekspBannerSlideDown {
          from { transform: translateY(0); }
          to   { transform: translateY(100%); }
        }
        .eksp-cookie-banner {
          animation: ekspBannerSlideUp 0.3s ease-out both;
        }
        .eksp-cookie-banner[data-closing="true"] {
          animation: ekspBannerSlideDown 0.3s ease-in both;
        }
        @media (prefers-reduced-motion: reduce) {
          .eksp-cookie-banner,
          .eksp-cookie-banner[data-closing="true"] {
            animation: none !important;
          }
        }
        @media (max-width: 699px) {
          .eksp-cookie-banner-inner {
            flex-direction: column;
            align-items: stretch !important;
            gap: 14px !important;
            padding: 16px !important;
          }
          .eksp-cookie-banner-actions {
            width: 100%;
            flex-direction: column;
            align-items: stretch !important;
            gap: 12px !important;
          }
          .eksp-cookie-banner-policy {
            text-align: center;
          }
          .eksp-cookie-banner-button {
            width: 100%;
          }
        }
      `}</style>
      <div
        className="eksp-cookie-banner"
        data-closing={closing}
        role="region"
        aria-label={c.ariaLabel}
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          background: "#fcf7f1",
          borderTop: "1px solid var(--lp-lavender-soft, #d8cdf5)",
          boxShadow: "0 -4px 16px rgba(26,26,46,0.08)",
          fontFamily:
            "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif",
          color: "#1a1f3a",
        }}
      >
        <div
          className="eksp-cookie-banner-inner"
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, letterSpacing: "-0.005em" }}>
              {c.title}
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.55, color: "#3b3f55" }}>
              {c.body}
            </div>
          </div>
          <div
            className="eksp-cookie-banner-actions"
            style={{ display: "flex", alignItems: "center", gap: 18, flexShrink: 0 }}
          >
            <a
              className="eksp-cookie-banner-policy"
              href={policyHref}
              style={{
                color: "#1a1f3a",
                textDecoration: "underline",
                textUnderlineOffset: 3,
                fontSize: 14,
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              {c.policyLink}
            </a>
            <button
              className="eksp-cookie-banner-button"
              type="button"
              onClick={dismiss}
              style={{
                background: "#1a1f3a",
                color: "#ffffff",
                border: "none",
                borderRadius: 100,
                padding: "12px 28px",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "inherit",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "background 0.18s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#2d2d4e";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#1a1f3a";
              }}
            >
              {c.button}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
