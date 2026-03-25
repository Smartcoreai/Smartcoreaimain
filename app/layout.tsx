import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartcoreAI — AI Solutions for Small Businesses",
  description: "Affordable, powerful AI tools — chatbots, automation, and analytics — built for small businesses. Get a free quote in 60 seconds.",
  openGraph: {
    title: "SmartcoreAI — AI Solutions for Small Businesses",
    description: "Affordable AI tools for small businesses. Chatbots, automation, analytics.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
