import { useState, useEffect } from 'react';

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>('');

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

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is 20% from top
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
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
    };
  }, []);

  return activeSection;
}