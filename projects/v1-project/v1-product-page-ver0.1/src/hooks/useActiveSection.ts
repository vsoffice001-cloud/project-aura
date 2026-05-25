'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Scroll-spy hook for TOC rail.
 * Observes section elements by ID and returns the active section ID.
 */
export function useActiveSection(sectionIds: string[], offset = 120): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '');
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
          return;
        }
      }
    },
    [],
  );

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: `-${offset}px 0px -60% 0px`,
      threshold: 0,
    });

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sectionIds, offset, handleIntersect]);

  return activeId;
}
