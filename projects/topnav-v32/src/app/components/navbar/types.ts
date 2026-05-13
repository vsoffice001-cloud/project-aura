/**
 * Navbar — Shared Type Definitions
 *
 * WHY:   SecondaryBar, MobileControls, and AuthPopover all define identical
 *        user interfaces ({ name, email, initials }). AuthPopover config
 *        is also repeated in both SecondaryBar and MobileControls props.
 *        Centralizing eliminates drift and ensures contract consistency.
 * WHERE: /src/app/components/navbar/types.ts
 */

/** Authenticated user shape used throughout the navbar */
export interface NavUser {
  name: string;
  email: string;
  initials: string;
}

/** Auth popover state + handlers passed from NavLayout to organisms */
export interface AuthPopoverConfig {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  onNavigate: (path: string) => void;
  onSignOut: () => void;
  popoverRef: React.RefObject<HTMLDivElement | null>;
  mobileButtonRef: React.RefObject<HTMLButtonElement | null>;
  desktopButtonRef: React.RefObject<HTMLButtonElement | null>;
}

/** Primary nav item descriptor (drives DesktopNavItems triggers) */
export interface NavItemConfig {
  /** Unique dropdown ID (e.g. 'reports', 'industries') */
  id: string;
  /** Display label (e.g. 'Reports', 'Industries') */
  label: string;
}

/** Mega menu entry — maps a dropdown ID to its React component */
export interface MegaMenuEntry {
  /** Must match a NavItemConfig.id */
  id: string;
  /** Render function receiving isOpen boolean */
  render: (isOpen: boolean) => React.ReactNode;
}