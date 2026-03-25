import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const BADGES = [
  "No tech skills needed",
  "Setup in 48 hours",
  "Cancel anytime",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-brand-900 via-brand-700 to-indigo-500 pt-16">
      {/* Background blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-300/10 rounded-full blur-3xl" />

      <div className="container-max mx-auto px-4 py-24 relative">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white text-sm font-medium px-4 py-2 rounded-full mb-6 border border-white/20">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            Trusted by 500+ small businesses
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            AI that actually{" "}
            <span className="text-yellow-300">works</span>{" "}
            for your business
          </h1>

          <p className="text-xl text-white/80 mb-8 max-w-xl leading-relaxed">
            Chatbots, automation, and smart analytics — designed for small businesses. Start saving time and winning more customers today.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-10">
            <a href="#calculator" className="btn-primary flex items-center gap-2 text-base">
              Get Your Free Quote <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#services" className="btn-secondary text-base">
              See What We Do
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4">
            {BADGES.map((b) => (
              <div key={b} className="flex items-center gap-1.5 text-white/80 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                {b}
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-6 mt-20 pt-10 border-t border-white/10 max-w-lg">
          {[
            { value: "500+", label: "Businesses served" },
            { value: "4.9★", label: "Average rating" },
            { value: "48h", label: "Average setup" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-white">{s.value}</div>
              <div className="text-white/60 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
