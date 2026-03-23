'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    setIsFirstVisit(!sessionStorage.getItem('preloader-shown'));
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const delay = isFirstVisit ? 2.2 : 0.3;
    const heading = headingRef.current;
    const subtitle = subtitleRef.current;
    const scroll = scrollRef.current;

    if (heading) {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, delay, ease: 'power3.out' }
      );
    }
    if (subtitle) {
      gsap.fromTo(
        subtitle,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: delay + 0.3, ease: 'power3.out' }
      );
    }
    if (scroll) {
      gsap.fromTo(
        scroll,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: delay + 0.8, ease: 'power2.out' }
      );
    }
  }, [isFirstVisit]);

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 relative">
      <div className="max-w-6xl">
        {/* Main heading — editorial style like Monopo */}
        <HoverImageReveal images={HOVER_IMAGES}>
          <h1
            ref={headingRef}
            className="font-serif text-[#1A1A1A] leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', opacity: 0 }}
          >
            We are a design &amp; development agency crafting{' '}
            <em className="text-[#C17F59]">digital experiences</em>{' '}
            that captivate and convert.
          </h1>
        </HoverImageReveal>

        {/* Subtitle info row */}
        <div
          ref={subtitleRef}
          className="mt-12 flex flex-col md:flex-row md:items-center gap-4 md:gap-12"
          style={{ opacity: 0 }}
        >
          <span className="text-sm text-[#8B8680]">
            <strong className="text-[#1A1A1A] font-medium">Based in India</strong> — Working globally
          </span>
          <span className="text-sm text-[#8B8680]">
            <strong className="text-[#1A1A1A] font-medium">Design-driven</strong> creative agency
          </span>
          <span className="text-sm text-[#8B8680]">
            <strong className="text-[#1A1A1A] font-medium">Web, Brand</strong> &amp; Motion
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B8680]">Scroll</span>
        <div className="w-px h-12 bg-[#D9D4CE] relative overflow-hidden">
          <div
            className="w-full h-full bg-[#1A1A1A]"
            style={{ animation: 'scrollLine 2s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  );
}
