import type { Metadata } from "next";
import { Outfit, DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/shared/LenisProvider";
import { TransitionProvider } from "@/components/ui/TransitionProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
import PageTransition from "@/components/ui/PageTransition";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: 'Exovio — Beyond Digital Vision',
  description:
    'Award-winning web design and development agency. We create websites that win awards, drive results, and leave lasting impressions.',
  keywords: 'web design, development, branding, motion design, agency, Awwwards',
  openGraph: {
    title: 'Exovio — Beyond Digital Vision',
    description: 'Award-winning web design and development agency.',
    url: 'https://exovio.agency',
    siteName: 'Exovio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exovio — Beyond Digital Vision',
    description: 'Award-winning web design and development agency.',
  },
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${dmSans.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="bg-[#080808] text-foreground font-body min-h-full flex flex-col" style={{ backgroundColor: '#080808' }}>
        {/* Film grain overlay */}
        <div aria-hidden="true" className="fixed inset-0 z-50 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className="opacity-[0.035]">
            <filter id="grain-filter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain-filter)" />
          </svg>
        </div>
        <LenisProvider>
          <TransitionProvider>
            <PageTransition />
            <Preloader />
            <CustomCursor />
            <Navbar />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
          </TransitionProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
