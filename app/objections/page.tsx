import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Objections from "@/components/Objections";

export default function ObjectionsPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#1A1A1A", minHeight: "100vh", paddingTop: 80 }}>
        <Objections />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
