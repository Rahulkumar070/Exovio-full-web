'use client';

import FadeIn from '@/components/animations/FadeIn';
import TransitionLink from '@/components/ui/TransitionLink';

export default function CTA() {
  return (
    <section className="py-40 md:py-60 px-6 md:px-16 text-center">
      <div className="flex flex-col items-center gap-8">
        <FadeIn direction="up">
          <h2
            className="font-serif text-[#1A1A1A] leading-tight tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Have a project in mind?
          </h2>
          <p className="text-lg text-[#8B8680] mt-4">We&apos;d love to hear about it.</p>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <div className="flex flex-col items-center gap-6 mt-8">
            {/* Button with rotating dashed ring */}
            <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
              <div
                aria-hidden="true"
                className="absolute rounded-full border border-dashed border-[#D9D4CE] pointer-events-none"
                style={{
                  width: 200,
                  height: 200,
                  animation: 'slow-spin 20s linear infinite',
                }}
              />
              <TransitionLink
                href="/contact"
                data-cursor-hover
                className="relative z-10 inline-block rounded-full bg-[#1A1A1A] text-[#F5F0EB] px-10 py-4 text-sm uppercase tracking-widest hover:bg-[#C17F59] transition-all duration-300"
              >
                Let&apos;s Talk
              </TransitionLink>
            </div>

            <a
              href="mailto:hello.exovio@gmail.com"
              data-cursor-hover
              className="group text-sm text-[#8B8680] hover:text-[#1A1A1A] transition-colors duration-300 relative"
            >
              hello.exovio@gmail.com
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-px bg-[#1A1A1A] w-0 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
              />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
