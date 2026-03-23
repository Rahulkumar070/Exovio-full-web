import type { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: "Contact Exovio — Let's Build Something Extraordinary",
};

export default function ContactPage() {
  return <ContactContent />;
}
