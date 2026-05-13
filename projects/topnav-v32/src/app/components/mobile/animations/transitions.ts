/**
 * Animation Constants & Configurations
 * 
 * Based on industry standards from:
 * - Apple iOS Human Interface Guidelines
 * - Material Design 3 Motion System
 * - Research from Stripe, Airbnb, Notion
 * 
 * All timings and physics values are research-backed for optimal UX.
 */

// ========================================
// SPRING PHYSICS (iOS-like feel)
// ========================================

export const SPRING_CONFIG = {
  type: 'spring' as const,
  damping: 30,      // Natural bounce (Apple standard)
  stiffness: 300    // Responsive feel
};

// ========================================
// PARALLAX SETTINGS (Depth effect)
// ========================================

export const PARALLAX_CONFIG = {
  offset: '-30%',   // Background position (moves 30% of distance)
  opacity: 0.4,     // Background fade
  blur: 4,          // Background blur (px)
  scale: 0.95       // Background scale (5% smaller)
};

// ========================================
// STAGGER ANIMATION (List reveals)
// ========================================

export const STAGGER_CONFIG = {
  staggerChildren: 0.05,  // 50ms between items (researched optimal)
  delayChildren: 0.1      // Wait 100ms before starting
};

// ========================================
// DURATIONS (Material Design timing)
// ========================================

export const DURATION = {
  fast: 0.15,       // Tap feedback, toggles
  base: 0.3,        // Page transitions, slides
  slow: 0.4,        // Complex animations
  stagger: 0.05     // Between list items (50ms)
};

// ========================================
// EASING CURVES (Material Design)
// ========================================

export const EASE = {
  standard: [0.4, 0, 0.2, 1] as const,      // Most common
  decelerate: [0, 0, 0.2, 1] as const,      // Entering elements
  accelerate: [0.4, 0, 1, 1] as const,      // Exiting elements
  emphasized: [0.2, 0, 0, 1] as const       // Important actions
};

// ========================================
// GESTURE THRESHOLDS
// ========================================

export const GESTURE = {
  swipeThreshold: 100,     // Min pixels to trigger swipe
  velocityThreshold: 500   // Min velocity (px/s) to trigger
};

// ========================================
// CONTAINER VARIANTS (Staggered list)
// ========================================

export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_CONFIG.staggerChildren,
      delayChildren: STAGGER_CONFIG.delayChildren
    }
  }
};

// ========================================
// ITEM VARIANTS (List items)
// ========================================

export const itemVariants = {
  hidden: { 
    opacity: 0, 
    x: 30,        // Slide from right
    scale: 0.95   // Slightly smaller
  },
  show: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: SPRING_CONFIG
  }
};

// ========================================
// PANEL TRANSITIONS (Forward/Back)
// ========================================

export const getPanelVariants = (direction: 'forward' | 'back') => ({
  initial: direction === 'forward' ? {
    x: '100%',
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1
  } : {
    x: PARALLAX_CONFIG.offset,
    opacity: PARALLAX_CONFIG.opacity,
    filter: `blur(${PARALLAX_CONFIG.blur}px)`,
    scale: PARALLAX_CONFIG.scale
  },
  animate: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1
  },
  exit: direction === 'forward' ? {
    x: PARALLAX_CONFIG.offset,
    opacity: PARALLAX_CONFIG.opacity,
    filter: `blur(${PARALLAX_CONFIG.blur}px)`,
    scale: PARALLAX_CONFIG.scale
  } : {
    x: '100%',
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1
  }
});

// ========================================
// HAPTIC FEEDBACK (iOS patterns)
// ========================================

export const Haptics = {
  light: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);  // Subtle tap (10ms)
    }
  },
  
  medium: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);  // Button press (20ms)
    }
  },
  
  selection: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(15);  // List scroll (15ms)
    }
  },
  
  success: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([10, 50, 10]);  // Success pattern
    }
  }
};
