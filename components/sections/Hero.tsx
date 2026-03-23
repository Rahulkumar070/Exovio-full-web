'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedHeading from '@/components/animations/AnimatedHeading';
import AnimatedLabel from '@/components/animations/AnimatedLabel';
import HoverImageReveal from '@/components/ui/HoverImageReveal';

gsap.registerPlugin(ScrollTrigger);

const HOVER_IMAGES = [
  'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&h=300&fit=crop',
];

const HERO_TEXT =
  'Exovio is a design and development agency based in India. We collaborate with ambitious brands and startups to create websites that win awards, drive results, and leave lasting impressions.';

function ScrollIndicator() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const arrow = arrowRef.current;
    if (!wrapper || !arrow) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Step 4: fade in at 1.2s
    if (!prefersReducedMotion) {
      gsap.set(wrapper, { opacity: 0 });
      gsap.to(wrapper, { opacity: 1, duration: 0.8, delay: 1.2, ease: 'power2.out' });

      // Bounce arrow
      gsap.to(arrow, {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: 'sine.inOut',
        delay: 1.2,
      });
    }

    // Fade out when user scrolls past 100px
    let visible = true;
    const onScroll = () => {
      const scrolled = window.scrollY > 100;
      if (scrolled && visible) {
        visible = false;
        gsap.to(wrapper, { opacity: 0, duration: 0.4, ease: 'power2.out' });
      } else if (!scrolled && !visible) {
        visible = true;
        gsap.to(wrapper, { opacity: 1, duration: 0.4, ease: 'power2.out' });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      gsap.killTweensOf(wrapper);
      gsap.killTweensOf(arrow);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="flex items-center gap-3">
      <AnimatedLabel>Scroll to explore</AnimatedLabel>
      <span ref={arrowRef} aria-hidden="true" className="inline-block text-muted text-xs">
        ↓
      </span>
    </div>
  );
}

export default function Hero() {
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Step 2 (0.3s): watermark fades in
    gsap.fromTo(
      watermarkRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, delay: 0.3, ease: 'power2.out' }
    );
  }, []);

  return (
    <section className="relative min-h-screen bg-background flex flex-col justify-end px-6 md:px-16 pb-20 md:pb-32 overflow-hidden">

      {/* Step 2: Background watermark */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 font-display uppercase leading-none pointer-events-none select-none overflow-hidden"
        style={{
          fontSize: 'clamp(8rem, 20vw, 18rem)',
          color: 'rgba(245, 245, 240, 0.03)',
          opacity: 0,
        }}
      >
        EXOVIO
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col gap-6">
        {/* Step 3 (0.5s): paragraph word reveal via AnimatedHeading */}
        <HoverImageReveal images={HOVER_IMAGES}>
          <AnimatedHeading
            className="font-display font-light leading-[1.2] tracking-tight text-foreground max-w-5xl"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)' } as React.CSSProperties}
            delay={0.5}
          >
            {HERO_TEXT}
          </AnimatedHeading>
        </HoverImageReveal>

        {/* Separator */}
        <div className="w-16 h-px bg-border" />

        {/* Step 4 (1.2s): scroll indicator fades in */}
        <ScrollIndicator />
      </div>

    </section>
  );
}
