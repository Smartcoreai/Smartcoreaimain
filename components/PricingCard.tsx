import { DemoPopup } from "@/components/DemoPopup";

export default function PricingCard() {
  return (
    <section className="py-12">
      <div className="max-w-[1040px] mx-auto px-7">
        <div className="relative overflow-hidden rounded-[28px] border border-[#e9e5da] bg-white shadow-[0_24px_70px_rgba(26,31,58,0.07)]">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#1a1f3a] to-[#c4b6e0]" />

          <div className="p-8 sm:p-12">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
              <div className="max-w-md">
                <h2 className="font-display text-[28px] sm:text-[40px] leading-[1.05] font-bold tracking-tight">Ekspedenten Standard</h2>
                <p className="mt-3 text-[16.5px] text-[#5d6175] leading-relaxed">AI-resepsjonist som tar telefonen 24/7 og booker direkte i Opus, Muntra og Anita.</p>
              </div>

              <div className="md:text-right shrink-0 md:min-w-[290px]">
                <span className="inline-block rounded-full bg-[#ece7f6] text-[#463a63] text-[11.5px] font-bold uppercase tracking-[0.07em] px-[14px] py-[6px]">Founding · Første 5 klinikker</span>
                <p className="mt-[18px] text-[14px] text-[#9a9eb0]">Ordinær pris kr 10 000/mnd</p>
                <div className="mt-1 flex items-baseline md:justify-end gap-1.5">
                  <span className="text-[26px] font-semibold text-[#1a1f3a]">kr</span>
                  <span className="text-[40px] sm:text-[56px] leading-none font-bold tracking-[-0.03em] tabular-nums text-[#1a1f3a]">6&nbsp;900</span>
                  <span className="text-[17px] font-medium text-[#5d6175]">/mnd</span>
                </div>
                <p className="mt-3 text-[12.5px] leading-snug text-[#9a9eb0] md:ml-auto md:max-w-[300px]">Founding-pris låst i 12 måneder fra signering. Øker ikke selv etter de 5 første klinikkene er fylt.</p>
              </div>
            </div>

            <hr className="my-9 border-[#efebe1]" />

            <div className="grid grid-cols-1 sm:grid-cols-2 rounded-2xl border border-[#efebe1] bg-[#faf8f2] divide-y sm:divide-y-0 sm:divide-x divide-[#e9e5da]">
              <div className="px-7 py-5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#9a9eb0]">Oppstart</p>
                <p className="mt-1.5 text-[17px] font-semibold">kr 7 500 engangs</p>
              </div>
              <div className="px-7 py-5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#9a9eb0]">Binding</p>
                <p className="mt-1.5 text-[17px] font-semibold">3 måneder, deretter månedlig</p>
              </div>
            </div>

            <div className="mt-9">
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.09em] text-[#1a1f3a] mb-4">Inkludert</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-9 gap-y-3.5">
                {[
                  "AI som tar inngående anrop 24/7",
                  "Booking direkte i Opus, Muntra eller Anita",
                  "SMS-bekreftelse til pasient",
                  "Dashboard på app.ekspedenten.no",
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-[15.5px] leading-snug">
                    <svg className="shrink-0 w-[18px] h-[18px] mt-0.5 text-[#1a1f3a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12l5 5L20 7" /></svg>{t}
                  </li>
                ))}
                <li className="flex gap-3 text-[15.5px] leading-snug sm:col-span-2">
                  <svg className="shrink-0 w-[18px] h-[18px] mt-0.5 text-[#1a1f3a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12l5 5L20 7" /></svg>Manuell opplæring fra Henrik / Aleksander første uke
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.09em] text-[#1a1f3a] mb-4">Garantier</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-9 gap-y-3.5">
                {[
                  "60 dagers ROI-garanti",
                  "Live på 7 virkedager",
                  "Klinikken eier dataen",
                  "All data lagret i EU (Frankfurt)",
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-[15.5px] leading-snug">
                    <svg className="shrink-0 w-[18px] h-[18px] mt-0.5 text-[#1a1f3a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12l5 5L20 7" /></svg>{t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <DemoPopup triggerText="Bestill demo" className="rounded-[10px] bg-[#1a1f3a] text-white px-6 py-[13px] text-[15px] font-semibold hover:-translate-y-px hover:shadow-lg transition" />
              <a href="/pakke" className="px-2 py-[13px] text-[15px] font-semibold text-[#1a1f3a] hover:text-[#3a3f5c] transition">Se hele pakken →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
