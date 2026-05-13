'use client';
import { useEffect, useRef, useState } from 'react';

const DEFAULT_THRESHOLD = 2; // PRD §22 "First two premium interactions"

function readFromStorage(key: string): number {
  if (typeof window === 'undefined') return 0;
  try {
    const stored = sessionStorage.getItem(`meter-${key}`);
    return stored ? parseInt(stored, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

export function useMeter(key: string, threshold = DEFAULT_THRESHOLD) {
  // Lazy initializer reads sessionStorage on first render (client only)
  const [count, setCount] = useState<number>(() => readFromStorage(key));

  // Track whether this is the first render to skip initial re-sync
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // key changed after mount — re-sync from storage
    setCount(readFromStorage(key));
  }, [key]); // only re-sync on key change — isFirstRender ref prevents running on mount

  const increment = () => {
    setCount((prev) => {
      const next = prev + 1;
      try {
        sessionStorage.setItem(`meter-${key}`, String(next));
      } catch {
        // sessionStorage unavailable — silently skip
      }
      return next;
    });
  };

  return { count, threshold, exceeded: count >= threshold, increment };
}
