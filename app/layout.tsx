import type { Metadata, Viewport } from "next";
import { Outfit, DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/shared/LenisProvider";
import JsonLd from "@/components/shared/JsonLd";
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
  metadataBase: new URL('https://exovio.agency'),
  title: {
    default: 'Exovio — Beyond Digital Vision',
    template: '%s | Exovio',
  },
  description:
    'Award-winning web design and development agency. We create websites that win awards, drive results, and leave lasting impressions.',
  keywords: [
    'web design',
    'web development',
    'branding',
    'motion design',
    'agency',
    'Awwwards',
    'Next.js',
    'GSAP',
    'UI/UX',
  ],
  authors: [{ name: 'Exovio', url: 'https://exovio.agency' }],
  creator: 'Exovio',
  publisher: 'Exovio',
  verification: {
    google: 'CSDreK5y3J2xZl9nlyxPnwQoC3MvKyx-PV8CLCTRqi8',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Exovio — Beyond Digital Vision',
    description:
      'Award-winning web design and development agency. We create websites that win awards, drive results, and leave lasting impressions.',
    url: 'https://exovio.agency',
    siteName: 'Exovio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Exovio — Beyond Digital Vision',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exovio — Beyond Digital Vision',
    description:
      'Award-winning web design and development agency. We create websites that win awards, drive results, and leave lasting impressions.',
    creator: '@exovio',
    images: ['/opengraph-image'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://exovio.agency',
  },
};

export const viewport: Viewport = {
  themeColor: '#080808',
  colorScheme: 'dark',
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Exovio',
  url: 'https://exovio.agency',
  logo: 'https://exovio.agency/android-chrome-512x512.png',
  description:
    'Award-winning web design and development agency. We create websites that win awards, drive results, and leave lasting impressions.',
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    url: 'https://exovio.agency/contact',
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Exovio',
  url: 'https://exovio.agency',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://exovio.agency/work?q={search_term_string}',
    'query-input': 'required name=search_term_string',
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
      suppressHydrationWarning
      className={`${outfit.variable} ${dmSans.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body suppressHydrationWarning className="bg-[#080808] text-foreground font-body min-h-screen" style={{ backgroundColor: '#080808' }}>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        {/* Film grain overlay */}
        <div
          aria-hidden="true"
          className="fixed inset-0 z-30 pointer-events-none select-none"
          style={{ pointerEvents: 'none' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className="opacity-[0.035]"
            style={{ pointerEvents: 'none' }}
          >
            <filter id="grain-filter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain-filter)" style={{ pointerEvents: 'none' }} />
          </svg>
        </div>
        <LenisProvider>
          <TransitionProvider>
            <PageTransition />
            <Preloader />
            <CustomCursor />
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </TransitionProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
