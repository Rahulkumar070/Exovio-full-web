"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import TransitionLink from "./TransitionLink";

const MENU_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLSpanElement[]>([]);
  const didOpen = useRef(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (isOpen) {
      didOpen.current = true;
      document.body.style.overflow = "hidden";
      gsap.set(overlay, { display: "flex" });

      if (reduced) {
        gsap.set(overlay, { clipPath: "inset(0 0 0% 0)" });
        gsap.set(itemsRef.current, { y: 0, opacity: 1 });
      } else {
        gsap.fromTo(
          overlay,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.65, ease: "power4.inOut" },
        );
        gsap.fromTo(
          itemsRef.current,
          { y: "110%", opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.07,
            ease: "power3.out",
            delay: 0.3,
          },
        );
      }
    } else if (didOpen.current) {
      document.body.style.overflow = "";

      if (reduced) {
        gsap.set(overlay, { display: "none" });
      } else {
        gsap.to(overlay, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.55,
          ease: "power4.inOut",
          onComplete: () => {
            gsap.set(overlay, { display: "none" });
          },
        });
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-background flex-col px-[2.8rem] py-[1.8rem]"
      style={{ clipPath: "inset(0 0 100% 0)", display: "none" }}
    >
      <div className="grid grid-cols-2">
        <span className="font-display font-bold text-[.82rem] tracking-[.22em] uppercase text-foreground">
          EXOVIO®
        </span>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="font-body text-[.82rem] font-normal text-foreground"
            aria-label="Close menu"
          >
            Close
          </button>
        </div>
      </div>

      <nav className="flex-1 flex items-center">
        <ul className="space-y-2">
          {MENU_ITEMS.map(({ label, href }, i) => (
            <li key={href} className="overflow-hidden">
              <TransitionLink
                href={href}
                onClick={onClose}
                className="block font-display text-[clamp(2.5rem,8vw,4rem)] font-light text-foreground hover:text-muted transition-colors duration-300"
              >
                <span
                  ref={(el) => {
                    if (el) itemsRef.current[i] = el;
                  }}
                  className="block"
                  style={{ transform: "translateY(110%)", opacity: 0 }}
                >
                  {label}
                </span>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-end justify-between pt-6 border-t border-border">
        <TransitionLink
          href="/contact"
          onClick={onClose}
          className="font-body text-[.82rem] text-muted hover:text-foreground transition-colors duration-300"
        >
          Start a project →
        </TransitionLink>
        <div className="flex gap-6">
          {["Instagram", "Twitter/X", "LinkedIn"].map((s) => (
            <a
              key={s}
              href="#"
              className="font-body text-[.75rem] text-muted hover:text-foreground transition-colors duration-300"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
