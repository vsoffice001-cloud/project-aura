/**
 * useResponsiveGutter Hook
 * ========================
 * Returns responsive gutter spacing based on viewport width
 * Matches design system: 24px (mobile/tablet) → 32px (desktop at 768px+)
 */

import { useState, useEffect } from 'react';

export function useResponsiveGutter() {
  const [gutter, setGutter] = useState(24); // Default to mobile (number, not string)

  useEffect(() => {
    const updateGutter = () => {
      // Match design system breakpoint: md:gap-8 (32px) at 768px+
      if (window.innerWidth >= 768) {
        setGutter(32);
      } else {
        setGutter(24);
      }
    };

    // Set initial value
    updateGutter();

    // Listen for resize
    window.addEventListener('resize', updateGutter);
    return () => window.removeEventListener('resize', updateGutter);
  }, []);

  return gutter;
}