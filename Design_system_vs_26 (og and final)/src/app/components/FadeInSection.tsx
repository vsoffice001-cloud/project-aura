/**
 * FadeInSection — Utility wrapper
 *
 * Uses IntersectionObserver to fade-in children when they enter the viewport.
 * Provides a smooth, staggered reveal effect for sections and cards.
 */
import { useRef, useEffect, useState, type ReactNode } from 'react';

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'none';
  className?: string;
  threshold?: number;
}

export function FadeInSection({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  threshold = 0.1,
}: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
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
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [threshold]);

  const translateY = direction === 'up' ? '16px' : '0px';

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : `translateY(${translateY})`,
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: isVisible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
