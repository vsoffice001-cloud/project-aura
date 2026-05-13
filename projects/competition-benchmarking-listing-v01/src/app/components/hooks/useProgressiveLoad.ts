/**
 * useProgressiveLoad — Hook
 * Ken Bold DS v4.2
 *
 * WHAT:    Manages progressive/infinite scroll loading for lists
 * WHY:     Avoids rendering 1000+ cards at once — loads in batches via IntersectionObserver
 * WHERE:   Any listing page with large datasets (Report Store, Search Results, etc.)
 * WHEN:    Called when user scrolls to sentinel element near bottom of visible items
 * HOW:     IntersectionObserver watches a sentinel div; triggers batch load with simulated delay
 *
 * Returns: { visibleItems, hasMore, isLoadingMore, sentinelRef, visibleCount }
 */
import { useState, useCallback, useEffect, useRef, useMemo } from "react";

interface UseProgressiveLoadOptions {
  /** Number of items to show initially */
  initialCount?: number;
  /** Number of items to add per load-more trigger */
  loadMoreCount?: number;
  /** IntersectionObserver rootMargin */
  rootMargin?: string;
  /** Simulated loading delay in ms (for skeleton UX) */
  loadDelay?: number;
}

export function useProgressiveLoad<T>(
  items: T[],
  options: UseProgressiveLoadOptions = {}
) {
  const {
    initialCount = 12,
    loadMoreCount = 20,
    rootMargin = "200px",
    loadDelay = 350,
  } = options;

  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const visibleItems = useMemo(
    () => items.slice(0, visibleCount),
    [items, visibleCount]
  );

  const hasMore = visibleCount < items.length;

  /** Reset visible count when items array changes (e.g., filter change) */
  const resetRef = useRef(items.length);
  useEffect(() => {
    if (resetRef.current !== items.length) {
      resetRef.current = items.length;
      setVisibleCount(initialCount);
    }
  }, [items.length, initialCount]);

  const handleLoadMore = useCallback(() => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + loadMoreCount, items.length));
      setIsLoadingMore(false);
    }, loadDelay);
  }, [items.length, isLoadingMore, loadMoreCount, loadDelay]);

  /* IntersectionObserver for sentinel */
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          handleLoadMore();
        }
      },
      { rootMargin }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, handleLoadMore, rootMargin]);

  return {
    visibleItems,
    hasMore,
    isLoadingMore,
    sentinelRef,
    visibleCount,
    resetVisibleCount: () => setVisibleCount(initialCount),
  };
}
