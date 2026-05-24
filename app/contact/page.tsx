import "../landing.css";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Kontakt — Ekspedenten",
  description:
    "Ta kontakt med Ekspedenten. Vi svarer innen 4 timer i arbeidstiden og kartlegger hva en AI-resepsjonist er verdt for din klinikk.",
};

export default function ContactPage() {
  return (
    <div className="lp-root">
      <LandingNavbar />
      <main>
        <ContactForm />
      </main>
      <LandingFooter />
    </div>
  );
}
