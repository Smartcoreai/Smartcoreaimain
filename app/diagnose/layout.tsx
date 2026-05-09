import type { Metadata } from "next";

const title = "Klinikkdiagnose. Hvor mye omsetning lekker klinikken din? | Ekspedenten";
const description = "Få tallet på hva ubesvarte anrop, sovende pasienter, no-shows og webleads utenom åpningstid koster klinikken din i året. Tar 90 sekunder.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/ekspedenten-logo.png", width: 800, height: 800, alt: "Ekspedenten" }],
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function DiagnoseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
