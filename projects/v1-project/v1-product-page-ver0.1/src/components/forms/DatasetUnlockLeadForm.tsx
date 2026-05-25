'use client';

/**
 * DatasetUnlockLeadForm — PRD §46 "dataset-unlock" form
 * Same base fields as Sample + hidden dataset-of-interest from context.chartId
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
  useCase: string;
  errors: { fullName?: string; email?: string; company?: string };
  loading: boolean;
  submitted: boolean;
  formStarted: boolean;
}

type Action =
  | { type: 'SET_FIELD'; field: 'fullName' | 'email' | 'company' | 'country' | 'useCase'; value: string }
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
  useCase: '',
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

export function DatasetUnlockLeadForm({ context, onClose }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const push = useAnalyticsPush();

  const handleFirstFocus = useCallback(() => {
    if (!state.formStarted) {
      dispatch({ type: 'FORM_STARTED' });
      push('form_start', {
        form_type: 'dataset-unlock',
        report_slug: context.reportSlug,
        chart_id: context.chartId,
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
    return valid;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateAll()) return;
    dispatch({ type: 'SET_LOADING', value: true });
    push('form_submit', {
      form_type: 'dataset-unlock',
      report_slug: context.reportSlug,
      chart_id: context.chartId,
      section_name: context.sectionName,
    });
    await submitLeadForm({
      form_type: 'dataset-unlock',
      full_name: state.fullName,
      email: state.email,
      company: state.company,
      country: state.country,
      use_case: state.useCase,
      dataset_of_interest: context.chartId ?? '',
      report_slug: context.reportSlug,
      cta_location: context.ctaLocation,
    });
    dispatch({ type: 'SUBMIT_SUCCESS' });
    setTimeout(onClose, 2000);
  }

  if (state.submitted) {
    return <FormSuccess message="Thanks — dataset access request received. Our team will follow up shortly." />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {context.chartId && (
        <p className="rounded-md bg-neutral-50 px-3 py-2 text-xs text-neutral-600 border border-neutral-200">
          Dataset: <span className="font-medium text-neutral-800">{context.chartId}</span>
        </p>
      )}

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
        label="How will you use this dataset?"
        maxLength={250}
        value={state.useCase}
        onFocus={handleFirstFocus}
        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'useCase', value: e.target.value })}
        placeholder="e.g. financial modelling, supply chain analysis…"
      />

      {/* Hidden field — captured in submit payload above */}
      <SubmitButton label="Unlock Dataset" loading={state.loading} />
      <LegalText />
    </form>
  );
}
