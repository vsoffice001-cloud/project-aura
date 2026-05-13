/**
 * MenuItem — Popover/dropdown menu item row (icon + label + optional subtitle)
 *
 * Design System primitive. A button row with icon, label, optional subtitle,
 * hover state, and danger variant for destructive actions.
 *
 * Promoted from: navbar/molecules/PopoverMenuItem.tsx
 * Consumed by:   Navbar (AuthPopover), Settings menus, Context menus
 *
 * @example
 * <MenuItem icon={<PersonIcon />} label="My Account" onClick={fn} />
 * <MenuItem icon={<LogoutIcon />} label="Sign out" danger onClick={fn} />
 * <MenuItem icon={<SignInIcon />} label="Sign in" subtitle="Existing account"
 *   iconBg onClick={fn} />
 */

import { ReactNode } from 'react';

interface MenuItemProps {
  /** Icon element (SVG or React node) */
  icon: ReactNode;
  /** Primary label text */
  label: string;
  /** Secondary text below label */
  subtitle?: string;
  /** Click handler */
  onClick: () => void;
  /** Danger variant — red text and red hover bg (for destructive actions) */
  danger?: boolean;
  /** Wrap icon in a 32px rounded background square */
  iconBg?: boolean;
  /** Minimum tap target height in px. Default: 40, mobile: 44 */
  minHeight?: number;
}

export function MenuItem({
  icon,
  label,
  subtitle,
  onClick,
  danger = false,
  iconBg = false,
  minHeight = 40,
}: MenuItemProps) {
  const hoverBg = danger
    ? 'hover:bg-[#fef5f5] active:bg-[#fde8e8]'
    : 'hover:bg-[#fafafa] active:bg-[#f5f5f5]';

  const textColor = danger ? 'text-[#b01f24]' : 'text-[#141016]';
  const iconColor = danger ? 'text-[#b01f24]' : 'text-[#656565]';

  return (
    <button
      role="menuitem"
      onClick={onClick}
      className={`
        flex items-center gap-2.5 w-full px-3 py-2.5
        rounded-[8px] ${hoverBg}
        transition-colors touch-manipulation text-left
      `}
      style={{ minHeight }}
    >
      {iconBg ? (
        <div className="size-[32px] rounded-[8px] bg-[#f5f5f5] flex items-center justify-center flex-shrink-0">
          <span className={`size-[14px] ${iconColor}`}>{icon}</span>
        </div>
      ) : (
        <span className={`size-[14px] flex-shrink-0 ${iconColor}`}>{icon}</span>
      )}

      {subtitle ? (
        <div>
          <p className={`font-nav font-medium text-[13px] ${textColor}`}>
            {label}
          </p>
          <p className="font-nav text-[10px] text-[#999999]">
            {subtitle}
          </p>
        </div>
      ) : (
        <span className={`font-nav text-[13px] ${textColor}`}>
          {label}
        </span>
      )}
    </button>
  );
}
