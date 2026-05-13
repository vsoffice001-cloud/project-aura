/**
 * HamburgerIcon — Animated 3-line hamburger ↔ X toggle icon
 *
 * WHY:   The mobile menu toggle has a 3-bar to X-cross animation.
 *        Extracting it separates visual concern from button behavior.
 * WHAT:  Three horizontal bars (2.5px tall, 24px wide) that animate:
 *        - Bar 1: rotates 45° and translates down to form X
 *        - Bar 2: fades out and scales down
 *        - Bar 3: rotates -45° and translates up to form X
 * WHEN:  Always rendered inside the mobile hamburger <button>.
 * WHERE: MobileControls organism (the hamburger button).
 * HOW:   <HamburgerIcon isOpen={isMobileMenuOpen} />
 *
 * Props:
 *   isOpen — Controls open/closed animation state
 */

interface HamburgerIconProps {
  isOpen: boolean;
}

export function HamburgerIcon({ isOpen }: HamburgerIconProps) {
  return (
    <div className="w-[24px] flex flex-col gap-[5px]" aria-hidden="true">
      <div
        className={`h-[2.5px] bg-[#141016] rounded-full transition-all duration-300 ease-out ${
          isOpen ? 'rotate-45 translate-y-[7.5px]' : ''
        }`}
      />
      <div
        className={`h-[2.5px] bg-[#141016] rounded-full transition-all duration-300 ease-out ${
          isOpen ? 'opacity-0 scale-75' : ''
        }`}
      />
      <div
        className={`h-[2.5px] bg-[#141016] rounded-full transition-all duration-300 ease-out ${
          isOpen ? '-rotate-45 -translate-y-[7.5px]' : ''
        }`}
      />
    </div>
  );
}
