import { useState, useEffect } from 'react';
import { X, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Company validation
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 500) {
      newErrors.message = 'Message must not exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    validateForm();
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (touched[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      company: true,
      message: true
    });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // TODO: Replace with actual API call
    // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSuccess(true);
    setIsSubmitting(false);
    
    // Reset form and close modal after success
    setTimeout(() => {
      setFormData({ name: '', email: '', company: '', message: '' });
      setErrors({});
      setTouched({});
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  // Check if form is valid for submit button
  const isFormValid = formData.name.trim() && 
                      formData.email.trim() && 
                      validateEmail(formData.email) &&
                      formData.company.trim() && 
                      formData.message.trim().length >= 10 &&
                      formData.message.trim().length <= 500;

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-white rounded-[10px] max-w-[500px] w-full p-6 md:p-8 relative shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black/40 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {isSuccess ? (
          /* Success State */
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 id="modal-title" className="text-2xl font-medium mb-2" style={{ fontFamily: "'Noto Serif', serif" }}>
              Thank you!
            </h3>
            <p className="text-black/70" style={{ fontSize: 'var(--text-sm)' }}>
              We'll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          /* Form State */
          <div>
            <h2 id="modal-title" className="text-2xl font-medium mb-2" style={{ fontFamily: "'Noto Serif', serif" }}>
              Get in Touch
            </h2>
            <p className="text-black/70 mb-6" style={{ fontSize: 'var(--text-sm)' }}>
              Fill out the form below and we'll respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black mb-1.5">
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  className={`w-full px-4 py-2.5 rounded-[5px] border transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                    touched.name && errors.name
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-black/20 focus:border-black focus:ring-black/10'
                  }`}
                  placeholder="John Doe"
                  disabled={isSubmitting}
                />
                {touched.name && errors.name && (
                  <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span className="text-xs">{errors.name}</span>
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black mb-1.5">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={`w-full px-4 py-2.5 rounded-[5px] border transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                    touched.email && errors.email
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-black/20 focus:border-black focus:ring-black/10'
                  }`}
                  placeholder="john@company.com"
                  disabled={isSubmitting}
                />
                {touched.email && errors.email && (
                  <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span className="text-xs">{errors.email}</span>
                  </div>
                )}
              </div>

              {/* Company Field */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-black mb-1.5">
                  Company <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  onBlur={() => handleBlur('company')}
                  className={`w-full px-4 py-2.5 rounded-[5px] border transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                    touched.company && errors.company
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-black/20 focus:border-black focus:ring-black/10'
                  }`}
                  placeholder="Acme Corporation"
                  disabled={isSubmitting}
                />
                {touched.company && errors.company && (
                  <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span className="text-xs">{errors.company}</span>
                  </div>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-black mb-1.5">
                  Message <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  rows={4}
                  className={`w-full px-4 py-2.5 rounded-[5px] border transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 resize-none ${
                    touched.message && errors.message
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-black/20 focus:border-black focus:ring-black/10'
                  }`}
                  placeholder="Tell us about your project or inquiry..."
                  disabled={isSubmitting}
                />
                <div className="flex items-center justify-between mt-1.5">
                  {touched.message && errors.message ? (
                    <div className="flex items-center gap-1.5 text-red-600">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span className="text-xs">{errors.message}</span>
                    </div>
                  ) : (
                    <div />
                  )}
                  <span className={`text-xs ${
                    formData.message.length > 500 ? 'text-red-600' : 'text-black/40'
                  }`}>
                    {formData.message.length}/500
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="w-full h-12 rounded-[5px] font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                style={{
                  backgroundImage: isFormValid && !isSubmitting 
                    ? 'linear-gradient(90deg, var(--red-700), var(--red-500))'
                    : 'linear-gradient(90deg, #9ca3af, #6b7280)',
                  boxShadow: isFormValid && !isSubmitting ? '0 4px 16px rgba(176, 31, 36, 0.15)' : 'none'
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}