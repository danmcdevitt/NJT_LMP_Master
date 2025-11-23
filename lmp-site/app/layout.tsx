import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "travel agent",
    "holiday planning",
    "personalized travel",
    "holiday booking",
    "travel consultant",
    "ABTA protected",
    "Trustpilot",
    "luxury travel",
    "holiday packages",
  ],
  authors: [{ name: SITE_CONFIG.agentName }],
  creator: SITE_CONFIG.agentName,
  publisher: "Not Just Travel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [
      {
        url: "/images/hero-video-2-poster.jpg",
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: ["/images/hero-video-2-poster.jpg"],
    creator: "@notjusttravel", // Update if Twitter handle exists
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add Google Search Console verification code when available
    // google: "verification-code-here",
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  category: "Travel",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
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
