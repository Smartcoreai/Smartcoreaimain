// updated
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import HowItWorks from "@/components/HowItWorks";
import Ticker from "@/components/Ticker";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Objections from "@/components/Objections";
import BookingSection from "@/components/BookingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ScrollReveal from "@/components/ScrollReveal";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <HowItWorks />
        <ScrollReveal delay={0}>
          <Ticker />
        </ScrollReveal>
        <ScrollReveal delay={0}>
          <Services />
        </ScrollReveal>
        <ScrollReveal delay={0}>
          <Pricing />
        </ScrollReveal>
        <ScrollReveal delay={0}>
          <Objections />
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
    </>
  );
}
