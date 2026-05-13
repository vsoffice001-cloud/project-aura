/**
 * AuthPopover — Floating auth card with authenticated/unauthenticated states
 *
 * WHY:   The auth popover is the most complex repeating UI in the navbar.
 *        It appears in both mobile (main nav) and desktop (secondary bar)
 *        with identical content but different positioning contexts.
 *        Extracting it eliminates ~200 lines of duplicated JSX.
 * WHAT:  A 220px floating card with spring animation (scale+fade), containing:
 *        - Authenticated: User info header → My Account / Saved Reports /
 *          Settings items → Sign out (danger)
 *        - Unauthenticated: Welcome header → Sign in / Sign up items with
 *          icon backgrounds and subtitles
 * WHEN:  Opens on avatar click, closes on outside click or item selection.
 * WHERE: MobileControls, SecondaryBar (via desktop variant).
 * HOW:   <AuthPopover isOpen={isOpen} user={user} onClose={close}
 *          onNavigate={navigate} onSignOut={signOut} ref={popoverRef} />
 *
 * Props:
 *   isOpen      — Controls visibility + animation
 *   user?       — Authenticated user object (name, email, initials)
 *   onClose     — Close the popover
 *   onNavigate  — Navigate to a path (closes popover first)
 *   onSignOut   — Sign out action
 *   ref         — Forwarded ref for outside-click boundary
 */

import { forwardRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavDivider } from '../atoms/NavDivider';
import { PopoverMenuItem } from '../molecules/PopoverMenuItem';
import {
  PersonIcon,
  BookmarkIcon,
  SettingsIcon,
  LogoutIcon,
  SignInIcon,
  SignUpIcon,
} from './popover-icons';
import type { NavUser } from '../types';

interface AuthPopoverProps {
  isOpen: boolean;
  user?: NavUser | null;
  onClose: () => void;
  onNavigate: (path: string) => void;
  onSignOut: () => void;
}

export const AuthPopover = forwardRef<HTMLDivElement, AuthPopoverProps>(
  ({ isOpen, user, onClose, onNavigate, onSignOut }, ref) => {
    const isAuthenticated = !!user;

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop — closes popover on click */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[98]"
              onClick={onClose}
              aria-hidden="true"
            />

            {/* Popover Card */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, scale: 0.9, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="
                absolute top-[calc(100%+8px)] right-0 z-[99]
                w-[220px] bg-white rounded-[12px]
                border border-[rgba(20,16,22,0.08)]
                shadow-[0px_8px_24px_-4px_rgba(20,16,22,0.12),0px_2px_8px_-2px_rgba(20,16,22,0.08)]
                overflow-hidden
              "
              role="menu"
              aria-label="Account options"
            >
              {isAuthenticated && user ? (
                /* ===== AUTHENTICATED STATE ===== */
                <>
                  <div className="px-4 pt-4 pb-3">
                    <p className="font-nav font-medium text-[13px] text-[#141016] truncate">
                      {user.name}
                    </p>
                    <p className="font-nav text-[11px] text-[#999999] mt-0.5 truncate">
                      {user.email}
                    </p>
                  </div>
                  <NavDivider />
                  <div className="p-2 space-y-0.5">
                    <PopoverMenuItem
                      icon={<PersonIcon />}
                      label="My Account"
                      onClick={onClose}
                    />
                    <PopoverMenuItem
                      icon={<BookmarkIcon />}
                      label="Saved Reports"
                      onClick={onClose}
                    />
                    <PopoverMenuItem
                      icon={<SettingsIcon />}
                      label="Settings"
                      onClick={onClose}
                    />
                  </div>
                  <NavDivider />
                  <div className="p-2">
                    <PopoverMenuItem
                      icon={<LogoutIcon />}
                      label="Sign out"
                      danger
                      onClick={onSignOut}
                    />
                  </div>
                </>
              ) : (
                /* ===== UNAUTHENTICATED STATE ===== */
                <>
                  <div className="px-4 pt-4 pb-3">
                    <p className="font-nav font-medium text-[13px] text-[#141016]">
                      Welcome
                    </p>
                    <p className="font-nav text-[11px] text-[#999999] mt-0.5">
                      Access your account
                    </p>
                  </div>
                  <NavDivider />
                  <div className="p-2 space-y-1">
                    <PopoverMenuItem
                      icon={<SignInIcon />}
                      label="Sign in"
                      subtitle="Existing account"
                      iconBg
                      minHeight={44}
                      onClick={() => onNavigate('/auth?mode=signin')}
                    />
                    <PopoverMenuItem
                      icon={<SignUpIcon />}
                      label="Sign up"
                      subtitle="Create free account"
                      iconBg
                      minHeight={44}
                      onClick={() => onNavigate('/auth?mode=signup')}
                    />
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }
);

AuthPopover.displayName = 'AuthPopover';