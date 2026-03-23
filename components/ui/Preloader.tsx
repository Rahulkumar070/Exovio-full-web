"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const line = lineRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    if (!root || !line || !title || !subtitle) return;

    if (sessionStorage.getItem("preloader-shown")) {
      root.style.display = "none";
      return;
    }
    sessionStorage.setItem("preloader-shown", "1");
    root.style.display = "flex";

    // Hide page content during preloader
    const mainEl = document.getElementById("main-content");
    if (mainEl) mainEl.style.opacity = "0";

    // ── Initial states ─────────────────────────────────────
    gsap.set(line, { width: 0 });
    gsap.set(title, { opacity: 0 });
    gsap.set(subtitle, { opacity: 0 });

    // ── Timeline ───────────────────────────────────────────
    const tl = gsap.timeline({
      onComplete: () => {
        root.style.display = "none";
        root.style.zIndex = "-1";
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      },
    });
    tlRef.current = tl;

    // Line expands (faster)
    tl.to(line, { width: 192, duration: 0.8, ease: "power2.inOut" }, 0.1);

    // Title fades in
    tl.to(title, { opacity: 1, duration: 0.4, ease: "power3.out" }, 0.2);

    // Subtitle fades in
    tl.to(subtitle, { opacity: 1, duration: 0.4, ease: "power3.out" }, 0.3);

    // Everything fades out
    tl.to([title, subtitle, line], { opacity: 0, duration: 0.3, ease: "power2.in" }, 1.2);

    // Reveal page content just before overlay slides away
    tl.call(() => {
      if (mainEl) {
        mainEl.style.transition = "none";
        mainEl.style.opacity = "1";
      }
    }, [], 1.3);

    // Overlay slides up
    tl.to(root, { yPercent: -100, duration: 0.5, ease: "power3.inOut" }, 1.4);

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center pointer-events-none"
      style={{ display: "none" }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Title — above line */}
        <span
          ref={titleRef}
          className="font-display text-xl uppercase tracking-[0.3em] text-foreground pb-1"
        >
          EXOVIO
        </span>

        {/* Expanding line */}
        <div
          ref={lineRef}
          className="h-px bg-foreground/40"
          style={{ width: 0 }}
        />

        {/* Subtitle — below line */}
        <span
          ref={subtitleRef}
          className="font-body text-xs uppercase tracking-[0.15em] text-muted pt-1"
        >
          Beyond Digital Vision
        </span>
      </div>
    </div>
  );
}
