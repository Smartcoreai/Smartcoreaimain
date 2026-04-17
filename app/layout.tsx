import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import ScrollReset from "@/components/ScrollReset";
import ForceScrollTop from "@/components/ForceScrollTop";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Ekspedenten — AI-resepsjonist for klinikker og servicebedrifter",
  description: "Ekspedenten bygger AI-resepsjonister, chatboter og bookingsystemer for norske servicebedrifter. Live på 7 dager.",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo-transparent.png",
  },
  openGraph: {
    title: "Ekspedenten — AI-resepsjonist for servicebedrifter",
    description: "AI-resepsjonister og bookingsystemer for norske servicebedrifter.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ background: "#1A1A1A" }}>
      <body style={{ margin: 0, background: "#1A1A1A" }}>
        <ForceScrollTop />
        <ScrollReset />
        <Script src="https://assets.calendly.com/assets/external/widget.css" strategy="afterInteractive" />
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
