"use client";
import { useState, useEffect } from "react";
import { getConsent, setConsent, ConsentChoices } from "@/lib/consent";
import { useLanguage } from "@/lib/i18n";

const GOLD = "#c8a04a";
const GOLD_DIM = "rgba(200,160,74,0.18)";
const GOLD_BORDER = "rgba(200,160,74,0.22)";
const BG = "#0a0a0a";
const TEXT = "#faf7f0";
const MUTED = "rgba(250,247,240,0.55)";

function Toggle({ checked, onChange, disabled }: { checked: boolean; onChange: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      style={{
        width: 40, height: 22, borderRadius: 11, border: "none", cursor: disabled ? "not-allowed" : "pointer",
        background: checked ? GOLD : "rgba(250,247,240,0.15)",
        transition: "background 0.2s ease",
        position: "relative", flexShrink: 0,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <span style={{
        position: "absolute", top: 3, left: checked ? 21 : 3,
        width: 16, height: 16, borderRadius: "50%",
        background: "#fff", transition: "left 0.2s ease",
        display: "block",
      }} />
    </button>
  );
}

export default function CookieConsent() {
  const { t } = useLanguage();
  const c = t.cookies;

  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [choices, setChoices] = useState<ConsentChoices>({
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const existing = getConsent();
    if (!existing) {
      setVisible(true);
    } else {
      setChoices({ functional: existing.functional, analytics: existing.analytics, marketing: existing.marketing });
    }
  }, []);

  useEffect(() => {
    const openHandler = () => {
      const existing = getConsent();
      if (existing) {
        setChoices({ functional: existing.functional, analytics: existing.analytics, marketing: existing.marketing });
      }
      setVisible(true);
    };
    window.addEventListener("ekspedenten-open-consent", openHandler);
    return () => window.removeEventListener("ekspedenten-open-consent", openHandler);
  }, []);

  if (!visible) return null;

  function accept() {
    setConsent({ functional: true, analytics: true, marketing: true });
    setVisible(false);
  }

  function decline() {
    setConsent({ functional: false, analytics: false, marketing: false });
    setVisible(false);
  }

  function save() {
    setConsent(choices);
    setVisible(false);
  }

  function toggle(key: keyof ConsentChoices) {
    setChoices((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const categories: Array<{ key: keyof ConsentChoices | "necessary"; label: string; desc: string; disabled?: boolean }> = [
    { key: "necessary", label: c.categories.necessary.label, desc: c.categories.necessary.desc, disabled: true },
    { key: "functional", label: c.categories.functional.label, desc: c.categories.functional.desc },
    { key: "analytics",  label: c.categories.analytics.label,  desc: c.categories.analytics.desc },
    { key: "marketing",  label: c.categories.marketing.label,  desc: c.categories.marketing.desc },
  ];

  const btnBase: React.CSSProperties = {
    fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
    fontSize: 13, fontWeight: 600,
    padding: "8px 16px", borderRadius: 8,
    cursor: "pointer", border: "1px solid transparent",
    transition: "all 0.18s ease", whiteSpace: "nowrap",
    lineHeight: 1,
  };

  return (
    <div
      role="dialog"
      aria-label={c.banner.title}
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9999,
        background: BG,
        borderTop: `1px solid ${GOLD_BORDER}`,
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        boxShadow: "0 -8px 40px rgba(0,0,0,0.6)",
      }}
    >
      {/* Category panel — shown when expanded */}
      {expanded && (
        <div style={{
          borderBottom: `1px solid ${GOLD_BORDER}`,
          padding: "20px 24px 16px",
        }}>
          <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
            {categories.map(({ key, label, desc, disabled }) => (
              <div key={key} style={{
                display: "flex", alignItems: "flex-start", gap: 14,
                padding: "12px 16px", borderRadius: 10,
                background: "rgba(250,247,240,0.04)",
                border: `1px solid rgba(200,160,74,0.1)`,
              }}>
                <Toggle
                  checked={key === "necessary" ? true : choices[key as keyof ConsentChoices]}
                  onChange={() => key !== "necessary" && toggle(key as keyof ConsentChoices)}
                  disabled={disabled}
                />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
              <button
                onClick={save}
                style={{
                  ...btnBase,
                  background: GOLD_DIM,
                  color: GOLD,
                  borderColor: GOLD_BORDER,
                }}
              >
                {c.save}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main banner row */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "16px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          {/* Text */}
          <div style={{ flex: 1, minWidth: 200 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{c.banner.title} · </span>
            <span style={{ fontSize: 13, color: MUTED, lineHeight: 1.5 }}>{c.banner.desc} </span>
            <a
              href="/personvern"
              style={{ fontSize: 13, color: GOLD, textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              {c.banner.policyLink}
            </a>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 8, flexShrink: 0, flexWrap: "wrap" }}>
            <button
              onClick={() => setExpanded((v) => !v)}
              style={{
                ...btnBase,
                background: "transparent",
                color: MUTED,
                borderColor: "rgba(250,247,240,0.15)",
              }}
            >
              {c.banner.customize}
            </button>
            <button
              onClick={decline}
              style={{
                ...btnBase,
                background: "transparent",
                color: TEXT,
                borderColor: "rgba(250,247,240,0.25)",
              }}
            >
              {c.banner.decline}
            </button>
            <button
              onClick={accept}
              style={{
                ...btnBase,
                background: GOLD,
                color: "#0a0a0a",
                borderColor: GOLD,
              }}
            >
              {c.banner.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
