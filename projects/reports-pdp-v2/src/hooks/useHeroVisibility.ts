'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Returns true when the hero section is NOT visible (user has scrolled past it).
 * Used to show/hide ReadingProgressBar and StickyCTA.
 */
export function useHeroVisibility(heroId = 'pdp-hero'): boolean {
  const [heroPassed, setHeroPassed] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    if (!hero) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setHeroPassed(!entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observerRef.current.observe(hero);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [heroId]);

  return heroPassed;
}
