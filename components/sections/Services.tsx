'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import AnimatedLabel from '@/components/animations/AnimatedLabel';
import AnimatedHeading from '@/components/animations/AnimatedHeading';
import FadeIn from '@/components/animations/FadeIn';

const SERVICES = [
  {
    num: '01',
    title: 'Web Design',
    description: 'Strategic design that converts visitors into customers',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop',
    rotation: -1.8,
  },
  {
    num: '02',
    title: 'Development',
    description: 'Pixel-perfect code built for speed and scale',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
    rotation: 1.3,
  },
  {
    num: '03',
    title: 'Brand Identity',
    description: 'Visual systems that make brands unforgettable',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop',
    rotation: -0.7,
  },
  {
    num: '04',
    title: 'Motion Design',
    description: 'Animation that brings interfaces to life',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
    rotation: 2.1,
  },
];

function ServiceRow({
  num,
  title,
  description,
  image,
  rotation,
  delay,
}: {
  num: string;
  title: string;
  description: string;
  image: string;
  rotation: number;
  delay: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(arrowRef.current, { opacity: 0, x: -10 });
    gsap.set(imgRef.current, { opacity: 0, x: 0, y: 0 });
  }, []);

  const onEnter = () => {
    gsap.to(arrowRef.current, { opacity: 1, x: 0, duration: 0.3, ease: 'power3.out', overwrite: true });
    gsap.to(rowRef.current, { color: 'var(--color-foreground)', duration: 0.3, ease: 'power2.out' });
    gsap.to(imgRef.current, { opacity: 1, duration: 0.4, ease: 'power3.out', overwrite: true });
  };

  const onLeave = () => {
    gsap.to(arrowRef.current, { opacity: 0, x: -10, duration: 0.2, ease: 'power2.out', overwrite: true });
    gsap.to(rowRef.current, { color: '', duration: 0.3, ease: 'power2.out' });
    gsap.to(imgRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out', overwrite: true });
  };

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = rowRef.current?.getBoundingClientRect();
    if (!rect) return;
    gsap.to(imgRef.current, {
      x: e.clientX - rect.left - 90,
      y: e.clientY - rect.top - 60,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  return (
    <FadeIn direction="up" delay={delay}>
      <div
        ref={rowRef}
        data-cursor-hover
        className="relative flex items-center justify-between border-b border-border py-6 md:py-8 cursor-pointer overflow-hidden"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onMouseMove={onMove}
      >
        {/* Cursor-following image */}
        <div
          ref={imgRef}
          aria-hidden="true"
          className="absolute pointer-events-none z-20 overflow-hidden rounded-sm"
          style={{
            width: 180,
            height: 120,
            top: 0,
            left: 0,
            transform: `rotate(${rotation}deg)`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Left */}
        <div className="relative z-10 flex items-center gap-4 md:gap-8">
          <span className="text-muted text-sm font-mono shrink-0">{num}</span>
          <span className="font-display text-xl md:text-2xl text-foreground">{title}</span>
        </div>

        {/* Right */}
        <div className="relative z-10 flex items-center gap-6 md:gap-10">
          <span className="hidden md:block text-muted text-sm max-w-sm text-right">
            {description}
          </span>
          <span ref={arrowRef} aria-hidden="true" className="text-foreground text-lg">
            →
          </span>
        </div>
      </div>
    </FadeIn>
  );
}

export default function Services() {
  return (
    <section className="py-40 md:py-60 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 mb-16 md:mb-24">
          <FadeIn direction="up">
            <AnimatedLabel>What We Do</AnimatedLabel>
          </FadeIn>
          <AnimatedHeading
            className="font-display font-medium text-foreground leading-tight tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' } as React.CSSProperties}
          >
            Services built for impact
          </AnimatedHeading>
        </div>

        <div className="border-t border-border">
          {SERVICES.map((s, i) => (
            <ServiceRow key={s.num} {...s} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
