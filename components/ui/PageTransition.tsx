'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePageTransition } from './TransitionProvider';

export default function PageTransition() {
  const panelRef = useRef<HTMLDivElement>(null);
  const { isTransitioning } = usePageTransition();
  const isFirst = useRef(true);

  useEffect(() => {
    // Skip on initial mount — panel starts hidden below viewport
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    const panel = panelRef.current;
    if (!panel) return;

    gsap.killTweensOf(panel);

    if (isTransitioning) {
      // Slide up from bottom to cover screen
      gsap.to(panel, {
        y: '0%',
        duration: 0.5,
        ease: 'power3.inOut',
      });
    } else {
      // Continue sliding up and off screen, then reset silently to bottom
      gsap.to(panel, {
        y: '-100%',
        duration: 0.5,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.set(panel, { y: '100%' });
        },
      });
    }
  }, [isTransitioning]);

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[9998] bg-[#F5F0EB] pointer-events-none"
      style={{ transform: 'translateY(100%)' }}
    >
    </div>
  );
}
