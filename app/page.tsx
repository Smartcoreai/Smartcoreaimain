import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import QuoteCalculator from "@/components/QuoteCalculator";
import GoogleReviews from "@/components/GoogleReviews";
import ContactSection from "@/components/ContactSection";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <QuoteCalculator />
        <GoogleReviews />
        <ContactSection />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
