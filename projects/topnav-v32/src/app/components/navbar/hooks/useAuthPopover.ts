/**
 * useAuthPopover — Auth popover state & outside-click management
 *
 * WHY:   Auth popover needs outside-click detection across 3 refs
 *        (popover card, mobile trigger button, desktop trigger button).
 *        Extracting this prevents ref spaghetti in NavLayout.
 * WHAT:  Manages `isOpen`, provides `toggle`/`close`/`open`,
 *        attaches mousedown listener for outside-click dismissal,
 *        and exposes 3 refs for proper boundary detection.
 * WHEN:  Used by MobileControls (avatar button), SecondaryBar (desktop avatar),
 *        and AuthPopover (the popover card itself).
 * WHERE: /src/app/components/navbar/hooks/useAuthPopover.ts
 * HOW:   const { isOpen, toggle, close, popoverRef, mobileButtonRef, desktopButtonRef } = useAuthPopover();
 */

import { useState, useEffect, useRef, useCallback } from 'react';

export function useAuthPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const desktopButtonRef = useRef<HTMLButtonElement>(null);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);
  const open = useCallback(() => setIsOpen(true), []);

  // Outside-click dismissal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInsidePopover = popoverRef.current?.contains(target);
      const isInsideMobileButton = mobileButtonRef.current?.contains(target);
      const isInsideDesktopButton = desktopButtonRef.current?.contains(target);

      if (!isInsidePopover && !isInsideMobileButton && !isInsideDesktopButton) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return {
    isOpen,
    toggle,
    close,
    open,
    popoverRef,
    mobileButtonRef,
    desktopButtonRef,
  };
}
