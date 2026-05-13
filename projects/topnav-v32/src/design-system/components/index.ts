/**
 * Design System Components — Barrel Export
 *
 * Generic, reusable UI primitives that form the foundation
 * of all Ken Research interfaces. Feature packages (navbar,
 * auth, mobile) consume these rather than owning their own.
 *
 * Component Inventory:
 *   Avatar    — Circular avatar with initials/icon + status dot
 *   Button    — Brand button with shimmer, ripple, 4 variants/4 sizes
 *   Divider   — Horizontal/vertical separator line
 *   Logo      — Brand logo
 *   MenuItem  — Popover/dropdown row (icon + label + subtitle)
 *   SkipLink  — WCAG skip-to-content accessibility link
 *   StatusDot — Notification/status indicator circle
 *   TextLink  — Inline text link with hover color transition
 */

export { Avatar } from './Avatar';
export { Button } from './Button';
export type { ButtonVariant, ButtonSize, ButtonBackground } from './Button';
export { Divider } from './Divider';
export { Logo } from './Logo';
export { MenuItem } from './MenuItem';
export { SkipLink } from './SkipLink';
export { StatusDot } from './StatusDot';
export { TextLink } from './TextLink';