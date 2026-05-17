import "../landing.css";
import "../pakke.css";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";
import OfferingContent from "@/components/pakke/OfferingContent";

export const metadata = {
  title: "Ekspedenten — pakke for norske tannklinikker",
  description:
    "AI-resepsjonist som tar telefonen 24/7 og booker direkte i Opus, Muntra og Anita. Founding-pris kr 6 900/mnd.",
  openGraph: {
    title: "Ekspedenten — pakke for norske tannklinikker",
    description:
      "AI-resepsjonist som tar telefonen 24/7 og booker direkte i Opus, Muntra og Anita. Founding-pris kr 6 900/mnd.",
    type: "website",
    images: [{ url: "/ekspedenten-logo.png", width: 800, height: 800, alt: "Ekspedenten" }],
  },
  twitter: {
    card: "summary",
    title: "Ekspedenten — pakke for norske tannklinikker",
    description:
      "AI-resepsjonist som tar telefonen 24/7 og booker direkte i Opus, Muntra og Anita.",
    images: ["/ekspedenten-logo.png"],
  },
};

export default function PakkePage() {
  return (
    <div className="lp-root pkg-root">
      <LandingNavbar />
      <main className="pkg-main">
        <OfferingContent />
      </main>
      <LandingFooter />
    </div>
  );
}
