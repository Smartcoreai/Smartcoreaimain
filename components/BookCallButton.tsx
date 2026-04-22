"use client";
import { useLanguage } from "@/lib/i18n";

const CALENDLY_URL = "https://calendly.com/smartcoreaimeeting/new-meeting";

interface BookCallButtonProps {
  variant?: "primary" | "secondary";
  className?: string;
}

export default function BookCallButton({ variant = "primary", className }: BookCallButtonProps) {
  const { t } = useLanguage();
  const label = t.bookCall.label;

  if (variant === "primary") {
    return (
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "14px 28px",
          borderRadius: 11,
          background: "#1a1a2e",
          color: "#ffffff",
          fontSize: 15,
          fontWeight: 600,
          textDecoration: "none",
          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          boxShadow: "0 4px 16px rgba(26,26,46,0.18)",
          transition: "background 0.2s, transform 0.2s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "#2d2d4e";
          el.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "#1a1a2e";
          el.style.transform = "translateY(0)";
        }}
      >
        {label}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
        </svg>
      </a>
    );
  }

  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "10px 20px",
        borderRadius: 9,
        background: "transparent",
        color: "#1a1a2e",
        fontSize: 13,
        fontWeight: 600,
        textDecoration: "none",
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        border: "1px solid rgba(26,26,46,0.2)",
        transition: "border-color 0.18s, color 0.18s",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(26,26,46,0.45)";
        el.style.color = "#0d0d1e";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(26,26,46,0.2)";
        el.style.color = "#1a1a2e";
      }}
    >
      {label}
    </a>
  );
}
