"use client";

import { createContext, useContext } from "react";

interface TransitionCtx {
  navigate: (href: string) => void;
}

const TransitionContext = createContext<TransitionCtx>({ navigate: () => {} });
export const usePageTransition = () => useContext(TransitionContext);

export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TransitionContext.Provider value={{ navigate: () => {} }}>
      {children}
    </TransitionContext.Provider>
  );
}
