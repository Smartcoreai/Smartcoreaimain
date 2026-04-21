import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import ScrollReset from "@/components/ScrollReset";
import ForceScrollTop from "@/components/ForceScrollTop";
import Script from "next/script";
import { Inter, Playfair_Display, Syne, DM_Sans } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ekspedenten — AI-resepsjonist for tannklinikker",
  description: "Ekspedenten bygger AI-resepsjonister for norske tannklinikker. Svarer, booker og følger opp — 24/7.",
  icons: {
    icon: [
      { url: "/favicon.ico",       sizes: "any",   type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
    ],
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
    <html
      lang="en"
      style={{ background: "#1A1A1A" }}
      className={`${inter.variable} ${playfair.variable} ${syne.variable} ${dmSans.variable}`}
    >
      <head>
        <meta name="theme-color" content="#1a1f3a" />
      </head>
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
