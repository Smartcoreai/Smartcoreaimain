import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Objections from "@/components/Objections";

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#080812", minHeight: "100vh", paddingTop: 80 }}>
        <Objections />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
