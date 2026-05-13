/**
 * ConnectCard Component
 * 
 * An email subscription card for the services dropdown.
 * Allows users to sign up for insights and updates.
 * 
 * @component
 * @example
 * ```tsx
 * <ConnectCard />
 * ```
 * 
 * Features:
 * - Title and description
 * - Email input field with subtle styling
 * - Gray gradient CTA button with overlay effect
 * - Full form functionality
 * - Light gray background (#f7f7f7)
 * 
 * Design Specifications:
 * - Background: #f7f7f7 (light gray)
 * - Border: 0.5px rgba(20,16,22,0.1)
 * - Title: 20px DM Sans Medium, black, line-height 24px
 * - Description: 12px DM Sans Regular, black, line-height 16.8px
 * - Uses Input and GradientButton components
 */

import { useState } from 'react';
import { Input } from './ui/Input';
import { GradientButton } from './ui/GradientButton';

export function ConnectCard() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    // Handle form submission
    setEmail('');
  };

  return (
    <div className="bg-[#f7f7f7] relative rounded-[15px] shrink-0 w-full">
      {/* Border */}
      <div 
        aria-hidden="true" 
        className="absolute border-[0.5px] border-[rgba(20,16,22,0.1)] border-solid inset-0 pointer-events-none rounded-[15px]" 
      />
      
      {/* Content */}
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start justify-center p-[24px] relative w-full">
          {/* Title */}
          <div className="flex flex-col items-start relative shrink-0 w-full">
            <div className="flex flex-col items-start relative shrink-0 w-full">
              <div 
                className="flex flex-col font-nav font-medium justify-center leading-[0] relative shrink-0 text-[20px] text-black w-full"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                <p className="leading-[24px] whitespace-pre-wrap">Lets Connect and Build</p>
              </div>
            </div>
          </div>

          {/* Description + Form Container */}
          <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-full">
            {/* Description */}
            <div className="flex flex-col items-start relative shrink-0 w-full">
              <div className="relative shrink-0 w-full">
                <div className="content-stretch flex flex-col items-start pl-[3.19px] pr-[22.89px] relative w-full">
                  <div 
                    className="flex flex-col font-nav font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-black w-full"
                    style={{ fontVariationSettings: "'opsz' 9" }}
                  >
                    <p className="leading-[16.8px] whitespace-pre-wrap">Get daily Dose of Pure Insights, without any nonsense flyers.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Input - Using reusable Input component */}
            <form onSubmit={handleSubmit} className="w-full">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                required
              />
            </form>
          </div>

          {/* Submit Button - Using reusable GradientButton component */}
          <div className="content-stretch flex flex-col items-start relative shrink-0">
            <GradientButton onClick={handleSubmit} type="submit">
              Connect now
            </GradientButton>
          </div>
        </div>
      </div>
    </div>
  );
}