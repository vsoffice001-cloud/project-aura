/**
 * SearchBar — Self-contained search input with beam animation
 *
 * WHY:   The search bar has a complex purple beam orbit animation with SVG
 *        gradient, inner/outer border treatment, and specific sizing.
 *        Isolating it keeps this visual complexity out of the nav layout.
 * WHAT:  A pill-shaped search input (120px wide, 35px tall) with:
 *        - Outer: #f5f5fd bg with purple box-shadow
 *        - Beam: Blurred purple radial gradient orbiting the border
 *        - Inner: #fcfcfc bg with 2px inset, search icon right-aligned
 * WHEN:  Visible only on desktop (≥1024px), between nav triggers and CTA.
 * WHERE: DesktopNavItems organism.
 * HOW:   <SearchBar placeholder="Search" />
 *
 * Props:
 *   placeholder? — Input placeholder text (default: "Search")
 *   onSearch?    — Callback when user types/submits
 *   className?   — Override wrapper styles
 */

import { MagnifyingGlass } from '@phosphor-icons/react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function SearchBar({
  placeholder = 'Search',
  onSearch,
  className = '',
}: SearchBarProps) {
  return (
    <div className={`relative h-[35px] w-[120px] ${className}`}>
      <div className="bg-[#f5f5fd] overflow-clip relative rounded-[99px] shadow-[6.98px_-1.02px_14px_-4px_rgba(128,108,224,0.3)] size-full">
        {/* Purple beam orbit animation */}
        <div
          className="absolute blur-[4px] h-[31px] w-[65px] animate-beam-orbit"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 65 31\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(3.25 0 0 1.55 32.5 15.5)\"><stop stop-color=\"rgba(128,108,224,1)\" offset=\"0\"/><stop stop-color=\"rgba(128,108,224,0)\" offset=\"1\"/></radialGradient></defs></svg>')",
          }}
        />

        {/* Inner input container */}
        <div className="absolute bg-[#fcfcfc] content-stretch flex gap-[12.33px] inset-[2px] items-center px-[8px] rounded-[99px]">
          <div className="flex-1 min-w-0">
            <input
              type="text"
              placeholder={placeholder}
              onChange={(e) => onSearch?.(e.target.value)}
              className="
                bg-transparent
                font-nav font-normal
                text-[#141016] placeholder:text-[#141016]
                outline-none w-full
                text-[14px] leading-[22px]
              "
              style={{ fontVariationSettings: "'opsz' 9" }}
              aria-label="Search Ken Research"
            />
          </div>
          <div className="shrink-0 size-[16px] flex items-center justify-center">
            <MagnifyingGlass size={16} color="#141016" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}