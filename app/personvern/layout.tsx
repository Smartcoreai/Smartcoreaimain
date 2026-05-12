import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personvernerklæring · Ekspedenten",
  description: "Hvordan Ekspedenten behandler personopplysninger for nettside-besøkende, CRM-brukere og pasienter som ringer Ekspedenten.",
};

export default function PersonvernLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
