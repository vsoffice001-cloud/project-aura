/**
 * Navbar — Barrel Export
 *
 * Top-level exports for the Ken Research navigation system.
 *
 * Architecture (Atomic Design):
 *   atoms/       → NavLink, LogoButton, DropdownChevron, IndicatorDot, HamburgerIcon, NavDivider, SkipLink
 *   molecules/   → NavDropdownTrigger, SearchBar, AuthAvatar, PopoverMenuItem, AuthButtons, CompanyTrigger
 *   organisms/   → TopNavigation, PrimaryNav, SecondaryBar, DesktopNavItems, MobileControls, AuthPopover
 *   hooks/       → useNavDropdown, useAuthPopover, useMobileMenu
 */

// Atoms
export * from './atoms';

// Molecules
export * from './molecules';

// Organisms
export * from './organisms';

// Hooks
export { useNavDropdown } from './hooks/useNavDropdown';
export { useAuthPopover } from './hooks/useAuthPopover';
export { useMobileMenu } from './hooks/useMobileMenu';

// Types
export type { NavUser, AuthPopoverConfig, NavItemConfig, MegaMenuEntry } from './types';