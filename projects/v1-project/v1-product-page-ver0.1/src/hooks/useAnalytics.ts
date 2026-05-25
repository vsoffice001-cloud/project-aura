'use client';

// TODO: replace w/ real analytics hook if API changes
// Thin re-export of useAnalyticsPush under a stable local name
// so sections don't import directly from AnalyticsProvider internals.
export { useAnalyticsPush as useAnalytics } from '@/components/AnalyticsProvider';
