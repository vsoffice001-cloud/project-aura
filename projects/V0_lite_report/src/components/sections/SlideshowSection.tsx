'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Download, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, SectionLabel, SectionWrapper, SectionHeading } from '@kenresearch/design-system/atoms';
import { slides } from '@/lib/mock-data';

const ASPECT_W = 16;
const ASPECT_H = 9;

/**
 * SlideshowSection — sample-slide carousel w/ preview thumbnails + paywall lock.
 *
 * Pragmatic minimum-viable port: 12 placeholder slides w/ gradient backgrounds.
 * 729-LOC legacy variant DSL (light/dark + FloatingVariantSwitcher dev tool +
 * 40 figma:asset image imports + analytics tracking) deferred.
 *
 * Layout: SectionLabel + heading + active slide (16:9) w/ prev/next chevrons +
 * thumbnail strip below + paywall CTA after slide 6.
 *
 * @port simplified replacement for V0_lite_report-legacy/src/app/components/SlideshowSection.tsx
 */
export function SlideshowSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const total = slides.length;
  const previewLimit = 6;
  const isLocked = currentIndex >= previewLimit;
  const activeSlide = slides[currentIndex];

  // Auto-scroll thumbnails to keep active centred
  useEffect(() => {
    const container = thumbnailContainerRef.current;
    if (!container) return;
    const activeThumb = container.querySelector(`[data-thumb="${currentIndex}"]`) as HTMLElement | null;
    if (!activeThumb) return;
    const containerCenter = container.clientWidth / 2;
    const thumbCenter = activeThumb.offsetLeft + activeThumb.clientWidth / 2;
    container.scrollTo({ left: thumbCenter - containerCenter, behavior: 'smooth' });
  }, [currentIndex]);

  const goPrev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const goNext = () => setCurrentIndex((i) => Math.min(total - 1, i + 1));

  return (
    <SectionWrapper background="warm" spacing="lg" maxWidth="wide" id="slideshow">
      <div className="max-w-3xl mb-8">
        <div className="inline-flex mb-3">
          <SectionLabel background="light" variant="accent">SAMPLE PAGES</SectionLabel>
        </div>
        <SectionHeading level={2} align="left">Inside the Report</SectionHeading>
        <p className="text-[var(--typography-size-sm)] text-[var(--surface-text-muted)] mt-3 leading-relaxed">
          Preview {previewLimit} sample pages from the {total}-slide deck. Unlock the full report for the complete analysis.
        </p>
      </div>

      {/* Active slide */}
      <div className="relative max-w-4xl mx-auto">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-[var(--radius-card)] overflow-hidden shadow-[var(--shadow-lg)] border border-[var(--border-default)]"
          style={{ aspectRatio: `${ASPECT_W} / ${ASPECT_H}`, background: activeSlide.gradient }}
        >
          {/* Slide title overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
            <p className="text-[var(--typography-size-xs)] uppercase tracking-wider text-white/60 mb-2">
              Slide {currentIndex + 1} of {total}
            </p>
            <h3 className="font-[var(--typography-family-display)] font-light text-[var(--typography-size-xl)] sm:text-[var(--typography-size-2xl)] text-white">
              {activeSlide.title}
            </h3>
          </div>

          {/* Paywall lock overlay */}
          {isLocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="size-12 rounded-full flex items-center justify-center mb-3 bg-[var(--color-accent-purple)]/20">
                <Lock size={22} className="text-[var(--color-accent-purple)]" strokeWidth={2} />
              </div>
              <p className="text-[var(--typography-size-compact)] text-white/80 mb-4 text-center">
                Unlock the full {total}-slide deck
              </p>
              <Button variant="brand" size="md" icon={<Download />} iconPosition="left">
                Unlock Full Report
              </Button>
            </div>
          )}
        </motion.div>

        {/* Prev/next chevrons */}
        <button
          type="button"
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="absolute left-2 top-1/2 -translate-y-1/2 size-10 rounded-full bg-[var(--color-foundation-white)]/90 hover:bg-[var(--color-foundation-white)] shadow-[var(--shadow-md)] flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 text-[var(--surface-text)]" />
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={currentIndex === total - 1}
          className="absolute right-2 top-1/2 -translate-y-1/2 size-10 rounded-full bg-[var(--color-foundation-white)]/90 hover:bg-[var(--color-foundation-white)] shadow-[var(--shadow-md)] flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 text-[var(--surface-text)]" />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div
        ref={thumbnailContainerRef}
        className="mt-6 flex gap-3 overflow-x-auto pb-2 px-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
        role="tablist"
        aria-label="Slide thumbnails"
      >
        {slides.map((slide, i) => {
          const slideLocked = i >= previewLimit;
          const isActive = i === currentIndex;
          return (
            <button
              key={slide.id}
              type="button"
              data-thumb={i}
              onClick={() => setCurrentIndex(i)}
              role="tab"
              aria-selected={isActive}
              className={`relative flex-shrink-0 rounded-[var(--radius-button)] overflow-hidden transition-all duration-300 ${
                isActive ? 'ring-2 ring-[var(--color-brand-red)] scale-105' : 'opacity-70 hover:opacity-100'
              }`}
              style={{
                width: 120,
                aspectRatio: `${ASPECT_W} / ${ASPECT_H}`,
                background: slide.gradient,
              }}
              aria-label={`Slide ${i + 1}: ${slide.title}`}
            >
              {slideLocked && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center">
                  <Lock className="h-3.5 w-3.5 text-white/70" strokeWidth={2} />
                </div>
              )}
              <span className="absolute bottom-1 left-1 text-[0.625rem] font-medium text-white/90 tabular-nums">
                {i + 1}
              </span>
            </button>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
