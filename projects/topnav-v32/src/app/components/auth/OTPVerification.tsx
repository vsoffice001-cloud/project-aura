/**
 * OTPVerification - 6-digit OTP entry screen
 * 
 * Features:
 * - 6 individual digit input boxes
 * - Auto-focus first box, auto-advance on input
 * - Paste support (full 6-digit paste)
 * - Backspace navigates to previous box
 * - 30s resend countdown timer
 * - Error states: invalid, expired, max attempts
 * - Shake animation on error
 * 
 * Prototype: Any 6 digits verifies successfully.
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { AuthLayout } from './AuthLayout';
import { useAuth } from '../../context/AuthContext';

type OTPError = '' | 'incomplete' | 'invalid' | 'expired' | 'max_attempts' | 'network';

const ERROR_MESSAGES: Record<OTPError, string> = {
  '': '',
  incomplete: 'Please enter all 6 digits',
  invalid: 'Invalid code. Please check and try again.',
  expired: 'Code expired. Please request a new one.',
  max_attempts: 'Too many failed attempts. Please request a new code.',
  network: 'Connection error. Please check your internet and try again.',
};

export function OTPVerification() {
  const navigate = useNavigate();
  const { authEmail, authMode, loginQuick } = useAuth();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [error, setError] = useState<OTPError>('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [resendCountdown, setResendCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  // Redirect if no email
  useEffect(() => {
    if (!authEmail) {
      navigate('/auth?mode=signin', { replace: true });
    }
  }, [authEmail, navigate]);

  // Resend countdown timer
  useEffect(() => {
    if (resendCountdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setResendCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  // Auto-focus first input
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    const digit = value.replace(/\D/g, '').slice(-1);
    
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (error) setError('');

    // Auto-advance
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    
    const newOtp = Array(6).fill('');
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);
    if (error) setError('');
    
    // Focus appropriate input
    const focusIndex = Math.min(pasted.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerify = useCallback(async () => {
    const code = otp.join('');

    // Check completion
    if (code.length < 6) {
      setError('incomplete');
      setShakeKey((prev) => prev + 1);
      return;
    }

    // Check max attempts
    if (attempts >= 3) {
      setError('max_attempts');
      setOtp(Array(6).fill(''));
      return;
    }

    setIsVerifying(true);
    setAttempts((prev) => prev + 1);

    // Simulate verification delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsVerifying(false);

    // Prototype: any 6 digits succeeds, except "000000" simulates invalid
    if (code === '000000') {
      setError('invalid');
      setShakeKey((prev) => prev + 1);
      return;
    }

    // Prototype: "111111" simulates expired
    if (code === '111111') {
      setError('expired');
      setShakeKey((prev) => prev + 1);
      return;
    }

    // Success!
    if (authMode === 'signup') {
      navigate('/auth/complete-profile');
    } else {
      // Sign in — quick login and go to success
      loginQuick(authEmail);
      navigate('/auth/success');
    }
  }, [otp, attempts, authMode, navigate, authEmail, loginQuick]);

  const handleResend = () => {
    if (!canResend) return;
    setOtp(Array(6).fill(''));
    setError('');
    setAttempts(0);
    setResendCountdown(30);
    setCanResend(false);
    inputRefs.current[0]?.focus();
  };

  const handleChangeEmail = () => {
    navigate(`/auth?mode=${authMode}`, { replace: true });
  };

  const isOtpComplete = otp.every((d) => d !== '');
  const isDisabled = isVerifying || error === 'max_attempts';

  return (
    <AuthLayout onBack={handleChangeEmail}>
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="font-nav text-[24px] font-bold text-[#141016] mb-1">
          Verify Your Email
        </h1>
        <p className="font-nav text-[14px] text-[#656565] mb-2">
          A 6-digit code has been sent to
        </p>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-nav text-[14px] font-medium text-[#141016]">
            {authEmail}
          </span>
        </div>
        <button
          onClick={handleChangeEmail}
          className="font-nav text-[12px] text-[#656565] hover:text-[#b01f24] transition-colors underline underline-offset-2 mb-6 inline-flex items-center gap-1"
        >
          Not your email? Change
          <svg className="size-[10px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" />
          </svg>
        </button>
      </motion.div>

      {/* OTP Input Boxes */}
      <motion.div
        key={shakeKey}
        animate={shakeKey > 0 ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <div
          className="flex gap-2.5 justify-center mb-4"
          onPaste={handlePaste}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              disabled={isDisabled}
              autoComplete="one-time-code"
              className={`
                w-[48px] h-[56px]
                text-center font-nav text-[20px] font-bold text-[#141016]
                bg-[#fafafa] rounded-[10px]
                border-[1.5px] transition-all duration-200
                outline-none
                focus:bg-white focus:border-[#141016] focus:ring-1 focus:ring-[rgba(20,16,22,0.1)]
                disabled:opacity-40 disabled:cursor-not-allowed
                ${error
                  ? 'border-[#b01f24] bg-[#fef5f5]'
                  : digit
                    ? 'border-[#141016]/30 bg-white'
                    : 'border-[rgba(20,16,22,0.1)]'
                }
              `}
              aria-label={`Digit ${index + 1}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mb-4"
          >
            <p
              className="font-nav text-[12px] text-[#b01f24] text-center flex items-center justify-center gap-1"
              role="alert"
            >
              <svg className="size-[12px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              {ERROR_MESSAGES[error]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Verify Button */}
      <motion.button
        onClick={handleVerify}
        disabled={isDisabled}
        whileTap={{ scale: 0.98 }}
        className={`
          w-full py-3.5 px-6
          rounded-[10px]
          font-nav text-[14px] font-bold text-white
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          flex items-center justify-center gap-2
          ${isOtpComplete && !isDisabled
            ? 'bg-gradient-to-r from-[#b01f24] via-[#eb484e] to-[#b01f24] shadow-[0px_2px_8px_-2px_rgba(176,31,36,0.3)] hover:shadow-[0px_4px_16px_-2px_rgba(176,31,36,0.4)] focus-visible:ring-[rgba(176,31,36,0.5)]'
            : 'bg-[#e6e6e6] text-[#999999] cursor-not-allowed focus-visible:ring-[rgba(20,16,22,0.3)]'
          }
        `}
        style={{ minHeight: '48px' }}
      >
        {isVerifying ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="size-[16px] border-2 border-white/30 border-t-white rounded-full"
            />
            Verifying...
          </>
        ) : (
          'Verify & Continue'
        )}
      </motion.button>

      {/* Resend */}
      <div className="mt-5 text-center">
        <p className="font-nav text-[13px] text-[#656565]">
          Didn't receive it?{' '}
          {canResend ? (
            <button
              onClick={handleResend}
              className="font-medium text-[#141016] hover:text-[#b01f24] transition-colors underline underline-offset-2"
            >
              Resend
            </button>
          ) : (
            <span className="text-[#999999]">
              Resend in {resendCountdown}s
            </span>
          )}
        </p>
      </div>
    </AuthLayout>
  );
}