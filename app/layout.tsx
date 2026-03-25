import type { Metadata } from "next";
import { Outfit, DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://exovio.agency"), // ✅ non-www

  title: {
    default: "Exovio — UI/UX & Web Design Agency",
    template: "%s | Exovio Agency",
  },
  verification: {
    google: "CSDreK5y3J2xZl9nlyxPnwQoC3MvKyx-PV8CLCTRqi8", // only the content value, not the full tag
  },

  description:
    "Exovio is a design-led UI/UX and web development agency crafting high-performance digital experiences for modern brands.",

  keywords: [
    "design agency India",
    "UI UX agency India",
    "web design agency",
    "creative digital agency",
    "modern website design",
  ],

  alternates: {
    canonical: "https://exovio.agency", // ✅ absolute non-www canonical
  },

  openGraph: {
    title: "Exovio — UI/UX & Web Design Agency",
    description:
      "Design-led agency crafting modern digital experiences, UI/UX systems, and high-performance websites.",
    url: "https://exovio.agency", // ✅ non-www
    siteName: "Exovio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Exovio — Design-led digital agency",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Exovio — UI/UX & Web Design Agency",
    description: "Design-led agency crafting modern digital experiences.",
    images: ["/og-image.png"],
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

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/images/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${dmSans.variable} ${instrumentSerif.variable}`}
    >
      <body
        className="bg-background text-foreground antialiased"
        suppressHydrationWarning
      >
        {/* ✅ ADVANCED STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Exovio",
                url: "https://exovio.agency", // ✅ non-www
                logo: "https://exovio.agency/logo.png", // ✅ non-www
                sameAs: ["https://twitter.com/", "https://linkedin.com/"],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Exovio",
                url: "https://exovio.agency", // ✅ non-www
              },
            ]),
          }}
        />

        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
