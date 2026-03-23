'use client';

import { useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';

interface HoverImageRevealProps {
  children: React.ReactNode;
  images: string[];
  className?: string;
}

const MAX_TRAIL = 8;
const SPAWN_INTERVAL_MS = 120;
const IMG_W = 180;
const IMG_H = 120;

export default function HoverImageReveal({ children, images, className }: HoverImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const imageIndexRef = useRef(0);
  const isHovering = useRef(false);
  const lastSpawnTime = useRef(0);
  const rafId = useRef<number | null>(null);
  const cursorPos = useRef({ x: 0, y: 0 });

  const spawnImage = useCallback((x: number, y: number) => {
    const container = containerRef.current;
    if (!container || images.length === 0) return;

    // Remove oldest if at cap
    if (trailRefs.current.length >= MAX_TRAIL) {
      const oldest = trailRefs.current.shift();
      oldest?.remove();
    }

    const el = document.createElement('div');
    const rotation = (Math.random() * 6 - 3).toFixed(2);
    const src = images[imageIndexRef.current % images.length];
    imageIndexRef.current++;

    el.style.cssText = `
      position: absolute;
      width: ${IMG_W}px;
      height: ${IMG_H}px;
      left: ${x - IMG_W / 2}px;
      top: ${y - IMG_H / 2}px;
      transform: rotate(${rotation}deg);
      pointer-events: none;
      z-index: 10;
      overflow: hidden;
      border-radius: 2px;
    `;

    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.style.cssText = 'width: 100%; height: 100%; object-fit: cover; display: block;';
    el.appendChild(img);
    container.appendChild(el);
    trailRefs.current.push(el);

    // Fade out and remove
    gsap.fromTo(
      el,
      { opacity: 1 },
      {
        opacity: 0,
        duration: 2,
        ease: 'power2.out',
        onComplete: () => {
          el.remove();
          const idx = trailRefs.current.indexOf(el);
          if (idx !== -1) trailRefs.current.splice(idx, 1);
        },
      }
    );
  }, [images]);

  const tickRef = useRef<FrameRequestCallback | null>(null);

  useEffect(() => {
    tickRef.current = (timestamp: number) => {
      if (!isHovering.current) return;
      if (timestamp - lastSpawnTime.current >= SPAWN_INTERVAL_MS) {
        lastSpawnTime.current = timestamp;
        spawnImage(cursorPos.current.x, cursorPos.current.y);
      }
      rafId.current = requestAnimationFrame(tickRef.current!);
    };
  }, [spawnImage]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    cursorPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const onMouseEnter = useCallback(() => {
    isHovering.current = true;
    if (tickRef.current) rafId.current = requestAnimationFrame(tickRef.current);
  }, []);

  const onMouseLeave = useCallback(() => {
    isHovering.current = false;
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      // Kill all lingering trail images
      trailRefs.current.forEach((el) => {
        gsap.killTweensOf(el);
        el.remove();
      });
      trailRefs.current = [];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative ${className ?? ''}`}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative z-20">{children}</div>
    </div>
  );
}
