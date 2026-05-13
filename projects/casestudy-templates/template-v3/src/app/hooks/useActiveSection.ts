import { useState, useEffect, useRef } from 'react';

export function useActiveSection() {
  // ✅ All hooks at the top, in consistent order
  const [activeSection, setActiveSection] = useState<string>('');
  const activeSectionRef = useRef<string>('');

  useEffect(() => {
    const sections = [
      { id: 'hero', element: document.getElementById('hero') },
      { id: 'client-context', element: document.getElementById('client-context') },
      { id: 'challenges', element: document.getElementById('challenges') },
      { id: 'engagement', element: document.getElementById('engagement') },
      { id: 'methodology', element: document.getElementById('methodology') },
      { id: 'impact', element: document.getElementById('impact') },
      { id: 'testimonial', element: document.getElementById('testimonial') },
      { id: 'final-cta', element: document.getElementById('final-cta') },
      { id: 'resources', element: document.getElementById('resources') }
    ].filter(section => section.element !== null);

    // Debug: Log which sections were found
    console.log('✅ Sections found:', sections.map(s => s.id));

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is 20% from top
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] // Multiple thresholds for accurate detection
    };

    // Track which sections are currently intersecting
    const intersectingMap = new Map<string, number>();

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Update intersection map
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          intersectingMap.set(entry.target.id, entry.intersectionRatio);
        } else {
          intersectingMap.delete(entry.target.id);
        }
      });

      // Find the section with highest intersection ratio
      let mostVisibleId = '';
      let highestRatio = 0;

      intersectingMap.forEach((ratio, id) => {
        if (ratio > highestRatio) {
          highestRatio = ratio;
          mostVisibleId = id;
        }
      });

      // Update active section if we found one and it's different
      if (mostVisibleId && mostVisibleId !== activeSectionRef.current) {
        console.log('🔄 Active section changed:', activeSectionRef.current, '→', mostVisibleId, '(ratio:', highestRatio.toFixed(2), ')');
        activeSectionRef.current = mostVisibleId;
        setActiveSection(mostVisibleId);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
      if (section.element) {
        observer.observe(section.element);
      }
    });

    return () => {
      sections.forEach(section => {
        if (section.element) {
          observer.unobserve(section.element);
        }
      });
      intersectingMap.clear();
    };
  }, []);

  return activeSection;
}
