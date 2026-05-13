/**
 * QuizCard Component
 * 
 * A promotional card for the quiz feature in the services dropdown.
 * Encourages users to take a quiz with a gradient CTA link.
 * 
 * @component
 * @example
 * ```tsx
 * <QuizCard />
 * ```
 * 
 * Features:
 * - Light background (#fcfcfc) with subtle border and shadow
 * - Heading, description, and gradient CTA
 * - Matches design system styling
 * 
 * Design Specifications:
 * - Background: #fcfcfc
 * - Border: 0.5px rgba(20,16,22,0.1)
 * - Shadow: 0px 1px 16px 0px rgba(128,108,224,0.2)
 * - Padding: 24px
 * - Gap: 8px between elements
 * - Title: 16px DM Sans Medium, black, line-height 24px
 * - Description: 12px DM Sans Regular, black, line-height 18px
 * - CTA: Gradient link (red)
 */

import { GradientCTA } from './GradientCTA';

export function QuizCard() {
  return (
    <div className="bg-[#fcfcfc] relative rounded-[15px] shrink-0 w-full">
      {/* Border and Shadow Overlay */}
      <div 
        aria-hidden="true" 
        className="absolute border-[0.5px] border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[15px] shadow-[0px_1px_16px_0px_rgba(128,108,224,0.2)]" 
      />
      
      {/* Content */}
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[24px] relative w-full">
        {/* Title */}
        <div className="flex flex-col items-start relative shrink-0">
          <div className="flex flex-col items-start relative shrink-0 w-full">
            <div 
              className="flex flex-col font-nav font-medium justify-center leading-[0] relative shrink-0 text-[16px] text-black whitespace-nowrap"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              <p className="leading-[24px]">Take a quiz</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col items-start relative shrink-0 w-full">
          <div 
            className="flex flex-col font-nav font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-black w-full"
            style={{ fontVariationSettings: "'opsz' 9" }}
          >
            <p className="leading-[18px] whitespace-pre-wrap">Lets start with the topics you are looking for.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-start relative shrink-0">
          <GradientCTA 
            text="Start now" 
            href="#quiz"
            className="font-medium"
          />
        </div>
      </div>
    </div>
  );
}