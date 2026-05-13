'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { SkipLink } from '../../atoms/SkipLink';
import { useNavDropdown } from '../../hooks/useNavDropdown';
import { useAuthPopover } from '../../hooks/useAuthPopover';
import { useMobileMenu } from '../../hooks/useMobileMenu';
import { SecondaryBar } from './SecondaryBar';
import { PrimaryNav } from './PrimaryNav';
import type { NavUser, NavItemConfig, MegaMenuEntry } from './types';

export interface TopNavigationProps {
  /** Logo content — renders inside LogoButton */
  logo: ReactNode;
  /** Logo click override (default: onNavigate('/')) */
  onLogoClick?: () => void;

  isAuthenticated: boolean;
  user?: NavUser | null;
  onNavigate: (path: string) => void;
  onSignOut: () => void;

  items?: NavItemConfig[];
  megaMenus?: MegaMenuEntry[];

  /** CTA button — injected to keep DS Button outside package boundary */
  ctaButton?: ReactNode;
  /** Company dropdown — render function receiving isOpen */
  companyDropdown?: (isOpen: boolean) => ReactNode;
  /** Mobile menu — render function receiving (isOpen, onClose) */
  mobileMenu?: (isOpen: boolean, onClose: () => void) => ReactNode;
}

/**
 * TopNavigation — complete top navigation as a single drop-in component.
 *
 * Composes: SkipLink + ARIA live region + SecondaryBar + sticky PrimaryNav +
 * backdrop blur overlay (when mega menu open) + mega menu panels + mobile menu slot.
 * Owns hook state via useNavDropdown / useAuthPopover / useMobileMenu.
 *
 * @example
 *   <TopNavigation
 *     logo={<KenLogo />}
 *     isAuthenticated={false}
 *     onNavigate={(path) => router.push(path)}
 *     onSignOut={signOut}
 *     ctaButton={<Button variant="brand" size="sm">Book discovery</Button>}
 *     companyDropdown={(isOpen) => <CompanyDropdown isOpen={isOpen}/>}
 *     mobileMenu={(isOpen, onClose) => <MobileMenu isOpen={isOpen} onClose={onClose}/>}
 *   />
 *
 * @promotedFrom topnav-v32/src/app/components/navbar/organisms/TopNavigation.tsx
 */
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
  const dropdown = useNavDropdown();
  const authPopover = useAuthPopover();
  const mobile = useMobileMenu();

  const handleAuthNavigate = (path: string) => {
    authPopover.close();
    onNavigate(path);
  };

  const handleSignOut = () => {
    authPopover.close();
    onSignOut();
  };

  const handleLogoClick = onLogoClick ?? (() => onNavigate('/'));

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
      <SkipLink />
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {dropdown.announcement}
      </div>

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

      <div className="sticky top-0 z-[50] w-full" onMouseLeave={dropdown.handleMouseLeave}>
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

        <nav className="relative bg-[var(--color-foundation-white)] backdrop-blur-[4px] h-[60px] shadow-[0px_8px_12px_-4px_rgba(128,108,224,0.15)] z-[50]">
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

        {megaMenus.map((menu) => (
          <span key={menu.id}>{menu.render(dropdown.activeDropdown === menu.id)}</span>
        ))}

        {mobileMenu?.(mobile.isOpen, mobile.close)}
      </div>
    </>
  );
}
