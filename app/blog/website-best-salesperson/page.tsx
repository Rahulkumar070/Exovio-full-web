import type { Metadata } from 'next';
import AnimatedHeading from '@/components/animations/AnimatedHeading';
import FadeIn from '@/components/animations/FadeIn';
import AnimatedLabel from '@/components/animations/AnimatedLabel';

export const metadata: Metadata = {
  title: 'Why Your Website Is Your Best Salesperson',
  description: 'A well-designed website works 24/7, converting visitors into customers. Learn why investing in professional web design pays for itself.',
};

export default function BlogPost() {
  return (
    <div className="bg-[#080808]">
      <article className="py-40 md:py-60 px-6 md:px-16 max-w-3xl mx-auto">
        <FadeIn direction="up">
          <AnimatedLabel>March 2026</AnimatedLabel>
        </FadeIn>

        <AnimatedHeading
          className="font-display font-light text-foreground leading-[0.95] tracking-tight mt-6"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' } as React.CSSProperties}
        >
          Why Your Website Is Your Best Salesperson
        </AnimatedHeading>

        <FadeIn direction="up" delay={0.2}>
          <div className="mt-16 flex flex-col gap-8 text-muted leading-relaxed">
            <p>
              Your website never sleeps, never takes a day off, and never has a bad day.
              It greets every visitor with the same level of professionalism and attention
              to detail — 24 hours a day, 7 days a week. In an age where first impressions
              are made in milliseconds, your website is often the first and most important
              interaction a potential client has with your brand.
            </p>

            <h2 className="text-foreground font-display text-xl mt-4">
              First Impressions Are Digital
            </h2>
            <p>
              Studies show that users form an opinion about a website in just 0.05 seconds.
              That means your design, typography, and loading speed matter more than almost
              anything else in that critical first moment. A poorly designed website tells
              visitors that you don't care about quality — and if you don't care about your
              own brand, why would they trust you with theirs?
            </p>

            <h2 className="text-foreground font-display text-xl mt-4">
              Design That Converts
            </h2>
            <p>
              A beautiful website that doesn't convert is just art. At Exovio, we approach
              every project with a dual mandate: it must look extraordinary AND it must
              perform. That means strategic placement of calls-to-action, clear information
              hierarchy, fast load times, and mobile-first design that works flawlessly
              across every device.
            </p>

            <h2 className="text-foreground font-display text-xl mt-4">
              The ROI of Professional Web Design
            </h2>
            <p>
              Investing in professional web design isn't an expense — it's a revenue multiplier.
              A well-designed website can increase conversion rates by 200-400%. When your site
              communicates trust, authority, and attention to detail, visitors are far more likely
              to become clients.
            </p>

            <h2 className="text-foreground font-display text-xl mt-4">
              What Makes a Website Award-Winning?
            </h2>
            <p>
              Award-winning websites share common traits: impeccable typography, purposeful
              animation, strategic use of whitespace, and interactions that feel effortless.
              They tell a story through design, guiding the visitor from curiosity to conversion
              without friction. At Exovio, we build websites using Next.js, Tailwind CSS, and
              GSAP — the same tools used by the world's best digital agencies.
            </p>

            <h2 className="text-foreground font-display text-xl mt-4">
              Ready to Transform Your Digital Presence?
            </h2>
            <p>
              If your website isn't actively working for your business, it's working against it.
              Let's change that. At Exovio, we design and develop websites that don't just look
              beautiful — they perform, convert, and win awards.
            </p>

            <p className="text-foreground mt-4">
              <a href="/contact" className="underline underline-offset-4 hover:text-muted transition-colors">
                Get in touch
              </a> — let's build something extraordinary together.
            </p>
          </div>
        </FadeIn>
      </article>
    </div>
  );
}
