import Hero from '@/components/sections/Hero';
import InfoGrid from '@/components/sections/InfoGrid';
import Marquee from '@/components/ui/Marquee';
import FeaturedWork from '@/components/sections/FeaturedWork';
import Services from '@/components/sections/Services';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';

export default function Page() {
  return (
    <div className="bg-[#F5F0EB]">
      <Hero />
      <InfoGrid />
      <Marquee />
      <FeaturedWork />
      <Services />
      <Testimonials />
      <CTA />
    </div>
  );
}
