import { useEffect, useState } from 'react';

export function useSectionProgress(startId: string, endId: string) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const updateProgress = () => {
      const startEl = document.getElementById(startId);
      const endEl = document.getElementById(endId);
      
      if (!startEl || !endEl) return;
      
      // Get positions
      const startTop = startEl.offsetTop;
      const endBottom = endEl.offsetTop + endEl.offsetHeight;
      const scrollableRange = endBottom - startTop;
      
      // Current scroll position (adjusted for navbar height)
      const navbarHeight = window.innerWidth >= 1024 ? 100 : 60;
      const scrollPos = window.scrollY + navbarHeight;
      
      // Calculate progress within range
      const scrolledInRange = scrollPos - startTop;
      const progressPercent = (scrolledInRange / scrollableRange) * 100;
      
      // Clamp between 0-100
      const clampedProgress = Math.max(0, Math.min(100, progressPercent));
      
      setProgress(clampedProgress);
    };
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
    
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [startId, endId]);
  
  return progress;
}
