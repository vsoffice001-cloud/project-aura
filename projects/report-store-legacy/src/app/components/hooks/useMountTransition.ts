/**
 * useMountTransition — Hook
 * Ken Bold DS v4.2
 *
 * WHAT:    Manages mount/unmount lifecycle with CSS transition support
 * WHY:     Enables smooth enter/exit animations for elements that mount/unmount
 *          (e.g., banner that appears when filters are active, then slides away when cleared)
 * WHERE:   Any component that conditionally renders with animation (banners, toasts, modals)
 * WHEN:    On `show` prop change — mounts immediately, animates in on next frame;
 *          on hide — animates out, unmounts after transition completes
 * HOW:     Uses double-rAF for mount-then-animate pattern + setTimeout for unmount delay
 *
 * Returns: { mounted, visible, transitionStyle }
 */
import { useState, useEffect } from "react";

interface UseMountTransitionOptions {
  /** Duration of exit animation in ms (unmount delay) */
  exitDuration?: number;
}

export function useMountTransition(
  show: boolean,
  options: UseMountTransitionOptions = {}
) {
  const { exitDuration = 250 } = options;

  const [mounted, setMounted] = useState(show);
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setMounted(true);
      // Allow mount frame, then animate in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      // Unmount after animation completes
      const timer = setTimeout(() => setMounted(false), exitDuration);
      return () => clearTimeout(timer);
    }
  }, [show, exitDuration]);

  const transitionStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(-6px)",
    maxHeight: visible ? "500px" : "0px",
    overflow: "hidden" as const,
    transition: `opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1)`,
  };

  return { mounted, visible, transitionStyle };
}
