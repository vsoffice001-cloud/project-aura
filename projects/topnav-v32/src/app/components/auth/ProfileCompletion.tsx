/**
 * ProfileCompletion - Post-signup profile form
 * 
 * Fields:
 * - Full Name (text input, required)
 * - Work Email (verified badge, non-editable, pre-filled)
 * - Company Name (pre-populated from email domain, editable)
 * - Designation (dropdown select)
 * 
 * Error states for each field.
 * "Skip for now" option available.
 * 
 * Prototype: No real API — validates locally and proceeds.
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { AuthLayout } from './AuthLayout';
import { useAuth, extractCompanyFromEmail } from '../../context/AuthContext';

const DESIGNATIONS = [
  { value: '', label: 'Select your designation' },
  { value: 'analyst', label: 'Analyst' },
  { value: 'senior_analyst', label: 'Senior Analyst' },
  { value: 'manager', label: 'Manager' },
  { value: 'senior_manager', label: 'Senior Manager' },
  { value: 'director', label: 'Director' },
  { value: 'vp', label: 'VP / AVP' },
  { value: 'c_suite', label: 'C-Suite (CEO, CTO, CFO, etc.)' },
  { value: 'consultant', label: 'Consultant' },
  { value: 'researcher', label: 'Researcher / Academic' },
  { value: 'student', label: 'Student' },
  { value: 'other', label: 'Other' },
];

interface FieldErrors {
  name: string;
  company: string;
  designation: string;
}

export function ProfileCompletion() {
  const navigate = useNavigate();
  const { authEmail, login } = useAuth();

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [designation, setDesignation] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({ name: '', company: '', designation: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  // Redirect if no email
  useEffect(() => {
    if (!authEmail) {
      navigate('/auth?mode=signup', { replace: true });
    }
  }, [authEmail, navigate]);

  // Pre-populate company from email domain
  useEffect(() => {
    if (authEmail) {
      setCompany(extractCompanyFromEmail(authEmail));
    }
  }, [authEmail]);

  const validate = (): boolean => {
    const newErrors: FieldErrors = { name: '', company: '', designation: '' };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Please enter your full name';
      isValid = false;
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    if (!company.trim()) {
      newErrors.company = 'Please enter your company name';
      isValid = false;
    }

    if (!designation) {
      newErrors.designation = 'Please select your designation';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    login({
      email: authEmail,
      name: name.trim(),
      company: company.trim(),
      designation: DESIGNATIONS.find((d) => d.value === designation)?.label || designation,
      initials: '',
    });

    setIsSubmitting(false);
    navigate('/auth/success');
  };

  const handleSkip = () => {
    login({
      email: authEmail,
      name: authEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      company: extractCompanyFromEmail(authEmail),
      designation: '',
      initials: '',
    });
    navigate('/auth/success');
  };

  const clearFieldError = (field: keyof FieldErrors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <AuthLayout onBack={() => navigate('/auth/verify')}>
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="font-nav text-[24px] font-bold text-[#141016] mb-1">
          Complete Your Profile
        </h1>
        <p className="font-nav text-[14px] text-[#656565] mb-6">
          Help us personalize your experience
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-4">
          {/* Verified Email (non-editable) */}
          <div>
            <label className="block font-nav text-[12px] font-medium text-[#656565] mb-1.5">
              Work email
            </label>
            <div className="
              flex items-center gap-2 px-3 py-3
              bg-[#f5f5f5] rounded-[10px]
              border border-[rgba(20,16,22,0.06)]
            ">
              <svg className="size-[16px] text-[#999999] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <span className="font-nav text-[14px] text-[#656565] flex-1 min-w-0 truncate">
                {authEmail}
              </span>
              <div className="flex items-center gap-1 flex-shrink-0 px-2 py-0.5 bg-[#e8f5e9] rounded-full">
                <svg className="size-[10px] text-[#2e7d32]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="font-nav text-[10px] font-medium text-[#2e7d32]">Verified</span>
              </div>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label
              htmlFor="profile-name"
              className="block font-nav text-[12px] font-medium text-[#656565] mb-1.5"
            >
              Full name <span className="text-[#b01f24]">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="size-[16px] text-[#999999]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); clearFieldError('name'); }}
                placeholder="Enter your full name"
                disabled={isSubmitting}
                autoFocus
                autoComplete="name"
                className={`
                  w-full pl-10 pr-4 py-3
                  bg-[#fafafa] rounded-[10px]
                  border transition-all duration-200
                  font-nav text-[14px] text-[#141016]
                  placeholder:text-[#999999]
                  outline-none
                  focus:bg-white focus:border-[#141016] focus:ring-1 focus:ring-[rgba(20,16,22,0.1)]
                  disabled:opacity-50
                  ${errors.name ? 'border-[#b01f24] bg-[#fef5f5]' : 'border-[rgba(20,16,22,0.1)]'}
                `}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
            </div>
            <AnimatePresence>
              {errors.name && (
                <motion.p
                  id="name-error"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="font-nav text-[12px] text-[#b01f24] mt-1.5 flex items-center gap-1"
                  role="alert"
                >
                  <svg className="size-[12px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  {errors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Company Name */}
          <div>
            <label
              htmlFor="profile-company"
              className="block font-nav text-[12px] font-medium text-[#656565] mb-1.5"
            >
              Company name <span className="text-[#b01f24]">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="size-[16px] text-[#999999]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
              </div>
              <input
                id="profile-company"
                type="text"
                value={company}
                onChange={(e) => { setCompany(e.target.value); clearFieldError('company'); }}
                placeholder="Enter your company name"
                disabled={isSubmitting}
                autoComplete="organization"
                className={`
                  w-full pl-10 pr-4 py-3
                  bg-[#fafafa] rounded-[10px]
                  border transition-all duration-200
                  font-nav text-[14px] text-[#141016]
                  placeholder:text-[#999999]
                  outline-none
                  focus:bg-white focus:border-[#141016] focus:ring-1 focus:ring-[rgba(20,16,22,0.1)]
                  disabled:opacity-50
                  ${errors.company ? 'border-[#b01f24] bg-[#fef5f5]' : 'border-[rgba(20,16,22,0.1)]'}
                `}
                aria-invalid={!!errors.company}
                aria-describedby={errors.company ? 'company-error' : undefined}
              />
            </div>
            <AnimatePresence>
              {errors.company && (
                <motion.p
                  id="company-error"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="font-nav text-[12px] text-[#b01f24] mt-1.5 flex items-center gap-1"
                  role="alert"
                >
                  <svg className="size-[12px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  {errors.company}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Designation Dropdown */}
          <div>
            <label
              htmlFor="profile-designation"
              className="block font-nav text-[12px] font-medium text-[#656565] mb-1.5"
            >
              Designation <span className="text-[#b01f24]">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-[1]">
                <svg className="size-[16px] text-[#999999]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <select
                id="profile-designation"
                value={designation}
                onChange={(e) => { setDesignation(e.target.value); clearFieldError('designation'); }}
                onFocus={() => setIsSelectOpen(true)}
                onBlur={() => setIsSelectOpen(false)}
                disabled={isSubmitting}
                className={`
                  w-full pl-10 pr-10 py-3
                  bg-[#fafafa] rounded-[10px]
                  border transition-all duration-200
                  font-nav text-[14px]
                  outline-none appearance-none
                  focus:bg-white focus:border-[#141016] focus:ring-1 focus:ring-[rgba(20,16,22,0.1)]
                  disabled:opacity-50
                  ${!designation ? 'text-[#999999]' : 'text-[#141016]'}
                  ${errors.designation ? 'border-[#b01f24] bg-[#fef5f5]' : 'border-[rgba(20,16,22,0.1)]'}
                `}
                aria-invalid={!!errors.designation}
                aria-describedby={errors.designation ? 'designation-error' : undefined}
              >
                {DESIGNATIONS.map((d) => (
                  <option key={d.value} value={d.value} disabled={d.value === ''}>
                    {d.label}
                  </option>
                ))}
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className={`size-[14px] text-[#999999] transition-transform duration-200 ${isSelectOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </div>
            <AnimatePresence>
              {errors.designation && (
                <motion.p
                  id="designation-error"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="font-nav text-[12px] text-[#b01f24] mt-1.5 flex items-center gap-1"
                  role="alert"
                >
                  <svg className="size-[12px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  {errors.designation}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileTap={{ scale: 0.98 }}
            className="
              w-full py-3.5 px-6 mt-2
              bg-gradient-to-r from-[#b01f24] via-[#eb484e] to-[#b01f24]
              rounded-[10px]
              font-nav text-[14px] font-bold text-white
              shadow-[0px_2px_8px_-2px_rgba(176,31,36,0.3)]
              hover:shadow-[0px_4px_16px_-2px_rgba(176,31,36,0.4)]
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(176,31,36,0.5)] focus-visible:ring-offset-2
              flex items-center justify-center gap-2
            "
            style={{ minHeight: '48px' }}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="size-[16px] border-2 border-white/30 border-t-white rounded-full"
                />
                Saving...
              </>
            ) : (
              'Complete & Continue'
            )}
          </motion.button>
        </div>
      </form>

      {/* Skip option */}
      <div className="mt-4 text-center">
        <button
          onClick={handleSkip}
          disabled={isSubmitting}
          className="font-nav text-[13px] text-[#999999] hover:text-[#656565] transition-colors inline-flex items-center gap-1 disabled:opacity-50"
        >
          Skip for now
          <svg className="size-[12px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </AuthLayout>
  );
}