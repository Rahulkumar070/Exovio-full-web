'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface TransitionContextValue {
  navigate: (href: string) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
  isTransitioning: false,
});

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigate = useCallback(
    (href: string) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      // At 500ms panel fully covers screen — push route immediately
      setTimeout(() => {
        router.push(href);
        // 50ms later: start enter animation (panel sweeps off)
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 500);
    },
    [router, isTransitioning]
  );

  return (
    <TransitionContext.Provider value={{ navigate, isTransitioning }}>
      {children}
    </TransitionContext.Provider>
  );
}

export const usePageTransition = () => useContext(TransitionContext);
