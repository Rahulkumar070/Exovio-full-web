"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressFill = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const topLeftRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const hasRunRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;
    if (!containerRef.current) return;

    // ── Bulletproof scroll lock (position:fixed beats trackpad momentum) ──
    let savedScrollY = 0;

    const lockScroll = () => {
      savedScrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${savedScrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    };

    const unlockScroll = () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, savedScrollY);
    };

    lockScroll();

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      gsap.set(containerRef.current, { autoAlpha: 0 });
      unlockScroll();
      onCompleteRef.current();
      return;
    }

    // Initial states — GSAP owns all transforms
    gsap.set(topLeftRef.current, { opacity: 0, y: 6 });
    gsap.set(topRightRef.current, { opacity: 0, y: 6 });
    gsap.set(bottomRef.current, { opacity: 0 });
    gsap.set(taglineRef.current, { opacity: 0, y: 8 });

    const proxy = { val: 0 };

    const tl = gsap.timeline({
      onComplete() {
        unlockScroll();
        onCompleteRef.current();
        if (containerRef.current) containerRef.current.style.display = "none";
      },
    });

    // ── Phase 1: Corner labels slip in ──────────────────────────────────
    tl.to(
      [topLeftRef.current, topRightRef.current, bottomRef.current],
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" },
      0,
    );

    // ── Phase 2: Counter + clip-path + progress bar — all in perfect sync ─
    // The KEY technique: proxy.val drives BOTH counter text AND word clip-path
    // At val=0  → clipPath: inset(0 100% 0 0)  = word fully hidden
    // At val=100 → clipPath: inset(0 0%   0 0)  = word fully visible
    tl.to(
      proxy,
      {
        val: 100,
        duration: 2.6,
        ease: "power2.inOut",
        onUpdate() {
          const v = proxy.val;

          if (counterRef.current)
            counterRef.current.textContent = String(Math.floor(v)).padStart(
              2,
              "0",
            );

          if (wordRef.current)
            wordRef.current.style.clipPath = `inset(0 ${(100 - v).toFixed(2)}% 0 0)`;
        },
      },
      0.15,
    );

    tl.fromTo(
      progressFill.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 2.6,
        ease: "power2.inOut",
        transformOrigin: "left center",
      },
      0.15,
    );

    // ── Phase 3: Tagline slips up at ~70% load ───────────────────────────
    tl.to(
      taglineRef.current,
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      1.9,
    );

    // ── Hold on 100 ──────────────────────────────────────────────────────
    tl.to({}, { duration: 0.45 });

    // ── Phase 4: Full panel lifts off ────────────────────────────────────
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1.0,
      ease: "power4.inOut",
    });

    return () => {
      unlockScroll();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[300] bg-background overflow-hidden flex flex-col justify-between"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    >
      {/* ── Top bar ── */}
      <div className="flex items-start justify-between px-8 pt-8 md:px-14 md:pt-12">
        <div ref={topLeftRef} className="flex flex-col gap-1.5">
          <span
            className="font-display font-bold text-foreground uppercase"
            style={{
              fontSize: "clamp(0.55rem, 1.1vw, 0.75rem)",
              letterSpacing: "0.3em",
            }}
          >
            EXOVIO®
          </span>
          <span
            className="font-mono text-foreground/30 uppercase"
            style={{
              fontSize: "clamp(0.28rem, 0.58vw, 0.38rem)",
              letterSpacing: "0.4em",
            }}
          >
            Web Design &amp; Development
          </span>
        </div>

        <div ref={topRightRef} className="flex flex-col items-end gap-1.5">
          <span
            className="font-mono text-foreground/30 uppercase"
            style={{
              fontSize: "clamp(0.28rem, 0.58vw, 0.38rem)",
              letterSpacing: "0.4em",
            }}
          >
            Est. 2024
          </span>
          <span
            className="font-mono text-foreground/30 uppercase"
            style={{
              fontSize: "clamp(0.28rem, 0.58vw, 0.38rem)",
              letterSpacing: "0.4em",
            }}
          >
            Nashik, IN
          </span>
        </div>
      </div>

      {/* ── Hero: massive brand name + tagline ── */}
      <div className="px-8 md:px-14 flex flex-col gap-6">
        {/*
          The star of the show.
          clip-path is updated every frame by the GSAP proxy.
          At 0% load = fully hidden. At 100% load = fully visible.
          The word literally paints itself onto the screen.
        */}
        <div
          ref={wordRef}
          className="font-display font-bold text-foreground uppercase leading-none select-none"
          style={{
            fontSize: "clamp(4.5rem, 15vw, 13rem)",
            letterSpacing: "-0.02em",
            clipPath: "inset(0 100% 0 0)", // GSAP updates this every frame
          }}
        >
          EXOVIO
        </div>

        <p
          ref={taglineRef}
          className="font-mono text-foreground/35 uppercase"
          style={{
            fontSize: "clamp(0.38rem, 0.82vw, 0.52rem)",
            letterSpacing: "0.52em",
          }}
        >
          Building tomorrow's brands, today.
        </p>
      </div>

      {/* ── Bottom: progress line + counter ── */}
      <div
        ref={bottomRef}
        className="px-8 pb-8 md:px-14 md:pb-10 flex flex-col gap-5"
      >
        {/* Progress track */}
        <div
          className="relative overflow-hidden bg-foreground/10"
          style={{ height: "1px" }}
        >
          <div
            ref={progressFill}
            className="absolute inset-0 bg-foreground/60"
            style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
          />
        </div>

        {/* Counter row */}
        <div className="flex items-end justify-between">
          <div className="flex items-baseline gap-1">
            <span
              ref={counterRef}
              className="font-display font-bold text-foreground tabular-nums leading-none"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              00
            </span>
            <span
              className="font-mono text-foreground/30"
              style={{ fontSize: "clamp(0.55rem, 1.1vw, 0.75rem)" }}
            >
              %
            </span>
          </div>

          <span
            className="font-mono text-foreground/20 uppercase"
            style={{
              fontSize: "clamp(0.28rem, 0.58vw, 0.38rem)",
              letterSpacing: "0.4em",
            }}
          >
            Loading experience
          </span>
        </div>
      </div>
    </div>
  );
}
