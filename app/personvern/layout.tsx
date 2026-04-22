import type { Metadata } from "next";

// Prevent search engines from indexing this placeholder page
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PersonvernLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
