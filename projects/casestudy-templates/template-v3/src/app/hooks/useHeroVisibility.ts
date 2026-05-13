import { useEffect, useState } from 'react';

export function useHeroVisibility() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  
  useEffect(() => {
    const handleScroll = () => {
      // Consider hero "not visible" if scrolled more than 200px
      // This accounts for the sticky hero animation phase
      const scrollY = window.scrollY;
      setIsHeroVisible(scrollY < 200);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return isHeroVisible;
}