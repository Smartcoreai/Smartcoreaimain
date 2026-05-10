import "./landing.css";
import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import SubHeroStrip from "@/components/landing/SubHeroStrip";
import ProblemGrid from "@/components/landing/ProblemGrid";
import BridgeSection from "@/components/landing/BridgeSection";
import SolutionIntro from "@/components/landing/SolutionIntro";
import AgentChatDemo from "@/components/landing/AgentChatDemo";
import CRMSection from "@/components/landing/CRMSection";
import HowItWorks from "@/components/landing/HowItWorks";
import FeatureCards from "@/components/landing/FeatureCards";
import FinalCTA from "@/components/landing/FinalCTA";
import LandingFooter from "@/components/landing/LandingFooter";
import ChatWidget from "@/components/ChatWidget";

export default function HomePage() {
  return (
    <div className="lp-root">
      <LandingNavbar />
      <main>
        <HeroSection />
        <SubHeroStrip />
        <ProblemGrid />
        <BridgeSection />
        <SolutionIntro />
        <AgentChatDemo />
        <CRMSection />
        <HowItWorks />
        <FeatureCards />
        <FinalCTA />
      </main>
      <LandingFooter />
      <ChatWidget />
    </div>
  );
}
