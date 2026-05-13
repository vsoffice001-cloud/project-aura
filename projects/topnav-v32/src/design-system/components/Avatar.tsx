/**
 * Avatar — Circular avatar with initials, icon fallback, and status dot
 *
 * Design System primitive. Renders user initials when authenticated,
 * or a person silhouette when not. Supports size variants and active state.
 *
 * Promoted from: navbar/molecules/AuthAvatar.tsx
 * Consumed by:   Navbar (MobileControls, SecondaryBar), Profile pages, Comments
 *
 * @example
 * <Avatar size="sm" initials="JD" isActive={false} onClick={fn} />
 * <Avatar size="md" isActive={isOpen} onClick={toggle} ref={btnRef} />
 * <Avatar size="md" initials="AB" showDot={false} onClick={fn} />
 */

import { forwardRef } from 'react';
import { StatusDot } from './StatusDot';

interface AvatarProps {
  /** 'sm' = 28px (inline, desktop), 'md' = 40px (standalone, mobile) */
  size?: 'sm' | 'md';
  /** User initials — if provided, renders text; if omitted, renders person icon */
  initials?: string | null;
  /** Active state — darkens border, indicates expanded popover */
  isActive: boolean;
  /** Click handler */
  onClick: () => void;
  /** Show the notification dot. Default: shows when no initials (unauthenticated) */
  showDot?: boolean;
  /** Dot color. Default: brand red */
  dotColor?: string;
  /** Accessible label. Default: 'Account options' */
  ariaLabel?: string;
}

const sizeConfig = {
  sm: {
    container: 'size-[28px]',
    text: 'text-[11px]',
    icon: 'size-[14px]',
    iconStroke: 1.8,
  },
  md: {
    container: 'size-[40px]',
    text: 'text-[13px]',
    icon: 'size-[18px]',
    iconStroke: 1.8,
  },
};

export const Avatar = forwardRef<HTMLButtonElement, AvatarProps>(
  (
    {
      size = 'md',
      initials,
      isActive,
      onClick,
      showDot,
      dotColor = '#b01f24',
      ariaLabel = 'Account options',
    },
    ref
  ) => {
    const config = sizeConfig[size];
    const isAuthenticated = !!initials;
    const shouldShowDot = showDot ?? !isAuthenticated;

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        aria-expanded={isActive}
        aria-haspopup="true"
        className={`
          relative flex items-center justify-center
          ${config.container} rounded-full
          border-[1.5px] transition-all duration-200
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-[rgba(20,16,22,0.5)] focus-visible:ring-offset-2
          ${size === 'md' ? 'touch-manipulation' : ''}
          ${isActive
            ? 'border-[#141016] bg-[#f5f5f5] text-[#141016]'
            : 'border-[rgba(20,16,22,0.15)] bg-[#fafafa] text-[#141016] hover:border-[#141016]/40 hover:bg-[#f5f5f5]'
          }
          ${size === 'md' && !isActive ? 'active:bg-[#ebebeb]' : ''}
        `}
      >
        {isAuthenticated ? (
          <span className={`font-nav ${config.text} font-bold text-[#141016]`}>
            {initials}
          </span>
        ) : (
          <svg
            className={`${config.icon} text-[#656565]`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={config.iconStroke}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        )}

        <StatusDot visible={shouldShowDot} color={dotColor} />
      </button>
    );
  }
);

Avatar.displayName = 'Avatar';
