/**
 * Routes - Application routing configuration
 * 
 * Uses React.lazy() for all page components to isolate module errors
 * and enable code-splitting. If any single page has a compile error,
 * only that page fails — not the entire app.
 * 
 * Routes:
 * - / → HomePage (within NavLayout)
 * - /auth → AuthPage (unified sign in/up)
 * - /auth/verify → OTP Verification
 * - /auth/complete-profile → Profile Completion (sign up only)
 * - /auth/success → Success Screen
 * - * → 404 redirect to home
 */

import { createBrowserRouter } from 'react-router';
import { lazy, Suspense, ComponentType } from 'react';

// NavLayout is always needed (root layout) — static import avoids dynamic fetch issues
import { NavLayout } from './components/layout/NavLayout';

// Lazy-load only page-level components
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const AuthPage = lazy(() => import('./components/auth/AuthPage').then(m => ({ default: m.AuthPage })));
const OTPVerification = lazy(() => import('./components/auth/OTPVerification').then(m => ({ default: m.OTPVerification })));
const ProfileCompletion = lazy(() => import('./components/auth/ProfileCompletion').then(m => ({ default: m.ProfileCompletion })));
const SuccessScreen = lazy(() => import('./components/auth/SuccessScreen').then(m => ({ default: m.SuccessScreen })));

// Suspense wrapper for lazy components
function withSuspense(LazyComponent: ComponentType) {
  return function SuspenseWrapper() {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="size-8 border-2 border-[#806ce0] border-t-transparent rounded-full animate-spin" /></div>}>
        <LazyComponent />
      </Suspense>
    );
  };
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: NavLayout,
    children: [
      { index: true, Component: withSuspense(HomePage) },
      // Catch-all within NavLayout
      { path: '*', Component: withSuspense(HomePage) },
    ],
  },
  // Auth routes — outside NavLayout (no navbar on auth screens)
  { path: '/auth', Component: withSuspense(AuthPage) },
  { path: '/auth/verify', Component: withSuspense(OTPVerification) },
  { path: '/auth/complete-profile', Component: withSuspense(ProfileCompletion) },
  { path: '/auth/success', Component: withSuspense(SuccessScreen) },
]);