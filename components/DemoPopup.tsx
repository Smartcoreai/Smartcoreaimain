"use client";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const SERIF = "'Playfair Display', Georgia, serif";
const SANS  = "var(--font-inter), -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif";

const NAVY        = "#1a1a2e";
const NAVY_HOVER  = "#2d2d4e";
const TEXT_MUTED  = "#5a5a6e";
const BG_CREAM    = "#f7f6f1";
const BORDER      = "#e8e6dc";
const GOLD        = "#b8902e";

export function DemoPopup({ triggerText = "Bestill demo" }: { triggerText?: string }) {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) {
      const id = setTimeout(() => { setDone(false); setError(null); }, 300);
      return () => clearTimeout(id);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const fd = new FormData(e.currentTarget);
    const { error } = await supabase.from("leads").insert({
      klinikk_navn: String(fd.get("klinikk_navn") ?? ""),
      type_klinikk: "tannlege",
      by: String(fd.get("by") ?? "") || null,
      kontaktperson: String(fd.get("kontaktperson") ?? "") || null,
      email: String(fd.get("email") ?? "") || null,
      telefon: String(fd.get("telefon") ?? "") || null,
      notater: String(fd.get("melding") ?? "") || null,
      status: "ny",
      kilde: "web",
    });

    setSending(false);
    if (error) {
      setError(error.message);
    } else {
      setDone(true);
      setTimeout(() => setOpen(false), 3000);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 9,
    border: `1px solid ${BORDER}`,
    background: "#ffffff",
    color: NAVY,
    fontSize: 15,
    fontFamily: SANS,
    outline: "none",
    transition: "border-color 0.15s",
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          padding: "14px 26px", borderRadius: 11,
          background: NAVY, color: "#ffffff",
          fontSize: 15, fontWeight: 600,
          fontFamily: SANS,
          border: "none", cursor: "pointer",
          boxShadow: "0 4px 16px rgba(26,26,46,0.18)",
          transition: "background 0.2s, transform 0.2s",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = NAVY_HOVER;
          el.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = NAVY;
          el.style.transform = "translateY(0)";
        }}
      >
        {triggerText}
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(10,10,20,0.55)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1000, padding: 16,
            animation: "demoPopupFadeIn 0.18s ease both",
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-popup-title"
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: BG_CREAM,
              borderRadius: 16,
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
              padding: 32,
              maxWidth: 460, width: "100%",
              maxHeight: "90vh", overflowY: "auto",
              position: "relative",
              fontFamily: SANS,
              animation: "demoPopupSlideUp 0.22s cubic-bezier(0.16, 1, 0.3, 1) both",
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Lukk"
              style={{
                position: "absolute", top: 14, right: 14,
                width: 32, height: 32, borderRadius: "50%",
                border: "none", background: "transparent",
                color: TEXT_MUTED, fontSize: 22, lineHeight: 1,
                cursor: "pointer", transition: "color 0.15s, background 0.15s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = NAVY;
                el.style.background = "rgba(26,26,46,0.06)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = TEXT_MUTED;
                el.style.background = "transparent";
              }}
            >×</button>

            {done ? (
              <div style={{ textAlign: "center", padding: "24px 8px" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: NAVY, color: "#ffffff",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  fontSize: 28, marginBottom: 18,
                }}>✓</div>
                <h3 style={{
                  fontFamily: SERIF, fontWeight: 700,
                  fontSize: 28, color: NAVY, margin: "0 0 10px",
                  letterSpacing: "-0.01em",
                }}>Takk!</h3>
                <p style={{ fontSize: 15, color: TEXT_MUTED, lineHeight: 1.6, margin: 0 }}>
                  Vi har mottatt henvendelsen din og kontakter deg innen 24 timer.
                </p>
              </div>
            ) : (
              <>
                <h3
                  id="demo-popup-title"
                  style={{
                    fontFamily: SERIF, fontWeight: 700,
                    fontSize: 28, color: NAVY, margin: "0 0 8px",
                    letterSpacing: "-0.01em", lineHeight: 1.15,
                  }}
                >
                  Bestill demo
                </h3>
                <p style={{
                  fontSize: 14.5, color: TEXT_MUTED,
                  lineHeight: 1.6, margin: "0 0 22px",
                }}>
                  Vi viser deg hvordan Aria ville hørtes ut for din klinikk. Tar 15 minutter.
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <input
                    name="klinikk_navn"
                    required
                    minLength={2}
                    placeholder="Klinikknavn *"
                    style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = GOLD; }}
                    onBlur={e => { e.currentTarget.style.borderColor = BORDER; }}
                  />
                  <input
                    name="kontaktperson"
                    placeholder="Ditt navn"
                    style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = GOLD; }}
                    onBlur={e => { e.currentTarget.style.borderColor = BORDER; }}
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="E-post *"
                    style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = GOLD; }}
                    onBlur={e => { e.currentTarget.style.borderColor = BORDER; }}
                  />
                  <input
                    name="telefon"
                    type="tel"
                    placeholder="Telefon"
                    style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = GOLD; }}
                    onBlur={e => { e.currentTarget.style.borderColor = BORDER; }}
                  />
                  <input
                    name="by"
                    placeholder="By"
                    style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = GOLD; }}
                    onBlur={e => { e.currentTarget.style.borderColor = BORDER; }}
                  />
                  <textarea
                    name="melding"
                    rows={3}
                    placeholder="Hva er du nysgjerrig på?"
                    style={{ ...inputStyle, resize: "vertical", fontFamily: SANS }}
                    onFocus={e => { e.currentTarget.style.borderColor = GOLD; }}
                    onBlur={e => { e.currentTarget.style.borderColor = BORDER; }}
                  />

                  {error && (
                    <p style={{ color: "#b00020", fontSize: 13.5, margin: "2px 0 0" }}>{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    style={{
                      marginTop: 4,
                      padding: "14px 26px", borderRadius: 11,
                      background: NAVY, color: "#ffffff",
                      fontSize: 15, fontWeight: 600,
                      fontFamily: SANS,
                      border: "none",
                      cursor: sending ? "not-allowed" : "pointer",
                      opacity: sending ? 0.6 : 1,
                      boxShadow: "0 4px 16px rgba(26,26,46,0.18)",
                      transition: "background 0.2s, transform 0.2s",
                    }}
                    onMouseEnter={e => {
                      if (sending) return;
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = NAVY_HOVER;
                      el.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = NAVY;
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    {sending ? "Sender…" : "Bestill demo"}
                  </button>

                  <p style={{
                    fontSize: 12, color: "#8a8a98",
                    textAlign: "center", margin: "10px 0 0", lineHeight: 1.5,
                  }}>
                    Ingen kjøpsplikt. GDPR-trygt. Du kan be om sletting når som helst.
                  </p>
                </form>
              </>
            )}
          </div>

          <style>{`
            @keyframes demoPopupFadeIn {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
            @keyframes demoPopupSlideUp {
              from { opacity: 0; transform: translateY(12px) scale(0.98); }
              to   { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
