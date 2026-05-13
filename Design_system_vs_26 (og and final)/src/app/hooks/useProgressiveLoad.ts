/**
 * useProgressiveLoad — Hook (DS v4.3)
 *
 * WHAT: IntersectionObserver-based progressive/infinite loading.
 * WHY:  Provides a sentinel-based "load more" pattern without manual
 *       pagination buttons. Used by CardListing and LoadMoreSentinel.
 * WHEN: Any list/grid that reveals more items as user scrolls down.
 * HOW:  Returns a ref to attach to a sentinel element, plus `visibleCount`
 *       (how many items to show) and `hasMore` (whether there are more).
 *       Each time the sentinel enters the viewport, `visibleCount` grows
 *       by `batchSize`.
 *
 * USAGE:
 *   const { sentinelRef, visibleCount, hasMore } = useProgressiveLoad(items.length, 6);
 *   const visible = items.slice(0, visibleCount);
 *   // ... render visible items ...
 *   {hasMore && <div ref={sentinelRef} />}
 */
import { useState, useEffect, useRef, useCallback } from 'react';

interface ProgressiveLoadResult {
  /** Ref to attach to the sentinel element at the bottom of the list */
  sentinelRef: React.RefObject<HTMLDivElement | null>;
  /** Number of items currently visible */
  visibleCount: number;
  /** Whether there are more items to load */
  hasMore: boolean;
  /** Reset visible count back to initial batch */
  reset: () => void;
}

export function useProgressiveLoad(
  /** Total number of items available */
  totalItems: number,
  /** Number of items to load per batch */
  batchSize: number = 6,
  /** IntersectionObserver rootMargin — how far ahead to trigger */
  rootMargin: string = '200px'
): ProgressiveLoadResult {
  const [visibleCount, setVisibleCount] = useState(batchSize);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const hasMore = visibleCount < totalItems;

  const reset = useCallback(() => {
    setVisibleCount(batchSize);
  }, [batchSize]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount(prev => Math.min(prev + batchSize, totalItems));
        }
      },
      { rootMargin }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, batchSize, totalItems, rootMargin]);

  // Reset when total changes significantly (e.g. filter applied)
  useEffect(() => {
    setVisibleCount(batchSize);
  }, [totalItems, batchSize]);

  return { sentinelRef, visibleCount, hasMore, reset };
}
