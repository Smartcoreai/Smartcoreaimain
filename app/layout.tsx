import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import ScrollReset from "@/components/ScrollReset";
import ForceScrollTop from "@/components/ForceScrollTop";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Ekspedenten — AI-resepsjonist for tannklinikker",
  description: "Ekspedenten bygger AI-resepsjonister for norske tannklinikker. Svarer, booker og følger opp — 24/7.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/ekspedenten-logo.png",
  },
  openGraph: {
    title: "Ekspedenten — AI-resepsjonist for tannklinikker",
    description: "Ekspedenten bygger AI-resepsjonister for norske tannklinikker. Svarer, booker og følger opp — 24/7.",
    type: "website",
    images: [{ url: "/ekspedenten-logo.png", width: 800, height: 800, alt: "Ekspedenten" }],
  },
  twitter: {
    card: "summary",
    images: ["/ekspedenten-logo.png"],
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
