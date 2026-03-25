import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-white py-12 px-4">
      <div className="container-max mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-xl mb-3">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              SmartCore
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              AI solutions built for small businesses. Practical, affordable, and set up in 48 hours.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Services</h4>
            <ul className="space-y-2 text-white/50 text-sm">
              {["AI Chatbot", "Workflow Automation", "Smart Analytics", "Custom Integration"].map((s) => (
                <li key={s}><a href="#services" className="hover:text-white transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Company</h4>
            <ul className="space-y-2 text-white/50 text-sm">
              {["About Us", "Case Studies", "Blog", "Contact"].map((s) => (
                <li key={s}><a href="#contact" className="hover:text-white transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
          <span>&copy; {new Date().getFullYear()} SmartCore. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
