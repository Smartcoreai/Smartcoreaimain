"use client";
import { useState } from "react";
import { Phone, Mail, CheckCircle2, Loader2, MapPin } from "lucide-react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) { setError("Name and email are required."); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "contact-form" }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="section bg-white">
      <div className="container-max mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">Get In Touch</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Let&apos;s talk about your business</h2>
            <p className="text-gray-500 text-lg mb-8">
              Not sure which AI solution is right for you? Our team will help you figure it out — no commitment required.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium">Call us</div>
                  <div className="font-semibold">+1 (555) 000-1234</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium">Email</div>
                  <div className="font-semibold">hello@nexaai.com</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium">Office</div>
                  <div className="font-semibold">123 Innovation Drive, San Francisco, CA</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="card shadow-lg border-gray-200">
            {done ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Message received!</h3>
                <p className="text-gray-500">We&apos;ll reach out within 1 business day. Looking forward to speaking with you!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Smith" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@company.com" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 (555) 000-1234" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4} placeholder="Tell us about your business and what you're looking for..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none" />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
