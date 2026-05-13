'use client';

import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface MenuItemProps {
  icon: ReactNode;
  label: string;
  /** Secondary text below label */
  subtitle?: string;
  onClick: () => void;
  /** Danger variant — red text + red hover bg (destructive actions) */
  danger?: boolean;
  /** Wrap icon in 32px rounded background square */
  iconBg?: boolean;
  /** Min tap target height in px. Default 40 (mobile = 44 recommended). */
  minHeight?: number;
}

/**
 * MenuItem — popover/dropdown menu row (icon + label + optional subtitle).
 *
 * Used in: AuthPopover (sign-in / account / sign-out), settings menus, context menus.
 *
 * @promotedFrom topnav-v32/src/design-system/components/MenuItem.tsx
 */
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
    ? 'hover:bg-[var(--semantic-status-error-bg)] active:bg-[var(--semantic-status-error-bg-hover)]'
    : 'hover:bg-[var(--color-ramp-black-50)] active:bg-[var(--color-ramp-black-100)]';

  const textColor = danger ? 'text-[var(--color-brand-red)]' : 'text-[var(--surface-text)]';
  const iconColor = danger ? 'text-[var(--color-brand-red)]' : 'text-[var(--surface-text-muted)]';

  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className={cn(
        'flex items-center gap-2.5 w-full px-3 py-2.5 rounded-[8px]',
        'transition-colors touch-manipulation text-left bg-transparent border-none cursor-pointer',
        hoverBg,
      )}
      style={{ minHeight }}
    >
      {iconBg ? (
        <div className="size-[32px] rounded-[8px] bg-[var(--color-ramp-black-100)] flex items-center justify-center flex-shrink-0">
          <span className={cn('size-[14px]', iconColor)}>{icon}</span>
        </div>
      ) : (
        <span className={cn('size-[14px] flex-shrink-0', iconColor)}>{icon}</span>
      )}

      {subtitle ? (
        <div>
          <p className={cn('font-[var(--typography-family-body)] font-medium text-[13px]', textColor)}>{label}</p>
          <p className="font-[var(--typography-family-body)] text-[10px] text-[var(--surface-text-subtle)]">{subtitle}</p>
        </div>
      ) : (
        <span className={cn('font-[var(--typography-family-body)] text-[13px]', textColor)}>{label}</span>
      )}
    </button>
  );
}
