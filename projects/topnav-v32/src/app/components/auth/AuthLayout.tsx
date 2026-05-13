/**
 * AuthLayout - Shared card wrapper for all auth screens
 * 
 * Centered white card on light background with:
 * - Ken Research logo at top
 * - Consistent padding, border radius, shadow
 * - Responsive: 420px max-width on desktop, full-width mobile
 * - DM Sans font, WCAG compliant
 * 
 * Supports two dismissal patterns:
 * - onBack: Left arrow next to logo (for stepping back within auth flow)
 * - onClose: X button top-right + click-outside-to-dismiss (for exiting auth entirely)
 */

import { useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import LogoContainer from '../../../imports/LogoContainer';
import { useNavigate } from 'react-router';

interface AuthLayoutProps {
  children: React.ReactNode;
  /** Optional back handler — shows a back arrow next to logo */
  onBack?: () => void;
  /** Optional close handler — shows X button top-right + click-outside dismisses */
  onClose?: () => void;
}

export function AuthLayout({ children, onBack, onClose }: AuthLayoutProps) {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  // Click outside the card → close (only when onClose is provided)
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (onClose && cardRef.current && !cardRef.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <div
      className={`min-h-[calc(100vh-100px)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-[#fcfcfc] via-white to-[#fafafa] ${onClose ? 'cursor-pointer' : ''}`}
      onClick={handleBackdropClick}
    >
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`w-full max-w-[420px] ${onClose ? 'cursor-default' : ''}`}
      >
        {/* Card */}
        <div className="relative bg-white rounded-[16px] border border-[rgba(20,16,22,0.08)] shadow-[0px_4px_24px_-4px_rgba(20,16,22,0.08),0px_1px_4px_-1px_rgba(20,16,22,0.04)] overflow-hidden">
          {/* Header with logo + close */}
          <div className="px-8 pt-8 pb-2">
            <div className="flex items-center justify-between mb-6">
              {/* Left spacer to balance the close button (keeps logo centered) */}
              <div className="size-[32px] flex-shrink-0">
                {onBack && (
                  <button
                    onClick={onBack}
                    className="size-[36px] rounded-[8px] flex items-center justify-center hover:bg-[#f5f5f5] active:bg-[#ebebeb] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(20,16,22,0.5)]"
                    aria-label="Go back"
                  >
                    <svg className="size-[18px] text-[#656565]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                  </button>
                )}
              </div>
              <a
                href="/"
                onClick={(e) => { e.preventDefault(); navigate('/'); }}
                className="h-[20px] flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="Ken Research Home"
              >
                <LogoContainer />
              </a>
              <div className="size-[32px] flex-shrink-0 flex justify-end">
                {onClose && (
                  <button
                    onClick={onClose}
                    className="size-[32px] rounded-full flex items-center justify-center text-[#999999] hover:text-[#141016] hover:bg-[#f5f5f5] active:bg-[#ebebeb] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(20,16,22,0.5)]"
                    aria-label="Close"
                  >
                    <svg className="size-[16px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 pb-8">
            {children}
          </div>
        </div>

        {/* Trust footer */}
        <div className="mt-6 text-center">
          <p className="font-nav text-[11px] text-[#999999]">
            Quick, secure and password-free access
          </p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <div className="flex items-center gap-1">
              <svg className="size-[12px] text-[#999999]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <span className="font-nav text-[10px] text-[#999999]">SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="size-[12px] text-[#999999]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span className="font-nav text-[10px] text-[#999999]">GDPR Compliant</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}