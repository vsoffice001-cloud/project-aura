'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ScrollToTop — floating action button (FAB) appearing past 400px scroll.
 *
 * Color: black (92% foundation tier — utility nav, NOT brand).
 * Reasoning per 92-5-3: purple = 3% tier (icons/shadows only, never solid bg);
 * brand red = 5% tier (CTA only); black = correct utility color.
 *
 * Border-radius: rounded-full (deliberate exception to 5px/10px system —
 * FAB convention requires circle for quick recognition).
 *
 * Smooth scroll to top via `window.scrollTo({ behavior: 'smooth' })`.
 *
 * @promotedFrom V0_lite_report
 */
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setIsVisible(window.scrollY > 400);
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 sm:bottom-8 sm:right-8 z-[var(--z-index-fab)]
            w-10 h-10 sm:w-12 sm:h-12 rounded-full
            bg-[var(--color-foundation-black)] text-[var(--color-foundation-white)]
            shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]
            flex items-center justify-center transition-shadow duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
