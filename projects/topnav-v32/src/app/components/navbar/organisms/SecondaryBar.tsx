/**
 * SecondaryBar — Full desktop top bar above main navigation
 *
 * WHY:   The 40px secondary bar contains utility links (Procurement, Expert Panel),
 *        Company dropdown, and auth-aware right section (Sign in/up OR avatar+popover).
 *        It's a complete organism with its own visual identity separate from primary nav.
 * WHAT:  A #fafafa bar, 40px tall, hidden on mobile (<768px), containing:
 *        - Left: NavLink atoms for Procurement, Expert Panel, Company dropdown trigger
 *        - Right: AuthButtons (logged-out) OR user name + AuthAvatar + popover (logged-in)
 * WHEN:  Always rendered on desktop, hidden on mobile via `hidden md:block`.
 * WHERE: NavLayout (first visible element after SkipLink).
 * HOW:   <SecondaryBar dropdown={dropdownState} auth={authState} />
 *
 * Props:
 *   activeDropdown   — Current open dropdown ID
 *   onMouseEnter     — Hover enter handler
 *   onMouseLeave     — Hover leave handler
 *   onKeyDown        — Keyboard handler for Company trigger
 *   isAuthenticated  — Auth state
 *   user?            — Authenticated user
 *   authPopover      — Auth popover state/handlers
 */

import { NavLink } from '../atoms/NavLink';
import { AuthButtons } from '../molecules/AuthButtons';
import { AuthAvatar } from '../molecules/AuthAvatar';
import { CompanyTrigger } from '../molecules/CompanyTrigger';
import { AuthPopover } from './AuthPopover';
import type { NavUser, AuthPopoverConfig } from '../types';

interface SecondaryBarProps {
  activeDropdown: string | null;
  onMouseEnter: (menu: string) => void;
  onMouseLeave: () => void;
  onKeyDown: (e: React.KeyboardEvent, menu: string) => void;
  isAuthenticated: boolean;
  user?: NavUser | null;
  authPopover: Pick<AuthPopoverConfig, 'isOpen' | 'toggle' | 'close' | 'onNavigate' | 'onSignOut' | 'popoverRef' | 'desktopButtonRef'>;
  /** Injected company dropdown content — keeps the package boundary clean */
  companyDropdown?: React.ReactNode;
}

export function SecondaryBar({
  activeDropdown,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  isAuthenticated,
  user,
  authPopover,
  companyDropdown,
}: SecondaryBarProps) {
  return (
    <div
      className="bg-[#fafafa] border-b border-[rgba(0,0,0,0.05)] h-[40px] relative w-full z-[60] hidden md:block"
      onMouseLeave={onMouseLeave}
    >
      <div className="nav-container h-full flex items-center justify-between">
        {/* Left Side — Utility links + Company dropdown */}
        <div className="flex items-center gap-6">
          <NavLink href="/procurement" size="sm">Procurement</NavLink>
          <NavLink href="/expert-panel" size="sm">Expert Panel</NavLink>

          {/* Company dropdown trigger */}
          <CompanyTrigger
            isOpen={activeDropdown === 'company'}
            onMouseEnter={() => onMouseEnter('company')}
            onKeyDown={(e) => onKeyDown(e, 'company')}
            dropdown={companyDropdown}
          />
        </div>

        {/* Right Side — Auth-aware */}
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="relative flex items-center gap-3">
              <span className="font-nav font-normal text-[#656565] text-[12px]">
                {user.name}
              </span>
              <AuthAvatar
                ref={authPopover.desktopButtonRef}
                size="sm"
                user={{ initials: user.initials }}
                isActive={authPopover.isOpen}
                onClick={authPopover.toggle}
              />
              <AuthPopover
                ref={authPopover.popoverRef}
                isOpen={authPopover.isOpen}
                user={user}
                onClose={authPopover.close}
                onNavigate={authPopover.onNavigate}
                onSignOut={authPopover.onSignOut}
              />
            </div>
          ) : (
            <AuthButtons
              onSignIn={() => authPopover.onNavigate('/auth?mode=signin')}
              onSignUp={() => authPopover.onNavigate('/auth?mode=signup')}
            />
          )}
        </div>
      </div>
    </div>
  );
}