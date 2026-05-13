/**
 * Scroll to Top Button
 * 
 * Floating action button that appears after 400px of scroll and
 * smooth-scrolls to the top of the page when clicked.
 * 
 * Color: bg-black (92% foundation tier — utility element, not a CTA)
 * Shape: rounded-full (FAB convention exception to 5px/10px system)
 * Position: fixed bottom-right, z-50
 * 
 * @example
 * ```tsx
 * <ScrollToTop />
 * ```
 */

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility();

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 sm:bottom-8 sm:right-8 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black text-white
            shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]
            flex items-center justify-center transition-shadow duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
