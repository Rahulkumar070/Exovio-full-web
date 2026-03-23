import Hero from "@/components/sections/Hero";
import InfoGrid from "@/components/sections/InfoGrid";
import Marquee from "@/components/ui/Marquee";
import Services from "@/components/sections/Services";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";

export default function Page() {
  return (
    <div className="bg-background">
      <Hero />
      <InfoGrid />
      <Marquee />
      <Services />
      <FeaturedWork />
      <Testimonials />
      <CTA />
    </div>
  );
}
