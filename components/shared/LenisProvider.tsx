'use client';
import { useEffect } from 'react';

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Skip Lenis on touch devices — native scroll is better
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator.userAgent.includes('Mac') && navigator.maxTouchPoints > 1);

    if (isTouchDevice) return;

    let lenis: any = null;
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const Lenis = require('lenis').default;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    } catch (e) {}

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
