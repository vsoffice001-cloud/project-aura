/**
 * useNavDropdown — Navbar dropdown state management
 *
 * WHY:   Centralizes all dropdown open/close logic, hover intent, keyboard nav,
 *        touch detection, and ARIA announcement into one reusable hook.
 * WHAT:  Manages `activeDropdown` state, hover enter/leave with 100ms debounce,
 *        keyboard handlers (Enter/Space to toggle, Escape to close),
 *        and touch device detection to prevent hover-on-touch.
 * WHEN:  Used by NavLayout (top-level), SecondaryBar (Company dropdown),
 *        and DesktopNavItems (Reports/Industries/Surveys/Consulting/Insights).
 * WHERE: /src/app/components/navbar/hooks/useNavDropdown.ts
 * HOW:   const { activeDropdown, handleMouseEnter, handleMouseLeave, toggleDropdown, handleKeyDown, announcement } = useNavDropdown();
 */

import { useState, useEffect, useCallback, useRef } from 'react';

const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
};

export function useNavDropdown() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [announcement, setAnnouncement] = useState<string>('');
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // ARIA live region announcement
  useEffect(() => {
    if (activeDropdown && !activeDropdown.includes('mobile') && activeDropdown !== 'company') {
      const menuName = activeDropdown.charAt(0).toUpperCase() + activeDropdown.slice(1);
      setAnnouncement(`${menuName} menu opened`);
    } else if (!activeDropdown) {
      setAnnouncement('Menu closed');
    }
  }, [activeDropdown]);

  const handleMouseEnter = useCallback((menu: string) => {
    if (isTouch) return;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setActiveDropdown(menu);
  }, [isTouch]);

  const handleMouseLeave = useCallback(() => {
    if (isTouch) return;
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 100);
  }, [isTouch]);

  const toggleDropdown = useCallback((menu: string) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  }, []);

  const closeAll = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, menu: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDropdown(menu);
    } else if (e.key === 'Escape') {
      setActiveDropdown(null);
    }
  }, [toggleDropdown]);

  return {
    activeDropdown,
    setActiveDropdown,
    handleMouseEnter,
    handleMouseLeave,
    toggleDropdown,
    closeAll,
    handleKeyDown,
    announcement,
    isTouch,
  };
}