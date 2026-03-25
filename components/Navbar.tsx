"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#calculator" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-transparent"}`}>
      <div className="container-max flex items-center justify-between h-16 px-4 mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-brand-600">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          SmartCore
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-gray-600 hover:text-brand-600 font-medium transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#calculator" className="btn-primary text-sm py-2 px-5">
            Get Free Quote
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 text-gray-600" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="block text-gray-700 hover:text-brand-600 font-medium py-1" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#calculator" className="btn-primary block text-center text-sm" onClick={() => setOpen(false)}>
            Get Free Quote
          </a>
        </div>
      )}
    </nav>
  );
}
