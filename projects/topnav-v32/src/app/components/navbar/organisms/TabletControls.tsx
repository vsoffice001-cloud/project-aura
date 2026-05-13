/**
 * TabletControls — Tablet nav controls with search bar + CTA + auth avatar + hamburger
 *
 * WHY:   On tablet (768px-1023px), we have enough space for the animated search bar
 *        and CTA button alongside the mobile-style avatar + hamburger controls.
 *        This bridges the gap between pure mobile and full desktop nav.
 * WHAT:  A flex row (hidden on mobile and desktop, visible only on tablet) containing:
 *        - SearchBar molecule (with beam animation)
 *        - CTA button (injected)
 *        - AuthAvatar molecule (40px, with popover)
 *        - Hamburger button (44px tap target)
 * WHEN:  Visible only on tablet (768px-1023px), hidden on mobile (<768px) and desktop (≥1024px).
 * WHERE: PrimaryNav component (right section of primary nav).
 * HOW:   <TabletControls auth={authState} menu={menuState} ctaButton={<Button />} />
 *
 * Props:
 *   user               — Authenticated user (or null)
 *   isAuthenticated     — Auth state
 *   isMobileMenuOpen    — Mobile menu state
 *   onToggleMobileMenu  — Toggle hamburger menu
 *   onCloseMobileMenu   — Close hamburger menu
 *   authPopover         — Popover state/handlers/refs
 *   ctaButton           — Injected CTA button (keeps DS Button outside package boundary)
 */

import type { ReactNode } from 'react';
import { HamburgerIcon } from '../atoms/HamburgerIcon';
import { AuthAvatar } from '../molecules/AuthAvatar';
import { SearchBar } from '../molecules/SearchBar';
import { AuthPopover } from './AuthPopover';
import type { NavUser, AuthPopoverConfig } from '../types';

interface TabletControlsProps {
  user?: NavUser | null;
  isAuthenticated: boolean;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onCloseMobileMenu: () => void;
  authPopover: Pick<AuthPopoverConfig, 'isOpen' | 'toggle' | 'close' | 'onNavigate' | 'onSignOut' | 'popoverRef' | 'mobileButtonRef'>;
  /** Injected CTA button — keeps DS Button outside the package boundary */
  ctaButton?: ReactNode;
}

export function TabletControls({
  user,
  isAuthenticated,
  isMobileMenuOpen,
  onToggleMobileMenu,
  onCloseMobileMenu,
  authPopover,
  ctaButton,
}: TabletControlsProps) {
  return (
    <div className="hidden md:flex lg:hidden items-center gap-3">
      {/* Search Bar — same animated experience as desktop */}
      <SearchBar />

      {/* CTA Button — injected from consumer */}
      {ctaButton && (
        <div className="shrink-0">
          {ctaButton}
        </div>
      )}

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
