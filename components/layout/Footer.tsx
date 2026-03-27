"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransitionLink from "./TransitionLink";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  useLayoutEffect(() => {
    if (contentRef.current) gsap.set(contentRef.current, { opacity: 0, y: 20 });
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      gsap.set(contentRef.current, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      ScrollTrigger.create({
        trigger: wordmarkRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          if (wordmarkRef.current) {
            gsap.set(wordmarkRef.current, {
              scale: 0.92 + self.progress * 0.08,
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="border-t border-border bg-background overflow-hidden"
    >
      <div ref={contentRef} className="px-[2.8rem] pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-16">
          {/* Brand */}
          <div>
            <TransitionLink
              href="/"
              className="font-display font-bold text-[.82rem] tracking-[.22em] uppercase text-foreground block mb-6"
            >
              EXOVIO®
            </TransitionLink>

            <p className="font-body text-[.82rem] text-muted font-light leading-[1.9] max-w-[220px] mb-8">
              A design-led digital agency crafting experiences from vision to
              reality.
            </p>

            <div className="space-y-2">
              <p className="font-body text-[.75rem] text-muted">New Business</p>
              <a
                href="mailto:hello@exovio.agency"
                className="font-body text-[.82rem] text-foreground hover:opacity-60 transition-opacity duration-300 border-b border-foreground pb-px"
              >
                hello@exovio.agency
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-body text-[.68rem] text-muted uppercase tracking-[.15em] mb-5">
              Navigation
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <TransitionLink
                    href={href}
                    className="font-body text-[.82rem] text-muted hover:text-foreground transition-colors duration-300"
                  >
                    {label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="font-body text-[.68rem] text-muted uppercase tracking-[.15em] mb-5">
              Legal
            </p>
            <ul className="space-y-3">
              {LEGAL_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="font-body text-[.82rem] text-muted hover:text-foreground transition-colors duration-300"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div>
            <p className="font-body text-[.68rem] text-muted uppercase tracking-[.15em] mb-5">
              Location
            </p>

            <p className="font-body text-[.82rem] text-muted leading-[1.8]">
              Nagpur — India
              <br />
              {time && <span className="text-foreground">{time} IST</span>}
            </p>

            <div className="flex gap-5 mt-8">
              {["Instagram", "Twitter", "LinkedIn"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="font-body text-[.72rem] text-muted hover:text-foreground transition-colors duration-300"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-border pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <p className="font-body text-[.82rem] text-muted font-light">
              Sign up for our newsletter.{" "}
              <em className="font-serif not-italic text-foreground">
                Infrequent. Worth it.
              </em>
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Email:"
                className="flex-1 bg-transparent border border-border px-4 py-3 font-body text-[.82rem] text-foreground placeholder:text-muted focus:outline-none focus:border-foreground/40 transition-colors duration-300"
              />
              <button className="border border-l-0 border-border px-6 py-3 font-body text-[.75rem] text-muted hover:bg-surface hover:text-foreground transition-all duration-300">
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Giant wordmark */}
      <div ref={wordmarkRef} className="w-full overflow-hidden">
        <div className="px-[1.5rem] pb-[1rem]">
          <div
            className="font-display font-bold uppercase text-foreground/[0.06] select-none leading-none"
            style={{
              fontSize: "clamp(4rem,20vw,18rem)",
              letterSpacing: "-0.03em",
              lineHeight: 0.85,
            }}
          >
            EXOVIO
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-[2.8rem] py-5 border-t border-border flex justify-between items-center">
        <span className="font-body text-[.68rem] text-muted">
          © {new Date().getFullYear()} Exovio. All rights reserved.
        </span>
        <span className="font-body text-[.68rem] text-muted">13 — 25</span>
      </div>
    </footer>
  );
}
