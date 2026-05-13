import { useEffect, useRef, useState, MouseEvent } from 'react';

interface MagneticEffectOptions {
  strength?: number;
  disabled?: boolean;
}

export function useMagneticEffect({ strength = 0.3, disabled = false }: MagneticEffectOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element || disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      setPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove as any);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove as any);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, disabled]);

  return { ref, position };
}
