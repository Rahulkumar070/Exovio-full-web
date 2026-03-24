"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const imageRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in animation
      itemRefs.current.forEach((el, i) => {
        if (!el) return;

        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          },
        );
      });

      // 🔥 PARALLAX EFFECT
      imageRefs.current.forEach((el) => {
        if (!el) return;

        gsap.to(el, {
          y: "-15%",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-[1.6rem] md:px-[3rem] lg:px-[6rem] pt-24 md:pt-32 pb-24 md:pb-32 border-t border-border overflow-hidden"
    >
      {/* HEADER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
        <h2 className="text-[clamp(3rem,10vw,8rem)] leading-none text-foreground">
          Work
        </h2>

        <p className="text-muted max-w-md leading-[1.9]">
          Highlights of cases we passionately built with forward-thinking
          clients and friends.
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.6fr] gap-12 lg:gap-24">
        {/* LEFT PROJECT */}
        <div
          ref={(el) => {
            if (el) itemRefs.current[0] = el;
          }}
          className="space-y-5"
        >
          <div className="relative w-full aspect-[4/5] overflow-hidden">
            <div
              ref={(el) => {
                if (el) imageRefs.current[0] = el;
              }}
              className="absolute inset-0 scale-110"
            >
              <img
                src="/images/work1.jpg"
                alt="Luma Health"
                className="w-full h-full object-cover"
              />
            </div>

            <span className="absolute bottom-4 left-4 text-xs text-muted">
              2024
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-foreground">Luma Health</span>
            <span className="text-muted">Brand Identity & Web</span>
          </div>
        </div>

        {/* RIGHT PROJECT */}
        <div
          ref={(el) => {
            if (el) itemRefs.current[1] = el;
          }}
          className="space-y-6"
        >
          <p className="text-muted max-w-sm leading-[1.8]">
            Highlights of cases that we passionately built with forward-thinking
            clients and friends over the years.
          </p>

          <div className="relative w-full aspect-[16/10] overflow-hidden">
            <div
              ref={(el) => {
                if (el) imageRefs.current[1] = el;
              }}
              className="absolute inset-0 scale-110"
            >
              <img
                src="/images/work2.jpg"
                alt="Arc Systems"
                className="w-full h-full object-cover"
              />
            </div>

            <span className="absolute bottom-4 left-4 text-xs text-muted">
              2024
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-foreground">Arc Systems</span>
            <span className="text-muted">Digital Experience</span>
          </div>
        </div>
      </div>

      {/* SECOND ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-24">
        <div
          ref={(el) => {
            if (el) itemRefs.current[2] = el;
          }}
          className="relative w-full aspect-[4/5] overflow-hidden"
        >
          <div
            ref={(el) => {
              if (el) imageRefs.current[2] = el;
            }}
            className="absolute inset-0 scale-110"
          >
            <img
              src="/images/work3.jpg"
              alt="Project 3"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div
          ref={(el) => {
            if (el) itemRefs.current[3] = el;
          }}
          className="relative w-full aspect-[4/5] overflow-hidden"
        >
          <div
            ref={(el) => {
              if (el) imageRefs.current[3] = el;
            }}
            className="absolute inset-0 scale-110"
          >
            <img
              src="/images/work4.jpg"
              alt="Project 4"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
