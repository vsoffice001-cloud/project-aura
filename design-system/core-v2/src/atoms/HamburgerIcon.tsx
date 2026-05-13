export interface HamburgerIconProps {
  isOpen: boolean;
}

/**
 * HamburgerIcon — animated 3-line hamburger ↔ X toggle.
 *
 * Bar 1: rotates 45° + translates down to form X.
 * Bar 2: fades out + scales down.
 * Bar 3: rotates -45° + translates up to form X.
 *
 * Always rendered inside mobile hamburger button.
 *
 * @promotedFrom topnav-v32/src/app/components/navbar/atoms/HamburgerIcon.tsx
 */
export function HamburgerIcon({ isOpen }: HamburgerIconProps) {
  return (
    <div className="w-[24px] flex flex-col gap-[5px]" aria-hidden="true">
      <div
        className={`h-[2.5px] bg-[var(--color-foundation-black)] rounded-full transition-all duration-300 ease-out ${
          isOpen ? 'rotate-45 translate-y-[7.5px]' : ''
        }`}
      />
      <div
        className={`h-[2.5px] bg-[var(--color-foundation-black)] rounded-full transition-all duration-300 ease-out ${
          isOpen ? 'opacity-0 scale-75' : ''
        }`}
      />
      <div
        className={`h-[2.5px] bg-[var(--color-foundation-black)] rounded-full transition-all duration-300 ease-out ${
          isOpen ? '-rotate-45 -translate-y-[7.5px]' : ''
        }`}
      />
    </div>
  );
}
