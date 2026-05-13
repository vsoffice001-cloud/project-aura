/**
 * Scroll to Top Button - Quick navigation enhancement
 * 
 * Purpose: Allow users to quickly return to top of page
 * 
 * Color: bg-black (92% foundation tier)
 * Reasoning: This is a utility/navigation aid, NOT a conversion CTA or
 * decorative accent. Per the 92-5-3 color hierarchy:
 *   - Purple (#806ce0) is 3% tier: icons/shadows only, never solid backgrounds
 *   - Brand Red (#b01f24) is 5% tier: conversion CTAs only
 *   - Black is 92% tier: correct for utility elements
 * 
 * Border radius: rounded-full (circle) -- deliberate exception to the
 * 5px/10px system because FAB (floating action button) convention requires
 * a circular shape for quick recognition.
 */

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when user has scrolled down 400px
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility(); // Initial check

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
