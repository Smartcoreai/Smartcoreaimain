import "../landing.css";
import "../pricing.css";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";
import FadeObserver from "@/components/pricing/FadeObserver";
import PricingHero from "@/components/pricing/PricingHero";
import PricingCard from "@/components/PricingCard";
import PricingFootnote from "@/components/pricing/PricingFootnote";

export const metadata = {
  title: "Prising. Ekspedenten",
  description:
    "Ekspedenten Standard — én pakke for norske tannklinikker. Founding-pris kr 6 900/mnd. Ordinær kr 10 000/mnd. Oppstart kr 7 500 engangs.",
};

export default function PricingPage() {
  return (
    <div className="lp-root pp-root">
      <LandingNavbar />
      <main>
        <section className="pp-section">
          <div className="pp-container">
            <PricingHero />
            <PricingCard />
            <PricingFootnote />
          </div>
        </section>
      </main>
      <LandingFooter />
      <FadeObserver />
    </div>
  );
}
