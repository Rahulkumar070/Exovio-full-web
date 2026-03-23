import type { Metadata } from 'next';
import AnimatedLabel from '@/components/animations/AnimatedLabel';

export const metadata: Metadata = {
  title: 'About — Our Story, Process & Values',
  description:
    'Exovio was founded with a single belief: great design is the most powerful business tool. Learn about our philosophy, process, and the team behind the work.',
  openGraph: {
    title: 'About Exovio — Our Story, Process & Values',
    description:
      'Exovio was founded with a single belief: great design is the most powerful business tool.',
    url: 'https://exovio.agency/about',
  },
  alternates: { canonical: 'https://exovio.agency/about' },
};
import AnimatedHeading from '@/components/animations/AnimatedHeading';
import FadeIn from '@/components/animations/FadeIn';

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Discover',
    description:
      'We immerse ourselves in your business, audience, and goals. Research before pixels.',
  },
  {
    num: '02',
    title: 'Design',
    description:
      'Strategic layouts, typography systems, and interactions. Every decision backed by intention.',
  },
  {
    num: '03',
    title: 'Develop',
    description:
      'Pixel-perfect code. Next.js, GSAP, Tailwind. Built for speed, accessibility, and scale.',
  },
  {
    num: '04',
    title: 'Deliver',
    description:
      'Launch, measure, iterate. We stay involved until the results speak for themselves.',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-background">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="py-40 md:py-60 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <FadeIn direction="up">
            <AnimatedLabel>About Us</AnimatedLabel>
          </FadeIn>

          <AnimatedHeading
            className="font-display font-light text-foreground leading-[0.95] tracking-tight max-w-5xl"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' } as React.CSSProperties}
            delay={0.1}
          >
            We design digital experiences that matter
          </AnimatedHeading>

          <FadeIn direction="up" delay={0.3}>
            <p className="text-lg text-muted leading-relaxed max-w-2xl mt-8">
              Exovio was founded with a single belief: great design is the most powerful business
              tool. We combine strategic thinking with obsessive craft to build websites that
              don&apos;t just look beautiful — they perform.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Philosophy ───────────────────────────────────────── */}
      <section className="py-32 md:py-48 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-0">

          {/* Left */}
          <FadeIn direction="up" className="md:col-span-4 flex flex-col gap-4">
            <AnimatedLabel>Our Philosophy</AnimatedLabel>
            <h2 className="font-display text-2xl text-foreground mt-2">Why we exist</h2>
          </FadeIn>

          {/* Right */}
          <FadeIn direction="up" delay={0.15} className="md:col-span-7 md:col-start-6 flex flex-col gap-8">
            <p className="text-muted leading-relaxed">
              Every pixel we place, every animation we craft, every line of code we write serves a
              purpose. We don&apos;t believe in decoration for its own sake. We believe in design
              that communicates, that guides, that converts.
            </p>
            <p className="text-muted leading-relaxed">
              We work with a small number of clients at a time. This isn&apos;t exclusivity for its
              own sake — it&apos;s how we ensure every project gets the attention it deserves.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────── */}
      <section className="py-32 md:py-48 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col gap-6 mb-16 md:mb-24">
            <FadeIn direction="up">
              <AnimatedLabel>How We Work</AnimatedLabel>
            </FadeIn>
            <AnimatedHeading
              className="font-display font-medium text-foreground leading-tight tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' } as React.CSSProperties}
              delay={0.1}
            >
              A process built on clarity
            </AnimatedHeading>
          </div>

          <div className="border-t border-border">
            {PROCESS_STEPS.map(({ num, title, description }, i) => (
              <FadeIn key={num} direction="up" delay={i * 0.1}>
                <div className="flex items-start justify-between border-b border-border py-6 md:py-8 gap-8">
                  {/* Left: number + title */}
                  <div className="flex items-baseline gap-4 md:gap-8">
                    <span className="text-muted text-sm font-mono shrink-0">{num}</span>
                    <span className="font-display text-xl md:text-2xl text-foreground">{title}</span>
                  </div>

                  {/* Right: description */}
                  <p className="text-muted text-sm leading-relaxed max-w-sm text-right hidden md:block">
                    {description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
