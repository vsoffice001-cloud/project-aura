/**
 * useMountTransition — Hook (DS v4.3)
 *
 * WHAT: Manages mount/unmount lifecycle with CSS transition support.
 * WHY:  Allows components (sheets, modals, overlays) to animate in/out
 *       without being yanked from the DOM mid-transition.
 * WHEN: MobileFilterSheet, ContactModal, any overlay that fades/slides.
 * HOW:  Returns `shouldRender` (controls DOM presence) and `isTransitioning`
 *       (controls CSS class for animation state). The component stays
 *       mounted long enough for the exit animation to complete.
 *
 * USAGE:
 *   const { shouldRender, isTransitioning } = useMountTransition(isOpen, 300);
 *   if (!shouldRender) return null;
 *   return <div className={isTransitioning ? 'opacity-100' : 'opacity-0'} />
 */
import { useState, useEffect } from 'react';

interface MountTransitionResult {
  /** Whether the component should be in the DOM */
  shouldRender: boolean;
  /** Whether the transition is in the "entered" state (true = visible) */
  isTransitioning: boolean;
}

export function useMountTransition(
  /** Whether the component is logically open */
  isOpen: boolean,
  /** Duration of the transition in ms (must match CSS transition-duration) */
  duration: number = 300
): MountTransitionResult {
  const [shouldRender, setShouldRender] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Mount first, then trigger transition on next frame
      setShouldRender(true);
      const enterFrame = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
      return () => cancelAnimationFrame(enterFrame);
    } else {
      // Start exit transition, then unmount after duration
      setIsTransitioning(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration]);

  return { shouldRender, isTransitioning };
}
