/**
 * TopNavigation — Complete top navigation as a single drop-in component
 *
 * WHY:   Before this, the full nav experience (SecondaryBar + sticky PrimaryNav +
 *        backdrop overlay + mega menus + mobile menu + accessibility) was assembled
 *        inline inside NavLayout (~50 lines of template JSX + 3 hook calls + handler
 *        wiring). If you wanted the nav on a different page or layout, you'd copy all
 *        of that. This component packages the ENTIRE top navigation so any page can
 *        drop it in with one line: `<TopNavigation ... />`.
 *
 * WHAT:  Calls useNavDropdown, useAuthPopover, useMobileMenu internally. Renders:
 *        - SkipLink atom (WCAG skip-to-content)
 *        - ARIA live region (dropdown announcements)
 *        - SecondaryBar organism (desktop 40px utility bar)
 *        - Sticky section:
 *          - Backdrop blur overlay (when mega menu is open)
 *          - <nav> with PrimaryNav organism (logo + mobile + desktop controls)
 *          - Mega menu panels (driven by MegaMenuEntry[])
 *          - Mobile menu slot (injected)
 *
 * WHEN:  Use on any page that needs the full Ken Research top navigation.
 * WHERE: NavLayout template, or any custom layout.
 *
 * HOW:
 *   <TopNavigation
 *     logo={<LogoContainer />}
 *     isAuthenticated={isAuthenticated}
 *     user={user}
 *     onNavigate={(path) => navigate(path)}
 *     onSignOut={() => { logout(); navigate('/'); }}
 *     items={NAV_ITEMS}
 *     megaMenus={MEGA_MENUS}
 *     ctaButton={<Button variant="brand" size="sm">Book discovery call</Button>}
 *     companyDropdown={(isOpen) => <CompanyDropdown isOpen={isOpen} />}
 *     mobileMenu={(isOpen, onClose) => <MobileMenu isOpen={isOpen} onClose={onClose} />}
 *   />
 *
 * Props:
 *   logo              — Logo content injected into LogoButton
 *   onLogoClick?      — Logo click override (default: onNavigate('/'))
 *   isAuthenticated   — Auth state from consumer's auth context
 *   user?             — Authenticated user (NavUser shape)
 *   onNavigate        — Route navigation callback
 *   onSignOut         — Sign-out action callback
 *   items?            — Primary nav item descriptors (default: 5 Ken Research items)
 *   megaMenus?        — Mega menu renderers mapped by item ID
 *   ctaButton?        — CTA button element (injected, keeps DS Button outside)
 *   companyDropdown?  — Company dropdown render function
 *   mobileMenu?       — Mobile menu render function
 */

import type { ReactNode } from 'react';
import { motion } from 'motion/react';

// Atoms
import { SkipLink } from '../atoms/SkipLink';

// Organisms
import { SecondaryBar } from './SecondaryBar';
import { PrimaryNav } from './PrimaryNav';

// Hooks
import { useNavDropdown } from '../hooks/useNavDropdown';
import { useAuthPopover } from '../hooks/useAuthPopover';
import { useMobileMenu } from '../hooks/useMobileMenu';

// Types
import type { NavUser, NavItemConfig, MegaMenuEntry } from '../types';

interface TopNavigationProps {
  /** Logo content — renders inside LogoButton atom */
  logo: ReactNode;
  /** Logo click override (default: calls onNavigate('/')) */
  onLogoClick?: () => void;

  /** Auth state from consumer's auth context */
  isAuthenticated: boolean;
  /** Authenticated user shape */
  user?: NavUser | null;
  /** Navigation callback — called for all internal navigation */
  onNavigate: (path: string) => void;
  /** Sign-out callback — called after popover closes */
  onSignOut: () => void;

  /** Primary nav item descriptors (default: 5 Ken Research items) */
  items?: NavItemConfig[];
  /** Mega menu panels — maps dropdown IDs to renderers */
  megaMenus?: MegaMenuEntry[];

