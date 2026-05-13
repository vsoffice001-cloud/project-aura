/**
 * MobileControls — Mobile auth avatar + hamburger button cluster
 *
 * WHY:   On mobile (<768px), the nav shows only two controls: the auth avatar
 *        (unified state icon) and the hamburger menu toggle. They share a
 *        1px gap and need coordinated dismiss behavior (opening one closes the other).
 * WHAT:  A flex row (hidden on tablet+, visible on mobile) containing:
 *        - AuthAvatar molecule (40px, with popover)
 *        - Hamburger button (44px tap target) with HamburgerIcon atom
 *        - AuthPopover organism (attached to avatar)
 * WHEN:  Visible only on mobile (<768px), hidden on tablet (≥768px).
 * WHERE: PrimaryNav component (right section of primary nav).
 * HOW:   <MobileControls auth={authState} menu={menuState} />
 *
 * Props:
 *   user               — Authenticated user (or null)
 *   isAuthenticated     — Auth state
 *   isMobileMenuOpen    — Mobile menu state
 *   onToggleMobileMenu  — Toggle hamburger menu
 *   authPopover         — Popover state/handlers/refs
 */

import { HamburgerIcon } from '../atoms/HamburgerIcon';
import { AuthAvatar } from '../molecules/AuthAvatar';
import { AuthPopover } from './AuthPopover';
import type { NavUser, AuthPopoverConfig } from '../types';

interface MobileControlsProps {
  user?: NavUser | null;
  isAuthenticated: boolean;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onCloseMobileMenu: () => void;
  authPopover: Pick<AuthPopoverConfig, 'isOpen' | 'toggle' | 'close' | 'onNavigate' | 'onSignOut' | 'popoverRef' | 'mobileButtonRef'>;
}

export function MobileControls({
  user,
  isAuthenticated,
  isMobileMenuOpen,
  onToggleMobileMenu,
  onCloseMobileMenu,
  authPopover,
}: MobileControlsProps) {
  return (
    <div className="md:hidden flex items-center gap-1">
      {/* Auth Avatar with Popover */}
      <div className="relative">
        <AuthAvatar
          ref={authPopover.mobileButtonRef}
          size="md"
          user={isAuthenticated && user ? { initials: user.initials } : null}
          isActive={authPopover.isOpen}
          onClick={() => {
            authPopover.toggle();
            if (isMobileMenuOpen) onCloseMobileMenu();
          }}
        />

        <AuthPopover
          ref={authPopover.popoverRef}
          isOpen={authPopover.isOpen}
          user={isAuthenticated ? user : null}
          onClose={authPopover.close}
          onNavigate={authPopover.onNavigate}
          onSignOut={authPopover.onSignOut}
        />
      </div>

      {/* Hamburger Menu Toggle */}
      <button
        type="button"
        className="
          flex items-center justify-center
          p-2.5 rounded-[8px]
          hover:bg-[#f5f5f5] active:bg-[#ebebeb]
          transition-all duration-200
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-[rgba(20,16,22,0.5)] focus-visible:ring-offset-2
        "
        onClick={() => {
          onToggleMobileMenu();
          if (authPopover.isOpen) authPopover.close();
        }}
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen}
        style={{ minWidth: '44px', minHeight: '44px' }}
      >
        <HamburgerIcon isOpen={isMobileMenuOpen} />
      </button>
    </div>
  );
}