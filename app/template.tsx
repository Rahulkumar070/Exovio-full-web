'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const ref     = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = '0';

    // Double rAF: first frame commits opacity:0, second starts the transition
    let id2: number | undefined;
    const id1 = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => {
        if (el) el.style.opacity = '1';
      });
    });

    return () => {
      cancelAnimationFrame(id1);
      if (id2 !== undefined) cancelAnimationFrame(id2);
    };
  }, [pathname]);

  return (
    <div ref={ref} style={{ opacity: 0, transition: 'opacity 0.4s ease' }}>
      {children}
    </div>
  );
}
