"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", business: "", message: "" });
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 429) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? "For mange innsendinger. Prøv igjen om en time.");
        setState("error");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? "Noe gikk galt. Prøv igjen, eller send e-post direkte til henrik@ekspedenten.no.");
        setState("error");
        return;
      }
      setState("success");
    } catch {
      setErrorMsg("Noe gikk galt. Prøv igjen, eller send e-post direkte til henrik@ekspedenten.no.");
      setState("error");
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-[10px] border border-[#e9e5da] bg-[#faf8f2] text-[#1a1f3a] text-[15px] focus:outline-none focus:border-[#1a1f3a] focus:bg-white transition-colors";

  return (
    <section className="py-14 sm:py-24">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-7">
        <div className="max-w-[640px] mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#9a9eb0]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1a1f3a]" />
            Ta kontakt
          </span>
          <h1 className="font-display text-[30px] sm:text-[44px] leading-[1.08] font-bold tracking-tight text-[#1a1f3a] mt-3">
            La oss se på tallene for <i className="font-semibold text-[#3a3f5c]">din klinikk.</i>
          </h1>
          <p className="mt-4 text-[16px] text-[#5d6175] leading-relaxed max-w-[560px]">
            Vi starter med en uforpliktende samtale, ikke en kontrakt. Fortell kort hva dere lurer på, så svarer vi innen 4 timer i arbeidstiden.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-start">
          <div className="bg-white border border-[#e9e5da] rounded-[20px] p-7 sm:p-9 flex flex-col gap-7">
            <div>
              <h2 className="font-display text-[20px] sm:text-[22px] font-bold text-[#1a1f3a]">Hva du kan forvente</h2>
              <ul className="mt-5 flex flex-col gap-4">
                {[
                  "Svar innen 4 timer i arbeidstiden",
                  "Ingen spam, aldri",
                  "En konkret kartlegging av hva Ekspedenten er verdt for klinikken",
                ].map(p => (
                  <li key={p} className="flex gap-3 text-[15px] text-[#3a3f5c] leading-snug">
                    <svg className="shrink-0 w-[18px] h-[18px] mt-0.5 text-[#1a1f3a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M5 12l5 5L20 7" /></svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[#efebe1] pt-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#9a9eb0] mb-3">Direkte</p>
              <div className="flex flex-col gap-1.5 text-[15px]">
                <a href="mailto:henrik@ekspedenten.no" className="text-[#1a1f3a] font-medium hover:text-[#3a3f5c] transition-colors">henrik@ekspedenten.no</a>
                <a href="mailto:aleksander@ekspedenten.no" className="text-[#1a1f3a] font-medium hover:text-[#3a3f5c] transition-colors">aleksander@ekspedenten.no</a>
              </div>
              <p className="mt-3 text-[14px] text-[#9a9eb0]">Bergen, Norge</p>
            </div>
          </div>

          <div className="bg-white border border-[#e9e5da] rounded-[20px] p-7 sm:p-9">
            {state === "success" ? (
              <div className="flex flex-col items-center text-center gap-4 py-10">
                <div className="w-14 h-14 rounded-full bg-[#e8f3ec] flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#2f7d62]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M5 12l5 5L20 7" /></svg>
                </div>
                <h2 className="font-display text-[24px] font-bold text-[#1a1f3a]">Takk!</h2>
                <p className="text-[15px] text-[#5d6175] leading-relaxed max-w-[320px]">
                  Vi svarer innen 4 timer i arbeidstiden. Du får en bekreftelse på e-post.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-[13px] font-semibold text-[#3a3f5c] mb-2">Navn *</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    minLength={2}
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-[13px] font-semibold text-[#3a3f5c] mb-2">E-post *</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-[13px] font-semibold text-[#3a3f5c] mb-2">
                    Telefon <span className="text-[#9a9eb0] font-normal">(valgfritt)</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-business" className="block text-[13px] font-semibold text-[#3a3f5c] mb-2">Klinikk</label>
                  <input
                    id="contact-business"
                    type="text"
                    value={form.business}
                    onChange={e => setForm({ ...form, business: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-[13px] font-semibold text-[#3a3f5c] mb-2">Hva lurer du på? *</label>
                  <textarea
                    id="contact-message"
                    required
                    minLength={10}
                    rows={4}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass} resize-y`}
                  />
                </div>

                {state === "error" && (
                  <p className="text-[14px] text-[#b00020] -mt-1">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="mt-2 rounded-[10px] bg-[#1a1f3a] text-white px-6 py-[14px] text-[15px] font-semibold hover:bg-[#2d3457] transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {state === "loading" ? "Sender…" : "Send melding"}
                </button>
                <p className="text-[12.5px] text-[#9a9eb0] text-center">
                  Vi svarer innen 4 timer i arbeidstiden.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
