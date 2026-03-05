import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Dutex — Soluções que movem a indústria",
  description:
    "Soluções técnicas em aço e polímeros para proteção de cargas, eficiência logística e redução de riscos operacionais.",
  keywords: [
    "Dutex",
    "soluções industriais",
    "proteção de cargas",
    "logística",
    "B2B",
    "aço",
    "polímeros",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
