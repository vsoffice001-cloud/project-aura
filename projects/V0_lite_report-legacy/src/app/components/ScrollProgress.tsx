/**
 * Scroll Progress Indicator - Visual feedback for page scroll depth
 * 
 * Purpose: Improve UX with visual progress indicator
 * 
 * Color: bg-[var(--brand-red)] (5% brand tier)
 * Reasoning: Unlike ScrollToTop (which is a utility navigation aid using
 * black), the scroll progress bar serves as a persistent engagement signal
 * — it draws attention to how deep the user has scrolled, subtly encouraging
 * continued reading toward conversion CTAs at the bottom. Brand red is
 * appropriate because it visually connects the progress to the brand's
 * conversion intent. This is one of the few non-button uses of brand red
 * that fits within the 5% allocation.
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
