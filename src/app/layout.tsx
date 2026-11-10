import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Researcify Academic Studio | Where Ideas Become Impact",
  description: "Professional academic research guidance, thesis support, data analysis and educational resources.",
  keywords: ["academic research support", "thesis guidance", "dissertation support", "SPSS data analysis"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
