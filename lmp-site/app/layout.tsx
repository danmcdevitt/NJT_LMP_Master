import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-background">
      <body
        className={`${outfit.variable} font-sans antialiased bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
