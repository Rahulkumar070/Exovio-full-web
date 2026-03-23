import type { Metadata } from 'next';
import WorkContent from './WorkContent';

export const metadata: Metadata = {
  title: 'Our Work — Selected Projects by Exovio',
};

export default function WorkPage() {
  return <WorkContent />;
}
