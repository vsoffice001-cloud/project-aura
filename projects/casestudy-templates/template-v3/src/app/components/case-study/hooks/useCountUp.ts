import { useEffect, useRef, useState } from 'react';

export function useCountUp(target: number, { duration = 1600, decimals = 0, enabled = true } = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!enabled) {
      setValue(target);
      return;
    }
    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setValue(target);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(parseFloat((target * eased).toFixed(decimals)));
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.4 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, decimals, enabled]);

  return { ref, value };
}
