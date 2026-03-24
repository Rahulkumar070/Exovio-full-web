"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: "01",
    title: "Brand Identity",
    tags: ["Logo", "Visual System", "Typography", "Color"],
    desc: "End-to-end brand systems crafted to communicate authority from first impression.",
    gradient: "linear-gradient(135deg, #0f1a0f 0%, #1a1a0a 50%, #0a1010 100%)",
  },
  {
    num: "02",
    title: "Web Design & Development",
    tags: ["Next.js", "GSAP", "Webflow", "Motion"],
    desc: "Pixel-perfect, animation-first websites that win awards and convert visitors into clients.",
    gradient: "linear-gradient(135deg, #0a0f1a 0%, #1a0f1a 50%, #0a1a1a 100%)",
  },
  {
    num: "03",
    title: "Digital Strategy",
    tags: ["Positioning", "Messaging", "SEO", "Analytics"],
    desc: "Data-informed creative direction that aligns business goals with design decisions.",
    gradient: "linear-gradient(135deg, #1a0a0a 0%, #0f0a1a 50%, #0a1510 100%)",
  },
  {
    num: "04",
    title: "Product Design",
    tags: ["UI/UX", "Prototyping", "Design Systems", "Figma"],
    desc: "Interfaces that feel inevitable — designed around how humans actually think and move.",
    gradient: "linear-gradient(135deg, #100a1a 0%, #0a1510 50%, #1a1505 100%)",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]); // ✅ fixed type

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
            delay: i * 0.1,
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!previewRef.current) return;

    gsap.to(previewRef.current, {
      opacity: active !== null ? 1 : 0,
      scale: active !== null ? 1 : 0.95,
      duration: 0.4,
    });
  }, [active]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!previewRef.current) return;
    const rect = sectionRef.current!.getBoundingClientRect();
    gsap.to(previewRef.current, {
      left: e.clientX - rect.left,
      top: e.clientY - rect.top,
      duration: 0.5,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative px-[1.6rem] md:px-[3.5rem] lg:px-[6rem] pt-24 md:pt-32 pb-24 md:pb-32 border-t border-border overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Floating preview */}
      <div
        ref={previewRef}
        className="hidden lg:block absolute pointer-events-none z-20 w-[300px] h-[200px] rounded-lg overflow-hidden"
        style={{ opacity: 0, transform: "translate(-50%, -50%) scale(0.95)" }}
      >
        <div
          className="w-full h-full blur-[40px] opacity-70"
          style={{
            background:
              active !== null ? SERVICES[active].gradient : "transparent",
          }}
        />
      </div>

      {/* Header */}
      <div className="grid md:grid-cols-2 gap-10 mb-20">
        <span className="text-[.7rem] text-muted uppercase tracking-[.2em]">
          What we do
        </span>

        <p className="text-[.95rem] text-muted leading-[1.9] max-w-lg">
          Four practice areas. One obsession: making your brand impossible to
          ignore.
        </p>
      </div>

      {/* Services */}
      <div className="divide-y divide-border">
        {SERVICES.map((s, i) => (
          <div
            key={s.num}
            ref={(el) => {
              itemRefs.current[i] = el;
            }} // ✅ fixed
            className="group py-10 md:py-14 opacity-0"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            {/* MOBILE */}
            <div className="md:hidden space-y-5">
              <span className="text-[.7rem] text-muted">{s.num}</span>

              <h3 className="text-[1.6rem] text-foreground">{s.title}</h3>

              <p className="text-[.85rem] text-muted">{s.desc}</p>

              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span key={tag} className="text-[.68rem] border px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-end">
                <div className="w-9 h-9 border rounded-full flex items-center justify-center">
                  ↗
                </div>
              </div>
            </div>

            {/* DESKTOP */}
            <div className="hidden md:grid grid-cols-[4rem_2fr_1.5fr_auto] items-center gap-12">
              {/* Number */}
              <span className="text-[.7rem] text-muted">{s.num}</span>

              {/* Title + tags */}
              <div className="transition-all duration-300 group-hover:translate-x-2">
                <h3 className="text-[clamp(1.6rem,2.5vw,2.4rem)] text-foreground leading-tight">
                  {s.title}
                </h3>

                <div className="flex gap-2 mt-4 flex-wrap">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[.7rem] text-muted border px-3 py-1 hover:bg-foreground hover:text-background transition"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-[.9rem] text-muted leading-[1.9] max-w-md transition-all duration-300 group-hover:translate-x-2">
                {s.desc}
              </p>

              {/* Arrow */}
              <div className="flex justify-end">
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all duration-300 group-hover:bg-foreground group-hover:scale-110">
                  <span className="text-muted group-hover:text-background transition">
                    ↗
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
