import Navbar from "@/components/Navbar";
import FoundingBanner from "@/components/FoundingBanner";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Objections from "@/components/Objections";
import BookingSection from "@/components/BookingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function HomePage() {
  return (
    <>
      <FoundingBanner />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Services />
        <Pricing />
        <Objections />
        <BookingSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
