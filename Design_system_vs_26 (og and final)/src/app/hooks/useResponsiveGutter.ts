import { useState, useEffect } from 'react';

/**
 * useResponsiveGutter Hook
 * 
 * Returns responsive gutter value for Masonry grids and card layouts.
 * 
 * WHY: Masonry grids need pixel-based gutters (not CSS classes), and
 * mobile needs tighter spacing than desktop for content density.
 * 
 * WHAT:
 * - Mobile (< 640px):  24px gutter
 * - Desktop (>= 640px): 32px gutter
 * 
 * WHEN: Use in any Masonry/grid layout that needs responsive spacing
 * via pixel values (e.g., react-responsive-masonry).
 * 
 * WHEN NOT: Don't use for standard Tailwind gap classes — those are
 * already responsive via breakpoints.
 */
export function useResponsiveGutter(): number {
  const [gutter, setGutter] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 640 ? 32 : 24;
    }
    return 32;
  });

  useEffect(() => {
    const handleResize = () => {
      setGutter(window.innerWidth >= 640 ? 32 : 24);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return gutter;
}
