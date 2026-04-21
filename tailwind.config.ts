import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Keep brand for backward compat with API routes etc.
        brand: {
          50:  "#eef2ff",
          100: "#e0e7ff",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          900: "#1e1b4b",
        },
        // New dark luxury palette
        void:    "#080808",
        surface: "#0a0f1e",
        card:    "#0f0f14",
        border:  "#1e1a10",
        gold:    { DEFAULT: "#D4AF37", light: "#F5D87E", dark: "#B8960C", deep: "#C9A84C" },
        hi:      "#F5F0E8",
        mid:     "#8A8070",
        lo:      "#5A5248",
      },
      fontFamily: {
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        body:    ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "gradient-x":  "gradient-x 8s ease infinite",
        "float":       "float 6s ease-in-out infinite",
        "float-slow":  "float 9s ease-in-out infinite",
        "pulse-slow":  "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow":   "spin 12s linear infinite",
        "blink":       "blink 1.2s step-end infinite",
        "slide-up":    "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in":     "fade-in 0.5s ease forwards",
        "ticker":      "ticker 20s linear infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%":       { "background-position": "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-16px)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        ticker: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
      },
      boxShadow: {
        "glow-gold":   "0 0 40px rgba(212, 175, 55, 0.25)",
        "glow-gold-lg":"0 0 60px rgba(212, 175, 55, 0.2)",
        "glow-sm":     "0 0 20px rgba(212, 175, 55, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
