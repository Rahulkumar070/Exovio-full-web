import type { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: "Contact — Let's Build Something Extraordinary",
  description:
    "Have a project in mind? We'd love to hear about it. Tell us what you're building and let's create something extraordinary together.",
  openGraph: {
    title: "Contact Exovio — Let's Build Something Extraordinary",
    description:
      "Have a project in mind? We'd love to hear about it. Tell us what you're building and let's create something extraordinary together.",
    url: 'https://exovio.agency/contact',
  },
  alternates: { canonical: 'https://exovio.agency/contact' },
};

export default function ContactPage() {
  return <ContactContent />;
}
