"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import TransitionLink from "./TransitionLink";
import Link from "next/link";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

interface NavbarProps {
  /** Pass false only when a preloader controls visibility (homepage). Defaults true. */
  isLoaded?: boolean;
  onMenuOpen: () => void;
}

export default function Navbar({ isLoaded = true, onMenuOpen }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);

  // Set initial hidden state synchronously before first paint
  useLayoutEffect(() => {
    if (navRef.current) {
      gsap.set(navRef.current, { opacity: 0, y: -10 });
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || !navRef.current) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      gsap.set(navRef.current, { opacity: 1, y: 0 });
    } else {
      gsap.to(navRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
      });
    }
  }, [isLoaded]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 grid grid-cols-2 px-[2.8rem] py-[1.8rem]"
    >
      <div className="flex items-center">
        <TransitionLink
          href="/"
          className="font-display font-bold text-[.82rem] tracking-[.22em] uppercase text-foreground"
        >
          EXOVIO®
        </TransitionLink>
      </div>

      <div className="flex items-center justify-end md:justify-between">
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <TransitionLink
              key={href}
              href={href}
              className="font-body text-[.82rem] font-normal tracking-[.02em] text-foreground relative group"
            >
              {label}
              <span className="absolute bottom-0 left-0 w-full h-px bg-foreground scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300" />
            </TransitionLink>
          ))}
        </div>

        <TransitionLink
          href="/contact"
          className="hidden md:block font-body text-[.82rem] font-normal text-foreground border-b border-b-[.5px] border-foreground hover:opacity-60 transition-opacity duration-300 pb-px"
        >
          Start a project
        </TransitionLink>

        <button
          className="md:hidden font-body text-[.82rem] font-normal text-foreground"
          onClick={onMenuOpen}
          aria-label="Open menu"
        >
          Menu
        </button>
      </div>
    </nav>
  );
}
