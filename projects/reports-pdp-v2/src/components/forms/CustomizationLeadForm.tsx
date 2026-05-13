'use client';

/**
 * CustomizationLeadForm — PRD §46 "customization" form
 * Extra fields: customization scope, budget range, timeline
 */

import { useReducer, useCallback } from 'react';
import { useAnalyticsPush } from '@/components/AnalyticsProvider';
import type { FormContext } from '@/components/LeadFormModalProvider';
import {
  FormInput,
  FormTextarea,
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
  scope: string;
  budget: string;
  timeline: string;
  errors: {
    fullName?: string;
    email?: string;
    company?: string;
    scope?: string;
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
  scope: '',
  budget: '',
  timeline: '',
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

const BUDGET_OPTIONS = [
  { label: 'Under $5,000', value: 'under-5k' },
  { label: '$5,000 – $15,000', value: '5k-15k' },
  { label: '$15,000 – $50,000', value: '15k-50k' },
  { label: 'Over $50,000', value: 'over-50k' },
  { label: 'Not sure yet', value: 'tbd' },
];

const TIMELINE_OPTIONS = [
  { label: 'Within 2 weeks', value: '2-weeks' },
  { label: 'Within a month', value: '1-month' },
  { label: '1–3 months', value: '1-3-months' },
  { label: 'Flexible', value: 'flexible' },
];

export function CustomizationLeadForm({ context, onClose }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const push = useAnalyticsPush();

  const handleFirstFocus = useCallback(() => {
    if (!state.formStarted) {
      dispatch({ type: 'FORM_STARTED' });
      push('form_start', {
        form_type: 'customization',
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
    if (!state.scope.trim()) {
      dispatch({ type: 'SET_ERROR', field: 'scope', message: 'Please describe the customization needed' });
      valid = false;
    }
    return valid;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateAll()) return;
    dispatch({ type: 'SET_LOADING', value: true });
    push('form_submit', {
      form_type: 'customization',
      report_slug: context.reportSlug,
      section_name: context.sectionName,
    });
    await submitLeadForm({
      form_type: 'customization',
      full_name: state.fullName,
      email: state.email,
      company: state.company,
      country: state.country,
      customization_scope: state.scope,
      budget_range: state.budget,
      timeline: state.timeline,
      report_slug: context.reportSlug,
      cta_location: context.ctaLocation,
    });
    dispatch({ type: 'SUBMIT_SUCCESS' });
    setTimeout(onClose, 2000);
  }

  if (state.submitted) {
    return <FormSuccess message="Request received — our team will send a customization proposal within 2 business days." />;
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

      <FormSelect
        label="Country"
        options={COUNTRY_OPTIONS}
        placeholder="Select country"
        value={state.country}
        onFocus={handleFirstFocus}
        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'country', value: e.target.value })}
      />

      <FormTextarea
        label="Describe the customization you need"
        required
        maxLength={500}
        value={state.scope}
        error={state.errors.scope}
        onFocus={handleFirstFocus}
        onChange={(e) => {
          dispatch({ type: 'SET_FIELD', field: 'scope', value: e.target.value });
          if (state.errors.scope) dispatch({ type: 'CLEAR_ERROR', field: 'scope' });
        }}
        placeholder="e.g. Additional geographies, competitor deep-dives, primary interviews…"
        style={{ minHeight: '100px' }}
      />

      <FormSelect
        label="Budget range (optional)"
        options={BUDGET_OPTIONS}
        placeholder="Select budget"
        value={state.budget}
        onFocus={handleFirstFocus}
        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'budget', value: e.target.value })}
      />

      <FormSelect
        label="Timeline (optional)"
        options={TIMELINE_OPTIONS}
        placeholder="Select timeline"
        value={state.timeline}
        onFocus={handleFirstFocus}
        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'timeline', value: e.target.value })}
      />

      <SubmitButton label="Request Customization" loading={state.loading} />
      <LegalText />
    </form>
  );
}
