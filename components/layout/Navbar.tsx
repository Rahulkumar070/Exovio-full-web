'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import TransitionLink from '@/components/ui/TransitionLink';
import MobileMenu from '@/components/layout/MobileMenu';

const NAV_LINKS = [
  { label: 'Work',     href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About',   href: '/about' },
  { label: 'Contact', href: '/contact' },
];

function LiveClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const format = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      return `${hh}:${mm}:${ss} IST`;
    };

    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span suppressHydrationWarning className="text-xs text-subtle tabular-nums hidden md:block select-none">
      {time}
    </span>
  );
}

function NavLink({ label, href }: { label: string; href: string }) {
  const lineRef = useRef<HTMLSpanElement>(null);

  const onEnter = () => {
    gsap.to(lineRef.current, { width: '100%', duration: 0.3, ease: 'power3.out', overwrite: true });
  };
  const onLeave = () => {
    gsap.to(lineRef.current, { width: '0%', duration: 0.2, ease: 'power2.out', overwrite: true });
  };

  return (
    <TransitionLink
      href={href}
      data-cursor-hover
      className="relative text-xs tracking-wide text-muted hover:text-foreground transition-colors duration-300 pb-0.5 no-underline"
      style={{ textDecoration: 'none' }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {label}
      <span
        ref={lineRef}
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px bg-foreground"
        style={{ width: '0%' }}
      />
    </TransitionLink>
  );
}

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Mount animation
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  // Scroll background
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
    <nav
      ref={navRef}
      className={[
        'fixed top-0 left-0 right-0 z-[998] flex items-center justify-between',
        'px-6 md:px-10 py-5 transition-all duration-500',
        scrolled ? 'bg-background/80 backdrop-blur-md' : 'bg-transparent',
        menuOpen ? 'invisible pointer-events-none' : 'visible',
      ].join(' ')}
    >
      {/* Left: Wordmark */}
      <TransitionLink
        href="/"
        data-cursor-hover
        className="font-display font-medium text-sm tracking-wide text-foreground"
      >
        Exovio
      </TransitionLink>

      {/* Center: Clock */}
      <LiveClock />

      {/* Right: Nav links (desktop) / Menu (mobile) */}
      <div className="flex items-center gap-6 md:gap-8">
        <div className="hidden md:flex items-center gap-6 md:gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </div>
        <button
          data-cursor-hover
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-xs tracking-wide text-muted hover:text-foreground transition-colors duration-300"
        >
          Menu
        </button>
      </div>
    </nav>

    <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
