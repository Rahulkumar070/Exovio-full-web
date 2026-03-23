'use client';

import FadeIn from '@/components/animations/FadeIn';

export default function AboutStrip() {
  return (
    <section className="bg-[#E8E4DD] py-32 md:py-48 px-6 md:px-16">
      <div className="max-w-4xl">
        <FadeIn direction="up">
          <p className="text-xs uppercase tracking-[0.2em] text-[#666666] mb-8">
            [ About ]
          </p>
        </FadeIn>
        <FadeIn direction="up" delay={0.1}>
          <p
            className="font-serif italic text-[#0A0A0A] leading-[1.3]"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 3rem)' }}
          >
            We collaborate with ambitious brands to create digital experiences
            that captivate audiences and drive measurable results.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
