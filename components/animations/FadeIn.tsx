'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Direction = 'up' | 'down' | 'left' | 'right';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
}

const OFFSET = 30;

function getInitialTransform(direction: Direction): { x?: number; y?: number } {
  switch (direction) {
    case 'up':    return { y: OFFSET };
    case 'down':  return { y: -OFFSET };
    case 'left':  return { x: OFFSET };
    case 'right': return { x: -OFFSET };
  }
}

export default function FadeIn({ children, className, delay = 0, direction = 'up' }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const from = getInitialTransform(direction);
    gsap.set(el, { opacity: 0, ...from });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay,
        });
      },
    });

    return () => {
      trigger.kill();
      gsap.killTweensOf(el);
    };
  }, [delay, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
