import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get hero section and final CTA section
      const heroSection = document.querySelector('section');
      const finalCTASection = document.getElementById('final-cta');
      
      if (heroSection && finalCTASection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        const finalCTATop = finalCTASection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Show CTA when hero is scrolled past and final CTA is not in viewport yet
        const showCTA = heroBottom < 0 && finalCTATop > windowHeight;
        setIsVisible(showCTA);
      }
    };

    // Initial check
    handleScroll();

    // Listen to scroll events with throttling for better performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#f5f5f5] shadow-2xl transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="w-[85%] py-4 mx-auto">
        <div className="flex items-center justify-between gap-6">
          <div className="flex-1">
            <p className="text-sm leading-relaxed text-[#171717]">
              <span className="font-bold">Interested in this report?</span>
              <br />
              Get expert insights tailored to your business needs and unlock strategic opportunities in the Qatar Fresh Herbs Market.
            </p>
          </div>
          
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button 
              variant="secondary"
              size="default"
              className="text-[#404040]"
            >
              Connect with Consultant
            </Button>
            <Button 
              variant="cta"
              size="default"
            >
              Download sample report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}