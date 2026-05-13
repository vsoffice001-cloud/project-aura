import { useEffect, useState } from 'react';

export function useHeroVisibility() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  
  useEffect(() => {
    // Find hero section (first section after navbar)
    const heroSection = document.querySelector('section');
    
    if (!heroSection) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hero is visible if at least 10% is in viewport
        setIsHeroVisible(entry.intersectionRatio > 0.1);
      },
      {
        threshold: [0, 0.1, 0.5, 1], // Track multiple points
        rootMargin: '0px'
      }
    );
    
    observer.observe(heroSection);
    
    return () => observer.disconnect();
  }, []);
  
  return isHeroVisible;
}
