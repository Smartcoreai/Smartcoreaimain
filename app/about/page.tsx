import "../landing.css";
import "../about.css";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";
import FadeObserver from "@/components/about/FadeObserver";
import AboutHero from "@/components/about/AboutHero";
import Manifesto from "@/components/about/Manifesto";
import FoundersGrid from "@/components/about/FoundersGrid";
import ValuesGrid from "@/components/about/ValuesGrid";
import Timeline from "@/components/about/Timeline";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata = {
  title: "Om oss. Ekspedenten",
  description: "Bygget i Bergen for klinikker som fortjener bedre. Møt gründerne bak Ekspedenten.",
};

export default function AboutPage() {
  return (
    <div className="lp-root ab-root">
      <LandingNavbar />
      <main>
        <AboutHero />
        <Manifesto />
        <FoundersGrid />
        <ValuesGrid />
        <Timeline />
        <AboutCTA />
      </main>
      <LandingFooter />
      <FadeObserver />
    </div>
  );
}
