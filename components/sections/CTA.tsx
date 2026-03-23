'use client';

import AnimatedHeading from '@/components/animations/AnimatedHeading';
import FadeIn from '@/components/animations/FadeIn';
import TransitionLink from '@/components/ui/TransitionLink';

export default function CTA() {
  return (
    <section className="py-40 md:py-60 px-6 md:px-16 text-center">
      <div className="flex flex-col items-center gap-8">
        {/* Editorial serif heading */}
        <AnimatedHeading
          className="font-serif text-foreground leading-tight tracking-tight"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' } as React.CSSProperties}
        >
          Have a project in mind?
        </AnimatedHeading>

        <FadeIn direction="up" delay={0.2}>
          <div className="flex flex-col items-center gap-6 mt-8">
            {/* Button with rotating dashed ring */}
            <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
              {/* Rotating ring — pointer-events-none so it never blocks the link */}
              <div
                aria-hidden="true"
                className="absolute rounded-full border border-dashed border-foreground/20 pointer-events-none"
                style={{
                  width: 200,
                  height: 200,
                  animation: 'slow-spin 20s linear infinite',
                }}
              />
              <TransitionLink
                href="/contact"
                data-cursor-hover
                className="relative z-10 inline-block rounded-full border border-foreground text-foreground px-10 py-4 text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-300"
              >
                Let&apos;s Talk
              </TransitionLink>
            </div>

            <a
              href="mailto:hello.exovio@gmail.com"
              data-cursor-hover
              className="group text-sm text-muted hover:text-foreground transition-colors duration-300 relative"
            >
              hello.exovio@gmail.com
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-px bg-foreground w-0 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
              />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
