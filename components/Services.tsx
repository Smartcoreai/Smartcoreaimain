import { Bot, Workflow, BarChart3, Puzzle, ArrowRight } from "lucide-react";

const SERVICES = [
  {
    icon: Bot,
    title: "AI Chatbot",
    description:
      "A 24/7 smart assistant on your website — answers questions, captures leads, and books appointments automatically.",
    features: ["Live on your site in 48h", "Trained on your business", "Hand-off to human"],
    from: "$299/mo",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Eliminate repetitive tasks. We automate invoicing, follow-ups, scheduling, and more using AI.",
    features: ["Connect your existing tools", "Custom triggers & actions", "Full audit log"],
    from: "$499/mo",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description:
      "Turn your data into clear insights. Know which products sell, which customers churn, and where to grow.",
    features: ["Plain-English reports", "Automated weekly digest", "Trend forecasting"],
    from: "$399/mo",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Puzzle,
    title: "Custom AI Integration",
    description:
      "Need something specific? We build tailored AI features that plug directly into your existing software stack.",
    features: ["Scoped discovery session", "Fixed-price project", "Ongoing support option"],
    from: "From $1,500",
    color: "bg-orange-50 text-orange-600",
  },
];

export default function Services() {
  return (
    <section id="services" className="section bg-gray-50">
      <div className="container-max mx-auto">
        <div className="text-center mb-14">
          <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">What We Offer</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">AI tools built for real business</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            No jargon, no huge IT teams needed. Just practical AI that saves you time and grows your revenue.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="card hover:shadow-md transition-shadow group">
                <div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <span className="text-sm font-semibold text-brand-600 bg-brand-50 px-3 py-1 rounded-full ml-2 whitespace-nowrap">
                    {s.from}
                  </span>
                </div>
                <p className="text-gray-500 mb-4 leading-relaxed">{s.description}</p>
                <ul className="space-y-1.5 mb-5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-brand-500 rounded-full flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#calculator" className="inline-flex items-center gap-1 text-brand-600 font-semibold text-sm hover:gap-2 transition-all">
                  Get a quote <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
