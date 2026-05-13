/**
 * PrimaryNav — Primary navigation content strip (logo + responsive controls)
 *
 * WHY:   The inner content of the 60px primary nav bar was inline JSX in NavLayout.
 *        Extracting it as an organism keeps NavLayout as a pure template and gives
 *        the primary nav its own testable, documented component boundary.
 * WHAT:  A `nav-container` flex row containing:
 *        - LogoButton atom (left, always visible)
 *        - MobileControls organism (right, < 768px) — Avatar + Hamburger
 *        - TabletControls organism (right, 768px-1023px) — Search + CTA + Avatar + Hamburger
 *        - DesktopNavItems organism (right, >= 1024px) — Full nav triggers + Search + CTA
 * WHEN:  Always rendered inside the sticky `<nav>` element.
 * WHERE: NavLayout template (primary nav section).
 * HOW:   <PrimaryNav logo={<LogoContainer />} onLogoClick={() => navigate('/')} ... />
 *
 * Props:
 *   logo            — Injected logo content (renders inside LogoButton)
 *   onLogoClick     — Logo click handler (typically navigate('/'))
 *   user            — Authenticated user (or null)
 *   isAuthenticated — Auth state
 *   isMobileMenuOpen    — Mobile menu open state
 *   onToggleMobileMenu  — Toggle hamburger menu
 *   onCloseMobileMenu   — Close hamburger menu
 *   authPopover         — Auth popover state/handlers (shared across all breakpoints)
 *   items               — Nav item descriptors for DesktopNavItems
 *   activeDropdown      — Current open dropdown ID
 *   onMouseEnter        — Hover enter handler for dropdown triggers
 *   onKeyDown           — Keyboard handler for dropdown triggers
 *   ctaButton           — Injected CTA button (renders in tablet + desktop)
 */

import type { ReactNode } from 'react';
import { LogoButton } from '../atoms/LogoButton';
import { MobileControls } from './MobileControls';
import { TabletControls } from './TabletControls';
import { DesktopNavItems } from './DesktopNavItems';
import type { NavUser, AuthPopoverConfig, NavItemConfig } from '../types';

interface PrimaryNavProps {
  /** Injected logo content — keeps the asset outside the package boundary */
  logo: ReactNode;
  /** Logo click handler */
  onLogoClick: () => void;

  /** Auth state */
  isAuthenticated: boolean;
  user?: NavUser | null;

  /** Mobile menu state */
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onCloseMobileMenu: () => void;

  /** Auth popover — shared config for both mobile and desktop */
  authPopover: AuthPopoverConfig;

  /** Desktop nav items configuration */
  items?: NavItemConfig[];
  activeDropdown: string | null;
  onMouseEnter: (menu: string) => void;
  onKeyDown: (e: React.KeyboardEvent, menu: string) => void;

  /** Injected CTA button — keeps DS Button outside the package boundary */
  ctaButton?: ReactNode;
}

export function PrimaryNav({
  logo,
  onLogoClick,
  isAuthenticated,
  user,
  isMobileMenuOpen,
  onToggleMobileMenu,
  onCloseMobileMenu,
  authPopover,
  items,
  activeDropdown,
  onMouseEnter,
  onKeyDown,
  ctaButton,
}: PrimaryNavProps) {
  return (
    <div className="nav-container h-full flex items-center justify-between">
      {/* Logo */}
      <LogoButton onClick={onLogoClick}>
        {logo}
      </LogoButton>

      {/* Mobile Controls (< 768px) */}
      <MobileControls
        user={user}
        isAuthenticated={isAuthenticated}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={onToggleMobileMenu}
        onCloseMobileMenu={onCloseMobileMenu}
        authPopover={authPopover}
      />

      {/* Tablet Controls (768px - 1023px) — Search + CTA + Avatar + Hamburger */}
      <TabletControls
        user={user}
        isAuthenticated={isAuthenticated}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={onToggleMobileMenu}
        onCloseMobileMenu={onCloseMobileMenu}
        authPopover={authPopover}
        ctaButton={ctaButton}
      />

      {/* Desktop Nav Items (>= 1024px) — driven by items config */}
      <DesktopNavItems
        items={items}
        activeDropdown={activeDropdown}
        onMouseEnter={onMouseEnter}
        onKeyDown={onKeyDown}
        ctaButton={ctaButton}
      />
    </div>
  );
}
