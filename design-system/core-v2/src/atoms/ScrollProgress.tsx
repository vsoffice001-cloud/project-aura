'use client';

import { useState, useEffect } from 'react';

/**
 * ScrollProgress — fixed top progress bar (3px) tracking page scroll depth.
 *
 * Color: Ken brand red (5% tier exception — engagement signal, not CTA).
 * Reasoning: persistent reading-depth indicator subtly encourages continued
 * scrolling toward conversion CTAs at page bottom. Brand red visually
 * connects progress to conversion intent. Falls within 5% allocation.
 *
 * Mount once at root layout. Listens passive scroll events.
 *
 * @promotedFrom V0_lite_report
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[var(--z-index-sticky)] pointer-events-none">
      <div
        className="h-full bg-[var(--color-brand-red)] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
