/**
 * useCrossfade — Hook (DS v4.3)
 *
 * WHAT: Manages crossfade transitions between content swaps.
 * WHY:  When switching between view modes (grid ↔ list), filter results,
 *       or paginated content, a crossfade prevents jarring layout shifts.
 * WHEN: CardListing view mode transitions, paginated content transitions.
 * HOW:  Returns an opacity value (0 or 1) and a trigger function.
 *       Call `triggerCrossfade()` before changing content — it fades out,
 *       waits for the callback, then fades back in.
 *
 * USAGE:
 *   const { opacity, triggerCrossfade } = useCrossfade(200);
 *   const handleViewChange = (mode: ViewMode) => {
 *     triggerCrossfade(() => setViewMode(mode));
 *   };
 *   <div style={{ opacity, transition: 'opacity 200ms ease' }}>
 *     {content}
 *   </div>
 */
import { useState, useCallback, useRef } from 'react';

interface CrossfadeResult {
  /** Current opacity value (0 or 1) */
  opacity: number;
  /** Whether a crossfade is currently in progress */
  isFading: boolean;
  /** Trigger a crossfade — calls `onChange` at the midpoint (opacity = 0) */
  triggerCrossfade: (onChange: () => void) => void;
}

export function useCrossfade(
  /** Duration of each half of the crossfade in ms */
  halfDuration: number = 200
): CrossfadeResult {
  const [opacity, setOpacity] = useState(1);
  const [isFading, setIsFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerCrossfade = useCallback((onChange: () => void) => {
    // Cancel any in-flight crossfade
    if (timerRef.current) clearTimeout(timerRef.current);

    setIsFading(true);
    setOpacity(0);

    timerRef.current = setTimeout(() => {
      // Midpoint: apply the content change
      onChange();

      // Small frame delay to let React render new content
      requestAnimationFrame(() => {
        setOpacity(1);
        timerRef.current = setTimeout(() => {
          setIsFading(false);
        }, halfDuration);
      });
    }, halfDuration);
  }, [halfDuration]);

  return { opacity, isFading, triggerCrossfade };
}
