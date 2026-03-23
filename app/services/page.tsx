import type { Metadata } from 'next';
import ServicesContent from './ServicesContent';

export const metadata: Metadata = {
  title: 'Services — Web Design, Development, Branding, Motion',
};

export default function ServicesPage() {
  return <ServicesContent />;
}
