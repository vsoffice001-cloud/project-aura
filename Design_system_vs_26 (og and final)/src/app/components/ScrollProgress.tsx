/**
 * Scroll Progress Indicator (Generic)
 * 
 * A 3px bar fixed to the top of the viewport that fills left-to-right
 * as the user scrolls through the page. Uses brand red (5% tier).
 * 
 * This is the GENERIC version — works on any page based on total
 * document scroll. For the case-study-specific version that uses
 * useSectionProgress + useHeroVisibility, see ReadingProgressBar.tsx.
 * 
 * Color: bg-[var(--brand-red)] — engagement signal, not purely utility
 * Z-index: 9999 — above everything including the sticky navbar
 * 
 * @example
 * ```tsx
 * <ScrollProgress />
 * ```
 */

import { useState, useEffect } from 'react';

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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[9999]">
      <div
        className="h-full bg-[var(--brand-red)] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
