/**
 * SuccessScreen - Post-auth confirmation
 * 
 * Sign In: "Welcome back, [Name]!"
 * Sign Up: "You're All Set!"
 * 
 * Features:
 * - Animated green checkmark (circle drawing in)
 * - Auto-redirect to homepage after 5s with progress indicator
 * - Manual CTA button to proceed immediately
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import LogoContainer from '../../../imports/LogoContainer';

export function SuccessScreen() {
  const navigate = useNavigate();
  const { user, authMode, isAuthenticated } = useAuth();
  const [countdown, setCountdown] = useState(5);

  const isSignUp = authMode === 'signup';

  // Auto-redirect countdown
  useEffect(() => {
    if (countdown <= 0) {
      navigate('/', { replace: true });
      return;
    }
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  // Redirect if not authenticated (direct URL access)
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth?mode=signin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleCTA = () => {
    navigate('/', { replace: true });
  };

  const displayName = user?.name?.split(' ')[0] || 'User';

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-[#fcfcfc] via-white to-[#fafafa]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-[420px] text-center"
      >
        {/* Card */}
        <div className="bg-white rounded-[16px] border border-[rgba(20,16,22,0.08)] shadow-[0px_4px_24px_-4px_rgba(20,16,22,0.08)] px-8 py-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); handleCTA(); }}
              className="h-[20px] w-[130px] flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <LogoContainer />
            </a>
          </div>

          {/* Animated Checkmark */}
          <div className="flex justify-center mb-6">
            <div className="relative size-[72px]">
              {/* Circle */}
              <motion.svg
                viewBox="0 0 72 72"
                className="size-full"
                initial="hidden"
                animate="visible"
              >
                <motion.circle
                  cx="36"
                  cy="36"
                  r="33"
                  fill="none"
                  stroke="#e8f5e9"
                  strokeWidth="3"
                />
                <motion.circle
                  cx="36"
                  cy="36"
                  r="33"
                  fill="none"
                  stroke="#2e7d32"
                  strokeWidth="3"
                  strokeLinecap="round"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: {
                      pathLength: 1,
                      opacity: 1,
                      transition: { duration: 0.6, ease: 'easeOut' },
                    },
                  }}
                  style={{
                    rotate: -90,
                    transformOrigin: 'center',
                  }}
                />
                {/* Checkmark */}
                <motion.path
                  d="M24 36L32 44L48 28"
                  fill="none"
                  stroke="#2e7d32"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: {
                      pathLength: 1,
                      opacity: 1,
                      transition: { duration: 0.4, delay: 0.5, ease: 'easeOut' },
                    },
                  }}
                />
              </motion.svg>
            </div>
          </div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            <h1 className="font-nav text-[24px] font-bold text-[#141016] mb-2">
              {isSignUp ? "You're All Set!" : `Welcome back, ${displayName}!`}
            </h1>
            <p className="font-nav text-[14px] text-[#656565] mb-8">
              {isSignUp
                ? 'Your account has been created successfully.'
                : "You're all set. Let's pick up where you left off."}
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            onClick={handleCTA}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            whileTap={{ scale: 0.98 }}
            className="
              w-full py-3.5 px-6
              bg-gradient-to-r from-[#b01f24] via-[#eb484e] to-[#b01f24]
              rounded-[10px]
              font-nav text-[14px] font-bold text-white
              shadow-[0px_2px_8px_-2px_rgba(176,31,36,0.3)]
              hover:shadow-[0px_4px_16px_-2px_rgba(176,31,36,0.4)]
              transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(176,31,36,0.5)] focus-visible:ring-offset-2
              flex items-center justify-center gap-2
            "
            style={{ minHeight: '48px' }}
          >
            {isSignUp ? 'Explore Reports' : 'Go to Dashboard'}
            <svg className="size-[16px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </motion.button>

          {/* Auto-redirect progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
            className="mt-5"
          >
            <p className="font-nav text-[11px] text-[#999999] mb-2">
              Redirecting in {countdown}s...
            </p>
            <div className="w-full h-[3px] bg-[#f5f5f5] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 5, ease: 'linear' }}
                className="h-full bg-gradient-to-r from-[#b01f24] to-[#eb484e] rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}