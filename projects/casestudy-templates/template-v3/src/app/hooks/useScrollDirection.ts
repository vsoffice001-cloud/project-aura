import { useEffect, useState } from 'react';

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'idle'>('idle');
  
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const threshold = 10; // Ignore small scrolls
      
      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      
      setScrollDirection(scrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  
  return scrollDirection;
}
