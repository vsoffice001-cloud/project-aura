/**
 * DropdownChevron — Animated rotating chevron SVG
 *
 * WHY:   Used in 6 dropdown triggers (Company + 5 main nav items).
 *        Each had identical SVG markup with rotation logic.
 * WHAT:  A downward-pointing chevron that rotates 180° when `isOpen` is true.
 *        Two sizes: 10px (secondary bar) and 12px (primary nav).
 * WHEN:  Always paired with a dropdown trigger label.
 * WHERE: NavDropdownTrigger molecule, SecondaryBar Company trigger.
 * HOW:   <DropdownChevron isOpen={isDropdownOpen} size={12} />
 *
 * Props:
 *   isOpen — Controls 180° rotation (true = pointing up)
 *   size   — 10 | 12 (px), default 12
 */

interface DropdownChevronProps {
  isOpen: boolean;
  size?: 10 | 12;
}

export function DropdownChevron({ isOpen, size = 12 }: DropdownChevronProps) {
  const viewBox = size === 10 ? '0 0 10 10' : '0 0 12 12';
  const path = size === 10
    ? 'M8 3.5L5 6.5L2 3.5'
    : 'M9.75 4.5L6 8.25L2.25 4.5';

  return (
    <svg
      className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      style={{ width: size, height: size }}
      fill="none"
      viewBox={viewBox}
      aria-hidden="true"
    >
      <path
        d={path}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}