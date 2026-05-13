/**
 * AuthPage - Unified Sign In / Sign Up screen
 * 
 * Features:
 * - Different messaging for sign in vs sign up (via ?mode= query param)
 * - Email input with validation + error states
 * - "Send OTP to Email" CTA (brand red gradient)
 * - "OR" divider
 * - "Continue with LinkedIn" button
 * - Toggle link between sign in / sign up
 * - Rate limiting error state
 * 
 * Prototype: Any valid email format proceeds to OTP screen.
 */

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { AuthLayout } from './AuthLayout';
import { useAuth } from '../../context/AuthContext';

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setAuthMode, setAuthEmail, authMode } = useAuth();

  const mode = (searchParams.get('mode') as 'signin' | 'signup') || 'signin';
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [rateLimitedUntil, setRateLimitedUntil] = useState<number | null>(null);
  const [rateLimitCountdown, setRateLimitCountdown] = useState(0);

  // Sync mode to context
  useEffect(() => {
    setAuthMode(mode);
  }, [mode, setAuthMode]);

  // Rate limit countdown
  useEffect(() => {
    if (!rateLimitedUntil) return;
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((rateLimitedUntil - Date.now()) / 1000));
      setRateLimitCountdown(remaining);
      if (remaining <= 0) {
        setRateLimitedUntil(null);
        setAttempts(0);
        setError('');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [rateLimitedUntil]);

  const isSignUp = mode === 'signup';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Rate limit check
    if (rateLimitedUntil && Date.now() < rateLimitedUntil) {
      return;
    }

    // Validate empty
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    // Validate format
    if (!EMAIL_REGEX.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    // Check rate limit (after 5 attempts)
    if (attempts >= 4) {
      const lockUntil = Date.now() + 5 * 60 * 1000; // 5 minutes
      setRateLimitedUntil(lockUntil);
      setError(`Too many attempts. Please try again in 5 minutes.`);
      return;
    }

    setIsSubmitting(true);
    setAttempts((prev) => prev + 1);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    setAuthEmail(email.trim());
    setIsSubmitting(false);
    navigate('/auth/verify');
  };

  const handleLinkedIn = () => {
    // For prototype, LinkedIn skips OTP entirely
    setAuthEmail('user@company.com');
    if (isSignUp) {
      navigate('/auth/complete-profile');
    } else {
      // For sign-in via LinkedIn, go straight to success
      navigate('/auth/success');
    }
  };

  const toggleMode = () => {
    const newMode = isSignUp ? 'signin' : 'signup';
    navigate(`/auth?mode=${newMode}`, { replace: true });
  };

  return (
    <AuthLayout onClose={() => navigate('/')}>
      {/* Heading */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, x: isSignUp ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isSignUp ? -20 : 20 }}
          transition={{ duration: 0.25 }}
        >
          <h1 className="font-nav text-[24px] font-bold text-[#141016] mb-1">
            {isSignUp ? 'Create Your Account' : 'Welcome Back'}
          </h1>
          <p className="font-nav text-[14px] text-[#656565] mb-6">
            {isSignUp
              ? 'Join the insights trusted by Fortune 2000+ companies'
              : 'Sign in to access your research dashboard'}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Email Form */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="auth-email"
              className="block font-nav text-[12px] font-medium text-[#656565] mb-1.5"
            >
              Work email
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="size-[16px] text-[#999999]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
                placeholder="Enter your work email"
                disabled={isSubmitting || !!rateLimitedUntil}
                autoComplete="email"
                autoFocus
                className={`
                  w-full pl-10 pr-4 py-3
                  bg-[#fafafa] rounded-[10px]
                  border transition-all duration-200
                  font-nav text-[14px] text-[#141016]
                  placeholder:text-[#999999]
                  outline-none
                  focus:bg-white focus:border-[#141016]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${error
                    ? 'border-[#b01f24] bg-[#fef5f5]'
                    : 'border-[rgba(20,16,22,0.1)]'
                  }
                `}
                aria-invalid={!!error}
                aria-describedby={error ? 'email-error' : undefined}
              />
            </div>
            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.p
                  id="email-error"
                  initial={{ opacity: 0, height: 0, y: -4 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="font-nav text-[12px] text-[#b01f24] mt-1.5 flex items-center gap-1"
                  role="alert"
                >
                  <svg className="size-[12px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  {rateLimitedUntil
                    ? `Too many attempts. Try again in ${Math.floor(rateLimitCountdown / 60)}:${String(rateLimitCountdown % 60).padStart(2, '0')}`
                    : error}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting || !!rateLimitedUntil}
            whileTap={{ scale: 0.98 }}
            className={`
              w-full py-3.5 px-6
              bg-gradient-to-r from-[#b01f24] via-[#eb484e] to-[#b01f24]
              rounded-[10px]
              font-nav text-[14px] font-bold text-white
              shadow-[0px_2px_8px_-2px_rgba(176,31,36,0.3)]
              hover:shadow-[0px_4px_16px_-2px_rgba(176,31,36,0.4)]
              active:shadow-[0px_1px_4px_-1px_rgba(176,31,36,0.2)]
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(176,31,36,0.5)] focus-visible:ring-offset-2
              flex items-center justify-center gap-2
            `}
            style={{ minHeight: '48px' }}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="size-[16px] border-2 border-white/30 border-t-white rounded-full"
                />
                Sending...
              </>
            ) : (
              <>
                <svg className="size-[16px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Send OTP to Email
              </>
            )}
          </motion.button>
        </div>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-[1px] bg-[rgba(20,16,22,0.08)]" />
        <span className="font-nav text-[11px] text-[#999999] uppercase tracking-wider">or</span>
        <div className="flex-1 h-[1px] bg-[rgba(20,16,22,0.08)]" />
      </div>

      {/* LinkedIn Button */}
      <button
        onClick={handleLinkedIn}
        className="
          w-full py-3 px-6
          bg-white rounded-[10px]
          border border-[rgba(20,16,22,0.12)]
          font-nav text-[14px] font-medium text-[#141016]
          hover:bg-[#fafafa]
          active:bg-[#f5f5f5]
          transition-all duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(20,16,22,0.3)] focus-visible:ring-offset-2
          flex items-center justify-center gap-2.5
        "
        style={{ minHeight: '48px' }}
      >
        {/* LinkedIn icon */}
        <svg className="size-[18px]" viewBox="0 0 24 24" fill="none">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0A66C2"/>
        </svg>
        Continue with LinkedIn
      </button>

      {/* Toggle link */}
      <div className="mt-6 text-center">
        <p className="font-nav text-[13px] text-[#656565]">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={toggleMode}
            className="font-medium text-[#141016] hover:text-[#b01f24] transition-colors underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(20,16,22,0.3)] rounded-sm"
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}