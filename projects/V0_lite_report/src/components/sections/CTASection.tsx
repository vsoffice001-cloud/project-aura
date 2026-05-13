import { Button, SectionLabel } from '@kenresearch/design-system/atoms';

/**
 * CTASection — final-page conversion banner.
 *
 * Editorial-light variant only (legacy had `dark`/`light` toggle via
 * FloatingVariantSwitcher dev tool — stripped on port; cinematic-dark
 * variant is opt-in via root `data-variant` attribute, not per-section).
 *
 * @port V0_lite_report-legacy/src/app/components/CTASection.tsx
 */
export function CTASection() {
  return (
    <section className="py-12 md:py-16 relative overflow-hidden bg-[var(--section-bg-primary)]">
      {/* Subtle warm-tinted decorative glow background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-ramp-coral-100)] via-[var(--color-foundation-white)] to-[var(--color-ramp-perano-200)]" />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[var(--color-ramp-warm-400)] opacity-60 blur-[140px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full bg-[var(--color-ramp-perano-300)] opacity-50 blur-[160px] translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[var(--color-ramp-coral-200)] opacity-45 blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-[var(--color-ramp-warm-300)] opacity-40 blur-[150px]" />
      </div>

      <div className="container relative max-w-[var(--container-page)] mx-auto px-4 sm:px-6 md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex mb-4 sm:mb-6">
            <SectionLabel background="light" variant="accent">
              GET IN TOUCH
            </SectionLabel>
          </div>

          <h2 className="font-[var(--typography-family-display)] font-light text-[var(--typography-size-lg)] sm:text-[var(--typography-size-xl)] md:text-[var(--typography-size-2xl)] leading-tight mb-4 text-[var(--surface-text)]">
            Ready to Make Data-Driven Decisions?
          </h2>
          <p className="font-[var(--typography-family-body)] text-[var(--typography-size-compact)] sm:text-[var(--typography-size-sm)] md:text-[var(--typography-size-base)] leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto text-[var(--surface-text-muted)]">
            Contact our research team for custom solutions.
          </p>

          <div className="flex items-center justify-center">
            <Button variant="brand" size="lg" animatedArrow className="w-full sm:w-auto">
              Request Custom Report
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
