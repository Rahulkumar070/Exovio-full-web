'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import FadeIn from '@/components/animations/FadeIn';

const SERVICES = [
  { num: '01', title: 'Web Design',     desc: 'Strategic design that converts visitors into customers' },
  { num: '02', title: 'Development',    desc: 'Pixel-perfect code built for speed and scale' },
  { num: '03', title: 'Brand Identity', desc: 'Visual systems that make brands unforgettable' },
  { num: '04', title: 'Motion Design',  desc: 'Animation that brings interfaces to life' },
];

function ServiceRow({
  num,
  title,
  desc,
  delay,
}: {
  num: string;
  title: string;
  desc: string;
  delay: number;
}) {
  const arrowRef = useRef<HTMLSpanElement>(null);

  const onEnter = () => {
    gsap.to(arrowRef.current, { opacity: 1, x: 0, duration: 0.3, ease: 'power3.out', overwrite: true });
  };
  const onLeave = () => {
    gsap.to(arrowRef.current, { opacity: 0, x: -10, duration: 0.2, ease: 'power2.out', overwrite: true });
  };

  return (
    <FadeIn direction="up" delay={delay}>
      <div
        className="flex items-center justify-between py-6 md:py-8 border-b border-[#333333] cursor-pointer group"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        data-cursor-hover
      >
        <div className="flex items-center gap-6 md:gap-10">
          <span className="text-[#8B8680] text-sm font-mono shrink-0">{num}</span>
          <span className="font-display text-xl md:text-2xl text-[#F5F0EB] group-hover:text-[#C17F59] transition-colors duration-300">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-6 md:gap-10">
          <span className="hidden md:block text-[#8B8680] text-sm max-w-xs text-right">{desc}</span>
          <span
            ref={arrowRef}
            className="text-[#F5F0EB] text-lg shrink-0"
            style={{ opacity: 0, transform: 'translateX(-10px)' }}
            aria-hidden="true"
          >
            →
          </span>
        </div>
      </div>
    </FadeIn>
  );
}

export default function Services() {
  return (
    <section className="py-32 md:py-48 px-6 md:px-16 bg-[#1A1A1A]">
      <div className="max-w-6xl mx-auto">
        <FadeIn direction="up">
          <span className="text-xs uppercase tracking-[0.2em] text-[#8B8680]">Services</span>
          <h2
            className="font-display text-[#F5F0EB] mt-2 mb-16 md:mb-24 font-light"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            What we do
          </h2>
        </FadeIn>
        <div className="border-t border-[#333333]">
          {SERVICES.map((s, i) => (
            <ServiceRow key={s.num} {...s} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
