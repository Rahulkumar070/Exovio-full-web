'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Hide on touch devices (iPad, tablets, phones)
    const isTouchDevice = (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      /iPad|iPhone|iPod|Android|tablet|Tablet/i.test(navigator.userAgent) ||
      (navigator.userAgent.includes('Mac') && navigator.maxTouchPoints > 1)
    );
    if (isTouchDevice) {
      cursor.style.display = 'none';
      return;
    }

    // Keep cursor off-screen until first mouse move
    gsap.set(cursor, { x: -100, y: -100, xPercent: -50, yPercent: -50 });

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    const onEnterHoverable = () => {
      gsap.to(cursor, { scale: 2.5, duration: 0.3, ease: 'power3.out' });
    };

    const onLeaveHoverable = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power3.out' });
    };

    const addHoverListeners = (el: Element) => {
      el.addEventListener('mouseenter', onEnterHoverable);
      el.addEventListener('mouseleave', onLeaveHoverable);
    };

    const removeHoverListeners = (el: Element) => {
      el.removeEventListener('mouseenter', onEnterHoverable);
      el.removeEventListener('mouseleave', onLeaveHoverable);
    };

    // Observe DOM for dynamically added hoverables
    const attachToHoverables = () => {
      document
        .querySelectorAll('a, button, [data-cursor-hover]')
        .forEach(addHoverListeners);
    };

    const observer = new MutationObserver(attachToHoverables);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMove);
    attachToHoverables();

    return () => {
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
      document
        .querySelectorAll('a, button, [data-cursor-hover]')
        .forEach(removeHoverListeners);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[9999] pointer-events-none size-8 rounded-full bg-white"
      style={{ mixBlendMode: 'difference' }}
    />
  );
}
