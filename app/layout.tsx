import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import ScrollReset from "@/components/ScrollReset";
import FoundingBanner from "@/components/FoundingBanner";

export const metadata: Metadata = {
  title: "SmartcoreAI — AI-Powered Growth Systems for Modern Businesses",
  description: "AI chatbots, booking automation, CRM systems, and custom integrations. Built for businesses that move fast. Starting at $399/month.",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo-transparent.png",
  },
  openGraph: {
    title: "SmartcoreAI — AI-Powered Growth Systems",
    description: "Chatbots, booking automation, CRM systems. Built for businesses that move fast.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ background: "#1A1A1A" }}>
      <body style={{ margin: 0, background: "#1A1A1A" }}>
        <ScrollReset />
        <LanguageProvider>
          <FoundingBanner />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
