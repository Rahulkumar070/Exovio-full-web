import type { Metadata } from 'next';
import WorkContent from './WorkContent';

export const metadata: Metadata = {
  title: 'Work — Selected Projects',
  description:
    'A curated selection of award-winning websites, branding systems, and digital experiences crafted by Exovio.',
  openGraph: {
    title: 'Our Work — Selected Projects by Exovio',
    description:
      'A curated selection of award-winning websites, branding systems, and digital experiences crafted by Exovio.',
    url: 'https://exovio.agency/work',
  },
  alternates: { canonical: 'https://exovio.agency/work' },
};

export default function WorkPage() {
  return <WorkContent />;
}
