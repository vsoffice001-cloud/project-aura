'use client';
import type { ReactNode } from 'react';
import type { AccessControl, ModuleNode } from '@/types/schema';
import { Lock } from 'lucide-react';
import { useMeter } from '@/hooks/useMeter';

// ─── Auth tier constants (PRD §22) ──────────────────────────────────────────
// 0 = anonymous · 1 = metered-session · 2 = lead · 3 = logged-in · 4 = paid
export type AuthTier = 0 | 1 | 2 | 3 | 4;

const TIER_REQUIRED: Record<string, AuthTier> = {
  public: 0,
  metered: 0,      // session-meter handled separately; tier still 0
  'lead-gated': 2,
  'login-gated': 3,
  paid: 4,
  hidden: 99 as AuthTier, // sentinel — never renders
};

interface AccessLevelGateProps {
  access: AccessControl;
  children: ReactNode;
  /**
   * Authenticated user's current tier (0–4).
   * When provided, enables auth-tier gating in addition to session metering.
   * Phase 3 will source this from server session / JWT.
   */
  currentTier?: AuthTier;
  /**
   * Rendered when access is denied.
   * Phase 3 will pass <InfoWallOverlay> here. Stub div used until then.
   */
  fallback?: ReactNode;
  moduleId?: string;      // for paywall CSS class + meterKey override
  sectionName?: string;   // analytics — section label for events
  meterKey?: string;      // explicit meterKey override
  /** @deprecated pass moduleId instead */
  module?: ModuleNode;
}

