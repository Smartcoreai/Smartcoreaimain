"use client";
import { useState } from "react";
import { Calculator, CheckCircle2, Loader2 } from "lucide-react";

const SERVICES_LIST = [
  { id: "chatbot", label: "AI Chatbot", base: 399, desc: "24/7 lead capture & booking" },
  { id: "leadgen", label: "Leadgen System", base: 499, desc: "Automated lead follow-up" },
  { id: "voice", label: "AI Receptionist", base: 799, desc: "AI-powered reception" },
  { id: "custom", label: "Custom AI Integration", base: 0, desc: "Price discussed on a call" },
];

function calcQuote(services: string[]): number {
  return services.reduce((sum, id) => {
    const s = SERVICES_LIST.find((s) => s.id === id);
    return sum + (s?.base ?? 0);
  }, 0);
}

type Step = "services" | "details" | "done";

export default function QuoteCalculator() {
  const [step, setStep] = useState<Step>("services");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const quote = calcQuote(selectedServices);

  function toggleService(id: string) {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) { setError("Name and email are required"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          services: selectedServices.join(", "),
          budget: `€${quote}/mo`,
          quote,
          source: "quote-calculator",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStep("done");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="calculator" className="section bg-white">
      <div className="container-max mx-auto">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">Instant Estimate</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get your free quote</h2>
            <p className="text-gray-500 text-lg">Takes 60 seconds. No commitment required.</p>
          </div>

          {/* Progress */}
          {step !== "done" && (
            <div className="flex items-center gap-2 mb-8">
              {(["services", "details"] as Step[]).map((s, i) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === s || (step === "details" && i === 0) ? "bg-brand-600 text-white" : "bg-gray-100 text-gray-400"}`}>
                    {i + 1}
                  </div>
                  <span className={`text-sm font-medium ${step === s ? "text-brand-600" : "text-gray-400"}`}>
                    {s === "services" ? "Pick services" : "Your details"}
                  </span>
                  {i < 1 && <div className="flex-1 h-0.5 bg-gray-100 mx-2" />}
                </div>
              ))}
            </div>
          )}

          <div className="card shadow-lg border-gray-200">
            {/* Step 1 */}
            {step === "services" && (
              <div>
                <h3 className="font-bold text-lg mb-1">Which services interest you?</h3>
                <p className="text-gray-500 text-sm mb-5">Select all that apply.</p>
                <div className="space-y-3 mb-6">
                  {SERVICES_LIST.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => toggleService(s.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${selectedServices.includes(s.id) ? "border-brand-600 bg-brand-50" : "border-gray-100 hover:border-gray-300"}`}
                    >
                      <div>
                        <span className="font-medium block">{s.label}</span>
                        <span className="text-xs text-gray-400">{s.desc}</span>
                      </div>
                      <span className="text-sm text-gray-500 shrink-0 ml-4">{s.base > 0 ? `€${s.base}/mo` : "On request"}</span>
                    </button>
                  ))}
                </div>

                {selectedServices.length > 0 && (
                  <div className="bg-brand-50 rounded-xl p-4 mb-6 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600">Estimated monthly investment</div>
                      <div className="text-3xl font-bold text-brand-700">€{quote.toLocaleString()}<span className="text-base font-normal">/mo</span></div>
                    </div>
                    <Calculator className="w-8 h-8 text-brand-400" />
                  </div>
                )}

                <button
                  onClick={() => setStep("details")}
                  disabled={selectedServices.length === 0}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            )}

            {/* Step 2 */}
            {step === "details" && (
              <form onSubmit={handleSubmit}>
                <h3 className="font-bold text-lg mb-1">Where should we send your quote?</h3>
                <p className="text-gray-500 text-sm mb-5">We&apos;ll follow up within 1 business day.</p>

                <div className="bg-brand-50 rounded-xl p-4 mb-6 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600">Your estimate</div>
                    <div className="text-2xl font-bold text-brand-700">€{quote.toLocaleString()}<span className="text-sm font-normal">/mo</span></div>
                  </div>
                  <button type="button" onClick={() => setStep("services")} className="text-xs text-brand-600 underline">Edit</button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Smith"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+1 (555) 000-1234"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Acme Inc."
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : "Get My Free Quote"}
                </button>
                <p className="text-xs text-gray-400 text-center mt-3">No spam. We respect your privacy.</p>
              </form>
            )}

            {/* Done */}
            {step === "done" && (
              <div className="text-center py-6">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">You&apos;re all set!</h3>
                <p className="text-gray-500 mb-4">
                  We received your quote request. Our team will reach out within 1 business day with a tailored proposal.
                </p>
                <div className="bg-brand-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600 mb-1">Your estimate</div>
                  <div className="text-3xl font-bold text-brand-700">€{quote.toLocaleString()}<span className="text-base font-normal">/mo</span></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
