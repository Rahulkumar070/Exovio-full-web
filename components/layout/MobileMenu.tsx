'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import TransitionLink from '@/components/ui/TransitionLink';

const NAV_LINKS = [
  { num: '01', label: 'Work',     href: '/work' },
  { num: '02', label: 'Services', href: '/services' },
  { num: '03', label: 'About',    href: '/about' },
  { num: '04', label: 'Blog',     href: '/blog' },
  { num: '05', label: 'Contact',  href: '/contact' },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/hello.exovio/' },
  { label: 'X',         href: '#' },
  { label: 'Dribbble',  href: '#' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/exovio-ai/' },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef  = useRef<HTMLElement[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const tlRef     = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const links  = linksRef.current.filter(Boolean);
    const bottom = bottomRef.current;

    gsap.set(overlay, { clipPath: 'inset(0 0 100% 0)' });
    gsap.set(links,  { y: 60, opacity: 0 });
    gsap.set(bottom, { opacity: 0 });

    return () => { tlRef.current?.kill(); };
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const links  = linksRef.current.filter(Boolean);
    const bottom = bottomRef.current;

    tlRef.current?.kill();

    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.set(overlay, { display: 'flex' })
        .to(overlay, { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'power3.inOut' })
        .to(links,  { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.06 }, '-=0.3')
        .to(bottom, { opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.2');
    } else {
      document.body.style.overflow = '';

      const tl = gsap.timeline({
        onComplete: () => { gsap.set(overlay, { display: 'none' }); },
      });
      tlRef.current = tl;

      tl.to([bottom, ...links.slice().reverse()], {
          y: 30, opacity: 0, duration: 0.25, ease: 'power2.in', stagger: 0.03,
        })
        .to(overlay, { clipPath: 'inset(0 0 100% 0)', duration: 0.5, ease: 'power3.inOut' }, '-=0.1');
    }
  }, [isOpen]);

  useEffect(() => {
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleLinkClick = () => onClose();

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex-col justify-between"
      style={{
        display: 'none',
        backgroundColor: '#F5F0EB',
        clipPath: 'inset(0 0 100% 0)',
      }}
    >
      {/* Top row */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5">
        <Link
          href="/"
          data-cursor-hover
          onClick={handleLinkClick}
          className="font-display font-medium text-sm tracking-wide text-[#1A1A1A]"
        >
          Exovio
        </Link>
        <button
          data-cursor-hover
          onClick={onClose}
          className="text-sm tracking-wide text-[#8B8680] hover:text-[#1A1A1A] transition-colors duration-300"
        >
          Close
        </button>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 flex items-center px-6">
        <ul className="flex flex-col gap-2">
          {NAV_LINKS.map(({ num, label, href }, i) => (
            <li key={href}>
              <TransitionLink
                href={href}
                data-cursor-hover
                onClick={handleLinkClick}
                ref={(el) => { linksRef.current[i] = el as HTMLElement; }}
                className="group flex items-baseline gap-4 no-underline"
                style={{ textDecoration: 'none' }}
              >
                <span className="text-sm text-[#8B8680] font-mono tabular-nums w-6 shrink-0">
                  {num}
                </span>
                <span
                  className="font-display font-light text-[#1A1A1A] leading-tight group-hover:translate-x-3 group-hover:text-[#C17F59] transition-all duration-300"
                  style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' }}
                >
                  {label}
                </span>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom section */}
      <div ref={bottomRef} className="flex flex-col gap-3 px-6 pb-8">
        <a
          href="mailto:hello.exovio@gmail.com"
          data-cursor-hover
          className="text-sm text-[#8B8680] hover:text-[#1A1A1A] transition-colors duration-300"
        >
          hello.exovio@gmail.com
        </a>
        <div className="flex items-center gap-6">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              data-cursor-hover
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#8B8680] hover:text-[#1A1A1A] transition-colors duration-300"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
