// updated
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ProcessSection from "@/components/ProcessSection";
import MidCTA from "@/components/MidCTA";
import TestimonialSection from "@/components/TestimonialSection";
import TrustSection from "@/components/TrustSection";
import FinalCTA from "@/components/FinalCTA";
import SocialProof from "@/components/SocialProof";
import Ticker from "@/components/Ticker";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Objections from "@/components/Objections";
import BookingSection from "@/components/BookingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import StickyBookingBar from "@/components/StickyBookingBar";
import ScrollReveal from "@/components/ScrollReveal";

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
        <SocialProof />
        <ScrollReveal delay={0}>
          <Ticker />
        </ScrollReveal>
        <ScrollReveal delay={0}>
          <Services />
        </ScrollReveal>
        <ScrollReveal delay={0}>
          <Objections />
        </ScrollReveal>
        <ScrollReveal delay={0}>
          <Pricing />
        </ScrollReveal>
        <ScrollReveal delay={0}>
          <BookingSection />
        </ScrollReveal>
        <ScrollReveal delay={0}>
          <ContactSection />
        </ScrollReveal>
      </main>
      <Footer />
      <ChatWidget />
      <StickyBookingBar />
    </>
  );
}