export function AccessLevelGate({
  access,
  children,
  currentTier,
  fallback,
  moduleId,
  // sectionName — accepted now, consumed by Phase 3 InfoWall/analytics dispatch
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sectionName,
  meterKey,
  module,
}: AccessLevelGateProps) {
  // Strip leading dot so we get a plain CSS class name
  const wrapClass = access.paywallSelector?.replace(/^\./, '') ?? '';
  // Resolve effective moduleId for meter + class fallback
  const effectiveModuleId = moduleId ?? module?.id;
  const effectiveMeterKey = meterKey ?? access.meterKey ?? effectiveModuleId ?? 'default';

  // ── hidden — never renders regardless of tier ────────────────────────────
  if (access.level === 'hidden') return null;

  // ── Auth-tier gating — when currentTier is provided ─────────────────────
  // If the user's tier doesn't meet the requirement, show fallback (stub or
  // Phase 3 InfoWall). This is evaluated BEFORE session metering.
  if (currentTier !== undefined) {
    const required = TIER_REQUIRED[access.level] ?? 0;
    if ((currentTier as number) < (required as number)) {
      // Fallback: Phase 3 swaps in <InfoWallOverlay>. For now: stub wrapper.
      return fallback ? (
        <>{fallback}</>
      ) : (
        <div
          className={wrapClass || undefined}
          data-access-denied={access.level}
          aria-hidden="true"
        />
      );
    }
  }

  switch (access.level) {
    case 'public':
      return <div className={wrapClass || undefined}>{children}</div>;

    case 'metered':
      // Apply teaser overlay if tier < 2 (not a confirmed lead)
      if (currentTier !== undefined && currentTier < 2) {
        return (
          <div className={wrapClass || undefined} data-access="metered-teaser">
            {/* inert removes keyboard focus from blurred children (WCAG 4.1.2 / aria-hidden-focus) */}
            <div
              aria-hidden="true"
              inert
              style={{ filter: 'blur(4px)', userSelect: 'none', pointerEvents: 'none', maxHeight: '8rem', overflow: 'hidden' }}
            >
              {children}
            </div>
          </div>
        );
      }
      return (
        <MeteredGate
          access={access}
          meterKey={effectiveMeterKey}
          wrapClass={wrapClass}
        >
          {children}
        </MeteredGate>
      );

    case 'lead-gated':
      return (
        <LockOverlay
          wrapClass={wrapClass}
          accessLevel="lead-gated"
          hint={access.publicPreview?.summaryText ?? 'Submit your details to unlock this section.'}
          ctaLabel="Download Sample Report"
        >
          {children}
        </LockOverlay>
      );

    case 'login-gated':
      return (
        <LockOverlay
          wrapClass={wrapClass}
          accessLevel="login-gated"
          hint="Sign in to unlock this section."
          ctaLabel="Sign in to unlock"
        >
          {children}
        </LockOverlay>
      );

    case 'paid':
      return (
        <LockOverlay
          wrapClass={wrapClass}
          accessLevel="paid"
          hint="Get full report access to view this section."
          ctaLabel="Get Report Access"
        >
          {children}
        </LockOverlay>
      );

    default:
      return <div className={wrapClass || undefined}>{children}</div>;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MeteredGate — extracted so useMeter is called unconditionally in its own tree
// ─────────────────────────────────────────────────────────────────────────────
function MeteredGate({
  access,
  meterKey,
  wrapClass,
  children,
}: {
  access: AccessControl;
  meterKey: string;
  wrapClass: string;
  children: ReactNode;
}) {
  const { count, threshold, exceeded } = useMeter(meterKey);

  if (exceeded) {
    return (
      <LockOverlay
        wrapClass={wrapClass}
        accessLevel="metered"
        hint={`You've reached your ${threshold} free preview limit.`}
        ctaLabel={CTA_LABEL_MAP[access.ctaTrigger] ?? 'Unlock'}
      >
        {children}
      </LockOverlay>
    );
  }

  return (
    <div
      className={wrapClass || undefined}
      data-access="metered"
      data-meter-count={count}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LockOverlay — blur backdrop over children with centered lock card
// Phase 3 will swap the inner card for <InfoWallOverlay> with real form
// ─────────────────────────────────────────────────────────────────────────────
function LockOverlay({
  wrapClass,
  accessLevel,
  hint,
  ctaLabel,
  children,
}: {
  wrapClass: string;
  accessLevel: string;
  hint: string;
  ctaLabel: string;
  children: ReactNode;
}) {
  return (
    <div
      className={wrapClass || undefined}
      data-access={accessLevel}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Content rendered behind — blurred to show there is real content */}
      {/* inert removes focusability from all descendants (WCAG 4.1.2 / aria-hidden-focus) */}
      <div
        aria-hidden="true"
        inert
        style={{
          filter: 'blur(6px)',
          userSelect: 'none',
          pointerEvents: 'none',
          // Limit blur crop to 3 lines equivalent so overlay doesn't need to cover full module
          maxHeight: '12rem',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>

      {/* Lock overlay — covers blurred content */}
      <div
        role="region"
        aria-label={`Locked content — ${accessLevel.replace(/-/g, ' ')}`}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Warm overlay tint with backdrop blur for glass effect
          background: 'rgba(245, 242, 241, 0.82)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        <div
          style={{
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-ramp-warm-300)',
            background: 'var(--color-ramp-warm-50)',
            padding: 'var(--space-8)',
            textAlign: 'center',
            maxWidth: '20rem',
            width: '100%',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          }}
        >
          {/* Lock icon */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 'var(--space-3)',
              color: 'var(--color-ramp-warm-600)',
            }}
          >
            <Lock size={24} aria-hidden="true" />
          </div>

          {/* Level badge */}
          <div
            style={{
              marginBottom: 'var(--space-2)',
              fontSize: 'var(--typography-size-sm)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--color-ramp-warm-700)',
              fontWeight: 600,
            }}
          >
            {accessLevel.replace(/-/g, ' ')}
          </div>

          {/* Hint text */}
          <p
            style={{
              marginBottom: 'var(--space-5)',
              fontSize: 'var(--typography-size-base)',
              color: 'var(--color-ramp-warm-800)',
              lineHeight: 1.5,
            }}
          >
            {hint}
          </p>

          {/* CTA button — Phase 3 swaps to InfoWallOverlay trigger */}
          <button
            type="button"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              borderRadius: 'var(--radius-button)',
              background: 'var(--color-brand-red)',
              padding: 'var(--space-3) var(--space-6)',
              fontSize: 'var(--typography-size-base)',
              fontWeight: 500,
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              // Explicit property — NOT `transition: all` (Cat 6.2)
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget).style.backgroundColor = 'var(--color-brand-red-dark, #8a1519)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget).style.backgroundColor = 'var(--color-brand-red)';
            }}
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// Canonical CTA label map — PRD §CTA
const CTA_LABEL_MAP: Record<string, string> = {
  sample: 'Download Sample Report',
  'analyst-call': 'Talk to Analyst',
  'dataset-unlock': 'Unlock Full Dataset',
  customization: 'Get Customized Report',
  login: 'Sign in to unlock',
  purchase: 'Get Report Access',
};
