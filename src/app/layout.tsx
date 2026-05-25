import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import AgeGate from "@/components/AgeGate";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KJD BioLabs | Research-Grade Peptides | 99%+ Purity",
  description:
    "Premium research-grade peptides for qualified researchers and laboratories. Every batch third-party tested with Certificate of Analysis. 99%+ identity purity guaranteed.",
  openGraph: {
    title: "KJD BioLabs | Research-Grade Peptides",
    description:
      "Research-grade peptides, independently verified. 99%+ identity purity, third-party tested, Certificate of Analysis on every batch.",
    url: "https://kjd-biolabs.vercel.app",
    siteName: "KJD BioLabs",
    images: [{ url: "/kjd-logo-stacked.png", width: 320, height: 320, alt: "KJD BioLabs" }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <CartProvider>
          <AgeGate>
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
            <CartDrawer />
          </AgeGate>
        </CartProvider>
      </body>
    </html>
  );
}
