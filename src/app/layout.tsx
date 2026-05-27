import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import AgeGate from "@/components/AgeGate";

// Nacelle — the KJD Capital brand sans. Self-hosted so the two sites match.
const nacelle = localFont({
  variable: "--font-nacelle",
  display: "swap",
  src: [
    { path: "./fonts/nacelle-light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/nacelle-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/nacelle-semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/nacelle-bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/nacelle-heavy.woff2", weight: "800", style: "normal" },
    { path: "./fonts/nacelle-black.woff2", weight: "900", style: "normal" },
  ],
});

// Editorial serif — same Newsreader pairing as the KJD Capital ATS page.
const serif = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "KJD BioLabs | Research-Grade Peptides | 99%+ Purity",
  description:
    "Premium research-grade peptides for qualified researchers and laboratories. Every batch third-party tested; Certificate of Analysis available on request. 99%+ identity purity.",
  openGraph: {
    title: "KJD BioLabs | Research-Grade Peptides",
    description:
      "Research-grade peptides, independently verified. 99%+ identity purity, third-party tested, Certificate of Analysis available on request.",
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
      className={`${nacelle.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white overflow-x-clip">
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
