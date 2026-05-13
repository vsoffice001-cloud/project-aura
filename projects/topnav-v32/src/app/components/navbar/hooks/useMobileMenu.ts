/**
 * useMobileMenu — Mobile push menu state & body scroll lock
 *
 * WHY:   Mobile menu open state must lock body scroll to prevent
 *        background content from scrolling behind the overlay.
 *        Side-effect cleanup is critical to avoid scroll-lock leaks.
 * WHAT:  Manages `isOpen`, provides `toggle`/`close`,
 *        and applies `document.body.style.overflow` side-effect.
 * WHEN:  Used by MobileControls (hamburger button) and NavLayout
 *        (passes `close` to MobileMenu component).
 * WHERE: /src/app/components/navbar/hooks/useMobileMenu.ts
 * HOW:   const { isOpen, toggle, close } = useMobileMenu();
 */

import { useState, useEffect, useCallback } from 'react';

export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Body scroll lock side-effect
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, toggle, close };
}
