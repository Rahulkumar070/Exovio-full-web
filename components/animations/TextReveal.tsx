'use client';

import { useEffect, useRef, Children } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
}

export default function TextReveal({ children, className }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lines = container.querySelectorAll<HTMLElement>('[data-line]');

    gsap.set(lines, { y: '100%' });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(lines, {
          y: '0%',
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
        });
      },
    });

    return () => {
      trigger.kill();
      gsap.killTweensOf(lines);
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {Children.map(children, (child, i) => (
        <div key={i} className="overflow-hidden">
          <div data-line>
            {child}
          </div>
        </div>
      ))}
    </div>
  );
}
