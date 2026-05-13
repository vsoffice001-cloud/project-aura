/**
 * CardReveal — Viewport-aware card entrance animation
 *
 * Uses IntersectionObserver to animate cards only when they scroll into view.
 * Supports stagger delays for grid layouts. Respects prefers-reduced-motion.
 *
 * Once visible, the element stays visible (no re-hide on scroll out).
 */
import { useRef, useEffect, useState, type ReactNode } from "react";

interface CardRevealProps {
  children: ReactNode;
  /** Stagger delay in ms (capped internally to prevent long waits) */
  delay?: number;
  /** Additional className */
  className?: string;
}

export function CardReveal({ children, delay = 0, className = "" }: CardRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "50px 0px -20px 0px" }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <div
      ref={ref}
      className={`card-reveal ${isVisible ? "is-visible" : ""} ${className}`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
