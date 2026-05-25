'use client';

/**
 * AnalystCallLeadForm — PRD §46 "analyst-call" form
 * Extra fields: phone (required), preferred call time, urgency
 */

import { useReducer, useCallback } from 'react';
import { useAnalyticsPush } from '@/components/AnalyticsProvider';
import type { FormContext } from '@/components/LeadFormModalProvider';
import {
  FormInput,
  FormSelect,
  SubmitButton,
  LegalText,
  FormSuccess,
  COUNTRY_OPTIONS,
  validateEmail,
  submitLeadForm,
} from './shared';

interface Props {
  context: FormContext;
  onClose: () => void;
}

interface FormState {
  fullName: string;
  email: string;
  company: string;
  country: string;
  phone: string;
  preferredTime: string;
  urgency: string;
  errors: {
    fullName?: string;
    email?: string;
    company?: string;
    phone?: string;
  };
  loading: boolean;
  submitted: boolean;
  formStarted: boolean;
}

type Action =
  | { type: 'SET_FIELD'; field: keyof Omit<FormState, 'errors' | 'loading' | 'submitted' | 'formStarted'>; value: string }
  | { type: 'SET_ERROR'; field: string; message: string }
  | { type: 'CLEAR_ERROR'; field: string }
  | { type: 'SET_LOADING'; value: boolean }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'FORM_STARTED' };

const initialState: FormState = {
  fullName: '',
  email: '',
  company: '',
  country: '',
  phone: '',
  preferredTime: '',
  urgency: '',
  errors: {},
  loading: false,
  submitted: false,
  formStarted: false,
};

function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ERROR':
      return { ...state, errors: { ...state.errors, [action.field]: action.message } };
    case 'CLEAR_ERROR':
      return { ...state, errors: { ...state.errors, [action.field]: undefined } };
    case 'SET_LOADING':
      return { ...state, loading: action.value };
    case 'SUBMIT_SUCCESS':
      return { ...state, loading: false, submitted: true };
    case 'FORM_STARTED':
      return { ...state, formStarted: true };
    default:
      return state;
  }
}

const CALL_TIME_OPTIONS = [
  { label: 'Morning (9am–12pm)', value: 'morning' },
  { label: 'Afternoon (12pm–5pm)', value: 'afternoon' },
  { label: 'Evening (5pm–8pm)', value: 'evening' },
];

const URGENCY_OPTIONS = [
  { label: 'This week', value: 'this-week' },
  { label: 'This month', value: 'this-month' },
  { label: 'Just exploring', value: 'exploring' },
];

export function AnalystCallLeadForm({ context, onClose }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const push = useAnalyticsPush();

  const handleFirstFocus = useCallback(() => {
    if (!state.formStarted) {
      dispatch({ type: 'FORM_STARTED' });
      push('form_start', {
        form_type: 'analyst-call',
        report_slug: context.reportSlug,
        cta_location: context.ctaLocation,
      });
    }
  }, [state.formStarted, push, context]);

  function validateAll(): boolean {
    let valid = true;
    if (!state.fullName.trim()) {
      dispatch({ type: 'SET_ERROR', field: 'fullName', message: 'Full name is required' });
      valid = false;
    }
    const emailErr = validateEmail(state.email);
    if (emailErr) {
      dispatch({ type: 'SET_ERROR', field: 'email', message: emailErr });
      valid = false;
    }
    if (!state.company.trim()) {
      dispatch({ type: 'SET_ERROR', field: 'company', message: 'Company is required' });
      valid = false;
    }
    if (!state.phone.trim()) {
      dispatch({ type: 'SET_ERROR', field: 'phone', message: 'Phone number is required' });
      valid = false;
    }
    return valid;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateAll()) return;
    dispatch({ type: 'SET_LOADING', value: true });
    push('form_submit', {
      form_type: 'analyst-call',
      report_slug: context.reportSlug,
      section_name: context.sectionName,
    });
    await submitLeadForm({
      form_type: 'analyst-call',
      full_name: state.fullName,
      email: state.email,
      company: state.company,
      country: state.country,
      phone: state.phone,
      preferred_time: state.preferredTime,
      urgency: state.urgency,
      report_slug: context.reportSlug,
      cta_location: context.ctaLocation,
    });
    dispatch({ type: 'SUBMIT_SUCCESS' });
    setTimeout(onClose, 2000);
  }

  if (state.submitted) {
    return <FormSuccess message="Call scheduled — an analyst will reach out within 24 hours to confirm." />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <FormInput
        label="Full name"
        type="text"
        autoComplete="name"
        required
        value={state.fullName}
        error={state.errors.fullName}
        onFocus={handleFirstFocus}
        onChange={(e) => {
          dispatch({ type: 'SET_FIELD', field: 'fullName', value: e.target.value });
          if (state.errors.fullName) dispatch({ type: 'CLEAR_ERROR', field: 'fullName' });
        }}
      />

      <FormInput
        label="Work email"
        type="email"
        autoComplete="email"
        required
        value={state.email}
        error={state.errors.email}
        onFocus={handleFirstFocus}
        onBlur={() => {
          const err = validateEmail(state.email);
          if (err) dispatch({ type: 'SET_ERROR', field: 'email', message: err });
          else dispatch({ type: 'CLEAR_ERROR', field: 'email' });
        }}
        onChange={(e) => {
          dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value });
          if (state.errors.email) dispatch({ type: 'CLEAR_ERROR', field: 'email' });
        }}
      />

      <FormInput
        label="Company"
        type="text"
        autoComplete="organization"
        required
        value={state.company}
        error={state.errors.company}
        onFocus={handleFirstFocus}
        onChange={(e) => {
          dispatch({ type: 'SET_FIELD', field: 'company', value: e.target.value });
          if (state.errors.company) dispatch({ type: 'CLEAR_ERROR', field: 'company' });
        }}
      />

      <FormInput
        label="Phone"
        type="tel"
        autoComplete="tel"
        required
        value={state.phone}
        error={state.errors.phone}
        onFocus={handleFirstFocus}
        onChange={(e) => {
          dispatch({ type: 'SET_FIELD', field: 'phone', value: e.target.value });
          if (state.errors.phone) dispatch({ type: 'CLEAR_ERROR', field: 'phone' });
        }}
        placeholder="+1 (555) 000-0000"
      />

      <FormSelect
        label="Country"
        options={COUNTRY_OPTIONS}
        placeholder="Select country"
        value={state.country}
        onFocus={handleFirstFocus}
        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'country', value: e.target.value })}
      />

      <FormSelect
        label="Preferred call time"
        options={CALL_TIME_OPTIONS}
        placeholder="Select time slot"
        value={state.preferredTime}
        onFocus={handleFirstFocus}
        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'preferredTime', value: e.target.value })}
      />

      <FormSelect
        label="When do you need this?"
        options={URGENCY_OPTIONS}
        placeholder="Select urgency"
        value={state.urgency}
        onFocus={handleFirstFocus}
        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'urgency', value: e.target.value })}
      />

      <SubmitButton label="Schedule Call" loading={state.loading} />
      <LegalText />
    </form>
  );
}
