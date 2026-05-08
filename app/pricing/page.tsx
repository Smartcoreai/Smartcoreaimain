import "../landing.css";
import "../pricing.css";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";
import ChatWidget from "@/components/ChatWidget";
import FadeObserver from "@/components/pricing/FadeObserver";
import PricingHero from "@/components/pricing/PricingHero";
import MainPricingCard from "@/components/pricing/MainPricingCard";
import AddonCard from "@/components/pricing/AddonCard";
import PricingCTA from "@/components/pricing/PricingCTA";

export const metadata = {
  title: "Prising. Ekspedenten",
  description: "Skalerbar prising for AI-resepsjonist. Kr 11 000/mnd per klinikk + tillegg.",
};

export default function PricingPage() {
  return (
    <div className="lp-root pp-root">
      <LandingNavbar />
      <main>
        <section className="pp-section">
          <div className="pp-container">
            <PricingHero />
            <MainPricingCard />

            <div className="pp-divider pp-fade-target">
              <span className="pp-pill">Tillegg</span>
            </div>

            <AddonCard
              title="Lead-Oppfølger"
              description="Automatisk oppfølging av nye pasient-leads i 7 dager til de booker eller sier nei. Reaktiverer sovende pasienter."
              priceKr="kr 7 500"
              highlight
              delay={1}
              features={[
                "7-dagers e-post + SMS-cadence",
                "Reaktivering av sovende pasienter",
                "No-show påminnelser (1 uke / 1 dag / 2 timer)",
                "Auto-ruting til pipeline",
              ]}
            />

            <AddonCard
              title="Anmeldelse-motor"
              description="Spør om tilbakemelding etter besøk. Ber kun fornøyde pasienter (8–10) om Google-anmeldelse."
              priceKr="kr 2 500"
              delay={2}
              features={[
                "Automatisk SMS etter besøk",
                "NPS-score og trend",
                "Smart-ruting til Google Reviews",
                "AI-svar på eksisterende anmeldelser",
              ]}
            />

            <AddonCard
              title="Custom stemme"
              description="Klone klinikkens egen resepsjonist-stemme, eller lag en helt unik stemme som matcher merket."
              priceKr="kr 1 500"
              delay={3}
              features={[
                "Voice-cloning fra opptak",
                "Custom navn på AI-en",
                "Justerbar tone og taletempo",
                "Eksklusiv for din klinikk",
              ]}
            />

            <PricingCTA />
          </div>
        </section>
      </main>
      <LandingFooter />
      <ChatWidget />
      <FadeObserver />
    </div>
  );
}
