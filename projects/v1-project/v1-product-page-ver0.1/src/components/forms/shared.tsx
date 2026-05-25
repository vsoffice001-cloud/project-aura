/**
 * Shared form utilities — field components, validation, label styles.
 * Used by all 4 lead form variants.
 */

'use client';

import { type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, useId } from 'react';
import { cn } from '@/lib/cn';

// ─────────────────────────────────────────────────────────────────────────────
// Email validation
// ─────────────────────────────────────────────────────────────────────────────

export const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function validateEmail(value: string): string | null {
  if (!value.trim()) return 'Work email is required';
  if (!EMAIL_REGEX.test(value)) return 'Enter a valid work email address';
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared input base styles
// ─────────────────────────────────────────────────────────────────────────────

const inputBase =
  'min-h-[44px] w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/20 disabled:opacity-50 aria-[invalid=true]:border-red-600 aria-[invalid=true]:ring-red-200';

// ─────────────────────────────────────────────────────────────────────────────
// Label
// ─────────────────────────────────────────────────────────────────────────────

interface FieldLabelProps {
  htmlFor: string;
  label: string;
  required?: boolean;
}

export function FieldLabel({ htmlFor, label, required }: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1 block text-sm font-medium text-neutral-700"
    >
      {label}
      {required && (
        <span aria-hidden="true" className="ml-0.5 text-red-600">
          *
        </span>
      )}
    </label>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Error message
// ─────────────────────────────────────────────────────────────────────────────

export function FieldError({ id, message }: { id: string; message: string | null }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-xs text-red-600" aria-live="polite" role="alert">
      {message}
    </p>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FormField — text / email / tel input wrapper
// ─────────────────────────────────────────────────────────────────────────────

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
}

export function FormInput({ label, error, required, id: idProp, ...rest }: FormInputProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const errorId = `${id}-err`;

  return (
    <div>
      <FieldLabel htmlFor={id} label={label} required={required} />
      <input
        id={id}
        aria-required={required ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? 'true' : 'false'}
        className={cn(inputBase)}
        {...rest}
      />
      <FieldError id={errorId} message={error ?? null} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FormTextarea
// ─────────────────────────────────────────────────────────────────────────────

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string | null;
}

export function FormTextarea({ label, error, required, id: idProp, ...rest }: FormTextareaProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const errorId = `${id}-err`;

  return (
    <div>
      <FieldLabel htmlFor={id} label={label} required={required} />
      <textarea
        id={id}
        aria-required={required ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? 'true' : 'false'}
        className={cn(inputBase, 'resize-y min-h-[88px]')}
        {...rest}
      />
      <FieldError id={errorId} message={error ?? null} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FormSelect
// ─────────────────────────────────────────────────────────────────────────────

interface SelectOption {
  label: string;
  value: string;
}

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string | null;
  placeholder?: string;
}

export function FormSelect({
  label,
  options,
  error,
  required,
  placeholder,
  id: idProp,
  ...rest
}: FormSelectProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const errorId = `${id}-err`;

  return (
    <div>
      <FieldLabel htmlFor={id} label={label} required={required} />
      <select
        id={id}
        aria-required={required ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? 'true' : 'false'}
        className={cn(inputBase, 'cursor-pointer')}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <FieldError id={errorId} message={error ?? null} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Success state
// ─────────────────────────────────────────────────────────────────────────────

export function FormSuccess({ message }: { message: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-4 py-8 text-center"
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full"
        style={{ backgroundColor: 'var(--color-brand-red, #b01f24)', color: '#fff' }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <p className="text-base font-medium text-neutral-900">{message}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Submit button
// ─────────────────────────────────────────────────────────────────────────────

interface SubmitButtonProps {
  label: string;
  loading?: boolean;
}

export function SubmitButton({ label, loading }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-4 w-full rounded-md px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60"
      style={{
        backgroundColor: 'var(--color-brand-red, #b01f24)',
        outlineColor: 'var(--color-brand-red, #b01f24)',
        minHeight: '44px',
      }}
    >
      {loading ? 'Sending…' : label}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Legal text
// ─────────────────────────────────────────────────────────────────────────────

export function LegalText() {
  return (
    <p className="mt-3 text-xs text-neutral-500">
      By submitting, you agree to Ken Research&apos;s{' '}
      <a
        href="/privacy-policy"
        className="underline hover:text-neutral-700"
        target="_blank"
        rel="noopener noreferrer"
      >
        Privacy Policy
      </a>
      . Your data is processed per GDPR Article 6(1)(b) for contract performance.
    </p>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stub POST
// ─────────────────────────────────────────────────────────────────────────────

export async function submitLeadForm(data: Record<string, unknown>): Promise<void> {
  // TODO: replace w/ real API — POST /api/leads
  console.log('POST /api/leads', data);
  await new Promise((r) => setTimeout(r, 800));
}

// ─────────────────────────────────────────────────────────────────────────────
// Country options (abbreviated)
// ─────────────────────────────────────────────────────────────────────────────

export const COUNTRY_OPTIONS: SelectOption[] = [
  { label: 'Australia', value: 'AU' },
  { label: 'Canada', value: 'CA' },
  { label: 'France', value: 'FR' },
  { label: 'Germany', value: 'DE' },
  { label: 'India', value: 'IN' },
  { label: 'Japan', value: 'JP' },
  { label: 'Singapore', value: 'SG' },
  { label: 'United Kingdom', value: 'GB' },
  { label: 'United States', value: 'US' },
  { label: 'Other', value: 'OTHER' },
];
