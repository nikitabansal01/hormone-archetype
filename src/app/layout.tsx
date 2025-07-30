import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Hormone Archetype Quiz - Discover Your Unique Hormone Profile",
  description: "Take our comprehensive 9-question quiz to uncover your hormone archetype and get personalized SHINES protocol recommendations for optimal health and balance.",
  keywords: "hormone quiz, hormone archetype, hormone balance, women's health, SHINES protocol, hormone optimization",
  authors: [{ name: "Hormone Archetype Quiz" }],
  openGraph: {
    title: "Hormone Archetype Quiz - Discover Your Unique Hormone Profile",
    description: "Take our comprehensive 9-question quiz to uncover your hormone archetype and get personalized recommendations.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hormone Archetype Quiz - Discover Your Unique Hormone Profile",
    description: "Take our comprehensive 9-question quiz to uncover your hormone archetype and get personalized recommendations.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
        <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600 text-sm">
              © 2025. Hormone Archetype Quiz. Inspired by <em>The Hormone Balance Bible</em> by Dr. Shawn Tassone, MD, PhD.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
