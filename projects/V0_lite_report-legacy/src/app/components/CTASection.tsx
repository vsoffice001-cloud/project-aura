import { useState } from "react";
import { SectionLabel } from "@/design-system/components/SectionLabel";
import { TrackedButton } from './TrackedButton';
import { FloatingVariantSwitcher } from "./FloatingVariantSwitcher";

type CTAVariant = "dark" | "light";

export function CTASection() {
  const [variant, setVariant] = useState<CTAVariant>("dark");

  const isDark = variant === "dark";

  const variants: { key: CTAVariant; label: string }[] = [
    { key: "light", label: "Light" },
    { key: "dark", label: "Dark" },
  ];

  return (
    <section
      className={`py-12 md:py-16 relative overflow-hidden transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-black via-gray-800 to-black"
          : "bg-white"
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        {isDark ? (
          <>
            {/* Dark variant backgrounds */}
            <div className="absolute inset-0 bg-gradient-to-tr from-coral/12 via-transparent to-orange-accent/10"></div>
            <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-coral/10 blur-[140px] -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full bg-orange-accent/8 blur-[160px] translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-coral-light/7 blur-[120px]"></div>
            <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-brand-red/6 blur-[150px]"></div>
            <div
              className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                backgroundRepeat: "repeat",
                backgroundSize: "200px 200px",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/15"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--coral-500)]/30 to-transparent"></div>
          </>
        ) : (
          <>
            {/* Light variant backgrounds — mirrors dark composition 1:1 */}
            {/* Gradient overlay (dark: from-coral/12 to-orange-accent/10) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--coral-100)] via-white to-[var(--perano-200)]"></div>

            {/* Top-left blob — warm (dark: coral/10, 600px) */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[var(--warm-400)] opacity-60 blur-[140px] -translate-x-1/2 -translate-y-1/2"></div>

            {/* Bottom-right blob — perano (dark: orange-accent/8, 700px) */}
            <div className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full bg-[var(--perano-300)] opacity-50 blur-[160px] translate-x-1/2 translate-y-1/2"></div>

            {/* Mid-right blob — coral (dark: coral-light/7, 400px) */}
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[var(--coral-200)] opacity-45 blur-[120px]"></div>

            {/* Mid-left blob — black/neutral (dark: brand-red/6, 500px) */}
            <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-[var(--warm-300)] opacity-40 blur-[150px]"></div>

            {/* Fine grain texture */}
            <div
              className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                backgroundRepeat: "repeat",
                backgroundSize: "200px 200px",
              }}
            ></div>

            {/* Subtle edge vignette (dark: to-black/15) */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[var(--warm-200)]/40"></div>

            {/* Top edge glow (dark: via-coral-500/30) */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--coral-300)]/30 to-transparent"></div>
          </>
        )}
      </div>

      <div className="container relative max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Floating variant switcher */}
        <FloatingVariantSwitcher
          options={variants}
          activeKey={variant}
          onSelect={(key) => setVariant(key as CTAVariant)}
          colorScheme={isDark ? 'dark' : 'light'}
          position="absolute top-0 right-4 sm:right-6 md:right-8 z-20 hidden sm:block"
        />

        <div className="mx-auto max-w-4xl text-center">
          {/* Section Label */}
          <div className="inline-flex mb-4 sm:mb-6">
            <SectionLabel
              background={isDark ? "dark" : "light"}
              variant="accent"
            >
              GET IN TOUCH
            </SectionLabel>
          </div>

          <h2
            className={`font-serif font-light text-[1.563rem] sm:text-[1.953rem] md:text-[2.441rem] leading-tight mb-4 transition-colors duration-500 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            Ready to Make Data-Driven Decisions?
          </h2>
          <p
            className={`font-sans text-[0.875rem] sm:text-[1rem] md:text-[1.25rem] leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto transition-colors duration-500 ${
              isDark ? "text-white/60" : "text-[var(--black-500)]"
            }`}
          >
            Contact our research team for custom solutions.
          </p>

          <div className="flex items-center justify-center">
            <TrackedButton
              variant="brand"
              size="lg"
              animatedArrow={true}
              trackingName="Request Custom Report"
              trackingSection="CTA Section"
              className="w-full sm:w-auto"
            >
              Request Custom Report
            </TrackedButton>
          </div>
        </div>
      </div>
    </section>
  );
}