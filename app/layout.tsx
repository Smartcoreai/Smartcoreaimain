import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartcoreAI — AI-Powered Growth Systems for Modern Businesses",
  description: "AI chatbots, booking automation, CRM systems, and custom integrations. Built for businesses that move fast. Starting at $399/month.",
  openGraph: {
    title: "SmartcoreAI — AI-Powered Growth Systems",
    description: "Chatbots, booking automation, CRM systems. Built for businesses that move fast.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ background: "#08080c" }}>
      <body style={{ margin: 0, background: "#08080c" }}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
