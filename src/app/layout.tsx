import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Keene Xander Brigado — Bridging Code, Operations, and AI",
    template: "%s | Keene Brigado",
  },
  description:
    "Management Engineering student at Ateneo de Manila University. Building scalable automation, full-stack applications, and AI-augmented workflows.",
  keywords: [
    "Keene Brigado",
    "portfolio",
    "developer",
    "management engineering",
    "Ateneo",
    "operations",
    "AI",
    "full-stack",
  ],
  authors: [{ name: "Keene Xander Brigado" }],
  openGraph: {
    title: "Keene Xander Brigado — Bridging Code, Operations, and AI",
    description:
      "Management Engineering student building scalable automation, full-stack applications, and AI-augmented workflows.",
    type: "website",
    locale: "en_US",
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
      className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-dvh flex flex-col bg-background text-foreground selection:bg-accent/30 selection:text-foreground">
        <CustomCursor />
        <Loader />
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Grain overlay */}
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
