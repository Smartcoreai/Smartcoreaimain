import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ProcessSection from "@/components/ProcessSection";
import MidCTA from "@/components/MidCTA";
import TestimonialSection from "@/components/TestimonialSection";
import TrustSection from "@/components/TrustSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import StickyBookingBar from "@/components/StickyBookingBar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <ProcessSection />
        <MidCTA />
        <TestimonialSection />
        <TrustSection />
        <FinalCTA />
      </main>
      <Footer />
      <ChatWidget />
      <StickyBookingBar />
    </>
  );
}