  /** CTA button — injected to keep DS Button outside package boundary */
  ctaButton?: ReactNode;
  /** Company dropdown — render function receiving isOpen boolean */
  companyDropdown?: (isOpen: boolean) => ReactNode;
  /** Mobile menu — render function receiving (isOpen, onClose) */
  mobileMenu?: (isOpen: boolean, onClose: () => void) => ReactNode;
}

export function TopNavigation({
  logo,
  onLogoClick,
  isAuthenticated,
  user,
  onNavigate,
  onSignOut,
  items,
  megaMenus = [],
  ctaButton,
  companyDropdown,
  mobileMenu,
}: TopNavigationProps) {
  // --- All state lives in hooks (no props drilling needed) ---
  const dropdown = useNavDropdown();
  const authPopover = useAuthPopover();
  const mobile = useMobileMenu();

  // --- Auth popover action handlers ---
  const handleAuthNavigate = (path: string) => {
    authPopover.close();
    onNavigate(path);
  };

  const handleSignOut = () => {
    authPopover.close();
    onSignOut();
  };

  const handleLogoClick = onLogoClick ?? (() => onNavigate('/'));

  // Shared auth popover config (passed to both mobile + desktop organisms)
  const authPopoverConfig = {
    isOpen: authPopover.isOpen,
    toggle: authPopover.toggle,
    close: authPopover.close,
    onNavigate: handleAuthNavigate,
    onSignOut: handleSignOut,
    popoverRef: authPopover.popoverRef,
    mobileButtonRef: authPopover.mobileButtonRef,
    desktopButtonRef: authPopover.desktopButtonRef,
  };

  return (
    <>
      {/* ===== ACCESSIBILITY ===== */}
      <SkipLink />
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {dropdown.announcement}
      </div>

      {/* ===== SECONDARY BAR (desktop only, 40px) ===== */}
      <SecondaryBar
        activeDropdown={dropdown.activeDropdown}
        onMouseEnter={dropdown.handleMouseEnter}
        onMouseLeave={dropdown.handleMouseLeave}
        onKeyDown={dropdown.handleKeyDown}
        isAuthenticated={isAuthenticated}
        user={user}
        authPopover={authPopoverConfig}
        companyDropdown={companyDropdown?.(dropdown.activeDropdown === 'company')}
      />

      {/* ===== STICKY PRIMARY NAVIGATION (60px) ===== */}
      <div className="sticky top-0 z-[50] w-full" onMouseLeave={dropdown.handleMouseLeave}>
        {/* Backdrop blur when mega menu is open */}
        {dropdown.activeDropdown &&
          !dropdown.activeDropdown.includes('company') &&
          !dropdown.activeDropdown.includes('mobile') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/[0.02] backdrop-blur-[2px] z-[45]"
              aria-hidden="true"
              onMouseEnter={dropdown.closeAll}
            />
          )}

        <nav className="relative bg-white backdrop-blur-[4px] h-[60px] shadow-[0px_8px_12px_-4px_rgba(128,108,224,0.15)] z-[50]">
          <PrimaryNav
            logo={logo}
            onLogoClick={handleLogoClick}
            isAuthenticated={isAuthenticated}
            user={user}
            isMobileMenuOpen={mobile.isOpen}
            onToggleMobileMenu={mobile.toggle}
            onCloseMobileMenu={mobile.close}
            authPopover={authPopoverConfig}
            items={items}
            activeDropdown={dropdown.activeDropdown}
            onMouseEnter={dropdown.handleMouseEnter}
            onKeyDown={dropdown.handleKeyDown}
            ctaButton={ctaButton}
          />
        </nav>

        {/* Mega Menu Dropdowns — driven by megaMenus config */}
        {megaMenus.map((menu) => (
          <span key={menu.id}>
            {menu.render(dropdown.activeDropdown === menu.id)}
          </span>
        ))}

        {/* Mobile Menu — injected from consumer */}
        {mobileMenu?.(mobile.isOpen, mobile.close)}
      </div>
    </>
  );
}
