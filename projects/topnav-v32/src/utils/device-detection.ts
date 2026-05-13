/**
 * Device Detection Utilities
 * 
 * Provides utilities to detect device capabilities and optimize interactions
 * for different device types (desktop, tablet, mobile).
 * 
 * Features:
 * - Touch capability detection
 * - Hover capability detection  
 * - Device type detection (mobile/tablet/desktop)
 * - Viewport size tracking
 */

/**
 * Detect if device has touch capability
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore - some browsers use this property
    navigator.msMaxTouchPoints > 0
  );
}

/**
 * Detect if device supports hover (desktop with mouse)
 */
export function hasHoverCapability(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Use matchMedia to check for hover capability
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

/**
 * Detect if device is in tablet breakpoint (768px - 1199px)
 */
export function isTabletViewport(): boolean {
  if (typeof window === 'undefined') return false;
  
  const width = window.innerWidth;
  return width >= 768 && width < 1200;
}

/**
 * Detect if device is in mobile breakpoint (< 768px)
 */
export function isMobileViewport(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.innerWidth < 768;
}

/**
 * Detect if device is in desktop breakpoint (>= 1200px)
 */
export function isDesktopViewport(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.innerWidth >= 1200;
}

/**
 * Get current device type based on viewport and capabilities
 */
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export function getDeviceType(): DeviceType {
  const isTouch = isTouchDevice();
  const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
  
  if (width < 768) {
    return 'mobile';
  } else if (width >= 768 && width < 1200) {
    // Tablet breakpoint - could be touch tablet or small desktop
    return isTouch ? 'tablet' : 'desktop';
  } else {
    return 'desktop';
  }
}

/**
 * Check if navigation should use click/tap instead of hover
 * Used for tablets and touch devices
 */
export function shouldUseClickNavigation(): boolean {
  return isTouchDevice() || isTabletViewport();
}

/**
 * Get minimum touch target size based on device
 * WCAG 2.1 Level AAA requires 44x44px minimum
 */
export function getMinTouchTargetSize(): number {
  const deviceType = getDeviceType();
  
  switch (deviceType) {
    case 'mobile':
      return 44; // WCAG AAA minimum
    case 'tablet':
      return 44; // WCAG AAA minimum
    case 'desktop':
      return 24; // Smaller targets ok with mouse precision
    default:
      return 44;
  }
}

/**
 * Hook-style utility for React components
 */
export function useDeviceDetection() {
  if (typeof window === 'undefined') {
    return {
      isTouch: false,
      hasHover: false,
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      deviceType: 'desktop' as DeviceType,
      shouldUseClick: false
    };
  }
  
  return {
    isTouch: isTouchDevice(),
    hasHover: hasHoverCapability(),
    isMobile: isMobileViewport(),
    isTablet: isTabletViewport(),
    isDesktop: isDesktopViewport(),
    deviceType: getDeviceType(),
    shouldUseClick: shouldUseClickNavigation()
  };
}
