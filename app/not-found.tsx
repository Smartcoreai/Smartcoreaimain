import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import ChatWidget from "@/components/ChatWidget";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main style={{
        background: "#0a0a0a",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
      }}>
        <div style={{ textAlign: "center", maxWidth: 520 }}>
          <Image src="/ekspedenten-logo.png" alt="Ekspedenten" width={56} height={56} style={{ margin: "0 auto 32px" }} />

          <div style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 96,
            fontWeight: 800,
            lineHeight: 1,
            background: "linear-gradient(135deg,#D4AF37,#F5D87E)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: 24,
          }}>
            404
          </div>

          <h1 style={{
            fontFamily: "Playfair Display, Georgia, serif",
            fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 700,
            color: "#F5F0E8",
            margin: "0 0 16px",
          }}>
            Page not found
          </h1>

          <p style={{ fontSize: 16, color: "#8A8070", lineHeight: 1.7, margin: "0 0 40px" }}>
            The page you're looking for doesn't exist or has been moved.
          </p>

          <Link href="/" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 28px",
            borderRadius: 12,
            background: "linear-gradient(135deg,#D4AF37,#B8960C)",
            color: "#0E0B04",
            fontWeight: 700,
            fontSize: 14,
            textDecoration: "none",
            letterSpacing: "0.02em",
          }}>
            ← Back to homepage
          </Link>
        </div>
      </main>
      <ChatWidget />
    </>
  );
}
