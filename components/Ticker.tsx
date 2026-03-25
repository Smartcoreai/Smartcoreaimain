export default function Ticker() {
  const items = [
    "AI Chatbot", "Booking Automation", "CRM System", "Lead Capture",
    "Custom Integrations", "24/7 Support", "Revenue Growth", "AI Workflows",
    "Instant Setup", "Smart Automation", "Real-time Analytics", "Client Portal",
  ];
  const doubled = [...items, ...items];

  return (
    <div style={{
      borderTop: "1px solid rgba(255,255,255,0.04)",
      borderBottom: "1px solid rgba(255,255,255,0.04)",
      background: "rgba(255,255,255,0.01)",
      overflow: "hidden",
      padding: "14px 0",
      position: "relative",
      zIndex: 10,
    }}>
      {/* Fade edges */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(90deg, #08080c 0%, transparent 8%, transparent 92%, #08080c 100%)",
      }} />
      <div style={{
        display: "flex",
        animation: "ticker 30s linear infinite",
        width: "max-content",
      }}>
        {doubled.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 16, paddingRight: 40,
            whiteSpace: "nowrap",
          }}>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#a855f7", display: "inline-block" }} />
            <span style={{ fontSize: 13, fontWeight: 500, color: "#8888a0", letterSpacing: "0.02em" }}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
