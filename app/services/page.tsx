import type { Metadata } from 'next';
import ServicesContent from './ServicesContent';

export const metadata: Metadata = {
  title: 'Services — Web Design, Development, Branding & Motion',
  description:
    'From strategy to launch: web design, development, branding, and motion design services built for companies that refuse to be ordinary.',
  openGraph: {
    title: 'Services — Web Design, Development, Branding, Motion | Exovio',
    description:
      'From strategy to launch: web design, development, branding, and motion design services built for companies that refuse to be ordinary.',
    url: 'https://exovio.agency/services',
  },
  alternates: { canonical: 'https://exovio.agency/services' },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
